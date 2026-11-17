/** Presentation-only scope for Route Analysis. Never modifies persisted day totals. */
import type { RouteMetrics } from "./route-metrics";
import { estimateBreaks, type BreakSettings } from "./route-analysis-insights";

export type RouteAnalysisScope = {
  dayId: string | null;
  segments: number;
  routedSegments: number;
  unroutedSegments: number;
  climbedSegments: number;
  sampleDerivedSegments: number;
  distanceM: number;
  routedDistanceM: number;
  knownAscentM: number;
  knownDescentM: number;
  terrainTimeDistanceM: number;
  movingMinutes: number | null;
  breakMinutes: number | null;
  complete: boolean;
  issues: string[];
};

/**
 * One source of truth for hiking time, route fundamentals, warning coverage and
 * secondary reference models. A day selection must not silently show totals
 * from the entire trip. Cross-day legs remain incomplete, not assigned to a day.
 */
export function routeAnalysisScope(
  metrics: RouteMetrics,
  requestedDayId: string | null,
  breaks: BreakSettings,
): RouteAnalysisScope {
  const day = requestedDayId ? metrics.dayMetrics.find(entry => entry.dayId === requestedDayId) : undefined;
  const isDay = !!day;
  const segments = day?.segments ?? metrics.segments;
  const routedSegments = day?.routedSegments ?? metrics.routedSegments;
  const climbedSegments = day?.climbedSegments ?? metrics.climbedSegments;
  const unroutedSegments = isDay ? segments - routedSegments : metrics.unroutedSegments;
  const unassigned = day?.unresolvedLinks ?? metrics.unassignedDaySegments;
  const fullyElevated = segments > 0 && unroutedSegments === 0 && climbedSegments === segments;
  const dayMoving = metrics.dayMetrics.map(entry =>
    entry.estimatedMinutes ?? (entry.routedSegments > 0 ? entry.routedEstimateMinutes : null));

  // Keep the whole-route estimate identical to the existing per-day break model.
  // For an individual day use only that day's walking and rest minutes.
  const movingMinutes = day
    ? day.estimatedMinutes ?? (day.routedSegments > 0 ? day.routedEstimateMinutes : null)
    : metrics.dayMetrics.length
      ? dayMoving.some(value => value !== null)
        ? dayMoving.reduce<number>((total, value) => total + (value ?? 0), 0)
        : null
      : metrics.estimatedMinutes ?? (metrics.routedSegments ? metrics.routedEstimateMinutes : null);
  const breakMinutes = day
    ? estimateBreaks(movingMinutes, breaks)?.totalMinutes ?? null
    : metrics.dayMetrics.length
      ? movingMinutes !== null
        ? metrics.dayMetrics.reduce((total, entry, index) => total + (
            entry.segments > 0 && dayMoving[index] !== null
              ? estimateBreaks(dayMoving[index], breaks)?.totalMinutes ?? 0
              : 0), 0)
        : null
      : estimateBreaks(movingMinutes, breaks)?.totalMinutes ?? null;

  const allDaysComplete = metrics.dayMetrics.length > 0 && metrics.unassignedDaySegments === 0
    && metrics.dayMetrics.some(entry => entry.segments > 0)
    && metrics.dayMetrics.filter(entry => entry.segments > 0).every(entry => entry.estimatedMinutes !== null);
  const complete = day
    ? day.segments > 0 && day.estimatedMinutes !== null && fullyElevated
    : metrics.dayMetrics.length
      ? allDaysComplete && fullyElevated
      : metrics.estimatedMinutes !== null;

  return {
    dayId: day?.dayId ?? null,
    segments, routedSegments, unroutedSegments, climbedSegments,
    sampleDerivedSegments: day?.sampleDerivedSegments ?? metrics.sampleDerivedSegments,
    distanceM: day?.distanceM ?? metrics.distanceM,
    routedDistanceM: day?.routedDistanceM ?? metrics.routedDistanceM,
    knownAscentM: day?.knownAscentM ?? metrics.knownAscentM,
    knownDescentM: day?.knownDescentM ?? metrics.knownDescentM,
    terrainTimeDistanceM: day?.terrainTimeDistanceM ?? metrics.terrainTimeDistanceM,
    movingMinutes, breakMinutes, complete,
    issues: [
      unroutedSegments > 0 ? `${unroutedSegments} straight-line route connection(s) lack mapped trail geometry` : null,
      routedSegments > climbedSegments ? `${routedSegments - climbedSegments} mapped leg(s) lack ascent/descent data` : null,
      metrics.dayMetrics.length > 0 && unassigned > 0
        ? isDay
          ? `${unassigned} cross-day or unassigned route connection(s) affect this day`
          : `${unassigned} route leg(s) cross day boundaries or lack a day assignment`
        : null,
    ].filter((entry): entry is string => Boolean(entry)),
  };
}
