/** Safe, URL-driven filters and display helpers for community discovery. */
export type DiscoverView = "destinations" | "trips" | "packs" | "saved";
/** Grid/Map is a destination-search display choice, not a Discover section. */
export type DestinationDisplay = "grid" | "map";
export type DiscoverSort = "recent" | "updated" | "popular" | "name" | "distance";
export type DiscoverActivity = "all" | "hiking" | "backpacking" | "camping" | "paddling";
export type DiscoverCategory = "all" | "trail" | "lake" | "summit" | "waterfall" | "campground" | "coastal" | "viewpoint" | "other";
export type DiscoverSearch = {
  view: DiscoverView;
  display: DestinationDisplay;
  sort: DiscoverSort;
  q: string;
  location: string;
  region: string;
  difficulty: "all" | "easy" | "moderate" | "hard";
  activity: DiscoverActivity;
  category: DiscoverCategory;
  page: number;
};
export type SearchValue = string | string[] | undefined;
export type SearchInput = Record<string, SearchValue>;
function first(value: SearchValue): string {
  return typeof value === "string" ? value : Array.isArray(value) ? value[0] ?? "" : "";
}
const activities: readonly DiscoverActivity[] = ["all", "hiking", "backpacking", "camping", "paddling"];
const categories: readonly DiscoverCategory[] = ["all", "trail", "lake", "summit", "waterfall", "campground", "coastal", "viewpoint", "other"];
export function parseDiscoverSearch(raw: SearchInput): DiscoverSearch {
  const view = first(raw.view), sort = first(raw.sort), difficulty = first(raw.difficulty), pageRaw = first(raw.page);
  const pageNumber = Number(pageRaw);
  const normalizedView: DiscoverView = view === "packs" || view === "saved" || view === "trips" ? view : "destinations";
  const normalizedSort: DiscoverSort = normalizedView === "destinations"
    ? sort === "distance" || sort === "name" ? sort : "popular"
    : sort === "updated" || sort === "popular" || sort === "name" ? sort : "recent";
  const activity = first(raw.activity) as DiscoverActivity;
  const category = first(raw.category) as DiscoverCategory;
  return {
    view: normalizedView, display: normalizedView === "destinations" && first(raw.display) === "map" ? "map" : "grid", sort: normalizedSort,
    q: first(raw.q).trim().slice(0, 100), location: first(raw.location).trim().slice(0, 100),
    region: first(raw.region).trim().slice(0, 100),
    difficulty: difficulty === "easy" || difficulty === "moderate" || difficulty === "hard" ? difficulty : "all",
    activity: activities.includes(activity) ? activity : "all",
    category: categories.includes(category) ? category : "all",
    page: /^\d{1,5}$/.test(pageRaw) && Number.isSafeInteger(pageNumber) && pageNumber >= 1 ? pageNumber : 1,
  };
}
export function discoverUrl(
  current: Pick<DiscoverSearch, "view" | "sort" | "q" | "location" | "region" | "difficulty"> & Partial<Pick<DiscoverSearch,"activity" | "category" | "display">>,
  updates: Partial<DiscoverSearch> = {},
): string {
  const next = { activity: "all" as DiscoverActivity, category: "all" as DiscoverCategory, ...current, ...updates };
  const query = new URLSearchParams();
  const route = next.view === "destinations" ? "/discover/search" : next.view === "saved" ? "/discover/saved" : "/discover/community";
  if (next.view === "packs") query.set("type", "packs");
  if (next.view === "destinations" && next.display === "map") query.set("display", "map");
  if (next.sort !== "recent") query.set("sort", next.sort);
  if (next.q) query.set("q", next.q);
  if (next.location) query.set("location", next.location);
  if (next.region) query.set("region", next.region);
  if (next.difficulty && next.difficulty !== "all") query.set("difficulty", next.difficulty);
  if (next.activity && next.activity !== "all") query.set("activity", next.activity);
  if (next.category && next.category !== "all") query.set("category", next.category);
  if (next.page && next.page > 1) query.set("page", String(next.page));
  return route + (query.toString() ? `?${query.toString()}` : "");
}
export function summarizePublicBuild(
  items: readonly { quantity: number; isWorn: boolean; isConsumable: boolean; weightSnapshot: number | null; gear: { weight_g: number | null } | null }[],
  days: readonly { distanceKm: number | null; elevationGainM: number | null }[],
) {
  let baseWeightG = 0, unknownBaseWeights = 0, itemCount = 0;
  for (const item of items) {
    itemCount += item.quantity;
    if (item.isWorn || item.isConsumable) continue;
    const grams = item.gear?.weight_g ?? item.weightSnapshot;
    if (grams == null) unknownBaseWeights += item.quantity;
    else baseWeightG += grams * item.quantity;
  }
  const distanceDays = days.filter(day => day.distanceKm != null), elevationDays = days.filter(day => day.elevationGainM != null);
  return {
    itemCount, baseWeightG: unknownBaseWeights === 0 ? baseWeightG : null, unknownBaseWeights,
    dayCount: days.length,
    distanceKm: distanceDays.length ? distanceDays.reduce((n, day) => n + (day.distanceKm ?? 0), 0) : null,
    elevationGainM: elevationDays.length ? elevationDays.reduce((n, day) => n + (day.elevationGainM ?? 0), 0) : null,
    partialDistance: distanceDays.length > 0 && distanceDays.length < days.length,
  };
}
export type DiscoverDestination = {
  id: string; name: string; park: string; region: string;
  difficulty: "easy" | "moderate" | "hard";
  distanceKm: number | null; elevationGainM: number | null;
  featured: boolean; summary: string;
  kind?: string; activities?: readonly string[];
};
/** Only curated entries are searched; unknown attributes are not inferred. */
export function filterDiscoverDestinations<T extends DiscoverDestination>(
  destinations: readonly T[],
  filters: Pick<DiscoverSearch, "q" | "region" | "difficulty" | "sort"> & Partial<Pick<DiscoverSearch, "activity" | "category">>,
): T[] {
  const q = filters.q.trim().toLocaleLowerCase();
  const matching = destinations.filter(destination => {
    const kind = destination.kind ?? "campground"; // Backward compatible with the original 76-site catalog.
    const category = filters.category ?? "all";
    const categoryMatch = category === "all" || (category === "other" ? !["trail","lake","summit","waterfall","campground","coastal","viewpoint"].includes(kind) : kind === category);
    const activity = filters.activity ?? "all";
    const activityMatch = activity === "all" || (destination.activities?.includes(activity) ?? (kind === "campground" && ["backpacking", "camping"].includes(activity)));
    return (!filters.region || destination.region === filters.region) &&
      (filters.difficulty === "all" || destination.difficulty === filters.difficulty) &&
      categoryMatch && activityMatch &&
      (!q || [destination.name, destination.park, destination.region, destination.summary, kind]
        .some(value => value.toLocaleLowerCase().includes(q)));
  });
  return matching.sort((a, b) => {
    if (filters.sort === "name") return a.name.localeCompare(b.name);
    if (filters.sort === "distance") return (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity) || a.name.localeCompare(b.name);
    return Number(b.featured) - Number(a.featured) || Number(a.kind === "campground") - Number(b.kind === "campground") || a.name.localeCompare(b.name);
  });
}

/** The spotlight is a separate section, never duplicated in the paginated cards. */
export const SPOTLIGHT_IDS = ["garibaldi-lake-destination", "upper-joffre-lake", "berg-lake-trail"] as const;
export function isUnfilteredDestinationSearch(filters: Pick<DiscoverSearch,"q" | "region" | "difficulty" | "activity" | "category" | "sort">): boolean {
  return !filters.q && !filters.region && filters.difficulty === "all" && filters.activity === "all" && filters.category === "all" && filters.sort === "popular";
}

