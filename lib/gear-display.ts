export function safeGearUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : null; } catch { return null; }
}

export function gearMoney(value: number | null | undefined, currency = "CAD") {
  if (value == null || !Number.isFinite(value)) return "Price unavailable";
  try { return `${new Intl.NumberFormat("en-CA", { style: "currency", currency }).format(value)} ${currency}`; }
  catch { return `${value.toFixed(2)} ${currency}`; }
}

export function gearWeight(value: number | null | undefined) {
  return value == null ? "Weight unavailable" : value >= 1000 ? `${(value / 1000).toFixed(2)} kg` : `${value} g`;
}

export function reviewStats(reviews: Array<{ rating: number }>) {
  const valid = reviews.filter(review => Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5);
  const count = valid.length;
  return { count, average: count ? valid.reduce((sum, review) => sum + review.rating, 0) / count : 0, buckets: [5, 4, 3, 2, 1].map(rating => ({ rating, count: valid.filter(review => review.rating === rating).length })) };
}
