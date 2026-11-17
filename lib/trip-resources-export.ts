/** Escape user-controlled data in export documents; neutralize spreadsheet formulas. */
import type { Waypoint, PlannerDay, Logistics } from "./trip-planner";
import type { PackLine } from "./pack-analysis";
import type { CampBooking } from "./trip-resources";
import type { FoodPlan } from "./food-plan";
import type { TripArrangement } from "./trip-arrangements";

export type TripExport = { name: string; days: PlannerDay[]; points: Waypoint[]; logistics: Logistics; bookings: CampBooking[]; arrangements?: TripArrangement[]; packLines: PackLine[]; foodPlan?: FoodPlan; people?: number };
export const TRIP_DOCUMENT_SECTIONS = ["itinerary", "resources", "logistics", "packing"] as const;
export type TripDocumentSection = (typeof TRIP_DOCUMENT_SECTIONS)[number];
export type TripDocumentOptions = Partial<Record<TripDocumentSection, boolean>>;

export function csvCell(value: unknown): string {
  let text = String(value ?? "");
  if (/^[\s\r\n]*[=+@\-\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}
export function csvTable(rows: (string | number | null | undefined)[][]): string {
  return "\ufeff" + rows.map(row => row.map(csvCell).join(",")).join("\r\n") + "\r\n";
}
export function exportLogisticsCsv({ logistics, bookings, arrangements = [], name }: TripExport, includePrivate: boolean): string {
  const rows: (string | number)[][] = [["Trip", name],["Category", "Field", "Value"]];
  for (const [key, value] of Object.entries(logistics)) {
    if (!includePrivate && ["emergencyContact", "emergencyPlan", "reservations", "permits"].includes(key)) continue;
    rows.push(["Logistics",key,value]);
  }
  rows.push(["Bookings", "Campground", "Status", "Arrival", "Departure", "Provider", "Confirmation", "Notes"]);
  for (const item of bookings) rows.push(["Booking", item.campground,item.status,item.arrival,item.departure,item.provider,includePrivate ? item.confirmation : "[private]",includePrivate ? item.notes : "[private]"]);
  if (includePrivate) {
    rows.push(["Permits and reservations", "Type", "Name", "Status", "Start", "End", "Provider", "Confirmation", "URL", "Notes"]);
    for (const entry of arrangements) rows.push(["Arrangement", `${entry.kind}: ${entry.category}`, entry.name, entry.status, entry.startDate, entry.endDate, entry.provider, entry.confirmation, entry.bookingUrl, entry.notes]);
  }
  return csvTable(rows);
}
export function exportCampsitesCsv({ points, bookings, days }: TripExport, includePrivate: boolean): string {
  const lookup = new Map(bookings.filter(b => b.waypointId).map(b => [b.waypointId,b]));
  const byDay = new Map(days.map((day,index) => [day.id, `Day ${index+1}`]));
  const rows: (string | number)[][] = [["Campsite", "Day", "Latitude", "Longitude", "Access", "Notes", "Source", "Booking status", "Confirmation"]];
  for (const point of points.filter(p => p.kind === "camp")) {
    const booking = lookup.get(point.id);
    rows.push([point.name,byDay.get(point.dayId || "") || "Unassigned",point.lat,point.lng,point.resource?.access || "",point.resource?.detail || "",point.resource?.sourceUrl || "",booking?.status || "untracked",includePrivate ? booking?.confirmation || "" : "[private]"]);
  }
  return csvTable(rows);
}
export function exportPackCsv({ packLines, foodPlan }: TripExport): string {
  return csvTable([["Item", "Category", "Quantity", "Weight per item (g)", "Total weight (g)", "Worn/consumable/base", "Packed?"],
    ...packLines.map(line => [line.name,line.category,line.quantity,line.gramsEach,line.grams,line.weightClass,""]),
    ...(foodPlan?.foods.filter(f=>f.countInPack).map(f=>[f.name,"Planned food",f.startingUnits,f.gramsPerUnit,f.gramsPerUnit===null?null:f.startingUnits*f.gramsPerUnit,"consumable (Phase 7)",""] as (string|number|null)[]) || []),
    ...(foodPlan?.settings.countFuelInPack && foodPlan.settings.startingFuelGrams ? [["Planned fuel","Cooking",1,foodPlan.settings.startingFuelGrams,foodPlan.settings.startingFuelGrams,"consumable (Phase 7)",""]] : [])]);
}
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[character]!));
}
const dateText = (value: Date | string) => new Date(value).toLocaleDateString("en-CA", { year:"numeric",month:"short",day:"numeric",timeZone:"UTC" });

