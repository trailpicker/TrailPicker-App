// Replaces the earlier test: inserting a route waypoint must NOT create a saved stop.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { shapingInsertPositions, shapingInsertIndex } from '../lib/route-shaping.ts';

test('shaping controls are distinct from saved stops', () => {
  const route = readFileSync(new URL('../components/builder/TripPlanner/TripRoute.tsx', import.meta.url), 'utf8');
  const map = readFileSync(new URL('../components/builder/TripPlanner/RouteMapInner.tsx', import.meta.url), 'utf8');
  assert.match(route, /function insertShapingWaypoint\(/);
  assert.doesNotMatch(route, /function insertStop\(/);
  assert.match(map, /\{onMoveVia && via\.map\(/);
});

test('insertion points follow path geometry and preserve waypoint order', () => {
  const path = [[49, -123], [49.01, -123], [49.02, -123]];
  const via = [[49.01, -123]];
  const inserts = shapingInsertPositions(path, via);
  assert.equal(inserts.length, 2);
  assert.equal(shapingInsertIndex(path, via, inserts[0]), 0);
  assert.equal(shapingInsertIndex(path, via, inserts[1]), 1);
});
