/**
 * TrailPicker Compatibility — expanded trip-aware checks.
 * Pure, deterministic checks against *recorded* trip and equipment data.
 * An absent specification is unknown — never silently interpreted as zero,
 * a pass, or a failed safety certification.
 */

export type CompatibilitySeverity = "error" | "warning" | "info";
export type CompatibilityKind = "check" | "unknown" | "advisory";

export type CompatibilityIssue = {
  id: string;
  severity: CompatibilitySeverity;
  category: string;
  message: string;
  itemIds?: string[];
  kind?: CompatibilityKind;
  /** Why the finding exists. */
  basis?: string;
  /** Concrete next step without claiming a guaranteed outcome. */
  action?: string;
};

type GearSpecificationForCompat = { key: string; value: string; unit?: string | null };

type GearForCompat = {
  id: string;
  name: string;
  weight_g: number | null;
  price_cad: number | null;
  capacity_l: number | null;
  frame_type: string | null;
  waterproof: boolean | null;
  temperature_rating: number | null;
  season: string | null;
  category: { name: string };
  subcategory?: { name: string; slug: string } | null;
  /** Optional for forward compatibility. Never read capacity_l as people. */
  personCapacity?: number | null;
  specifications?: GearSpecificationForCompat[];
};

export type CompatItem = {
  id: string;
  quantity: number;
  isConsumable: boolean;
  isWorn: boolean;
  customCategory: string | null;
  gearNameSnapshot: string | null;
  weightSnapshot: number | null;
  priceSnapshot: number | null;
  gear: GearForCompat | null;
};

export type TripDayForCompat = {
  minTemperature: number | null;
  conditions: string | null;
  campsite?: string | null;
  waterCarryL?: number | null;
  waterSource?: string | null;
};

export type BuildForCompat = {
  people: number;
  minTemperature: number | null;
  conditions: string | null;
  startDate: Date | null;
  endDate: Date | null;
};

const canon = (value: string | null | undefined) => (value ?? "").trim().toLowerCase();
const categoryOf = (item: CompatItem) => canon(item.gear?.category.name ?? item.customCategory);
const slugOf = (item: CompatItem) => canon(item.gear?.subcategory?.slug);
const nameOf = (item: CompatItem) => item.gear?.name || item.gearNameSnapshot || "Custom item";
const active = (items: readonly CompatItem[]) => items.filter(item => Number.isSafeInteger(item.quantity) && item.quantity > 0 && !item.isConsumable);
const validNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const validTemperature = (v: unknown): v is number => validNumber(v) && v >= -80 && v <= 60;
const positiveVolume = (v: unknown): v is number => validNumber(v) && v > 0 && v <= 300;
const ids = (items: readonly CompatItem[]) => items.map(item => item.id);
const names = (items: readonly CompatItem[]) => items.map(nameOf).join(", ");

function nightsBetween(build: BuildForCompat): number | null {
  if (!build.startDate || !build.endDate) return null;
  const ms = new Date(build.endDate).getTime() - new Date(build.startDate).getTime();
  if (!Number.isFinite(ms) || ms < 0) return null;
  // Zero nights represents a day trip. Date-only entries can span DST changes.
  return Math.max(0, Math.round(ms / 86_400_000));
}

function tripContext(build: BuildForCompat, days: readonly TripDayForCompat[]) {
  const nights = nightsBetween(build);
  const overnight = (nights !== null && nights > 0) || days.some(day => !!day.campsite?.trim());
  const lows = [build.minTemperature, ...days.map(day => day.minTemperature)].filter(validTemperature);
  const coldest = lows.length ? Math.min(...lows) : null;
  const conditions = [build.conditions, ...days.map(day => day.conditions)].map(canon);
  const wet = conditions.some(c => /\b(rain|snow|wet|storm|showers|precipitation)\b/.test(c) && !/^no\s+(rain|snow|precipitation)\b/.test(c));
  const snow = conditions.some(c => /\b(snow|blizzard|winter)\b/.test(c) && !/^no\s+(snow)\b/.test(c));
  return { nights, overnight, coldest, wet, snow };
}

/**
 * Only explicitly labelled person-occupancy specs count. In particular,
 * capacity_l is reserved for actual liquid/pack volume and is NEVER occupancy.
 */
