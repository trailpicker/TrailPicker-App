const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

const root = path.resolve(__dirname, "..");
const read = (name) => fs.readFileSync(path.join(root, "components/builder/TripPlanner", name), "utf8");
const panel = read("RouteElevationPanel.tsx");
const itinerary = read("DayStopsItinerary.tsx");
const picker = read("StopSelectPicker.tsx");

test("hiking time fallback uses a declared, derived break value", () => {
  assert.match(panel, /const totalBreakText = movingMinutes !== null && breakEstimate !== null \? duration\(breakEstimate\) : "Unavailable"/);
  assert.match(panel, /totalBreakText !== "Unavailable" \? ` · \$\{totalBreakText\} breaks` : ""/);
  assert.match(panel, /const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
  assert.match(panel, /timeBarTotal > 0 && <div/);
  assert.match(panel, />Hiking settings<\/span>/);
});

test("unassigned stops use the shared custom dropdown, never native select", () => {
  const unassigned = itinerary.split('aria-label="Unassigned route stops"')[1]?.split("</ol>")[0];
  assert.ok(unassigned, "unassigned stop list exists");
  assert.doesNotMatch(unassigned, /<select\b|<option\b/);
  assert.match(unassigned, /<StopSelectPicker/);
  assert.match(unassigned, /placeholder="Assign day"/);
  assert.match(unassigned, /variant="action"/);
  assert.match(unassigned, /disabled=\{route\.pending\}/);
  assert.match(unassigned, /onChange=\{\(dayId\) => \{ if \(dayId\) route\.assignStop\(stop\.id, dayId\); \}\}/);
  assert.match(unassigned, /timeZone: "UTC"/);
  assert.match(unassigned, /!route\.readOnly && orderedDays\.length > 0/);
});

test("action variant remains enabled except when actually disabled", () => {
  assert.match(picker, /variant\?: "default" \| "action"/);
  assert.match(picker, /placeholder\?: string/);
  assert.match(picker, /selected\?\.label \?\? placeholder/);
  assert.match(picker, /variant === "action"/);
  assert.match(picker, /border-green-200 bg-green-50/);
  assert.match(picker, /hover:border-green-400 hover:bg-green-100/);
  assert.match(picker, /disabled=\{disabled\}/);
  assert.match(picker, /createPortal\(/);
  assert.match(picker, /role="listbox"/);
  assert.match(picker, /role="option"/);
  for (const key of ["ArrowDown", "ArrowUp", "Home", "End", "Escape", "Tab"])
    assert.ok(picker.includes(`"${key}"`), `keyboard navigation must support ${key}`);
});

test("all three TSX files parse successfully", () => {
  for (const name of ["RouteElevationPanel.tsx", "DayStopsItinerary.tsx", "StopSelectPicker.tsx"]) {
    const result = ts.transpileModule(read(name), {
      fileName: name,
      compilerOptions: { target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
      reportDiagnostics: true,
    });
    assert.deepEqual((result.diagnostics || []).map(d => ts.flattenDiagnosticMessageText(d.messageText, " ")), [], name);
  }
});
