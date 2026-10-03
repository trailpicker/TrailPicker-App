import rawDestinations from "@/data/destinations.json";

export type FacilityStatus = "yes" | "no" | "seasonal" | "unknown";

export type DogPolicy =
  | "not-allowed"
  | "leashed"
  | "under-control"
  | "check-current-rules";

export type ReservationPolicy =
  | "required"
  | "peak-season"
  | "permit"
  | "check-current-rules";

export type Difficulty = "easy" | "moderate" | "hard";

export type Destination = {
  id: string;
  name: string;
  park: string;
  region: string;
  latitude: number;
  longitude: number;
  distanceKm: number | null;
  elevationGainM: number | null;
  difficulty: Difficulty;
  tentSites: number | null;
  toilet: FacilityStatus;
  foodStorage: FacilityStatus;
  dogs: DogPolicy;
  reservations: ReservationPolicy;
  featured: boolean;
  summary: string;
  caution: string | null;
  sourceUrl: string;
  bookingUrl: string | null;
};

export const DESTINATIONS = rawDestinations as Destination[];

export function getDestination(id?: string | null) {
  if (!id) return null;

  return (
    DESTINATIONS.find((destination) => destination.id === id) ?? null
  );
}

export function getDestinationRegions() {
  return [
    ...new Set(
      DESTINATIONS.map((destination) => destination.region),
    ),
  ].sort();
}