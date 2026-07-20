export function calculateBaseWeight(
  items: {
    quantity: number;
    weightSnapshot: number | null;
    gear: {
      weight_g: number | null;
    } | null;
  }[]
) {
  return items.reduce((total, item) => {
    const weight = item.gear?.weight_g ?? item.weightSnapshot ?? 0;
    return total + weight * item.quantity;
  }, 0);
}

export function gramsToPounds(grams: number) {
  return grams / 453.592;
}

export function calculateTotalCost(
  items: {
    quantity: number;
    priceSnapshot: number | null;
    gear: {
      price_cad: number | null;
    } | null;
  }[]
) {
  return items.reduce((total, item) => {
    const price = item.gear?.price_cad ?? item.priceSnapshot ?? 0;
    return total + price * item.quantity;
  }, 0);
}