"use server";

import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { mutateBuildWithRevision } from "@/lib/build-history";

export async function setBuildVisibility(buildId: string, isPublic: boolean) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof isPublic !== "boolean") {
    throw new Error("Invalid visibility request.");
  }
  const access = await requireBuildAccess(buildId);
  await mutateBuildWithRevision(access.id, access.userId, "settings", "Changed build visibility", async tx => {
    const result = await tx.build.updateMany({ where: { id: access.id, userId: access.userId }, data: { isPublic } });
    if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  });
  revalidatePath(`/build/${access.id}`);
}
