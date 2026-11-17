import test from "node:test";
import assert from "node:assert/strict";
import { parseResourceAnnotation, readPrivateResources, validatePrivateResources, calculateWaterLegs } from "../lib/trip-resources.ts";
import { csvCell, exportCampsitesCsv, exportLogisticsCsv, exportPackCsv, escapeHtml, printableTripHtml } from "../lib/trip-resources-export.ts";
const stop = (id,name,kind,lat) => ({ id,name,kind,lat,lng:-123.1,elevationM:null });
const routed = (from,to,distance=3500) => ({ toId:to.id,geometry:[[from.lat,from.lng],[to.lat,to.lng]],elevationsM:[50,250],ascentM:200,descentM:0,distanceM:distance,source:"gpx" });

test("resource metadata rejects embedded booking fields, invalid links, bad reliability and lengths",()=>{
  assert.deepEqual(parseResourceAnnotation({ detail:"  bear locker  ",waterReliability:"unknown" }),{ detail:"bear locker",waterReliability:"unknown" });
  assert.throws(()=>parseResourceAnnotation({ confirmation:"SECRET" }),/Unsupported/);
  assert.throws(()=>parseResourceAnnotation({ sourceUrl:"javascript:alert(1)" }),/HTTPS/);
  assert.throws(()=>parseResourceAnnotation({ waterReliability:"certain" }),/reliability/);
  assert.throws(()=>parseResourceAnnotation({ detail:"x".repeat(751) }),/Invalid/);
});

test("bookings are private and strict validation rejects missing and unrelated day/stop IDs",()=>{
  const row = { id:"book1",waypointId:"camp1",dayId:"d1",campground:"Ridge Camp",status:"confirmed",arrival:"2026-11-11",departure:"2026-11-12",provider:"Parks",confirmation:"A0001",notes:"Bring permit" };
  const p = { settings:{rateLph:0.5,reserveL:1,capacityL:3},bookings:[row] };
  assert.equal(validatePrivateResources(p,["d1"],["camp1"]).bookings[0].confirmation,"A0001");
  assert.equal(readPrivateResources({phase6:p}).bookings[0].confirmation,"A0001");
  assert.deepEqual(readPrivateResources(null).bookings,[]);
  assert.throws(()=>validatePrivateResources(p,[],["camp1"]),/removed trip day/);
  assert.throws(()=>validatePrivateResources(p,["d1"],[]),/removed campsite/);
  assert.throws(()=>validatePrivateResources({...p,bookings:[row,row]},["d1"],["camp1"]),/Duplicate/);
  assert.throws(()=>validatePrivateResources({...p,settings:{...p.settings,rateLph:100}},["d1"],["camp1"]),/rateLph/);
});

test("water legs use routed distance, ascent and only user-marked refills",()=>{
  const a=stop("a","Trailhead","trailhead",49.1), b=stop("b","Stream","water",49.11), c=stop("c","Camp","camp",49.12);
  a.trailToNext=routed(a,b); b.trailToNext=routed(b,c);
  b.resource={waterReliability:"seasonal",refillConfirmed:false};
  const setting={rateLph:0.6,reserveL:1,capacityL:2};
  assert.equal(calculateWaterLegs([a,b,c],setting).length,1);
  b.resource.refillConfirmed=true;
  const legs=calculateWaterLegs([a,b,c],setting);
  assert.equal(legs.length,2);
  assert.ok(legs[0].requiredL > 1);
  assert.equal(legs[0].distanceKm,3.5);
  assert.equal(legs[1].from,"Stream");
  assert.equal(calculateWaterLegs([a,b,c],{...setting,capacityL:1})[0].exceedsCapacity,true);
  a.manualToNext=true;
  assert.equal(calculateWaterLegs([a,b,c],setting)[0].requiredL,null);
  b.resource.waterReliability="unavailable";
  assert.equal(calculateWaterLegs([a,b,c],setting).length,1);
});

const sample=()=>({ name:"<Forest & Lake>", days:[{ id:"d1",date:new Date("2026-11-11"),startLocation:"Trailhead",endLocation:"Camp",distanceKm:7,elevationGainM:250,durationMinutes:180,notes:"<img src=x onerror=alert(1)>" }],points:[{...stop("c","=Danger", "camp",49.1),dayId:"d1",resource:{detail:"See <note>"}}], logistics:{ permits:"code",reservations:"ABC",transportation:"Car",parking:"At start",emergencyContact:"PRIVATE",emergencyPlan:"SECRET",notes:"Enjoy" }, bookings:[{id:"b1",waypointId:"c",dayId:"d1",campground:"=Harmful",status:"confirmed",arrival:"",departure:"",provider:"BC Parks",confirmation:"SECRET123",notes:"private"}],packLines:[{name:"Tent",category:"Shelter",quantity:1,gramsEach:800,grams:800,weightClass:"base"}] });
test("CSV injection is neutralized, private references excluded by default",()=>{
  const csv=exportCampsitesCsv(sample(),false);
  assert.match(csv,/'=Danger/);
  assert.doesNotMatch(csv,/SECRET123/);
  assert.match(exportLogisticsCsv(sample(),false),/\[private\]/);
  assert.doesNotMatch(exportLogisticsCsv(sample(),false),/PRIVATE/);
  assert.match(exportLogisticsCsv(sample(),true),/SECRET123/);
  assert.match(exportPackCsv(sample()),/Tent/);
  assert.equal(csvCell('x"y'),'"x""y"');
});
test("printable output escapes all user content, excludes private by default",()=>{
  const html=printableTripHtml(sample());
  assert.match(html,/&lt;Forest &amp; Lake&gt;/);
  assert.match(html,/&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(html,/SECRET123|PRIVATE/);
  assert.match(printableTripHtml(sample(),true),/SECRET123/);
  assert.equal(escapeHtml('<script>'),"&lt;script&gt;");
});

