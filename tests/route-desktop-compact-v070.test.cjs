const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root,name),'utf8');
const panel = read('components/builder/TripPlanner/RouteElevationPanel.tsx');
const route = read('components/builder/TripPlanner/TripRoute.tsx');
const analysis = read('components/builder/TripPlanner/RouteAnalysisSection.tsx');
const itineraryDefault = read('lib/itinerary-timing.ts');
const breakModel = read('lib/route-analysis-insights.ts');

test('hiking time and settings are separate desktop columns, stacked on mobile', () => {
  assert.match(panel, /aria-label="Route fundamentals"/);
  assert.match(panel, /aria-label="Hiking time breakdown"/);
  assert.match(panel, /settingsOpen \? "lg:grid-cols-\[minmax\(0,1fr\)_minmax\(0,0\.95fr\)\]" : "lg:grid-cols-1"/);
  assert.match(panel, /aria-labelledby="route-hiking-time-heading"/);
  assert.match(panel, /aria-label="Hiking settings"/);
  assert.match(panel, /grid grid-cols-3 gap-1\.5/);
  assert.match(panel, /grid grid-cols-4 gap-1\.5/);
  assert.doesNotMatch(panel, /grid gap-x-8 gap-y-5 md:grid-cols-2/);
});

test('compact controls share consistent sizing and meaningful labels', () => {
  assert.equal((panel.match(/min-h-\[44px\]/g) || []).length,2);
  assert.match(panel, /aria-pressed=\{option\.pace === paceKmh\}/);
  assert.match(panel, /aria-pressed=\{breaks\.style === value\}/);
  assert.match(panel, /rest minutes per moving hour/i);
  assert.match(panel, /breakRate\} min\/hr/);
  assert.doesNotMatch(panel, /preset\?\.description/);
});

test('settings header is one accessible, clickable toggle with a summary', () => {
  assert.match(panel, /aria-expanded=\{false\}/);
  assert.match(panel, /Show settings/);
  assert.match(panel, /\{breakLabel\.toLowerCase\(\)\} breaks/);
  assert.match(panel, /\{settingsOpen && <section id="route-analysis-settings"/);
});

test('planned lunch is not double-counted in Route Analysis or default itinerary timing', () => {
  assert.doesNotMatch(panel, /Lunch stop duration|days ≥4h moving|breaks\.lunchMinutes/);
  assert.doesNotMatch(panel, /Adjustments update hiking estimates and predicted arrivals/);
  assert.match(itineraryDefault, /ITINERARY_DEFAULT_BREAKS: BreakSettings = \{\s*style: "minimal", customMinutesPerHour: 10, lunchMinutes: 0/);
  assert.match(breakModel, /DEFAULT_BREAK_SETTINGS: BreakSettings = \{\s*style: "normal", customMinutesPerHour: 10, lunchMinutes: 0/);
  assert.match(panel, /const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
  assert.match(route, /useState<BreakSettings>\(\{\.\.\.ITINERARY_DEFAULT_BREAKS\}\)/);
});

test('no unrelated regressions to bar colors or route conflict warning', () => {
  assert.match(panel,/bg-amber-500 transition-\[width\]/);
  assert.match(panel,/bg-green-800 transition-\[width\]/);
  assert.match(analysis,/Reload saved route/);
});

test('modified TypeScript and TSX source parses without errors', () => {
  for (const name of ['components/builder/TripPlanner/RouteElevationPanel.tsx','lib/itinerary-timing.ts','lib/route-analysis-insights.ts']) {
    const result=ts.transpileModule(read(name), {fileName:name,compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
    assert.deepEqual((result.diagnostics || []).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[],name);
  }
});
