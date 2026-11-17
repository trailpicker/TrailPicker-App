import test from 'node:test';
import assert from 'node:assert/strict';
import { classicNaismithMinutes, sacReferenceMinutes, toblerKmh,
  gradeAdjustedSpeedKmh, estimateWalkingTime } from '../lib/hiking-time.ts';
import { computeRouteMetrics, DEFAULT_HIKING_PACE_KMH } from '../lib/route-metrics.ts';

const pointsFor = (distance, gain, spacing=100) => {
  const samples=[];
  const count=Math.round(distance/spacing);
  for(let i=0;i<=count;i++) {
    const x=distance*i/count;
    samples.push({distanceM:x,elevationM:650+gain*i/count});
  }
  return samples;
};
test('Tobler baseline and directional walking speeds', () => {
  assert.ok(Math.abs(toblerKmh(0)-5.036) < .02);
  assert.ok(toblerKmh(-.05)>toblerKmh(0));
  assert.ok(toblerKmh(-.25)<toblerKmh(0));
  assert.ok(gradeAdjustedSpeedKmh(.10,4)<4);
  assert.ok(gradeAdjustedSpeedKmh(-.05,4)>4);
  assert.throws(()=>gradeAdjustedSpeedKmh(0,0),RangeError);
});
test('real recorded geometry uses slope rather than adding ascent twice', () => {
  const distance=14770, ascent=1309, samples=pointsFor(distance,ascent);
  const estimated=estimateWalkingTime(distance,ascent,4,samples);
  assert.equal(estimated.method,'terrain');
  assert.ok(estimated.slopeDistanceM/distance > .98);
  assert.ok(estimated.minutes >= 295 && estimated.minutes <= 330, JSON.stringify(estimated));
  assert.ok(estimated.minutes < Math.round((distance/1000/4+ascent/600)*60));
  // 14.77km, +1309m, 5h moving, 1h rest is an *observed example*;
  // it is not used as a fitted constant in the implementation.
});
test('flat versus steep or downhill with identical trail length', () => {
  const flat=estimateWalkingTime(2000,0,4,pointsFor(2000,0));
  const climb=estimateWalkingTime(2000,400,4,pointsFor(2000,400));
  const easyDown=estimateWalkingTime(2000,0,4,pointsFor(2000,-100));
  const sharpDown=estimateWalkingTime(2000,0,4,pointsFor(2000,-600));
  assert.ok(climb.minutes>flat.minutes);
  assert.ok(easyDown.minutes<flat.minutes);
  assert.ok(sharpDown.minutes>flat.minutes);
});
test('sparse sample gaps do not imply invented slope; fallback is explicit', () => {
  const sparse=estimateWalkingTime(2500,200,4,[{distanceM:0,elevationM:100},{distanceM:2500,elevationM:300}]);
  assert.equal(sparse.method,'naismith');
  assert.equal(sparse.slopeDistanceM,0);
  assert.equal(sparse.minutes,Math.round((2.5/4+200/600)*60));
  const broken=estimateWalkingTime(1000,400,4,[{distanceM:0,elevationM:100},{distanceM:100,elevationM:120},{distanceM:900,elevationM:480},{distanceM:1000,elevationM:500}]);
  assert.equal(broken.method,'naismith');
  assert.throws(()=>estimateWalkingTime(-1,0,4,null),RangeError);
});
test('established reference rules are distinguishable, not blended',()=>{
  assert.equal(classicNaismithMinutes(14770,1309),308);
  assert.equal(sacReferenceMinutes(14770,1309,0),418);
});
test('route/day times share slope model and preserve incomplete day boundaries',()=>{
  assert.equal(DEFAULT_HIKING_PACE_KMH,4);
  const a={id:'a',name:'a',lat:49.1,lng:-123.1,dayId:'one',kind:'waypoint',elevationM:null};
  const b={id:'b',name:'b',lat:49.2,lng:-123.2,dayId:'one',kind:'waypoint',elevationM:null};
  const c={id:'c',name:'c',lat:49.20001,lng:-123.2,dayId:'two',kind:'waypoint',elevationM:null};
  const samples=pointsFor(14000,1200,100);
  a.trailToNext={toId:'b',geometry:samples.map(s=>[a.lat+(b.lat-a.lat)*s.distanceM/14000,a.lng+(b.lng-a.lng)*s.distanceM/14000]),distanceM:14000,elevationsM:samples.map(s=>s.elevationM),ascentM:1200,descentM:0,source:'gpx'};
  b.trailToNext={toId:'c',geometry:[[b.lat,b.lng],[c.lat,c.lng]],distanceM:2,elevationsM:[1850,1851],ascentM:1,descentM:0,source:'gpx'};
  const r=computeRouteMetrics([a,b,c],[{id:'one'},{id:'two'}]);
  assert.ok(r.estimatedMinutes>0);
  assert.ok(r.terrainTimeDistanceM>13000);
  assert.equal(r.dayMetrics[0].estimatedMinutes,null);
  assert.ok(r.dayMetrics[0].routedEstimateMinutes>0);
  assert.equal(r.dayMetrics[0].unresolvedLinks,1);
});
