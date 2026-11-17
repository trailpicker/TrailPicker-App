/** Persistent, per-build hiking-time preferences. These never change route geometry. */
import { DEFAULT_HIKING_PACE_KMH } from "./route-metrics";
import { ITINERARY_DEFAULT_BREAKS } from "./itinerary-timing";
import type { BreakSettings } from "./route-analysis-insights";

export const ROUTE_TIMING_KEY = "routeTiming";
export type RouteTimingPreferences = { paceKmh: number; breaks: BreakSettings };

export const DEFAULT_ROUTE_TIMING: RouteTimingPreferences = {
  paceKmh: DEFAULT_HIKING_PACE_KMH,
  breaks: { ...ITINERARY_DEFAULT_BREAKS },
};

/** Strict on writes; never persist invalid numbers, unsupported styles, or extra fields. */
export function validateRouteTimingPreferences(value: unknown): RouteTimingPreferences {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid hiking settings.");
  const data = value as Record<string, unknown>;
  const paceKmh = data.paceKmh;
  const rawBreaks = data.breaks;
  if (typeof paceKmh !== "number" || !Number.isFinite(paceKmh) || paceKmh < 1 || paceKmh > 8 ||
      !rawBreaks || typeof rawBreaks !== "object" || Array.isArray(rawBreaks)) {
    throw new Error("Invalid hiking settings.");
  }
  const breaks = rawBreaks as Record<string, unknown>;
  if (!["minimal", "normal", "frequent", "custom"].includes(String(breaks.style))) throw new Error("Invalid break style.");
  const limits = [
    ["customMinutesPerHour", 0, 30],
    ["lunchMinutes", 0, 120],
    ["lunchThresholdMinutes", 0, 1440],
  ] as const;
  for (const [name, min, max] of limits) {
    const n = breaks[name];
    if (typeof n !== "number" || !Number.isFinite(n) || n < min || n > max) throw new Error(`Invalid ${name}.`);
  }
  return {
    paceKmh,
    breaks: {
      style: breaks.style as BreakSettings["style"],
      customMinutesPerHour: breaks.customMinutesPerHour as number,
      lunchMinutes: breaks.lunchMinutes as number,
      lunchThresholdMinutes: breaks.lunchThresholdMinutes as number,
    },
  };
}

/** Older builds have no saved settings, and should continue using the old defaults. */
export function readRouteTimingPreferences(tripLogistics: unknown): RouteTimingPreferences {
  if (!tripLogistics || typeof tripLogistics !== "object" || Array.isArray(tripLogistics)) return DEFAULT_ROUTE_TIMING;
  const stored = (tripLogistics as Record<string, unknown>)[ROUTE_TIMING_KEY];
  if (stored == null) return DEFAULT_ROUTE_TIMING;
  try { return validateRouteTimingPreferences(stored); }
  catch { return DEFAULT_ROUTE_TIMING; }
}
