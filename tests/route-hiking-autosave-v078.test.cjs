const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const source = (name) => fs.readFileSync(path.join(root, name), 'utf8');

function compileRouteTiming() {
  const filename = path.join(root, 'lib/route-timing-preferences.ts');
  const result = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    fileName: filename, reportDiagnostics: true,
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  });
  assert.deepEqual((result.diagnostics || []).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')), []);
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  mod.require = (name) => {
    if (name === './route-metrics') return { DEFAULT_HIKING_PACE_KMH: 4 };
    if (name === './itinerary-timing') return { ITINERARY_DEFAULT_BREAKS: {
      style: 'minimal', customMinutesPerHour: 10, lunchMinutes: 0, lunchThresholdMinutes: 240,
    } };
    return require(name);
  };
  mod._compile(result.outputText, filename);
  return mod.exports;
}
const timing = compileRouteTiming();
const sample = { paceKmh: 4.5, breaks: { style: 'custom', customMinutesPerHour: 20, lunchMinutes: 45, lunchThresholdMinutes: 300 } };

test('legacy builds load defaults and saved preferences round-trip', () => {
  assert.equal(timing.readRouteTimingPreferences(null).paceKmh, 4);
  assert.equal(timing.readRouteTimingPreferences({}).breaks.style, 'minimal');
  assert.deepEqual(timing.readRouteTimingPreferences({ phase6: { water: 1 }, routeTiming: sample }), sample);
});

test('malformed old data falls back safely, while invalid writes are rejected', () => {
  const invalid = [
    { ...sample, paceKmh: 0 },
    { ...sample, paceKmh: 9 },
    { ...sample, paceKmh: '4' },
    { ...sample, paceKmh: NaN },
    { ...sample, breaks: { ...sample.breaks, style: 'extreme' } },
    { ...sample, breaks: { ...sample.breaks, customMinutesPerHour: 900 } },
    { ...sample, breaks: { ...sample.breaks, lunchMinutes: -1 } },
  ];
  for (const data of invalid) {
    assert.throws(() => timing.validateRouteTimingPreferences(data));
    assert.equal(timing.readRouteTimingPreferences({ routeTiming: data }).paceKmh, 4);
  }
  assert.deepEqual(timing.validateRouteTimingPreferences({ ...sample, unknown: 3, breaks: { ...sample.breaks, unknown: true } }), sample);
});

test('server action validates, authenticates, merges logistics and tracks a revision', () => {
  const action = source('lib/trip-planner-actions.ts');
  assert.match(action, /export async function saveRouteTimingPreferences\(f: FormData\)/);
  assert.match(action, /await requireBuildAccess\(buildId\)/);
  assert.match(action, /validateRouteTimingPreferences\(/);
  assert.match(action, /mutateBuildWithRevision\(buildId, access\.userId, "route-timing"/);
  assert.match(action, /\.\.\.root, \[ROUTE_TIMING_KEY\]: settings/);
  assert.match(action, /revalidatePath\(`\/build\/\$\{buildId\}`\)/);
  assert.match(source('lib/tracked-build-actions.ts'), /export const saveRouteTimingPreferences = \(form: FormData\) => trackBuildSave/);
});

test('client restores saved settings and debounces changes, with no autosave on read-only builds', () => {
  const client = source('components/builder/TripPlanner/TripRoute.tsx');
  assert.match(client, /useState\(\(\) => readRouteTimingPreferences\(tripLogistics\)\.paceKmh\)/);
  assert.match(client, /useState<BreakSettings>\(\(\) => readRouteTimingPreferences\(tripLogistics\)\.breaks\)/);
  assert.match(client, /if \(readOnly\) return;/);
  assert.match(client, /window\.setTimeout\(\(\) => \{ void saveLatest\(\); \}, 450\)/);
  assert.match(client, /while \(JSON\.stringify\(latestTimingRef\.current\) !== persistedTimingKey\.current\)/);
  assert.match(client, /markBuildDirty\(buildId, "route-timing"/);
  assert.match(client, /clearBuildDirty\(buildId, "route-timing"\)/);
  assert.match(client, /await saveRouteTimingPreferences\(form\)/);
  assert.match(client, /void flushTimingRef\.current\(\)/);
  assert.match(client, /detail:\{buildId,points,paceKmh,breakSettings\}/);
});

test('changed TS and TSX files parse cleanly', () => {
  for (const name of [
    'components/builder/TripPlanner/TripRoute.tsx',
    'lib/trip-planner-actions.ts',
    'lib/tracked-build-actions.ts',
    'lib/route-timing-preferences.ts',
  ]) {
    const transpiled = ts.transpileModule(source(name), {
      fileName: name, reportDiagnostics: true,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
    });
    assert.deepEqual((transpiled.diagnostics || []).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')), [], name);
  }
});
