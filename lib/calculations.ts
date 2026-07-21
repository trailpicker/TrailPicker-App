type CalcItem = {
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  gear: {
    weight_g: number | null;
    price_cad: number | null;
  } | null;
};

function itemWeight(item: CalcItem) {
  const grams = item.gear?.weight_g ?? item.weightSnapshot ?? 0;
  return grams * item.quantity;
}

function itemPrice(item: CalcItem) {
  const price = item.gear?.price_cad ?? item.priceSnapshot ?? 0;
  return price * item.quantity;
}

export function calculateWeightBreakdown(items: CalcItem[]) {
  let base = 0;
  let consumable = 0;
  let worn = 0;

  for (const item of items) {
    const weight = itemWeight(item);

    if (item.isWorn) {
      worn += weight;
    } else if (item.isConsumable) {
      consumable += weight;
    } else {
      base += weight;
    }
  }

  return {
    base,
    consumable,
    worn,
    total: base + consumable + worn,
  };
}

export function gramsToPounds(grams: number) {
  return grams / 453.592;
}

export function calculateTotalCost(items: CalcItem[]) {
  return items.reduce((total, item) => total + itemPrice(item), 0);
}