import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseDiscoverSearch, discoverUrl, filterDiscoverDestinations } from "../lib/discover.ts";
import { hasMappedCoordinates, splitMappedDestinations } from "../lib/discover-search-map.ts";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const catalog = JSON.parse(read("data/destinations.json"));
const first = catalog.find(d => hasMappedCoordinates(d));

// The exact count is intentional: don't silently infer coordinates for missing rows.
test("map includes only real stored coordinates, preserving all results", () => {
  const split = splitMappedDestinations(catalog);
  assert.equal(split.mapped.length, 125);
  assert.equal(split.unmapped.length, catalog.length - 125);
  assert.equal(split.mapped.length + split.unmapped.length, catalog.length);
  assert.ok(split.mapped.every(hasMappedCoordinates));
  assert.ok(split.unmapped.every(d => !("latitude" in d) && !("longitude" in d)));
  assert.deepEqual(split.mapped.map(d => d.id), catalog.filter(hasMappedCoordinates).map(d => d.id));
});

test("invalid, null, out-of-range and infinite coordinates cannot become map markers", () => {
  for (const coords of [
    {latitude:null,longitude:1},{latitude:2,longitude:null},{latitude:NaN,longitude:2},
    {latitude:3,longitude:Infinity},{latitude:91,longitude:40},{latitude:2,longitude:-181},
    {latitude:"49.0",longitude:-123},
  ]) assert.equal(hasMappedCoordinates(coords),false);
  assert.equal(hasMappedCoordinates(first),true);
});

test("map and grid reflect the identical server-side filtered catalog", () => {
  const filters = parseDiscoverSearch({q:"Garibaldi",region:"Sea to Sky",activity:"camping",display:"map"});
  const result = filterDiscoverDestinations(catalog,filters);
  const {mapped,unmapped} = splitMappedDestinations(result);
  assert.equal(result.length, mapped.length + unmapped.length);
  assert.ok(mapped.every(d => result.includes(d)));
  assert.ok(unmapped.every(d => result.some(x => x.id === d.id)));
});

test("display=map is whitelisted, shareable and preserves filters", () => {
  const parsed = parseDiscoverSearch({view:"destinations",display:"map",q:"Lake & River",activity:"hiking",region:"Sea to Sky",page:"3"});
  assert.equal(parsed.display,"map");
  const href = discoverUrl(parsed,{region:"Lower Mainland",page:1});
  const u = new URL(href,"https://trailpicker.local");
  assert.equal(u.pathname,"/discover/search");
  assert.equal(u.searchParams.get("display"),"map");
  assert.equal(u.searchParams.get("region"),"Lower Mainland");
  assert.equal(u.searchParams.get("activity"),"hiking");
  assert.equal(u.searchParams.get("q"),"Lake & River");
  assert.equal(u.searchParams.has("view"),false);
  assert.equal(u.searchParams.has("page"),false);
  const grid = new URL(discoverUrl(parsed,{display:"grid"}),"https://trailpicker.local");
  assert.equal(grid.searchParams.has("display"),false);
  assert.equal(grid.searchParams.get("activity"),"hiking");
});

test("map display only belongs to destination search; invalid display is grid", () => {
  assert.equal(parseDiscoverSearch({view:"destinations",display:"attack"}).display,"grid");
  assert.equal(parseDiscoverSearch({view:"packs",display:"map"}).display,"grid");
  assert.equal(parseDiscoverSearch({view:"trips",display:"map"}).display,"grid");
  assert.equal(new URL(discoverUrl(parseDiscoverSearch({view:"destinations",display:"map"}),{view:"saved"}),"http://localhost").searchParams.has("display"),false);
});

test("map view uses safe client-only Leaflet and shows unmapped results", () => {
  const page = read("components/discover/DiscoverLanding.tsx");
  const server = read("components/discover/DiscoverResultsServer.tsx");
  const view = read("components/discover/DiscoverDestinationMapView.tsx");
  const map = read("components/discover/DiscoverSearchMapInner.tsx");
  const wrapper = read("components/discover/DiscoverSearchMap.tsx");
  const routes = read("lib/discover.ts");
  assert.match(page,/href=\{discoverUrl\(filters, \{display: "map", page: 1\}\)\}/);
  assert.match(page,/name="display" value="map"/);
  assert.match(page,/!isMapView && totalPages > 1/);
  assert.match(server,/splitMappedDestinations\(matching\)/);
  assert.match(view,/unmapped\.map/);
  assert.match(view,/onSelect=\{setSelectedId\}/);
  assert.match(map,/tile.openstreetmap.org/);
  assert.match(map,/referrerPolicy="origin"/);
  assert.match(map,/CtrlWheelZoom/);
  assert.match(map,/tileerror/);
  assert.match(wrapper,/ssr: false/);
  assert.doesNotMatch(routes,/\/discover\?view=destinations/);
});

