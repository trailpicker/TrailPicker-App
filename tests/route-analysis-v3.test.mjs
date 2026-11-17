import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeTerrain, approximateDaylight, checkDaySchedule, clockLabel,
  DEFAULT_BREAK_SETTINGS, estimateBreaks, parseClock,
} from "../lib/route-analysis-insights.ts";
import { computeRouteMetrics } from "../lib/route-metrics.ts";

const sample = (distanceM, elevationM) => ({ distanceM, elevationM });

test("break frequency is separate from pace; lunch is planned in the itinerary", () => {
  assert.deepEqual(estimateBreaks(300), { shortMinutes: 50, lunchMinutes: 0, totalMinutes: 50 });
  assert.deepEqual(estimateBreaks(300, {...DEFAULT_BREAK_SETTINGS, style: "minimal"}), {shortMinutes: 25, lunchMinutes: 0, totalMinutes: 25});
  assert.deepEqual(estimateBreaks(300, {...DEFAULT_BREAK_SETTINGS, style: "frequent"}), {shortMinutes: 75, lunchMinutes: 0, totalMinutes: 75});
  assert.deepEqual(estimateBreaks(300, {...DEFAULT_BREAK_SETTINGS, style: "custom", customMinutesPerHour: 25, lunchMinutes: 0}), {shortMinutes: 125, lunchMinutes: 0, totalMinutes: 125});
  assert.deepEqual(estimateBreaks(239), {shortMinutes: 40, lunchMinutes: 0, totalMinutes: 40});
  assert.equal(estimateBreaks(null), null);
  assert.equal(estimateBreaks(-5), null);
  const twoDays = estimateBreaks(300).totalMinutes + estimateBreaks(120).totalMinutes;
  assert.equal(twoDays, 70, "the default only adds short breaks, not a hidden lunch stop");
  assert.deepEqual(estimateBreaks(300, {...DEFAULT_BREAK_SETTINGS, lunchMinutes: 30}),
    {shortMinutes: 50, lunchMinutes: 30, totalMinutes: 80}, "explicit lunch options remain compatible with callers");
});

test("break settings clamp invalid values to avoid bogus times", () => {
  const r = estimateBreaks(60, {style:"custom", customMinutesPerHour:900, lunchMinutes:1000, lunchThresholdMinutes:0});
  assert.deepEqual(r,{shortMinutes:30,lunchMinutes:120,totalMinutes:150});
});

test("terrain windows identify sustained climbs, descents, and bands from contiguous samples", () => {
  // Each 100 m sample rises 20m over 600m, then falls 20m over 600m.
  const sections = [[...Array.from({length:7}, (_,i)=>sample(i*100, 100+i*20)),
    ...Array.from({length:6},(_,i)=>sample((i+7)*100, 220-(i+1)*20))]];
  const a = analyzeTerrain(sections,["one"]);
  assert.equal(a.analyzedDistanceM, 1200);
  assert.equal(a.steepDistanceM, 1200);
  assert.equal(a.gentleDistanceM, 0);
  assert.ok(a.hardestClimb);
  assert.ok(a.hardestDescent);
  assert.equal(a.hardestClimb.direction,"climb");
  assert.equal(a.hardestClimb.startM,0);
  assert.equal(a.hardestClimb.endM,600);
  assert.equal(a.hardestClimb.gainM,120);
  assert.equal(a.hardestClimb.dayId,"one");
  assert.equal(a.hardestDescent.startM,600);
  assert.equal(a.hardestDescent.endM,1200);
});

test("sparse, gapped and disconnected profile samples do not fabricate slopes", () => {
  const a=analyzeTerrain([
    [sample(0,100),sample(1000,700)], // 1km jump must not imply uniform grade
    [sample(2000,150),sample(2100,155),sample(2200,160)],
    [sample(5000,100),sample(5100,105),sample(5200,110)],
  ],["one","one","two"]);
  assert.equal(a.analyzedDistanceM,400);
  assert.equal(a.hardestClimb,null);
  assert.equal(a.hardestDescent,null);
  assert.equal(a.totalProfileDistanceM,1400);
  assert.ok(a.cells.every(c=>c.endM-c.startM <= 200));
});

test("no grades merge across day assignment boundaries", () => {
  const one=[0,100,200,300].map(d => sample(d,100+d*.2));
  const two=[300,400,500,600].map(d => sample(d,160+(d-300)*.2));
  const r=analyzeTerrain([one,two],["day-a","day-b"]);
  assert.equal(r.hardestClimb,null,"each day has only 300 m, not 600 m sustained");
});

test("approximate daylight returns plausible local civil times in Vancouver in winter and summer", () => {
  const winter=approximateDaylight("2026-11-14",49.25,-123.1,"America/Vancouver");
  assert.ok(winter.sunriseMinutes > 420 && winter.sunriseMinutes < 480, JSON.stringify(winter));
  assert.ok(winter.sunsetMinutes > 960 && winter.sunsetMinutes < 1030, JSON.stringify(winter));
  const summer=approximateDaylight("2026-07-14",49.25,-123.1,"America/Vancouver");
  assert.ok(summer.sunriseMinutes < winter.sunriseMinutes);
  assert.ok(summer.sunsetMinutes > winter.sunsetMinutes);
  assert.equal(approximateDaylight("bad",49,-123,"America/Vancouver").sunsetMinutes,null);
  assert.equal(approximateDaylight("2026-11-14",49,-123,"Not/AZone").sunsetMinutes,null);
});

test("daylight checks flag tight finishing and schedule conflicts", () => {
  const solar={sunriseMinutes:440,sunsetMinutes:990,zone:"America/Vancouver"};
  const okay=checkDaySchedule("09:00",300,solar,"17:30");
  assert.equal(okay.finishMinutes,840);
  assert.equal(okay.status,"before-sunset");
  assert.equal(okay.arrivalConflict,false);
  const tight=checkDaySchedule("12:00",240,solar,"15:00");
  assert.equal(tight.status,"tight-daylight");
  assert.equal(tight.arrivalConflict,true);
  const late=checkDaySchedule("14:00",240,solar);
  assert.equal(late.status,"after-sunset");
  assert.equal(checkDaySchedule("???",200,solar),null);
  assert.equal(checkDaySchedule("08:00",null,solar),null);
  assert.equal(parseClock("24:00"),null);
  assert.equal(parseClock("09:30"),570);
  assert.equal(clockLabel(990),"4:30 PM");
  assert.equal(clockLabel(1510),"1:10 AM (+1d)");
});

const p = (id, dayId, lat, lng) => ({id, name:id, lat, lng, kind:"waypoint", elevationM:null, dayId});
test("an unassigned cross-day leg even shorter than 10m blocks a fully verified day schedule", () => {
  const a=p("a","day1",49.2,-123.2), b=p("b","day1",49.2005,-123.2), c=p("c","day2",49.20051,-123.2);
  a.trailToNext={toId:b.id,geometry:[[a.lat,a.lng],[b.lat,b.lng]],distanceM:500,elevationsM:[100,150],source:"gpx"};
  b.trailToNext={toId:c.id,geometry:[[b.lat,b.lng],[c.lat,c.lng]],distanceM:2,elevationsM:[150,151],source:"gpx"};
  const metrics=computeRouteMetrics([a,b,c],[{id:"day1"},{id:"day2"}]);
  assert.equal(metrics.dayMetrics[0].estimatedMinutes,null);
  assert.equal(metrics.dayMetrics[0].unresolvedLinks,1);
  assert.equal(metrics.unassignedDayDistanceM,2);
  assert.ok(metrics.dayMetrics[0].routedEstimateMinutes > 0);
});

