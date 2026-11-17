const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = fs.readFileSync(path.resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');
const left = source.slice(source.indexOf('<section aria-labelledby="route-hiking-time-heading"'), source.indexOf('{settingsOpen && <section id="route-analysis-settings"'));

test('Hiking time heading and estimate are directly grouped without repeated label', () => {
  assert.match(left, /<h3 id="route-hiking-time-heading" className="text-lg font-semibold text-gray-950">Hiking time<\/h3>/);
  assert.match(left, /<div className="mt-3">\s*<p className="text-4xl font-bold tracking-tight tabular-nums text-gray-950">/);
  assert.doesNotMatch(left, /Estimated hiking time/);
});

test('bar stays close to the estimate and metric row is aligned to the card bottom', () => {
  assert.match(left, /className="mt-4 space-y-2" aria-label="Hiking time breakdown"/);
  assert.match(left, /className="flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-4 sm:p-5"/);
  assert.match(left, /className="mt-5 flex flex-1 flex-col justify-end"/);
  assert.match(left, /className="grid grid-cols-3 gap-x-3 gap-y-2 border-t border-gray-100 pt-4" aria-label="Route fundamentals"/);
});

test('advanced expansion and settings collapse still control height independently', () => {
  assert.match(source, /settingsOpen && advancedOpen \? "lg:items-start" : "lg:items-stretch"/);
  assert.match(source, /settingsOpen \? "lg:grid-cols-\[minmax\(0,1fr\)_minmax\(0,0\.95fr\)\]" : "lg:grid-cols-1"/);
  assert.match(source, /Show settings/);
  assert.match(source, /aria-label="Close hiking settings"/);
});

test('calculations and terrain analysis remain unchanged and TSX parses', () => {
  assert.match(source, /const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
  assert.match(source, /id="route-notable-terrain"/);
  const result = ts.transpileModule(source, {fileName:'RouteElevationPanel.tsx',compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.deepEqual((result.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[]);
});

