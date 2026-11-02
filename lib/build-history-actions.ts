"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { randomUUID } from "node:crypto";
import { remapRouteDays, validatedRoute } from "@/lib/itinerary-links";
import { requireBuildAccess } from "@/lib/build-access";
import { parseLogistics } from "@/lib/build-validation";
import {
  ensureBuildRevisionBaseline,
  getBuildSnapshot,
  mutateBuildWithRevision,
  recordBuildRevision,
  snapshotsEqual,
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
  const { id: sourceId, ...fields } = day;
  void sourceId;
  return { ...fields, date, id: randomUUID() };
}

function snapshotMeta(value: unknown) {
  const snapshot = isRecord(value) ? value : null;
  return {
    itemCount: snapshot && Array.isArray(snapshot.items) ? snapshot.items.length : 0,
    dayCount: snapshot && Array.isArray(snapshot.days) ? snapshot.days.length : 0,
    name: snapshot && typeof snapshot.name === "string" ? snapshot.name : "Build",
  };
}

export async function getBuildHistory(buildId: string) {
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);

  const revisions = await prisma.buildRevision.findMany({
    where: { buildId: access.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 60,
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });

  return revisions.map((revision, index) => ({
    id: revision.id,
    action: revision.action,
    summary: revision.summary,
    createdAt: revision.createdAt.toISOString(),
    ...snapshotMeta(revision.snapshot),
    isCurrent: index === 0,
  }));
}

async function restoreSnapshot(
  access: { id: string; userId: string | null },
  revisionId: string,
  summary: string,
  expectedLatestId?: string,
  expectedLatestSnapshot?: unknown,
) {
  let unassignedStops = 0;
  await mutateBuildWithRevision(access.id, access.userId, "restore", summary, async tx => {
    const revision = await tx.buildRevision.findFirst({
      where: { id: revisionId, buildId: access.id }, select: { snapshot: true },
    });
    if (!revision) throw new Error("History entry not found.");
    const snapshot = parseSnapshot(revision.snapshot);
    if (snapshot.items.length > 1000 || snapshot.days.length > 366) throw new Error("This history entry is too large to restore.");

    const items = snapshot.items.map(safeItem);
    const days = snapshot.days.map(safeDay);
    const linked = remapRouteDays(
      validatedRoute(snapshot.routeWaypoints),
      snapshot.days.map(day => ({ id: day.id, date: day.date })),
      days,
    );
    unassignedStops = linked.unassignedCount;
    const logistics = parseLogistics(snapshot.tripLogistics);

    const latest = await tx.buildRevision.findFirst({
      where: { buildId: access.id },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { id: true, snapshot: true },
    });
    if (expectedLatestId && (latest?.id !== expectedLatestId || JSON.stringify(latest?.snapshot) !== JSON.stringify(expectedLatestSnapshot))) {
      throw new Error("Build history changed. Refresh before undoing.");
    }
    const current = await getBuildSnapshot(access.id, access.userId, tx);
    if (!latest || !isRecord(latest.snapshot) || !snapshotsEqual(current, parseSnapshot(latest.snapshot))) {
      // Both the safety snapshot and restore are in the SAME transaction.
      await recordBuildRevision(access.id, access.userId, "history", "Saved before restore", tx);
    }

    const requestedGearIds = [...new Set(items.map(item => item.gearId).filter((id): id is string => Boolean(id)))];
    const existingGear = requestedGearIds.length
      ? await tx.gear.findMany({ where: { id: { in: requestedGearIds } }, select: { id: true } }) : [];
    const existingGearIds = new Set(existingGear.map(gear => gear.id));

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
        routeWaypoints: linked.points == null ? Prisma.DbNull : JSON.parse(JSON.stringify(linked.points)),
        tripLogistics: logistics == null ? Prisma.DbNull : logistics,
      },
    });
    await tx.buildItem.deleteMany({ where: { buildId: access.id } });
    for (const item of items) {
      const gearId = item.gearId && existingGearIds.has(item.gearId) ? item.gearId : null;
      await tx.buildItem.create({
        data: {
          buildId: access.id, gearId, quantity: item.quantity,
          isConsumable: item.isConsumable, isWorn: item.isWorn,
          customCategory: item.customCategory,
          gearNameSnapshot: gearId ? item.gearNameSnapshot : item.gearNameSnapshot ?? item.gearName ?? "Restored item",
          weightSnapshot: item.weightSnapshot, priceSnapshot: item.priceSnapshot,
        },
      });
    }
    await tx.tripDay.deleteMany({ where: { buildId: access.id } });
    if (days.length) {
      await tx.tripDay.createMany({ data: days.map(day => ({ ...day, buildId: access.id })) });
    }
  });
  revalidatePath(`/build/${access.id}`);
  revalidatePath("/profile/builds");
  return { ok: true, unassignedStops };
}

export async function restoreBuildRevision(buildId: string, revisionId: string) {
  const access = await requireBuildAccess(buildId);
  if (typeof revisionId !== "string" || !revisionId || revisionId.length > 200) {
    throw new Error("Invalid history entry.");
  }

  const revision = await prisma.buildRevision.findFirst({
    where: { id: revisionId, buildId: access.id },
    select: { id: true, snapshot: true, createdAt: true, summary: true },
  });
  if (!revision) throw new Error("History entry not found.");

  const restoredDate = revision.createdAt.toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return restoreSnapshot(access, revision.id, `Restored ${restoredDate}`);
}

export async function undoLastBuildChange(buildId: string) {
  const access = await requireBuildAccess(buildId);
  await ensureBuildRevisionBaseline(access.id, access.userId);

  const revisions = await prisma.buildRevision.findMany({
    where: { buildId: access.id },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 2,
    select: { id: true, snapshot: true, createdAt: true, summary: true },
  });
  if (revisions.length < 2) throw new Error("Nothing to undo yet.");

  const target = revisions[1];
  const result = await restoreSnapshot(access, target.id, `Undid: ${revisions[0].summary}`, revisions[0].id, revisions[0].snapshot);
  return { ...result, undone: revisions[0].summary };
}
