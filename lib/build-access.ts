import "server-only";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createGuestBuildToken, guestBuildCookieName, GUEST_BUILD_MAX_AGE, verifyGuestBuildToken } from "@/lib/guest-build-token";

export async function currentBuildUserId(): Promise<string | null> {
  const session = await auth();
  // Resolve through the DB, consistent with existing profile actions. Default
  // Auth.js sessions need not expose the adapter user ID without a callback.
  if (!session?.user?.email) return null;
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }, select: { id: true },
  });
  return user?.id ?? null;
}

export async function hasGuestBuildAccess(buildId: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200) return false;
  const cookieStore = await cookies();
  return verifyGuestBuildToken(buildId, cookieStore.get(guestBuildCookieName(buildId))?.value);
}

export async function findAccessibleBuild(buildId: string) {
  if (typeof buildId !== "string" || !buildId || buildId.length > 200) return null;
  const userId = await currentBuildUserId();
  const guest = await hasGuestBuildAccess(buildId);
  // currentBuild is navigation state, never authorization.
  if (!userId && !guest) return null;
  return prisma.build.findFirst({
    where: { id: buildId, OR: [
      ...(userId ? [{ userId }] : []),
      ...(guest ? [{ userId: null }] : []),
    ] },
    select: { id: true, userId: true },
  });
}

export async function requireBuildAccess(buildId: string) {
  const build = await findAccessibleBuild(buildId);
  if (!build) throw new Error("Build not found.");
  return build;
}

export async function requireBuildPageAccess(buildId: string) {
  const build = await findAccessibleBuild(buildId);
  if (!build) notFound();
  return build;
}

export async function requireBuildItemAccess(buildId: string, itemId: string) {
  if (typeof itemId !== "string" || !itemId || itemId.length > 200) throw new Error("Item not found.");
  const build = await requireBuildAccess(buildId);
  const item = await prisma.buildItem.findFirst({
    where: { id: itemId, buildId: build.id, build: { userId: build.userId } },
  });
  if (!item) throw new Error("Item not found.");
  return { ...item, accessUserId: build.userId };
}

export async function requireTripDayAccess(buildId: string, dayId: string) {
  if (typeof dayId !== "string" || !dayId || dayId.length > 200) throw new Error("Day not found.");
  const build = await requireBuildAccess(buildId);
  const day = await prisma.tripDay.findFirst({
    where: { id: dayId, buildId: build.id, build: { userId: build.userId } },
  });
  if (!day) throw new Error("Day not found.");
  return { ...day, accessUserId: build.userId };
}

export async function setCurrentBuild(buildId: string, guest = false) {
  const cookieStore = await cookies();
  const options = { httpOnly: true, sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production", path: "/", maxAge: GUEST_BUILD_MAX_AGE };
  if (guest) cookieStore.set(guestBuildCookieName(buildId), createGuestBuildToken(buildId), options);
  cookieStore.set("currentBuild", buildId, options);
}
