import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateDayItinerary, itineraryTimingIssues, analyzeItineraryTimings, ITINERARY_DEFAULT_BREAKS } from '../lib/itinerary-timing.ts';
import { routeForSave } from '../lib/waypoint-map.ts';
import { readWaypoints } from '../lib/trip-planner.ts';
import { evaluatePackIntelligence } from '../lib/pack-intelligence.ts';

const day={id:'day1',date:new Date('2026-11-21T00:00:00Z'),minTemperature:null,conditions:null,campsite:null,waterCarryL:null,waterSource:null,distanceKm:null,elevationGainM:null};
const coords=[[49.20,-122.98],[49.21,-122.97],[49.22,-122.96],[49.23,-122.95]];
const stops=coords.map(([lat,lng],i)=>({id:`w${i}`,name:`Stop ${i}`,lat,lng,kind:'waypoint',dayId:day.id,elevationM:null}));
function mappedSegment(from,to,distanceM=2000){return {toId:to.id,geometry:[[from.lat,from.lng],[to.lat,to.lng]],distanceM,source:'openrouteservice',elevationsM:[100,100],ascentM:0,descentM:0}}
function route(){const p=structuredClone(stops);for(let i=0;i<p.length-1;i++)p[i].trailToNext=mappedSegment(p[i],p[i+1]);return p}
const breaks={...ITINERARY_DEFAULT_BREAKS,lunchMinutes:0};

