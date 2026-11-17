/**
 * Lightweight *mass* scenario for planning backpacking food. This is not
 * nutrition advice or a minimum intake, and it is NOT a saved packing list.
 * Actual food needs depend on the foods chosen and the people on the trip.
 */
export const FOOD_STYLES = ["dehydrated", "mixed", "fresh"] as const;
export const COOKING_STYLES = ["no-stove", "boil", "cook"] as const;
export type FoodStyle = typeof FOOD_STYLES[number];
export type CookingStyle = typeof COOKING_STYLES[number];

export type QuickFoodPreferences = {
  foodStyle: FoodStyle;
  cookingStyle: CookingStyle;
  hotServingsPerPerson: number;
};

export const DEFAULT_QUICK_FOOD: QuickFoodPreferences = {
  foodStyle: "mixed",
  cookingStyle: "boil",
  hotServingsPerPerson: 2,
};

export type FoodPlanningScenario = {
  people: number;
  days: number;
  dailyFoodGrams: number;
  startingFoodGrams: number;
  roughLowGrams: number;
  roughHighGrams: number;
  hotPreparations: number;
  daily: { day: number; startingFoodGrams: number; endingFoodGrams: number; hotPreparations: number }[];
};

/** Baseline mass placeholders for different packing styles, not intake targets. */
const FOOD_MASS_PLACEHOLDER: Record<FoodStyle, number> = {
  dehydrated: 750,
  mixed: 900,
  fresh: 1100,
};

export function estimateFoodPlanningScenario(
  peopleInput: number,
  daysInput: number,
  preferences: QuickFoodPreferences,
): FoodPlanningScenario {
  const people = Number.isFinite(peopleInput) ? Math.max(1, Math.min(100, Math.round(peopleInput))) : 1;
  const days = Number.isFinite(daysInput) ? Math.max(0, Math.min(366, Math.round(daysInput))) : 0;
  const mass = FOOD_MASS_PLACEHOLDER[preferences.foodStyle] ?? FOOD_MASS_PLACEHOLDER.mixed;
  const servings = Number.isFinite(preferences.hotServingsPerPerson)
    ? Math.max(0, Math.min(6, Math.round(preferences.hotServingsPerPerson))) : 0;
  const dailyFoodGrams = mass * people;
  const startingFoodGrams = dailyFoodGrams * days;
  const hotPerDay = preferences.cookingStyle === "no-stove" ? 0 : servings * people;
  return {
    people, days, dailyFoodGrams, startingFoodGrams,
    roughLowGrams: Math.round(startingFoodGrams * 0.7),
    roughHighGrams: Math.round(startingFoodGrams * 1.3),
    hotPreparations: hotPerDay * days,
    daily: Array.from({ length: days }, (_, index) => ({
      day: index + 1,
      startingFoodGrams: Math.max(0, startingFoodGrams - index * dailyFoodGrams),
      endingFoodGrams: Math.max(0, startingFoodGrams - (index + 1) * dailyFoodGrams),
      hotPreparations: hotPerDay,
    })),
  };
}
