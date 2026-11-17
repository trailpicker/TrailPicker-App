const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const original=require.extensions['.ts'];
require.extensions['.ts']=function(mod,file){const source=fs.readFileSync(file,'utf8'); const code=ts.transpileModule(source,{fileName:file,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;mod._compile(code,file);};
const handoffs=require('../lib/overnight-handoffs.ts');
const {computeRouteMetrics}=require('../lib/route-metrics.ts');
require.extensions['.ts']=original;
const days=[{id:'d1',date:new Date('2027-07-15')},{id:'d2',date:new Date('2027-07-16')},{id:'d3',date:new Date('2027-07-17')}];
const camp=(id,day,name='Kees and Claire Hut',lat=49.25,lng=-123.15)=>({id,dayId:day,name,kind:'camp',lat,lng,elevationM:null});
const waypoint=(id,day,lat=49.26,lng=-123.14)=>({...camp(id,day,id,lat,lng),kind:'waypoint'});
const route=(from,to)=>({toId:to.id,geometry:[[from.lat,from.lng],[to.lat,to.lng]],distanceM:1500,elevationsM:[100,120],ascentM:20,descentM:0,source:'openrouteservice'});

test('duplicate overnight stops become one waypoint and preserve the following morning departure and outgoing mapped leg',()=>{
 const a=waypoint('a','d1',49.248,-123.152), first=camp('camp-a','d1');
 const duplicate={...camp('camp-b','d2'),time:'08:30',note:'Early morning start'};
 const b=waypoint('b','d2');a.trailToNext=route(a,first);duplicate.trailToNext=route(duplicate,b);
 const {points,replacedIds}=handoffs.consolidateOvernightStops([a,first,duplicate,b],days);
 assert.equal(points.length,3);
 assert.equal(points[1].id,'camp-a');
 assert.equal(replacedIds['camp-b'],'camp-a');
 assert.equal(points[1].nextDayDepartureTime,'08:30');
 assert.equal(points[1].nextDayDepartureNote,'Early morning start');
 assert.equal(points[1].trailToNext.toId,'b');
 const inherited=handoffs.inheritedOvernightForDay(points,days,'d2');
 assert.equal(inherited.point,points[1]);
 assert.equal(inherited.fromDayNumber,1);
 assert.equal(inherited.toDayNumber,2);
 const day2=computeRouteMetrics(points,days).dayMetrics[1];
 assert.equal(day2.segments,1);
 assert.equal(day2.distanceM,1500);
 assert.equal(day2.unresolvedLinks,0);
});

test('new trips inherit the end of the preceding day automatically with no additional saved point',()=>{
 const first=camp('hut','d1');const next=waypoint('next','d2');first.trailToNext=route(first,next);
 const points=[first,next];
 assert.equal(handoffs.inheritedOvernightForDay(points,days,'d2').point.id,'hut');
 assert.equal(points.length,2);
 const choices=handoffs.campsiteChoices(points,days).choices;
 assert.equal(choices.length,1);
 assert.equal(choices[0].dayLabel,'Night 1 · Day 1 → Day 2');
});

test('different explicitly placed next-day trailheads override inherited overnight',()=>{
 const first=camp('hut','d1');const trail={...waypoint('shuttle-trailhead','d2'),kind:'trailhead'};
 assert.equal(handoffs.inheritedOvernightForDay([first,trail],days,'d2'),null);
});

test('do not merge different campsites, nonconsecutive days, shaped loops, or multiple nights at same site',()=>{
 const first=camp('hut1','d1');
 const other=camp('hut2','d2','Another campground',49.3,-123.1);
 assert.equal(handoffs.consolidateOvernightStops([first,other],days).points.length,2);
 const skip=camp('hut3','d3');
 assert.equal(handoffs.consolidateOvernightStops([first,skip],days).points.length,2);
 const via={...first,viaToNext:[[49.251,-123.151]]};
 assert.equal(handoffs.consolidateOvernightStops([via,camp('dup','d2')],days).points.length,2);
 const twoNights=[first,camp('dup','d2'),camp('third','d3')];
 const result=handoffs.consolidateOvernightStops(twoNights,days);
 assert.equal(result.points.length,2); // Night 1 handoff only; the second night is a real overnight.
});

test('saved app UI uses one contextual campsite choice and has no legacy notes field',()=>{
 const manager=fs.readFileSync(path.join(__dirname,'../components/builder/TripPlanner/PermitReservationManager.tsx'),'utf8');
 const logistics=fs.readFileSync(path.join(__dirname,'../components/builder/TripPlanner/TripLogistics.tsx'),'utf8');
 const itinerary=fs.readFileSync(path.join(__dirname,'../components/builder/TripPlanner/DayStopsItinerary.tsx'),'utf8');
 assert.match(manager,/StopSelectPicker label="Itinerary campground"/);
 assert.match(manager,/detail:stop\.dayLabel/);
 assert.doesNotMatch(logistics,/Previous notes \(preserved\)/);
 assert.match(itinerary,/inherited=\{handoff\}/);
 assert.doesNotMatch(itinerary,/function InheritedOvernightStart/);
 assert.match(itinerary,/nextDayDepartureTime/);
});
