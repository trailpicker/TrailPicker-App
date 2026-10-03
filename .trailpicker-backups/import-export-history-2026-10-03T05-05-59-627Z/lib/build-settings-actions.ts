"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { revalidatePath } from "next/cache";
import { ensureBuildRevisionBaseline, recordBuildRevision } from "@/lib/build-history";

export async function renameBuild(buildId: string, name: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200 || typeof name !== "string") {
    throw new Error("Invalid build name.");
  }
  const trimmed = name.trim();
  if (!trimmed || trimmed.length > 100) throw new Error("Use a build name between 1 and 100 characters.");
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);
  const result = await prisma.build.updateMany({
    where: { id: access.id, userId: access.userId },
    data: { name: trimmed },
  });
  if (result.count !== 1) throw new Error("Build access changed. Refresh and try again.");
  await recordBuildRevision(access.id, access.userId, "settings", "Renamed build");
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
}
