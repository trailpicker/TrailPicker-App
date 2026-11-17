/** Private, structured permits and non-campsite bookings. Campsite bookings
 * continue using phase6.bookings so there is only one authoritative record. */
export const ARRANGEMENT_KINDS = ["permit", "reservation", "other"] as const;
export const ARRANGEMENT_CATEGORIES = ["other", "hut", "shuttle", "ferry", "parking", "rental"] as const;
// "cancelled" remains readable for older saved entries, but is not a choice
// in the new four-stage booking progress control.
export const ARRANGEMENT_STATUSES = ["not_required", "planned", "pending", "confirmed", "cancelled"] as const;
export type ArrangementKind = (typeof ARRANGEMENT_KINDS)[number];
export type ArrangementCategory = (typeof ARRANGEMENT_CATEGORIES)[number];
export type ArrangementStatus = (typeof ARRANGEMENT_STATUSES)[number];
export type TripArrangement = {
  id: string;
  kind: ArrangementKind;
  category: ArrangementCategory;
  name: string;
  status: ArrangementStatus;
  startDate: string;
  endDate: string;
  provider: string;
  confirmation: string;
  bookingUrl: string;
  notes: string;
  dayId: string;
  /** Optional link to a real overnight waypoint for hut/shelter reservations. */
  waypointId?: string;
};
const caps: Record<keyof TripArrangement, number> = {
  id: 100, kind: 20, category: 20, name: 200, status: 20,
  startDate: 10, endDate: 10, provider: 150, confirmation: 120,
  bookingUrl: 500, notes: 750, dayId: 200, waypointId: 200,
};
const isDate = (s: string) => !s || /^\d{4}-\d{2}-\d{2}$/.test(s) && (() => {
  const date = new Date(`${s}T12:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === s;
})();
export function validateArrangements(input: unknown, validDayIds?: readonly string[], validCampIds?: readonly string[]): TripArrangement[] {
  if (!Array.isArray(input) || input.length > 80) throw new Error("Up to 80 permits and reservations are supported.");
  const seen = new Set<string>();
  return input.map(value => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid permit or reservation.");
    const raw = value as Record<string, unknown>;
    if (Object.keys(raw).some(key => !(key in caps))) throw new Error("Unknown permit or reservation field.");
    const values = {} as Record<keyof TripArrangement, string>;
    for (const [key, max] of Object.entries(caps) as [keyof TripArrangement, number][]) {
      const v = raw[key];
      if (key === "waypointId" && v === undefined) continue;
      if (typeof v !== "string" || v.length > max) throw new Error(`Invalid reservation ${key}.`);
      values[key] = v.trim();
    }
    const entry = values as unknown as TripArrangement;
    if (!entry.id || seen.has(entry.id)) throw new Error("Duplicate or missing reservation ID.");
    seen.add(entry.id);
    if (!entry.name || !ARRANGEMENT_KINDS.includes(entry.kind) || !ARRANGEMENT_CATEGORIES.includes(entry.category) || !ARRANGEMENT_STATUSES.includes(entry.status)) throw new Error("Invalid reservation type, name, or status.");
    if (entry.kind === "permit" && entry.category !== "other") throw new Error("Permits do not require a reservation category.");
    if (!isDate(entry.startDate) || !isDate(entry.endDate) || (entry.startDate && entry.endDate && entry.endDate < entry.startDate)) throw new Error("Invalid reservation dates.");
    if (entry.bookingUrl) {
      try { if (new URL(entry.bookingUrl).protocol !== "https:") throw new Error(); }
      catch { throw new Error("Use an HTTPS booking URL."); }
    }
    if (validDayIds && entry.dayId && !validDayIds.includes(entry.dayId)) throw new Error("Reservation refers to a removed trip day.");
    if (entry.waypointId && entry.category !== "hut") throw new Error("Only hut reservations may link to overnight stops.");
    if (validCampIds && entry.waypointId && !validCampIds.includes(entry.waypointId)) throw new Error("Reservation refers to a removed overnight stop.");
    return entry;
  });
}
export function readArrangements(logistics: unknown): TripArrangement[] {
  if (!logistics || typeof logistics !== "object" || Array.isArray(logistics)) return [];
  const value = (logistics as Record<string,unknown>).arrangements;
  if (value === undefined) return [];
  try { return validateArrangements(value); } catch { return []; }
}
