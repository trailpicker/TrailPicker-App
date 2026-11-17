const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const source = readFileSync(resolve(__dirname, '../components/builder/TripPlanner/RouteElevationPanel.tsx'), 'utf8');

test('time bar uses existing moving and break estimates, not a new timing model', () => {
  assert.match(source, /const totalMinutes = movingMinutes !== null && breakEstimate !== null \? movingMinutes \+ breakEstimate : null/);
  assert.match(source, /const timeBarTotal = totalMinutes !== null && totalMinutes > 0 \? totalMinutes : 0/);
  assert.match(source, /const movingShare = timeBarTotal > 0 \? Math\.max\(0, movingMinutes \?\? 0\) \/ timeBarTotal \* 100 : 0/);
  assert.match(source, /const breakShare = timeBarTotal > 0 \? Math\.max\(0, breakEstimate \?\? 0\) \/ timeBarTotal \* 100 : 0/);
  assert.match(source, /timeBarTotal > 0 && <div/);
  assert.ok(source.includes('aria-label={`${duration(movingMinutes!)} moving, ${duration(breakEstimate!)} breaks`}'));
  assert.match(source, /style=\{\{ width: `\$\{movingShare\}%` \}\}/);
  assert.match(source, /style=\{\{ width: `\$\{breakShare\}%` \}\}/);
  assert.match(source, /breakShare > 0 &&/);
});

test('hiking results stay in the left card and settings remain optional', () => {
  const hiking = source.indexOf('>Hiking time</h3>');
  const estimate = source.indexOf('text-4xl font-bold tracking-tight');
  const bar = source.indexOf('aria-label="Hiking time breakdown"');
  const settings = source.indexOf('id="route-analysis-settings"');
  assert.ok(hiking >= 0 && hiking < estimate && estimate < bar && bar < settings);
  assert.match(source, /Show settings/);
  assert.match(source, /aria-label="Close hiking settings"/);
});

test('settings remain functional while gradient visualization moves into the map profile', () => {
  for (const item of ['Hiking pace', 'Break duration', 'Advanced settings', 'How time is calculated & compared', 'Notable climbs & descents']) {
    assert.ok(source.includes(item), `${item} should remain visible in the source`);
  }
  assert.match(source, /onPaceChange\(option.pace\)/);
  assert.match(source, /onBreaksChange\(prev =>/);
  assert.match(source, /terrainFindings\.map/);
  assert.doesNotMatch(source, /<GradientBar/);
});
