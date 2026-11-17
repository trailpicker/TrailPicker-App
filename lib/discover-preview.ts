/**
 * Illustrative trail previews for the Discover UI layout.
 * This is NOT a verified trail directory. Don't use these rows for routing,
 * condition reports, safety decisions, or trip auto-population.
 */
export type PreviewTrailKind = "day" | "overnight" | "multi";
export type PreviewTrailRegion =
  | "Sea to Sky"
  | "Vancouver Island"
  | "Sunshine Coast"
  | "Canadian Rockies"
  | "Lower Mainland";

export type PreviewTrail = {
  id: string;
  name: string;
  region: PreviewTrailRegion;
  park: string;
  kind: PreviewTrailKind;
  landscape: "Alpine" | "Coastal" | "Forest" | "Mountain";
  description: string;
  image: string;
};

export const previewTrails: readonly PreviewTrail[] = [
  {
    id: "garibaldi-lake", name: "Garibaldi Lake", region: "Sea to Sky",
    park: "Garibaldi Provincial Park", kind: "day", landscape: "Alpine",
    description: "A classic alpine lake destination in the Coast Mountains.",
    image: "/discover/alpine.svg",
  },
  {
    id: "juan-de-fuca", name: "Juan de Fuca Marine Trail", region: "Vancouver Island",
    park: "Juan de Fuca Provincial Park", kind: "multi", landscape: "Coastal",
    description: "A wild coastline of forest, beaches, and ocean views.",
    image: "/discover/coast.svg",
  },
  {
    id: "elfin-lakes", name: "Elfin Lakes", region: "Sea to Sky",
    park: "Garibaldi Provincial Park", kind: "overnight", landscape: "Alpine",
    description: "A mountain landscape with a well-known backcountry destination.",
    image: "/discover/ridge.svg",
  },
  {
    id: "sunshine-coast", name: "Sunshine Coast Trail", region: "Sunshine Coast",
    park: "Powell River region", kind: "multi", landscape: "Forest",
    description: "A longer-distance journey through coastal forests and ridgelines.",
    image: "/discover/forest.svg",
  },
  {
    id: "lake-ohara", name: "Lake O’Hara", region: "Canadian Rockies",
    park: "Yoho National Park", kind: "day", landscape: "Alpine",
    description: "High alpine scenery in the Canadian Rockies.",
    image: "/discover/alpine.svg",
  },
  {
    id: "west-coast-trail", name: "West Coast Trail", region: "Vancouver Island",
    park: "Pacific Rim National Park Reserve", kind: "multi", landscape: "Coastal",
    description: "An iconic coastal backpacking setting on Vancouver Island.",
    image: "/discover/coast.svg",
  },
  {
    id: "golden-ears", name: "Golden Ears Summit", region: "Lower Mainland",
    park: "Golden Ears Provincial Park", kind: "day", landscape: "Mountain",
    description: "A mountain objective not far from Metro Vancouver.",
    image: "/discover/ridge.svg",
  },
  {
    id: "panorama-ridge", name: "Panorama Ridge", region: "Sea to Sky",
    park: "Garibaldi Provincial Park", kind: "day", landscape: "Alpine",
    description: "An expansive alpine ridge with mountain and lake scenery.",
    image: "/discover/alpine.svg",
  },
];

export const previewRegions: readonly PreviewTrailRegion[] = [
  "Sea to Sky", "Vancouver Island", "Canadian Rockies", "Sunshine Coast", "Lower Mainland",
];

export const kindNames: Record<PreviewTrailKind, string> = {
  day: "Day hike", overnight: "Overnight", multi: "Multi-day",
};

export type PreviewFilters = {
  query?: string;
  kind?: PreviewTrailKind | "all";
  region?: PreviewTrailRegion | "all";
  sort?: "featured" | "alphabetical";
};

function normalized(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

export function filterPreviewTrails(
  entries: readonly PreviewTrail[],
  { query = "", kind = "all", region = "all", sort = "featured" }: PreviewFilters,
): PreviewTrail[] {
  const q = normalized(query);
  const result = entries.filter((entry) => {
    if (kind !== "all" && entry.kind !== kind) return false;
    if (region !== "all" && entry.region !== region) return false;
    return !q || normalized([entry.name, entry.region, entry.park, entry.landscape, entry.description, kindNames[entry.kind]].join(" ")).includes(q);
  });
  return sort === "alphabetical" ? result.sort((a, b) => a.name.localeCompare(b.name)) : result;
}
