"use server";

import { currentBuildUserId } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function userId() {
  const id = await currentBuildUserId();
  if (!id) throw new Error("Sign in to manage your reviews.");
  return id;
}
function text(form: FormData, key: string, max: number) {
  const value = form.get(key);
  if (typeof value !== "string" || value.trim().length > max) throw new Error(`Invalid ${key}.`);
  return value.trim();
}
function refresh(gearId: string) {
  revalidatePath(`/gear/${gearId}`);
  revalidatePath("/gear", "layout");
  revalidatePath("/profile/reviews");
}

export async function saveGearReview(form: FormData) {
  const owner = await userId();
  const gearId = text(form, "gearId", 200);
  if (!gearId) throw new Error("Choose a product.");
  const rating = Number(form.get("rating"));
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new Error("Choose a rating from 1 to 5.");
  const title = text(form, "title", 120);
  const body = text(form, "body", 4000);
  if (body.length < 10) throw new Error("Write at least 10 characters about your experience.");
  if (!await prisma.gear.findUnique({ where: { id: gearId }, select: { id: true } })) throw new Error("This product is no longer available.");
  await prisma.$transaction(async tx => {
    // The existing schema has no review unique key. Serialize writes for this
    // member/product pair without needing a database migration.
    await tx.$queryRaw`SELECT 1 AS locked FROM pg_advisory_xact_lock(hashtext(${owner}), hashtext(${gearId}))`;
    const existing = await tx.review.findFirst({ where: { userId: owner, gearId }, orderBy: { createdAt: "desc" }, select: { id: true } });
    if (existing) await tx.review.updateMany({ where: { id: existing.id, userId: owner, gearId }, data: { rating, title: title || null, body } });
    else await tx.review.create({ data: { userId: owner, gearId, rating, title: title || null, body } });
  });
  refresh(gearId);
}

export async function deleteGearReview(form: FormData) {
  const owner = await userId();
  const reviewId = text(form, "reviewId", 200);
  if (!reviewId) throw new Error("Choose a review.");
  const review = await prisma.review.findFirst({ where: { id: reviewId, userId: owner }, select: { gearId: true } });
  if (!review) throw new Error("Review not found.");
  await prisma.review.deleteMany({ where: { id: reviewId, userId: owner } });
  refresh(review.gearId);
}
