"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { requireBuildAccess } from "@/lib/build-access";
import {
  ensureBuildRevisionBaseline,
  recordBuildRevision,
  type BuildSnapshot,
  type BuildSnapshotDay,
  type BuildSnapshotItem,
} from "@/lib/build-history";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseSnapshot(value: unknown): BuildSnapshot {
  if (!isRecord(value) || typeof value.name !== "string" || !Array.isArray(value.items) || !Array.isArray(value.days)) {
    throw new Error("This history entry can’t be restored.");
  }
  return value as unknown as BuildSnapshot;
}

function dateOrNull(value: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("This history entry contains an invalid date.");
  return date;
}

function safeItem(item: BuildSnapshotItem) {
  return {
    gearId: typeof item.gearId === "string" ? item.gearId : null,
    gearName: typeof item.gearName === "string" ? item.gearName : null,
    quantity: Number.isInteger(item.quantity) && item.quantity > 0 ? Math.min(item.quantity, 999) : 1,
    isConsumable: Boolean(item.isConsumable),
    isWorn: Boolean(item.isWorn),
    customCategory: typeof item.customCategory === "string" ? item.customCategory.slice(0, 100) : null,
    gearNameSnapshot: typeof item.gearNameSnapshot === "string" ? item.gearNameSnapshot.slice(0, 200) : null,
    weightSnapshot: Number.isFinite(item.weightSnapshot) ? item.weightSnapshot : null,
    priceSnapshot: Number.isFinite(item.priceSnapshot) ? item.priceSnapshot : null,
  };
}

function safeDay(day: BuildSnapshotDay) {
  const date = new Date(day.date);
  if (Number.isNaN(date.getTime())) throw new Error("This history entry contains an invalid itinerary date.");
  return { ...day, date };
}

export async function getBuildHistory(buildId: string) {
  const access = await requireBuildAccess(buildId);

  await ensureBuildRevisionBaseline(access.id, access.userId);

  const revisions = await prisma.buildRevision.findMany({
    where: { buildId: access.id },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });

  return revisions.map((revision, index) => {
    const snapshot = isRecord(revision.snapshot) ? revision.snapshot : null;
    const itemCount = snapshot && Array.isArray(snapshot.items) ? snapshot.items.length : 0;
    const dayCount = snapshot && Array.isArray(snapshot.days) ? snapshot.days.length : 0;
    const name = snapshot && typeof snapshot.name === "string" ? snapshot.name : "Build";

    return {
      id: revision.id,
      action: revision.action,
      summary: revision.summary,
      createdAt: revision.createdAt.toISOString(),
      itemCount,
      dayCount,
      name,
      isCurrent: index === 0,
    };
  });
}

export async function restoreBuildRevision(buildId: string, revisionId: string) {
  const access = await requireBuildAccess(buildId);
  if (typeof revisionId !== "string" || !revisionId || revisionId.length > 200) {
    throw new Error("Invalid history entry.");
  }

  const revision = await prisma.buildRevision.findFirst({
    where: { id: revisionId, buildId: access.id },
    select: { snapshot: true, createdAt: true },
  });
  if (!revision) throw new Error("History entry not found.");

  const snapshot = parseSnapshot(revision.snapshot);
  await recordBuildRevision(access.id, access.userId, "history", "Saved before restore");
  if (snapshot.items.length > 1000 || snapshot.days.length > 366) {
    throw new Error("This history entry is too large to restore.");
  }

  const items = snapshot.items.map(safeItem);
  const days = snapshot.days.map(safeDay);
  const requestedGearIds = [...new Set(items.map((item) => item.gearId).filter((id): id is string => Boolean(id)))];
  const existingGear = requestedGearIds.length
    ? await prisma.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } })
    : [];
  const existingGearIds = new Set(existingGear.map((gear) => gear.id));

  await prisma.$transaction(async (tx) => {
    await tx.build.update({
      where: { id: access.id, userId: access.userId },
      data: {
        name: snapshot.name.slice(0, 100) || "Restored build",
        destinationId: snapshot.destinationId ?? null,
        location: snapshot.location ?? null,
        locationLat: snapshot.locationLat ?? null,
        locationLng: snapshot.locationLng ?? null,
        startDate: dateOrNull(snapshot.startDate),
        endDate: dateOrNull(snapshot.endDate),
        people: Number.isInteger(snapshot.people) && snapshot.people > 0 ? Math.min(snapshot.people, 100) : 1,
        minTemperature: Number.isFinite(snapshot.minTemperature) ? snapshot.minTemperature : null,
        conditions: snapshot.conditions ?? null,
        routeWaypoints: snapshot.routeWaypoints == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.routeWaypoints)),
        tripLogistics: snapshot.tripLogistics == null ? Prisma.DbNull : JSON.parse(JSON.stringify(snapshot.tripLogistics)),
      },
    });

    await tx.buildItem.deleteMany({ where: { buildId: access.id } });
    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      await tx.buildItem.create({
        data: {
          buildId: access.id,
          gearId,
          quantity: item.quantity,
          isConsumable: item.isConsumable,
          isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Restored item",
          weightSnapshot: item.weightSnapshot,
          priceSnapshot: item.priceSnapshot,
        },
      });
    }

    await tx.tripDay.deleteMany({ where: { buildId: access.id } });
    if (days.length) {
      await tx.tripDay.createMany({
        data: days.map((day) => ({ ...day, buildId: access.id })),
      });
    }
  });

  const restoredDate = revision.createdAt.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
  await recordBuildRevision(access.id, access.userId, "restore", `Restored version from ${restoredDate}`);
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");

  return { ok: true };
}
