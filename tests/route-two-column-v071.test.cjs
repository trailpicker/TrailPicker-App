const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const panel = read('components/builder/TripPlanner/RouteElevationPanel.tsx');
const timeStart = panel.indexOf('<section aria-labelledby="route-hiking-time-heading"');
const settingsStart = panel.indexOf('<section id="route-analysis-settings" aria-label="Hiking settings"');
const advancedStart = panel.indexOf('<details className="group border-t border-gray-100 px-4 pb-4 pt-4 text-xs text-gray-700 sm:px-5"');
const terrainStart = panel.indexOf('<section id="route-notable-terrain"');

test('desktop two-column cards retain mobile stacking and advanced settings nested inside right card', () => {
  assert.match(panel, /settingsOpen \? "lg:grid-cols-\[minmax\(0,1fr\)_minmax\(0,0\.95fr\)\]" : "lg:grid-cols-1"/);
  assert.ok(timeStart > -1 && settingsStart > timeStart && advancedStart > settingsStart && terrainStart > advancedStart);
  assert.match(panel.slice(timeStart, settingsStart), /rounded-xl border border-gray-200 bg-white p-4 sm:p-5/);
  assert.match(panel.slice(settingsStart, advancedStart), /min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white/);
  assert.doesNotMatch(panel, /max-w-\[760px\]/);
});

test('hiking results are independent of the settings toggle', () => {
  const result=panel.slice(timeStart, settingsStart);
  assert.doesNotMatch(result, /Estimated hiking time/);
  assert.match(result, /<h3 id="route-hiking-time-heading"/);
  assert.match(result, /aria-label="Hiking time breakdown"/);
  assert.match(result, /aria-label="Route fundamentals"/);
  assert.match(result, /\{timeBarTotal > 0/);
  assert.match(result, /Show settings/);
});

test('settings column unmounts on close and keeps controls on open', () => {
  const settings=panel.slice(settingsStart, advancedStart);
  assert.match(panel, /aria-expanded=\{false\}/);
  assert.match(settings, /aria-label="Close hiking settings"/);
  assert.match(settings, /\{breakLabel\.toLowerCase\(\)\} breaks/);
  assert.match(panel, /\{settingsOpen && <section id="route-analysis-settings"/);
  assert.match(settings, /aria-label="Hiking pace"/);
  assert.match(settings, /aria-label="Break duration"/);
  assert.match(settings, /Rest minutes per moving hour/);
});

test('advanced settings are inside the collapsible right-hand settings panel', () => {
  const advanced=panel.slice(advancedStart,terrainStart);
  assert.match(advanced,/Advanced settings/);
  assert.match(advanced,/Advanced level-trail speed/);
  assert.match(advanced,/How time is calculated & compared/);
  assert.match(advanced,/<\/details>\s*<\/section>\}/);
});

test('timing math, colors, lunch behavior and terrain analysis are unaffected', () => {
  assert.match(panel,/const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
  assert.match(panel,/bg-green-800 transition-\[width\]/);
  assert.match(panel,/bg-amber-500 transition-\[width\]/);
  assert.doesNotMatch(panel,/Lunch stop duration|breaks\.lunchMinutes/);
  assert.match(panel,/id="route-notable-terrain"/);
  assert.match(panel,/notableTerrainFindings\(/);
});

test('updated TSX parses', () => {
  const result=ts.transpileModule(panel,{fileName:'RouteElevationPanel.tsx',compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.deepEqual((result.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[]);
});

