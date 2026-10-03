"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  // Repeat the owner condition in the write to prevent a stale guest claim.
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { isPublic },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  revalidatePath(`/build/${access.id}`);
}
