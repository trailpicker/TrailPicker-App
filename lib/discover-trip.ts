/**
 * Discover -> Trip Planner starter suggestions. These are *not* trails, measured routes,
 * bookings or verified campsites. The existing Builder owns creation and editing.
 */
import type { Destination } from "./destinations";

export type DayPreview = { day: number; date: string; activities: string };
export type DiscoverPreview = {
  count: number;
  days: DayPreview[];
  error: string | null;
};

function utcDay(iso: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const date = new Date(`${iso}T00:00:00.000Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== iso) return null;
  return date;
}

/** Align with lib/trip-planner.ts::parseDates (up to 366 inclusive days). */
export function tripDateError(start: string, end: string): string | null {
  if (!start && !end) return null;
  if (!start || !end) return "Choose both a start and an end date.";
  const first = utcDay(start), last = utcDay(end);
  if (!first || !last) return "Choose valid trip dates.";
  if (last.getTime() < first.getTime()) return "End date cannot be before start date.";
  if ((last.getTime() - first.getTime()) / 86_400_000 > 365) return "Trips may span up to 366 days.";
  return null;
}

export function starterDayActivity(destinationName: string, index: number, count: number): string {
  const name = destinationName.trim().slice(0, 140);
  if (count <= 1) return `Explore ${name}; confirm your route and timing`;
  if (index === 0) return `Travel to ${name}; confirm access and begin your visit`;
  if (index === count - 1) return `Return from ${name}; confirm exit and transport`;
  return `Explore ${name}; choose and verify today's route`;
}

/** Gives a bounded preview, never a made-up turn-by-turn itinerary. */
export function discoverTripPreview(destinationName: string, start: string, end: string): DiscoverPreview {
  const error = tripDateError(start, end);
  if (error || !start || !end) return { count: 0, days: [], error };
  const begin = utcDay(start)!;
  const finish = utcDay(end)!;
  const count = Math.round((finish.getTime() - begin.getTime()) / 86_400_000) + 1;
  const indexes = count <= 3 ? Array.from({length: count}, (_, i) => i) : [0, 1, count - 1];
  const days = indexes.map(index => {
    const date = new Date(begin.getTime() + index * 86_400_000).toISOString().slice(0, 10);
    return { day: index + 1, date, activities: starterDayActivity(destinationName, index, count) };
  });
  return {count, days, error: null};
}

/** Metadata included in the editable Trip Planner logistics section. */
export function createDiscoverLogistics(destination: Destination) {
  const official = /^https:\/\//.test(destination.sourceUrl) ? destination.sourceUrl : "";
  const caution = destination.caution?.trim() || "";
  const info = [
    `Discover destination: ${destination.name} (${destination.park}, ${destination.region}).`,
    official && `Official destination information: ${official}`,
    caution && `Catalog caution (recheck before travel): ${caution}`,
    "This listing does not provide a verified trailhead, daily route, travel duration, or campsite assignment. Confirm current park notices before departure.",
  ].filter(Boolean).join("\n");
  return {
    permits: "Check current park access, day-use, and camping permit requirements; these may be different.",
    reservations: destination.kind === "campground" || !destination.kind
      ? "Check current campground reservation or permit rules with the operator. No booking has been made."
      : "",
    transportation: "", parking: "", emergencyContact: "", emergencyPlan: "",
    notes: info.slice(0, 4900),
  };
}

/** Fields created in TripDay by the existing authenticated/guest build creation transaction. */
export function createDiscoverDaySeed(destination: Destination, index: number, total: number): {activities: string; notes?: string} {
  const activities = starterDayActivity(destination.name, index, total);
  if (index !== 0) return {activities};
  return {
    activities,
    notes: "Starter itinerary only. No route, trailhead, campsite or daily distance has been verified or assigned. Adjust this plan using the official park information.",
  };
}
