import assert from "node:assert/strict";
import test from "node:test";
import { discoverUrl, parseDiscoverSearch, summarizePublicBuild, filterDiscoverDestinations } from "../lib/discover.ts";

test("search params are validated and capped", () => {
  const filters = parseDiscoverSearch({ view: "unknown", sort: "unknown", q: "  mountain   ", location: " BC ", page: "-20" });
  assert.deepEqual(filters, { view: "destinations", display: "grid", sort: "popular", q: "mountain", location: "BC", region: "", difficulty: "all", activity: "all", category: "all", page: 1 });
  assert.equal(parseDiscoverSearch({ page: "3", view: "saved", sort: "popular" }).page, 3);
  assert.equal(parseDiscoverSearch({ view: "trips", sort: "distance" }).sort, "recent");
  assert.equal(parseDiscoverSearch({ view: "destinations", sort: "distance", difficulty: "hard" }).difficulty, "hard");
  assert.equal(parseDiscoverSearch({ page: "3.2" }).page, 1);
  assert.equal(parseDiscoverSearch({ page: "9999999" }).page, 1);
  assert.equal(parseDiscoverSearch({ page: "NaN" }).page, 1);
  assert.equal(parseDiscoverSearch({ q: "x".repeat(300) }).q.length, 100);
});

test("discover urls preserve filters and URL encode values", () => {
  const path = discoverUrl({ view: "destinations", sort: "popular", q: "Lake & River", location: "BC, Canada" }, { view: "saved", page: 2 });
  const url = new URL(path, "https://example.com");
  assert.equal(url.pathname, "/discover/saved");
  assert.equal(url.searchParams.get("view"), null);
  assert.equal(url.searchParams.get("q"), "Lake & River");
  assert.equal(url.searchParams.get("page"), "2");
});

test("summaries exclude worn and consumables and multiply quantities", () => {
  const summary = summarizePublicBuild([
    { quantity: 2, isWorn: false, isConsumable: false, weightSnapshot: null, gear: { weight_g: 1200 } },
    { quantity: 1, isWorn: true, isConsumable: false, weightSnapshot: 400, gear: null },
    { quantity: 3, isWorn: false, isConsumable: true, weightSnapshot: 100, gear: null },
  ], [
    { distanceKm: 3.4, elevationGainM: 120 },
    { distanceKm: null, elevationGainM: 90 },
  ]);
  assert.equal(summary.itemCount, 6);
  assert.equal(summary.baseWeightG, 2400);
  assert.equal(summary.distanceKm, 3.4);
  assert.equal(summary.partialDistance, true);
  assert.equal(summary.elevationGainM, 210);
  assert.equal(summary.dayCount, 2);
});

test("unknown base weights are not misreported as complete", () => {
  const summary = summarizePublicBuild([
    { quantity: 1, isWorn: false, isConsumable: false, weightSnapshot: null, gear: null },
  ], []);
  assert.equal(summary.baseWeightG, null);
  assert.equal(summary.unknownBaseWeights, 1);
  assert.equal(summary.distanceKm, null);
  assert.equal(summary.elevationGainM, null);
});


test("curated destination filtering respects region, difficulty, search and sorting", () => {
  const destinations = [
    { id: "a", name: "Alpine Lake", park: "Park A", region: "Rockies", difficulty: "hard", distanceKm: 15, elevationGainM: 1400, featured: true, summary: "Large lake" },
    { id: "b", name: "Coastal Loop", park: "Park B", region: "Sea to Sky", difficulty: "easy", distanceKm: 5, elevationGainM: 80, featured: false, summary: "Coastal forests" },
    { id: "c", name: "Lake Circuit", park: "Park A", region: "Rockies", difficulty: "easy", distanceKm: 3, elevationGainM: 100, featured: false, summary: "Lake walk" },
  ];
  assert.deepEqual(filterDiscoverDestinations(destinations, { q: "lake", region: "Rockies", difficulty: "all", sort: "distance" }).map(d => d.id), ["c", "a"]);
  assert.deepEqual(filterDiscoverDestinations(destinations, { q: "", region: "", difficulty: "easy", sort: "name" }).map(d => d.id), ["b", "c"]);
  assert.equal(filterDiscoverDestinations(destinations, { q: "missing", region: "", difficulty: "all", sort: "popular" }).length, 0);
});

