const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const old = require.extensions['.ts'];
require.extensions['.ts'] = function(module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  const compiled = ts.transpileModule(source, {fileName: filename, compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  module._compile(compiled, filename);
};
const { displayStops, clusterProjectedStops, spiderfyOffset } = require('../lib/route-marker-clustering.ts');
require.extensions['.ts'] = old;
const point = (id, day, kind='camp', name='Shared Camp', lat=49.2, lng=-123.2) => ({id,dayId:day,kind,name,lat,lng,elevationM:null});

test('shared overnight campsite is one visual marker but both day records remain selectable', () => {
  const points = [point('day1','d1'),point('day2','d2')];
  const groups = displayStops(points);
  assert.equal(groups.length, 1);
  assert.deepEqual(groups[0].members.map(member=>member.point.id), ['day1','day2']);
  assert.deepEqual(groups[0].members.map(member=>member.order), [1,2]);
  assert.equal(points.length,2);
});

test('do not collapse unlike resources, distant campsites, or genuine hiking loops',()=>{
  const camp=point('a','d1');
  const water=point('b','d2','water');
  assert.equal(displayStops([camp,water]).length,2);
  assert.equal(displayStops([camp,point('far','d2','camp','Shared Camp',49.3,-123.2)]).length,2);
  const hikingLoop={...camp,viaToNext:[[49.22,-123.22]]};
  assert.equal(displayStops([hikingLoop,point('d2','d2')]).length,2);
});

test('two different day markers too close at a given zoom cluster together',()=>{
  const result = clusterProjectedStops([{key:'a',x:100,y:100},{key:'b',x:119,y:117},{key:'c',x:400,y:400}],39);
  assert.equal(result.length,2);
  assert.deepEqual(result[0].keys,['a','b']);
  assert.equal(result[0].x,109.5);
  assert.equal(result[0].y,108.5);
  assert.deepEqual(result[1].keys,['c']);
});

test('pixel radius changes clustering naturally as the map zoom level changes',()=>{
  const large=[{key:'a',x:0,y:0},{key:'b',x:30,y:0}];
  const small=[{key:'a',x:0,y:0},{key:'b',x:60,y:0}];
  assert.equal(clusterProjectedStops(large).length,1);
  assert.equal(clusterProjectedStops(small).length,2);
});

test('neighboring points cluster across arbitrary grid boundaries but not into one long chain',()=>{
  const grouped=clusterProjectedStops([{key:'left',x:0,y:0},{key:'center',x:35,y:0},{key:'right',x:70,y:0}],39);
  assert.equal(grouped.length,2);
  assert.deepEqual(grouped[0].keys,['left','center']);
  assert.deepEqual(grouped[1].keys,['right']);
  const acrossBoundary=clusterProjectedStops([{key:'a',x:38,y:38},{key:'b',x:41,y:41}],39);
  assert.equal(acrossBoundary.length,1);
});

test('spiderfied offsets are distinct and keep temporary pins away from the cluster center',()=>{
  const offsets = Array.from({length:32},(_,i)=>spiderfyOffset(i));
  assert.equal(new Set(offsets.map(pos=>pos.join(','))).size,offsets.length);
  assert.ok(offsets.every(([x,y])=>Math.hypot(x,y)>=40));
});

test('map layer clusters only saved stop visuals, never route geometry or itinerary',()=>{
  const map=fs.readFileSync(path.join(root,'components/builder/TripPlanner/RouteMapInner.tsx'),'utf8');
  const itinerary=fs.readFileSync(path.join(root,'components/builder/TripPlanner/DayStopsItinerary.tsx'),'utf8');
  assert.match(map,/<StopMarkerLayer points=\{points\}/);
  assert.match(map,/clusterProjectedStops\(/);
  assert.match(map,/map\.project\(/);
  assert.match(map,/spiderfyOffset\(/);
  assert.match(map,/zIndexOffset=\{selected \? 1500/);
  assert.match(map,/isSharedOvernightStop\(point, next\)/);
  assert.match(map,/<Polyline key=\{trail \? "mapped" : "direct"\}/);
  assert.match(itinerary,/DayStopsItinerary/);
});

test('changed TS and TSX have no syntax errors',()=>{
  for (const rel of ['lib/route-marker-clustering.ts','lib/waypoint-map.ts','components/builder/TripPlanner/RouteMapInner.tsx']) {
    const compiled=ts.transpileModule(fs.readFileSync(path.join(root,rel),'utf8'),{fileName:rel,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}});
    assert.deepEqual((compiled.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[],rel);
  }
});
