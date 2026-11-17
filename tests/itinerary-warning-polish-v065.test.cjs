const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'lib/itinerary-timing.ts'), 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
});
assert.equal(output.diagnostics.filter(item => item.category === ts.DiagnosticCategory.Error).length, 0);
const imported = {exports:{}};
function clockLabel(total) {
  const minute = ((total % 1440) + 1440) % 1440;
  const hr = Math.floor(minute / 60);
  return `${hr % 12 || 12}:${String(minute % 60).padStart(2,'0')} ${hr < 12 ? 'AM' : 'PM'}${total >= 1440 ? ' (+1d)' : ''}`;
}
const mockRequire = name => name === './route-analysis-insights'
  ? { clockLabel }
  : {};
new Function('module','exports','require',output.outputText)(imported, imported.exports, mockRequire);
const {itineraryTimingIssues, ITINERARY_SCHEDULE_TOLERANCE_MINUTES, ITINERARY_SCHEDULE_WARNING_MINUTES} = imported.exports;
const item = (minutes) => ({
  dayId:'day1',
  stops:[
    {id:'start',name:'Trailhead',scheduledMinutes:480,arrivalMinutes:480,delayMinutes:0},
    {id:'view',name:'Viewpoint Beach',scheduledMinutes:600,arrivalMinutes:600+minutes,delayMinutes:minutes},
  ],
  solar:null,
});
const scheduleIssue = minutes => itineraryTimingIssues(item(minutes),'Day 1').find(issue => issue.category==='schedule');

test('15-minute tolerance: 3, 6 and 15 minutes are not warnings',()=>{
  assert.equal(ITINERARY_SCHEDULE_TOLERANCE_MINUTES,15);
  for(const minutes of [0,3,6,15]) assert.equal(scheduleIssue(minutes),undefined,`${minutes}-minute difference`);
});
test('16–30 minutes is a subdued scheduling advisory',()=>{
  for(const minutes of [16,20,30]) {
    const issue=scheduleIssue(minutes);
    assert.ok(issue);
    assert.equal(issue.severity,'info');
    assert.equal(issue.title,'Tight arrival schedule');
  }
});
test('31+ minutes creates a warning with distinct compact and compatibility text',()=>{
  assert.equal(ITINERARY_SCHEDULE_WARNING_MINUTES,30);
  for(const minutes of [31,83]) {
    const issue=scheduleIssue(minutes);
    assert.ok(issue);
    assert.equal(issue.severity,'warning');
    assert.equal(issue.title,'Scheduled arrival may be too early');
    assert.equal(issue.id,'itinerary-late-day1-view');
    assert.match(issue.inlineMessage,/^Scheduled 10:00 AM · Est\. \d{1,2}:\d{2} AM \(\d+ min later\)$/);
    assert.match(issue.message,/Day 1: Viewpoint Beach · Scheduled/);
    assert.ok(!issue.inlineMessage.includes('Viewpoint Beach'));
  }
});
test('sunset warning remains a warning, with a compact inline form',()=>{
  const day={...item(83),solar:{sunriseMinutes:450,sunsetMinutes:17*60+33,zone:'America/Vancouver'}};
  day.stops[1].arrivalMinutes=22*60+28;
  const issues=itineraryTimingIssues(day,'Day 1');
  const issue=issues.find(x=>x.id==='itinerary-sunset-day1');
  assert.ok(issue);
  assert.equal(issue.severity,'warning');
  assert.equal(issue.title,'Arrival after sunset');
  assert.equal(issue.inlineMessage,'Est. 10:28 PM · Sunset 5:33 PM');
  assert.match(issue.message,/Day 1: Viewpoint Beach/);
});
test('overnight estimate retains +1d formatting; no clock-time arithmetic changed',()=>{
  const day={...item(0),solar:{sunriseMinutes:450,sunsetMinutes:17*60+33,zone:'America/Vancouver'}};
  day.stops[1].arrivalMinutes=1442;
  const sunset=itineraryTimingIssues(day,'Day 1').find(x=>x.category==='daylight'&&x.severity==='warning');
  assert.equal(sunset.inlineMessage,'Est. 12:02 AM (+1d) · Sunset 5:33 PM');
});
test('stop UI shows compact messages and only colors significant ETA differences amber',()=>{
  const ui=fs.readFileSync(path.join(root,'components/builder/TripPlanner/DayStopsItinerary.tsx'),'utf8');
  const compiled=ts.transpileModule(ui,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX},reportDiagnostics:true});
  assert.equal(compiled.diagnostics.filter(item=>item.category===ts.DiagnosticCategory.Error).length,0);
  assert.match(ui,/warning\.inlineMessage \?\? warning\.message/);
  assert.match(ui,/timing\.delayMinutes\) > ITINERARY_SCHEDULE_WARNING_MINUTES/);
  assert.doesNotMatch(ui,/delayMinutes > 5/);
});
