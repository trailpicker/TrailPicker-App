/** Route analytics shared by the map and itinerary. No invented elevation on manual links. */
import { metersBetween, usableTrailSegment, type LatLng } from "./trail-routing";
import type { Waypoint, PlannerDay } from "./trip-planner";
import { estimateWalkingTime } from "./hiking-time";
import { isSharedOvernightStop } from "./shared-overnight-stop";

export type ElevationSample = { distanceM: number; elevationM: number };
export type RouteDayMetrics = {
  dayId: string;
  distanceM: number;
  routedDistanceM: number;
  straightLineDistanceM: number;
  elevationDistanceM: number;
  gainDistanceM: number;
  unresolvedLinkDistanceM: number;
  knownAscentM: number;
  knownDescentM: number;
  segments: number;
  elevationSegments: number;
  climbedSegments: number;
  /** Leg elevations can be sampled without a provider total; those totals are estimates. */
  sampleDerivedSegments: number;
  /** Time for verified mapped legs belonging to this day, even if other legs are unresolved. */
  routedEstimateMinutes: number;
  routedSegments: number;
  terrainTimeDistanceM: number;
  fallbackTimeDistanceM: number;
  unresolvedLinks: number;
  estimatedMinutes: number | null;
  difficulty: "Easy" | "Moderate" | "Challenging" | "Strenuous" | null;
};
export type RouteMetrics = {
  segments: number;
  routedSegments: number;
  elevationSegments: number;
  climbedSegments: number;
  sampleDerivedSegments: number;
  unroutedSegments: number;
  unassignedDaySegments: number;
  distanceM: number;
  routedDistanceM: number;
  straightLineDistanceM: number;
  elevationDistanceM: number;
  gainDistanceM: number;
  unassignedDayDistanceM: number;
  /** null if any part of the route has no provider ascent/descent. */
  ascentM: number | null;
  descentM: number | null;
  knownAscentM: number;
  knownDescentM: number;
  estimatedMinutes: number | null;
  /** Estimate for routed legs only, with an ascent adjustment where supported. */
  routedEstimateMinutes: number;
  terrainTimeDistanceM: number;
  fallbackTimeDistanceM: number;
  profileSections: ElevationSample[][];
  /** Day associated with each sampled section; null for cross-day or unassigned links. */
  profileDayIds: (string | null)[];
  dayMetrics: RouteDayMetrics[];
};

export const DEFAULT_HIKING_PACE_KMH = 4;
export const CLIMB_METRES_PER_HOUR = 600;

/**
 * Fallback when a routed segment provides valid sampled altitudes but no provider
 * ascent/descent totals. A 3 m deadband limits tiny vertex-to-vertex altitude
 * fluctuations. The result is an *estimate from saved samples*, not a provider
 * measurement. Never run this on an unmapped straight-line connection.
 */
export function ascentDescentFromSamples(samples: readonly number[]): { ascentM: number; descentM: number } | null {
  if (samples.length < 2 || samples.some(value => !Number.isFinite(value) || value < -500 || value > 9000)) return null;
  const deadbandM = 3;
  let anchor = samples[0];
  let ascentM = 0, descentM = 0;
  for (let i = 1; i < samples.length; i++) {
    const change = samples[i] - anchor;
    if (Math.abs(change) >= deadbandM) {
      if (change > 0) ascentM += change;
      else descentM -= change;
      anchor = samples[i];
    }
  }
  return { ascentM: Math.round(ascentM), descentM: Math.round(descentM) };
}

function walkingMinutes(distanceM: number, ascentM: number, paceKmh: number) {
  return Math.round(60 * (distanceM / 1000 / paceKmh + ascentM / CLIMB_METRES_PER_HOUR));
}

/** Scale geometric fractions along a simplifed line to the provider's measured route length. */
function sampleElevation(path: LatLng[], elevationsM: number[], distanceM: number, offsetM: number): ElevationSample[] {
  const distances = [0];
  for (let i = 1; i < path.length; i++) distances.push(distances[i - 1] + metersBetween(path[i - 1], path[i]));
  const total = distances[distances.length - 1];
  // Degenerate geometry is not a genuine distance-based elevation profile.
  if (total <= 0) return [];
  return elevationsM.map((elevationM, i) => ({
    distanceM: offsetM + distances[i] / total * distanceM,
    elevationM,
  }));
}

