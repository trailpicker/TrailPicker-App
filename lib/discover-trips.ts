/** Public community-trip presentation helpers. No user-private logistics are exposed. */
export type TripFeature = "all" | "route" | "campsite" | "gear";
export const TRIP_FEATURES: readonly TripFeature[] = ["all", "route", "campsite", "gear"];
export type TripDayPublic = {
  id?: string;
  date: Date | string;
  startLocation: string | null;
  endLocation: string | null;
  distanceKm: number | null;
  elevationGainM: number | null;
  elevationLossM?: number | null;
  durationMinutes?: number | null;
  campsite: string | null;
  activities: string | null;
};
export type TripStats = {
  dayCount: number;
  distanceKm: number | null;
  elevationGainM: number | null;
  measuredDistanceDays: number;
  measuredGainDays: number;
  campsites: number;
};
export function parseTripFeature(value: string | string[] | undefined): TripFeature {
  const input = Array.isArray(value) ? value[0] : value;
  return TRIP_FEATURES.includes(input as TripFeature) ? input as TripFeature : "all";
}
export function summarizeTripDays(days: readonly TripDayPublic[]): TripStats {
  const withDistance = days.filter(day => day.distanceKm !== null && Number.isFinite(day.distanceKm) && day.distanceKm >= 0);
  const withGain = days.filter(day => day.elevationGainM !== null && Number.isFinite(day.elevationGainM) && day.elevationGainM >= 0);
  return {
    dayCount: days.length,
    distanceKm: withDistance.length ? withDistance.reduce((sum, day) => sum + day.distanceKm!, 0) : null,
    elevationGainM: withGain.length ? withGain.reduce((sum, day) => sum + day.elevationGainM!, 0) : null,
    measuredDistanceDays: withDistance.length,
    measuredGainDays: withGain.length,
    campsites: days.filter(day => Boolean(day.campsite?.trim())).length,
  };
}
export function tripHref(id: string): string {
  return `/discover/trips/${encodeURIComponent(id)}`;
}
export function tripBrowseHref(
  filters: { q: string; location: string; region: string; sort: string },
  feature: TripFeature,
  updates: Partial<{ q: string; location: string; region: string; sort: string; feature: TripFeature; page: number }> = {},
): string {
  const next = {...filters, feature, page: 1, ...updates};
  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.location) params.set("location", next.location);
  if (next.region) params.set("region", next.region);
  if (next.sort !== "recent") params.set("sort", next.sort);
  if (next.feature !== "all") params.set("feature", next.feature);
  if (next.page > 1) params.set("page", String(next.page));
  return `/discover/community${params.toString() ? `?${params.toString()}` : ""}`;
}
/** A public build may contain private notes, reservations and logistics. Never copy those to Discover pages. */
export function publicTripDay(day: TripDayPublic): TripDayPublic {
  return {
    ...(day.id?{id:day.id}:{}), date: day.date, startLocation: day.startLocation, endLocation: day.endLocation,
    distanceKm: day.distanceKm, elevationGainM: day.elevationGainM,
    elevationLossM: day.elevationLossM ?? null,
    durationMinutes: day.durationMinutes ?? null,
    campsite: day.campsite, activities: day.activities,
  };
}
export function tripDayTitle(day: Pick<TripDayPublic, "startLocation" | "endLocation" | "activities" | "campsite">, index: number): string {
  const start = day.startLocation?.trim();
  const end = day.endLocation?.trim();
  if (start && end) return start === end ? start : `${start} → ${end}`;
  return end || start || day.activities?.trim() || day.campsite?.trim() || `Day ${index + 1}`;
}
export function publicTripAuthor(user: { name: string | null; username: string | null; isProfilePublic: boolean } | null): string {
  return user?.isProfilePublic ? user.username || user.name || "Community member" : "Community member";
}
export function tripDate(value: Date | string | null | undefined): string {
  if (!value) return "Date not set";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date not set" : date.toLocaleDateString("en-CA", {month: "short", day: "numeric", year: "numeric", timeZone: "UTC"});
}
