/** Shared, read-only distance/position model for the map, profile and itinerary.
 * Distances follow computeRouteMetrics, including the straight-line lower bound
 * for unresolved links. Elevation and cursor coordinates are NEVER inferred on
 * those links or across gaps in recorded samples.
 */
import type { Waypoint } from "./trip-planner";
import { metersBetween, usableTrailSegment } from "./trail-routing";
import { isSharedOvernightStop } from "./shared-overnight-stop";

export type ExplorerSample = {
  distanceM: number;
  elevationM: number;
  lat: number;
  lng: number;
};
export type ExplorerSection = {
  startM: number;
  endM: number;
  dayId: string | null;
  samples: ExplorerSample[];
};
export type ExplorerRoute = {
  distanceM: number;
  sections: ExplorerSection[];
  stopDistances: Record<string, number>;
};

export function buildRouteExplorer(points: readonly Waypoint[]): ExplorerRoute {
  const sections: ExplorerSection[] = [];
  const stopDistances: Record<string, number> = {};
  let offsetM = 0;
  for (let index = 0; index < points.length; index++) {
    const from = points[index];
    stopDistances[from.id] = offsetM;
    const to = points[index + 1];
    if (!to) break;
    if (isSharedOvernightStop(from, to)) continue;
    const segment = from.manualToNext ? null : usableTrailSegment(from, to);
    const distanceM = segment?.distanceM ?? metersBetween([from.lat, from.lng], [to.lat, to.lng]);
    const geometry = segment?.geometry;
    const heights = segment?.elevationsM;
    if (geometry && heights && heights.length === geometry.length && geometry.length >= 2) {
      const cumulative = [0];
      for (let j = 1; j < geometry.length; j++) {
        cumulative.push(cumulative[j - 1] + metersBetween(geometry[j - 1], geometry[j]));
      }
      const geometryDistance = cumulative[cumulative.length - 1];
      if (geometryDistance > 0) {
        const samples = geometry.map(([lat, lng], j) => ({
          distanceM: offsetM + cumulative[j] / geometryDistance * distanceM,
          elevationM: heights[j], lat, lng,
        }));
        // A sparse elevation window is not a continuous measured profile.
        // Split it rather than drawing a misleading line through the missing terrain.
        let run: ExplorerSample[] = [];
        const saveRun = () => {
          if (run.length >= 2) sections.push({
            startM: run[0].distanceM,
            endM: run[run.length - 1].distanceM,
            dayId: from.dayId && from.dayId === to.dayId ? from.dayId : null,
            samples: run,
          });
        };
        for (const sample of samples) {
          if (run.length && (sample.distanceM - run[run.length - 1].distanceM > 400 ||
                             sample.distanceM <= run[run.length - 1].distanceM)) {
            saveRun();
            run = [];
          }
          run.push(sample);
        }
        saveRun();
      }
    }
    offsetM += distanceM;
  }
  return { distanceM: offsetM, sections, stopDistances };
}

/** Never interpolate through a missing elevation link or a >400m sparse window. */
export function locationAtDistance(route: ExplorerRoute, distanceM: number): ExplorerSample | null {
  if (!Number.isFinite(distanceM)) return null;
  for (const section of route.sections) {
    if (distanceM < section.startM - 0.01 || distanceM > section.endM + 0.01) continue;
    const samples = section.samples;
    if (Math.abs(distanceM - samples[0].distanceM) < 0.01) return samples[0];
    for (let j = 1; j < samples.length; j++) {
      const a = samples[j - 1], b = samples[j];
      if (b.distanceM + 0.01 < distanceM) continue;
      const span = b.distanceM - a.distanceM;
      if (span <= 0 || span > 400) return null;
      const t = Math.min(1, Math.max(0, (distanceM - a.distanceM) / span));
      return {
        distanceM, elevationM: a.elevationM + t * (b.elevationM - a.elevationM),
        lat: a.lat + t * (b.lat - a.lat), lng: a.lng + t * (b.lng - a.lng),
      };
    }
    return samples[samples.length - 1];
  }
  return null;
}

/** Gradient across a local measured 200m window, not a noisy vertex derivative. */
export function gradeAtDistance(route: ExplorerRoute, distanceM: number): number | null {
  const section = route.sections.find(s => distanceM >= s.startM && distanceM <= s.endM);
  if (!section) return null;
  const startM = Math.max(section.startM, distanceM - 100);
  const endM = Math.min(section.endM, distanceM + 100);
  if (endM - startM < 50) return null;
  const a = locationAtDistance(route, startM);
  const b = locationAtDistance(route, endM);
  return a && b ? (b.elevationM - a.elevationM) / (endM - startM) * 100 : null;
}

