import test from "node:test";
import assert from "node:assert/strict";
import { exportGpx, importGpx } from "../lib/gpx-route.ts";
import { computeRouteMetrics } from "../lib/route-metrics.ts";
const a={id:"a",name:"A&B <trailhead>",lat:49.2,lng:-123.2,kind:"trailhead",elevationM:100};
const b={id:"b",name:"End",lat:49.201,lng:-123.201,kind:"waypoint",elevationM:180};
const track={toId:"b",source:"gpx",distanceM:2000,geometry:[[a.lat,a.lng],[49.2005,-123.2005],[b.lat,b.lng]],elevationsM:[100,140,180],ascentM:80,descentM:0};
const example={...a,trailToNext:track};

test("GPX export uses valid waypoint and track tags, escapes names and keeps elevation samples",()=>{
  const xml=exportGpx([example,b],"Crest & Lake");
  assert.match(xml,/<gpx version="1\.1"/);
  assert.match(xml,/<name>Crest &amp; Lake<\/name>/);
  assert.match(xml,/<name>A&amp;B &lt;trailhead&gt;<\/name>/);
  assert.match(xml,/<ele>140<\/ele>/);
  assert.equal((xml.match(/<trkpt /g)||[]).length,3);
});
test("unmapped lines are exported explicitly as unverified, not made-up trail measurements",()=>{
  const xml=exportGpx([{...a,manualToNext:true},b]);
  assert.match(xml,/<tp:approximate>true<\/tp:approximate>/);
  assert.doesNotMatch(xml,/<ele>180<\/ele><\/trkpt>/);
});
test("GPX import validates size and unsafe document declarations before parsing",()=>{
  assert.throws(()=>importGpx('a'.repeat(4_000_001)), /4 MB/);
  assert.throws(()=>importGpx('<!DOCTYPE gpx><gpx/>'), /document declarations/);
});
// A browser's native DOMParser provides XML validation without a runtime dependency.
// Optional DOM implementation exercises import in Node when present (e.g., test harness).
test("GPX export/import retains route shape, altitude and waypoint names when DOMParser exists",{skip:typeof DOMParser==="undefined"},()=>{
  const xml=exportGpx([example,b]);
  const imported=importGpx(xml,"day1");
  assert.equal(imported.points.length,2);
  assert.equal(imported.points[0].name,a.name);
  assert.equal(imported.points[1].name,b.name);
  assert.equal(imported.points[0].trailToNext.source,"gpx");
  assert.equal(computeRouteMetrics(imported.points,[{id:"day1"}]).ascentM,80);
});
