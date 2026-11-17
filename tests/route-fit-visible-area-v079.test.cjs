const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const fit = require('../lib/route-visible-fit.ts');

const map = { left: 0, top: 50, right: 900, bottom: 750 };
const drawer = height => ({ left: 0, right: 900, bottom: 750, top: 750 - height });

test('closed drawer leaves Fit Route padding unchanged', () => {
  assert.equal(fit.coveredMapBottomPx(map, null), 0);
  assert.deepEqual(fit.routeFitPadding(0), { padding: [44, 44] });
});

test('open profile is excluded from the fitted route viewport', () => {
  assert.equal(fit.coveredMapBottomPx(map, drawer(247)), 247);
  assert.deepEqual(fit.routeFitPadding(247), {
    paddingTopLeft: [44, 44],
    paddingBottomRight: [44, 291],
  });
});

test('uses the actual on-screen dock height rather than assumed 30% height', () => {
  for (const actualHeight of [185, 247, 410, 530]) {
    const measured = fit.coveredMapBottomPx(map, drawer(actualHeight));
    assert.equal(measured, actualHeight);
    assert.equal(fit.routeFitPadding(measured).paddingBottomRight[1], 44 + actualHeight);
  }
});

test('only overlapping bottom dock space is reserved', () => {
  assert.equal(fit.coveredMapBottomPx(map, { left: 901, right: 1200, top: 500, bottom: 750 }), 0);
  assert.equal(fit.coveredMapBottomPx(map, { left: 0, right: 900, top: 200, bottom: 400 }), 0);
  assert.equal(fit.coveredMapBottomPx(map, { left: 0, right: 900, top: 520, bottom: 900 }), 230);
  assert.equal(fit.coveredMapBottomPx(map, { left: 0, right: 900, top: 20, bottom: 900 }), 700);
});

test('Fit Route gets the dock bounds at click time, and compensates for single markers', () => {
  const mapSource = read('components/builder/TripPlanner/RouteMapInner.tsx');
  const dockSource = read('components/builder/TripPlanner/ResizableElevationDock.tsx');
  const fitStart = mapSource.indexOf('function FitRoute(');
  const fitEnd = mapSource.indexOf('function StopMarker(', fitStart);
  const handler = mapSource.slice(fitStart, fitEnd);
  assert.match(dockSource, /data-route-elevation-dock/);
  assert.match(handler, /querySelector<HTMLElement>\("\[data-route-elevation-dock\]"\)/);
  assert.match(handler, /getBoundingClientRect\(\)/);
  assert.match(handler, /coveredMapBottomPx\(/);
  assert.match(handler, /\.\.\.routeFitPadding\(coveredBottom\)/);
  assert.match(handler, /map\.panBy\(\[0, coveredBottom \/ 2\], \{ animate: false \}\)/);
  assert.match(handler, /if \(coveredBottom > 0\)/);
  assert.match(handler, /map\.setView\(center, zoom\);/);
  assert.match(mapSource, /<FitRoute points=\{points\} fallback=\{fallback\} \/>/);
  assert.match(dockSource, /calc\(100% - 170px\)/);
});

test('new source files transpile as TS/TSX', () => {
  const names = [
    'lib/route-visible-fit.ts',
    'components/builder/TripPlanner/RouteMapInner.tsx',
    'components/builder/TripPlanner/ResizableElevationDock.tsx',
  ];
  for (const filename of names) {
    const result = ts.transpileModule(read(filename), {
      fileName: filename,
      reportDiagnostics: true,
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    });
    assert.deepEqual((result.diagnostics || []).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')), [], filename);
  }
});
