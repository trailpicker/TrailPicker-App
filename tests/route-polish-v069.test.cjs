const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, 'components/builder/TripPlanner', name), 'utf8');
const itinerary = read('DayStopsItinerary.tsx');
const panel = read('RouteElevationPanel.tsx');
const analysis = read('RouteAnalysisSection.tsx');
const route = read('TripRoute.tsx');

test('unassigned stop picker has concise label and narrower width', () => {
  const unassigned = itinerary.split('aria-label="Unassigned route stops"')[1]?.split('</ol>')[0];
  assert.ok(unassigned);
  assert.match(unassigned, /placeholder="Assign day"/);
  assert.match(unassigned, /className="w-32 shrink-0"/);
  assert.doesNotMatch(unassigned, /placeholder="Assign day…"/);
  assert.match(unassigned, /<StopSelectPicker/);
  assert.match(unassigned, /onChange=\{\(dayId\) => \{ if \(dayId\) route\.assignStop\(stop\.id, dayId\); \}\}/);
});

test('moving-time bar remains forest green; break segment and dot use amber-orange', () => {
  assert.match(panel, /timeBarTotal > 0 && <div/);
  assert.match(panel, /style=\{\{ width: `\$\{movingShare\}%` \}\}/);
  assert.match(panel, /style=\{\{ width: `\$\{breakShare\}%` \}\}/);
  assert.equal((panel.match(/bg-amber-500/g) || []).length, 2);
  assert.doesNotMatch(panel, /bg-emerald-300/);
  assert.match(panel, /bg-green-800 transition-\[width\]/);
});

test('outdated route gets prominent banner with clear explanation and reload action', () => {
  assert.match(analysis, /\{outdated && !readOnly && \(/);
  assert.match(analysis, /role="alert" className="rounded-xl border border-amber-300 bg-amber-50/);
  assert.match(analysis, /Your saved route changed while you were editing/);
  assert.match(analysis, /Saving is paused/);
  assert.match(analysis, /onClick=\{onReloadSavedRoute\} disabled=\{reloadDisabled\}/);
  assert.match(analysis, /Reload saved route/);
  assert.match(analysis, /discards your unsaved route edits/);
  assert.match(analysis, /outdated \? "Resolve conflict to save"/);
  assert.ok(analysis.indexOf('role="alert"') < analysis.indexOf('<header className='));
});

test('reload action is tied to the existing confirmation-protected cancel flow', () => {
  assert.match(route, /outdated=\{outdated\} reloadDisabled=\{pending\} onReloadSavedRoute=\{cancel\}/);
  assert.match(route, /function cancel\(\) \{[\s\S]*?window\.confirm\("Discard your unsaved route changes\?"\)/);
  assert.match(route, /function cancel\(\) \{[\s\S]*?setPoints\(committed\);/);
  assert.match(route, /function cancel\(\) \{[\s\S]*?setOutdated\(false\);/);
  assert.match(route, /if \(editing && dirty\) \{\s*setOutdated\(true\);/);
  assert.match(route, /if \(!canEdit \|\| pending \|\| outdated \|\| routing/);
});

test('old duplicate route-conflict text is removed while general errors stay visible', () => {
  assert.doesNotMatch(route, /The saved route changed while you were editing\. Cancel/);
  assert.match(route, /\{error && !outdated && \(/);
  assert.match(route, /canEdit && dirty && !outdated/);
  assert.match(route, /outdated \? "Resolve conflict"/);
  assert.match(route, /setError\(""\); \/\/ Conflict is explained/);
});

test('modified TSX components parse without syntax errors', () => {
  for (const name of ['DayStopsItinerary.tsx','RouteElevationPanel.tsx','RouteAnalysisSection.tsx','TripRoute.tsx']) {
    const result=ts.transpileModule(read(name), {fileName:name,compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
    assert.deepEqual((result.diagnostics || []).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' ')),[],name);
  }
});
