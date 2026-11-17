/** Presentation-friendly terrain breakdown from existing measured 200 m windows.
 * Does not interpolate across missing/sparse geometry or infer trail surface safety.
 */
import type { SustainedSlope, TerrainCell } from "./route-analysis-insights";

export type GradientDistances = {
  gentleM: number;
  moderateM: number;
  steepM: number;
  totalM: number;
};
export type DirectionalTerrain = {
  uphill: GradientDistances;
  downhill: GradientDistances;
  levelM: number;
  analyzedM: number;
  longestSteepClimb: SustainedSlope | null;
};

const MIN_SUSTAINED_M = 500;
const SUSTAINED_GRADE = 8;
const NEAR_LEVEL_GRADE = 0.5;

function accumulate(bucket: GradientDistances, cell: TerrainCell, lengthM: number) {
  if (cell.band === "gentle") bucket.gentleM += lengthM;
  else if (cell.band === "moderate") bucket.moderateM += lengthM;
  else bucket.steepM += lengthM;
  bucket.totalM += lengthM;
}
const empty = (): GradientDistances => ({ gentleM: 0, moderateM: 0, steepM: 0, totalM: 0 });

/** Uphill and downhill are classified independently; near-level terrain is shown separately. */
export function summarizeGradient(cells: readonly TerrainCell[]): DirectionalTerrain {
  const uphill = empty();
  const downhill = empty();
  let levelM = 0;
  let analyzedM = 0;
  let longestSteepClimb: SustainedSlope | null = null;
  let group: TerrainCell[] = [];

  function finish() {
    if (!group.length) return;
    const startM = group[0].startM;
    const endM = group[group.length - 1].endM;
    const length = endM - startM;
    if (length >= MIN_SUSTAINED_M && (!longestSteepClimb || length > longestSteepClimb.endM - longestSteepClimb.startM)) {
      const riseM = group.reduce((sum, cell) => sum + cell.gradePct * (cell.endM - cell.startM) / 100, 0);
      longestSteepClimb = { startM, endM, gainM: riseM, gradePct: riseM / length * 100,
        dayId: group[0].dayId, direction: "climb" };
    }
    group = [];
  }

  for (const cell of cells) {
    const lengthM = cell.endM - cell.startM;
    if (!Number.isFinite(cell.gradePct) || !Number.isFinite(lengthM) || lengthM <= 0) { finish(); continue; }
    analyzedM += lengthM;
    if (cell.gradePct >= NEAR_LEVEL_GRADE) accumulate(uphill, cell, lengthM);
    else if (cell.gradePct <= -NEAR_LEVEL_GRADE) accumulate(downhill, cell, lengthM);
    else levelM += lengthM;

    const previous = group[group.length - 1];
    const contiguous = !previous || (Math.abs(previous.endM - cell.startM) < 0.01 && previous.dayId === cell.dayId);
    if (cell.gradePct < SUSTAINED_GRADE || !contiguous) finish();
    if (cell.gradePct >= SUSTAINED_GRADE) group.push(cell);
  }
  finish();
  return { uphill, downhill, levelM, analyzedM, longestSteepClimb };
}

/** Collapse repeated terrain findings for the UI, not the underlying analysis.
 * A hardest and longest climb may legitimately be the same interval.
 */
export type TerrainFinding = { title: string; slope: SustainedSlope };

function sameInterval(a: SustainedSlope, b: SustainedSlope): boolean {
  return a.direction === b.direction && a.dayId === b.dayId &&
    Math.abs(a.startM - b.startM) < 0.01 && Math.abs(a.endM - b.endM) < 0.01;
}

export function notableTerrainFindings(
  hardestClimb: SustainedSlope | null,
  longestSteepClimb: SustainedSlope | null,
  hardestDescent: SustainedSlope | null,
): TerrainFinding[] {
  const findings: TerrainFinding[] = [];
  if (hardestClimb) findings.push({
    title: longestSteepClimb && sameInterval(hardestClimb, longestSteepClimb)
      ? "Hardest & longest steep climb" : "Hardest sustained climb",
    slope: hardestClimb,
  });
  if (longestSteepClimb && (!hardestClimb || !sameInterval(hardestClimb, longestSteepClimb))) {
    findings.push({ title: "Longest sustained steep climb", slope: longestSteepClimb });
  }
  if (hardestDescent) findings.push({ title: "Hardest sustained descent", slope: hardestDescent });
  return findings;
}
