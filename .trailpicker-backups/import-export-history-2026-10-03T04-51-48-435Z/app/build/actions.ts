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

export async function getBuildExport(buildId: string) {
  const access = await requireBuildAccess(buildId);
  const build = await prisma.build.findUnique({
    where: { id: buildId, userId: access.userId },
    include: { items: { include: { gear: { select: { id: true, name: true } } } } },
  });

  if (!build) throw new Error("Build not found.");

  return {
    version: 1,
    name: build.name,
    location: build.location,
    startDate: build.startDate,
    endDate: build.endDate,
    people: build.people,
    minTemperature: build.minTemperature,
    conditions: build.conditions,
    items: build.items.map((item) => ({
      gearId: item.gearId,
      gearName: item.gear?.name ?? item.gearNameSnapshot,
      quantity: item.quantity,
      isConsumable: item.isConsumable,
      isWorn: item.isWorn,
      customCategory: item.customCategory,
      gearNameSnapshot: item.gearNameSnapshot,
      weightSnapshot: item.weightSnapshot,
      priceSnapshot: item.priceSnapshot,
    })),
  };
}

export async function importBuildItems(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
  const payload = JSON.parse(formData.get("payload") as string);

  if (!Array.isArray(payload.items)) {
    throw new Error("Invalid import file.");
  }

  for (const item of payload.items) {
    if (item.gearId) {
      await prisma.buildItem.upsert({
        where: { buildId_gearId: { buildId, gearId: item.gearId }, build: { userId: access.userId } },
        update: { quantity: { increment: item.quantity ?? 1 } },
        create: {
          build: { connect: { id: buildId, userId: access.userId } },
          gear: { connect: { id: item.gearId } },
          quantity: item.quantity ?? 1,
          isConsumable: !!item.isConsumable,
          isWorn: !!item.isWorn,
        },
      });
    } else {
      await prisma.buildItem.create({
        data: {
          build: { connect: { id: buildId, userId: access.userId } },
          customCategory: item.customCategory ?? null,
          gearNameSnapshot: item.gearNameSnapshot ?? item.gearName ?? "Imported item",
          weightSnapshot: item.weightSnapshot ?? null,
          priceSnapshot: item.priceSnapshot ?? null,
          quantity: item.quantity ?? 1,
          isConsumable: !!item.isConsumable,
          isWorn: !!item.isWorn,
        },
      });
    }
  }

  revalidatePath(`/build/${buildId}`);
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

  await setCurrentBuild(copy.id, !ownerId);
  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
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

  redirect(`/build/${buildId}`);
}

export async function updateQuantity(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const delta = Number(formData.get("delta"));

  const item = await requireBuildItemAccess(buildId, itemId);

  if (!Number.isInteger(delta) || Math.abs(delta) !== 1) throw new Error("Invalid quantity change.");
  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId, buildId, build: { userId: item.accessUserId } },
    data: { quantity: newQuantity },
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

  await setCurrentBuild(build.id, !ownerId);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const access = await requireBuildAccess(buildId);
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

  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const item = await requireBuildItemAccess(buildId, itemId);

  await prisma.buildItem.delete({
    where: {
      id: itemId,
      buildId,
      build: { userId: item.accessUserId },
    },
  });

  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) { return saveTripDetails(formData); }
export async function updateTripDay(formData: FormData) { return saveTripDay(formData); }
