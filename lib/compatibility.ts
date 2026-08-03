export type CompatibilitySeverity = "error" | "warning" | "info";

export type CompatibilityIssue = {
    id: string;
    severity: CompatibilitySeverity;
    category: string;
    message: string;
    itemIds?: string[];
};

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
};

export type BuildForCompat = {
    people: number;
    minTemperature: number | null;
    conditions: string | null;
    startDate: Date | null;
    endDate: Date | null;
};

const REQUIRED_CATEGORIES = ["Shelter", "Sleep", "Cooking", "Water"];

function categoryOf(item: CompatItem): string | null {
    return item.gear?.category.name ?? item.customCategory ?? null;
}

function subcategorySlugOf(item: CompatItem): string | null {
    return item.gear?.subcategory?.slug ?? null;
}

function itemNameOf(item: CompatItem): string {
    return item.gear?.name ?? item.gearNameSnapshot ?? "Custom item";
}

function nightsBetween(start: Date | null, end: Date | null): number | null {
    if (!start || !end) return null;
    const ms = end.getTime() - start.getTime();
    return Math.max(1, Math.round(ms / 86_400_000));
}

function coldestTemp(build: BuildForCompat, days: TripDayForCompat[]): number | null {
    const temps = [build.minTemperature, ...days.map((d) => d.minTemperature)].filter(
        (t): t is number => t != null
    );
    return temps.length > 0 ? Math.min(...temps) : null;
}

function conditionsSet(build: BuildForCompat, days: TripDayForCompat[]): Set<string> {
    const set = new Set<string>();
    if (build.conditions) set.add(build.conditions);
    for (const d of days) if (d.conditions) set.add(d.conditions);
    return set;
}

// --- checks --------------------------------------------------------------

function checkTemperatureRating(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[]
): CompatibilityIssue[] {
    const coldest = coldestTemp(build, days);
    if (coldest == null) return [];

    const sleepItems = items.filter((i) => categoryOf(i) === "Sleep" && !i.isConsumable);
    const rated = sleepItems.filter((i) => i.gear?.temperature_rating != null);
    const issues: CompatibilityIssue[] = [];

    if (sleepItems.length > 0 && rated.length === 0) {
        issues.push({
            id: "temp-unrated",
            severity: "info",
            category: "Temperature",
            message: `None of your sleep system items list a temperature rating, so it can't be checked against the trip low of ${coldest}°C.`,
            itemIds: sleepItems.map((i) => i.id),
        });
    }

    for (const item of rated) {
        const rating = item.gear!.temperature_rating!;
        const margin = rating - coldest; // positive => not warm enough

        if (margin > 8) {
            issues.push({
                id: `temp-error-${item.id}`,
                severity: "error",
                category: "Temperature",
                message: `${itemNameOf(item)} is rated to ${rating}°C, but the coldest night is ${coldest}°C — a ${margin}° gap.`,
                itemIds: [item.id],
            });
        } else if (margin > 0) {
            issues.push({
                id: `temp-warn-${item.id}`,
                severity: "warning",
                category: "Temperature",
                message: `${itemNameOf(item)} is rated to ${rating}°C, close to the coldest night of ${coldest}°C. Consider a liner or warmer layers.`,
                itemIds: [item.id],
            });
        }
    }

    return issues;
}

function checkShelterCapacity(build: BuildForCompat, items: CompatItem[]): CompatibilityIssue[] {
    const shelters = items.filter(
        (i) => subcategorySlugOf(i) === "tent" || subcategorySlugOf(i) === "bivy"
    );
    if (shelters.length === 0) return [];

    const totalCapacity = shelters.reduce(
        (sum, i) => sum + (i.gear?.capacity_l ?? 0) * i.quantity,
        0
    );
    if (totalCapacity === 0) return [];

    if (totalCapacity < build.people) {
        return [{
            id: "shelter-capacity",
            severity: "error",
            category: "Capacity",
            message: `Your shelter sleeps ${totalCapacity}, but the trip has ${build.people} people.`,
            itemIds: shelters.map((i) => i.id),
        }];
    }

    if (totalCapacity > build.people + 1) {
        return [{
            id: "shelter-oversized",
            severity: "info",
            category: "Capacity",
            message: `Your shelter sleeps ${totalCapacity} for a ${build.people}-person trip — extra weight if that's not intentional.`,
            itemIds: shelters.map((i) => i.id),
        }];
    }

    return [];
}

