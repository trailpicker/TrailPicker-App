/** Category-aware presentation for the catalog, comparison and product detail pages.
 * Missing information stays unknown; never infer tent occupancy from capacity_l.
 */
export type GearSpec = { key: string; value: string; unit?: string | null };
export type GearDisplayInput = {
  category: { slug: string };
  subcategory?: { slug: string } | null;
  weight_g?: number | null;
  capacity_l?: number | null;
  frame_type?: string | null;
  waterproof?: boolean | null;
  temperature_rating?: number | null;
  season?: string | null;
  material?: string | null;
  specifications: GearSpec[];
};
export type GearColumnKey =
  | "type" | "volume" | "sleepingCapacity" | "frame" | "maxLoad" | "season"
  | "waterproof" | "dimensions" | "material" | "temperature" | "rValue"
  | "fill" | "fuelType" | "output" | "flowRate" | "treatment"
  | "battery" | "runtime" | "packedSize";
export type GearColumn = { key: GearColumnKey; label: string };
const columns = (...pairs: Array<[GearColumnKey, string]>): GearColumn[] =>
  pairs.map(([key, label]) => ({ key, label }));
const type = ["type", "Type"] as [GearColumnKey, string];
const season = ["season", "Season"] as [GearColumnKey, string];
const volume = ["volume", "Volume"] as [GearColumnKey, string];
const material = ["material", "Material"] as [GearColumnKey, string];
const waterproof = ["waterproof", "Waterproof"] as [GearColumnKey, string];

export function gearBrowseColumns(category: string, subcategory?: string | null): GearColumn[] {
  const cat = category.toLowerCase();
  const sub = (subcategory || "").toLowerCase();
  switch (cat) {
    case "packs": return columns(volume, ["frame", "Frame"], ["maxLoad", "Load rating"]);
    case "shelter":
      if (sub === "tarp") return columns(["dimensions", "Dimensions"], material, waterproof);
      return columns(["sleepingCapacity", "Sleeps"], season, waterproof);
    case "sleep":
      if (sub === "sleeping-pad") return columns(["rValue", "R-value"], ["packedSize", "Packed size"], material);
      if (sub === "sleeping-bag" || sub === "quilt") return columns(["temperature", "Temperature"], ["fill", "Fill"], season);
      return columns(type, ["temperature", "Temperature"], ["rValue", "R-value"]);
    case "cooking":
      if (sub === "stove") return columns(["fuelType", "Fuel type"], ["output", "Output"], ["packedSize", "Packed size"]);
      if (sub === "cookware") return columns(volume, material, ["dimensions", "Dimensions"]);
      if (sub === "fuel") return columns(["fuelType", "Fuel type"], ["volume", "Volume"], ["packedSize", "Packed size"]);
      return columns(type, volume, ["fuelType", "Fuel type"]);
    case "water":
      if (sub === "filter") return columns(["treatment", "Filter type"], ["flowRate", "Flow rate"], ["packedSize", "Packed size"]);
      if (sub === "bottle" || sub === "reservoir") return columns(volume, material, ["packedSize", "Packed size"]);
      if (sub === "purification") return columns(["treatment", "Method"], ["packedSize", "Packed size"], material);
      return columns(type, volume, ["flowRate", "Flow rate"]);
    case "clothing": return columns(type, waterproof, material);
    case "electronics":
      if (sub === "power-bank") return columns(["battery", "Battery"], ["output", "Output"], ["packedSize", "Packed size"]);
      if (sub === "headlamp") return columns(["runtime", "Runtime"], ["battery", "Battery"], waterproof);
      return columns(type, ["battery", "Battery"], ["runtime", "Runtime"]);
    case "misc": return columns(type, material, waterproof);
    default: return columns(type, material, ["packedSize", "Packed size"]);
  }
}


/** Prefer known category-specific information over an entirely empty column.
 * No data is invented; the original header is retained when no alternative exists.
 */
export function gearBrowseColumnsForItems(category: string, subcategory: string | null | undefined, items: GearDisplayInput[]): GearColumn[] {
  const recommended = gearBrowseColumns(category, subcategory);
  if (!items.length) return recommended;
  const extras: Record<string, GearColumn[]> = {
    packs: columns(material, waterproof, season),
    shelter: columns(material, ["dimensions", "Dimensions"], type),
    sleep: columns(material, season, ["fill", "Fill"], type),
    cooking: columns(material, type, ["packedSize", "Packed size"]),
    water: columns(material, type, ["treatment", "Filter type"]),
    clothing: columns(season, material, type),
    electronics: columns(material, waterproof, type),
    misc: columns(volume, season, type),
  };
  const candidates = extras[category.toLowerCase()] ?? columns(material, type);
  const used = new Set<GearColumnKey>(recommended.map(col => col.key));
  return recommended.map(column => {
    if (items.some(item => gearColumnValue(item, column.key) !== null)) return column;
    const fallback = candidates.find(alt => !used.has(alt.key) &&
      items.some(item => gearColumnValue(item, alt.key) !== null));
    if (!fallback) return column;
    used.add(fallback.key);
    return fallback;
  });
}

export const normalizeGearSpecKey = (key: string) =>
  key.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
