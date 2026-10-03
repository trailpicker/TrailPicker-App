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
import { ensureBuildRevisionBaseline, getBuildSnapshot, recordBuildRevision } from "@/lib/build-history";

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
  const date = importDate(day.date);
  if (!date) throw new Error("Imported itinerary day is missing a date.");
  const text = (key: string, max = 5000) => optionalText(day[key], max);
  return {
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
    version: 2,
    exportedAt: new Date().toISOString(),
    ...snapshot,
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId")?.toString() ?? "";
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
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
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
    if (mode === "replace") {
      const startDate = importDate(payload.startDate);
      const endDate = importDate(payload.endDate);
      if ((startDate == null) !== (endDate == null) || (startDate && endDate && endDate < startDate)) {
        throw new Error("Imported trip dates are invalid.");
      }

      const name = optionalText(payload.name, 100) ?? "Imported build";
      const people = optionalNumber(payload.people, 1, 100, true) ?? 1;
      const location = optionalText(payload.location, 500);
      const locationLat = optionalNumber(payload.locationLat, -90, 90);
      const locationLng = optionalNumber(payload.locationLng, -180, 180);
      if ((locationLat == null) !== (locationLng == null)) throw new Error("Imported coordinates must include latitude and longitude.");

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
          routeWaypoints: payload.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.routeWaypoints)),
          tripLogistics: payload.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(payload.tripLogistics)),
        },
      });

      await tx.buildItem.deleteMany({ where: { buildId: access.id } });
      await tx.tripDay.deleteMany({ where: { buildId: access.id } });

      if (days) {
        if (days.length) await tx.tripDay.createMany({ data: days.map((day) => ({ ...day, buildId: access.id })) });
      } else if (startDate && endDate) {
        const range = getDateRange(startDate, endDate);
        if (range.length) await tx.tripDay.createMany({ data: range.map((date) => ({ buildId: access.id, date })) });
      }
    }

    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      if (mode === "merge" && gearId) {
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

  await recordBuildRevision(
    access.id,
    access.userId,
    "import",
    mode === "replace" ? `Imported and replaced build with ${items.length} gear item${items.length === 1 ? "" : "s"}` : `Imported ${items.length} gear item${items.length === 1 ? "" : "s"}`,
  );
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { mode, itemCount: items.length, dayCount: days?.length ?? 0 };
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

  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: ownerId,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      location: original.location,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      routeWaypoints: original.routeWaypoints ?? undefined,
      tripLogistics: original.tripLogistics ?? undefined,
      days: { create: original.days.map(({ id: _id, buildId: _buildId, createdAt: _createdAt, updatedAt: _updatedAt, ...day }) => day) },
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

  await recordBuildRevision(copy.id, ownerId, "copy", `Created from ${original.name}`);
  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear category");
  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const weightRaw = formData.get("weight_g") as string;
  const priceRaw = formData.get("price_cad") as string;

  if (!name?.trim()) {
    throw new Error("Item name is required.");
  }

  await prisma.buildItem.create({
    data: {
      build: { connect: { id: buildId, userId: access.userId } },
      customCategory: category,
      gearNameSnapshot: name.trim(),
      weightSnapshot: weightRaw ? Number(weightRaw) : null,
      priceSnapshot: priceRaw ? Number(priceRaw) : null,
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", `Added custom item: ${name.trim()}`);
  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const delta = Number(formData.get("delta"));

  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  if (!Number.isInteger(delta) || Math.abs(delta) !== 1) throw new Error("Invalid quantity change.");
  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: { quantity: newQuantity },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Changed gear quantity");
  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild(formData?: FormData) {
  const userId = await currentBuildUserId();
  if (!userId) return;
  const cookieStore = await cookies();
  const submittedId = formData?.get("buildId");
  const buildId = typeof submittedId === "string" ? submittedId : cookieStore.get("currentBuild")?.value;
  if (!buildId || !(await hasGuestBuildAccess(buildId))) return;
  const result = await prisma.build.updateMany({
    where: { id: buildId, userId: null }, data: { userId },
  });
  if (result.count) {
    cookieStore.delete(guestBuildCookieName(buildId));
    revalidatePath(`/build/${buildId}`);
    revalidatePath("/profile/builds");
  }
}
export async function createBuild(formData: FormData) {
  const ownerId = await currentBuildUserId();

  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Build name is required.");
  }

  const startDateRaw = formData.get("startDate")?.toString();
  const endDateRaw = formData.get("endDate")?.toString();
  const peopleRaw = formData.get("people")?.toString();
  const minTemperatureRaw =
    formData.get("minTemperature")?.toString();
  const conditions = formData.get("conditions")?.toString();

  const destinationIdRaw =
    formData.get("destinationId")?.toString() || null;

  const selectedDestination = getDestination(destinationIdRaw);


  const submittedLocation =
    formData.get("location")?.toString().trim();

  const submittedLat =
    formData.get("locationLat")?.toString();

  const submittedLng =
    formData.get("locationLng")?.toString();

  const location = selectedDestination
    ? `${selectedDestination.name}, ${selectedDestination.park}`
    : submittedLocation || null;

  const locationLat = selectedDestination
    ? selectedDestination.latitude
    : submittedLat
      ? Number(submittedLat)
      : null;

  const locationLng = selectedDestination
    ? selectedDestination.longitude
    : submittedLng
      ? Number(submittedLng)
      : null;

  const dates = parseDates(startDateRaw ?? "", endDateRaw ?? "");
  const build = await prisma.build.create({
    data: {
      name,
      destinationId: selectedDestination?.id ?? null,
      location,
      locationLat,
      locationLng,
      ...dates,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw
        ? Number(minTemperatureRaw)
        : null,
      conditions: conditions || null,
      userId: ownerId,
    },
  });

  if (build.startDate && build.endDate) {
    const range = getDateRange(
      build.startDate,
      build.endDate,
    );

    await prisma.tripDay.createMany({
      data: range.map((date) => ({
        buildId: build.id,
        date,
      })),
      skipDuplicates: true,
    });
  }

  await recordBuildRevision(build.id, ownerId, "create", "Created build");
  await setCurrentBuild(build.id, !ownerId);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(buildId, access.userId);
  const gearId = formData.get("gearId") as string;

  await prisma.buildItem.upsert({
    where: {
      buildId_gearId: { buildId, gearId },
      build: { userId: access.userId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      build: { connect: { id: buildId, userId: access.userId } },
      gear: { connect: { id: gearId } },
    },
  });

  await recordBuildRevision(buildId, access.userId, "gear", "Added gear");
  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  await ensureBuildRevisionBaseline(buildId, item.accessUserId);

  await prisma.buildItem.delete({
    where: {
      id: itemId,
      buildId,
      build: { userId: item.accessUserId },
    },
  });

  await recordBuildRevision(buildId, item.accessUserId, "gear", "Removed gear");
  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) { return saveTripDetails(formData); }
export async function updateTripDay(formData: FormData) { return saveTripDay(formData); }