export function computeRouteMetrics(
  points: readonly Waypoint[],
  days: readonly Pick<PlannerDay, "id">[] = [],
  paceKmh = DEFAULT_HIKING_PACE_KMH,
): RouteMetrics {
  if (!Number.isFinite(paceKmh) || paceKmh < 1 || paceKmh > 8) {
    throw new RangeError("Hiking pace must be between 1 and 8 km/h.");
  }
  const dayMetrics: RouteDayMetrics[] = days.map(({ id }) => ({
    dayId: id, distanceM: 0, routedDistanceM: 0, straightLineDistanceM: 0,
    elevationDistanceM: 0, gainDistanceM: 0, unresolvedLinkDistanceM: 0,
    knownAscentM: 0, knownDescentM: 0, segments: 0, elevationSegments: 0, climbedSegments: 0,
    routedSegments: 0, sampleDerivedSegments: 0, routedEstimateMinutes: 0, terrainTimeDistanceM: 0, fallbackTimeDistanceM: 0, unresolvedLinks: 0, estimatedMinutes: null, difficulty: null,
  }));
  const byId = new Map(dayMetrics.map(day => [day.dayId, day]));
  const result: RouteMetrics = {
    segments: 0, routedSegments: 0, elevationSegments: 0, climbedSegments: 0, sampleDerivedSegments: 0,
    unroutedSegments: 0, unassignedDaySegments: 0,
    distanceM: 0, routedDistanceM: 0, straightLineDistanceM: 0,
    elevationDistanceM: 0, gainDistanceM: 0, unassignedDayDistanceM: 0,
    ascentM: null, descentM: null, knownAscentM: 0, knownDescentM: 0,
    estimatedMinutes: null, routedEstimateMinutes: 0, terrainTimeDistanceM: 0, fallbackTimeDistanceM: 0, profileSections: [], profileDayIds: [], dayMetrics,
  };
  // Keep route estimates and the chart in exactly the same segment order.
  let segmentHasCompleteGain = true;
  let completeRouteMinutes = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i], to = points[i + 1];
    // Repeated overnight stops belong to two itinerary days but form no hike.
    if (isSharedOvernightStop(from, to)) continue;
    const routed = from.manualToNext ? null : usableTrailSegment(from, to);
    const distanceM = routed?.distanceM ?? metersBetween([from.lat, from.lng], [to.lat, to.lng]);
    const routedElevation = routed?.elevationsM;
    const hasElevation = !!(routed && routedElevation && routedElevation.length === routed.geometry.length);
    const hasProviderGain = !!(hasElevation && routed?.ascentM !== undefined && routed?.descentM !== undefined);
    const sampledGain = hasElevation && !hasProviderGain ? ascentDescentFromSamples(routedElevation!) : null;
    const hasGain = hasProviderGain || sampledGain !== null;
    const ascentM = hasProviderGain ? routed!.ascentM! : (sampledGain?.ascentM ?? 0);
    const descentM = hasProviderGain ? routed!.descentM! : (sampledGain?.descentM ?? 0);
    const sampleDerived = hasGain && !hasProviderGain;
    const offset = result.distanceM;
    const measuredSamples = hasElevation ? sampleElevation(routed!.geometry, routedElevation!, distanceM, offset) : null;
    const timeEstimate = routed ? estimateWalkingTime(distanceM, ascentM, paceKmh, hasGain ? measuredSamples : null) : null;

    result.segments++;
    result.distanceM += distanceM;
    if (routed) { result.routedSegments++; result.routedDistanceM += distanceM; }
    else { result.unroutedSegments++; result.straightLineDistanceM += distanceM; }
    if (hasElevation) {
      const samples = measuredSamples!;
      if (samples.length > 1) {
        result.elevationSegments++;
        result.elevationDistanceM += distanceM;
        result.profileSections.push(samples);
        result.profileDayIds.push(from.dayId && from.dayId === to.dayId ? from.dayId : (from.kind === "camp" && to.kind !== "trailhead" ? to.dayId ?? null : null));
      }
    }
    if (hasGain) {
      result.climbedSegments++;
      result.gainDistanceM += distanceM;
      result.knownAscentM += ascentM;
      result.knownDescentM += descentM;
      if (sampleDerived) result.sampleDerivedSegments++;
    } else segmentHasCompleteGain = false;
    if (routed) {
      result.routedEstimateMinutes += timeEstimate!.minutes;
      result.terrainTimeDistanceM += timeEstimate!.slopeDistanceM;
      result.fallbackTimeDistanceM += timeEstimate!.unprofiledDistanceM;
      completeRouteMinutes += timeEstimate!.minutes;
    }

    // A shared overnight campsite is ONE waypoint. Its outgoing leg begins the
    // following hiking day, although the campsite is owned by the night before.
    // A new trailhead is an explicit transfer, never an inferred walking leg.
    const inheritedDay = from.kind === "camp" && to.kind !== "trailhead" && from.dayId && to.dayId && from.dayId !== to.dayId
      ? to.dayId : null;
    const segmentDayId = from.dayId && from.dayId === to.dayId ? from.dayId : inheritedDay;
    const day = segmentDayId ? byId.get(segmentDayId) : null;
    if (!day) {
      result.unassignedDaySegments++;
      result.unassignedDayDistanceM += distanceM;
      // A link across different days or an unassigned stop makes both affected
      // day totals incomplete, even for short links. Do not persist partial totals as if complete.
      if (distanceM > 0) {
        const affected = new Set([from.dayId, to.dayId]);
        for (const dayId of affected) if (dayId) {
          const metric = byId.get(dayId);
          if (metric) { metric.unresolvedLinks++; metric.unresolvedLinkDistanceM += distanceM; }
        }
      }
      continue;
    }
    day.segments++;
    day.distanceM += distanceM;
    if (routed) {
      day.routedSegments++;
      day.routedDistanceM += distanceM;
      day.routedEstimateMinutes += timeEstimate!.minutes;
      day.terrainTimeDistanceM += timeEstimate!.slopeDistanceM;
      day.fallbackTimeDistanceM += timeEstimate!.unprofiledDistanceM;
    }
    else day.straightLineDistanceM += distanceM;
    if (hasElevation) { day.elevationSegments++; day.elevationDistanceM += distanceM; }
    if (hasGain) {
      day.climbedSegments++;
      day.gainDistanceM += distanceM;
      day.knownAscentM += ascentM;
      day.knownDescentM += descentM;
      if (sampleDerived) day.sampleDerivedSegments++;
    }
  }
  if (result.segments > 0 && segmentHasCompleteGain && result.routedSegments === result.segments) {
    result.ascentM = result.knownAscentM;
    result.descentM = result.knownDescentM;
    result.estimatedMinutes = Math.round(completeRouteMinutes);
  }
  for (const day of result.dayMetrics) {
    if (day.segments > 0 && day.unresolvedLinks === 0 && day.segments === day.routedSegments &&
        day.climbedSegments === day.segments) {
      day.estimatedMinutes = Math.round(day.routedEstimateMinutes);
      day.difficulty = hikingDifficulty(day.distanceM, day.knownAscentM, day.estimatedMinutes);
    }
  }
  return result;
}