function checkPackCapacity(build: BuildForCompat, items: CompatItem[]): CompatibilityIssue[] {
    const packs = items.filter((i) => categoryOf(i) === "Packs" && !i.isConsumable);
    if (packs.length === 0) return [];

    const nights = nightsBetween(build.startDate, build.endDate);
    if (nights == null) return [];

    const recommended: [number, number] =
        nights <= 2 ? [30, 50] : nights <= 5 ? [50, 70] : [65, 90];
    const [lo, hi] = recommended;
    const issues: CompatibilityIssue[] = [];

    for (const pack of packs) {
        const cap = pack.gear?.capacity_l;
        if (cap == null) continue;

        if (cap < lo) {
            issues.push({
                id: `pack-small-${pack.id}`,
                severity: "warning",
                category: "Capacity",
                message: `${itemNameOf(pack)} is ${cap}L for a ${nights}-night trip — ${lo}-${hi}L is typically more comfortable.`,
                itemIds: [pack.id],
            });
        } else if (cap > hi + 20) {
            issues.push({
                id: `pack-large-${pack.id}`,
                severity: "info",
                category: "Capacity",
                message: `${itemNameOf(pack)} is ${cap}L for a ${nights}-night trip — more than you likely need.`,
                itemIds: [pack.id],
            });
        }
    }

    return issues;
}

function checkCookwareCapacity(build: BuildForCompat, items: CompatItem[]): CompatibilityIssue[] {
    if (build.people <= 1) return [];

    const cookware = items.filter((i) => subcategorySlugOf(i) === "cookware" && !i.isConsumable);
    if (cookware.length === 0) return [];

    const totalCapacity = cookware.reduce(
        (sum, i) => sum + (i.gear?.capacity_l ?? 0) * i.quantity,
        0
    );
    if (totalCapacity === 0) return [];

    const recommendedMin = build.people * 0.5;
    if (totalCapacity < recommendedMin) {
        return [{
            id: "cookware-small",
            severity: "warning",
            category: "Capacity",
            message: `Cookware totals ${totalCapacity}L for ${build.people} people — closer to ${recommendedMin.toFixed(1)}L+ makes group cooking easier.`,
            itemIds: cookware.map((i) => i.id),
        }];
    }

    return [];
}

function checkWaterproofing(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[]
): CompatibilityIssue[] {
    const conditions = conditionsSet(build, days);
    if (!conditions.has("rain") && !conditions.has("snow")) return [];

    const shelterItems = items.filter((i) => categoryOf(i) === "Shelter" && !i.isConsumable);
    const unrated = shelterItems.filter((i) => i.gear && i.gear.waterproof === false);
    if (unrated.length === 0) return [];

    return [{
        id: "waterproof-shelter",
        severity: "warning",
        category: "Weather",
        message: `Rain or snow is expected, but ${unrated.map(itemNameOf).join(", ")} isn't marked waterproof.`,
        itemIds: unrated.map((i) => i.id),
    }];
}

function checkSeasonRating(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[]
): CompatibilityIssue[] {
    const conditions = conditionsSet(build, days);
    const coldest = coldestTemp(build, days);
    const needsWinterGear = conditions.has("snow") || (coldest != null && coldest <= -10);
    if (!needsWinterGear) return [];

    const threeSeason = items.filter(
        (i) => categoryOf(i) === "Shelter" && !i.isConsumable && i.gear?.season === "3-season"
    );
    if (threeSeason.length === 0) return [];

    return [{
        id: "season-mismatch",
        severity: "warning",
        category: "Weather",
        message: `${threeSeason.map(itemNameOf).join(", ")} is rated 3-season, but conditions call for winter-capable shelter.`,
        itemIds: threeSeason.map((i) => i.id),
    }];
}

