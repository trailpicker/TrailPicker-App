import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  validShapingWaypoints, shapingInsertIndex, shapingInsertPositions,
  MAX_ROUTE_SHAPING_WAYPOINTS,
} from '../lib/route-shaping.ts';

const contents = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const from = [49, -123];
const to = [49.02, -123];
const middle = [49.01, -123];

test('validates bounded shaping coordinates separately from saved stops', () => {
  assert.equal(validShapingWaypoints([middle]), true);
  assert.equal(validShapingWaypoints([]), true);
  assert.equal(validShapingWaypoints(Array(MAX_ROUTE_SHAPING_WAYPOINTS + 1).fill(middle)), false);
  assert.equal(validShapingWaypoints([[92, -123]]), false);
  assert.equal(validShapingWaypoints([[49, NaN]]), false);
  assert.equal(validShapingWaypoints([[49, -123, 17]]), false);
  assert.equal(validShapingWaypoints('fake'), false);
});

test('places a new insertion control in EACH stretch and correctly orders insertions', () => {
  const path = [from, middle, to];
  const controls = shapingInsertPositions(path, [middle]);
  assert.equal(controls.length, 2);
  assert.ok(controls[0][0] > 49.004 && controls[0][0] < 49.006);
  assert.ok(controls[1][0] > 49.014 && controls[1][0] < 49.016);
  assert.equal(shapingInsertIndex(path, [middle], [49.004, -123]), 0);
  assert.equal(shapingInsertIndex(path, [middle], [49.016, -123]), 1);
});

test('follows rendered trail geometry, not a straight-line midpoint', () => {
  const routed = [[0, 0], [0.02, 0], [0.02, 0.01]];
  const [insert] = shapingInsertPositions(routed, []);
  assert.ok(insert[0] > 0.014 && insert[0] < 0.016);
  assert.equal(insert[1], 0);
  assert.deepEqual(shapingInsertPositions([], []), []);
  assert.deepEqual(shapingInsertPositions([[0, 0], [0, 0]], []), []);
});

test('shaping waypoint controls only render when editing, unlike saved stop markers', () => {
  const map = contents('components/builder/TripPlanner/RouteMapInner.tsx');
  const route = contents('components/builder/TripPlanner/TripRoute.tsx');
  assert.match(route, /onMoveVia=\{canEdit && !pending \? moveShapingWaypoint : undefined\}/);
  assert.match(route, /onInsert=\{canEdit && !pending && !placing && snappingCount === 0 \? insertShapingWaypoint : undefined\}/);
  assert.match(map, /\{onMoveVia && via\.map\(/);
  assert.match(map, /shapingWaypointIcon/);
  assert.match(map, /<StopMarkerLayer points=\{points\}/);
  assert.match(route, /return \{ \.\.\.point, viaToNext, trailToNext: undefined \}/);
  assert.doesNotMatch(route, /function insertStop\(/);
});

test('persists shaping coordinates as segment metadata; routing request uses intermediates', () => {
  const model = contents('lib/trip-planner.ts');
  const serializer = contents('lib/waypoint-map.ts');
  const server = contents('app/api/trails/route/route.ts');
  const client = contents('components/builder/TripPlanner/TripRoute.tsx');
  assert.match(model, /viaToNext\?: LatLng\[\]/);
  assert.match(model, /validShapingWaypoints\(p\.viaToNext\)/);
  assert.match(serializer, /viaToNext: point\.viaToNext\.map\(/);
  assert.match(server, /validShapingWaypoints\(rawVia\)/);
  assert.match(server, /\[body\.from!, \.\.\.via, body\.to!\]/);
  assert.match(client, /via: from\.viaToNext \?\? \[\]/);
  assert.match(client, /form\.set\("waypoints", JSON\.stringify\(route\)\)/);
});

