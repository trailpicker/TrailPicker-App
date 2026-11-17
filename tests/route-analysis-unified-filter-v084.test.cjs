const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const ts = require('typescript');
const root = resolve(__dirname, '..');
const read = path => readFileSync(resolve(root,path), 'utf8');
const { routeAnalysisScope } = require('../lib/route-analysis-scope.ts');
const breaks = { style:'normal', customMinutesPerHour:10, lunchMinutes:0, lunchThresholdMinutes:240 };
const first = {
  dayId:'day-1', segments:2, routedSegments:2, climbedSegments:2, sampleDerivedSegments:0,
  distanceM:6000, routedDistanceM:6000, knownAscentM:400, knownDescentM:100,
  terrainTimeDistanceM:5500, estimatedMinutes:120, routedEstimateMinutes:120, unresolvedLinks:0,
};
const second = {
  dayId:'day-2', segments:3, routedSegments:3, climbedSegments:3, sampleDerivedSegments:1,
  distanceM:12000, routedDistanceM:12000, knownAscentM:800, knownDescentM:250,
  terrainTimeDistanceM:10500, estimatedMinutes:240, routedEstimateMinutes:240, unresolvedLinks:0,
};
const full = {
  segments:5, routedSegments:5, unroutedSegments:0, climbedSegments:5, sampleDerivedSegments:1,
  unassignedDaySegments:0, distanceM:18000, routedDistanceM:18000,
  knownAscentM:1200, knownDescentM:350, terrainTimeDistanceM:16000,
  estimatedMinutes:360, routedEstimateMinutes:360,
  dayMetrics:[first,second],
};

test('Entire route keeps separate day break calculations and full distance/ascent/descent',()=>{
 const result=routeAnalysisScope(full,null,breaks);
 assert.equal(result.dayId,null);
 assert.equal(result.movingMinutes,360);
 assert.equal(result.breakMinutes,60);
 assert.equal(result.distanceM,18000);
 assert.equal(result.knownAscentM,1200);
 assert.equal(result.knownDescentM,350);
 assert.equal(result.terrainTimeDistanceM,16000);
 assert.equal(result.complete,true);
 assert.deepEqual(result.issues,[]);
});
test('Day 1 and Day 2 filter all metrics, moving minutes and breaks',()=>{
 const one=routeAnalysisScope(full,'day-1',breaks);
 const two=routeAnalysisScope(full,'day-2',breaks);
 assert.deepEqual([one.dayId,one.distanceM,one.knownAscentM,one.knownDescentM,one.movingMinutes,one.breakMinutes],['day-1',6000,400,100,120,20]);
 assert.deepEqual([two.dayId,two.distanceM,two.knownAscentM,two.knownDescentM,two.movingMinutes,two.breakMinutes],['day-2',12000,800,250,240,40]);
 assert.equal(one.terrainTimeDistanceM,5500);
 assert.equal(two.sampleDerivedSegments,1);
 assert.equal(one.complete,true);
 assert.equal(two.complete,true);
});
test('Rate and lunch are calculated per day even for the entire-route scope',()=>{
 const setting={...breaks,lunchMinutes:35,lunchThresholdMinutes:200};
 assert.equal(routeAnalysisScope(full,null,setting).breakMinutes,95);
 assert.equal(routeAnalysisScope(full,'day-1',setting).breakMinutes,20);
 assert.equal(routeAnalysisScope(full,'day-2',setting).breakMinutes,75);
});
test('Warnings and partial timings follow selected day without leaking another day issues',()=>{
 const data={...full,segments:6,routedSegments:5,unroutedSegments:1,climbedSegments:5,unassignedDaySegments:1,
  dayMetrics:[{...first,estimatedMinutes:null,unresolvedLinks:1},{...second,segments:4,routedSegments:3,estimatedMinutes:null}]};
 const one=routeAnalysisScope(data,'day-1',breaks);
 const two=routeAnalysisScope(data,'day-2',breaks);
 assert.equal(one.movingMinutes,120);
 assert.equal(one.complete,false);
 assert.equal(one.unroutedSegments,0);
 assert.equal(one.issues.length,1);
 assert.match(one.issues[0],/cross-day/);
 assert.equal(two.unroutedSegments,1);
 assert.equal(two.issues.some(issue=>/cross-day/.test(issue)),false);
 assert.match(two.issues[0],/straight-line/);
 assert.equal(routeAnalysisScope(data,null,breaks).issues.length,2);
});
test('Empty day is unavailable, unknown day safely falls back to full route',()=>{
 const empty={...first,segments:0,routedSegments:0,climbedSegments:0,estimatedMinutes:null,routedEstimateMinutes:0,distanceM:0,knownAscentM:0};
 const data={...full,dayMetrics:[empty,second]};
 const one=routeAnalysisScope(data,'day-1',breaks);
 assert.equal(one.distanceM,0);
 assert.equal(one.movingMinutes,null);
 assert.equal(one.breakMinutes,null);
 assert.equal(one.complete,false);
 assert.equal(routeAnalysisScope(data,'deleted-id',breaks).dayId,null);
 assert.equal(routeAnalysisScope(data,'deleted-id',breaks).distanceM,18000);
});
test('Route Analysis uses one prominent custom day picker above hiking & terrain, no mountain icons or outer terrain card',()=>{
 const section=read('components/builder/TripPlanner/RouteAnalysisSection.tsx');
 const panel=read('components/builder/TripPlanner/RouteElevationPanel.tsx');
 const picker=read('components/builder/TripPlanner/StopSelectPicker.tsx');
 assert.doesNotMatch(section,/<Mountain\b/);
 assert.doesNotMatch(panel,/<Mountain\b/);
 assert.match(section,/variant="analysis"/);
 assert.doesNotMatch(section,/>Analysis scope<\/span>/);
 assert.match(section,/label="Filter route analysis by day"/);
 assert.match(section,/value=\{scopeDayId \?\? ""\}/);
 assert.ok(section.indexOf('Analysis scope') < section.indexOf('<RouteElevationPanel'));
 assert.doesNotMatch(panel,/Notable terrain day|<select aria-label="Notable terrain day"/);
 assert.match(panel,/id="route-notable-terrain" className="scroll-mt-24 pt-1"/);
 assert.doesNotMatch(panel,/id="route-notable-terrain" className="[^"]*rounded-xl/);
 assert.match(panel,/routeAnalysisScope\(metrics, activeDayId, breaks\)/);
 assert.match(panel,/km\(scope.distanceM\)/);
 assert.match(panel,/scope.knownAscentM/);
 assert.match(panel,/scope.knownDescentM/);
 assert.match(panel,/scope.dayId/);
 assert.match(picker,/variant\?: "default" \| "action" \| "analysis"/);
 assert.match(picker,/role="listbox"/);
});
test('Changed TS/TSX modules transpile without syntax diagnostics',()=>{
 for(const file of [
  'components/builder/TripPlanner/RouteAnalysisSection.tsx',
  'components/builder/TripPlanner/RouteElevationPanel.tsx',
  'components/builder/TripPlanner/StopSelectPicker.tsx',
  'lib/route-analysis-scope.ts',
 ]) {
  const result=ts.transpileModule(read(file),{fileName:file,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext}});
  assert.deepEqual((result.diagnostics||[]).map(e=>ts.flattenDiagnosticMessageText(e.messageText,' ')),[],file);
 }
});
