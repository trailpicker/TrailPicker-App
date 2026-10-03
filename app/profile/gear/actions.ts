"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function userId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user.id;
}

function gearIdFrom(formData: FormData) {
  const gearId = String(formData.get("gearId") || "");
  if (!gearId) throw new Error("Gear item is required.");
  return gearId;
}

function refreshGearPages(gearId: string) {
  revalidatePath("/profile", "layout");
  revalidatePath("/profile/gear");
  revalidatePath("/profile/favorites");
  revalidatePath(`/gear/${gearId}`);
}

export async function addOwnedGear(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await prisma.ownedGear.upsert({
    where: { userId_gearId: { userId: userIdValue, gearId } },
    update: {},
    create: { userId: userIdValue, gearId },
  });
  refreshGearPages(gearId);
}

export async function removeOwnedGear(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await prisma.ownedGear.deleteMany({ where: { userId: userIdValue, gearId } });
  refreshGearPages(gearId);
}

export async function addFavorite(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await prisma.favorite.upsert({
    where: { userId_gearId: { userId: userIdValue, gearId } },
    update: {},
    create: { userId: userIdValue, gearId },
  });
  refreshGearPages(gearId);
}

export async function removeFavorite(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } });
  refreshGearPages(gearId);
}

export async function moveFavoriteToGear(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await prisma.$transaction([
    prisma.ownedGear.upsert({ where: { userId_gearId: { userId: userIdValue, gearId } }, update: {}, create: { userId: userIdValue, gearId } }),
    prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } }),
  ]);
  refreshGearPages(gearId);
}

export async function addGearToCurrentBuild(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  const buildId = (await cookies()).get("currentBuild")?.value;
  if (!buildId) redirect("/profile/builds");
  const build = await prisma.build.findFirst({ where: { id: buildId, userId: userIdValue }, select: { id: true } });
  if (!build) redirect("/profile/builds");
  await prisma.buildItem.upsert({
    where: { buildId_gearId: { buildId: build.id, gearId } },
    update: { quantity: { increment: 1 } },
    create: { buildId: build.id, gearId },
  });
  revalidatePath(`/build/${build.id}`);
  redirect(`/build/${build.id}`);
}
