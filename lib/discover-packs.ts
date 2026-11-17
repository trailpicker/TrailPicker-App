/** Public gear-build discovery. All filter values are finite, bounded and URL-safe. */
export const PACK_PAGE_SIZE = 12;
export const PACK_CATEGORIES = ["Packs", "Shelter", "Sleep", "Cooking", "Water", "Clothing", "Electronics", "Misc", "Other"] as const;
export type PackSort = "recent" | "updated" | "popular" | "name" | "lightest" | "cheapest";
export type PackFilters = {
  q: string;
  location: string;
  sort: PackSort;
  people: number | null;
  category: string;
  minBaseKg: number | null;
  maxBaseKg: number | null;
  maxCostCad: number | null;
  page: number;
};
type SearchValue = string | string[] | undefined;
const first = (value: SearchValue) => typeof value === "string" ? value : Array.isArray(value) ? value[0] ?? "" : "";
function numeric(value: SearchValue, max: number, integer = false): number | null {
  const raw = first(value).trim();
  if (!raw || !/^(?:\d+)(?:\.\d{1,2})?$/.test(raw)) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 && n <= max && (!integer || Number.isInteger(n)) ? n : null;
}
export function parsePackFilters(raw: Record<string, SearchValue>): PackFilters {
  const requestedSort = first(raw.sort);
  const sort: PackSort = ["updated", "popular", "name", "lightest", "cheapest"].includes(requestedSort) ? requestedSort as PackSort : "recent";
  const category = first(raw.packCategory);
  const people = numeric(raw.packPeople, 20, true);
  const page = numeric(raw.page, 99999, true);
  return {
    q: first(raw.q).trim().slice(0, 100),
    location: first(raw.location).trim().slice(0, 100),
    sort,
    people: people === null || people === 0 ? null : people,
    category: PACK_CATEGORIES.includes(category as typeof PACK_CATEGORIES[number]) ? category : "",
    minBaseKg: numeric(raw.minBaseKg, 50),
    maxBaseKg: numeric(raw.maxBaseKg, 50),
    maxCostCad: numeric(raw.maxCostCad, 100000),
    page: page === null || page < 1 ? 1 : page,
  };
}
export function packBrowseHref(filters: PackFilters, updates: Partial<PackFilters> = {}): string {
  const next = {...filters, ...updates};
  const query = new URLSearchParams({type: "packs"});
  if (next.q) query.set("q",next.q);
  if (next.location) query.set("location",next.location);
  if (next.sort !== "recent") query.set("sort",next.sort);
  if (next.people !== null) query.set("packPeople",String(next.people));
  if (next.category) query.set("packCategory",next.category);
  if (next.minBaseKg !== null) query.set("minBaseKg",String(next.minBaseKg));
  if (next.maxBaseKg !== null) query.set("maxBaseKg",String(next.maxBaseKg));
  if (next.maxCostCad !== null) query.set("maxCostCad",String(next.maxCostCad));
  if (next.page > 1) query.set("page",String(next.page));
  return `/discover/community?${query.toString()}`;
}
export function packHref(id: string): string { return `/discover/packs/${encodeURIComponent(id)}`; }
export type PublicPackItem = {
  quantity: number;
  isWorn: boolean;
  isConsumable: boolean;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  customCategory: string | null;
  gear: { weight_g: number | null; price_cad: number | null; category: {name: string} } | null;
};
export function categoryOf(item: PublicPackItem): string {
  return item.gear?.category.name || item.customCategory || "Other";
}
export function summarizePack(items: readonly PublicPackItem[]) {
  let knownBaseG = 0, knownWornG = 0, knownConsumableG = 0, knownCostCad = 0;
  let unknownBaseCount = 0, unknownWornCount = 0, unknownConsumableCount = 0, unknownCostCount = 0, itemCount = 0;
  const categories = new Map<string, number>();
  for (const item of items) {
    const qty = item.quantity;
    if (!Number.isSafeInteger(qty) || qty <= 0) continue;
    itemCount += qty;
    const category = categoryOf(item);
    categories.set(category, (categories.get(category) ?? 0) + qty);
    const weight = item.gear?.weight_g ?? item.weightSnapshot;
    const price = item.gear?.price_cad ?? item.priceSnapshot;
    if (price === null || !Number.isFinite(price)) unknownCostCount += qty;
    else knownCostCad += price * qty;
    if (item.isWorn) {
      if (weight === null || !Number.isFinite(weight)) unknownWornCount += qty;
      else knownWornG += weight * qty;
    } else if (item.isConsumable) {
      if (weight === null || !Number.isFinite(weight)) unknownConsumableCount += qty;
      else knownConsumableG += weight * qty;
    } else {
      if (weight === null || !Number.isFinite(weight)) unknownBaseCount += qty;
      else knownBaseG += weight * qty;
    }
  }
  return {
    itemCount, categoryCount: categories.size, categories: [...categories.entries()].sort((a,b)=>a[0].localeCompare(b[0])),
    baseWeightG: unknownBaseCount ? null : knownBaseG, knownBaseG, unknownBaseCount,
    wornWeightG: unknownWornCount ? null : knownWornG, knownWornG, unknownWornCount,
    consumableWeightG: unknownConsumableCount ? null : knownConsumableG, knownConsumableG, unknownConsumableCount,
    totalWeightG: unknownBaseCount || unknownWornCount || unknownConsumableCount ? null : knownBaseG+knownWornG+knownConsumableG,
    knownTotalG: knownBaseG+knownWornG+knownConsumableG,
    costCad: unknownCostCount ? null : knownCostCad, knownCostCad, unknownCostCount,
  };
}
export function formattedKg(grams: number) { return `${(grams / 1000).toFixed(2)} kg`; }
export function formattedCad(cad: number) { return new Intl.NumberFormat("en-CA", {style:"currency",currency:"CAD"}).format(cad); }
