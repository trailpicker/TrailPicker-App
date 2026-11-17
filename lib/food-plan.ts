/** Meal and consumables mass planner. Pure calculations, no nutritional or safety advice.
 * Phase 7 data stays in private Build.tripLogistics.phase7 and is never added to public route JSON.
 */
import { COOKING_STYLES, DEFAULT_QUICK_FOOD, FOOD_STYLES, type QuickFoodPreferences } from "./food-planning-estimate";
type FoodStop = { id: string; kind: string; dayId?: string | null };
export const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner', 'snacks'] as const;
export type MealSlot = typeof MEAL_SLOTS[number];
export type FoodItem = { id: string; name: string; gramsPerUnit: number | null; startingUnits: number; countInPack: boolean };
export type PlannedMeal = { id: string; dayId: string; slot: MealSlot; foodId: string; units: number; heated: boolean };
/** A resupply references an actual mapped resupply waypoint; its current day assignment is authoritative. */
export type FoodResupply = { id: string; waypointId: string; foodId: string; units: number; fuelGrams: number };
export type FoodSettings = {
  startingFuelGrams: number;
  countFuelInPack: boolean;
  fuelGramsPerHeating: number;
  fuelAdjustment: number;
  fuelReservePercent: number;
  otherDailyUseGrams: number;
};
export type FoodPlan = { foods: FoodItem[]; meals: PlannedMeal[]; resupplies: FoodResupply[]; settings: FoodSettings; quick?: QuickFoodPreferences };
export const DEFAULT_FOOD_SETTINGS: FoodSettings = {
  startingFuelGrams: 0, countFuelInPack: true, fuelGramsPerHeating: 12,
  fuelAdjustment: 1, fuelReservePercent: 20, otherDailyUseGrams: 0,
};
export const emptyFoodPlan = (): FoodPlan => ({ foods: [], meals: [], resupplies: [], settings: { ...DEFAULT_FOOD_SETTINGS } });
const obj = (value: unknown): Record<string, unknown> | null => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null;
const finite = (x: unknown, lo: number, hi: number, integer = false): x is number => typeof x === 'number' && Number.isFinite(x) && x >= lo && x <= hi && (!integer || Number.isSafeInteger(x));
const str = (x: unknown, max: number): x is string => typeof x === 'string' && x.length <= max;
const fields = (x: Record<string, unknown>, allowed: readonly string[]) => Object.keys(x).every(key => allowed.includes(key));
const fail = (message: string): never => { throw new Error(message); };
function validateQuickFood(value: unknown): QuickFoodPreferences {
  const valueObject = obj(value);
  if (!valueObject || !fields(valueObject, ["foodStyle", "cookingStyle", "hotServingsPerPerson"]) ||
      !FOOD_STYLES.includes(valueObject.foodStyle as QuickFoodPreferences["foodStyle"]) ||
      !COOKING_STYLES.includes(valueObject.cookingStyle as QuickFoodPreferences["cookingStyle"]) ||
      !finite(valueObject.hotServingsPerPerson, 0, 6, true)) {
    fail("Invalid quick food preferences.");
  }
  return valueObject as QuickFoodPreferences;
}
const requireArray = (x: unknown, max: number, label: string): Record<string,unknown>[] => {
  if (!Array.isArray(x) || x.length > max || !x.every(v => obj(v))) fail(`Invalid ${label} (maximum ${max}).`);
  return x as Record<string,unknown>[];
};
const unique = (list: { id: string }[], label: string) => {
  if (new Set(list.map(x => x.id)).size !== list.length) fail(`Duplicate ${label} identifier.`);
};
/** Parse strictly on save/import. Cross references may be absent after an itinerary edit; caller supplies current IDs. */
export function validateFoodPlan(value: unknown, days: readonly string[], points: readonly Pick<FoodStop, 'id' | 'kind'>[]): FoodPlan {
  const root = obj(value);
  if (!root || !fields(root, ['foods','meals','resupplies','settings','quick'])) throw new Error('Invalid food plan.');
  const settings = obj(root.settings);
  if (!settings || !fields(settings, Object.keys(DEFAULT_FOOD_SETTINGS))) throw new Error('Invalid fuel settings.');
  const ranges: Record<keyof Omit<FoodSettings,'countFuelInPack'>, [number,number]> = {
    startingFuelGrams: [0,50000], fuelGramsPerHeating: [0,1000], fuelAdjustment: [0.25,4],
    fuelReservePercent: [0,100], otherDailyUseGrams: [0,100000],
  };
  for (const [key,[lo,hi]] of Object.entries(ranges)) if (!finite(settings[key],lo,hi)) fail(`Invalid ${key}; allowed ${lo}–${hi}.`);
  if (typeof settings.countFuelInPack !== 'boolean') fail('Invalid fuel pack-weight flag.');
  const foods = requireArray(root.foods, 150, 'food inventory').map(row => {
    if (!fields(row,['id','name','gramsPerUnit','startingUnits','countInPack']) || !str(row.id,100) || !row.id ||
        !str(row.name,120) || !row.name.trim() || !(row.gramsPerUnit === null || finite(row.gramsPerUnit,0,100000)) ||
        !finite(row.startingUnits,0,10000) || typeof row.countInPack !== 'boolean') fail('Invalid food item.');
    return { id: row.id as string, name: (row.name as string).trim(), gramsPerUnit: row.gramsPerUnit as number | null,
      startingUnits: row.startingUnits as number, countInPack: row.countInPack as boolean };
  });
  unique(foods, 'food');
  const foodIds = new Set(foods.map(item => item.id));
  const dayIds = new Set(days);
  const meals = requireArray(root.meals, 3000, 'meal schedule').map(row => {
    if (!fields(row,['id','dayId','slot','foodId','units','heated']) || !str(row.id,100) || !row.id ||
      !str(row.dayId,200) || !dayIds.has(row.dayId) || !MEAL_SLOTS.includes(row.slot as MealSlot) ||
      !str(row.foodId,100) || !foodIds.has(row.foodId) || !finite(row.units,0.01,10000) || typeof row.heated !== 'boolean') fail('Invalid meal or removed itinerary day.');
    return row as unknown as PlannedMeal;
  });
  unique(meals, 'meal');
  const stops = new Set(points.filter(point => point.kind === 'resupply').map(point => point.id));
  const resupplies = requireArray(root.resupplies,200,'resupplies').map(row => {
    if (!fields(row,['id','waypointId','foodId','units','fuelGrams']) || !str(row.id,100) || !row.id ||
      !str(row.waypointId,200) || !stops.has(row.waypointId) ||
      !str(row.foodId,100) || (row.foodId !== '' && !foodIds.has(row.foodId)) ||
      !finite(row.units,0,10000) || !finite(row.fuelGrams,0,50000) ||
      (!row.foodId && row.units !== 0) || (row.units === 0 && row.fuelGrams === 0)) fail('Resupply must refer to an existing resupply waypoint and supply food or fuel.');
    return row as unknown as FoodResupply;
  });
  unique(resupplies,'resupply');
  return { foods, meals, resupplies, settings: settings as unknown as FoodSettings, ...(root.quick === undefined ? {} : {quick: validateQuickFood(root.quick)}) };
}
/** Non-throwing read for older saved builds. Invalid entries are ignored, never trusted. */
export function readFoodPlan(logistics: unknown): FoodPlan {
  const root = obj(logistics);
  const raw = root ? obj(root.phase7) : null;
  if (!raw) return emptyFoodPlan();
  // Read without day/route validation; model reports references that have become stale.
  // The saving server action performs strict validation against DB day/waypoint IDs.
  const foods = Array.isArray(raw.foods) ? raw.foods.slice(0,150).filter(obj).flatMap(x => {
    if (!str(x.id,100) || !x.id || !str(x.name,120) || !x.name.trim() ||
        !(x.gramsPerUnit === null || finite(x.gramsPerUnit,0,100000)) || !finite(x.startingUnits,0,10000) || typeof x.countInPack !== 'boolean') return [];
    return [{id:x.id, name:x.name, gramsPerUnit:x.gramsPerUnit, startingUnits:x.startingUnits, countInPack:x.countInPack} as FoodItem];
  }) : [];
  const validFoods = new Set(foods.map(f=>f.id));
  const meals = Array.isArray(raw.meals) ? raw.meals.slice(0,3000).filter(obj).flatMap(x =>
    str(x.id,100) && x.id && str(x.dayId,200) && str(x.foodId,100) && validFoods.has(x.foodId) && MEAL_SLOTS.includes(x.slot as MealSlot) && finite(x.units,0.01,10000) && typeof x.heated === 'boolean' ? [x as unknown as PlannedMeal] : []) : [];
  const resupplies = Array.isArray(raw.resupplies) ? raw.resupplies.slice(0,200).filter(obj).flatMap(x =>
    str(x.id,100) && x.id && str(x.waypointId,200) && str(x.foodId,100) && (!x.foodId || validFoods.has(x.foodId)) && finite(x.units,0,10000) && finite(x.fuelGrams,0,50000) ? [x as unknown as FoodResupply] : []) : [];
  const s = obj(raw.settings);
  const settings = { ...DEFAULT_FOOD_SETTINGS };
  if (s) {
    const limits: Record<string, [number,number]> = { startingFuelGrams:[0,50000],fuelGramsPerHeating:[0,1000],fuelAdjustment:[0.25,4],fuelReservePercent:[0,100],otherDailyUseGrams:[0,100000] };
    for (const [key,[lo,hi]] of Object.entries(limits)) if (finite(s[key],lo,hi)) (settings as unknown as Record<string,unknown>)[key] = s[key];
    if (typeof s.countFuelInPack === 'boolean') settings.countFuelInPack=s.countFuelInPack;
  }
  let quick: QuickFoodPreferences | undefined;
  try { if (raw.quick !== undefined) quick = validateQuickFood(raw.quick); } catch { quick = { ...DEFAULT_QUICK_FOOD }; }
  return {foods,meals,resupplies,settings,...(quick ? {quick} : {})};
}

