import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = file => JSON.parse(fs.readFileSync(path.join(root,"data",file), "utf8"));
const places = read("destinations.json");
const origins = read("destination-coordinate-sources.json");
const facts = read("destination-verified-metrics.json");
const byId = new Map(places.map(x => [x.id,x]));
const populated = field => places.filter(x => x[field] !== null && x[field] !== undefined).length;

test("catalog retains 184 unique destination IDs", () => {
  assert.equal(places.length,184);
  assert.equal(byId.size,184);
});
test("mapped destinations have complete, distinct coordinates", () => {
  assert.equal(populated("latitude"),origins.totalCount);
  assert.equal(populated("longitude"),origins.totalCount);
  assert.equal(new Set(places.filter(x=>x.latitude!==null).map(x=>`${x.latitude.toFixed(6)}:${x.longitude.toFixed(6)}`)).size,origins.totalCount);
  for (const d of places) {
    assert.equal(d.latitude===null,d.longitude===null,d.id);
    if(d.latitude!==null) {
      assert.ok(d.latitude>=48 && d.latitude<=60,d.id);
      assert.ok(d.longitude>=-139 && d.longitude<=-114,d.id);
    }
  }
});
test("each new coordinate is sourced and mapped to the intended destination", () => {
  assert.equal(origins.originalCount,14);
  assert.equal(origins.addedCount,111);
  assert.equal(origins.totalCount,125);
  assert.equal(Object.keys(origins.sources).length,origins.addedCount);
  for(const [id,source] of Object.entries(origins.sources)) {
    const place = byId.get(id);
    assert.ok(place, id);
    assert.equal(source.latitude,place.latitude,id);
    assert.equal(source.longitude,place.longitude,id);
    assert.ok(source.referenceUrl || source.coordinateSource,id);
    assert.ok(source.coordinateType,id);
    assert.ok(["campground","feature-centre"].includes(source.coordinateType),id);
    if (source.coordinateType === "campground") assert.equal(place.kind,"campground",id);
  }
});
test("lakes and their campgrounds have distinct mapped locations", () => {
  for (const [feature,site] of [["greendrop-lake-destination","greendrop-lake-chilliwack"],["bedwell-lake-destination","bedwell-lake-strathcona"],["quiniscoe-lake-destination","quiniscoe-lake"]]) {
    const x=byId.get(feature),y=byId.get(site);
    assert.ok(x?.latitude!==null && y?.latitude!==null);
    assert.notDeepEqual([x.latitude,x.longitude],[y.latitude,y.longitude]);
  }
});
test("campground feature locations require no safety or trust warning", () => {
  assert.ok(!places.some(x=>"unsafe" in x || "unverified" in x || "warningBadge" in x));
});
test("route and campsite facts have provenance", () => {
  assert.ok(populated("distanceKm")>=103);
  assert.ok(populated("elevationGainM")>=33);
  assert.ok(populated("tentSites")>=50);
  assert.ok(Object.keys(facts.sources).length>=10);
  for(const [id,details] of Object.entries(facts.sources)) {
    assert.ok(byId.has(id),id);
    assert.ok(details.source,id);
  }
});


test("new Rockwall and Robson campsite points are distinct and source-backed", () => {
  const ids = ["emperor-falls-robson","marmot-robson","floe-lake-rockwall","numa-creek-rockwall","tumbling-creek-rockwall","helmet-falls-rockwall","helmet-ochre-junction-rockwall"];
  for (const id of ids) {
    assert.equal(byId.get(id)?.kind, "campground", id);
    assert.ok(Number.isFinite(byId.get(id)?.latitude), id);
    assert.equal(origins.sources[id]?.coordinateType, "campground", id);
    assert.match(origins.sources[id]?.referenceUrl || "", /^https:\/\/mapcarta\.com\//, id);
  }
  assert.equal(new Set(ids.map(id => `${byId.get(id).latitude},${byId.get(id).longitude}`)).size, ids.length);
});
test("Parks Canada trail metrics distinguish round-trip distance and access rules", () => {
  for(const [id,km,ascent] of [["balu-pass",12.8,780],["avalanche-crest",10.2,795],["asulkan-trail",15.8,870],["hermit-meadows-glacier",6.4,820]]) {
    const record=byId.get(id),source=facts.sources[id];
    assert.equal(record.distanceKm,km,id);
    assert.equal(record.elevationGainM,ascent,id);
    assert.equal(record.distanceType,"round-trip",id);
    assert.ok(source?.source.includes("parks.canada.ca"),id);
  }
  assert.equal(byId.get("balu-pass").dogs,"not-allowed");
  assert.match(byId.get("cape-scott-lighthouse").caution,/private property/i);
  assert.equal(byId.get("cape-scott-lighthouse").latitude,null);
});
