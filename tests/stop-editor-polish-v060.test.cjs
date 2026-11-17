const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const src = fs.readFileSync(path.join(__dirname, '..', 'components/builder/TripPlanner/DayStopsItinerary.tsx'), 'utf8');
test('sunrise advisory remains linked to actual solar time and timing issue', () => {
  assert.match(src, /warning\.title === "Departure before sunrise"/);
  assert.match(src, /"Early departure"/);
  assert.match(src, /departure · Sunrise at \$\{clockLabel\(sunriseMinutes\)\}/);
  assert.match(src, /sunriseMinutes=\{dayTiming\.solar\?\.sunriseMinutes \?\? null\}/);
  assert.match(src, /warning\.severity === "warning"/);
});
test('expanded editor follows the bottom rounded border without overflow clipping', () => {
  assert.match(src, /rounded-b-\[11px\] border-t border-gray-100 bg-gray-50\/70 p-3/);
  assert.match(src, /rounded-xl border bg-white shadow-sm/);
});
test('Earlier and Later preserve move actions and have readable enabled/disabled styles', () => {
  assert.match(src, /disabled=\{route\.pending \|\| positionInDay === 0\} onClick=\{\(\) => route\.moveStop\(point\.id, -1\)\}/);
  assert.match(src, /disabled=\{route\.pending \|\| positionInDay === sameDay\.length - 1\} onClick=\{\(\) => route\.moveStop\(point\.id, 1\)\}/);
  for(const label of ['Earlier','Later']) {
    const line=src.split('\n').find(x=>x.includes('>'+label+'</button>'));
    assert.ok(line);
    assert.match(line, /font-medium text-gray-800/);
    assert.match(line, /disabled:bg-gray-50 disabled:text-gray-300/);
  }
});
test('TSX syntax is valid', () => {
  const out=ts.transpileModule(src,{fileName:'DayStopsItinerary.tsx',compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.deepEqual(out.diagnostics.map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[]);
});
