import test from "node:test";
import assert from "node:assert/strict";
import { previewTrails, filterPreviewTrails } from "../lib/discover-preview.ts";

test("preview data has unique ids", () => {
  assert.equal(new Set(previewTrails.map((t) => t.id)).size, previewTrails.length);
});

test("search matches trail and region names case insensitively", () => {
  const results = filterPreviewTrails(previewTrails, { query: "gaRIbaldi" });
  assert.ok(results.some((t) => t.name === "Garibaldi Lake"));
  assert.ok(results.some((t) => t.name === "Elfin Lakes"));
});

test("trip type and region filters combine", () => {
  const results = filterPreviewTrails(previewTrails, { kind: "multi", region: "Vancouver Island" });
  assert.equal(results.length, 2);
  assert.ok(results.every((t) => t.region === "Vancouver Island" && t.kind === "multi"));
});

test("search is normalized for accents", () => {
  assert.equal(filterPreviewTrails(previewTrails, { query: "o’hara" })[0]?.name, "Lake O’Hara");
});

test("unknown queries return an empty list", () => {
  assert.deepEqual(filterPreviewTrails(previewTrails, { query: "unlisted trail 12345" }), []);
});

test("alphabetical sort does not mutate source array", () => {
  const original = previewTrails.map((t) => t.id);
  const sorted = filterPreviewTrails(previewTrails, { sort: "alphabetical" });
  assert.deepEqual(sorted.map((t) => t.name), [...sorted.map((t) => t.name)].sort((a, b) => a.localeCompare(b)));
  assert.deepEqual(previewTrails.map((t) => t.id), original);
});
