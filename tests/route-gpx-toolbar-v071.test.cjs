const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const analysis=read('components/builder/TripPlanner/RouteAnalysisSection.tsx');
const route=read('components/builder/TripPlanner/TripRoute.tsx');
const toolbar=read('components/builder/BuildDataTools.tsx');

test('Route Analysis contains no duplicate GPX import/export controls',()=>{
  assert.match(analysis, /<RouteElevationPanel/);
  assert.match(analysis, /Reload saved route/);
  assert.doesNotMatch(analysis, /GPX files & route tools|Import GPX|Export GPX|Download GPX|toolsOpen|readFile\(/);
  assert.doesNotMatch(analysis, /importGpx|exportGpx|GPX_MAX_BYTES|<input[^>]*type="file"/);
  assert.doesNotMatch(route, /onImport=\{replaceFromGpx\}/);
  assert.match(route, /onSave=\{save\}/);
});

test('main Import/Export toolbar continues to own GPX UI',()=>{
  assert.match(toolbar, /GPX route/);
  assert.match(toolbar, /importGpx\(await file\.text\(\), gpxDayId \|\| null\)/);
  assert.match(toolbar, /window\.dispatchEvent\(new CustomEvent\(GPX_TOOLBAR_IMPORT/);
  assert.match(toolbar, /window\.dispatchEvent\(new CustomEvent\(GPX_TOOLBAR_EXPORT/);
});

test('Route Workspace handles toolbar GPX requests including live draft export',()=>{
  assert.match(route, /window\.addEventListener\(GPX_TOOLBAR_IMPORT, importRequested\)/);
  assert.match(route, /window\.addEventListener\(GPX_TOOLBAR_EXPORT, exportRequested\)/);
  assert.match(route, /window\.addEventListener\(GPX_TOOLBAR_PING, ready\)/);
  assert.match(route, /window\.dispatchEvent\(new CustomEvent\(GPX_TOOLBAR_READY/);
  assert.match(route, /const accepted = replaceFromGpx\(detail\.points\)/);
  assert.match(route, /if \(readOnly \|\| pending \|\| routing \|\| snappingCount > 0 \|\| outdated\) return false/);
  assert.match(route, /exportGpx\(points, buildName\)/);
  assert.match(route, /detail\.respond\(true\)/);
  assert.match(route, /link\.download = "trailpicker-route\.gpx"/);
});

test('modified TSX files parse',()=>{
  for(const file of ['components/builder/TripPlanner/RouteAnalysisSection.tsx','components/builder/TripPlanner/TripRoute.tsx']){
    const result=ts.transpileModule(read(file), {fileName:file,compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
    assert.deepEqual((result.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[],file);
  }
});
