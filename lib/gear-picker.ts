export type PickerSearch = Record<string, string | string[] | undefined>;

export function pickerValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export function pickerLimit(value: string | string[] | undefined): number | undefined {
  const text = pickerValue(value).trim();
  if (!text) return undefined;
  const number = Number(text);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

export function pickerWeight(value: string | string[] | undefined): number | undefined {
  const limit = pickerLimit(value);
  // Prisma Int filters cannot accept fractions or numbers beyond signed 32-bit.
  return limit === undefined ? undefined : Math.min(Math.floor(limit), 2147483647);
}

export function pickerHref(path: string, filters: PickerSearch, subcategory: string): string {
  const query = new URLSearchParams();
  for (const key of ["q", "brand", "maxWeight", "maxPrice", "sort", "direction"]) {
    const values = filters[key];
    for (const value of Array.isArray(values) ? values : [values]) {
      if (value) query.append(key, value);
    }
  }
  if (subcategory) query.set("subcategory", subcategory);
  return query.size ? `${path}?${query}` : path;
}
