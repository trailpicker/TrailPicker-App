/** Read-only route analysis. These estimates never overwrite a saved itinerary. */
import type { ElevationSample } from "./route-metrics";

export type BreakStyle = "minimal" | "normal" | "frequent" | "custom";
export type BreakSettings = {
  style: BreakStyle;
  customMinutesPerHour: number;
  lunchMinutes: number;
  /** Add lunch only when this individual hiking day is at least this long. */
  lunchThresholdMinutes: number;
};
export const DEFAULT_BREAK_SETTINGS: BreakSettings = {
  style: "normal", customMinutesPerHour: 10, lunchMinutes: 0, lunchThresholdMinutes: 240,
};
export function estimateBreaks(movingMinutes: number | null, settings: BreakSettings = DEFAULT_BREAK_SETTINGS) {
  if (movingMinutes === null || !Number.isFinite(movingMinutes) || movingMinutes < 0) return null;
  const rate = settings.style === "minimal" ? 5 : settings.style === "normal" ? 10 : settings.style === "frequent" ? 15 : settings.customMinutesPerHour;
  const perHour = Math.max(0, Math.min(30, Number.isFinite(rate) ? rate : 0));
  const shortMinutes = Math.round(movingMinutes / 60 * perHour / 5) * 5;
  const lunchMinutes = movingMinutes >= Math.max(0, settings.lunchThresholdMinutes)
    ? Math.max(0, Math.min(120, Number.isFinite(settings.lunchMinutes) ? settings.lunchMinutes : 0)) : 0;
  return { shortMinutes, lunchMinutes, totalMinutes: shortMinutes + lunchMinutes };
}

export type TerrainBand = "gentle" | "moderate" | "steep";
export type TerrainCell = { startM: number; endM: number; gradePct: number; band: TerrainBand; dayId: string | null };
export type SustainedSlope = { startM: number; endM: number; gainM: number; gradePct: number; dayId: string | null; direction: "climb" | "descent" };
export type TerrainInsights = {
  analyzedDistanceM: number;
  totalProfileDistanceM: number;
  gentleDistanceM: number;
  moderateDistanceM: number;
  steepDistanceM: number;
  cells: TerrainCell[];
  hardestClimb: SustainedSlope | null;
  hardestDescent: SustainedSlope | null;
};

const MAX_SAMPLE_SPACING_M = 400;
const CELL_DISTANCE_M = 200;
const MIN_SUSTAINED_M = 500;
const GENTLE_GRADE = 5;
const STEEP_GRADE = 12;
const SUSTAINED_GRADE = 8;

function interpolateAt(samples: readonly ElevationSample[], distanceM: number) {
  for (let i = 1; i < samples.length; i++) {
    if (distanceM <= samples[i].distanceM) {
      const a = samples[i-1], b = samples[i];
      if (b.distanceM <= a.distanceM) return b.elevationM;
      return a.elevationM + (b.elevationM - a.elevationM) * (distanceM - a.distanceM) / (b.distanceM - a.distanceM);
    }
  }
  return samples[samples.length - 1].elevationM;
}

/**
 * Analyze only sufficiently sampled, contiguous pieces of actual mapped geometry.
 * Sparse GPX geometry must NOT be treated as a uniformly steep slope. Interpolation
 * happens inside observed intervals only, never across an unmapped or sparse gap.
 * Classification uses 200 m windows to reduce single-vertex altimeter noise;
 * it is a planning approximation, not an exposure / technical terrain grade.
 */
