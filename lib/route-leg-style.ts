/** Display rules for the Leaflet hiking route polyline.
 * Day highlighting is driven by EXPANDED itinerary panels, not the last
 * clicked stop. If all panels are collapsed, the entire route is visible.
 * Unrouted/direct connections remain dashed and amber: never imply a trail
 * was verified when the provider failed or the user chose straight lines.
 */
export type RouteLegStyleInput = {
  mapped: boolean;
  editing: boolean;
  activeDayId?: string | null;
  expandedDayIds?: readonly string[];
  startDayId?: string | null;
  endDayId?: string | null;
};

export function routeLegStyle({ mapped, editing, activeDayId, expandedDayIds, startDayId, endDayId }: RouteLegStyleInput) {
  // The explicit panel set wins over activeDayId. Retain the latter only as a
  // fallback for older embedders that have not adopted expanded-day state.
  const inactiveDay = expandedDayIds !== undefined
    ? expandedDayIds.length > 0 && !(
        !!startDayId && !!endDayId &&
        expandedDayIds.includes(startDayId) && expandedDayIds.includes(endDayId)
      )
    : Boolean(activeDayId && (startDayId !== activeDayId || endDayId !== activeDayId));
  const hasFocusedDays = expandedDayIds !== undefined ? expandedDayIds.length > 0 : Boolean(activeDayId);
  if (mapped) {
    return {
      color: "#166534",
      dashArray: undefined,
      weight: editing || (!inactiveDay && hasFocusedDays) ? 6 : 5,
      opacity: expandedDayIds === undefined && editing ? 0.98 : inactiveDay ? 0.19 : editing ? 0.98 : 0.9,
    };
  }
  return {
    color: "#d97706",
    weight: editing ? 4 : 3,
    dashArray: "6 8",
    opacity: expandedDayIds === undefined && editing ? 0.98 : inactiveDay ? 0.18 : editing ? 0.98 : 0.8,
  };
}
