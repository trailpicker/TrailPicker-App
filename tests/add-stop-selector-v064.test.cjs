const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const itinerary = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/DayStopsItinerary.tsx'), 'utf8');
const picker = fs.readFileSync(path.join(root, 'components/builder/TripPlanner/StopSelectPicker.tsx'), 'utf8');

test('add-stop uses the shared picker with existing waypoint types and icons', () => {
  assert.match(itinerary, /<StopSelectPicker\s+label="Type of stop to add"\s+hideLabel\s+value=\{kind\}/);
  assert.match(itinerary, /options=\{WAYPOINT_TYPES\.map\(\(type\) => \(\{/);
  assert.match(itinerary, /<WaypointIcon kind=\{type\.kind\} className="h-4 w-4"/);
  assert.match(itinerary, /color: type\.color/);
  assert.doesNotMatch(itinerary, /id=\{`stop-kind-\$\{day\.id\}`\}/);
});

test('chosen kind still drives existing add-stop workflow', () => {
  assert.match(itinerary, /onChange=\{\(nextKind\) => setKind\(nextKind as Waypoint\["kind"\]\)\}/);
  assert.match(itinerary, /route\.startAddingToDay\(day\.id, kind\)/);
  assert.match(itinerary, /route\.stopAdding\(\)/);
  assert.match(itinerary, /\{isPlacingHere \? "Cancel" : "Add stop"\}/);
});

test('shared picker supports keyboard focus, selection and overlay', () => {
  assert.match(picker, /aria-haspopup="listbox"/);
  assert.match(picker, /createPortal\(/);
  assert.match(picker, /onChange\(next\)/);
  assert.match(picker, /hideLabel/);
});
