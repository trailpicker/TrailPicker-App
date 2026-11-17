/** Stable Discover routes and backwards-compatible links for the previous ?view= pages. */
export type DiscoverLegacyView = "destinations" | "trips" | "packs" | "saved";
export type UrlValues = Record<string, string | string[] | undefined>;
const allowed = new Set([
  "q", "location", "region", "sort", "difficulty", "activity", "category", "page", "feature",
  "packCategory", "packPeople", "minBaseKg", "maxBaseKg", "maxCostCad", "savedType",
]);
export function legacyDiscoverDestination(raw: UrlValues): string | null {
  const view = Array.isArray(raw.view) ? raw.view[0] : raw.view;
  let route: string;
  switch (view) {
    case "destinations": route = "/discover/search"; break;
    case "trips": route = "/discover/community"; break;
    case "packs": route = "/discover/community"; break;
    case "saved": route = "/discover/saved"; break;
    default:
      // Old site links sometimes used /discover?q=… for destination searches.
      route = raw.q || raw.region || raw.activity || raw.category ? "/discover/search" : "";
  }
  if (!route) return null;
  const params = new URLSearchParams();
  if (view === "packs") params.set("type", "packs");
  for (const [key, value] of Object.entries(raw)) {
    if (!allowed.has(key)) continue;
    const first = typeof value === "string" ? value : value?.[0];
    if (first && first.length <= 120) params.set(key, first);
  }
  const query = params.toString();
  return route + (query ? `?${query}` : "");
}
