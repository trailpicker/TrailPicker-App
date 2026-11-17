import test from "node:test";
import assert from "node:assert/strict";
import { parseCompareIds, comparisonPrice, getComparisonRows } from "../lib/gear-comparison.ts";

const fixture = (id, overrides = {}) => ({
  id, name: id, price_cad: 200, weight_g: 900, capacity_l: 55,
  frame_type: "internal", waterproof: false, temperature_rating: null,
  material: "Nylon", season: null,
  brand: { name: "Brand" }, category: { id: "packs", name: "Packs", slug: "packs" },
  subcategory: { name: "Backpacks", slug: "backpacks" },
  specifications: [], prices: [], reviews: [], ...overrides,
});

test("comparison IDs are deduplicated, constrained and capped", () => {
  assert.deepEqual(parseCompareIds(" a ,b,a,c,d,e "), ["a", "b", "c", "d"]);
  assert.deepEqual(parseCompareIds(undefined), []);
  assert.deepEqual(parseCompareIds("x".repeat(1001)), []);
  assert.deepEqual(parseCompareIds(["a", "b"]), ["a", "b"]);
});

test("lowest in-stock CAD price is used without treating foreign currencies as CAD", () => {
  const one = fixture("one", { prices: [{ price: 120, currency: "USD", inStock: true }, { price: 180, currency: "CAD", inStock: true }, { price: 50, currency: "CAD", inStock: false }] });
  assert.equal(comparisonPrice(one), 180);
  assert.equal(comparisonPrice(fixture("two", { price_cad: 30, prices: [{ price: 20, currency: "USD", inStock: true }] })), 30);
});

test("numeric comparisons highlight lightest, least expensive and highest capacity", () => {
  const rows = getComparisonRows([
    fixture("heavy", { weight_g: 1500, price_cad: 300, capacity_l: 40 }),
    fixture("light", { weight_g: 800, price_cad: 150, capacity_l: 65 }),
  ]);
  assert.deepEqual(rows.find(r => r.key === "weight")?.bestIndices, [1]);
  assert.deepEqual(rows.find(r => r.key === "price")?.bestIndices, [1]);
  assert.deepEqual(rows.find(r => r.key === "capacity")?.bestIndices, [1]);
  assert.equal(rows.find(r => r.key === "price")?.different, true);
});

test("unknown specs remain null and do not win best-value comparisons", () => {
  const rows = getComparisonRows([fixture("known", { weight_g: 500 }), fixture("unknown", { weight_g: null })]);
  const weight = rows.find(r => r.key === "weight");
  assert.deepEqual(weight?.values, ["500 g", null]);
  assert.deepEqual(weight?.bestIndices, []);
  assert.equal(weight?.different, false);
});

test("category-specific specs align by normalized key rather than row order", () => {
  const rows = getComparisonRows([
    fixture("one", { specifications: [{ key: "Packed_Size", value: "40 x 12", unit: "cm" }, { key: "Torso length", value: "Medium", unit: null }] }),
    fixture("two", { specifications: [{ key: "torso-length", value: "Large", unit: null }] }),
  ]);
  assert.deepEqual(rows.find(r => r.key === "spec:torso length")?.values, ["Medium", "Large"]);
  assert.deepEqual(rows.find(r => r.key === "spec:packed size")?.values, ["40 x 12 cm", null]);
  assert.equal(rows.find(r => r.key === "spec:torso length")?.different, true);
});

test("a tied value is not falsely highlighted as better", () => {
  const row = getComparisonRows([fixture("a"), fixture("b")]).find(r => r.key === "weight");
  assert.deepEqual(row?.bestIndices, []);
  assert.equal(row?.different, false);
});