export function analyzeTerrain(sections: readonly (readonly ElevationSample[])[], dayIds: readonly (string | null)[] = []): TerrainInsights {
  const cells: TerrainCell[] = [];
  let totalProfileDistanceM = 0;
  for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
    const section = sections[sectionIndex];
    if (section.length < 2) continue;
    const first = section[0], last = section[section.length - 1];
    if (Number.isFinite(first.distanceM) && Number.isFinite(last.distanceM) && last.distanceM > first.distanceM)
      totalProfileDistanceM += last.distanceM - first.distanceM;
    // Split on sparse, zero-length, nonmonotonic or corrupt spans.
    let begin = 0;
    const analyzeRun = (end: number) => {
      const run = section.slice(begin, end + 1);
      if (run.length < 2) return;
      const min = run[0].distanceM, max = run[run.length - 1].distanceM;
      if (max - min < 80) return;
      let start = min;
      while (start < max - 1) {
        const stop = Math.min(start + CELL_DISTANCE_M, max);
        if (stop - start < 80) break;
        const delta = interpolateAt(run, stop) - interpolateAt(run, start);
        const gradePct = delta / (stop - start) * 100;
        const band: TerrainBand = Math.abs(gradePct) < GENTLE_GRADE ? "gentle" : Math.abs(gradePct) < STEEP_GRADE ? "moderate" : "steep";
        cells.push({ startM: start, endM: stop, gradePct, band, dayId: dayIds[sectionIndex] ?? null });
        start = stop;
      }
    };
    for (let i = 1; i < section.length; i++) {
      const a = section[i - 1], b = section[i];
      const spacing = b.distanceM - a.distanceM;
      const valid = spacing > 0 && spacing <= MAX_SAMPLE_SPACING_M &&
        Number.isFinite(a.elevationM) && Number.isFinite(b.elevationM) &&
        Number.isFinite(a.distanceM) && Number.isFinite(b.distanceM);
      if (!valid) { analyzeRun(i - 1); begin = i; }
    }
    analyzeRun(section.length - 1);
  }
  let gentleDistanceM = 0, moderateDistanceM = 0, steepDistanceM = 0;
  for (const cell of cells) {
    const length = cell.endM - cell.startM;
    if (cell.band === "gentle") gentleDistanceM += length;
    else if (cell.band === "moderate") moderateDistanceM += length;
    else steepDistanceM += length;
  }
  const sustained = (direction: "climb" | "descent"): SustainedSlope | null => {
    const threshold = direction === "climb" ? SUSTAINED_GRADE : -SUSTAINED_GRADE;
    let best: SustainedSlope | null = null;
    let group: TerrainCell[] = [];
    const flush = () => {
      if (group.length === 0) return;
      const length = group[group.length - 1].endM - group[0].startM;
      if (length >= MIN_SUSTAINED_M) {
        const elevation = group.reduce((sum, cell) => sum + cell.gradePct * (cell.endM - cell.startM) / 100, 0);
        const gainM = Math.abs(elevation);
        if (!best || gainM > best.gainM) best = {
          startM: group[0].startM, endM: group[group.length - 1].endM, gainM,
          gradePct: elevation / length * 100, dayId: group[0].dayId, direction,
        };
      }
      group = [];
    };
    for (const cell of cells) {
      const matched = direction === "climb" ? cell.gradePct >= threshold : cell.gradePct <= threshold;
      const linked = group.length && Math.abs(group[group.length - 1].endM - cell.startM) < 0.01 && group[group.length - 1].dayId === cell.dayId;
      if (!matched) { flush(); continue; }
      if (group.length && !linked) flush();
      group.push(cell);
    }
    flush();
    return best;
  };
  return { analyzedDistanceM: gentleDistanceM + moderateDistanceM + steepDistanceM,
    totalProfileDistanceM, gentleDistanceM, moderateDistanceM, steepDistanceM, cells,
    hardestClimb: sustained("climb"), hardestDescent: sustained("descent") };
}

