/** Unified Saved library representation. A trip and a gear list may refer to the same Build. */
export type SavedKind = "destination" | "trip" | "pack";
export type SavedType = "all" | "destinations" | "trips" | "packs";
export type SavedEntry = {
  id: string;
  kind: SavedKind;
  name: string;
  subtitle: string;
  savedAt: string;
  hasDays?: boolean;
  hasItems?: boolean;
  available: boolean;
};
export type SavedSearch = { type: SavedType; q: string; page: number };
export type SearchFields = Record<string, string | string[] | undefined>;
function first(value: string | string[] | undefined) {
  return typeof value === "string" ? value : Array.isArray(value) ? value[0] ?? "" : "";
}
export function parseSavedSearch(raw: SearchFields): SavedSearch {
  const selected = first(raw.savedType);
  const type: SavedType = selected === "destinations" || selected === "trips" || selected === "packs" ? selected : "all";
  const pageText = first(raw.page);
  const page = /^\d{1,5}$/.test(pageText) && Number(pageText) >= 1 ? Number(pageText) : 1;
  return { type, q: first(raw.q).trim().slice(0, 100), page };
}
export function savedHref(item: SavedEntry, type: SavedType = "all"): string | null {
  if (!item.available) return null;
  const id = encodeURIComponent(item.id);
  if (item.kind === "destination") return `/discover/destinations/${id}`;
  // Both the trip and the gear browser can bookmark the same public Build.
  if (type === "packs" && item.hasItems) return `/discover/packs/${id}`;
  if (type === "trips" && item.hasDays) return `/discover/trips/${id}`;
  return item.hasDays ? `/discover/trips/${id}` : item.hasItems ? `/discover/packs/${id}` : null;
}
export function matchesSavedType(item: SavedEntry, type: SavedType): boolean {
  if (type === "all") return true;
  if (type === "destinations") return item.kind === "destination";
  if (type === "trips") return item.kind !== "destination" && !!item.hasDays;
  return item.kind !== "destination" && !!item.hasItems;
}
export function filterSavedEntries(entries: readonly SavedEntry[], search: SavedSearch): SavedEntry[] {
  const q = search.q.toLocaleLowerCase();
  return entries.filter(item => matchesSavedType(item, search.type) &&
    (!q || `${item.name} ${item.subtitle}`.toLocaleLowerCase().includes(q)))
    .sort((a,b) => b.savedAt.localeCompare(a.savedAt) || a.id.localeCompare(b.id));
}
export function savedUrl(type: SavedType, q = "", page = 1): string {
  const params = new URLSearchParams();
  if (type !== "all") params.set("savedType", type);
  if (q) params.set("q", q);
  if (page > 1) params.set("page", String(page));
  return `/discover/saved${params.toString() ? `?${params.toString()}` : ""}`;
}
