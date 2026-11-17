"use server";
import { requireBuildAccess, requireTripDayAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { getDestination } from "@/lib/destinations";
import { getDateRange } from "@/lib/trip";
import { dayTextFields, emptyLogistics, nullableNumber, parseDates } from "@/lib/trip-planner";
import { mutateBuildWithRevision } from "@/lib/build-history";
import { parseLogistics } from "@/lib/build-validation";
import { validatedRoute } from "@/lib/itinerary-links";
import { consolidateOvernightStops } from "@/lib/overnight-handoffs";
import { computeRouteMetrics, completeDaySummaries, DEFAULT_HIKING_PACE_KMH } from "@/lib/route-metrics";
import { validatePrivateResources, readPrivateResources } from "@/lib/trip-resources";
import { validateArrangements } from "@/lib/trip-arrangements";
import { validateFoodPlan } from "@/lib/food-plan";
import { ROUTE_TIMING_KEY, validateRouteTimingPreferences } from "@/lib/route-timing-preferences";
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
      const build = await tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { routeWaypoints: true, tripLogistics: true } });
      const route = validatedRoute(build?.routeWaypoints);
      // Avoid leaving saved meals pointed at deleted TripDay IDs. Resupply entries
      // remain attached to mapped stops and can be re-assigned to another day.
      const root = build?.tripLogistics;
      if (root && typeof root === "object" && !Array.isArray(root)) {
        const data = root as Record<string, unknown>;
        const food = data.phase7;
        if (food && typeof food === "object" && !Array.isArray(food)) {
          const phase7 = food as Record<string, unknown>;
          if (Array.isArray(phase7.meals)) {
            await tx.build.update({where:{id:buildId,userId:access.userId},data:{tripLogistics:JSON.parse(JSON.stringify({
              ...data, phase7: {...phase7, meals:phase7.meals.filter(meal =>
                !!meal && typeof meal === "object" && !removedIds.has((meal as {dayId?:string}).dayId || "")),
              },
            }))}});
          }
        }
      }
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
  const raw: unknown = JSON.parse(text(f,"waypoints",1500000) ?? "[]");
  const validatedPoints = validatedRoute(raw);
  if (!validatedPoints) throw new Error("Route must be a list of stops.");
  await mutateBuildWithRevision(buildId, access.userId, "route", "Updated trip route", async tx => {
    const tripDays = await tx.tripDay.findMany({ where:{ buildId }, select:{ id:true,date:true } });
    const merged = consolidateOvernightStops(validatedPoints, tripDays);
    const points = validatedRoute(merged.points);
    if (!points) throw new Error("Cannot save the merged overnight route.");
    const { replacedIds } = merged;
    const assignedIds = [...new Set(points.map(p => p.dayId).filter((v): v is string => typeof v === "string"))];
    if (assignedIds.length) {
      const matchingDays = await tx.tripDay.findMany({
        where: { buildId, id: { in: assignedIds } }, select: { id: true },
      });
      if (matchingDays.length !== assignedIds.length) {
        throw new Error("One or more route stops refer to a removed trip day. Reassign those stops and try again.");
      }
    }
    const existingBuild = await tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select:{ tripLogistics:true, routeWaypoints:true } });
    const previous = validatedRoute(existingBuild?.routeWaypoints) ?? [];
    const formerIds = consolidateOvernightStops(previous, tripDays).replacedIds;
    const currentIds = new Set(points.map(point=>point.id));
    // The client submits a canonical one-pin route. Recover old foreign-key
    // mappings from the SAVED route so linked reservations are not orphaned.
    const bookingRedirects = { ...formerIds, ...replacedIds };
    const root = existingBuild?.tripLogistics && typeof existingBuild.tripLogistics === "object" && !Array.isArray(existingBuild.tripLogistics)
      ? existingBuild.tripLogistics as Record<string,unknown> : {};
    const previousCamps = readPrivateResources(root);
    const phase6 = Object.keys(bookingRedirects).length ? { ...previousCamps,
      bookings: previousCamps.bookings.map(booking=>{
        const target = bookingRedirects[booking.waypointId];
        return {...booking, waypointId: target && currentIds.has(target) && !currentIds.has(booking.waypointId) ? target : booking.waypointId};
      }) } : undefined;
    const arrangements = Object.keys(bookingRedirects).length && Array.isArray(root.arrangements)
      ? validateArrangements(root.arrangements).map(entry => {
          const target = bookingRedirects[entry.waypointId ?? ""];
          return target && currentIds.has(target) && !currentIds.has(entry.waypointId ?? "")
            ? {...entry, waypointId: target} : entry;
        }) : undefined;
    await tx.build.update({
      where: { id: buildId, userId: access.userId },
      data: {
        routeWaypoints: points.map(p => ({ ...p, name: p.name.trim(), ...(p.dayId ? { dayId: p.dayId } : {}) })),
        ...(phase6 || arrangements ? { tripLogistics: JSON.parse(JSON.stringify({ ...root, ...(phase6 ? { phase6 } : {}), ...(arrangements ? {arrangements} : {}) })) } : {}),
      },
    });
    // Route geometry is authoritative for COMPLETE, same-day mapped sections.
    // Keep user-entered day summaries untouched for unknown, partial, or unassigned sections.
    // TripDay summaries keep a stable base pace; user-selected hiking preferences
    // are stored separately in tripLogistics.routeTiming and shown by Route Analysis.
    if (assignedIds.length) {
      const dayMetrics = computeRouteMetrics(points, assignedIds.map(id => ({ id })), DEFAULT_HIKING_PACE_KMH);
      for (const data of completeDaySummaries(dayMetrics)) {
        const { dayId, ...values } = data;
        await tx.tripDay.update({ where: { id: dayId, buildId }, data: values });
      }
    }
  });
  revalidatePath(`/build/${buildId}`);
}
export async function saveTripLogistics(f: FormData) {
  const buildId = text(f,"buildId",200)!, access = await requireBuildAccess(buildId);
  const value = parseLogistics(Object.fromEntries(Object.keys(emptyLogistics).map(key=>[key,text(f,key) ?? ""])))!;
  await mutateBuildWithRevision(buildId, access.userId, "logistics", "Updated trip logistics", async tx => {
    // Preserve private campsite reservations and water-planning preferences when
    // the legacy seven-field logistics form autosaves.
    const existing = await tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { tripLogistics: true } });
    const root = existing?.tripLogistics && typeof existing.tripLogistics === "object" && !Array.isArray(existing.tripLogistics) ? existing.tripLogistics as Record<string, unknown> : {};
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: JSON.parse(JSON.stringify({ ...root, ...value })) } });
  });
  revalidatePath(`/build/${buildId}`);
}