export function parseClock(value: string | null | undefined): number | null {
  if (!value || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}
export function clockLabel(totalMinutes: number): string {
  const minute = Math.round(totalMinutes);
  const hour = ((Math.floor(minute / 60) % 24) + 24) % 24;
  const dayOffset = Math.floor(minute / 1440);
  return `${hour % 12 || 12}:${String(((minute % 60) + 60) % 60).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}${dayOffset > 0 ? ` (+${dayOffset}d)` : ""}`;
}

export type DaylightResult = { sunriseMinutes: number | null; sunsetMinutes: number | null; zone: string; reason?: "polar-day" | "polar-night" | "unavailable" };
const rad = Math.PI / 180;
const normalize = (value: number, modulo: number) => ((value % modulo) + modulo) % modulo;
/** NOAA-style solar event calculation; approximate at high latitudes and in mountains. */
function eventHoursUtc(year: number, month: number, day: number, lat: number, lng: number, rising: boolean): number | null {
  const start = Date.UTC(year, 0, 1);
  const n = Math.floor((Date.UTC(year, month - 1, day) - start) / 86400000) + 1;
  const lngHour = lng / 15;
  const t = n + ((rising ? 6 : 18) - lngHour) / 24;
  const M = 0.9856 * t - 3.289;
  const L = normalize(M + 1.916 * Math.sin(M * rad) + 0.020 * Math.sin(2 * M * rad) + 282.634, 360);
  let RA = normalize(Math.atan(0.91764 * Math.tan(L * rad)) / rad, 360);
  RA = (RA + (Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90)) / 15;
  const sinDec = 0.39782 * Math.sin(L * rad);
  const cosDec = Math.cos(Math.asin(sinDec));
  const cosH = (Math.cos(90.833 * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
  if (!Number.isFinite(cosH) || cosH < -1 || cosH > 1) return null;
  const H = (rising ? 360 - Math.acos(cosH) / rad : Math.acos(cosH) / rad) / 15;
  const T = H + RA - 0.06571 * t - 6.622;
  return normalize(T - lngHour, 24);
}
function localParts(utc: Date, zone: string) {
  const tokens = new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(utc);
  const p = Object.fromEntries(tokens.filter(t => t.type !== "literal").map(t => [t.type, Number(t.value)]));
  return { year: p.year, month: p.month, day: p.day, minutes: p.hour * 60 + p.minute };
}
/** Returns local civil sunrise/sunset in a supplied IANA timezone. No API calls. */
export function approximateDaylight(date: Date | string, lat: number, lng: number, zone: string): DaylightResult {
  const value = new Date(date);
  if (!Number.isFinite(value.getTime()) || !Number.isFinite(lat) || Math.abs(lat) > 90 || !Number.isFinite(lng) || Math.abs(lng) > 180) return { zone, sunriseMinutes: null, sunsetMinutes: null, reason: "unavailable" };
  try {
    const y = value.getUTCFullYear(), m = value.getUTCMonth() + 1, d = value.getUTCDate();
    // Validate supplied IANA timezone before using it.
    new Intl.DateTimeFormat("en-CA", { timeZone: zone });
    const base = Date.UTC(y, m - 1, d);
    const findEvent = (rising: boolean) => {
      const hour = eventHoursUtc(y, m, d, lat, lng, rising);
      if (hour === null) return null;
      const matching: number[] = [];
      for (const offset of [-1, 0, 1]) {
        const p = localParts(new Date(base + (offset * 24 + hour) * 3600000), zone);
        if (p.year === y && p.month === m && p.day === d) matching.push(p.minutes);
      }
      if (matching.length === 0) return null;
      return matching.find(t => rising ? t < 12 * 60 : t >= 12 * 60) ?? matching[0];
    };
    const sunriseMinutes = findEvent(true), sunsetMinutes = findEvent(false);
    if (sunriseMinutes !== null && sunsetMinutes !== null) return { zone, sunriseMinutes, sunsetMinutes };
    // Polar status from the sun elevation at nominal noon; no fictitious sunrise.
    const dayN = Math.floor((base - Date.UTC(y, 0, 1)) / 86400000) + 1;
    const decl = 23.44 * Math.sin((360 / 365 * (dayN - 81)) * rad);
    const noonAltitude = 90 - Math.abs(lat - decl);
    const midnightAltitude = Math.abs(lat + decl) - 90;
    const reason = noonAltitude < -0.833 ? "polar-night" : midnightAltitude > -0.833 ? "polar-day" : "unavailable";
    return { zone, sunriseMinutes, sunsetMinutes, reason };
  } catch { return { zone, sunriseMinutes: null, sunsetMinutes: null, reason: "unavailable" }; }
}
export type ScheduleCheck = { finishMinutes: number; bufferMinutes: number | null; status: "before-sunset" | "tight-daylight" | "after-sunset" | "no-sunset"; arrivalConflict: boolean };
/** Only call for a fully mapped day. Clock inputs are local to the trail. */
export function checkDaySchedule(startHHMM: string, totalMinutes: number | null, solar: DaylightResult, arrivalHHMM?: string | null): ScheduleCheck | null {
  const start = parseClock(startHHMM);
  if (start === null || totalMinutes === null || !Number.isFinite(totalMinutes) || totalMinutes < 0) return null;
  const finishMinutes = start + totalMinutes;
  const bufferMinutes = solar.sunsetMinutes !== null ? solar.sunsetMinutes - finishMinutes : null;
  const status = bufferMinutes === null ? "no-sunset" : bufferMinutes < 0 ? "after-sunset" : bufferMinutes < 45 ? "tight-daylight" : "before-sunset";
  const arrival = parseClock(arrivalHHMM);
  const arrivalConflict = arrival !== null && arrival >= start && finishMinutes > arrival + 5;
  return { finishMinutes, bufferMinutes, status, arrivalConflict };
}