export type FoodForecastDay = {
  dayId: string; day: number; foodAddedGrams: number; fuelAddedGrams: number;
  foodConsumedGrams: number; fuelConsumedGrams: number; foodStartGrams: number | null;
  foodEndGrams: number | null; fuelStartGrams: number; fuelEndGrams: number;
  packStartKnownGrams: number; packEndKnownGrams: number; unknownFoodWeights: boolean;
  shortfalls: { foodId: string; missingUnits: number }[]; fuelShortfallGrams: number;
  meals: number; heated: number;
};
export type FoodForecast = {
  days: FoodForecastDay[]; startingFoodKnownGrams: number; missingFoodWeights: boolean;
  initialCarriedKnownGrams: number; fuelNeededGrams: number; fuelTargetWithReserveGrams: number;
  totalFuelSuppliedGrams: number; orphanedResupplies: number; orphanedMeals: number;
};
/** All quantities are user-provided planning assumptions. Never imply adequate diet or fuel availability. */
export function projectFoodPlan(plan: FoodPlan, dayIds: readonly string[], route: readonly FoodStop[], baseGrams: number, builderConsumablesGrams: number): FoodForecast {
  const quantities = new Map(plan.foods.map(f=>[f.id,f.startingUnits]));
  const items = new Map(plan.foods.map(f=>[f.id,f]));
  const index = new Map(dayIds.map((id,i)=>[id,i]));
  const waypointDays = new Map(route.filter(p=>p.kind==='resupply').map(p=>[p.id,p.dayId]));
  const byDay = new Map<number,FoodResupply[]>();
  let orphanedResupplies=0;
  for (const r of plan.resupplies) {
    const day=index.get(waypointDays.get(r.waypointId) || '');
    if (day===undefined) {orphanedResupplies++;continue;}
    byDay.set(day,[...(byDay.get(day)||[]),r]);
  }
  const mealsByDay = new Map<number,PlannedMeal[]>();
  let orphanedMeals=0;
  for (const meal of plan.meals) {
    const day=index.get(meal.dayId);
    if (day===undefined) {orphanedMeals++;continue;}
    mealsByDay.set(day,[...(mealsByDay.get(day)||[]),meal]);
  }
  const included = plan.foods.filter(f=>f.countInPack);
  const missingFoodWeights = included.some(f=>f.gramsPerUnit===null && f.startingUnits>0) || plan.resupplies.some(r=>r.foodId && items.get(r.foodId)?.countInPack && items.get(r.foodId)?.gramsPerUnit===null);
  const foodMass = (): number => included.reduce((sum,f)=>sum+(quantities.get(f.id)||0)*(f.gramsPerUnit??0),0);
  const startingFoodKnownGrams = foodMass();
  let fuel=plan.settings.startingFuelGrams;
  let other=builderConsumablesGrams;
  const fuelUnit=plan.settings.fuelGramsPerHeating*plan.settings.fuelAdjustment;
  const fuelNeededGrams=plan.meals.filter(m=>m.heated && index.has(m.dayId)).length*fuelUnit;
  const totalFuelSuppliedGrams=plan.settings.startingFuelGrams+plan.resupplies.reduce((sum,r)=>sum+(index.has(waypointDays.get(r.waypointId)||'')?r.fuelGrams:0),0);
  const days:FoodForecastDay[]=[];
  for (let i=0;i<dayIds.length;i++) {
    let foodAddedGrams=0,fuelAddedGrams=0;
    for (const r of byDay.get(i)||[]) {
      if (r.foodId) {
        quantities.set(r.foodId,(quantities.get(r.foodId)||0)+r.units);
        const item=items.get(r.foodId);
        if (item?.countInPack) foodAddedGrams+=r.units*(item.gramsPerUnit??0);
      }
      fuel+=r.fuelGrams;fuelAddedGrams+=r.fuelGrams;
    }
    const foodStart=foodMass(),fuelStart=fuel;
    const packStartKnownGrams=baseGrams+other+foodStart+(plan.settings.countFuelInPack?fuel:0);
    let foodConsumedGrams=0,fuelConsumedGrams=0,fuelShortfallGrams=0;
    const shortfalls:{foodId:string;missingUnits:number}[]=[];
    const meals = mealsByDay.get(i)||[];
    for(const meal of meals) {
      const available=quantities.get(meal.foodId)||0;
      const eaten=Math.min(available,meal.units);
      quantities.set(meal.foodId,Math.max(0,available-eaten));
      if (eaten<meal.units) shortfalls.push({foodId:meal.foodId,missingUnits:Number((meal.units-eaten).toFixed(2))});
      const item=items.get(meal.foodId);
      if (item?.countInPack) foodConsumedGrams+=eaten*(item.gramsPerUnit??0);
      if (meal.heated) {
        const used=Math.min(fuel,fuelUnit);
        fuel-=used;fuelConsumedGrams+=used;
        fuelShortfallGrams+=fuelUnit-used;
      }
    }
    other=Math.max(0,other-plan.settings.otherDailyUseGrams);
    days.push({dayId:dayIds[i],day:i+1,foodAddedGrams,fuelAddedGrams,foodConsumedGrams,fuelConsumedGrams,
      foodStartGrams:missingFoodWeights?null:foodStart,foodEndGrams:missingFoodWeights?null:foodMass(),
      fuelStartGrams:fuelStart,fuelEndGrams:fuel,packStartKnownGrams,
      packEndKnownGrams:baseGrams+other+foodMass()+(plan.settings.countFuelInPack?fuel:0),
      unknownFoodWeights:missingFoodWeights,shortfalls,fuelShortfallGrams,meals:meals.length,heated:meals.filter(m=>m.heated).length});
  }
  return { days, startingFoodKnownGrams, missingFoodWeights, initialCarriedKnownGrams:baseGrams+builderConsumablesGrams+startingFoodKnownGrams+(plan.settings.countFuelInPack?plan.settings.startingFuelGrams:0),
    fuelNeededGrams,fuelTargetWithReserveGrams:fuelNeededGrams*(1+plan.settings.fuelReservePercent/100),totalFuelSuppliedGrams,orphanedResupplies,orphanedMeals };
}

