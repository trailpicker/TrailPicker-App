import "server-only";
import { findAccessibleBuild } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";

// Public access is only for rendering. Mutations keep requireBuildAccess.
export async function getBuildViewAccess(buildId: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200) {
    return { status: "missing" as const };
  }
  const owned = await findAccessibleBuild(buildId);
  if (owned) return { status: "allowed" as const, canEdit: true, access: owned };

  const build = await prisma.build.findUnique({
    where: { id: buildId },
    select: { id: true, isPublic: true },
  });
  if (!build) return { status: "missing" as const };
  if (!build.isPublic) return { status: "private" as const };
  return { status: "allowed" as const, canEdit: false, access: null };
}