/** A self-contained, print-ready document. Works with selected sections, and
 * retains the old two-argument form for callers expecting the full itinerary.
 * All user-authored content is escaped before insertion into the document.
 */
export function printableTripHtml(data: TripExport, includePrivate = false, sections: TripDocumentOptions = {}): string {
  const h = escapeHtml;
  const show: Record<TripDocumentSection, boolean> = {
    itinerary: sections.itinerary !== false,
    resources: sections.resources !== false,
    logistics: sections.logistics !== false,
    packing: sections.packing !== false,
  };
  const byDay = !show.itinerary ? "" : (data.days.length ? data.days.map((day,index) => {
    const waypoints = data.points.filter(p => p.dayId === day.id);
    const info = [
      day.startLocation && `Start: ${day.startLocation}`,
      day.endLocation && `Finish: ${day.endLocation}`,
      day.distanceKm != null && `Distance: ${day.distanceKm} km`,
      day.elevationGainM != null && `Gain: ${day.elevationGainM} m`,
      day.elevationLossM != null && `Descent: ${day.elevationLossM} m`,
      day.durationMinutes != null && `Moving time: ${Math.round(day.durationMinutes / 60 * 10)/10} h`,
      day.campsite && `Camp: ${day.campsite}`,
      day.waterSource && `Water: ${day.waterSource}`,
    ].filter(Boolean).map(v => `<li>${h(v)}</li>`).join("");
    const stops = waypoints.length ? `<h3>Route stops</h3><ol>${waypoints.map(point => `<li>${h(point.name)} (${h(point.kind)})${point.note ? `: ${h(point.note)}` : ""}</li>`).join("")}</ol>` : "";
    return `<section><h2>Day ${index+1} · ${h(dateText(day.date))}</h2><ul>${info}</ul>${stops}${day.notes ? `<p class="notes">${h(day.notes)}</p>` : ""}</section>`;
  }).join("") : `<section><h2>Day-by-day itinerary</h2><p>No itinerary days planned yet.</p></section>`);

  const resourceStops = data.points.filter(point => ["camp", "water", "resupply"].includes(point.kind));
  const byDayLabel = new Map(data.days.map((day,index) => [day.id, `Day ${index+1}`]));
  const resourcesHtml = !show.resources ? "" : `<section><h2>Campsites &amp; water sources</h2>${resourceStops.length ? `<ul>${resourceStops.map(point => {
    const meta = [
      byDayLabel.get(point.dayId || "") || "Unassigned day",
      point.kind,
      point.resource?.access,
      point.resource?.waterReliability && `Water reliability: ${point.resource.waterReliability}`,
      point.resource?.detail,
      point.resource?.sourceName && `Source: ${point.resource.sourceName}`,
      point.resource?.checkedOn && `Checked: ${point.resource.checkedOn}`,
    ].filter(Boolean).map(h).join(" · ");
    return `<li><strong>${h(point.name)}</strong><small> ${meta}</small></li>`;
  }).join("")}</ul>` : `<p>No campsite or water stops recorded.</p>`}</section>`;

  const bookingHtml = show.resources && data.bookings.length ? `<section><h2>Campsite reservations</h2><ul>${data.bookings.map(b =>
    `<li>${h(b.campground)} · ${h(b.status)}${b.arrival ? ` · ${h(b.arrival)}` : ""}${includePrivate ? ` · ${h(b.confirmation)} ${h(b.notes)}` : ""}</li>`
  ).join("")}</ul></section>` : "";
  const arrangementsHtml = show.logistics && includePrivate && data.arrangements?.length
    ? `<section><h2>Permits and reservations</h2><ul>${data.arrangements.map(a => `<li><strong>${h(a.name)}</strong> · ${h(a.kind)} · ${h(a.status)}${a.startDate ? ` · ${h(a.startDate)}` : ""}${a.endDate ? ` to ${h(a.endDate)}` : ""}${a.provider ? ` · ${h(a.provider)}` : ""}${a.confirmation ? ` · Confirmation: ${h(a.confirmation)}` : ""}${a.notes ? ` · ${h(a.notes)}` : ""}</li>`).join("")}</ul></section>` : "";
  const logisticsHtml = !show.logistics ? "" : `<section><h2>Logistics</h2><ul>${Object.entries(data.logistics)
    .filter(([key,value]) => value && (includePrivate || !["emergencyContact","emergencyPlan","permits","reservations"].includes(key)))
    .map(([key,value]) => `<li><strong>${h(key)}:</strong> ${h(value)}</li>`).join("") || "<li>No logistics added yet.</li>"}</ul></section>`;

  const packHtml = data.packLines.map(line => `<li><span class="check">☐</span> ${h(line.quantity)} × ${h(line.name)} ${line.grams != null ? `(${h(line.grams)} g)` : "(weight unknown)"}</li>`).join("");
  const foodHtml = data.foodPlan?.foods.filter(food=>food.countInPack).map(food =>
    `<li><span class="check">☐</span> ${h(food.startingUnits)} × ${h(food.name)} ${food.gramsPerUnit == null ? "(unknown mass)" : `(${h(food.startingUnits*food.gramsPerUnit)} g)`}</li>`
  ).join("") || "";
  const mealHtml = data.foodPlan?.meals.map(meal => {
    const day = data.days.findIndex(d=>d.id===meal.dayId);
    const food = data.foodPlan?.foods.find(f=>f.id===meal.foodId);
    return `<li>Day ${h(day+1)} · ${h(meal.slot)}: ${h(meal.units)} × ${h(food?.name||"Unknown")}</li>`;
  }).join("") || "";
  const packingHtml = !show.packing ? "" : `<section><h2>Packing checklist</h2><ul>${packHtml}${foodHtml}${data.foodPlan?.settings.countFuelInPack && data.foodPlan.settings.startingFuelGrams ? `<li><span class="check">☐</span> Planned fuel (${h(data.foodPlan.settings.startingFuelGrams)} g)</li>` : ""}</ul></section>${mealHtml ? `<section><h2>Food &amp; meals</h2><ul>${mealHtml}</ul></section>` : ""}`;

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${h(data.name)} · TrailPicker trip plan</title><style>body{font:14px/1.6 system-ui,sans-serif;max-width:800px;margin:36px auto;color:#172018;padding:0 18px}h1{font-size:26px;margin-bottom:4px}h2{font-size:18px;border-bottom:1px solid #ddd;margin-top:24px}h3{font-size:14px}section{break-inside:avoid;padding:3px 0}ul,ol{padding-left:24px}.check{font-size:19px}small{color:#555}.notes{white-space:pre-wrap}@page{margin:17mm}@media print{body{margin:0;max-width:none}a{color:inherit}}</style></head><body><h1>${h(data.name)}</h1>${data.people ? `<p>${h(data.people)} participant${data.people===1?"":"s"}</p>` : ""}<small>TrailPicker trip document · Verify routes, water availability and campsite rules before departure.</small>${byDay}${resourcesHtml}${bookingHtml}${logisticsHtml}${arrangementsHtml}${packingHtml}</body></html>`;
}