/** Private campsite booking tracker, stored inside the existing JSON field without a migration. */
export async function saveTripResources(f: FormData) {
  const buildId = text(f, "buildId", 200)!;
  const access = await requireBuildAccess(buildId);
  const raw = JSON.parse(text(f, "resources", 40000) ?? "null") as unknown;
  await mutateBuildWithRevision(buildId, access.userId, "logistics", "Updated campsites and water plan", async tx => {
    const [build, days] = await Promise.all([
      tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { tripLogistics: true, routeWaypoints: true } }),
      tx.tripDay.findMany({ where: { buildId }, select: { id: true } }),
    ]);
    if (!build) throw new Error("Trip not found.");
    const route = validatedRoute(build.routeWaypoints) ?? [];
    const phase6 = validatePrivateResources(raw, days.map(d => d.id), route.filter(p => p.kind === "camp").map(p => p.id));
    const root = build.tripLogistics && typeof build.tripLogistics === "object" && !Array.isArray(build.tripLogistics) ? build.tripLogistics as Record<string, unknown> : {};
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: JSON.parse(JSON.stringify({ ...root, phase6 })) } });
  });
  revalidatePath(`/build/${buildId}`);
}


/** Save only the water assumptions. Preserve campsite bookings managed by Logistics. */
export async function saveTripWaterSettings(f: FormData) {
  const buildId = text(f, "buildId", 200)!;
  const access = await requireBuildAccess(buildId);
  const raw = JSON.parse(text(f, "waterSettings", 2000) ?? "null") as unknown;
  await mutateBuildWithRevision(buildId, access.userId, "logistics", "Updated water carry settings", async tx => {
    const build = await tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { tripLogistics: true } });
    if (!build) throw new Error("Trip not found.");
    const root = build.tripLogistics && typeof build.tripLogistics === "object" && !Array.isArray(build.tripLogistics) ? build.tripLogistics as Record<string, unknown> : {};
    // Validate only the incoming settings; preserve the *exact* existing
    // booking records, including older records that another UI may be editing.
    const incoming = validatePrivateResources({ settings: raw, bookings: [] }, [], []);
    const previous = root.phase6 && typeof root.phase6 === "object" && !Array.isArray(root.phase6)
      ? root.phase6 as Record<string, unknown> : {};
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data: {
      tripLogistics: JSON.parse(JSON.stringify({ ...root, phase6: { ...previous, settings: incoming.settings } })),
    } });
  });
  revalidatePath(`/build/${buildId}`);
}

