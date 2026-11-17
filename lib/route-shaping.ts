/** Editor-only route shaping helpers. Shaping coordinates are not itinerary stops. */
import type { LatLng } from "./trail-routing";

// Keep requests and saved payloads bounded; ORS accepts intermediate coordinates.
export const MAX_ROUTE_SHAPING_WAYPOINTS = 10;

export function validShapingWaypoints(value: unknown): value is LatLng[] {
  return Array.isArray(value) && value.length <= MAX_ROUTE_SHAPING_WAYPOINTS &&
    value.every(point => Array.isArray(point) && point.length === 2 &&
      typeof point[0] === "number" && Number.isFinite(point[0]) && Math.abs(point[0]) <= 90 &&
      typeof point[1] === "number" && Number.isFinite(point[1]) && Math.abs(point[1]) <= 180);
}

function dist(a: LatLng, b: LatLng) {
  const lat = (a[0] + b[0]) * Math.PI / 360;
  const dy = (b[0] - a[0]) * 111_195;
  const dx = (b[1] - a[1]) * 111_195 * Math.cos(lat);
  return Math.hypot(dx, dy);
}

function lengths(path: readonly LatLng[]) {
  const cumulative = [0];
  for (let i = 1; i < path.length; i++) cumulative.push(cumulative[i - 1] + dist(path[i - 1], path[i]));
  return cumulative;
}

function distanceAlong(path: readonly LatLng[], cumulative: number[], target: LatLng, startAt = 0): number {
  let best = startAt;
  let minError = Number.POSITIVE_INFINITY;
  const cos = Math.cos(target[0] * Math.PI / 180);
  for (let i = 1; i < path.length; i++) {
    const length = cumulative[i] - cumulative[i - 1];
    if (length === 0 || cumulative[i] < startAt) continue;
    const a = path[i - 1];
    const b = path[i];
    const dx = (b[1] - a[1]) * cos;
    const dy = b[0] - a[0];
    const divisor = dx * dx + dy * dy;
    const t = divisor ? Math.max(0, Math.min(1, (
      ((target[1] - a[1]) * cos) * dx + (target[0] - a[0]) * dy
    ) / divisor)) : 0;
    const along = Math.max(startAt, cumulative[i - 1] + length * t);
    if (along > cumulative[i]) continue;
    const fraction = (along - cumulative[i - 1]) / length;
    const latitude = a[0] + (b[0] - a[0]) * fraction;
    const longitude = a[1] + (b[1] - a[1]) * fraction;
    const error = ((target[1] - longitude) * cos) ** 2 + (target[0] - latitude) ** 2;
    if (error < minError) { minError = error; best = along; }
  }
  return best;
}

function atDistance(path: readonly LatLng[], cumulative: number[], along: number): LatLng {
  for (let i = 1; i < path.length; i++) {
    if (cumulative[i] >= along && cumulative[i] > cumulative[i - 1]) {
      const ratio = (along - cumulative[i - 1]) / (cumulative[i] - cumulative[i - 1]);
      return [
        path[i - 1][0] + (path[i][0] - path[i - 1][0]) * ratio,
        path[i - 1][1] + (path[i][1] - path[i - 1][1]) * ratio,
      ];
    }
  }
  return [...path[path.length - 1]] as LatLng;
}

/** One + per stretch, using the displayed routed geometry when available. */
export function shapingInsertPositions(path: readonly LatLng[], via: readonly LatLng[]): LatLng[] {
  if (path.length < 2) return [];
  const cumulative = lengths(path);
  const end = cumulative[cumulative.length - 1];
  if (end <= 0) return [];
  let previous = 0;
  const cuts = via.map(point => {
    previous = distanceAlong(path, cumulative, point, previous);
    return previous;
  });
  const boundaries = [0, ...cuts, end];
  return boundaries.slice(0, -1).map((from, index) =>
    atDistance(path, cumulative, (from + boundaries[index + 1]) / 2));
}

/** Insert at the right ordered position, even on winding trail geometry. */
export function shapingInsertIndex(path: readonly LatLng[], via: readonly LatLng[], click: LatLng): number {
  if (path.length < 2) return 0;
  const cumulative = lengths(path);
  const at = distanceAlong(path, cumulative, click);
  let previous = 0;
  for (let i = 0; i < via.length; i++) {
    previous = distanceAlong(path, cumulative, via[i], previous);
    if (at < previous) return i;
  }
  return via.length;
}
