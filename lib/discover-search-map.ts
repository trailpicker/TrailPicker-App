import type { Destination } from "./destinations";

/** Same coordinate validation used on destination detail pages, kept pure for search tests. */
export function hasMappedCoordinates(place: Pick<Destination, "latitude" | "longitude">): boolean {
  const { latitude, longitude } = place;
  return typeof latitude === "number" && typeof longitude === "number" &&
    Number.isFinite(latitude) && Number.isFinite(longitude) &&
    latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

/**
 * Never invent marker locations for un-geocoded destinations. Keep the user's
 * filtered sort order intact in both result lists.
 */
export function splitMappedDestinations<T extends Destination>(matching: readonly T[]) {
  const mapped: T[] = [];
  const unmapped: Pick<T, "id" | "name" | "park" | "region" | "difficulty">[] = [];
  for (const destination of matching) {
    if (hasMappedCoordinates(destination)) mapped.push(destination);
    else unmapped.push({
      id: destination.id,
      name: destination.name,
      park: destination.park,
      region: destination.region,
      difficulty: destination.difficulty,
    });
  }
  return { mapped, unmapped };
}
