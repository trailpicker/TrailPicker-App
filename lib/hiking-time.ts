/**
 * Trail walking time estimation. Only actual sampled elevation is used to infer
 * direction-specific slope: no slope is fabricated over sparse/unknown gaps.
 *
 * Tobler (1993): v = 6 exp(-3.5 |gradient + 0.05|) km/h.
 * We scale the speed to an independently selected level-trail pace, using
 * Tobler's level-ground speed as the normalization factor. No separate
 * ascent allowance is added to slope-based time (avoids double counting).
 *
 * With inadequate elevation resolution, fall back to the transparent
 * distance/pace + ascent/600m/h rule (modified Naismith). That is not a
 * certified walking time. Breaks and schedule reserve are *never* included.
 */
export type HeightPoint = { distanceM: number; elevationM: number };
export type WalkingMethod = "terrain" | "mixed" | "naismith";
export type WalkingTime = { minutes: number; method: WalkingMethod; slopeDistanceM: number; unprofiledDistanceM: number };
const CELL_M = 200;
const MAX_GAP_M = 400;
const MIN_CELL_M = 80;
const LEVEL_SPEED_KMH = 6 * Math.exp(-3.5 * Math.abs(0.05));
export function toblerKmh(slope: number): number {
  if (!Number.isFinite(slope)) throw new RangeError("Slope must be finite.");
  return 6 * Math.exp(-3.5 * Math.abs(Math.max(-0.5, Math.min(0.5, slope)) + 0.05));
}
/** Flat-trail pace in km/h, with slope slowing or accelerating the segment. */
export function gradeAdjustedSpeedKmh(gradient: number, levelPaceKmh: number): number {
  if (!Number.isFinite(levelPaceKmh) || levelPaceKmh < 1 || levelPaceKmh > 8) throw new RangeError("Level-trail pace must be 1–8 km/h.");
  return Math.max(0.45, levelPaceKmh * toblerKmh(gradient) / LEVEL_SPEED_KMH);
}
/** Naismith reference, using the historical 5 km/h + 600 m ascent per hour. */
export function classicNaismithMinutes(distanceM: number, ascentM: number): number {
  return Math.round(60 * (distanceM / 5000 + Math.max(0, ascentM) / 600));
}
/** 2025 SAC reference: 4 km/h plus 400m/h ascending and 800m/h descending. */
export function sacReferenceMinutes(distanceM: number, ascentM: number, descentM: number): number {
  return Math.round(60 * (distanceM / 4000 + Math.max(0, ascentM) / 400 + Math.max(0, descentM) / 800));
}
/** Naismith-style fallback, scaled ONLY on horizontal speed; not a terrain model. */
export function fallbackMinutes(distanceM: number, ascentM: number, paceKmh: number): number {
  return 60 * (Math.max(0, distanceM) / 1000 / paceKmh + Math.max(0, ascentM) / 600);
}
function interpolate(samples: readonly HeightPoint[], position: number) {
  let low = 0, high = samples.length - 1;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (samples[mid].distanceM < position) low = mid + 1; else high = mid;
  }
  if (low === 0) return samples[0].elevationM;
  const a = samples[low - 1], c = samples[low];
  const ratio = (position - a.distanceM) / (c.distanceM - a.distanceM);
  return a.elevationM + (c.elevationM - a.elevationM) * ratio;
}
/** Analyze a mapped leg. Missing sample areas retain fallback time, not invented slopes. */
export function estimateWalkingTime(
  distanceM: number, ascentM: number, paceKmh: number,
  samples: readonly HeightPoint[] | null | undefined,
): WalkingTime {
  if (!Number.isFinite(distanceM) || distanceM < 0 || !Number.isFinite(ascentM) || ascentM < 0)
    throw new RangeError("Distance and ascent must be nonnegative finite numbers.");
  // Also validates pace on empty legs.
  gradeAdjustedSpeedKmh(0, paceKmh);
  if (!samples || samples.length < 2 || distanceM === 0) return {
    minutes: Math.round(fallbackMinutes(distanceM, ascentM, paceKmh)),
    method: "naismith", slopeDistanceM: 0, unprofiledDistanceM: distanceM,
  };
  let slopeDistanceM = 0, slopeMinutes = 0;
  let runStart = 0;
  const addRun = (end: number) => {
    const run = samples.slice(runStart, end + 1);
    if (run.length < 2) return;
    let position = run[0].distanceM;
    const stop = run[run.length - 1].distanceM;
    while (stop - position >= MIN_CELL_M) {
      const next = Math.min(stop, position + CELL_M);
      if (next - position < MIN_CELL_M) break;
      const grade = (interpolate(run, next) - interpolate(run, position)) / (next - position);
      slopeMinutes += 60 * ((next - position) / 1000) / gradeAdjustedSpeedKmh(grade, paceKmh);
      slopeDistanceM += next - position;
      position = next;
    }
  };
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1], c = samples[i];
    const width = c.distanceM - a.distanceM;
    const valid = width > 0 && width <= MAX_GAP_M &&
      Number.isFinite(a.distanceM) && Number.isFinite(c.distanceM) &&
      Number.isFinite(a.elevationM) && Number.isFinite(c.elevationM) &&
      a.elevationM > -500 && a.elevationM < 9000 && c.elevationM > -500 && c.elevationM < 9000;
    if (!valid) { addRun(i - 1); runStart = i; }
  }
  addRun(samples.length - 1);
  const coverage = Math.min(distanceM, slopeDistanceM);
  // Sparse vertices are not an excuse to pretend we know every hill.
  // If less than half a leg has meaningful slopes, prefer the explicit fallback.
  if (coverage < distanceM * 0.5) return {
    minutes: Math.round(fallbackMinutes(distanceM, ascentM, paceKmh)),
    method: "naismith", slopeDistanceM: 0, unprofiledDistanceM: distanceM,
  };
  // For small sample gaps, use the level-ground fallback without adding a second
  // climbing penalty to slopes we've already modelled. Unknown gaps remain flagged.
  const unknownM = Math.max(0, distanceM - coverage);
  const unknownMinutes = 60 * unknownM / 1000 / paceKmh;
  return {
    minutes: Math.round(slopeMinutes + unknownMinutes),
    method: unknownM > distanceM * 0.02 ? "mixed" : "terrain",
    slopeDistanceM: coverage,
    unprofiledDistanceM: unknownM,
  };
}
