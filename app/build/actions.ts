"use server";

import { saveTripDetails, saveTripDay } from "@/lib/trip-planner-actions";
import { parseDates } from "@/lib/trip-planner";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { currentBuildUserId, hasGuestBuildAccess, requireBuildAccess, requireBuildItemAccess, setCurrentBuild } from "@/lib/build-access";
import { guestBuildCookieName } from "@/lib/guest-build-token";
import { getDestination } from "@/lib/destinations";
import { Prisma } from "@/app/generated/prisma/client";
import { randomUUID } from "node:crypto";
import { remapRouteDays, validatedRoute } from "@/lib/itinerary-links";
import { getBuildSnapshot, lockBuild, mutateBuildWithRevision, recordBuildRevision } from "@/lib/build-history";
import { combinedQuantity, formNumber, formText, parseBuildDetails, parseLogistics, MAX_GEAR_QUANTITY } from "@/lib/build-validation";

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) throw new Error("Invalid TrailPicker import file.");
  return value as Record<string, unknown>;
}

function optionalText(value: unknown, max: number) {
  if (value == null || value === "") return null;
  if (typeof value !== "string" || value.length > max) throw new Error("Invalid TrailPicker import file.");
  return value;
}

function optionalNumber(value: unknown, min: number, max: number, integer = false) {
  if (value == null || value === "") return null;
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value))) {
    throw new Error("Invalid TrailPicker import file.");
  }
  return value;
}

function importDate(value: unknown) {
  if (value == null || value === "") return null;
  if (typeof value !== "string") throw new Error("Invalid TrailPicker import file.");
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid TrailPicker import date.");
  return date;
}

function importItem(value: unknown) {
  const item = asRecord(value);
  const quantity = optionalNumber(item.quantity, 1, 999, true) ?? 1;
  const gearId = optionalText(item.gearId, 200);
  const gearName = optionalText(item.gearName, 200);
  const gearNameSnapshot = optionalText(item.gearNameSnapshot, 200);
  return {
    gearId,
    gearName,
    quantity,
    isConsumable: item.isConsumable === true,
    isWorn: item.isWorn === true,
    customCategory: optionalText(item.customCategory, 100),
    gearNameSnapshot,
    weightSnapshot: optionalNumber(item.weightSnapshot, 0, 1_000_000, true),
    priceSnapshot: optionalNumber(item.priceSnapshot, 0, 1_000_000),
  };
}

function importDay(value: unknown) {
  const day = asRecord(value);
  const sourceId = optionalText(day.id, 200);
  const date = importDate(day.date);
  if (!date) throw new Error("Imported itinerary day is missing a date.");
  const text = (key: string, max = 5000) => optionalText(day[key], max);
  return {
    sourceId,
    date,
    minTemperature: optionalNumber(day.minTemperature, -100, 60, true),
    conditions: text("conditions", 20),
    notes: text("notes"),
    startLocation: text("startLocation", 500),
    endLocation: text("endLocation", 500),
    distanceKm: optionalNumber(day.distanceKm, 0, 1000),
    elevationGainM: optionalNumber(day.elevationGainM, 0, 20000, true),
    elevationLossM: optionalNumber(day.elevationLossM, 0, 20000, true),
    durationMinutes: optionalNumber(day.durationMinutes, 0, 1440, true),
    campsite: text("campsite"),
    reservation: text("reservation"),
    waterSource: text("waterSource"),
    waterCarryL: optionalNumber(day.waterCarryL, 0, 100),
    trailConditions: text("trailConditions"),
    activities: text("activities"),
  };
}

