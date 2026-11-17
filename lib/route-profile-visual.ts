/** Pure elevation chart helpers. These only render supplied samples and measured terrain cells. */
import type { ElevationSample } from "./route-metrics";
import type { TerrainBand, TerrainCell } from "./route-analysis-insights";

export type TerrainStroke = { band: TerrainBand; dayId: string | null; points: ElevationSample[] };

export function terrainStrokeColor(band: TerrainBand): string {
  return band === "steep" ? "#dc2626" : band === "moderate" ? "#eab308" : "#15803d";
}

/** Retain each bucket's extrema so chart optimization never erases a summit or saddle. */
export function preserveProfileExtrema(samples: readonly ElevationSample[], maxPoints = 480): ElevationSample[] {
  if (samples.length <= maxPoints) return [...samples];
  const result: ElevationSample[] = [samples[0]];
  const bucketWidth = Math.ceil((samples.length - 2) / Math.max(1, Math.floor((maxPoints - 2) / 2)));
  for (let begin = 1; begin < samples.length - 1; begin += bucketWidth) {
    const end = Math.min(begin + bucketWidth, samples.length - 1);
    let minIndex = begin, maxIndex = begin;
    for (let index = begin + 1; index < end; index++) {
      if (samples[index].elevationM < samples[minIndex].elevationM) minIndex = index;
      if (samples[index].elevationM > samples[maxIndex].elevationM) maxIndex = index;
    }
    for (const index of [...new Set([minIndex, maxIndex])].sort((a,b) => a-b)) result.push(samples[index]);
  }
  result.push(samples[samples.length - 1]);
  return result;
}

/** Interpolate *only inside a single existing measured section*, never across two sections. */
function elevationAt(section: readonly ElevationSample[], atM: number): ElevationSample | null {
  if (section.length < 2 || atM < section[0].distanceM - 0.01 || atM > section[section.length - 1].distanceM + 0.01) return null;
  for (let index = 1; index < section.length; index++) {
    const previous = section[index - 1];
    const next = section[index];
    if (next.distanceM < atM - 0.01) continue;
    const span = next.distanceM - previous.distanceM;
    if (span <= 0 || span > 400 || !Number.isFinite(previous.elevationM) || !Number.isFinite(next.elevationM)) return null;
    const t = Math.max(0, Math.min(1, (atM - previous.distanceM) / span));
    return {distanceM: atM, elevationM: previous.elevationM + (next.elevationM - previous.elevationM) * t};
  }
  return null;
}

/** Grade strokes follow the real profile, not a parallel histogram or guessed slope. */
export function buildTerrainStrokes(sections: readonly (readonly ElevationSample[])[], cells: readonly TerrainCell[]): TerrainStroke[] {
  const strokes: TerrainStroke[] = [];
  for (const cell of cells) {
    if (!Number.isFinite(cell.startM) || !Number.isFinite(cell.endM) || cell.endM <= cell.startM) continue;
    // A window is trustworthy only when it fits entirely within a measured section.
    const section = sections.find(section => section.length >= 2 &&
      cell.startM >= section[0].distanceM - 0.01 && cell.endM <= section[section.length - 1].distanceM + 0.01);
    if (!section) continue;
    const start = elevationAt(section, cell.startM);
    const end = elevationAt(section, cell.endM);
    if (!start || !end) continue;
    const middle = section.filter(point => point.distanceM > cell.startM && point.distanceM < cell.endM);
    const points = [start, ...middle, end];
    // Guard against connecting unsampled interior gaps.
    if (points.some((point, index) => index > 0 && (point.distanceM - points[index-1].distanceM > 400 || point.distanceM <= points[index-1].distanceM))) continue;
    strokes.push({band: cell.band, dayId: cell.dayId, points});
  }
  return strokes;
}

