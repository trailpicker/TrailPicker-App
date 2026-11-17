const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');
const resultStart = source.indexOf('<section aria-labelledby="route-hiking-time-heading"');
const settingsStart = source.indexOf('{settingsOpen && <section id="route-analysis-settings"');
const advancedStart = source.indexOf('<details className="group border-t border-gray-100 px-4 pb-4 pt-4 text-xs text-gray-700 sm:px-5"');
const terrainStart = source.indexOf('<section id="route-notable-terrain"');

test('settings start visible and only the open state receives a second desktop column', () => {
  assert.match(source,/const \[settingsOpen, setSettingsOpen\] = useState\(true\)/);
  assert.match(source,/\$\{settingsOpen \? "lg:grid-cols-\[minmax\(0,1fr\)_minmax\(0,0\.95fr\)\]" : "lg:grid-cols-1"\}/);
  assert.doesNotMatch(source,/max-w-\[760px\]/);
});

test('closing settings removes right column, and advanced controls are nested within it', () => {
  assert.ok(resultStart > 0 && settingsStart > resultStart && advancedStart > settingsStart && terrainStart > advancedStart);
  assert.match(source.slice(resultStart, settingsStart),/aria-label="Hiking time breakdown"/);
  assert.match(source.slice(resultStart, settingsStart),/aria-label="Route fundamentals"/);
  assert.match(source.slice(settingsStart, terrainStart),/<\/section>\}/);
  assert.match(source.slice(settingsStart, advancedStart),/aria-label="Close hiking settings"/);
  assert.doesNotMatch(source.slice(resultStart, settingsStart),/\{settingsOpen &&/);
});

test('the results retain accessible show and hide controls', () => {
  assert.match(source,/!settingsOpen && <button/);
  assert.match(source,/aria-expanded=\{false\}/);
  assert.match(source,/onClick=\{\(\) => setSettingsOpen\(true\)\}/);
  assert.match(source,/Show settings/);
  assert.match(source,/onClick=\{\(\) => setSettingsOpen\(false\)\}/);
});

test('hiking calculations, terrain and advanced features are preserved', () => {
  assert.match(source,/onPaceChange\(option\.pace\)/);
  assert.match(source,/onBreaksChange\(prev =>/);
  assert.match(source,/Advanced settings/);
  assert.match(source,/id="route-notable-terrain"/);
  assert.match(source,/bg-green-800 transition-\[width\]/);
  assert.match(source,/bg-amber-500 transition-\[width\]/);
});

test('component TSX parses', () => {
  const result = ts.transpileModule(source,{fileName:'RouteElevationPanel.tsx',compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.deepEqual((result.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[]);
});

