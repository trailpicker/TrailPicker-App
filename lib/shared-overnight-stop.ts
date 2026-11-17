/** A campsite/hut repeated as the last stop of one day and first of the next
 * is an itinerary handoff, not an additional walking leg.
 *
 * Only suppress a transition when the two geographic positions actually
 * coincide. A matching label miles away is NOT enough. Likewise, keep an
 * intentional loop with an explicit routed track or shaping via point.
 */
import { metersBetween, usableTrailSegment } from "./trail-routing";
import type { Waypoint } from "./trip-planner";

function siteKey(name: string): string {
  return name.trim().toLocaleLowerCase().replace(/&/g, " and ").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function isSharedOvernightStop(from: Waypoint, to: Waypoint): boolean {
  if (!from.dayId || !to.dayId || from.dayId === to.dayId) return false;
  if (from.viaToNext?.length) return false;
  const distanceM = metersBetween([from.lat, from.lng], [to.lat, to.lng]);
  if (!Number.isFinite(distanceM)) return false;
  // Preserve genuine hiking loops even when they start and end at the same pin.
  const routed = usableTrailSegment(from, to);
  if (routed && routed.distanceM > 30) return false;
  // Identical map pins may have different stop labels on different days.
  if (distanceM <= 1.5) return true;
  // Place results for the same named campsite may differ by a few metres.
  return distanceM <= 25 && !!siteKey(from.name) && siteKey(from.name) === siteKey(to.name);
}