export function documentedShelterCapacity(item: CompatItem): number | null {
  if (!item.gear || categoryOf(item) !== "shelter") return null;
  const personCapacity = item.gear.personCapacity;
  if (Number.isSafeInteger(personCapacity) && personCapacity! >= 1 && personCapacity! <= 20) return personCapacity!;

  for (const spec of item.gear.specifications ?? []) {
    const key = canon(spec.key).replace(/[()_-]/g, " ").replace(/\s+/g, " ");
    if (!["sleeping capacity", "person capacity", "capacity persons", "occupancy", "sleeps"].includes(key)) continue;
    if (spec.unit != null && !/^(people|person|persons|occupants?)$/.test(canon(spec.unit))) continue;
    const match = canon(spec.value).match(/^(\d{1,2})(?:\s*(?:people|persons?|occupants?))?$/);
    if (!match) continue;
    const count = Number(match[1]);
    if (count >= 1 && count <= 20) return count;
  }
  return null;
}

function essentialChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const all = active(items);
  const { overnight } = tripContext(build, days);
  const issues: CompatibilityIssue[] = [];
  if (all.length === 0) return [{
    id: "empty-build", severity: "info", kind: "unknown", category: "Inventory",
    message: "No gear is recorded yet, so compatibility cannot be assessed.",
    basis: "Empty gear list", action: "Add equipment to start checking this trip.",
  }];
  const missing = (cat: string) => !all.some(item => categoryOf(item) === cat);
  const needs = overnight ? ["shelter", "sleep", "water"] : ["water"];
  for (const cat of needs) if (missing(cat)) issues.push({
    id: `missing-${cat}`, severity: "warning", kind: "advisory", category: "Trip essentials",
    message: `No ${cat} gear is recorded${overnight ? " for this overnight trip" : ""}. Confirm any shared or separately arranged equipment before departure.`,
    basis: "Recorded gear categories and trip duration", action: `Add ${cat} gear to this build, or confirm and document an alternative plan.`,
  });
  if (missing("packs")) issues.push({
    id: "missing-packs", severity: "info", kind: "advisory", category: "Trip essentials",
    message: "No backpack is recorded. This might be intentional or shared.",
    basis: "Recorded gear categories", action: "Confirm how equipment and water will be carried.",
  });
  if (overnight && missing("cooking")) issues.push({
    id: "cooking-plan", severity: "info", kind: "advisory", category: "Trip essentials",
    message: "No cooking equipment is recorded. No-cook trips and shared stoves are valid arrangements.",
    basis: "Overnight trip and recorded cooking gear", action: "Check food preparation and any planned hot-water needs.",
  });
  return issues;
}

/** A pad's R-value measures insulation, not bag temperature rating. */
function recordedPadRValue(item: CompatItem): number | null {
  if (slugOf(item) !== "sleeping-pad") return null;
  for (const spec of item.gear?.specifications ?? []) {
    if (!["r value", "rvalue"].includes(canon(spec.key).replace(/-/g, " "))) continue;
    const value = canon(spec.value);
    if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(value)) continue;
    const n = Number(value);
    if (n >= 0.1 && n <= 20) return n;
  }
  return null;
}

function sleepChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const { coldest, overnight } = tripContext(build, days);
  if (!overnight) return [];
  const sleep = active(items).filter(item => categoryOf(item) === "sleep");
  const insulation = sleep.filter(item => ["sleeping-bag", "quilt"].includes(slugOf(item)) || (!slugOf(item) && validTemperature(item.gear?.temperature_rating)));
  const ambiguous = sleep.filter(item => !slugOf(item) && !validTemperature(item.gear?.temperature_rating));
  const issues: CompatibilityIssue[] = [];
  const groupSize = Number.isSafeInteger(build.people) && build.people > 0 ? build.people : 1;
  if (coldest === null && sleep.length === 0) issues.push({
    id: "trip-low-unknown", severity: "info", kind: "unknown", category: "Temperature",
    message: "No overnight low temperature is recorded, so the planned sleeping conditions cannot be assessed.",
    basis: "Overnight trip without a recorded minimum temperature", action: "Record an expected overnight low and check current conditions near departure.",
  });

  if (sleep.length > 0 && insulation.length === 0 && ambiguous.length === 0) issues.push({
    id: "sleep-insulation-missing", severity: "warning", kind: "advisory", category: "Sleep system",
    message: "Sleeping pads or accessories are listed, but no sleeping bag or quilt is recorded.",
    itemIds: ids(sleep), basis: "Recorded sleep subcategories", action: "Confirm sleeping insulation for each person, including any shared or alternative arrangements.",
  });
  if (ambiguous.length) issues.push({
    id: "sleep-items-unclassified", severity: "info", kind: "unknown", category: "Sleep system",
    message: `${ambiguous.length} sleep item${ambiguous.length === 1 ? " has" : "s have"} no clear sleeping-bag, quilt, or pad classification.`,
    itemIds: ids(ambiguous), basis: "Missing gear subcategory / insulation classification", action: "Identify the type of sleep equipment before relying on temperature checks.",
  });

  const pads = sleep.filter(item => slugOf(item) === "sleeping-pad");
  if (insulation.length && !pads.length) issues.push({
    id: "sleep-pad-not-listed", severity: "info", kind: "advisory", category: "Sleep system",
    message: "A sleeping bag or quilt is listed, but no sleeping pad is recorded. Hammocks and other setups may use different insulation.",
    itemIds: ids(insulation), basis: "Listed sleeping bags/quilts without a classified sleeping pad", action: "Confirm adequate ground or underside insulation for the sleeping setup.",
  });
  const padUnits = pads.reduce((sum, item) => sum + item.quantity, 0);
  if (pads.length && padUnits < groupSize) issues.push({
    id: "sleep-pad-units", severity: "info", kind: "advisory", category: "Sleep system",
    message: `${padUnits} sleeping pad unit${padUnits === 1 ? "" : "s"} recorded for ${groupSize} people. Other ground insulation may be shared or arranged separately.`,
    itemIds: ids(pads), basis: "Listed sleeping pads and trip group size", action: "Confirm the pad/under-insulation plan for everyone.",
  });

  const recordedCount = insulation.reduce((sum, item) => sum + item.quantity, 0);
  if (recordedCount > 0 && recordedCount < groupSize && ambiguous.length === 0) issues.push({
    id: "sleep-units", severity: "warning", kind: "advisory", category: "Sleep system",
    message: `${recordedCount} sleeping bag/quilt unit${recordedCount === 1 ? "" : "s"} recorded for ${groupSize} people. Other arrangements may exist.`,
    itemIds: ids(insulation), basis: "Recorded insulation quantities and group size", action: "Confirm each person's sleep system and any shared equipment.",
  });
  if (coldest === null && sleep.length > 0) {
    issues.push({
      id: "sleep-no-trip-low", severity: "info", kind: "unknown", category: "Temperature",
      message: "The trip has no recorded low temperature, so sleep ratings cannot be compared.",
      itemIds: ids(sleep), basis: "Missing trip temperature", action: "Enter a realistic overnight low and check up-to-date forecasts before departure.",
    });
    return issues;
  }
  if (coldest === null) return issues;
  // Pad insulation is a separate consideration. A recorded R-value never
  // converts to a sleeping-bag comfort-temperature rating.
  if (coldest <= 0 && pads.length) {
    const unknownPads = pads.filter(item => recordedPadRValue(item) === null);
    if (unknownPads.length) issues.push({
      id: "pad-insulation-unknown", severity: "info", kind: "unknown", category: "Sleep system",
      message: `Pad insulation (R-value) is missing for ${names(unknownPads)} during a trip with lows of ${coldest}°C.`,
      itemIds: ids(unknownPads), basis: "Missing sleeping-pad R-value and recorded trip low", action: "Check manufacturer R-values and the complete pad/ground-insulation setup.",
    });
    const lowPads = pads.filter(item => {
      const r = recordedPadRValue(item);
      return r !== null && r < 2;
    });
    if (lowPads.length) issues.push({
      id: "pad-insulation-review", severity: "warning", kind: "advisory", category: "Sleep system",
      message: `Listed pad R-values are below 2 for ${names(lowPads)} on a trip with lows of ${coldest}°C. Pad stacking and other insulation may change the full system's performance.`,
      itemIds: ids(lowPads), basis: "Recorded R-values below 2 and a freezing or colder trip low; planning prompt only", action: "Review complete ground insulation and manufacturer guidance for the expected conditions.",
    });
    if (coldest <= -5) {
      const moderatePads = pads.filter(item => {
        const r = recordedPadRValue(item);
        return r !== null && r >= 2 && r < 4;
      });
      if (moderatePads.length) issues.push({
        id: "pad-cold-weather-review", severity: "info", kind: "advisory", category: "Sleep system",
        message: `Recorded R-values are under 4 for ${names(moderatePads)} on a trip with lows of ${coldest}°C. This is a cold-weather planning prompt, not an absolute minimum.`,
        itemIds: ids(moderatePads), basis: "Recorded pad R-values and sub-freezing trip low", action: "Check the complete ground-insulation arrangement and manufacturer guidance for the expected conditions.",
      });
    }
  }
  const rated = insulation.filter(item => validTemperature(item.gear?.temperature_rating));
  const unrated = insulation.filter(item => !validTemperature(item.gear?.temperature_rating));
  if (unrated.length) issues.push({
    id: "sleep-rating-unknown", severity: "info", kind: "unknown", category: "Temperature",
    message: `Temperature ratings are missing for ${names(unrated)}. Their suitability at ${coldest}°C cannot be assessed.`,
    itemIds: ids(unrated), basis: "Missing temperature rating", action: "Find verified comfort ratings and check sleeping-pad insulation.",
  });
  for (const item of rated) {
    const rating = item.gear!.temperature_rating!;
    if (rating > coldest) issues.push({
      id: `sleep-rating-review-${item.id}`, severity: "warning", kind: "check", category: "Temperature",
      message: `Temperature mismatch: ${nameOf(item)} is rated ${rating}°C, but the recorded low is ${coldest}°C (${(rating - coldest).toFixed(1).replace(/\.0$/, "")}°C colder). The rating type and full sleep system still need verification.`,
      itemIds: [item.id], basis: `Catalog rating: ${rating}°C · Recorded low: ${coldest}°C`,
      action: "Choose a sleep system suitable for the expected low, or verify the manufacturer comfort rating, pad insulation, and a suitable alternative before departure.",
    });
  }
  if (rated.length && !rated.some(item => item.gear!.temperature_rating! > coldest)) issues.push({
    id: "sleep-rating-limits", severity: "info", kind: "unknown", category: "Temperature",
    message: "Recorded sleeping-bag/quilt ratings do not exceed the trip low, but ratings may describe comfort or limit temperatures and do not account for sleeping-pad insulation.",
    itemIds: ids(rated), basis: "Unspecified rating method and complete sleep system", action: "Verify manufacturer comfort ratings and your full sleep system; this is not a warmth guarantee.",
  });
  return issues;
}

function shelterChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const context = tripContext(build, days);
  const shelters = active(items).filter(item => categoryOf(item) === "shelter");
  if (!shelters.length) return [];
  const issues: CompatibilityIssue[] = [];
  if (context.overnight) {
    const known = shelters.filter(item => documentedShelterCapacity(item) !== null);
    const unknown = shelters.filter(item => documentedShelterCapacity(item) === null);
    const knownPeople = known.reduce((sum, item) => sum + documentedShelterCapacity(item)! * item.quantity, 0);
    const groupSize = Number.isSafeInteger(build.people) && build.people > 0 ? build.people : 1;

    if (unknown.length) issues.push({
      id: "shelter-occupancy-unknown", severity: "info", kind: "unknown", category: "Capacity",
      message: `Sleeping capacity is missing for ${names(unknown)}. Listed occupancy is not a verified group total.`,
      itemIds: ids(unknown), basis: "No explicitly labelled person-capacity specification", action: "Add a 'Sleeping capacity' specification with unit 'people', then verify group sleeping arrangements.",
    });
    if (knownPeople < groupSize && unknown.length === 0) issues.push({
      id: "shelter-capacity-short", severity: "error", kind: "check", category: "Capacity",
      message: `Not enough documented shelter space: ${knownPeople} sleeping places for ${groupSize} people. Separately arranged shelter may not be listed.`,
      itemIds: ids(known), basis: "Explicit sleeping capacity × quantity, compared with trip group size", action: "Add sufficient shelter capacity or record and confirm the separate sleeping arrangements for everyone.",
    });
    else if (knownPeople < groupSize && unknown.length > 0) issues.push({
      id: "shelter-capacity-unverified", severity: "info", kind: "unknown", category: "Capacity",
      message: `${knownPeople} sleeping places are documented for ${groupSize} people; other listed shelters have unknown occupancy.`,
      itemIds: ids(shelters), basis: "Partial shelter-capacity data", action: "Verify the unknown shelter capacities before judging whether the group fits.",
    });
  }
  if (context.wet) {
    const unsuitable = shelters.filter(item => item.gear?.waterproof === false);
    const unknown = shelters.filter(item => item.gear?.waterproof == null);
    if (unsuitable.length) issues.push({
      id: "shelter-wet-weather", severity: "warning", kind: "check", category: "Weather",
      message: `${names(unsuitable)} ${unsuitable.length === 1 ? "is" : "are"} recorded as not waterproof, while wet conditions are noted. A separate rain fly or tarp might provide protection.`,
      itemIds: ids(unsuitable), basis: "Planned precipitation conditions and catalog waterproof field", action: "Verify the complete shelter setup, rain protection, and manufacturer limitations.",
    });
    if (unknown.length) issues.push({
      id: "shelter-waterproof-unknown", severity: "info", kind: "unknown", category: "Weather",
      message: `Waterproofing specifications are missing for ${names(unknown)}.`,
      itemIds: ids(unknown), basis: "Missing waterproof field", action: "Check the shelter and rain-cover specifications; unknown does not mean not waterproof.",
    });
  }
  const winter = context.snow || (context.coldest !== null && context.coldest <= -10);
  const threeSeason = shelters.filter(item => /^(3\s*-?\s*season|three\s*season)$/.test(canon(item.gear?.season)));
  if (winter && threeSeason.length) issues.push({
    id: "shelter-winter-review", severity: "warning", kind: "advisory", category: "Weather",
    message: `${names(threeSeason)} ${threeSeason.length === 1 ? "is" : "are"} labelled 3-season, while snow or very low temperatures are recorded. A season label alone cannot determine wind or snow-load suitability.`,
    itemIds: ids(threeSeason), basis: "Catalog shelter season and trip conditions", action: "Check manufacturer limitations and local forecasts, including snow load and wind exposure.",
  });
  if (winter) {
    const unknownSeason = shelters.filter(item => !canon(item.gear?.season));
    if (unknownSeason.length) issues.push({
      id: "shelter-season-unknown", severity: "info", kind: "unknown", category: "Weather",
      message: `Season/snow-load suitability is not recorded for ${names(unknownSeason)} while winter conditions are planned.`,
      itemIds: ids(unknownSeason), basis: "Missing shelter season specification and planned cold/snow conditions", action: "Check shelter manufacturer's wind and snow-load limitations rather than relying on a generic season label.",
    });
  }
  return issues;
}

function waterChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const water = active(items).filter(item => categoryOf(item) === "water");
  const containers = water.filter(item => ["bottle", "reservoir", "bladder", "water-bottle", "hydration-reservoir", "hydration-bladder", "canteen"].includes(slugOf(item)));
  const verifiedContainers = containers.filter(item => positiveVolume(item.gear?.capacity_l));
  const unknownContainers = containers.filter(item => !positiveVolume(item.gear?.capacity_l));
  const recordedLiters = verifiedContainers.reduce((sum, item) => sum + item.gear!.capacity_l! * item.quantity, 0);
  const maxCarry = Math.max(0, ...days.map(day => day.waterCarryL).filter((n): n is number => validNumber(n) && n > 0 && n <= 100));
  const issues: CompatibilityIssue[] = [];
  const sourceDays = days.filter(day => !!day.waterSource?.trim());
  const treatment = water.filter(item => ["filter", "purifier", "treatment", "water-filter", "water-purifier"].includes(slugOf(item)));
  if (sourceDays.length && !treatment.length) issues.push({
    id: "water-treatment-unverified", severity: "info", kind: "advisory", category: "Water",
    message: "A trip-day water source is listed, but no filter or purifier is recorded. Boiling, pre-treated supplies or another arrangement may be planned.",
    itemIds: ids(water), basis: "Trip-day water sources and recorded water-treatment products", action: "Confirm whether source water needs treatment and how it will be handled.",
  });
  if (!maxCarry) {
    if (days.length && water.length) issues.push({
      id: "water-carry-unplanned", severity: "info", kind: "unknown", category: "Water",
      message: "Trip days have no recorded water-carry target, so the listed container volume cannot be compared with a planned carry.",
      itemIds: ids(water), basis: "Trip Planner days lack waterCarryL values", action: "Record planned carry volumes after checking water access and the route.",
    });
    return issues;
  }
  if (unknownContainers.length) issues.push({
    id: "water-volume-unknown", severity: "info", kind: "unknown", category: "Water",
    message: `Some containers have no recorded storage volume (${names(unknownContainers)}).`,
    itemIds: ids(unknownContainers), basis: "Trip-day planned water carry and missing container capacities", action: "Confirm the usable volume of all bottles and reservoirs.",
  });
  if (recordedLiters < maxCarry && unknownContainers.length === 0) issues.push({
    id: "water-volume-check", severity: containers.length ? "warning" : "info", kind: containers.length ? "check" : "unknown", category: "Water",
    message: `Water storage mismatch: planned carry is ${maxCarry} L, but only ${recordedLiters} L of container capacity is documented. Unlisted or shared containers may account for the difference.`,
    itemIds: ids(water), basis: "Maximum Trip Planner waterCarryL vs explicitly listed container volumes", action: "Add enough documented container capacity for the planned carry, or update the water plan after confirming water access and shared supplies.",
  });
  else if (recordedLiters < maxCarry) issues.push({
    id: "water-volume-unverified", severity: "info", kind: "unknown", category: "Water",
    message: `The plan calls for ${maxCarry} L, while ${recordedLiters} L is documented and other container volumes are unknown.`,
    itemIds: ids(containers), basis: "Incomplete water-storage specifications", action: "Verify the missing container volumes before comparing against the carry plan.",
  });
  return issues;
}

