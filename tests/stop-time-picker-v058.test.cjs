const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'components/builder/TripPlanner/StopTimePicker.tsx');
const parent = path.join(root, 'components/builder/TripPlanner/DayStopsItinerary.tsx');
const source = fs.readFileSync(file, 'utf8');
const parentSource = fs.readFileSync(parent, 'utf8');

// Exercise the component's real conversion helpers without requiring a DOM.
const start = source.indexOf('function parseTime(');
const end = source.indexOf('export default function StopTimePicker(');
assert.ok(start > 0 && end > start, 'Could not locate time conversion helpers');
const helpers = source.slice(start, end) + '\nmodule.exports = {parseTime, timeLabel, timeValue};';
const {outputText, diagnostics} = ts.transpileModule(helpers, {
  fileName: 'time-functions.ts',
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS },
  reportDiagnostics: true,
});
assert.equal(diagnostics.length, 0, 'Time conversion helpers should parse');
const sandbox = {module: {exports: {}}};
vm.runInNewContext(outputText, sandbox);
const {parseTime, timeLabel, timeValue} = sandbox.module.exports;

test('custom picker converts all valid 24-hour values losslessly', () => {
  for (let hours=0; hours<24; hours++) for(let minutes=0; minutes<60; minutes++) {
    const raw = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;
    assert.equal(timeValue(parseTime(raw)), raw);
  }
  assert.equal(timeLabel(parseTime('00:00')), '12:00 AM');
  assert.equal(timeLabel(parseTime('12:00')), '12:00 PM');
  assert.equal(timeLabel(parseTime('22:26')), '10:26 PM');
  assert.equal(timeLabel(parseTime('23:59')), '11:59 PM');
});

test('empty and malformed stop times stay unset', () => {
  for (const val of [null, undefined, '', '24:00', '01:60', '9:30', '25:61', 'text']) {
    assert.equal(parseTime(val), null);
  }
});

test('only custom time picker is used by the itinerary editor', () => {
  assert.match(parentSource, /import StopTimePicker from "\.\/StopTimePicker"/);
  assert.match(parentSource, /<StopTimePicker[\s\S]*?value=\{point\.time\}[\s\S]*?onChange=\{\(time\) => route\.updateStop\(point\.id, \{ time \}\)\}/);
  assert.doesNotMatch(parentSource, /type="time"/);
  assert.match(source, /createPortal\(/);
  assert.match(source, /aria-haspopup="dialog"/);
  assert.match(source, /Clear time/);
  assert.match(source, /onChange\(null\)/);
  assert.match(source, /onClick=\{commit\}/);
  assert.match(source, /event\.key === "Escape"/);
});

test('both edited TSX files compile without syntax diagnostics', () => {
  for (const name of [file, parent]) {
    const result = ts.transpileModule(fs.readFileSync(name, 'utf8'), {
      fileName: name,
      compilerOptions: { target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
      reportDiagnostics: true,
    });
    assert.deepEqual(result.diagnostics.map(item=>ts.flattenDiagnosticMessageText(item.messageText, ' ')), [], path.basename(name));
  }
});