const aliases: Partial<Record<GearColumnKey, string[]>> = {
  sleepingCapacity: ["sleeping capacity", "person capacity", "capacity persons", "occupancy", "sleeps"],
  maxLoad: ["max load", "maximum load", "recommended load", "load rating", "load capacity"],
  rValue: ["r value", "r-value", "insulation r value"],
  fill: ["fill type", "insulation type", "fill material", "fill power"],
  fuelType: ["fuel type", "fuel"],
  output: ["output", "power output", "charging output", "burner output"],
  flowRate: ["flow rate", "filter flow rate"],
  treatment: ["filter type", "filtration type", "treatment method", "purification method"],
  battery: ["battery capacity", "battery", "power capacity"],
  runtime: ["runtime", "run time", "battery life"],
  packedSize: ["packed size", "packed dimensions"],
  dimensions: ["dimensions", "floor dimensions", "floor area", "size"],
  material: ["material", "fabric"],
};
export function gearSpecValue(specifications: GearSpec[], keys: string[]): string | null {
  const allowed = new Set(keys.map(normalizeGearSpecKey));
  const spec = specifications.find(s => allowed.has(normalizeGearSpecKey(s.key)) && s.value.trim());
  if (!spec) return null;
  const value = spec.value.trim();
  const unit = spec.unit?.trim() ?? "";
  return unit && !value.toLowerCase().endsWith(` ${unit.toLowerCase()}`) ? `${value} ${unit}` : value;
}
function validVolume(item: GearDisplayInput): boolean {
  const cat = item.category.slug.toLowerCase();
  const sub = item.subcategory?.slug.toLowerCase();
  return cat === "packs" || (cat === "water" && (sub === "bottle" || sub === "reservoir"))
    || (cat === "cooking" && sub === "cookware")
    || (cat === "misc" && sub === "camp-accessories");
}
export function gearColumnValue(item: GearDisplayInput, key: GearColumnKey): string | null {
  switch (key) {
    case "type": return item.subcategory?.slug ? item.subcategory.slug.replace(/-/g, " ").replace(/\b\w/g, ch => ch.toUpperCase()) : null;
    case "volume": return validVolume(item) && item.capacity_l !== null && item.capacity_l !== undefined && item.capacity_l >= 0
      ? `${item.capacity_l} L` : null;
    case "frame": return item.category.slug === "packs" ? item.frame_type?.trim() || null : null;
    case "waterproof": return item.waterproof === null || item.waterproof === undefined ? null : item.waterproof ? "Yes" : "No";
    case "temperature": return item.category.slug === "sleep" && item.subcategory?.slug !== "sleeping-pad"
      && item.temperature_rating !== null && item.temperature_rating !== undefined ? `${item.temperature_rating} °C` : null;
    case "season": return item.season?.trim() || null;
    case "material": return item.material?.trim() || gearSpecValue(item.specifications, aliases.material!) || null;
    case "sleepingCapacity": {
      if (item.category.slug !== "shelter") return null;
      const raw = gearSpecValue(item.specifications, aliases.sleepingCapacity!);
      if (!raw) return null;
      const match = raw.match(/^(\d+)\s*(?:people|persons?)?$/i);
      return match && Number(match[1]) > 0 ? `${Number(match[1])} ${Number(match[1]) === 1 ? "person" : "people"}` : raw;
    }
    default: return gearSpecValue(item.specifications, aliases[key] || [key]);
  }
}
/** Product specifications without irrelevant fields and without duplicates. */
export function gearDetailRows(item: GearDisplayInput): Array<[string, string]> {
  const rows: Array<[string, string]> = [];
  const seen = new Set<string>();
  const add = (label: string, value: string | null, keys: string[] = [label]) => {
    if (!value) return;
    rows.push([label, value]);
    for (const key of keys) seen.add(normalizeGearSpecKey(key));
  };
  if (item.weight_g !== null && item.weight_g !== undefined) add("Weight", item.weight_g >= 1000 ? `${(item.weight_g / 1000).toFixed(2)} kg` : `${item.weight_g} g`);
  const config = gearBrowseColumns(item.category.slug, item.subcategory?.slug);
  for (const column of config) add(column.label, gearColumnValue(item, column.key), aliases[column.key] || [column.label]);
  const extraFields: Array<[GearColumnKey, string]> = [
    ["volume", "Volume"], ["sleepingCapacity", "Sleeping capacity"], ["frame", "Frame"],
    ["temperature", "Temperature rating"], ["rValue", "R-value"], ["season", "Season"],
    ["waterproof", "Waterproof"], ["material", "Material"], ["battery", "Battery"],
  ];
  for (const [key, label] of extraFields) {
    if (config.some(c => c.key === key)) continue;
    const value = gearColumnValue(item, key);
    if (value) add(label, value, aliases[key] || [label]);
  }
  for (const spec of item.specifications) {
    const key = normalizeGearSpecKey(spec.key);
    if (!key || seen.has(key) || !spec.value.trim()) continue;
    add(spec.key.trim(), `${spec.value.trim()}${spec.unit?.trim() ? ` ${spec.unit.trim()}` : ""}`);
  }
  return rows;
}
