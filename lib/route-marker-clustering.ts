/**
 * View-only map marker layout for the Trip Planner.
 * Never mutate/dedupe saved waypoints: the route and itinerary still need each stop.
 */
import type { Waypoint } from "./trip-planner";
import { isSharedOvernightStop } from "./shared-overnight-stop";

export type DisplayStop = { key: string; members: { point: Waypoint; order: number }[]; lat: number; lng: number };
export type ProjectedStop = { key: string; x: number; y: number };
export type MarkerCluster = { key: string; keys: string[]; x: number; y: number };

/** Only collapse a true consecutive overnight handoff, not a loop or two different resources. */
export function displayStops(points: readonly Waypoint[]): DisplayStop[] {
  const results: DisplayStop[] = [];
  points.forEach((point, index) => {
    const previous = index ? points[index - 1] : undefined;
    const last = results[results.length - 1];
    if (last && previous && previous.kind === point.kind && isSharedOvernightStop(previous, point)) {
      last.members.push({ point, order: index + 1 });
    } else {
      results.push({ key: point.id, members: [{ point, order: index + 1 }], lat: point.lat, lng: point.lng });
    }
  });
  return results;
}

/**
 * Zoom-dependent, pixel-distance clustering, without arbitrary grid boundaries.
 * We bound each cluster around its centroid rather than chaining neighbors:
 * a long hiking route must not disappear into one enormous pin.
 */
export function clusterProjectedStops(stops: readonly ProjectedStop[], radiusPx = 39): MarkerCluster[] {
  const radiusSq = radiusPx * radiusPx;
  const groups: { keys: string[]; members: ProjectedStop[]; x: number; y: number }[] = [];
  for (const stop of stops) {
    let closest: typeof groups[number] | undefined;
    let closestDistance = Infinity;
    for (const group of groups) {
      const dx = stop.x - group.x, dy = stop.y - group.y;
      const distanceSq = dx * dx + dy * dy;
      // A bounded diameter prevents a chain of nearby trail stops from
      // becoming a single cluster stretched across the entire visible route.
      if (distanceSq > radiusSq || distanceSq >= closestDistance) continue;
      if (group.members.some(member => {
        const mx = member.x - stop.x, my = member.y - stop.y;
        return mx * mx + my * my > (2 * radiusPx) ** 2;
      })) continue;
      closest = group;
      closestDistance = distanceSq;
    }
    if (closest) {
      closest.keys.push(stop.key);
      closest.members.push(stop);
      const n = closest.members.length;
      closest.x += (stop.x - closest.x) / n;
      closest.y += (stop.y - closest.y) / n;
    } else {
      groups.push({ keys: [stop.key], members: [stop], x: stop.x, y: stop.y });
    }
  }
  return groups.map(group => ({
    key: group.keys.slice().sort().join("|"),
    keys: group.keys,
    x: group.x, y: group.y,
  }));
}

/** Temporary offsets; geographic coordinates and saved tracks are unchanged. */
export function spiderfyOffset(index: number): [number, number] {
  if (!Number.isSafeInteger(index) || index < 0) return [0, 0];
  let ring = 1;
  let slot = index;
  while (slot >= ring * 8) { slot -= ring * 8; ring++; }
  const angle = -Math.PI / 2 + (2 * Math.PI * slot) / (ring * 8);
  const radius = ring * 42;
  return [Math.round(Math.cos(angle) * radius), Math.round(Math.sin(angle) * radius)];
}
