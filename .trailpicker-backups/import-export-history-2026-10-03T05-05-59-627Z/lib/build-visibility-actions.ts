"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  // Repeat the owner condition in the write to prevent a stale guest claim.
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { isPublic },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Changed build visibility");
  revalidatePath(`/build/${access.id}`);
}