test('optional scheduling: no clock time means no fabricated clock-time ETAs',()=>{
 const v=calculateDayItinerary(route(),day,4,breaks);
 assert.equal(v.stops.length,4);assert.equal(v.stops.every(s=>s.arrivalMinutes===null),true);
 assert.equal(v.totalMovingMinutes,90);
 assert.equal(itineraryTimingIssues(v,'Day 1').length,0);
 assert.ok(v.solar?.sunriseMinutes!==null);
});
test('first stop departure anchors subsequent calculated arrivals and responds to pace',()=>{
 const p=route();p[0].time='08:00';
 const fast=calculateDayItinerary(p,day,5,breaks),slow=calculateDayItinerary(p,day,3,breaks);
 assert.equal(fast.stops[0].scheduledMinutes,480);
 assert.equal(fast.stops[1].arrivalMinutes!==null,true);
 assert.ok(fast.stops[3].arrivalMinutes<slow.stops[3].arrivalMinutes);
 assert.ok(fast.stops.every((s,i)=>i===0||s.legMinutes!==null));
});
test('later scheduled arrivals add waiting, earlier ones raise warnings without inventing speed',()=>{
 const p=route();p[0].time='08:00';
 const base=calculateDayItinerary(p,day,4,breaks);
 const predicted=base.stops[1].arrivalMinutes;
 assert.ok(predicted!==null);
 const delayed=structuredClone(p);delayed[1].time='10:30';delayed[1].stayMinutes=20;
 const out=calculateDayItinerary(delayed,day,4,breaks);
 assert.equal(out.stops[1].arrivalMinutes,predicted);
 assert.ok(out.stops[2].arrivalMinutes>base.stops[2].arrivalMinutes);
 const tooEarly=structuredClone(p);tooEarly[1].time='08:10';
 const early=calculateDayItinerary(tooEarly,day,4,breaks);
 assert.ok(early.stops[1].delayMinutes>5);
 assert.ok(itineraryTimingIssues(early,'Day 1').some(issue=>issue.id==='itinerary-late-day1-w1'));
 assert.ok(early.stops[2].arrivalMinutes>=base.stops[2].arrivalMinutes);
});
test('first stop is a departure and does not add a stay delay',()=>{
 const p=route();p[0].time='08:00';
 const base=calculateDayItinerary(p,day,4,breaks);p[0].stayMinutes=40;
 const withStay=calculateDayItinerary(p,day,4,breaks);
 assert.equal(withStay.stops[1].arrivalMinutes,base.stops[1].arrivalMinutes);
});
test('unmapped or cross-day legs break the ETA chain; later fixed anchors can resume it',()=>{
 const p=route();p[0].time='08:00';delete p[1].trailToNext;
 const incomplete=calculateDayItinerary(p,day,4,breaks);
 assert.equal(incomplete.stops[1].arrivalMinutes!==null,true);
 assert.equal(incomplete.stops[2].arrivalMinutes,null);
 assert.equal(incomplete.stops[3].arrivalMinutes,null);
 const later=structuredClone(p);later[2].time='12:00';
 const anchored=calculateDayItinerary(later,day,4,breaks);
 assert.equal(anchored.stops[2].arrivalMinutes,null);
 assert.ok(anchored.stops[3].arrivalMinutes!==null);
 assert.equal(anchored.stops[2].missingLeg,true);
 const cross=route();cross[2].dayId='day2';cross[0].time='08:00';
 assert.equal(calculateDayItinerary(cross,day,4,breaks).stops.at(-1)?.arrivalMinutes,null);
});
test('solar warning appears only when predicted ETA crosses sunset, and is based on date not forecast',()=>{
 const p=route();p[0].time='17:00';
 const v=calculateDayItinerary(p,day,4,breaks);
 const issues=itineraryTimingIssues(v,'Day 1');
 assert.ok(issues.some(i=>i.id==='itinerary-sunset-day1'&&i.severity==='warning'));
 const noDeparture=calculateDayItinerary(route(),day,4,breaks);
 assert.ok(!itineraryTimingIssues(noDeparture,'Day 1').some(i=>i.id.includes('sunset')));
});
test('optional stop duration round-trips through existing route JSON, with validation',()=>{
 const p=route();p[0].time='08:00';p[1].stayMinutes=30;
 const saved=routeForSave(p),hydrated=readWaypoints(JSON.parse(JSON.stringify(saved)));
 assert.equal(hydrated[1].stayMinutes,30);
 assert.equal(hydrated[0].time,'08:00');
 assert.throws(()=>routeForSave([{...p[0],stayMinutes:241}]),/duration/);
 assert.equal(readWaypoints([{...p[0],stayMinutes:-5}]).length,0);
});
test('compatibility intelligence reports real itinerary warnings using the same IDs as inline notices',()=>{
 const p=route();p[0].time='17:00';
 const build={people:1,minTemperature:null,conditions:null,startDate:day.date,endDate:day.date,routeWaypoints:p};
 const issues=analyzeItineraryTimings(p,[day],4,breaks).issues;
 assert.ok(issues.some(i=>i.id==='itinerary-sunset-day1'));
 const r=evaluatePackIntelligence(build,[],[day],null,{paceKmh:4,breaks});
 const found=r.findings.find(f=>f.id==='itinerary-sunset-day1');
 assert.ok(found);assert.equal(found.section,'planning');assert.equal(found.level,'review');
});
test('UI places daylight in forecast, pace in shared state, and keeps note/subheading',async()=>{
 const {readFileSync}=await import('node:fs');
 const {fileURLToPath}=await import('node:url');
 const root=fileURLToPath(new URL('../',import.meta.url));
 const daily=readFileSync(root+'components/builder/TripPlanner/DayStopsItinerary.tsx','utf8');
 const analysis=readFileSync(root+'components/builder/TripPlanner/RouteElevationPanel.tsx','utf8');
 const route=readFileSync(root+'components/builder/TripPlanner/TripRoute.tsx','utf8');
 assert.match(daily,/InlineDaySummary/);assert.match(daily,/DayNote/);
 assert.match(daily,/Day forecast/);assert.match(daily,/Sunrise/);assert.match(daily,/Sunset/);
 assert.match(daily,/firstInDay \? "Departure time \(optional\)"/);
 assert.doesNotMatch(analysis,/Plan your hiking days|Daily hiking analysis/);
 assert.match(analysis,/Terrain & gradient/);assert.match(route,/breakSettings/);
});
