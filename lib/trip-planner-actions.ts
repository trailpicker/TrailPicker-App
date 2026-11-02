"use server";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates } from "@/lib/trip-planner";
import { mutateBuildWithRevision } from "@/lib/build-history";
import { parseLogistics } from "@/lib/build-validation";
import { validatedRoute } from "@/lib/itinerary-links";
const text = (f: FormData, key: string, max = 5000) => { const v = f.get(key); if (v != null && typeof v !== "string") throw new Error(`Invalid ${key}.`); const s = (v ?? "").trim(); if (s.length > max) throw new Error(`${key} is too long (maximum ${max} characters).`); return s || null; };
const number = (f: FormData, key: string, min: number, max: number, integer = false) => nullableNumber(f.get(key),key,min,max,integer);
const condition = (f: FormData) => { const v = text(f,"conditions",20); if (v && !["dry","rain","snow"].includes(v)) throw new Error("Choose a valid weather condition."); return v; };
export async function saveTripDetails(f: FormData) {
  const buildId = text(f,"buildId",200)!;
  const access = await requireBuildAccess(buildId);
  const dates = parseDates(text(f,"startDate",10) ?? "", text(f,"endDate",10) ?? "");
  const selected = getDestination(text(f,"destinationId",200));
  const lat = selected?.latitude ?? number(f,"locationLat",-90,90), lng = selected?.longitude ?? number(f,"locationLng",-180,180);
  if ((lat == null) !== (lng == null)) throw new Error("Provide both location coordinates.");
  const data = { ...dates, destinationId: selected?.id ?? null, location: selected ? `${selected.name}, ${selected.park}` : text(f,"location",500), locationLat: lat, locationLng: lng, people: number(f,"people",1,100,true) ?? 1, minTemperature: number(f,"minTemperature",-100,60,true), conditions: condition(f) };
  await mutateBuildWithRevision(buildId, access.userId, "trip", "Updated trip details", async tx => {
    const old = await tx.tripDay.findMany({ where: { buildId }, select: { id: true, date: true } });
    const range = dates.startDate && dates.endDate ? getDateRange(dates.startDate,dates.endDate) : [];
    const keys = new Set(range.map(d => d.getTime()));
    if (old.some(d => !keys.has(d.date.getTime())) && f.get("confirmDateChange") !== "yes") throw new Error("The new dates remove itinerary days. Tick the confirmation box to discard those days. Days still within the range will be kept.");
    const removedIds = new Set(old.filter((day) => !keys.has(day.date.getTime())).map((day) => day.id));
    if (removedIds.size) {
      const build = await tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { routeWaypoints: true } });
      const route = validatedRoute(build?.routeWaypoints);
      if (route) {
        const points = route.map((point) => point.dayId && removedIds.has(point.dayId) ? { ...point, dayId: null } : point);
        await tx.build.update({ where: { id: buildId, userId: access.userId }, data: { routeWaypoints: JSON.parse(JSON.stringify(points)) } });
      }
    }
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data });
    if (range.length) await tx.tripDay.createMany({ data: range.map(date => ({ buildId,date })), skipDuplicates: true });
    await tx.tripDay.deleteMany({ where: { buildId, date: { notIn: range } } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDay(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId,dayId);
  // Compact day editor omits notes; do not overwrite independently edited day notes.
  const strings = Object.fromEntries(dayTextFields.filter(key => f.has(key)).map(key => [key,text(f,key)]));
  const data = { ...strings, conditions: condition(f), minTemperature: number(f,"minTemperature",-100,60,true), distanceKm: number(f,"distanceKm",0,1000), elevationGainM: number(f,"elevationGainM",0,20000,true), elevationLossM: number(f,"elevationLossM",0,20000,true), durationMinutes: number(f,"durationMinutes",0,1440,true), waterCarryL: number(f,"waterCarryL",0,100) };
  await mutateBuildWithRevision(buildId, day.accessUserId, "itinerary", "Updated itinerary day", async tx => {
    await tx.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDaySummary(f: FormData) {
  const buildId = text(f, "buildId", 200)!, dayId = text(f, "dayId", 200)!;
  const day = await requireTripDayAccess(buildId, dayId);
  const summary = text(f, "summary", 100);
  await mutateBuildWithRevision(buildId, day.accessUserId, "itinerary", "Updated day summary", async tx => {
    await tx.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { activities: summary } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDayNote(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId, dayId);
  const note = text(f, "note", 5000);
  await mutateBuildWithRevision(buildId, day.accessUserId, "itinerary", "Updated day note", async tx => {
    await tx.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { notes: note } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripRoute(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const raw: unknown = JSON.parse(text(f,"waypoints",100000) ?? "[]");
  const points = validatedRoute(raw);
  if (!points) throw new Error("Route must be a list of stops.");
  await mutateBuildWithRevision(buildId, access.userId, "route", "Updated trip route", async tx => {
    // Validate links inside the serialized transaction, after any date changes.
    const assignedIds = [...new Set(points.map(p => p.dayId).filter((v): v is string => typeof v === "string"))];
    if (assignedIds.length) {
      const matchingDays = await tx.tripDay.findMany({
        where: { buildId, id: { in: assignedIds } }, select: { id: true },
      });
      if (matchingDays.length !== assignedIds.length) {
        throw new Error("One or more route stops refer to a removed trip day. Reassign those stops and try again.");
      }
    }
    await tx.build.update({
      where: { id: buildId, userId: access.userId },
      data: { routeWaypoints: points.map(p => ({ ...p, name: p.name.trim(), ...(p.dayId ? { dayId: p.dayId } : {}) })) },
    });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const value = parseLogistics(Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""])))!;
  await mutateBuildWithRevision(buildId, access.userId, "logistics", "Updated trip logistics", async tx => {
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: value } });
  });
  revalidatePath(`/build/${buildId}`);
}
