"use server";

import { requireBuildAccess } from "@/lib/build-access";
import { mutateBuildWithRevision } from "@/lib/build-history";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const required = (form: FormData, key: string) => {
  const value = form.get(key);
  if (typeof value !== "string" || !value || value.length > 200) throw new Error("Invalid comparison request.");
  return value;
};

/** Only replaces a linked product in an owned/authorized build, never another user's item. */
export async function replaceComparedGear(form: FormData): Promise<{ message: string }> {
  const buildId = required(form, "buildId");
  const itemId = required(form, "itemId");
  const newGearId = required(form, "newGearId");
  const access = await requireBuildAccess(buildId);
  const newGear = await prisma.gear.findUnique({ where: { id: newGearId }, select: { id: true, categoryId: true, name: true } });
  if (!newGear) throw new Error("The replacement product is no longer available.");

  await mutateBuildWithRevision(buildId, access.userId, "gear", `Replaced gear with ${newGear.name}`, async tx => {
    // Check everything again under the build's transaction lock; the list may have changed.
    const previous = await tx.buildItem.findFirst({
      where: { id: itemId, buildId, build: { userId: access.userId } },
      include: { gear: { select: { categoryId: true } } },
    });
    if (!previous?.gear) throw new Error("The original product was removed. Refresh and try again.");
    if (previous.gear.categoryId !== newGear.categoryId) throw new Error("Choose a replacement in the same gear category.");
    if (previous.gearId === newGear.id) throw new Error("That product is already selected in the build.");
    const duplicate = await tx.buildItem.findUnique({
      where: { buildId_gearId: { buildId, gearId: newGear.id } }, select: { id: true },
    });
    if (duplicate) throw new Error("The replacement is already in this build. Remove the duplicate first.");
    await tx.buildItem.update({
      where: { id: previous.id },
      data: {
        gearId: newGear.id,
        // Old manual price/weight details must not survive a different product.
        gearNameSnapshot: null, weightSnapshot: null, priceSnapshot: null,
        customWeight: null, customCategory: null,
      },
    });
  });
  revalidatePath(`/build/${buildId}`);
  revalidatePath("/profile/builds");
  return { message: `Replaced with ${newGear.name}. Your build history has been updated.` };
}
