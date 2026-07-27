export type CompatibilitySeverity = "warning" | "info";

export type CompatibilityIssue = {
  severity: CompatibilitySeverity;
  category: string;
  message: string;
};

type CompatItem = {
  customCategory: string | null;
  gearNameSnapshot: string | null;
  gear: {
    name: string;
    capacity_l: number | null;
    temperature_rating: number | null;
    season: string | null;
    waterproof: boolean | null;
    category: { name: string };
  } | null;
};

type CompatDay = {
  minTemperature: number | null;
  conditions: string | null;
};

type CompatBuild = {
  people: number;
  minTemperature: number | null;
  conditions: string | null;
  items: CompatItem[];
  days?: CompatDay[];
};

const REQUIRED_CATEGORIES = ["Shelter", "Sleep", "Water", "Cooking"];

export function getCompatibilityIssues(build: CompatBuild): CompatibilityIssue[] {
  const issues: CompatibilityIssue[] = [];

  const inCategory = (name: string) =>
    build.items.filter(
      (item) => item.gear?.category.name === name || item.customCategory === name
    );

  // Roll the coldest night (per-day override or trip-level fallback) into one number
  const dayTemps = (build.days ?? [])
    .map((d) => d.minTemperature)
    .filter((t): t is number => t != null);
  const allTemps = build.minTemperature != null ? [build.minTemperature, ...dayTemps] : dayTemps;
  const effectiveMinTemp = allTemps.length > 0 ? Math.min(...allTemps) : null;

  // Any day flagged rain/snow counts, in addition to the trip-level setting
  const effectiveConditions = new Set(
    [build.conditions, ...(build.days ?? []).map((d) => d.conditions)].filter(
      (c): c is string => !!c
    )
  );

  for (const category of REQUIRED_CATEGORIES) {
    if (inCategory(category).length === 0) {
      issues.push({
        severity: "info",
        category,
        message: `No ${category.toLowerCase()} selected yet.`,
      });
    }
  }

  if (effectiveMinTemp !== null) {
    for (const item of inCategory("Sleep")) {
      const rating = item.gear?.temperature_rating;
      if (rating != null && rating > effectiveMinTemp) {
        issues.push({
          severity: "warning",
          category: "Sleep",
          message: `${item.gear!.name} is rated to ${rating}°C — colder than the coldest expected night (${effectiveMinTemp}°C).`,
        });
      }
    }
  }

  if (effectiveConditions.has("snow")) {
    for (const item of [...inCategory("Shelter"), ...inCategory("Sleep")]) {
      if (item.gear?.season && item.gear.season !== "4-season") {
        issues.push({
          severity: "warning",
          category: item.gear.category.name,
          message: `${item.gear.name} is rated ${item.gear.season}, but the trip expects snow.`,
        });
      }
    }
  }

  if (effectiveConditions.has("rain")) {
    for (const item of [...inCategory("Shelter"), ...inCategory("Packs")]) {
      if (item.gear?.waterproof === false) {
        issues.push({
          severity: "warning",
          category: item.gear.category.name,
          message: `${item.gear.name} isn't waterproof, and the trip expects rain.`,
        });
      }
    }
  }

  for (const item of inCategory("Shelter")) {
    if (item.gear?.capacity_l != null && item.gear.capacity_l < build.people) {
      issues.push({
        severity: "warning",
        category: "Shelter",
        message: `${item.gear.name} sleeps ${item.gear.capacity_l}, but the trip has ${build.people} ${build.people === 1 ? "person" : "people"}.`,
      });
    }
  }

  return issues;
}