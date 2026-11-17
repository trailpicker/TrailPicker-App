import type { TrailSegment, LatLng } from "./trail-routing";
import { validShapingWaypoints } from "./route-shaping";
import type { ResourceAnnotation } from "./trip-resources";

export type Waypoint = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  elevationM: number | null;
  dayId?: string | null;
  time?: string | null;
  /** Morning departure for the next day; the overnight campsite itself keeps one ID. */
  nextDayDepartureTime?: string | null;
  nextDayDepartureNote?: string | null;
  /** Optional minutes spent at this stop before continuing. */
  stayMinutes?: number | null;
  note?: string | null;
  kind: "trailhead" | "camp" | "water" | "resupply" | "waypoint";
  /** Non-sensitive campsite, water, or resupply observations; private booking data is stored separately. */
  resource?: ResourceAnnotation;
  /** Route geometry from this stop to the next stop. Optional for legacy/manual routes. */
  trailToNext?: TrailSegment;
  /** Explicit straight-line fallback when a trail cannot be found. */
  manualToNext?: boolean;
  /** Ordered via coordinates between this saved stop and the next. Not itinerary stops. */
  viaToNext?: LatLng[];
};
export type Logistics = { permits: string; reservations: string; transportation: string; parking: string; emergencyContact: string; emergencyPlan: string; notes: string };
export const emptyLogistics: Logistics = { permits: "", reservations: "", transportation: "", parking: "", emergencyContact: "", emergencyPlan: "", notes: "" };
export type PlannerDay = { id: string; date: Date; minTemperature: number | null; conditions: string | null; notes: string | null; startLocation: string | null; endLocation: string | null; distanceKm: number | null; elevationGainM: number | null; elevationLossM: number | null; durationMinutes: number | null; campsite: string | null; reservation: string | null; waterSource: string | null; waterCarryL: number | null; trailConditions: string | null; activities: string | null };
export type PlannerBuild = { id: string; name?: string; location: string | null; locationLat: number | null; locationLng: number | null; startDate: Date | null; endDate: Date | null; people: number; minTemperature: number | null; conditions: string | null; days: PlannerDay[]; routeWaypoints?: unknown; tripLogistics?: unknown };
export const dayTextFields = ["startLocation", "endLocation", "campsite", "reservation", "waterSource", "trailConditions", "activities", "notes"] as const;
export function plannedDay(day: PlannerDay) { return !!(day.startLocation?.trim() && day.endLocation?.trim() && day.distanceKm != null); }
export function tripTotals(days: PlannerDay[]) {
  const sum = (key: "distanceKm" | "elevationGainM" | "elevationLossM" | "durationMinutes") => days.reduce((n,d) => n + (d[key] ?? 0), 0);
  return { distanceKm: sum("distanceKm"), gainM: sum("elevationGainM"), lossM: sum("elevationLossM"), minutes: sum("durationMinutes"), measuredDays: days.filter(d => d.distanceKm != null).length, plannedDays: days.filter(plannedDay).length };
}
export function readWaypoints(value: unknown): Waypoint[] {
  if (!Array.isArray(value)) return [];
  return value.filter((p): p is Waypoint => !!p && typeof p === "object" && typeof p.id === "string" && typeof p.name === "string" && Number.isFinite(p.lat) && Number.isFinite(p.lng) && Math.abs(p.lat) <= 90 && Math.abs(p.lng) <= 180 && ["trailhead","camp","water","resupply","waypoint"].includes(p.kind) && (p.elevationM === null || Number.isFinite(p.elevationM)) && (p.dayId === undefined || p.dayId === null || (typeof p.dayId === "string" && p.dayId.length > 0 && p.dayId.length <= 200)) && (p.time === undefined || p.time === null || (typeof p.time === "string" && (!p.time || /^([01]\d|2[0-3]):[0-5]\d$/.test(p.time)))) && (p.nextDayDepartureTime === undefined || p.nextDayDepartureTime === null || (typeof p.nextDayDepartureTime === "string" && (!p.nextDayDepartureTime || /^([01]\d|2[0-3]):[0-5]\d$/.test(p.nextDayDepartureTime)))) && (p.nextDayDepartureNote === undefined || p.nextDayDepartureNote === null || (typeof p.nextDayDepartureNote === "string" && p.nextDayDepartureNote.length <= 500)) && (p.note === undefined || p.note === null || (typeof p.note === "string" && p.note.length <= 500)) && (p.stayMinutes === undefined || p.stayMinutes === null || (Number.isSafeInteger(p.stayMinutes) && p.stayMinutes >= 0 && p.stayMinutes <= 240)) && (p.manualToNext === undefined || typeof p.manualToNext === "boolean") && (p.viaToNext === undefined || validShapingWaypoints(p.viaToNext)));
}
export function readLogistics(value: unknown): Logistics {
  const result = { ...emptyLogistics };
  if (value && typeof value === "object") for (const key of Object.keys(result) as (keyof Logistics)[]) { const v = (value as Record<string, unknown>)[key]; if (typeof v === "string") result[key] = v; }
  return result;
}
export function nullableNumber(raw: unknown, label: string, min: number, max: number, integer = false): number | null {
  if (raw == null || raw === "") return null;
  if (typeof raw !== "string" && typeof raw !== "number") throw new Error(`${label} must be a number.`);
  const n = Number(raw);
  if (!Number.isFinite(n) || n < min || n > max || (integer && !Number.isInteger(n))) throw new Error(`${label} must be ${integer ? "a whole number " : ""}between ${min} and ${max}.`);
  return n;
}
export function parseDates(startRaw: string, endRaw: string) {
  if (!startRaw && !endRaw) return { startDate: null, endDate: null };
  const valid = (raw: string) => /^\d{4}-\d{2}-\d{2}$/.test(raw) && Number.isFinite(new Date(raw).getTime()) && new Date(raw).toISOString().slice(0,10) === raw;
  if (!valid(startRaw) || !valid(endRaw)) throw new Error("Choose both a valid start and end date.");
  const startDate = new Date(startRaw), endDate = new Date(endRaw);
  if (endDate < startDate) throw new Error("End date must be on or after start date.");
  if ((endDate.getTime()-startDate.getTime())/86400000 > 365) throw new Error("Trips can span up to 366 days.");
  return { startDate, endDate };
}





