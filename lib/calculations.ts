export function calculateBaseWeight(
  items: {
    quantity: number;
    gear: {
      weight_g: number | null;
    };
  }[]
) {
  return items.reduce((total, item) => {
    return total + (item.gear.weight_g ?? 0) * item.quantity;
  }, 0);
}


export function gramsToPounds(
  grams: number
) {
  return grams / 453.592;
}

export function calculateTotalCost(
  items: {
    quantity: number;
    gear: {
      price_cad: number | null;
    };
  }[]
) {
  return items.reduce((total, item) => {
    return total + (item.gear.price_cad ?? 0) * item.quantity;
  }, 0);
}