/** Phase 7 food/meal/fuel planning data. Saved privately with the existing logistics JSON. */
export async function saveTripFoodPlan(f: FormData) {
  const buildId = text(f, "buildId", 200)!;
  const access = await requireBuildAccess(buildId);
  const raw = JSON.parse(text(f, "foodPlan", 500000) ?? "null") as unknown;
  await mutateBuildWithRevision(buildId, access.userId, "logistics", "Updated food and fuel plan", async tx => {
    const [build, days] = await Promise.all([
      tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { tripLogistics: true, routeWaypoints: true } }),
      tx.tripDay.findMany({ where: { buildId }, select: { id: true } }),
    ]);
    if (!build) throw new Error("Trip not found.");
    const points = validatedRoute(build.routeWaypoints) ?? [];
    const phase7 = validateFoodPlan(raw, days.map(d=>d.id), points);
    const root = build.tripLogistics && typeof build.tripLogistics === "object" && !Array.isArray(build.tripLogistics) ? build.tripLogistics as Record<string, unknown> : {};
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data: { tripLogistics: JSON.parse(JSON.stringify({ ...root, phase7 })) } });
  });
  revalidatePath(`/build/${buildId}`);
}


/** Save only hiking-time preferences; never save an in-progress route draft here. */
export async function saveRouteTimingPreferences(f: FormData) {
  const buildId = text(f, "buildId", 200)!;
  const access = await requireBuildAccess(buildId);
  const settings = validateRouteTimingPreferences(JSON.parse(text(f, "settings", 2500) ?? "null") as unknown);
  await mutateBuildWithRevision(buildId, access.userId, "route-timing", "Updated hiking settings", async tx => {
    const current = await tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { tripLogistics: true } });
    if (!current) throw new Error("Trip not found.");
    const root = current.tripLogistics && typeof current.tripLogistics === "object" && !Array.isArray(current.tripLogistics)
      ? current.tripLogistics as Record<string, unknown> : {};
    await tx.build.update({
      where: { id: buildId, userId: access.userId },
      data: { tripLogistics: JSON.parse(JSON.stringify({ ...root, [ROUTE_TIMING_KEY]: settings })) },
    });
  });
  revalidatePath(`/build/${buildId}`);
}


/** Save one permit, non-camp reservation, or the EXISTING phase6 campsite record.
 * Other logistics fields, water assumptions, and food data are untouched. */
