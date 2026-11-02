"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mutateBuildWithRevision } from "@/lib/build-history";
import { combinedQuantity } from "@/lib/build-validation";

async function userId() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user.id;
}

function gearIdFrom(formData: FormData) {
  const gearId = formData.get("gearId");
  if (typeof gearId !== "string" || !gearId || gearId.length > 200) throw new Error("Gear item is required.");
  return gearId;
}

async function requireGear(gearId: string) {
  if (!await prisma.gear.findUnique({ where: { id: gearId }, select: { id: true } })) throw new Error("This product is no longer available.");
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
  await requireGear(gearId);
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
  await requireGear(gearId);
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
  await requireGear(gearId);
  await prisma.$transaction([
    prisma.ownedGear.upsert({ where: { userId_gearId: { userId: userIdValue, gearId } }, update: {}, create: { userId: userIdValue, gearId } }),
    prisma.favorite.deleteMany({ where: { userId: userIdValue, gearId } }),
  ]);
  refreshGearPages(gearId);
}

export async function addGearToCurrentBuild(formData: FormData) {
  const userIdValue = await userId();
  const gearId = gearIdFrom(formData);
  await requireGear(gearId);
  const buildId = (await cookies()).get("currentBuild")?.value;
  if (!buildId) redirect("/profile/builds");
  const build = await prisma.build.findFirst({ where: { id: buildId, userId: userIdValue }, select: { id: true } });
  if (!build) redirect("/profile/builds");
  await mutateBuildWithRevision(build.id, userIdValue, "gear", "Added gear from library", async tx => {
    const existing = await tx.buildItem.findUnique({ where: { buildId_gearId: { buildId: build.id, gearId } }, select: { quantity: true } });
    combinedQuantity(existing?.quantity ?? 0, 1);
    await tx.buildItem.upsert({
      where: { buildId_gearId: { buildId: build.id, gearId } },
      update: { quantity: { increment: 1 } },
      create: { buildId: build.id, gearId },
    });
  });
  revalidatePath(`/build/${build.id}`);
  redirect(`/build/${build.id}`);
}


export async function updateOwnedGearDetails(form: FormData) {
  const owner = await userId();
  const gearId = gearIdFrom(form);
  const priceValue = form.get("purchasedPrice");
  if (typeof priceValue !== "string") throw new Error("Invalid purchase price.");
  const priceText = priceValue.trim();
  const purchasedPrice = priceText ? Number(priceText) : null;
  if (purchasedPrice !== null && (!Number.isFinite(purchasedPrice) || purchasedPrice < 0 || purchasedPrice > 1000000)) throw new Error("Enter a purchase price from $0 to $1,000,000 CAD.");
  const dateValue = form.get("purchasedAt");
  if (typeof dateValue !== "string") throw new Error("Invalid purchase date.");
  const dateText = dateValue.trim();
  const purchasedAt = dateText ? new Date(dateText + "T00:00:00.000Z") : null;
  if (purchasedAt && (!/^\d{4}-\d{2}-\d{2}$/.test(dateText) || Number.isNaN(purchasedAt.getTime()) || purchasedAt.toISOString().slice(0,10) !== dateText)) throw new Error("Enter a valid purchase date.");
  const notes = form.get("notes");
  if (typeof notes !== "string" || notes.trim().length > 2000) throw new Error("Notes must be 2,000 characters or fewer.");
  const result = await prisma.ownedGear.updateMany({ where: { userId: owner, gearId }, data: { purchasedPrice, purchasedAt, notes: notes.trim() || null } });
  if (result.count !== 1) throw new Error("This item is not in your gear closet.");
  refreshGearPages(gearId);
}