function checkEssentialCategories(items: CompatItem[]): CompatibilityIssue[] {
    const present = new Set(
        items.filter((i) => !i.isConsumable).map((i) => categoryOf(i)).filter(Boolean)
    );

    return REQUIRED_CATEGORIES.filter((cat) => !present.has(cat)).map((cat) => ({
        id: `missing-${cat.toLowerCase()}`,
        severity: "info" as const,
        category: "Missing Gear",
        message: `No ${cat.toLowerCase()} gear added yet.`,
    }));
}

function checkDuplicates(items: CompatItem[]): CompatibilityIssue[] {
    const tracked = ["Shelter", "Packs", "Cooking"];
    const issues: CompatibilityIssue[] = [];

    for (const cat of tracked) {
        const inCategory = items.filter((i) => categoryOf(i) === cat && !i.isConsumable);
        const unique = new Set(inCategory.map((i) => i.gear?.id ?? i.id));

        if (unique.size > 1) {
            issues.push({
                id: `duplicate-${cat.toLowerCase()}`,
                severity: "info",
                category: "Redundancy",
                message: `You have ${unique.size} different ${cat.toLowerCase()} items — double check you don't need just one.`,
                itemIds: inCategory.map((i) => i.id),
            });
        }
    }

    return issues;
}

function checkUnknownSpecs(items: CompatItem[]): CompatibilityIssue[] {
    const missingWeight = items.filter(
        (i) => !i.isConsumable && (i.gear?.weight_g ?? i.weightSnapshot) == null
    );
    if (missingWeight.length === 0) return [];

    return [{
        id: "missing-weight",
        severity: "info",
        category: "Data",
        message: `${missingWeight.length} item${missingWeight.length !== 1 ? "s" : ""} ${missingWeight.length !== 1 ? "don't" : "doesn't"} have a listed weight — totals may be underestimated.`,
        itemIds: missingWeight.map((i) => i.id),
    }];
}

function checkBaseWeight(items: CompatItem[]): CompatibilityIssue[] {
    const baseGrams = items
        .filter((i) => !i.isWorn && !i.isConsumable)
        .reduce((sum, i) => sum + (i.gear?.weight_g ?? i.weightSnapshot ?? 0) * i.quantity, 0);

    if (baseGrams > 9000) {
        return [{
            id: "heavy-base-weight",
            severity: "info",
            category: "Weight",
            message: `Base weight is ${(baseGrams / 1000).toFixed(1)}kg — on the heavier end for backpacking.`,
        }];
    }

    return [];
}

// --- entrypoints -----------------------------------------------------------

export function evaluateCompatibility(
    build: BuildForCompat,
    items: CompatItem[],
    days: TripDayForCompat[] = []
): CompatibilityIssue[] {
    return [
        ...checkTemperatureRating(build, items, days),
        ...checkShelterCapacity(build, items),
        ...checkPackCapacity(build, items),
        ...checkCookwareCapacity(build, items),
        ...checkWaterproofing(build, items, days),
        ...checkSeasonRating(build, items, days),
        ...checkEssentialCategories(items),
        ...checkDuplicates(items),
        ...checkUnknownSpecs(items),
        ...checkBaseWeight(items),
    ];
}

export function summarizeCompatibility(issues: CompatibilityIssue[]) {
    const errors = issues.filter((i) => i.severity === "error").length;
    const warnings = issues.filter((i) => i.severity === "warning").length;
    const infos = issues.filter((i) => i.severity === "info").length;
    const status: "ok" | "warning" | "error" =
        errors > 0 ? "error" : warnings > 0 ? "warning" : "ok";

    return { status, errors, warnings, infos, total: issues.length };
}