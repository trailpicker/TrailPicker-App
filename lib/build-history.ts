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

function stable(value: unknown) {
  return JSON.stringify(value ?? null);
}

export function snapshotsEqual(a: BuildSnapshot, b: BuildSnapshot) {
  return stable(a) === stable(b);
}

function itemKey(item: BuildSnapshotItem) {
  if (item.gearId) return `gear:${item.gearId}`;
  return `custom:${item.customCategory ?? ""}:${item.gearNameSnapshot ?? item.gearName ?? ""}`;
}

function itemName(item: BuildSnapshotItem) {
  return item.gearName ?? item.gearNameSnapshot ?? "gear item";
}

function cleanName(name: string) {
  return name.length > 48 ? `${name.slice(0, 45)}…` : name;
}

function prettyDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "itinerary day";
  return date.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
}

function changedDay(previous: BuildSnapshot, current: BuildSnapshot) {
  if (previous.days.length !== current.days.length) return null;
  const changed = current.days.filter((day, index) => stable(day) !== stable(previous.days[index]));
  return changed.length === 1 ? changed[0] : null;
}

function changedItem(previous: BuildSnapshot, current: BuildSnapshot) {
  const before = new Map(previous.items.map((item) => [itemKey(item), item]));
  const after = new Map(current.items.map((item) => [itemKey(item), item]));
  const added = current.items.filter((item) => !before.has(itemKey(item)));
  const removed = previous.items.filter((item) => !after.has(itemKey(item)));
  const changed = current.items
    .map((item) => ({ before: before.get(itemKey(item)), after: item }))
    .filter((pair): pair is { before: BuildSnapshotItem; after: BuildSnapshotItem } => Boolean(pair.before) && stable(pair.before) !== stable(pair.after));
  return { added, removed, changed };
}

function summarizeChange(previous: BuildSnapshot | null, current: BuildSnapshot, action: string, fallback: string) {
  if (!previous || ["create", "copy", "import", "restore", "history", "baseline"].includes(action)) return fallback;

  if (previous.name !== current.name) return `Renamed build to “${current.name}”`;

  const items = changedItem(previous, current);
  if (items.added.length === 1 && items.removed.length === 0 && items.changed.length === 0) {
    return `Added ${cleanName(itemName(items.added[0]))}`;
  }
  if (items.removed.length === 1 && items.added.length === 0 && items.changed.length === 0) {
    return `Removed ${cleanName(itemName(items.removed[0]))}`;
  }
  if (items.changed.length === 1 && items.added.length === 0 && items.removed.length === 0) {
    const { before, after } = items.changed[0];
    const name = cleanName(itemName(after));
    if (before.quantity !== after.quantity) return `Changed ${name} quantity to ${after.quantity}`;
    if (before.isWorn !== after.isWorn || before.isConsumable !== after.isConsumable) {
      if (after.isWorn) return `Marked ${name} as worn`;
      if (after.isConsumable) return `Marked ${name} as consumable`;
      return `Marked ${name} as base weight`;
    }
  }

  const day = changedDay(previous, current);
  if (day) return `Updated ${prettyDate(day.date)} itinerary`;

  if (stable(previous.routeWaypoints) !== stable(current.routeWaypoints)) return "Updated route";
  if (stable(previous.tripLogistics) !== stable(current.tripLogistics)) return "Updated trip logistics";

  const datesChanged = previous.startDate !== current.startDate || previous.endDate !== current.endDate;
  const locationChanged = previous.location !== current.location || previous.locationLat !== current.locationLat || previous.locationLng !== current.locationLng;
  const tripSettingsChanged = previous.people !== current.people || previous.minTemperature !== current.minTemperature || previous.conditions !== current.conditions || previous.destinationId !== current.destinationId;
  if (datesChanged && !locationChanged && !tripSettingsChanged) return "Changed trip dates";
  if (locationChanged && !datesChanged && !tripSettingsChanged) return "Changed trip location";
  if (datesChanged || locationChanged || tripSettingsChanged || previous.days.length !== current.days.length) return "Updated trip details";

  return fallback;
}

function summaryGroupKey(summary: string) {
  return summary
    .replace(/ quantity to \d+$/i, " quantity")
    .replace(/^Updated [A-Z][a-z]{2} \d{1,2} itinerary$/i, (value) => value)
    .toLowerCase();
}

function canCoalesce(action: string, previousAction: string, previousSummary: string, nextSummary: string, previousCreatedAt: Date) {
  if (["create", "copy", "import", "restore", "history", "baseline", "settings"].includes(action)) return false;
  if (action !== previousAction) return false;
  if (Date.now() - previousCreatedAt.getTime() > 90_000) return false;
  return summaryGroupKey(previousSummary) === summaryGroupKey(nextSummary);
}

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
      action: "baseline",
      summary: "First saved version",
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
}

export async function recordBuildRevision(
  buildId: string,
  userId: string | null,
  action: string,
  requestedSummary: string,
) {
  await prisma.build.update({ where: { id: buildId, userId }, data: { updatedAt: new Date() } });

  const last = await prisma.buildRevision.findFirst({
    where: { buildId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: { id: true, action: true, summary: true, snapshot: true, createdAt: true },
  });
  const previous = last?.snapshot && typeof last.snapshot === "object" && !Array.isArray(last.snapshot)
    ? last.snapshot as unknown as BuildSnapshot
    : null;
  const snapshot = await getBuildSnapshot(buildId, userId);
  const summary = summarizeChange(previous, snapshot, action, requestedSummary).slice(0, 240);
  const safeAction = action.slice(0, 50);
  const jsonSnapshot = JSON.parse(JSON.stringify(snapshot));

  if (last && canCoalesce(safeAction, last.action, last.summary, summary, last.createdAt)) {
    await prisma.buildRevision.update({
      where: { id: last.id },
      data: { summary, snapshot: jsonSnapshot, createdAt: new Date() },
    });
    return last.id;
  }

  const revision = await prisma.buildRevision.create({
    data: {
      buildId,
      action: safeAction,
      summary,
      snapshot: jsonSnapshot,
    },
    select: { id: true },
  });
  return revision.id;
}
