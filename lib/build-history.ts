import "server-only";

import { prisma } from "@/lib/prisma";

export type BuildSnapshotItem = {
  gearId: string | null;
  gearName: string | null;
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
  customCategory: string | null;
  gearNameSnapshot: string | null;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
};

export type BuildSnapshotDay = {
  date: string;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
  startLocation: string | null;
  endLocation: string | null;
  distanceKm: number | null;
  elevationGainM: number | null;
  elevationLossM: number | null;
  durationMinutes: number | null;
  campsite: string | null;
  reservation: string | null;
  waterSource: string | null;
  waterCarryL: number | null;
  trailConditions: string | null;
  activities: string | null;
};

export type BuildSnapshot = {
  name: string;
  destinationId: string | null;
  location: string | null;
  locationLat: number | null;
  locationLng: number | null;
  startDate: string | null;
  endDate: string | null;
  people: number;
  minTemperature: number | null;
  conditions: string | null;
  routeWaypoints: unknown;
  tripLogistics: unknown;
  items: BuildSnapshotItem[];
  days: BuildSnapshotDay[];
};

export async function getBuildSnapshot(buildId: string, userId: string | null): Promise<BuildSnapshot> {
  const build = await prisma.build.findUnique({
    where: { id: buildId, userId },
    include: {
      items: {
        orderBy: { id: "asc" },
        include: { gear: { select: { name: true } } },
      },
      days: { orderBy: { date: "asc" } },
    },
  });

  if (!build) throw new Error("Build not found.");

  return {
    name: build.name,
    destinationId: build.destinationId,
    location: build.location,
    locationLat: build.locationLat,
    locationLng: build.locationLng,
    startDate: build.startDate?.toISOString() ?? null,
    endDate: build.endDate?.toISOString() ?? null,
    people: build.people,
    minTemperature: build.minTemperature,
    conditions: build.conditions,
    routeWaypoints: build.routeWaypoints ?? null,
    tripLogistics: build.tripLogistics ?? null,
    items: build.items.map((item) => ({
      gearId: item.gearId,
      gearName: item.gear?.name ?? item.gearNameSnapshot,
      quantity: item.quantity,
      isConsumable: item.isConsumable,
      isWorn: item.isWorn,
      customCategory: item.customCategory,
      gearNameSnapshot: item.gearNameSnapshot,
      weightSnapshot: item.weightSnapshot,
      priceSnapshot: item.priceSnapshot,
    })),
    days: build.days.map((day) => ({
      date: day.date.toISOString(),
      minTemperature: day.minTemperature,
      conditions: day.conditions,
      notes: day.notes,
      startLocation: day.startLocation,
      endLocation: day.endLocation,
      distanceKm: day.distanceKm,
      elevationGainM: day.elevationGainM,
      elevationLossM: day.elevationLossM,
      durationMinutes: day.durationMinutes,
      campsite: day.campsite,
      reservation: day.reservation,
      waterSource: day.waterSource,
      waterCarryL: day.waterCarryL,
      trailConditions: day.trailConditions,
      activities: day.activities,
    })),
  };
}


export async function ensureBuildRevisionBaseline(buildId: string, userId: string | null) {
  const count = await prisma.buildRevision.count({ where: { buildId } });
  if (count > 0) return;
  const snapshot = await getBuildSnapshot(buildId, userId);
  await prisma.buildRevision.create({
    data: {
      buildId,
      action: "history",
      summary: "Version history started",
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}

export async function recordBuildRevision(
  buildId: string,
  userId: string | null,
  action: string,
  summary: string,
) {
  await prisma.build.update({ where: { id: buildId, userId }, data: { updatedAt: new Date() } });
  const snapshot = await getBuildSnapshot(buildId, userId);

  await prisma.buildRevision.create({
    data: {
      buildId,
      action: action.slice(0, 50),
      summary: summary.slice(0, 240),
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}
