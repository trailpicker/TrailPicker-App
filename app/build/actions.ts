"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";
import { auth } from "@/auth";
import { getDestination } from "@/lib/destinations";

export async function getBuildExport(buildId: string) {
  const build = await prisma.build.findUnique({
    where: { id: buildId },
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
  const payload = JSON.parse(formData.get("payload") as string);

  if (!Array.isArray(payload.items)) {
    throw new Error("Invalid import file.");
  }

  for (const item of payload.items) {
    if (item.gearId) {
      await prisma.buildItem.upsert({
        where: { buildId_gearId: { buildId, gearId: item.gearId } },
        update: { quantity: { increment: item.quantity ?? 1 } },
        create: {
          buildId,
          gearId: item.gearId,
          quantity: item.quantity ?? 1,
          isConsumable: !!item.isConsumable,
          isWorn: !!item.isWorn,
        },
      });
    } else {
      await prisma.buildItem.create({
        data: {
          buildId,
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

  const original = await prisma.build.findUnique({
    where: { id: buildId },
    include: { items: true },
  });

  if (!original) throw new Error("Build not found.");

  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      location: original.location,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
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

  redirect(`/build/${copy.id}`);
}
export async function setItemCategory(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;
  const category = formData.get("category") as "base" | "worn" | "consumable";

  await prisma.buildItem.update({
    where: { id: itemId },
    data: {
      isWorn: category === "worn",
      isConsumable: category === "consumable",
    },
  });

  revalidatePath(`/build/${buildId}`);
}

export async function addCustomItem(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const category = formData.get("category") as string;
  const name = formData.get("name") as string;
  const weightRaw = formData.get("weight_g") as string;
  const priceRaw = formData.get("price_cad") as string;

  if (!name?.trim()) {
    throw new Error("Item name is required.");
  }

  await prisma.buildItem.create({
    data: {
      buildId,
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

  const item = await prisma.buildItem.findUnique({
    where: { id: itemId },
  });

  if (!item) {
    throw new Error("Item not found.");
  }

  const newQuantity = Math.max(1, item.quantity + delta);

  await prisma.buildItem.update({
    where: { id: itemId },
    data: { quantity: newQuantity },
  });

  revalidatePath(`/build/${buildId}`);
}
export async function claimCurrentBuild() {
  const session = await auth();
  if (!session?.user) return;

  const cookieStore = await cookies();
  const buildId = cookieStore.get("currentBuild")?.value;
  if (!buildId) return;

  await prisma.build.updateMany({
    where: { id: buildId, userId: null },
    data: { userId: session.user.id },
  });
}
export async function createBuild(formData: FormData) {
  const session = await auth();

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

  const destinationId = selectedDestination?.id ?? null;

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

  const build = await prisma.build.create({
    data: {
      name,
      location,
      locationLat,
      locationLng,
      startDate: startDateRaw
        ? new Date(startDateRaw)
        : null,
      endDate: endDateRaw
        ? new Date(endDateRaw)
        : null,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw
        ? Number(minTemperatureRaw)
        : null,
      conditions: conditions || null,
      userId: session?.user?.id ?? null,
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

  const cookieStore = await cookies();
  cookieStore.set("currentBuild", build.id);

  redirect(`/build/${build.id}`);
}
export async function addGear(formData: FormData) {
  const buildId = formData.get("buildId") as string;
  const gearId = formData.get("gearId") as string;

  await prisma.buildItem.upsert({
    where: {
      buildId_gearId: { buildId, gearId },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      buildId,
      gearId,
    },
  });

  redirect(`/build/${buildId}`);
}

export async function removeGear(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;

  await prisma.buildItem.delete({
    where: {
      id: itemId,
    },
  });

  redirect(`/build/${buildId}`);
}

export async function updateTripDetails(formData: FormData) {
  const buildId = formData.get("buildId") as string;

  const startDateRaw =
    formData.get("startDate")?.toString() || "";

  const endDateRaw =
    formData.get("endDate")?.toString() || "";

  const startDate = startDateRaw
    ? new Date(startDateRaw)
    : null;

  const endDate = endDateRaw
    ? new Date(endDateRaw)
    : null;

  const people = Number(formData.get("people")) || 1;

  const minTemperature = formData.get("minTemperature")
    ? Number(formData.get("minTemperature"))
    : null;

  const conditions =
    formData.get("conditions")?.toString() || null;

  const destinationIdRaw =
    formData.get("destinationId")?.toString() || null;

  const selectedDestination = getDestination(destinationIdRaw);

  const destinationId = selectedDestination?.id ?? null;

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

  await prisma.build.update({
    where: { id: buildId },
    data: {
      location,
      locationLat,
      locationLng,
      startDate,
      endDate,
      people,
      minTemperature,
      conditions,
    },
  });

  if (
    startDate &&
    endDate &&
    startDate.getTime() <= endDate.getTime()
  ) {
    const range = getDateRange(startDate, endDate);

    await prisma.tripDay.createMany({
      data: range.map((date) => ({
        buildId,
        date,
      })),
      skipDuplicates: true,
    });

    await prisma.tripDay.deleteMany({
      where: {
        buildId,
        date: { notIn: range },
      },
    });
  } else {
    await prisma.tripDay.deleteMany({
      where: { buildId },
    });
  }

  revalidatePath(`/build/${buildId}`);
}

export async function updateTripDay(formData: FormData) {
  const dayId = formData.get("dayId") as string;
  const buildId = formData.get("buildId") as string;

  const minTemperature = formData.get("minTemperature")
    ? Number(formData.get("minTemperature"))
    : null;
  const conditions = (formData.get("conditions") as string) || null;
  const notes = (formData.get("notes") as string) || null;

  await prisma.tripDay.update({
    where: { id: dayId },
    data: { minTemperature, conditions, notes },
  });

  revalidatePath(`/build/${buildId}`);
}