function equipmentChecks(build: BuildForCompat, items: CompatItem[], days: readonly TripDayForCompat[]): CompatibilityIssue[] {
  const { nights, overnight } = tripContext(build, days);
  const all = active(items);
  const issues: CompatibilityIssue[] = [];
  const packs = all.filter(item => categoryOf(item) === "packs");
  if (overnight) {
    const unmeasuredPacks = packs.filter(item => !positiveVolume(item.gear?.capacity_l));
    if (unmeasuredPacks.length) issues.push({
      id: "pack-volume-unknown", severity: "info", kind: "unknown", category: "Pack fit",
      message: `Pack volume is not recorded for ${names(unmeasuredPacks)}, so capacity cannot be assessed against the overnight load.`,
      itemIds: ids(unmeasuredPacks), basis: "Missing or invalid pack capacity field", action: "Add the manufacturer's pack volume or test-pack the full kit.",
    });
  }
  if (overnight && nights !== null) for (const pack of packs) {
    const cap = pack.gear?.capacity_l;
    // Deliberately advisory: these are optional packing heuristics, not minimum volume requirements.
    const heuristic = nights <= 2 ? 30 : nights <= 5 ? 45 : 55;
    if (positiveVolume(cap) && cap < heuristic) issues.push({
      id: `pack-fit-review-${pack.id}`, severity: "info", kind: "advisory", category: "Pack fit",
      message: `${nameOf(pack)} is ${cap} L for a ${nights}-night trip. ${heuristic} L is a rough planning heuristic, not a required minimum; compact setups can work well.`,
      itemIds: [pack.id], basis: "Recorded pack volume and trip duration; optional planning heuristic", action: "Test-pack the complete kit, including water and food, to verify real fit.",
    });
  }
  if (overnight && ![build.conditions, ...days.map(day => day.conditions)].some(condition => !!canon(condition))) issues.push({
    id: "trip-conditions-unknown", severity: "info", kind: "unknown", category: "Weather",
    message: "No trip conditions are recorded, so wet-weather and winter gear checks may miss relevant conditions.",
    basis: "Missing planned weather conditions", action: "Record expected conditions and check a current forecast near departure.",
  });
  if (tripContext(build, days).wet && !all.some(item => categoryOf(item) === "clothing" && item.gear?.waterproof === true)) issues.push({
    id: "rain-layer-unverified", severity: "info", kind: "unknown", category: "Weather",
    message: "Wet conditions are recorded, but the inventory has no confirmed waterproof clothing specification. A rain layer may still be packed under a custom entry.",
    itemIds: ids(all.filter(item => categoryOf(item) === "clothing")), basis: "Wet trip conditions and missing affirmative waterproof clothing data", action: "Verify personal rain protection for everyone without assuming missing catalog data means missing gear.",
  });
  if (build.people === 1) for (const cat of ["shelter", "packs"]) {
    const chosen = all.filter(item => categoryOf(item) === cat);
    const unique = new Set(chosen.map(item => item.gear?.id ?? item.id));
    if (unique.size > 1) issues.push({
      id: `multiple-${cat}`, severity: "info", kind: "advisory", category: "Inventory review",
      message: `${unique.size} distinct ${cat} products are recorded for a solo trip. They may be alternatives or deliberate backups.`,
      itemIds: ids(chosen), basis: "Solo trip and multiple catalog products", action: "Confirm what is actually carried; do not remove equipment without reviewing the trip plan.",
    });
  }
  if (build.people === 1) for (const item of packs.concat(all.filter(item => categoryOf(item) === "shelter"))) {
    if (item.quantity > 1) issues.push({
      id: `duplicate-units-${item.id}`, severity: "info", kind: "advisory", category: "Inventory review",
      message: `${item.quantity} copies of ${nameOf(item)} are recorded on a solo trip. These may be backups or a quantity entry to check.`,
      itemIds: [item.id], basis: "Solo group size and repeated item quantity", action: "Confirm the quantity is intentional; keep needed backups.",
    });
  }
  const zeroWeights = all.filter(item => (item.gear?.weight_g ?? item.weightSnapshot) === 0);
  if (zeroWeights.length) issues.push({
    id: "zero-weights", severity: "info", kind: "advisory", category: "Data quality",
    message: `Zero weight is recorded for ${names(zeroWeights)}. This may be intentional, but can cause an understated pack weight.`,
    itemIds: ids(zeroWeights), basis: "Zero gram gear weights", action: "Double-check these weights; keep zero only if accurate.",
  });
  const weightUnknown = all.filter(item => {
    const weight = item.gear?.weight_g ?? item.weightSnapshot;
    return !validNumber(weight) || weight < 0;
  });
  if (weightUnknown.length) issues.push({
    id: "unknown-weights", severity: "info", kind: "unknown", category: "Data quality",
    message: `${weightUnknown.reduce((sum, item) => sum + item.quantity, 0)} gear unit(s) have no valid recorded weight. Weight totals are known-weight subtotals, not a full load.`,
    itemIds: ids(weightUnknown), basis: "Missing or invalid item weights", action: "Add verified weights to improve load analysis.",
  });
  return issues;
}

