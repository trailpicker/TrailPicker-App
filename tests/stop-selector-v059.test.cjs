const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const editor = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/DayStopsItinerary.tsx'), 'utf8');
const picker = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/StopSelectPicker.tsx'), 'utf8');

test('stop editor uses one reusable popover selector for Type and Day', () => {
  assert.match(editor, /import StopSelectPicker from "\.\/StopSelectPicker"/);
  assert.match(editor, /<StopSelectPicker\s+label="Type"\s+value=\{point\.kind\}/);
  assert.match(editor, /<StopSelectPicker\s+label="Day"\s+value=\{point\.dayId \?\? ""\}/);
  const editForm = editor.split('{editing && (')[1]?.split('<StopTimePicker')[0];
  assert.ok(editForm, 'stop editor should be present');
  assert.doesNotMatch(editForm, /<select\b/);
  assert.match(editor, /\.\.\.days\.map\(\(day, i\) => \(\{ value: day\.id, label: `Day \$\{i \+ 1\}` \}\)\)/);
  assert.match(editor, /value: "", label: "Unassigned"/);
});

test('changing stop type and day still invokes the original update actions', () => {
  assert.match(editor, /route\.updateStop\(point\.id, \{ kind, \.\.\.\(!\["camp", "water", "resupply"\]\.includes\(kind\) \? \{ resource: undefined \} : \{\}\) \}\)/);
  assert.match(editor, /onChange=\{next => route\.assignStop\(point\.id, next \|\| null\)\}/);
  assert.match(editor, /<StopTimePicker/);
});

test('scheduling explanation paragraph is removed without altering time fields', () => {
  assert.doesNotMatch(editor, /Times are local to the trail/);
  assert.doesNotMatch(editor, /scheduled times stay fixed/i);
  assert.match(editor, /label=\{firstInDay \? "Departure time \(optional\)" : "Scheduled arrival \(optional\)"\}/);
  assert.match(editor, /Time at stop \(minutes, optional\)/);
});

test('popover selector is portal based, accessible, and keyboard navigable', () => {
  assert.match(picker, /createPortal\(/);
  assert.match(picker, /aria-haspopup="listbox"/);
  assert.match(picker, /role="listbox"/);
  assert.match(picker, /role="option"/);
  assert.match(picker, /aria-selected=\{option\.value === value\}/);
  for (const key of ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape', 'Tab']) {
    assert.ok(picker.includes(`"${key}"`), `${key} should be supported`);
  }
  assert.match(picker, /document\.addEventListener\("pointerdown", outside\)/);
  assert.match(picker, /disabled=\{disabled\}/);
});

test('changed TSX files parse without syntax diagnostics', () => {
  for (const relative of ['components/builder/TripPlanner/DayStopsItinerary.tsx', 'components/builder/TripPlanner/StopSelectPicker.tsx']) {
    const output = ts.transpileModule(fs.readFileSync(path.join(root,relative),'utf8'), {
      fileName: relative, compilerOptions: { target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext }, reportDiagnostics: true,
    });
    assert.deepEqual(output.diagnostics.map(issue => ts.flattenDiagnosticMessageText(issue.messageText,' ')), []);
  }
});
