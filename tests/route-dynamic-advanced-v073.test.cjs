const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const src = fs.readFileSync(path.resolve(__dirname,'../components/builder/TripPlanner/RouteElevationPanel.tsx'),'utf8');
const left = src.indexOf('<section aria-labelledby="route-hiking-time-heading"');
const right = src.indexOf('{settingsOpen && <section id="route-analysis-settings"');
const advanced = src.indexOf('<details className="group border-t border-gray-100 px-4 pb-4 pt-4 text-xs text-gray-700 sm:px-5"');
const rightEnd = src.indexOf('</section>}',advanced);
const gridEnd = src.indexOf('</div>',rightEnd);

test('both desktop cards have equal height by default, but independent height with advanced expanded',()=>{
  assert.match(src,/const \[advancedOpen, setAdvancedOpen\] = useState\(false\)/);
  assert.match(src,/settingsOpen && advancedOpen \? "lg:items-start" : "lg:items-stretch"/);
  assert.doesNotMatch(src.slice(right,advanced),/self-start/);
  assert.match(src,/open=\{advancedOpen\} onToggle=\{event => setAdvancedOpen\(event\.currentTarget\.open\)\}/);
});

test('advanced settings sit within the right card and only appear while settings are visible',()=>{
  assert.ok(left>0 && right>left && advanced>right && rightEnd>advanced && gridEnd>rightEnd);
  assert.match(src.slice(advanced,rightEnd),/Advanced settings/);
  assert.match(src.slice(advanced,rightEnd),/How time is calculated & compared/);
  assert.match(src.slice(advanced,rightEnd),/Advanced level-trail speed/);
  assert.match(src.slice(rightEnd,rightEnd+18),/<\/section>\}/);
  assert.doesNotMatch(src.slice(gridEnd,src.indexOf('id="route-notable-terrain"')),/Advanced settings/);
});

test('left card remains available when settings are hidden and the 1-column layout is retained',()=>{
  assert.match(src,/settingsOpen \? "lg:grid-cols-\[minmax\(0,1fr\)_minmax\(0,0\.95fr\)\]" : "lg:grid-cols-1"/);
  assert.match(src.slice(left,right),/Hiking time breakdown/);
  assert.match(src.slice(left,right),/Show settings/);
  assert.match(src.slice(right,advanced),/Close hiking settings/);
});

test('removes redundant helper copy but keeps original calculation and palette',()=>{
  assert.doesNotMatch(src,/Adjustments update hiking estimates and predicted arrivals/);
  assert.match(src,/const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
  assert.match(src,/bg-green-800 transition-\[width\]/);
  assert.match(src,/bg-amber-500 transition-\[width\]/);
});

test('TSX parses successfully',()=>{
  const result=ts.transpileModule(src,{fileName:'RouteElevationPanel.tsx',compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
  assert.deepEqual((result.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[]);
});

