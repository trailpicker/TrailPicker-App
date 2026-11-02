import { readWaypoints, type Waypoint } from "./trip-planner";
import { routeForSave } from "./waypoint-map";

export type DayLink = { id?: string | null; date: Date | string };

function dateKey(value: Date | string): string {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error("An itinerary day has an invalid date.");
  return date.toISOString().slice(0, 10);
}

// Strict validation at the import/restore boundary: never silently filter bad stops.
export function validatedRoute(value: unknown): Waypoint[] | null {
  if (value == null) return null;
  if (!Array.isArray(value)) throw new Error("The imported route must be a list of stops.");
  const points = readWaypoints(value);
  if (points.length !== value.length) throw new Error("The route contains an invalid waypoint. Nothing was imported.");
  try {
    return routeForSave(points);
  } catch (cause) {
    throw new Error(`Invalid waypoint: ${cause instanceof Error ? cause.message : "Check the route."}`);
  }
}

export function remapRouteDays(
  points: Waypoint[] | null,
  sourceDays: DayLink[],
  targetDays: DayLink[],
): { points: Waypoint[] | null; unassignedCount: number } {
  if (!points) return { points: null, unassignedCount: 0 };
  const sourceDateById = new Map(sourceDays.filter((day) => day.id).map((day) => [day.id!, dateKey(day.date)]));
  const targetIdByDate = new Map(targetDays.filter((day) => day.id).map((day) => [dateKey(day.date), day.id!]));
  let unassignedCount = 0;
  const updated = points.map((point) => {
    if (!point.dayId) return point;
    const date = sourceDateById.get(point.dayId);
    const mappedId = date ? targetIdByDate.get(date) : undefined;
    if (!mappedId) {
      unassignedCount++;
      return { ...point, dayId: null };
    }
    return { ...point, dayId: mappedId };
  });
  return { points: updated, unassignedCount };
}
