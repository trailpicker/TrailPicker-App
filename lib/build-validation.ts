import { emptyLogistics, nullableNumber, parseDates, type Logistics } from "./trip-planner";

export const MAX_GEAR_QUANTITY = 999;

export function formText(form: FormData, key: string, max: number, required = false): string | null {
  const value = form.get(key);
  if (value !== null && typeof value !== "string") throw new Error(`Invalid ${key}.`);
  const text = (value ?? "").trim();
  if (text.length > max || (required && !text)) throw new Error(`${key} must be ${required ? `1–${max}` : `at most ${max}`} characters.`);
  return text || null;
}

export function formNumber(form: FormData, key: string, min: number, max: number, integer = false) {
  return nullableNumber(form.get(key), key, min, max, integer);
}

export function validCondition(value: string | null): string | null {
  if (value && !["dry", "rain", "snow"].includes(value)) throw new Error("Choose a valid weather condition.");
  return value;
}

export function parseBuildDetails(form: FormData) {
  const name = formText(form, "name", 100, true)!;
  const dates = parseDates(formText(form, "startDate", 10) ?? "", formText(form, "endDate", 10) ?? "");
  const latitude = formNumber(form, "locationLat", -90, 90);
  const longitude = formNumber(form, "locationLng", -180, 180);
  if ((latitude == null) !== (longitude == null)) throw new Error("Provide both coordinates or neither.");
  return {
    name, dates, latitude, longitude,
    people: formNumber(form, "people", 1, 100, true) ?? 1,
    minTemperature: formNumber(form, "minTemperature", -100, 60, true),
    conditions: validCondition(formText(form, "conditions", 20)),
    destinationId: formText(form, "destinationId", 200),
    location: formText(form, "location", 500),
  };
}

export function parseLogistics(value: unknown): Logistics | null {
  if (value == null) return null;
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid trip logistics.");
  const object = value as Record<string, unknown>;
  const result = { ...emptyLogistics };
  for (const key of Object.keys(object)) {
    if (!Object.prototype.hasOwnProperty.call(result, key)) throw new Error(`Unknown trip logistics field: ${key}.`);
  }
  for (const key of Object.keys(result) as (keyof Logistics)[]) {
    const text = object[key];
    if (text !== undefined && (typeof text !== "string" || text.length > 5000)) {
      throw new Error(`Invalid trip logistics field: ${key}.`);
    }
    result[key] = (text ?? "") as string;
  }
  return result;
}

export function combinedQuantity(current: number, incoming: number): number {
  if (!Number.isInteger(current) || current < 0 || !Number.isInteger(incoming) || incoming < 1 || current + incoming > MAX_GEAR_QUANTITY) {
    throw new Error(`A gear item cannot exceed ${MAX_GEAR_QUANTITY} units. Reduce its quantity before importing.`);
  }
  return current + incoming;
}
