/**
 * Discover destination-page helpers.
 * No guessed trailhead positions, facility claims or travel distances.
 * Data remains sourced from the existing BC destination catalog.
 */
import type { Destination } from "./destinations";

export type Coordinates = Readonly<{ latitude: number; longitude: number }>;
export type RelatedDestination = Readonly<{
  destination: Destination;
  /** Straight-line distance between stored coordinates. Not hiking or driving distance. */
  straightLineKm: number | null;
  relation: "same-park" | "nearby-coordinate";
}>;

export function destinationHref(id: string): string {
  return `/discover/destinations/${encodeURIComponent(id)}`;
}

export function validCoordinates(place: Pick<Destination, "latitude" | "longitude">): Coordinates | null {
  const { latitude, longitude } = place;
  if (typeof latitude !== "number" || typeof longitude !== "number" ||
      !Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;
  return { latitude, longitude };
}

function radians(degrees: number) { return degrees * Math.PI / 180; }
export function straightLineKm(a: Coordinates, b: Coordinates): number {
  const differenceLat = radians(b.latitude - a.latitude);
  const differenceLon = radians(b.longitude - a.longitude);
  const value = Math.sin(differenceLat / 2) ** 2 +
    Math.cos(radians(a.latitude)) * Math.cos(radians(b.latitude)) * Math.sin(differenceLon / 2) ** 2;
  return 6371.0088 * 2 * Math.asin(Math.min(1, Math.sqrt(value)));
}

/** Handles "Mount Robson Provincial Park" vs "Mount Robson Park" without merging different parks. */
export function parkKey(park: string): string {
  return park.toLocaleLowerCase("en-CA")
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\b(provincial|national)\s+park\b/g, "park")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

/** Related campground records come from the same park or verified stored points nearby. */
export function relatedCampgrounds(
  current: Destination, catalog: readonly Destination[], limit = 4,
): RelatedDestination[] {
  const base = validCoordinates(current);
  const matches: RelatedDestination[] = [];
  for (const destination of catalog) {
    if (destination.id === current.id || (destination.kind ?? "campground") !== "campground") continue;
    const other = validCoordinates(destination);
    const km = base && other ? straightLineKm(base, other) : null;
    const samePark = parkKey(destination.park) === parkKey(current.park);
    if (samePark) matches.push({ destination, straightLineKm: km, relation: "same-park" });
    // Stay in the same catalog region when suggesting nearby sites across park boundaries.
    else if (destination.region === current.region && km !== null && km <= 35) matches.push({ destination, straightLineKm: km, relation: "nearby-coordinate" });
  }
  return matches.sort((a,b) =>
    Number(a.relation !== "same-park") - Number(b.relation !== "same-park") ||
    (a.straightLineKm ?? Infinity) - (b.straightLineKm ?? Infinity) ||
    a.destination.name.localeCompare(b.destination.name)
  ).slice(0, Math.max(0, Math.min(limit, 12)));
}

/** More places inside exactly this park, not a guessed region-wide proximity match. */
export function relatedPlaces(
  current: Destination, catalog: readonly Destination[], limit = 4,
): Destination[] {
  return catalog.filter(destination =>
    destination.id !== current.id &&
    (destination.kind ?? "campground") !== "campground" &&
    parkKey(destination.park) === parkKey(current.park)
  ).sort((a,b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name))
    .slice(0, Math.max(0, Math.min(limit, 12)));
}

export function officialUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch { return null; }
}

export function openStreetMapEmbedUrl(coords: Coordinates): string {
  // A visible point, not a fabricated trail line. 0.06° latitude spans ~6.7 km.
  const { latitude: lat, longitude: lon } = coords;
  const bbox = [lon - 0.052, lat - 0.03, lon + 0.052, lat + 0.03]
    .map(n => Number(n.toFixed(6))).join(",");
  const params = new URLSearchParams({ bbox, layer: "mapnik", marker: `${lat},${lon}` });
  return `https://www.openstreetmap.org/export/embed.html?${params}`;
}

export function openStreetMapLink(coords: Coordinates): string {
  return `https://www.openstreetmap.org/?mlat=${coords.latitude}&mlon=${coords.longitude}#map=13/${coords.latitude}/${coords.longitude}`;
}

export function openStreetMapSearch(place: Pick<Destination, "name" | "park">): string {
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(`${place.name}, ${place.park}, British Columbia, Canada`)}`;
}

export function facilityLabel(value: string | null | undefined): string {
  switch(value) {
    case "yes": return "Available";
    case "no": return "Not provided";
    case "seasonal": return "Seasonal";
    case "unknown": return "Not confirmed";
    default: return "Not listed";
  }
}
export function dogsLabel(value: string): string {
  switch(value) {
    case "not-allowed": return "Not permitted";
    case "leashed": return "Leash required";
    case "under-control": return "Must be under control";
    default: return "Check current rules";
  }
}
export function permitLabel(value: string): string {
  switch(value) {
    case "required": return "Reservation required";
    case "peak-season": return "Seasonal reservations";
    case "permit": return "Permit required";
    default: return "Check current rules";
  }
}
export function distanceLabel(value: number | null, type?: string | null): string {
  if (value === null) return "Not provided";
  const suffix = type === "one-way" ? " one way" : type === "round-trip" ? " round trip" : type === "loop" ? " loop" : " listed";
  return `${Number(value.toFixed(1))} km${suffix}`;
}