export async function getBuildExport(buildId: string) {
  const access = await requireBuildAccess(buildId);
  const snapshot = await getBuildSnapshot(access.id, access.userId);

  return {
    format: "trailpicker-build",
    version: 3,
    exportedAt: new Date().toISOString(),
    ...snapshot,
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId")?.toString() ?? "";
  const access = await requireBuildAccess(buildId);
  const raw = formData.get("payload");
  const mode = formData.get("mode") === "replace" ? "replace" : "merge";

  if (typeof raw !== "string" || raw.length > 2_000_000) throw new Error("Import file is missing or too large.");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("That file is not valid JSON.");
  }
  const payload = asRecord(parsed);
  if (payload.format != null && payload.format !== "trailpicker-build") throw new Error("That JSON file is not a TrailPicker build export.");
  if (!Array.isArray(payload.items) || payload.items.length > 1000) throw new Error("Import must contain no more than 1,000 gear items.");
  if (payload.days != null && (!Array.isArray(payload.days) || payload.days.length > 366)) throw new Error("Import must contain no more than 366 itinerary days.");

  const items = payload.items.map(importItem);
  const days = Array.isArray(payload.days) ? payload.days.map(importDay) : null;
  if (days && new Set(days.map(day => day.date.toISOString().slice(0, 10))).size !== days.length) {
    throw new Error("Imported itinerary contains duplicate dates.");
  }
  if (mode === "replace") {
    const ids = items.map(item => item.gearId).filter((id): id is string => Boolean(id));
    if (new Set(ids).size !== ids.length) throw new Error("Replacement import contains the same gear item more than once.");
  }
  // Reject invalid route objects before the database transaction rather than
  // storing values that readWaypoints later silently removes from the UI.
  const importRoute = mode === "replace" ? validatedRoute(payload.routeWaypoints) : null;
  const importLogistics = mode === "replace" ? parseLogistics(payload.tripLogistics) : null;
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));
  let unassignedStops = 0;

  await mutateBuildWithRevision(access.id, access.userId, "import",
    mode === "replace" ? `Imported and replaced build with ${items.length} gear items` : `Imported ${items.length} gear items`,
    async (tx) => {
    if (mode === "replace") {
      const startDate = importDate(payload.startDate);
      const endDate = importDate(payload.endDate);
      if ((startDate == null) !== (endDate == null) ||
          (startDate && endDate && (endDate < startDate || endDate.getTime() - startDate.getTime() > 365 * 86_400_000))) {
        throw new Error("Imported trip dates are invalid or exceed 366 days.");
      }

      const name = optionalText(payload.name, 100) ?? "Imported build";
      const people = optionalNumber(payload.people, 1, 100, true) ?? 1;
      const location = optionalText(payload.location, 500);
      const locationLat = optionalNumber(payload.locationLat, -90, 90);
      const locationLng = optionalNumber(payload.locationLng, -180, 180);
      if ((locationLat == null) !== (locationLng == null)) throw new Error("Imported coordinates must include latitude and longitude.");

      const importedRows = days
        ? days.map(({ sourceId, ...day }) => ({ ...day, id: randomUUID(), buildId: access.id, sourceId }))
        : startDate && endDate
          ? getDateRange(startDate, endDate).map((date) => ({ id: randomUUID(), buildId: access.id, date, sourceId: null }))
          : [];
      const linked = remapRouteDays(importRoute,
        days?.map((day) => ({ id: day.sourceId, date: day.date })) ?? [],
        importedRows,
      );
      unassignedStops = linked.unassignedCount;

      await tx.build.update({
        where: { id: access.id, userId: access.userId },
        data: {
          name,
          destinationId: optionalText(payload.destinationId, 200),
          location,
          locationLat,
          locationLng,
          startDate,
          endDate,
          people,
          minTemperature: optionalNumber(payload.minTemperature, -100, 60, true),
          conditions: optionalText(payload.conditions, 50),
          routeWaypoints: linked.points == null ? Prisma.DbNull : JSON.parse(JSON.stringify(linked.points)),
          tripLogistics: importLogistics == null ? Prisma.DbNull : importLogistics,
        },
      });

      await tx.buildItem.deleteMany({ where: { buildId: access.id } });
      await tx.tripDay.deleteMany({ where: { buildId: access.id } });

      if (importedRows.length) {
        await tx.tripDay.createMany({ data: importedRows.map(({ sourceId, ...row }) => {
          void sourceId;
          return row;
        }) });
      }
    }

    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      if (mode === "merge" && gearId) {
        const existing = await tx.buildItem.findUnique({
          where: { buildId_gearId: { buildId: access.id, gearId } },
          select: { quantity: true },
        });
        combinedQuantity(existing?.quantity ?? 0, item.quantity);
        await tx.buildItem.upsert({
          where: { buildId_gearId: { buildId: access.id, gearId } },
          update: {
            quantity: { increment: item.quantity },
            isConsumable: item.isConsumable,
            isWorn: item.isWorn,
          },
          create: {
            buildId: access.id,
            gearId,
            quantity: item.quantity,
            isConsumable: item.isConsumable,
            isWorn: item.isWorn,
          },
        });
      } else {
        await tx.buildItem.create({
          data: {
            buildId: access.id,
            gearId,
            quantity: item.quantity,
            isConsumable: item.isConsumable,
            isWorn: item.isWorn,
            customCategory: item.customCategory,
            gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Imported item",
            weightSnapshot: item.weightSnapshot,
            priceSnapshot: item.priceSnapshot,
          },
        });
      }
    }
  });
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { mode, itemCount: items.length, dayCount: days?.length ?? 0, unassignedStops };
}

