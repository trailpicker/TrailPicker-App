/**
 * Find a point halfway along the displayed path, which can bend around trails.
 * Positions are [latitude, longitude]. This helper has no map/browser dependency.
 */
type LatLng = readonly [number, number];

function segmentMeters(a: LatLng, b: LatLng): number {
  const radians = Math.PI / 180;
  const dLat = (b[0] - a[0]) * radians;
  const dLng = (b[1] - a[1]) * radians;
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(a[0] * radians) * Math.cos(b[0] * radians) * Math.sin(dLng / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(Math.max(0, 1 - h)));
}

export function routeInsertionMidpoint(path: readonly LatLng[]): [number, number] | null {
  if (path.length < 2) return null;
  const lengths: number[] = [];
  let totalMeters = 0;
  for (let index = 1; index < path.length; index++) {
    const length = segmentMeters(path[index - 1], path[index]);
    if (!Number.isFinite(length)) return null;
    lengths.push(length);
    totalMeters += length;
  }
  if (totalMeters <= 0) return null;

  let remaining = totalMeters / 2;
  for (let index = 0; index < lengths.length; index++) {
    const length = lengths[index];
    if (remaining <= length && length > 0) {
      const fraction = remaining / length;
      const from = path[index];
      const to = path[index + 1];
      return [
        from[0] + (to[0] - from[0]) * fraction,
        from[1] + (to[1] - from[1]) * fraction,
      ];
    }
    remaining -= length;
  }
  // Floating-point rounding: the end of the route is still a valid result.
  return [...path[path.length - 1]];
}