export async function saveTripBooking(f: FormData) {
  const buildId = text(f, "buildId", 200)!;
  const access = await requireBuildAccess(buildId);
  const operation = text(f, "operation", 12);
  const source = text(f, "source", 20);
  if (!(["upsert", "delete"].includes(operation || "") && ["camp", "arrangement"].includes(source || ""))) throw new Error("Invalid booking operation.");
  const raw = text(f, "booking", 6000);
  if (!raw) throw new Error("Missing booking details.");
  let payload: unknown;
  try { payload = JSON.parse(raw); } catch { throw new Error("Invalid booking details."); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid booking details.");
  const incoming = payload as Record<string, unknown>;
  const id = incoming.id;
  if (typeof id !== "string" || !id || id.length > 100) throw new Error("Invalid booking ID.");
  const saved = await mutateBuildWithRevision(buildId, access.userId, "logistics", "Updated permits and reservations", async tx => {
    const [build, days] = await Promise.all([
      tx.build.findUnique({ where: { id: buildId, userId: access.userId }, select: { tripLogistics: true, routeWaypoints: true } }),
      tx.tripDay.findMany({ where: { buildId }, select: { id: true } }),
    ]);
    if (!build) throw new Error("Trip not found.");
    const root = build.tripLogistics && typeof build.tripLogistics === "object" && !Array.isArray(build.tripLogistics) ? build.tripLogistics as Record<string, unknown> : {};
    const dayIds = days.map(day => day.id);
    const campIds = (validatedRoute(build.routeWaypoints) ?? []).filter(point => point.kind === "camp").map(point => point.id);
    const currentCamps = readPrivateResources(root);
    // Retain old bookings if a route stop or itinerary day was subsequently removed.
    // Clear only dangling links; do not discard the booking or confirmation details.
    currentCamps.bookings = currentCamps.bookings.map(booking => ({
      ...booking,
      dayId: booking.dayId && !dayIds.includes(booking.dayId) ? "" : booking.dayId,
      waypointId: booking.waypointId && !campIds.includes(booking.waypointId) ? "" : booking.waypointId,
    }));
    const currentArrangements = validateArrangements(root.arrangements ?? []).map(entry => ({
      ...entry, dayId: entry.dayId && !dayIds.includes(entry.dayId) ? "" : entry.dayId,
      ...(entry.waypointId && !campIds.includes(entry.waypointId) ? {waypointId: ""} : {}),
    }));
    if (source === "camp") {
      if (operation === "upsert") {
        if (!Object.prototype.hasOwnProperty.call(incoming, "status")) throw new Error("Missing campsite booking status.");
        const next = currentCamps.bookings.filter(row => row.id !== id).concat(incoming as import("@/lib/trip-resources").CampBooking);
        const updated = validatePrivateResources({ ...currentCamps, bookings: next }, dayIds, campIds);
        if (updated.bookings.some(row => row.id !== id && row.waypointId && row.waypointId === incoming.waypointId && row.arrival === incoming.arrival && row.departure === incoming.departure)) throw new Error("That campsite already has a booking for these dates. Edit the existing entry.");
        currentCamps.bookings = updated.bookings;
      } else {
        if (!currentCamps.bookings.some(row => row.id === id)) throw new Error("Campsite booking not found.");
        currentCamps.bookings = currentCamps.bookings.filter(row => row.id !== id);
      }
    } else if (source === "arrangement") {
      const next = currentArrangements.filter(row => row.id !== id);
      if (operation === "upsert") next.push(incoming as import("@/lib/trip-arrangements").TripArrangement);
      else if (next.length === currentArrangements.length) throw new Error("Reservation not found.");
      const validated = validateArrangements(next, dayIds, campIds);
      root.arrangements = validated;
    }
    // A separate field is used for these records. Keep water and food data;
    // obsolete freeform permit/reservation notes are intentionally cleared.
    const phase6 = { ...currentCamps, bookings: currentCamps.bookings };
    const arrangements = source === "arrangement" ? root.arrangements as import("@/lib/trip-arrangements").TripArrangement[] : currentArrangements;
    await tx.build.update({ where: { id: buildId, userId: access.userId }, data: {
      tripLogistics: JSON.parse(JSON.stringify({ ...root, permits:"", reservations:"", phase6, arrangements })),
    } });
    return { arrangements, bookings: phase6.bookings };
  });
  revalidatePath(`/build/${buildId}`);
  return saved;
}


/** Add a real overnight stop from the booking editor without requiring a
 * trailhead or existing hiking route. Conflict-check the source snapshot so
 * a stale Logistics panel cannot overwrite newer map edits. */
export async function addBookingCampsiteStop(f: FormData) {
  const buildId = text(f, "buildId", 200)!;
  const access = await requireBuildAccess(buildId);
  const dayId = text(f, "dayId", 200);
  const name = text(f, "name", 200);
  const latitude = number(f, "lat", -90, 90);
  const longitude = number(f, "lng", -180, 180);
  const expectedRoute = text(f, "expectedRoute", 1500000) ?? "[]";
  if (!name || !dayId || latitude === null || longitude === null) throw new Error("Choose a campground and an itinerary day.");
  const id = crypto.randomUUID();
  const point = {id, name, kind: "camp" as const, lat: latitude, lng: longitude, elevationM: null, dayId};
  await mutateBuildWithRevision(buildId, access.userId, "route", "Added overnight campsite", async tx => {
    const [build, days] = await Promise.all([
      tx.build.findUnique({where:{id:buildId,userId:access.userId},select:{routeWaypoints:true}}),
      tx.tripDay.findMany({where:{buildId},select:{id:true,date:true}}),
    ]);
    if (!build) throw new Error("Trip not found.");
    const old = validatedRoute(build.routeWaypoints) ?? [];
    let expected: unknown;
    try { expected = JSON.parse(expectedRoute); } catch { throw new Error("Invalid itinerary snapshot."); }
    const normalizedExpected = validatedRoute(expected);
    if (!normalizedExpected || JSON.stringify(old) !== JSON.stringify(normalizedExpected)) throw new Error("The itinerary changed. Reload before adding a campground so your route edits are preserved.");
    if (old.length >= 200) throw new Error("The route already has 200 stops.");
    if (!days.some(day => day.id === dayId)) throw new Error("That trip day no longer exists.");
    const ordered = [...days].sort((a,b)=>+new Date(a.date)-+new Date(b.date));
    const targetIndex = ordered.findIndex(day => day.id === dayId);
    let insertAt = old.length;
    for (let i=0;i<old.length;i++) {
      const dayIndex=ordered.findIndex(day => day.id === old[i].dayId);
      if (dayIndex > targetIndex) {insertAt=i;break;}
    }
    // Within the selected day, append after existing stops rather than
    // placing a campsite before the day's trailhead.
    const result = [...old.slice(0,insertAt),point,...old.slice(insertAt)];
    if (insertAt > 0) {
      result[insertAt-1] = {...result[insertAt-1], trailToNext:undefined, viaToNext:undefined};
    }
    const validated = validatedRoute(result);
    if (!validated) throw new Error("Could not add the campsite to this itinerary.");
    await tx.build.update({where:{id:buildId,userId:access.userId},data:{routeWaypoints:validated}});
  });
  revalidatePath(`/build/${buildId}`);
  return point;
}