export async function duplicateBuild(formData: FormData) {
  const buildId = formData.get("buildId") as string;

  const access = await requireBuildAccess(buildId);
  const ownerId = await currentBuildUserId();
  const original = await prisma.build.findUnique({
    where: { id: buildId, userId: access.userId },
    include: { items: true, days: true },
  });

  if (!original) throw new Error("Build not found.");

  if (original.items.some(item => !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_GEAR_QUANTITY)) {
    throw new Error("This build contains an invalid gear quantity. Correct it before duplicating.");
  }
  const copiedDays = original.days.map((day) => ({ ...day, newId: randomUUID() }));
  const mappedRoute = remapRouteDays(
    validatedRoute(original.routeWaypoints),
    original.days,
    copiedDays.map((day) => ({ id: day.newId, date: day.date })),
  );
  const copy = await prisma.$transaction(async (tx) => {
    const created = await tx.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: ownerId,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      location: original.location,
      destinationId: original.destinationId,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      routeWaypoints: mappedRoute.points == null ? undefined : JSON.parse(JSON.stringify(mappedRoute.points)),
      tripLogistics: original.tripLogistics ?? undefined,
      days: { create: copiedDays.map(({ id, newId, buildId, createdAt, updatedAt, ...day }) => {
          // These fields belong to the original day, not the duplicated day.
          void id;
          void buildId;
          void createdAt;
          void updatedAt;
          return { ...day, id: newId };
        }) },
      items: {
        create: original.items.map((item) => ({
          gearId: item.gearId,
          quantity: item.quantity,
          isConsumable: item.isConsumable,
          isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: item.gearNameSnapshot,
          weightSnapshot: item.weightSnapshot,
          priceSnapshot: item.priceSnapshot,
        })),
      },
    },
    });
    await recordBuildRevision(created.id, ownerId, "copy", `Created from ${original.name}`, tx);
    return created;
  });
  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const itemId = formText(formData, "itemId", 200, true)!;
  const category = formText(formData, "category", 20, true);
  if (!category || !["base", "worn", "consumable"].includes(category)) throw new Error("Invalid gear category.");
  const item = await requireBuildItemAccess(buildId, itemId);
  await mutateBuildWithRevision(buildId, item.accessUserId, "gear", "Changed gear category", async tx => {
    await tx.buildItem.update({
      where: { id: itemId, buildId, build: { userId: item.accessUserId } },
      data: { isWorn: category === "worn", isConsumable: category === "consumable" },
    });
  });
  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const access = await requireBuildAccess(buildId);
  const category = formText(formData, "category", 100);
  const name = formText(formData, "name", 200, true)!;
  const weight = formNumber(formData, "weight_g", 0, 1_000_000, true);
  const price = formNumber(formData, "price_cad", 0, 1_000_000);
  await mutateBuildWithRevision(buildId, access.userId, "gear", `Added custom item: ${name}`, async tx => {
    await tx.buildItem.create({
      data: { buildId, customCategory: category, gearNameSnapshot: name, weightSnapshot: weight, priceSnapshot: price },
    });
  });
  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formText(formData, "itemId", 200, true)!;
  const buildId = formText(formData, "buildId", 200, true)!;
  const rawDelta = formText(formData, "delta", 2, true);
  if (rawDelta !== "1" && rawDelta !== "-1") throw new Error("Invalid quantity change.");
  const item = await requireBuildItemAccess(buildId, itemId);
  const delta = Number(rawDelta);
  await mutateBuildWithRevision(buildId, item.accessUserId, "gear", "Changed gear quantity", async tx => {
    // Conditional atomic update: concurrent requests cannot overwrite each other.
    const result = await tx.buildItem.updateMany({
      where: { id: itemId, buildId, build: { userId: item.accessUserId },
        quantity: delta === 1 ? { lt: MAX_GEAR_QUANTITY } : { gt: 1 } },
      data: { quantity: delta === 1 ? { increment: 1 } : { decrement: 1 } },
    });
    if (result.count !== 1 && delta === 1) throw new Error(`Maximum quantity is ${MAX_GEAR_QUANTITY}.`);
  });
  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild(formData?: FormData) {
  const userId = await currentBuildUserId();
  if (!userId) return;
  const cookieStore = await cookies();
  const submittedId = formData?.get("buildId");
  const buildId = typeof submittedId === "string" ? submittedId : cookieStore.get("currentBuild")?.value;
  if (!buildId || !(await hasGuestBuildAccess(buildId))) return;
  const result = await prisma.$transaction(async tx => {
    await lockBuild(tx, buildId);
    return tx.build.updateMany({ where: { id: buildId, userId: null }, data: { userId } });
  });
  if (result.count) {
    cookieStore.delete(guestBuildCookieName(buildId));
    revalidatePath(`/build/${buildId}`);
    revalidatePath("/profile/builds");
  }
}
export async function createBuild(formData: FormData) {
  const ownerId = await currentBuildUserId();
  const parsed = parseBuildDetails(formData);
  const selected = getDestination(parsed.destinationId);
  const location = selected ? `${selected.name}, ${selected.park}` : parsed.location;
  const locationLat = selected?.latitude ?? parsed.latitude;
  const locationLng = selected?.longitude ?? parsed.longitude;
  const build = await prisma.$transaction(async tx => {
    const created = await tx.build.create({
      data: {
        name: parsed.name,
        destinationId: selected?.id ?? null,
        location, locationLat, locationLng, ...parsed.dates,
        people: parsed.people, minTemperature: parsed.minTemperature,
        conditions: parsed.conditions, userId: ownerId,
      },
    });
    if (created.startDate && created.endDate) {
      await tx.tripDay.createMany({
        data: getDateRange(created.startDate, created.endDate).map(date => ({ buildId: created.id, date })),
        skipDuplicates: true,
      });
    }
    await recordBuildRevision(created.id, ownerId, "create", "Created build", tx);
    return created;
  });
  await setCurrentBuild(build.id, !ownerId);
  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const gearId = formText(formData, "gearId", 200, true)!;
  const access = await requireBuildAccess(buildId);
  await mutateBuildWithRevision(buildId, access.userId, "gear", "Added gear", async tx => {
    const existing = await tx.buildItem.findUnique({
      where: { buildId_gearId: { buildId, gearId } }, select: { quantity: true },
    });
    combinedQuantity(existing?.quantity ?? 0, 1);
    await tx.buildItem.upsert({
      where: { buildId_gearId: { buildId, gearId } },
      update: { quantity: { increment: 1 } },
      create: { buildId, gearId },
    });
  });
  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const buildId = formText(formData, "buildId", 200, true)!;
  const itemId = formText(formData, "itemId", 200, true)!;
  const item = await requireBuildItemAccess(buildId, itemId);
  await mutateBuildWithRevision(buildId, item.accessUserId, "gear", "Removed gear", async tx => {
    await tx.buildItem.delete({ where: { id: itemId, buildId, build: { userId: item.accessUserId } } });
  });
  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) { return saveTripDetails(formData); }
export async function updateTripDay(formData: FormData) { return saveTripDay(formData); }
