/** Pure, read-only analytics for the existing TrailPicker BuildItem data model.
 * Monetary values are CAD. All item weights are grams. Unknown is never treated as zero.
 */
export type PackInputItem = {
  id: string;
  quantity: number;
  isWorn: boolean;
  isConsumable: boolean;
  customCategory: string | null;
  gearNameSnapshot: string | null;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  gear: {
    name: string;
    weight_g: number | null;
    price_cad: number | null;
    category: { name: string };
  } | null;
};

export type WeightClass = "base" | "worn" | "consumable";

export type PackLine = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  weightClass: WeightClass;
  gramsEach: number | null;
  grams: number | null;
  priceEachCad: number | null;
  priceCad: number | null;
};

export type PackCategory = {
  name: string;
  baseGrams: number;
  wornGrams: number;
  consumableGrams: number;
  knownGrams: number;
  count: number;
  unknownWeightCount: number;
};

export type PackAnalysis = {
  lines: PackLine[];
  categories: PackCategory[];
  baseGrams: number;
  wornGrams: number;
  consumableGrams: number;
  carriedGrams: number;
  totalGrams: number;
  knownCostCad: number;
  totalUnits: number;
  knownWeightUnits: number;
  unknownWeightUnits: number;
  unknownPriceUnits: number;
  heaviest: PackLine[];
};

function knownNumber(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

export function analyzePack(items: readonly PackInputItem[]): PackAnalysis {
  const lines: PackLine[] = items.map(item => {
    const quantity = Number.isSafeInteger(item.quantity) && item.quantity > 0 ? item.quantity : 0;
    // Match the Builder's displayed value precedence (catalog, then saved snapshot).
    const gramsEach = knownNumber(item.gear?.weight_g ?? item.weightSnapshot);
    const priceEachCad = knownNumber(item.gear?.price_cad ?? item.priceSnapshot);
    const category = (item.gear?.category.name || item.customCategory || "Other").trim() || "Other";
    const name = (item.gear?.name || item.gearNameSnapshot || "Custom item").trim() || "Custom item";
    // Same precedence as calculateWeightBreakdown: worn takes priority if both flags are true.
    const weightClass: WeightClass = item.isWorn ? "worn" : item.isConsumable ? "consumable" : "base";
    return {
      id: item.id,
      name,
      category,
      quantity,
      weightClass,
      gramsEach,
      grams: gramsEach === null ? null : gramsEach * quantity,
      priceEachCad,
      priceCad: priceEachCad === null ? null : priceEachCad * quantity,
    };
  });

  let baseGrams = 0;
  let wornGrams = 0;
  let consumableGrams = 0;
  let knownCostCad = 0;
  let totalUnits = 0;
  let knownWeightUnits = 0;
  let unknownWeightUnits = 0;
  let unknownPriceUnits = 0;
  const categoryMap = new Map<string, PackCategory>();

  for (const line of lines) {
    totalUnits += line.quantity;
    if (line.grams === null) unknownWeightUnits += line.quantity;
    else knownWeightUnits += line.quantity;
    if (line.priceCad === null) unknownPriceUnits += line.quantity;
    else knownCostCad += line.priceCad;

    const category = categoryMap.get(line.category) ?? {
      name: line.category, baseGrams: 0, wornGrams: 0, consumableGrams: 0,
      knownGrams: 0, count: 0, unknownWeightCount: 0,
    };
    category.count += line.quantity;
    if (line.grams === null) category.unknownWeightCount += line.quantity;
    else {
      category.knownGrams += line.grams;
      if (line.weightClass === "base") { baseGrams += line.grams; category.baseGrams += line.grams; }
      else if (line.weightClass === "worn") { wornGrams += line.grams; category.wornGrams += line.grams; }
      else { consumableGrams += line.grams; category.consumableGrams += line.grams; }
    }
    categoryMap.set(line.category, category);
  }

  return {
    lines,
    categories: [...categoryMap.values()].sort((a, b) => b.knownGrams - a.knownGrams || a.name.localeCompare(b.name)),
    baseGrams,
    wornGrams,
    consumableGrams,
    carriedGrams: baseGrams + consumableGrams,
    totalGrams: baseGrams + consumableGrams + wornGrams,
    knownCostCad,
    totalUnits,
    knownWeightUnits,
    unknownWeightUnits,
    unknownPriceUnits,
    heaviest: lines.filter(line => line.grams !== null && line.grams > 0)
      .sort((a, b) => (b.grams ?? 0) - (a.grams ?? 0) || a.name.localeCompare(b.name))
      .slice(0, 5),
  };
}

/** A planning-only comparison: never writes or deletes gear. */
export function simulateExclusions(analysis: PackAnalysis, excludedIds: ReadonlySet<string>) {
  const excluded = analysis.lines.filter(line => excludedIds.has(line.id));
  const knownSavedBase = excluded.filter(line => line.weightClass === "base").reduce((sum, line) => sum + (line.grams ?? 0), 0);
  const knownSavedConsumable = excluded.filter(line => line.weightClass === "consumable").reduce((sum, line) => sum + (line.grams ?? 0), 0);
  const knownSavedWorn = excluded.filter(line => line.weightClass === "worn").reduce((sum, line) => sum + (line.grams ?? 0), 0);
  const knownSavedCost = excluded.reduce((sum, line) => sum + (line.priceCad ?? 0), 0);
  return {
    removedCount: excluded.reduce((count, line) => count + line.quantity, 0),
    missingWeightCount: excluded.filter(line => line.grams === null).reduce((count, line) => count + line.quantity, 0),
    knownSavedBase,
    knownSavedConsumable,
    knownSavedWorn,
    knownSavedCarried: knownSavedBase + knownSavedConsumable,
    knownSavedTotal: knownSavedBase + knownSavedConsumable + knownSavedWorn,
    knownSavedCost,
    remainingBase: analysis.baseGrams - knownSavedBase,
    remainingCarried: analysis.carriedGrams - knownSavedBase - knownSavedConsumable,
    remainingTotal: analysis.totalGrams - knownSavedBase - knownSavedConsumable - knownSavedWorn,
  };
}