/** Descriptive *planning* bands, not hiking safety grades. Require complete segment coverage. */
export function hikingDifficulty(distanceM: number, ascentM: number, movingMinutes: number): "Easy" | "Moderate" | "Challenging" | "Strenuous" {
  const distanceKm = distanceM / 1000;
  // Any single extreme dimension makes a day hard, rather than averaging hazards away.
  if (distanceKm <= 6 && ascentM <= 250 && movingMinutes <= 150) return "Easy";
  if (distanceKm <= 12 && ascentM <= 600 && movingMinutes <= 300) return "Moderate";
  if (distanceKm <= 20 && ascentM <= 1100 && movingMinutes <= 480) return "Challenging";
  return "Strenuous";
}

/** Conservative persistence boundary: do not overwrite manual day values with
 * incomplete routes OR with ascent/descent estimated from simplified samples. */
export function completeDaySummaries(metrics: RouteMetrics) {
  return metrics.dayMetrics.flatMap(day => {
    if (day.segments === 0 || day.unresolvedLinks > 0 || day.segments !== day.routedSegments ||
        day.segments !== day.climbedSegments || day.sampleDerivedSegments > 0 ||
        day.estimatedMinutes === null) return [];
    const distanceKm = Number((day.distanceM / 1000).toFixed(2));
    const elevationGainM = Math.round(day.knownAscentM);
    const elevationLossM = Math.round(day.knownDescentM);
    if (distanceKm > 1000 || elevationGainM > 20000 || elevationLossM > 20000 || day.estimatedMinutes > 1440) return [];
    return [{ dayId: day.dayId, distanceKm, elevationGainM, elevationLossM, durationMinutes: day.estimatedMinutes }];
  });
}



