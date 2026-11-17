const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const map = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/RouteMapInner.tsx'), 'utf8');
const source = fs.readFileSync(path.join(root, 'lib/waypoint-map.ts'), 'utf8');

function renderedMarker(kind, selected, size) {
  const fragment = source.slice(source.indexOf('export function waypointMarkerHtml('));
  const js = ts.transpileModule(fragment, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
  const render = vm.runInNewContext(`${js.replace(/export\s*\{[^}]+\};?/g, '')}\nwaypointMarkerHtml`, {
    waypointType: () => ({ color: '#166534', path: 'M5 21V3' }),
    exports: {},
  });
  return render(kind, 2, selected, size);
}

test('normal, resource, selected and cluster pins have readable Leaflet dimensions', () => {
  assert.match(map, /const size = selected \? 38 : \["camp", "water", "resupply"\]\.includes\(point\.kind\) \? 34 : 32;/);
  assert.match(map, /waypointMarkerHtml\(point\.kind, order, selected, size\)/);
  assert.match(map, /function markerClusterIcon\(count: number\)\s*\{\s*const size = 36;/);
  assert.match(map, /waypointMarkerHtml\("waypoint", 1, false, 32\).*iconSize: \[32, 32\]/);
});

test('actual icon graphics and order badge scale with marker dimensions', () => {
  const waypoint = renderedMarker('waypoint', false, 32);
  const resource = renderedMarker('camp', false, 34);
  const selected = renderedMarker('camp', true, 38);
  assert.match(waypoint, /width:32px;height:32px/);
  assert.match(waypoint, /width="20" height="20"/);
  assert.match(resource, /width:34px;height:34px/);
  assert.match(resource, /width="22" height="22"/);
  assert.match(selected, /width:38px;height:38px/);
  assert.match(selected, /width="24" height="24"/);
  assert.match(selected, /min-width:17px;height:17px/);
  assert.match(selected, /font:700 10px system-ui/);
});

test('clustering, spiderfying and route geometry remain in their original layers', () => {
  assert.match(map, /clusterProjectedStops\(/);
  assert.match(map, /spiderfyOffset\(/);
  assert.match(map, /<StopMarkerLayer points=\{points\}/);
  assert.match(map, /<Polyline key=\{trail \? "mapped" : "direct"\}/);
});

test('modified TS and TSX transpile without syntax diagnostics', () => {
  for (const rel of ['lib/waypoint-map.ts', 'components/builder/TripPlanner/RouteMapInner.tsx']) {
    const compiled = ts.transpileModule(fs.readFileSync(path.join(root, rel), 'utf8'), {
      fileName: rel,
      reportDiagnostics: true,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
    });
    assert.deepEqual((compiled.diagnostics || []).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')), [], rel);
  }
});
