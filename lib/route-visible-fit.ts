/** A map rectangle and a bottom-docked overlay rectangle in viewport pixels. */
export type RouteFitRect = Pick<DOMRectReadOnly, "top" | "bottom" | "left" | "right">;

/**
 * Height of the map actually hidden behind its bottom-docked elevation profile.
 * We measure the rendered overlay rather than relying on the preferred dock
 * height, because its CSS clamps height against the map's available space.
 */
export function coveredMapBottomPx(mapRect: RouteFitRect, dockRect: RouteFitRect | null): number {
  if (!dockRect ||
    dockRect.right <= mapRect.left || dockRect.left >= mapRect.right ||
    dockRect.bottom <= mapRect.top || dockRect.top >= mapRect.bottom) return 0;

  // Fit Route only compensates for a bottom-docked overlay, not an arbitrary
  // floating control over the map.
  if (dockRect.bottom < mapRect.bottom - 3) return 0;
  return Math.max(0, Math.min(mapRect.bottom, dockRect.bottom) - Math.max(mapRect.top, dockRect.top));
}

/** Leaflet asymmetric padding fits and centers the route in the visible area. */
export function routeFitPadding(coveredBottomPx: number, marginPx = 44) {
  if (!(coveredBottomPx > 0)) return { padding: [marginPx, marginPx] as [number, number] };
  return {
    paddingTopLeft: [marginPx, marginPx] as [number, number],
    paddingBottomRight: [marginPx, marginPx + coveredBottomPx] as [number, number],
  };
}
