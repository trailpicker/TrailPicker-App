const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = (filename) => fs.readFileSync(path.join(root,filename), 'utf8');
const { routeLegStyle } = require('../lib/route-leg-style.ts');

test('mapped route is solid green and fully visible in edit mode even with a different day selected', () => {
  const style = routeLegStyle({ mapped:true, editing:true, activeDayId:'day-1', startDayId:'day-2', endDayId:'day-2' });
  assert.equal(style.color, '#166534');
  assert.equal(style.dashArray, undefined);
  assert.equal(style.weight, 6);
  assert.ok(style.opacity >= 0.95);
});

test('mapped route remains solid green while editing with no selected day', () => {
  const style = routeLegStyle({ mapped:true, editing:true });
  assert.equal(style.color, '#166534');
  assert.equal(style.dashArray, undefined);
  assert.ok(style.opacity >= 0.95);
});

test('unrouted connections stay visibly dashed amber, not misrepresented as mapped trails', () => {
  for (const activeDayId of ['day-1', null]) {
    const style = routeLegStyle({ mapped:false, editing:true, activeDayId, startDayId:'day-2', endDayId:'day-2' });
    assert.equal(style.color, '#d97706');
    assert.equal(style.dashArray, '6 8');
    assert.equal(style.weight, 4);
    assert.ok(style.opacity >= 0.95);
  }
});

test('view mode preserves original day highlighting and route color/styling', () => {
  const start = { activeDayId:'day-1', startDayId:'day-2', endDayId:'day-2', editing:false };
  assert.deepEqual(routeLegStyle({ ...start, mapped:true }), { color:'#166534', dashArray:undefined, weight:5, opacity:0.19 });
  assert.deepEqual(routeLegStyle({ ...start, mapped:false }), { color:'#d97706', weight:3, dashArray:'6 8', opacity:0.18 });
  assert.deepEqual(routeLegStyle({ mapped:true, editing:false, activeDayId:'day-1', startDayId:'day-1', endDayId:'day-1' }), { color:'#166534',dashArray:undefined, weight:6, opacity:0.9 });
  assert.deepEqual(routeLegStyle({ mapped:false, editing:false, activeDayId:null }), { color:'#d97706',weight:3,dashArray:'6 8',opacity:0.8 });
});

test('RouteMap receives the explicit editing state and applies the shared polyline style', () => {
  const route=read('components/builder/TripPlanner/TripRoute.tsx');
  const map=read('components/builder/TripPlanner/RouteMapInner.tsx');
  assert.match(route, /<RouteMap[\s\S]*?editing=\{canEdit\}/);
  assert.match(map, /editing\?: boolean/);
  assert.match(map, /routeLegStyle\(\{\s*mapped: !!trail,\s*editing,\s*activeDayId/);
  assert.match(map, /usableTrailSegment\(point, next\)/);
  assert.match(map, /<FitRoute points=\{points\} fallback=\{fallback\} \/>/);
});

test('modified TypeScript source parses', () => {
  for (const filename of ['lib/route-leg-style.ts','components/builder/TripPlanner/RouteMapInner.tsx','components/builder/TripPlanner/TripRoute.tsx']) {
    const result = ts.transpileModule(read(filename), { fileName:filename, compilerOptions: { target:ts.ScriptTarget.ES2022, module:ts.ModuleKind.ESNext, jsx:ts.JsxEmit.ReactJSX }, reportDiagnostics:true });
    assert.deepEqual((result.diagnostics || []).map(e => ts.flattenDiagnosticMessageText(e.messageText,' ')), [], filename);
  }
});
