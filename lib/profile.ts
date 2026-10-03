import { calculateTotalCost, calculateWeightBreakdown } from "@/lib/calculations";

export type ProfileBuild = {
  id: string;
  name: string;
  location: string | null;
  startDate: Date | null;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    quantity: number;
    isConsumable: boolean;
    isWorn: boolean;
    weightSnapshot: number | null;
    priceSnapshot: number | null;
    gear: { weight_g: number | null; price_cad: number | null } | null;
  }>;
};

export function summarizeBuild(build: ProfileBuild) {
  const weight = calculateWeightBreakdown(build.items);
  return { ...weight, cost: calculateTotalCost(build.items), itemCount: build.items.reduce((sum, item) => sum + item.quantity, 0) };
}

export function buildStatus(build: Pick<ProfileBuild, "startDate" | "endDate">) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (build.endDate && build.endDate < today) return "past" as const;
  if (build.startDate && build.startDate >= today) return "upcoming" as const;
  return "undated" as const;
}

export function dateRange(start: Date | null, end: Date | null) {
  if (!start) return "Dates not set";
  const date = (value: Date) => value.toLocaleDateString(undefined, { month: "short", day: "numeric", timeZone: "UTC" });
  return end ? `${date(start)} – ${date(end)}` : date(start);
}

export function weightLabel(grams: number) {
  return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`;
}
