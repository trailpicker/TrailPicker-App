/** Route changes invalidate only their adjacent legs. Valid saved ORS/GPX tracks
 * are reusable even if the provider didn't supply optional elevation samples.
 */
import type { Waypoint } from "./trip-planner";
import { usableTrailSegment } from "./trail-routing";
import { isSharedOvernightStop } from "./shared-overnight-stop";

export function missingTrailLegs(points: readonly Waypoint[]) {
  return points.slice(0, -1).map((from, index) => ({ from, to: points[index + 1] }))
    .filter(({ from, to }) => !isSharedOvernightStop(from, to) && !from.manualToNext && !usableTrailSegment(from, to));
}
