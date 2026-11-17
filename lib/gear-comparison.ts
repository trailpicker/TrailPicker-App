import { gearBrowseColumns, gearColumnValue, normalizeGearSpecKey } from "./gear-spec-display";

/** Pure comparison logic shared by the comparison page and its unit tests. */
export type CompareProduct = {
  id: string;
  name: string;
  weight_g: number | null;
  price_cad: number | null;
  capacity_l: number | null;
  frame_type: string | null;
  waterproof: boolean | null;
  temperature_rating: number | null;
  season: string | null;
  material: string | null;
  brand: { name: string };
  category: { id: string; name: string; slug: string };
  subcategory: { name: string; slug: string } | null;
  specifications: Array<{ key: string; value: string; unit: string | null }>;
  prices: Array<{ price: number; currency: string; inStock: boolean }>;
  reviews: Array<{ rating: number }>;
};

export type ComparisonRow = {
  key: string;
  label: string;
  section: "Overview" | "Specifications";
  values: Array<string | null>;
  different: boolean;
  bestIndices: number[];
  bestLabel: string | null;
};

export function parseCompareIds(raw: string | string[] | undefined): string[] {
  const text = Array.isArray(raw) ? raw.join(",") : raw ?? "";
  if (text.length > 1000) return [];
  return [...new Set(text.split(",").map(v => v.trim()).filter(v => v.length > 0 && v.length <= 200))].slice(0, 4);
}

export function comparisonPrice(product: CompareProduct): number | null {
  const valid = product.prices.filter(p => p.currency === "CAD" && p.inStock && Number.isFinite(p.price) && p.price >= 0);
  return valid.length ? Math.min(...valid.map(p => p.price)) : product.price_cad;
}

const normalize = normalizeGearSpecKey;
const readable = (value: string) => value.replace(/[_-]+/g, " ").replace(/\b\w/g, m => m.toUpperCase());

const prioritize: Record<string, string[]> = {
  packs: ["volume", "torso length", "hip belt size", "max load", "recommended load", "dimensions", "back length"],
  shelter: ["sleeping capacity", "floor area", "packed size", "packed dimensions", "peak height", "freestanding", "hydrostatic head"],
  sleep: ["comfort rating", "limit rating", "r value", "r-value", "fill weight", "fill power", "packed size", "dimensions"],
  cooking: ["fuel type", "boil time", "burn time", "output", "pot volume"],
  water: ["filter pore size", "filter life", "flow rate", "capacity", "dimensions"],
};

export function getComparisonRows(products: CompareProduct[]): ComparisonRow[] {
  if (!products.length) return [];
  const rows: ComparisonRow[] = [];
  const text = (key: string, label: string, values: Array<string | null>, section: ComparisonRow["section"] = "Overview") => {
    const present = values.filter((v): v is string => v !== null);
    rows.push({ key, label, values, section, different: new Set(present).size > 1, bestIndices: [], bestLabel: null });
  };
  const numberRow = (key: string, label: string, raw: Array<number | null>, fmt: (n: number) => string, best: "min" | "max" | null = null) => {
    const clean = raw.map(n => n !== null && Number.isFinite(n) ? n : null);
    const values = clean.map(n => n === null ? null : fmt(n));
    const present = clean.filter((n): n is number => n !== null);
    const different = new Set(present).size > 1;
    const value = best && different ? (best === "min" ? Math.min(...present) : Math.max(...present)) : null;
    rows.push({ key, label, values, section: "Overview", different,
      bestIndices: value === null ? [] : clean.flatMap((n, index) => n === value ? [index] : []),
      bestLabel: value === null ? null : best === "min" ? "Lowest" : "Highest",
    });
  };
  text("brand", "Brand", products.map(p => p.brand.name));
  numberRow("price", "Price (CAD)", products.map(comparisonPrice), n => `$${n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, "min");
  numberRow("weight", "Weight", products.map(p => p.weight_g), n => n >= 1000 ? `${(n / 1000).toFixed(2)} kg` : `${n} g`, "min");
  text("category", "Category", products.map(p => p.category.name));
  text("subcategory", "Type", products.map(p => p.subcategory?.name ?? null));
  const commonCategory = products[0]?.category.slug;
  const sameCategory = products.every(p => p.category.slug === commonCategory);
  const sameSubcategory = products.every(p => p.subcategory?.slug === products[0]?.subcategory?.slug);
  const fields = sameCategory ? gearBrowseColumns(commonCategory, sameSubcategory ? products[0]?.subcategory?.slug : null) : [];
  for (const field of fields) {
    if (field.key === "type") continue; // Already shown above as Type.
    const values = products.map(p => gearColumnValue(p, field.key));
    if (!values.some(Boolean)) continue;
    if (field.key === "volume" && commonCategory === "packs") {
      numberRow("capacity", "Pack volume", products.map(p => p.capacity_l), n => `${n} L`, "max");
    } else {
      text(`field:${field.key}`, field.label, values);
    }
  }
  text("rating", "User rating", products.map(p => {
    const ratings = p.reviews.filter(r => Number.isInteger(r.rating) && r.rating >= 1 && r.rating <= 5);
    return ratings.length ? `${(ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)} / 5 (${ratings.length})` : null;
  }));

  const specs = new Map<string, string>();
  for (const p of products) for (const spec of p.specifications) {
    const key = normalize(spec.key);
    if (key && !specs.has(key)) specs.set(key, spec.key.trim() || readable(key));
  }
  const priority = prioritize[products[0]?.category.slug ?? ""] ?? [];
  const shownFields = new Set(fields.filter(field => field.key !== "type").flatMap(field => {
    switch (field.key) {
      case "sleepingCapacity": return ["sleeping capacity", "person capacity", "occupancy", "sleeps"];
      case "rValue": return ["r value", "r-value"];
      case "battery": return ["battery capacity", "battery"];
      case "maxLoad": return ["max load", "maximum load", "load rating", "recommended load"];
      case "fuelType": return ["fuel type"];
      case "flowRate": return ["flow rate"];
      case "treatment": return ["filter type", "filtration type", "treatment method", "purification method"];
      case "packedSize": return ["packed size", "packed dimensions"];
      default: return [field.label];
    }
  }).map(normalize));
  const sorted = [...specs.keys()].sort((a, b) => {
    const ai = priority.indexOf(a), bi = priority.indexOf(b);
    return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) || a.localeCompare(b);
  });
  for (const key of sorted) {
    if (shownFields.has(key) && fields.some(field => products.some(product => gearColumnValue(product, field.key)))) continue;
    const values = products.map(p => {
      const spec = p.specifications.find(s => normalize(s.key) === key);
      if (!spec || !spec.value.trim()) return null;
      return `${spec.value.trim()}${spec.unit?.trim() ? ` ${spec.unit.trim()}` : ""}`;
    });
    if (values.some(v => v !== null)) text(`spec:${key}`, specs.get(key)!, values, "Specifications");
  }
  return rows;
}
