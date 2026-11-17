/** Cross-section links use catalog IDs and public Build records, never fuzzy place names. */
export type RelatedPublicItem = {
  id: string;
  name: string;
  dayCount: number;
  gearCount: number;
};

export type RelatedPublicContent = {
  trips: RelatedPublicItem[];
  packs: RelatedPublicItem[];
};

export const EMPTY_RELATED_CONTENT: RelatedPublicContent = { trips: [], packs: [] };

export function relatedTripHref(id: string): string {
  return `/discover/trips/${encodeURIComponent(id)}`;
}

export function relatedPackHref(id: string): string {
  return `/discover/packs/${encodeURIComponent(id)}`;
}

export function relatedDestinationHref(id: string): string {
  return `/discover/destinations/${encodeURIComponent(id)}`;
}

/** Exact catalog identifiers are the sole basis of matching. */
export function relatedDestinationMatches(
  candidateId: string | null | undefined,
  requestedId: string | null | undefined,
): boolean {
  return Boolean(candidateId && requestedId && candidateId === requestedId);
}

export function relatedPublicSummary(item: RelatedPublicItem, kind: "trip" | "pack"): string {
  if (kind === "trip") {
    return `${item.dayCount} ${item.dayCount === 1 ? "day" : "days"}${item.gearCount ? ` · ${item.gearCount} gear entries` : ""}`;
  }
  return `${item.gearCount} ${item.gearCount === 1 ? "gear entry" : "gear entries"}${item.dayCount ? ` · ${item.dayCount} itinerary days` : ""}`;
}
