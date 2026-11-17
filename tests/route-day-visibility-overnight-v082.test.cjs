const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname,'..');
const original = require.extensions['.ts'];
// Load project-local pure TypeScript models with no Next.js runtime dependency.
require.extensions['.ts'] = function(module, filename) {
  const source=fs.readFileSync(filename,'utf8');
  const compiled=ts.transpileModule(source,{fileName:filename,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
  module._compile(compiled,filename);
};
const { isSharedOvernightStop } = require('../lib/shared-overnight-stop.ts');
const { missingTrailLegs } = require('../lib/route-request-planner.ts');
const { computeRouteMetrics } = require('../lib/route-metrics.ts');
const { buildRouteExplorer } = require('../lib/route-explorer.ts');
const { routeLegStyle } = require('../lib/route-leg-style.ts');
require.extensions['.ts'] = original;
const point=(id,name,dayId,lat=49.2,lng=-123.2)=>({ id,name,dayId,lat,lng,kind:'camp',elevationM:null });
function route(a,b,distanceM=1000){ return {toId:b.id,geometry:Array.from({length:5},(_,i)=>[a.lat+(b.lat-a.lat)*i/4,a.lng+(b.lng-a.lng)*i/4]),distanceM,elevationsM:[100,105,110,115,120],ascentM:20,descentM:0,source:'openrouteservice'}; }
const d1=point('d1','Kees and Claire Hut','day-1');
const d2=point('d2','Kees and Claire Hut','day-2');
const earlier=point('earlier','Previous stop','day-1',49.198,-123.202);
const later=point('later','Next stop','day-2',49.202,-123.198);
earlier.trailToNext=route(earlier,d1);
d2.trailToNext=route(d2,later);

test('same overnight campsite across consecutive days generates no fictitious route leg or warning',()=>{
  const points=[earlier,d1,d2,later];
  assert.ok(isSharedOvernightStop(d1,d2));
  assert.deepEqual(missingTrailLegs(points),[]);
  const metrics=computeRouteMetrics(points,[{id:'day-1'},{id:'day-2'}]);
  assert.equal(metrics.segments,2);
  assert.equal(metrics.unroutedSegments,0);
  assert.equal(metrics.unassignedDaySegments,0);
  assert.equal(metrics.dayMetrics[0].segments,1);
  assert.equal(metrics.dayMetrics[1].segments,1);
  assert.equal(metrics.distanceM,2000);
  assert.ok(metrics.estimatedMinutes !== null);
  const explorer=buildRouteExplorer(points);
  assert.equal(explorer.distanceM,metrics.distanceM);
  assert.equal(explorer.stopDistances[d1.id],explorer.stopDistances[d2.id]);
  assert.equal(explorer.sections.length,2);
});

test('small coordinate differences are allowed for same named overnight sites, not distant sites',()=>{
  const nearby=point('d2','  kees & claire hut  ','day-2',49.20007,-123.20007);
  assert.ok(isSharedOvernightStop(d1,nearby));
  assert.equal(isSharedOvernightStop(d1,point('different','Unrelated name','day-2',49.20007,-123.20007)),false);
  assert.equal(isSharedOvernightStop(d1,point('far','Kees and Claire Hut','day-2',49.21,-123.2)),false);
  assert.equal(isSharedOvernightStop(d1,point('same day','Kees and Claire Hut','day-1')),false);
  assert.equal(isSharedOvernightStop(d1,point('no day','Kees and Claire Hut',null)),false);
  assert.ok(isSharedOvernightStop(d1,point('identical pin','Other label','day-2')));
});

test('intentional loop tracks or route shaping are not silently removed',()=>{
  assert.equal(isSharedOvernightStop({...d1,viaToNext:[[49.21,-123.21]]},d2),false);
  const loop={...d1,trailToNext:{toId:d2.id,geometry:[[d1.lat,d1.lng],[49.204,-123.2],[d2.lat,d2.lng]],distanceM:2200,source:'gpx'}};
  assert.equal(isSharedOvernightStop(loop,d2),false);
  assert.equal(computeRouteMetrics([loop,d2],[{id:'day-1'},{id:'day-2'}]).segments,1);
});

test('genuinely different leg after a shared overnight belongs to the next day, with ORS still required',()=>{
  const far=point('far','Other campsite','day-2',49.21,-123.19);
  assert.equal(isSharedOvernightStop(d1,far),false);
  assert.equal(computeRouteMetrics([d1,far],[{id:'day-1'},{id:'day-2'}]).unassignedDaySegments,0);
  assert.equal(computeRouteMetrics([d1,far],[{id:'day-1'},{id:'day-2'}]).dayMetrics[1].segments,1);
  assert.equal(computeRouteMetrics([d1,far],[{id:'day-1'},{id:'day-2'}]).unroutedSegments,1);
  assert.equal(missingTrailLegs([d1,far]).length,1);
});

test('route dimming follows expanded panels, not the last clicked stop',()=>{
  const base={mapped:true,editing:true,startDayId:'day-2',endDayId:'day-2',activeDayId:'day-1'};
  assert.ok(routeLegStyle({...base,expandedDayIds:['day-2']}).opacity>.9);
  assert.ok(routeLegStyle({...base,expandedDayIds:['day-1']}).opacity<.3);
  assert.ok(routeLegStyle({...base,expandedDayIds:[]}).opacity>.9);
  assert.equal(routeLegStyle({...base,expandedDayIds:[]}).weight,6); // editing mode uses full weight
  assert.equal(routeLegStyle({...base,editing:false,expandedDayIds:[]}).weight,5);
  assert.ok(routeLegStyle({...base,editing:false,expandedDayIds:['day-1','day-2']}).opacity>.8);
  assert.ok(routeLegStyle({...base,mapped:false,expandedDayIds:['day-1']}).opacity<.3);
  assert.equal(routeLegStyle({...base,mapped:false,expandedDayIds:[]}).dashArray,'6 8');
});

test('mixed-day segment shows when both owning panels are expanded',()=>{
  const b={mapped:true,editing:false,startDayId:'day-1',endDayId:'day-2'};
  assert.ok(routeLegStyle({...b,expandedDayIds:['day-1','day-2']}).opacity>.8);
  assert.ok(routeLegStyle({...b,expandedDayIds:['day-1']}).opacity<.3);
});

test('itinerary expansion state reaches the map, and stop drag ghost cannot keep cards gray',()=>{
  const route=fs.readFileSync(path.join(root,'components/builder/TripPlanner/TripRoute.tsx'),'utf8');
  const map=fs.readFileSync(path.join(root,'components/builder/TripPlanner/RouteMapInner.tsx'),'utf8');
  const itinerary=fs.readFileSync(path.join(root,'components/builder/TripPlanner/DayStopsItinerary.tsx'),'utf8');
  assert.match(route,/expandedDayIds=\{expandedDayIds\}/);
  assert.match(map,/expandedDayIds,\s*startDayId/);
  assert.match(itinerary,/open=\{route\.expandedDayIds\.includes\(day\.id\)\}/);
  assert.match(itinerary,/setOpen=\{\(next\) => route\.setDayExpanded\(day\.id, next\)\}/);
  assert.ok(!itinerary.includes('opacity-45'));
  assert.match(itinerary,/window\.addEventListener\("drop", endDrag\)/);
  assert.match(itinerary,/drag\.end\(\)/);
});

test('modified TypeScript parses (TS/TSX)',()=>{
  for(const rel of ['lib/shared-overnight-stop.ts','lib/route-metrics.ts','lib/route-explorer.ts','lib/route-request-planner.ts','lib/route-leg-style.ts','components/builder/TripPlanner/TripRoute.tsx','components/builder/TripPlanner/DayStopsItinerary.tsx','components/builder/TripPlanner/RouteMapInner.tsx']){
    const source=fs.readFileSync(path.join(root,rel),'utf8');
    const result=ts.transpileModule(source,{fileName:rel,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX},reportDiagnostics:true});
    assert.deepEqual((result.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[],rel);
  }
});

