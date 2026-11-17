/** Private trip logistics and public-safe route resource annotations.
 * Water estimates are planning prompts, not proof of an available or potable water supply.
 */
import { metersBetween, usableTrailSegment } from "./trail-routing";
import type { Waypoint } from "./trip-planner";

export type ResourceKind = "camp" | "water" | "resupply";
export type WaterReliability = "unknown" | "reported" | "seasonal" | "unavailable";
export type ResourceAnnotation = {
  detail?: string;
  access?: string;
  waterReliability?: WaterReliability;
  refillConfirmed?: boolean;
  checkedOn?: string;
  sourceName?: string;
  sourceUrl?: string;
};
export type BookingStatus = "to_book" | "requested" | "confirmed" | "cancelled" | "not_required";
export type CampBooking = {
  id: string;
  waypointId: string;
  dayId: string;
  campground: string;
  status: BookingStatus;
  arrival: string;
  departure: string;
  provider: string;
  confirmation: string;
  notes: string;
  bookingUrl?: string;
};
export type ResourceSettings = { rateLph: number; reserveL: number; capacityL: number };
export type PrivateTripResources = { settings: ResourceSettings; bookings: CampBooking[] };
export const defaultResourceSettings: ResourceSettings = { rateLph: 0.6, reserveL: 0.75, capacityL: 3 };
export const BOOKING_STATUSES: BookingStatus[] = ["to_book", "requested", "confirmed", "cancelled", "not_required"];
const short = (value: unknown, limit: number): string => typeof value === "string" ? value.trim().slice(0, limit) : "";
const validIso = (value: string) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value;
};
const validHttps = (value: string) => !value || (() => { try { return new URL(value).protocol === "https:"; } catch { return false; } })();

