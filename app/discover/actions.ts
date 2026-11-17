"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { currentBuildUserId, setCurrentBuild } from "@/lib/build-access";
import { recordBuildRevision } from "@/lib/build-history";
import { remapRouteDays, validatedRoute } from "@/lib/itinerary-links";
import { getDestination } from "@/lib/destinations";
import { createBuild } from "@/app/build/actions";

function submittedId(formData: FormData): string {
  const id = formData.get("buildId");
  if (typeof id !== "string" || !id || id.length > 200) throw new Error("Invalid build.");
  return id;
}

function requestLogin(): never {
  redirect("/api/auth/signin?callbackUrl=%2Fdiscover");
}

export async function changeSavedBuild(formData: FormData): Promise<void> {
  const id = submittedId(formData);
  const intent = formData.get("intent");
  if (intent !== "save" && intent !== "unsave") throw new Error("Invalid bookmark action.");
  const userId = await currentBuildUserId();
  if (!userId) requestLogin();

  if (intent === "unsave") {
    await prisma.savedBuild.deleteMany({ where: { userId, buildId: id } });
  } else {
    const publicBuild = await prisma.build.findFirst({ where: { id, isPublic: true }, select: { id: true } });
    if (!publicBuild) throw new Error("This build is no longer public.");
    await prisma.savedBuild.upsert({
      where: { userId_buildId: { userId, buildId: id } },
      create: { userId, buildId: id },
      update: {},
    });
  }
  revalidatePath("/discover");
  revalidatePath("/discover/community");
  revalidatePath("/discover/saved");
  revalidatePath(`/discover/trips/${encodeURIComponent(id)}`);
  revalidatePath(`/discover/packs/${encodeURIComponent(id)}`);
}

/** Bookmark a catalog destination for the signed-in account. Idempotent on retries. */
export async function changeSavedDestination(formData: FormData): Promise<void> {
  const rawId = formData.get("destinationId");
  const intent = formData.get("intent");
  if (typeof rawId !== "string" || !rawId || rawId.length > 200) throw new Error("Invalid destination.");
  if (intent !== "save" && intent !== "unsave") throw new Error("Invalid bookmark action.");
  const userId = await currentBuildUserId();
  if (!userId) requestLogin();

  if (intent === "save") {
    // A stale or forged ID must never create a meaningless bookmark.
    if (!getDestination(rawId)) throw new Error("Destination not found.");
    await prisma.savedDestination.upsert({
      where: { userId_destinationId: { userId, destinationId: rawId } },
      create: { userId, destinationId: rawId },
      update: {},
    });
  } else {
    // Removal is still possible if a destination was removed from the catalog.
    await prisma.savedDestination.deleteMany({ where: { userId, destinationId: rawId } });
  }
  revalidatePath("/discover");
  revalidatePath("/discover/search");
  revalidatePath("/discover/saved");
  revalidatePath(`/discover/destinations/${encodeURIComponent(rawId)}`);
}

/** Create a PRIVATE, independent copy of a PUBLIC build. */
export async function copyPublicBuild(formData: FormData): Promise<void> {
  const id = submittedId(formData);
  const userId = await currentBuildUserId();
  if (!userId) requestLogin();

  const source = await prisma.build.findFirst({
    where: { id, isPublic: true },
    include: { items: true, days: { orderBy: { date: "asc" } } },
  });
  if (!source) throw new Error("This build is no longer public.");
  if (source.items.length > 1000 || source.days.length > 366 || source.items.some(
    (item) => !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 999,
  )) throw new Error("The source build is too large or contains invalid gear quantities.");

  const copiedDays = source.days.map((day) => ({ original: day, id: randomUUID() }));
  // Remap waypoint references to the copied day IDs, never the owner's IDs.
  const mapped = remapRouteDays(
    validatedRoute(source.routeWaypoints),
    source.days,
    copiedDays.map((day) => ({ id: day.id, date: day.original.date })),
  );

  const copy = await prisma.$transaction(async (tx) => {
    const created = await tx.build.create({
      data: {
        name: `${source.name.slice(0, 91)} (copy)`,
        userId,
        isPublic: false,
        destinationId: source.destinationId,
        location: source.location,
        locationLat: source.locationLat,
        locationLng: source.locationLng,
        startDate: source.startDate,
        endDate: source.endDate,
        people: source.people,
        minTemperature: source.minTemperature,
        conditions: source.conditions,
        // Never duplicate private logistics or booking information.
        routeWaypoints: mapped.points == null ? undefined : JSON.parse(JSON.stringify(
          mapped.points.map(({ note: _note, ...point }) => point),
        )),
        days: {
          create: copiedDays.map(({ original: day, id: newId }) => ({
            id: newId,
            date: day.date,
            minTemperature: day.minTemperature,
            conditions: day.conditions,
            startLocation: day.startLocation,
            endLocation: day.endLocation,
            distanceKm: day.distanceKm,
            elevationGainM: day.elevationGainM,
            elevationLossM: day.elevationLossM,
            durationMinutes: day.durationMinutes,
            campsite: day.campsite,
            waterSource: day.waterSource,
            waterCarryL: day.waterCarryL,
            trailConditions: day.trailConditions,
            activities: day.activities,
            // Excluded on purpose: notes, reservation.
          })),
        },
        items: {
          create: source.items.map((item) => ({
            gearId: item.gearId,
            quantity: item.quantity,
            customCategory: item.customCategory,
            gearNameSnapshot: item.gearNameSnapshot,
            weightSnapshot: item.weightSnapshot,
            priceSnapshot: item.priceSnapshot,
            isConsumable: item.isConsumable,
            isWorn: item.isWorn,
            customWeight: item.customWeight,
          })),
        },
      },
    });
    await recordBuildRevision(created.id, userId, "copy", `Created from a public build`, tx);
    return created;
  });

  await setCurrentBuild(copy.id);
  redirect(`/build/${copy.id}${source.days.length ? "?tab=trip" : ""}`);
}

/** Start a real trip using an existing destination record, including guest ownership. */
export async function startDestinationPlan(formData: FormData): Promise<void> {
  const raw = formData.get("destinationId");
  if (typeof raw !== "string" || raw.length > 200) throw new Error("Invalid destination.");
  const destination = getDestination(raw);
  if (!destination) throw new Error("Destination not found.");

  // Only forward supported fields. createBuild validates dates, traveller count,
  // creates the private build, seeds editable days, and redirects to Trip Planner.
  const requestedName = formData.get("name");
  if (requestedName !== null &&
      (typeof requestedName !== "string" || requestedName.length > 100)) {
    throw new Error("Invalid trip name.");
  }
  const values = new FormData();
  values.set("name", typeof requestedName === "string" && requestedName.trim()
    ? requestedName.trim() : `${destination.name.slice(0, 92)} trip`);
  values.set("destinationId", destination.id);
  for (const key of ["startDate", "endDate", "people"] as const) {
    const item = formData.get(key);
    if (item === null) continue;
    if (typeof item !== "string" || item.length > 40) throw new Error(`Invalid ${key}.`);
    values.set(key, item);
  }
  // This flag is set by the server action, not trusted from the browser form.
  values.set("discoverPlan", "1");
  if (formData.get("seedItinerary") === "1") values.set("seedItinerary", "1");
  await createBuild(values);
}