/** No weather API is called here. Trip conditions are only user-entered data. */
export function evaluateCompatibility(
  build: BuildForCompat,
  items: CompatItem[],
  days: TripDayForCompat[] = [],
): CompatibilityIssue[] {
  const issues = [
    ...essentialChecks(build, items, days),
    ...sleepChecks(build, items, days),
    ...shelterChecks(build, items, days),
    ...waterChecks(build, items, days),
    ...equipmentChecks(build, items, days),
  ];
  const order: Record<CompatibilitySeverity, number> = { error: 0, warning: 1, info: 2 };
  // Stable IDs + severity ordering make the UI and tests predictable.
  return issues.sort((a, b) => order[a.severity] - order[b.severity] || a.id.localeCompare(b.id));
}

export function summarizeCompatibility(issues: readonly CompatibilityIssue[]) {
  const errors = issues.filter(issue => issue.severity === "error").length;
  const warnings = issues.filter(issue => issue.severity === "warning").length;
  const infos = issues.filter(issue => issue.severity === "info").length;
  const unknowns = issues.filter(issue => issue.kind === "unknown").length;
  const status: "ok" | "warning" | "error" | "incomplete" | "notes" =
    errors ? "error" : warnings ? "warning" : unknowns ? "incomplete" : infos ? "notes" : "ok";
  return { status, errors, warnings, infos, unknowns, total: issues.length };
}

