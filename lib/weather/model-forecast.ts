/** ECCC deterministic model schedule selection. No city/observation substitution. */
import { dateKey, risk, type Alert, type Hour, type Period } from "./core";

export type ModelId = "HRDPS" | "RDPS" | "GDPS";
export const MODELS = [
  { id: "HRDPS", km: 2.5, horizonHours: 48, temperature: "HRDPS.CONTINENTAL_TT", wind: "HRDPS.CONTINENTAL_WSPD", gust: "HRDPS.CONTINENTAL_WGE" },
  { id: "RDPS", km: 10, horizonHours: 84, temperature: "RDPS_10km_AirTemp_2m", wind: "RDPS_10km_WindSpeed_10m", gust: "RDPS_10km_WindGust_10m" },
  { id: "GDPS", km: 15, horizonHours: 240, temperature: "GDPS_15km_AirTemp_2m", wind: "GDPS_15km_WindSpeed_10m", gust: "GDPS_15km_WindGust_10m" },
] as const;
export type ModelDef = (typeof MODELS)[number];
export type Schedule = { model: ModelDef; times: string[]; run: string };
export type ModelHour = Hour & {
  model: ModelId;
  resolutionKm: number;
  run: string;
  /** GDPS cloud fraction in percent when a verified grid sample exists. */
  cloudCover?: number;
  /** Deterministic model output, NOT measured current conditions. */
  sampled: true;
};
export type ModelDay = {
  date: string;
  high: number | null;
  low: number | null;
  wind: number | null;
  gust: number | null;
  pop: number | null; // Only populated from a separately verified probabilistic layer.
  /** Mean of actual available cloud-cover samples; not a daily sky observation. */
  cloudCover?: number;
  summary: string;
  model: string;
  samples: number;
  /** Values are extrema of sampled hours, not official predicted daily highs/lows. */
  sampledExtrema: true;
};
export function modelPriority(at: string, schedules: Schedule[], now: number): Schedule[] {
  const stamp = Date.parse(at);
  if (!Number.isFinite(stamp) || stamp < now - 3600000 || stamp > now + 240 * 3600000) return [];
  return schedules.filter(s => s.times.includes(at) && stamp >= Date.parse(s.run) && stamp - Date.parse(s.run) <= s.model.horizonHours * 3600000)
    .sort((a, b) => MODELS.indexOf(a.model) - MODELS.indexOf(b.model));
}
export function chooseTimes(schedules: Schedule[], zone: string, date: string, now: number): string[] {
  const all = [...new Set(schedules.flatMap(s => s.times))]
    .filter(t => modelPriority(t, schedules, now).length && (!date || dateKey(t, zone) === date))
    .sort();
  // Hourly next 24h, thereafter sample at synoptic times. No interpolation or manufactured hours.
  return all.filter(t => {
    const lead = (Date.parse(t) - now) / 3600000;
    if (date) return lead <= 24 ? true : new Date(t).getUTCHours() % 3 === 0;
    return lead <= 24 ? true : lead <= 84 ? new Date(t).getUTCHours() % 6 === 0 : new Date(t).getUTCHours() % 12 === 0;
  }).slice(0, date ? 24 : 58);
}
/**
 * A first-paint forecast: a few real model timestamps distributed across days.
 * Never interpolate between samples. Full-resolution timestamps remain available
 * through chooseTimes() when a user explicitly requests details.
 */
export function chooseSummaryTimes(schedules: Schedule[], zone: string, date: string, now: number): string[] {
  const available = chooseTimes(schedules, zone, date, now);
  const groups = new Map<string, string[]>();
  for (const time of available) {
    const key = dateKey(time, zone);
    groups.set(key, [...(groups.get(key) ?? []), time]);
  }
  const localHour = (time: string) => Number(new Intl.DateTimeFormat("en-GB", {
    timeZone: zone, hour: "2-digit", hourCycle: "h23",
  }).format(new Date(time)));
  const selected = new Set<string>();
  for (const [day, hours] of groups) {
    const firstDay = day === groups.keys().next().value;
    const targets = date ? [6, 12, 18] : firstDay ? [6, 12, 18] : selected.size < 7 ? [7, 18] : [12];
    if (firstDay) selected.add(hours[0]);
    for (const hour of targets) {
      const best = hours.reduce((prev, current) =>
        Math.abs(localHour(current) - hour) < Math.abs(localHour(prev) - hour) ? current : prev);
      selected.add(best);
    }
  }
  return [...selected].sort().slice(0, date ? 5 : 16);
}

export function summarizeModel(hours: ModelHour[], zone: string): ModelDay[] {
  const groups = new Map<string, ModelHour[]>();
  for (const h of hours) {
    const day = dateKey(h.time, zone);
    groups.set(day, [...(groups.get(day) ?? []), h]);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, hs]) => {
    const temp = hs.map(h => h.temperature).filter((n): n is number => n !== null);
    const wind = hs.map(h => h.wind).filter((n): n is number => n !== null);
    const gust = hs.map(h => h.gust).filter((n): n is number => n !== null);
    const pops = hs.map(h => h.pop).filter((n): n is number => n !== null);
    const cloud = hs.map(h => h.cloudCover).filter((n): n is number => typeof n === "number");
    const low = temp.length ? Math.round(Math.min(...temp)) : null;
    const high = temp.length ? Math.round(Math.max(...temp)) : null;
    const models = [...new Set(hs.map(h => h.model))];
    return { date, high, low, wind: wind.length ? Math.round(Math.max(...wind)) : null,
      gust: gust.length ? Math.round(Math.max(...gust)) : null, pop: pops.length ? Math.round(Math.max(...pops)) : null,
      ...(cloud.length ? { cloudCover: Math.round(cloud.reduce((sum, n) => sum + n, 0) / cloud.length) } : {}),
      summary: pops.length ? "Model temperature/wind with HRDPS-WEonG precipitation probability where available." : "Deterministic model estimates; precipitation probability unavailable.",
      model: models.join(" / "), samples: hs.length, sampledExtrema: true as const };
  });
}
export function assessModel(hours: ModelHour[], alertCount: number, missing: boolean) {
  const periods: Period[] = [];
  const alerts: Alert[] = alertCount ? [{ id:"active", title:"Official alert", text:"", area:"", issued:null, expires:"", colour:"" }] : [];
  const result = risk(periods, hours, alerts, missing);
  const precipitation = hours.some(h => h.pop !== null && h.pop >= 70);
  if (!precipitation) return result;
  const reasons = [...result.reasons, "HRDPS-WEonG shows at least a 70% precipitation probability for one or more sampled hours."];
  return { level: result.level === "No flagged factors" ? "Caution" as const : result.level, reasons };

}

