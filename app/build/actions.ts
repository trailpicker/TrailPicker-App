"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { getDateRange } from "@/lib/trip";

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

export async function createBuild(formData: FormData) {
  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Build name is required.");
  }

  const location = formData.get("location")?.toString().trim();
  const locationLatRaw = formData.get("locationLat")?.toString();
  const locationLngRaw = formData.get("locationLng")?.toString();
  const startDateRaw = formData.get("startDate")?.toString();
  const endDateRaw = formData.get("endDate")?.toString();
  const peopleRaw = formData.get("people")?.toString();
  const minTemperatureRaw = formData.get("minTemperature")?.toString();
  const conditions = formData.get("conditions")?.toString();

  const build = await prisma.build.create({
    data: {
      name,
      location: location || null,
      locationLat: locationLatRaw ? Number(locationLatRaw) : null,
      locationLng: locationLngRaw ? Number(locationLngRaw) : null,
      startDate: startDateRaw ? new Date(startDateRaw) : null,
      endDate: endDateRaw ? new Date(endDateRaw) : null,
      people: peopleRaw ? Number(peopleRaw) : 1,
      minTemperature: minTemperatureRaw ? Number(minTemperatureRaw) : null,
      conditions: conditions || null,
    },
  });

  if (build.startDate && build.endDate) {
    const range = getDateRange(build.startDate, build.endDate);
    await prisma.tripDay.createMany({
      data: range.map((date) => ({ buildId: build.id, date })),
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

  const location = (formData.get("location") as string) || null;
  const locationLatRaw = formData.get("locationLat") as string;
  const locationLngRaw = formData.get("locationLng") as string;
  const startDateRaw = formData.get("startDate") as string;
  const endDateRaw = formData.get("endDate") as string;
  const startDate = startDateRaw ? new Date(startDateRaw) : null;
  const endDate = endDateRaw ? new Date(endDateRaw) : null;
  const people = Number(formData.get("people")) || 1;
  const minTemperature = formData.get("minTemperature")
    ? Number(formData.get("minTemperature"))
    : null;
  const conditions = (formData.get("conditions") as string) || null;

  await prisma.build.update({
    where: { id: buildId },
    data: {
      location,
      locationLat: locationLatRaw ? Number(locationLatRaw) : null,
      locationLng: locationLngRaw ? Number(locationLngRaw) : null,
      startDate,
      endDate,
      people,
      minTemperature,
      conditions,
    },
  });

  // Keep TripDay rows in sync with the current date range
  if (startDate && endDate && startDate.getTime() <= endDate.getTime()) {
    const range = getDateRange(startDate, endDate);

    await prisma.tripDay.createMany({
      data: range.map((date) => ({ buildId, date })),
      skipDuplicates: true,
    });

    await prisma.tripDay.deleteMany({
      where: {
        buildId,
        date: { notIn: range },
      },
    });
  } else {
    await prisma.tripDay.deleteMany({ where: { buildId } });
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