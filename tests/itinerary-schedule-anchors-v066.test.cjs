const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Exercise the actual schedule engine, isolating only its imported route,
// daylight and break services. This permits the small patch to be tested
// without a full Next.js installation.
const source = fs.readFileSync(path.join(__dirname, '../lib/itinerary-timing.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    esModuleInterop: true,
  },
  reportDiagnostics: true,
});
assert.deepEqual(compiled.diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error), []);
const parseClock = value => /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value || '') ? Number(value.slice(0, 2))*60+Number(value.slice(3)) : null;
const clockLabel = total => {
  const m = ((total%1440)+1440)%1440;
  return `${Math.floor(m/60)%12||12}:${String(m%60).padStart(2,'0')} ${m>=720?'PM':'AM'}${total>=1440?' (+1d)':''}`;
};
const mocks = {
  'tz-lookup': () => 'America/Vancouver',
  './overnight-handoffs': {consolidateOvernightStops:points=>({points,replacedIds:{}}),inheritedOvernightForDay:()=>null},
  './route-metrics': {
    computeRouteMetrics: ([prev, next]) => ({
      routedSegments: prev.trailToNext?.toId === next.id ? 1 : 0,
      estimatedMinutes: 60, routedEstimateMinutes: 60,
    }),
  },
  './route-analysis-insights': {
    parseClock, clockLabel,
    approximateDaylight: () => null,
    estimateBreaks: moving => moving === null ? null : ({shortMinutes:0,lunchMinutes:0,totalMinutes:0}),
  },
};
const exportsHolder = {exports:{}};
new Function('module','exports','require',compiled.outputText)(
  exportsHolder, exportsHolder.exports,
  name => { if (!(name in mocks)) throw new Error(`Unexpected import: ${name}`); return mocks[name]; },
);
const {calculateDayItinerary,itineraryTimingIssues,ITINERARY_DEFAULT_BREAKS} = exportsHolder.exports;
const day={id:'d1', date:new Date('2026-11-21T00:00:00Z')};
function route(times=['08:00',null,null,null]) {
  const points=times.map((time,i)=>({id:`s${i}`,dayId:'d1',name:`Stop ${i}`,lat:49+i*.01,lng:-123,kind:'waypoint',time}));
  for(let i=0;i<points.length-1;i++) points[i].trailToNext={toId:points[i+1].id};
  return points;
}
const run=points=>calculateDayItinerary(points,day,4,{...ITINERARY_DEFAULT_BREAKS,lunchMinutes:0});

test('no intermediate schedule: predictions propagate from first departure',()=>{
  assert.deepEqual(run(route()).stops.map(s=>s.arrivalMinutes),[480,540,600,660]);
});
test('later scheduled arrival delays downstream ETAs by the waiting period',()=>{
  const pts=route(['08:00','10:30',null,null]);
  const got=run(pts);
  assert.deepEqual(got.stops.map(s=>s.arrivalMinutes),[480,540,690,750]);
  assert.equal(got.stops[1].scheduledMinutes,630);
  assert.equal(pts[1].time,'10:30');
});
test('earlier schedule never makes a predicted route leg faster',()=>{
  const pts=route(['08:00','08:15',null,null]);
  const got=run(pts);
  assert.deepEqual(got.stops.map(s=>s.arrivalMinutes),[480,540,600,660]);
  assert.equal(got.stops[1].delayMinutes,45);
  assert.ok(itineraryTimingIssues(got,'Day 1').some(i=>i.category==='schedule'));
});
test('stop duration applies after the later of schedule and ETA, not to the arrival itself',()=>{
  const pts=route(['08:00','10:30',null,null]);
  pts[1].stayMinutes=20;
  const got=run(pts);
  assert.deepEqual(got.stops.map(s=>s.arrivalMinutes),[480,540,710,770]);
});
test('an unmapped leg breaks the ETA chain; a later scheduled stop can re-anchor it',()=>{
  const pts=route(['08:00',null,'13:00',null]);
  delete pts[1].trailToNext;
  const got=run(pts);
  assert.deepEqual(got.stops.map(s=>s.arrivalMinutes),[480,540,null,840]);
  assert.equal(got.stops[2].scheduledMinutes,780);
});
test('overnight scheduled arrival uses the following day when the route reaches it near midnight',()=>{
  const pts=route(['22:00','00:20',null,null]);
  const got=run(pts);
  assert.deepEqual(got.stops.map(s=>s.arrivalMinutes),[1320,1380,1520,1580]);
  assert.equal(got.stops[1].scheduledMinutes,1460);
  assert.equal(got.stops[1].delayMinutes,0);
  assert.equal(pts[1].time,'00:20');
});
test('a late-evening commitment before a post-midnight ETA stays on the previous day',()=>{
  const pts=route(['23:30','23:50',null,null]);
  const got=run(pts);
  assert.equal(got.stops[1].arrivalMinutes,1470);
  assert.equal(got.stops[1].scheduledMinutes,1430);
  assert.equal(got.stops[1].delayMinutes,40);
  assert.equal(got.stops[2].arrivalMinutes,1530);
});
test('a too-early same-day schedule is not accidentally advanced to the next morning',()=>{
  const pts=route(['20:00','09:00',null,null]);
  const got=run(pts);
  assert.equal(got.stops[1].scheduledMinutes,540);
  assert.equal(got.stops[1].delayMinutes,720);
  assert.equal(got.stops[2].arrivalMinutes,1320);
});
test('first stop departure stays a departure and ignores stop duration',()=>{
  const pts=route();pts[0].stayMinutes=50;
  assert.equal(run(pts).stops[1].arrivalMinutes,540);
});

