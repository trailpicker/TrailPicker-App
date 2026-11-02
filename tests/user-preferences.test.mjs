import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_USER_PREFERENCES,
  preferencesFromRow,
  weightText,
  distanceText,
  temperatureText,
  windText,
} from "../lib/user-preferences.ts";

test("new users start metric and private", () => {
  assert.deepEqual(preferencesFromRow(null), DEFAULT_USER_PREFERENCES);
  assert.equal(preferencesFromRow({ defaultBuildPublic: true }).defaultBuildPublic, true);
  assert.equal(preferencesFromRow({ weightUnit: "invalid" }).weightUnit, "metric");
});

test("weight conversions change display without modifying raw grams", () => {
  assert.equal(weightText(1500), "1.50 kg");
  assert.equal(weightText(200), "200 g");
  assert.equal(weightText(453.59237, "imperial"), "1.00 lb");
  assert.equal(weightText(28.349523125, "imperial"), "1.0 oz");
});

test("distance and temperature conversions", () => {
  assert.equal(distanceText(10), "10.0 km");
  assert.equal(distanceText(1.609344, "imperial"), "1.0 mi");
  assert.equal(temperatureText(0, "f"), "32°F");
  assert.equal(temperatureText(0, "c"), "0°C");
  assert.equal(windText(100, "imperial"), "62 mph");
});

test("unknown measurements are not silently treated as zero", () => {
  assert.equal(weightText(null), "—");
  assert.equal(distanceText(undefined), "—");
  assert.equal(temperatureText(NaN), "—");
  assert.equal(windText(Infinity), "—");
});
