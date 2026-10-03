"use server";
import { prisma } from "@/lib/prisma";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates, readWaypoints } from "@/lib/trip-planner";
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
  await prisma.$transaction(async tx => {
    const old = await tx.tripDay.findMany({ where: { buildId }, select: { date: true } });
    const range = dates.startDate && dates.endDate ? getDateRange(dates.startDate,dates.endDate) : [];
    const keys = new Set(range.map(d => d.getTime()));
    if (old.some(d => !keys.has(d.date.getTime())) && f.get("confirmDateChange") !== "yes") throw new Error("The new dates remove itinerary days. Tick the confirmation box to discard those days. Days still within the range will be kept.");
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data });
    if (range.length) await tx.tripDay.createMany({ data: range.map(date => ({ buildId,date })), skipDuplicates: true });
    await tx.tripDay.deleteMany({ where: { buildId, date: { notIn: range } } });
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripDay(f: FormData) {
  const buildId = text(f,"buildId",200)!, dayId = text(f,"dayId",200)!;
  const day = await requireTripDayAccess(buildId,dayId);
  const strings = Object.fromEntries(dayTextFields.map(key => [key,text(f,key)]));
  await prisma.tripDay.update({ where: { id: dayId, buildId, build: { userId: day.accessUserId } }, data: { ...strings, conditions: condition(f), minTemperature: number(f,"minTemperature",-100,60,true), distanceKm: number(f,"distanceKm",0,1000), elevationGainM: number(f,"elevationGainM",0,20000,true), elevationLossM: number(f,"elevationLossM",0,20000,true), durationMinutes: number(f,"durationMinutes",0,1440,true), waterCarryL: number(f,"waterCarryL",0,100) } });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripRoute(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const raw: unknown = JSON.parse(text(f,"waypoints",100000) ?? "[]");
  const points = readWaypoints(raw);
  if (!Array.isArray(raw) || points.length !== raw.length || points.length > 200 || new Set(points.map(p=>p.id)).size !== points.length || points.some(p=>!p.name.trim() || p.name.length>200 || p.id.length>200 || (p.elevationM != null && (p.elevationM < -500 || p.elevationM > 9000)))) throw new Error("Check waypoint names, coordinates, elevations, and unique IDs. Maximum 200 waypoints.");
  await prisma.build.update({ where: { id: buildId,userId: access.userId }, data: { routeWaypoints: points.map(p=>({...p,name:p.name.trim()})) } });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const value = Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""]));
  await prisma.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: value } });
  revalidatePath(`/build/${buildId}`);
}