export function parseResourceAnnotation(value: unknown): ResourceAnnotation | null {
  if (value == null) return null;
  if (typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid stop resource information.");
  const obj = value as Record<string, unknown>;
  const allowed = new Set(["detail","access","waterReliability","refillConfirmed","checkedOn","sourceName","sourceUrl"]);
  if (Object.keys(obj).some(key => !allowed.has(key))) throw new Error("Unsupported stop resource field.");
  for (const key of ["detail", "access", "checkedOn", "sourceName", "sourceUrl"] as const) {
    if (obj[key] !== undefined && (typeof obj[key] !== "string" || obj[key].length > (key === "detail" ? 750 : key === "access" ? 350 : 300))) throw new Error(`Invalid resource ${key}.`);
  }
  if (obj.waterReliability !== undefined && !["unknown", "reported", "seasonal", "unavailable"].includes(String(obj.waterReliability))) throw new Error("Invalid water-source reliability.");
  if (obj.refillConfirmed !== undefined && typeof obj.refillConfirmed !== "boolean") throw new Error("Invalid refill confirmation.");
  const checkedOn = short(obj.checkedOn, 20), sourceUrl = short(obj.sourceUrl, 300);
  if (!validIso(checkedOn) || !validHttps(sourceUrl)) throw new Error("Check the source date and HTTPS URL.");
  const result: ResourceAnnotation = {
    ...(short(obj.detail, 750) ? { detail: short(obj.detail, 750) } : {}),
    ...(short(obj.access, 350) ? { access: short(obj.access, 350) } : {}),
    ...(obj.waterReliability !== undefined ? { waterReliability: obj.waterReliability as WaterReliability } : {}),
    ...(obj.refillConfirmed === true ? { refillConfirmed: true } : {}),
    ...(checkedOn ? { checkedOn } : {}),
    ...(short(obj.sourceName, 120) ? { sourceName: short(obj.sourceName, 120) } : {}),
    ...(sourceUrl ? { sourceUrl } : {}),
  };
  return Object.keys(result).length ? result : null;
}

export function readPrivateResources(value: unknown): PrivateTripResources {
  const root = value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
  const raw = root.phase6 && typeof root.phase6 === "object" && !Array.isArray(root.phase6) ? root.phase6 as Record<string, unknown> : {};
  const settings = raw.settings && typeof raw.settings === "object" && !Array.isArray(raw.settings) ? raw.settings as Record<string, unknown> : {};
  const n = (value: unknown, fallback: number, min: number, max: number) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max ? value : fallback;
  return {
    settings: {
      rateLph: n(settings.rateLph, defaultResourceSettings.rateLph, 0.1, 2),
      reserveL: n(settings.reserveL, defaultResourceSettings.reserveL, 0, 5),
      capacityL: n(settings.capacityL, defaultResourceSettings.capacityL, 0.25, 20),
    },
    bookings: Array.isArray(raw.bookings) ? raw.bookings.slice(0, 40).flatMap(entry => {
      if (!entry || typeof entry !== "object") return [];
      const row = entry as Record<string, unknown>;
      const status = BOOKING_STATUSES.includes(row.status as BookingStatus) ? row.status as BookingStatus : "to_book";
      const arrival = short(row.arrival, 10), departure = short(row.departure, 10);
      if (!validIso(arrival) || !validIso(departure)) return [];
      return [{
        id: short(row.id, 100), waypointId: short(row.waypointId, 200), dayId: short(row.dayId, 200),
        campground: short(row.campground, 200), status, arrival, departure,
        provider: short(row.provider, 150), confirmation: short(row.confirmation, 120), notes: short(row.notes, 750),
        ...(validHttps(short(row.bookingUrl, 500)) && short(row.bookingUrl, 500) ? { bookingUrl: short(row.bookingUrl, 500) } : {}),
      }];
    }) : [],
  };
}

export function validatePrivateResources(value: unknown, validDays: readonly string[], validStops: readonly string[]): PrivateTripResources {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid campsite planning data.");
  const raw = value as Record<string, unknown>;
  const settings = raw.settings;
  if (!settings || typeof settings !== "object" || Array.isArray(settings)) throw new Error("Missing water settings.");
  const config = settings as Record<string, unknown>;
  const bounds: [keyof ResourceSettings, number, number][] = [["rateLph",0.1,2],["reserveL",0,5],["capacityL",0.25,20]];
  for (const [key,min,max] of bounds) if (typeof config[key] !== "number" || !Number.isFinite(config[key]) || (config[key] as number) < min || (config[key] as number) > max) throw new Error(`Water ${key} must be between ${min} and ${max}.`);
  if (!Array.isArray(raw.bookings) || raw.bookings.length > 40) throw new Error("A trip can store up to 40 campsite reservations.");
  const bookings: CampBooking[] = [];
  const ids = new Set<string>();
  for (const record of raw.bookings) {
    if (!record || typeof record !== "object" || Array.isArray(record)) throw new Error("Invalid booking record.");
    const row = record as Record<string, unknown>;
    const required = ["id","waypointId","dayId","campground","status","arrival","departure","provider","confirmation","notes"];
    if (Object.keys(row).some(key => !required.includes(key) && key !== "bookingUrl")) throw new Error("Unknown booking field.");
    if (row.bookingUrl !== undefined && (typeof row.bookingUrl !== "string" || row.bookingUrl.length > 500 || !validHttps(row.bookingUrl))) throw new Error("Invalid booking HTTPS URL.");
    const caps: Record<string,number> = { id:100, waypointId:200, dayId:200, campground:200, status:20, arrival:10, departure:10, provider:150, confirmation:120, notes:750 };
    for (const key of required) if (typeof row[key] !== "string" || row[key].length > caps[key]) throw new Error(`Invalid booking ${key}.`);
    const b = row as CampBooking;
    if (!b.id || ids.has(b.id)) throw new Error("Duplicate booking ID.");
    ids.add(b.id);
    if (!BOOKING_STATUSES.includes(b.status)) throw new Error("Invalid booking status.");
    if (b.waypointId && !validStops.includes(b.waypointId)) throw new Error("Reservation refers to a removed campsite stop.");
    if (b.dayId && !validDays.includes(b.dayId)) throw new Error("Reservation refers to a removed trip day.");
    if (!validIso(b.arrival) || !validIso(b.departure) || (b.arrival && b.departure && b.departure < b.arrival)) throw new Error("Invalid booking dates.");
    bookings.push({ ...(Object.fromEntries(required.map(key => [key, (b as unknown as Record<string,string>)[key].trim()])) as CampBooking),
      ...(typeof row.bookingUrl === "string" && row.bookingUrl.trim() ? { bookingUrl: row.bookingUrl.trim() } : {}) });
  }
  return { settings: { rateLph: config.rateLph as number, reserveL: config.reserveL as number, capacityL: config.capacityL as number }, bookings };
}

export type WaterLeg = { from: string; to: string; distanceKm: number | null; movingHours: number | null; requiredL: number | null; exceedsCapacity: boolean; incomplete: boolean; note: string };
export function calculateWaterLegs(points: readonly Waypoint[], settings: ResourceSettings, paceKmh = 3.5): WaterLeg[] {
  if (!points.length || !Number.isFinite(paceKmh) || paceKmh <= 0) return [];
  const segments: WaterLeg[] = [];
  let origin = points[0].name, km = 0, hours = 0, incomplete = false;
  for (let i = 0; i < points.length - 1; i++) {
    const from = points[i], to = points[i + 1];
    const trail = from.manualToNext ? null : usableTrailSegment(from, to);
    if (!trail) incomplete = true;
    else {
      km += trail.distanceM / 1000;
      if (trail.ascentM !== undefined && trail.elevationsM && trail.elevationsM.length === trail.geometry.length) {
        hours += trail.distanceM / 1000 / paceKmh + trail.ascentM / 600;
      } else incomplete = true;
    }
    const refill = to.kind === "water" && to.resource?.refillConfirmed && to.resource.waterReliability !== "unavailable";
    const final = i === points.length - 2;
    if (refill || final) {
      const required = incomplete ? null : Number((hours * settings.rateLph + settings.reserveL).toFixed(2));
      segments.push({ from: origin, to: to.name, distanceKm: incomplete ? null : Number(km.toFixed(2)), movingHours: incomplete ? null : Number(hours.toFixed(2)), requiredL: required, exceedsCapacity: required !== null && required > settings.capacityL, incomplete, note: refill ? "Planned refill, availability must be rechecked" : "End of route or no later confirmed refill" });
      origin = to.name; km = 0; hours = 0; incomplete = false;
    }
  }
  return segments;
}
