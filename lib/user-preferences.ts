/** Display-only preferences; calculations and stored trip values remain metric. */
export type WeightUnit = "metric" | "imperial";
export type DistanceUnit = "metric" | "imperial";
export type TemperatureUnit = "c" | "f";

export type DisplayPreferences = {
  weightUnit: WeightUnit;
  distanceUnit: DistanceUnit;
  temperatureUnit: TemperatureUnit;
};

export type UserPreferences = DisplayPreferences & {
  defaultBuildPublic: boolean;
};

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  weightUnit: "metric",
  distanceUnit: "metric",
  temperatureUnit: "c",
  defaultBuildPublic: false,
};

export function preferencesFromRow(row: Partial<UserPreferences> | null | undefined): UserPreferences {
  return {
    weightUnit: row?.weightUnit === "imperial" ? "imperial" : "metric",
    distanceUnit: row?.distanceUnit === "imperial" ? "imperial" : "metric",
    temperatureUnit: row?.temperatureUnit === "f" ? "f" : "c",
    defaultBuildPublic: row?.defaultBuildPublic === true,
  };
}

export function weightText(grams: number | null | undefined, unit: WeightUnit = "metric"): string {
  if (grams == null || !Number.isFinite(grams)) return "—";
  if (unit === "imperial") {
    const ounces = grams / 28.349523125;
    return ounces >= 16 ? `${(ounces / 16).toFixed(2)} lb` : `${ounces.toFixed(1)} oz`;
  }
  return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${Math.round(grams)} g`;
}

export function distanceText(km: number | null | undefined, unit: DistanceUnit = "metric"): string {
  if (km == null || !Number.isFinite(km)) return "—";
  return unit === "imperial" ? `${(km * 0.6213711922).toFixed(1)} mi` : `${km.toFixed(1)} km`;
}

export function temperatureNumber(celsius: number | null | undefined, unit: TemperatureUnit = "c") {
  return celsius == null || !Number.isFinite(celsius) ? null : unit === "f" ? celsius * 9 / 5 + 32 : celsius;
}

export function temperatureText(celsius: number | null | undefined, unit: TemperatureUnit = "c"): string {
  const value = temperatureNumber(celsius, unit);
  return value == null ? "—" : `${Math.round(value)}°${unit === "f" ? "F" : "C"}`;
}

export function windText(kmh: number | null | undefined, unit: DistanceUnit = "metric") {
  if (kmh == null || !Number.isFinite(kmh)) return "—";
  return unit === "imperial" ? `${Math.round(kmh * 0.6213711922)} mph` : `${Math.round(kmh)} km/h`;
}
