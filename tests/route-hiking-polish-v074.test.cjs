const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const source = fs.readFileSync(path.resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');
const left = source.slice(source.indexOf('<section aria-labelledby="route-hiking-time-heading"'), source.indexOf('{settingsOpen && <section id="route-analysis-settings"'));
const right = source.slice(source.indexOf('{settingsOpen && <section id="route-analysis-settings"'), source.indexOf('<section id="route-gradient-analysis"'));

test('only the right-card close button hides open settings, and the left offers show only when closed', () => {
  assert.match(source, /const \[settingsOpen, setSettingsOpen\] = useState\(true\)/);
  assert.match(left, /\{!settingsOpen && <button type="button" onClick=\{\(\) => setSettingsOpen\(true\)\} aria-expanded=\{false\}/);
  assert.match(left, /Show settings/);
  assert.doesNotMatch(left, /Hide settings|setSettingsOpen\(open => !open\)/);
  assert.match(right, /aria-label="Close hiking settings"/);
  assert.match(right, /onClick=\{\(\) => setSettingsOpen\(false\)\}/);
});

test('break duration wording is consistent in visual label and accessible group', () => {
  assert.match(right, />Break duration<\/span>/);
  assert.match(right, /aria-label="Break duration"/);
  assert.doesNotMatch(right, /Break frequency/);
  assert.match(right, /\{breakRate\} min\/hr/);
});

test('hiking results have compact hierarchy with metric alignment and unchanged calculations', () => {
  assert.match(left, /<div className="mt-3">\s*<p className="text-4xl/);
  assert.doesNotMatch(left, /Estimated hiking time/);
  assert.match(left, /<div className="mt-4 space-y-2" aria-label="Hiking time breakdown">/);
  assert.match(left, /<div className="mt-5 flex flex-1 flex-col justify-end">/);
  assert.match(left, /<div className="grid grid-cols-3[^"\n]*" aria-label="Route fundamentals">/);
  assert.match(source, /const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
});

test('advanced settings and card height behavior remain unchanged', () => {
  assert.match(source, /const \[advancedOpen, setAdvancedOpen\] = useState\(false\)/);
  assert.match(source, /settingsOpen && advancedOpen \? "lg:items-start" : "lg:items-stretch"/);
  assert.match(right, /Advanced settings/);
  assert.match(right, /onToggle=\{event => setAdvancedOpen\(event\.currentTarget\.open\)\}/);
  assert.match(right, /Advanced level-trail speed/);
});

test('component TSX parses', () => {
  const result = ts.transpileModule(source, {fileName:'RouteElevationPanel.tsx',compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.deepEqual((result.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[]);
});
