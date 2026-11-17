"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CalendarDays, ChevronDown, CookingPot, Droplets, Info, Plus, Save, Trash2, Package, Truck, TrendingDown, Users, Utensils } from "lucide-react";
import { saveTripFoodPlan } from "@/lib/tracked-build-actions";
import { readWaypoints, type PlannerBuild } from "@/lib/trip-planner";
import { type PackAnalysis } from "@/lib/pack-analysis";
import WaterPlanningSection from "@/components/builder/WaterPlanningSection";
import { useDisplayPreferences } from "@/components/settings/DisplayPreferencesProvider";
import { weightText } from "@/lib/user-preferences";
import { DEFAULT_FOOD_SETTINGS, MEAL_SLOTS, projectFoodPlan, readFoodPlan, type FoodItem, type FoodPlan, type FoodResupply, type FoodSettings, type MealSlot, type PlannedMeal } from "@/lib/food-plan";
import { DEFAULT_QUICK_FOOD, estimateFoodPlanningScenario, type FoodStyle, type CookingStyle, type QuickFoodPreferences } from "@/lib/food-planning-estimate";
import { readPrivateResources } from "@/lib/trip-resources";

const input = "w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700";
const label = "block space-y-1 text-xs font-semibold text-gray-700";
const button = "inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40";
const card = "rounded-xl border border-gray-200 bg-white p-4 sm:p-5";
const newId = () => crypto.randomUUID();
function numeric(raw: string, lo: number, hi: number, fallback = 0) { const n = Number(raw); return raw.trim() === "" ? fallback : Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : fallback; }
function dayLabel(date: Date, i: number) {
  const parsed = new Date(date);
  return `Day ${i + 1}${Number.isFinite(+parsed) ? ` · ${parsed.toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "UTC" })}` : ""}`;
}
export default function FoodConsumablesPlanner({ pack, trip }: { pack: PackAnalysis; trip: PlannerBuild }) {
  const router = useRouter();
  const { weightUnit } = useDisplayPreferences();
  const format = (n:number) => weightText(Math.max(0,n), weightUnit);
  const serverSignature = JSON.stringify(trip.tripLogistics ?? null);
  const [plan, setPlanState] = useState<FoodPlan>(() => readFoodPlan(trip.tripLogistics));
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState({ inventory: true, fuel: false, resupply: false });
  const [showDetails, setShowDetails] = useState(() => {
    const current = readFoodPlan(trip.tripLogistics);
    return !!(current.foods.length || current.meals.length || current.resupplies.length || current.settings.startingFuelGrams);
  });
  useEffect(() => {
    if (!dirty) setPlanState(readFoodPlan(trip.tripLogistics));
    // When server props change, don't overwrite an unsaved draft.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSignature]);
  useEffect(() => {
    const onReplace = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== trip.id) return;
      setDirty(false); setStatus("");
    };
    window.addEventListener("trailpicker:build-replaced", onReplace);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplace);
  }, [trip.id]);
  const days = useMemo(() => [...trip.days].sort((a,b) => +new Date(a.date) - +new Date(b.date)), [trip.days]);
  const dayIds = useMemo(() => days.map(d=>d.id), [days]);
  const route = useMemo(() => readWaypoints(trip.routeWaypoints), [trip.routeWaypoints]);
  const resupplyStops = route.filter(p=>p.kind === "resupply");
  const forecast = useMemo(() => projectFoodPlan(plan,dayIds,route,pack.baseGrams,pack.consumableGrams), [plan, dayIds, route, pack.baseGrams, pack.consumableGrams]);
  const active = days[Math.min(activeDay, Math.max(0,days.length-1))];
  const selectedMeals = active ? plan.meals.filter(m=>m.dayId===active.id) : [];
  const maxCarried = Math.max(1,...forecast.days.map(day=>day.packStartKnownGrams));
  const hasOtherUnknown = pack.lines.some(line=>line.weightClass === "consumable" && line.grams === null);
  const unknownMass = forecast.missingFoodWeights || hasOtherUnknown;
  const hasFood = plan.foods.length > 0;
  const quick = { ...DEFAULT_QUICK_FOOD, ...plan.quick };
  const quickForecast = useMemo(() => estimateFoodPlanningScenario(trip.people, days.length, quick),
    // Only the primitive options trigger recalculation; avoid stale object references.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trip.people, days.length, quick.foodStyle, quick.cookingStyle, quick.hotServingsPerPerson]);
  const waterSettings = readPrivateResources(trip.tripLogistics).settings;
  const previewDays = quickForecast.daily.length > 14
    ? [...quickForecast.daily.slice(0, 7), quickForecast.daily[quickForecast.daily.length - 1]]
    : quickForecast.daily;
  const patchQuick = (patch: Partial<QuickFoodPreferences>) => setPlan({ ...plan, quick: { ...quick, ...patch } });
  const setPlan = (next:FoodPlan) => {setPlanState(next);setDirty(true);setStatus("");};
  const patchSettings = (patch:Partial<FoodSettings>) => setPlan({...plan,settings:{...plan.settings,...patch}});
  const patchFood = (id:string,patch:Partial<FoodItem>) => setPlan({...plan,foods:plan.foods.map(f=>f.id===id?{...f,...patch}:f)});
  const removeFood = (id:string) => setPlan({...plan,foods:plan.foods.filter(f=>f.id!==id),meals:plan.meals.filter(m=>m.foodId!==id),resupplies:plan.resupplies.flatMap(r=>r.foodId!==id?[r]:r.fuelGrams>0?[{...r,foodId:"",units:0}]:[])});
  const patchMeal = (id:string,patch:Partial<PlannedMeal>) => setPlan({...plan,meals:plan.meals.map(m=>m.id===id?{...m,...patch}:m)});
  const patchResupply = (id:string,patch:Partial<FoodResupply>) => setPlan({...plan,resupplies:plan.resupplies.map(r=>r.id===id?{...r,...patch}:r)});
  function addMeal(slot:MealSlot) {
    if (!active || !hasFood || plan.meals.length>=3000) return;
    setPlan({...plan,meals:[...plan.meals,{id:newId(),dayId:active.id,slot,foodId:plan.foods[0].id,units:1,heated:false}]});
  }
  function addResupply() {
    if (!resupplyStops.length || plan.resupplies.length >= 200) return;
    setPlan({...plan,resupplies:[...plan.resupplies,{id:newId(),waypointId:resupplyStops[0].id,foodId:plan.foods[0]?.id||"",units:plan.foods.length?1:0,fuelGrams:plan.foods.length?0:100}]});
    setExpanded(s=>({...s,resupply:true}));
  }
  async function save() {
    if (saving || !dirty) return;
    setSaving(true);setStatus("");
    try {
      const form = new FormData();
      form.set("buildId",trip.id);form.set("foodPlan",JSON.stringify(plan));
      await saveTripFoodPlan(form);
      setDirty(false);setStatus("Food and consumables plan saved.");
      router.refresh();
    } catch (error) {setStatus(error instanceof Error?error.message:"Could not save food plan. Your changes remain here.");}
    finally {setSaving(false);}
  }
  const panelButton = (key:keyof typeof expanded,title:string) => <button type="button" aria-expanded={expanded[key]} className="flex w-full items-center justify-between text-left" onClick={()=>setExpanded(s=>({...s,[key]:!s[key]}))}>
    <strong className="text-base text-gray-950">{title}</strong><span className="text-xs font-semibold text-green-800">{expanded[key]?"Collapse":"Expand"}</span>
  </button>;
  return <section aria-labelledby="food-consumables-heading" className="scroll-mt-20 space-y-5 border-b border-gray-200 pb-8 text-gray-800">
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div><h2 id="food-consumables-heading" className="text-xl font-bold text-gray-950">Food & consumables</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Start with a simple estimate. Adjust it if your trip needs something different.</p></div>
      <button type="button" className="inline-flex items-center gap-2 rounded-lg bg-green-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800 disabled:opacity-40" disabled={saving||!dirty} onClick={save}>
        <Save className="h-4 w-4" aria-hidden="true"/>{saving?"Saving…":dirty?"Save plan":"Saved"}</button>
    </header>
    {status && <p role="status" className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">{status}</p>}

    <section aria-labelledby="quick-consumables-heading" className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 id="quick-consumables-heading" className="text-base font-bold text-gray-950">Quick supply estimate</h3>
            <p className="mt-1 text-xs leading-5 text-gray-500">Uses the group size and itinerary you already entered.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1.5"><Users className="h-3.5 w-3.5"/>{quickForecast.people} {quickForecast.people === 1 ? "hiker" : "hikers"}</span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1.5"><CalendarDays className="h-3.5 w-3.5"/>{quickForecast.days ? `${quickForecast.days} ${quickForecast.days===1?"day":"days"}` : "No dates"}</span>
            <a href="#overview" className="font-semibold text-green-800 hover:underline">Edit trip</a>
          </div>
        </div>
      </div>
      <div className="space-y-5 px-4 py-5 sm:px-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className={label}><span className="flex items-center gap-1.5"><Utensils className="h-3.5 w-3.5"/>What kind of food?</span>
            <select aria-label="Food packing style" className={input} value={quick.foodStyle} onChange={e=>patchQuick({foodStyle:e.target.value as FoodStyle})}>
              <option value="dehydrated">Mostly dried or packaged</option>
              <option value="mixed">A mix of different foods</option>
              <option value="fresh">Mostly heavier fresh foods</option>
            </select>
          </label>
          <label className={label}><span className="flex items-center gap-1.5"><CookingPot className="h-3.5 w-3.5"/>Meal preparation</span>
            <select aria-label="Meal preparation" className={input} value={quick.cookingStyle} onChange={e=>patchQuick({cookingStyle:e.target.value as CookingStyle})}>
              <option value="no-stove">No stove required</option>
              <option value="boil">Mostly hot water</option>
              <option value="cook">Cooking hot meals</option>
            </select>
          </label>
          <label className={label}>Hot servings per person, per day
            <select aria-label="Hot servings per person per day" className={input} disabled={quick.cookingStyle==="no-stove"} value={quick.hotServingsPerPerson} onChange={e=>patchQuick({hotServingsPerPerson:Number(e.target.value)})}>
              {[0,1,2,3,4,5,6].map(n=><option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-xs font-semibold text-green-900">Estimated food to pack</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-green-950">{quickForecast.days ? format(quickForecast.startingFoodGrams) : "—"}</p>
            <p className="mt-1 text-xs text-green-900">{quickForecast.days ? `${format(quickForecast.roughLowGrams)} to ${format(quickForecast.roughHighGrams)} rough weight range` : "Set trip dates to estimate"}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold text-gray-700">Planned hot servings</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-gray-950">{quickForecast.days ? quickForecast.hotPreparations : "—"}</p>
            <p className="mt-1 text-xs text-gray-500">{quick.cookingStyle === "no-stove" ? "No stove planned" : "Across the group and trip"}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold text-gray-700">Water carry capacity</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-gray-950">{waterSettings.capacityL} L</p>
            <p className="mt-1 text-xs text-gray-500">From your water planning settings</p>
          </div>
        </div>
        <p className="flex items-start gap-2 text-xs leading-5 text-gray-500"><Info className="mt-0.5 h-4 w-4 shrink-0"/>Food weights are rough packing placeholders, not nutrition targets or verified supply requirements. The estimate does not add items or weight to Builder. Cooking activity is shown without assuming a fuel amount; check stove-specific requirements independently.</p>
        <div className="border-t border-gray-100 pt-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div><h4 className="text-sm font-bold text-gray-950">Estimated food weight over time</h4>
              <p className="mt-1 text-xs text-gray-500">Illustrative amount remaining at the start of each day, assuming equal daily use and no food resupply.</p></div>
            {quickForecast.days>0 && <span className="text-xs font-medium text-gray-500">Day 1: {format(quickForecast.startingFoodGrams)}</span>}
          </div>
          {quickForecast.daily.length ? <div className="mt-4 space-y-3" role="list" aria-label="Estimated daily food weight">
            {previewDays.map(day=><div role="listitem" key={day.day} className="grid grid-cols-[3.5rem_minmax(0,1fr)_5.5rem] items-center gap-3 sm:grid-cols-[5rem_minmax(0,1fr)_6rem]">
              <span className="text-xs font-semibold text-gray-700">Day {day.day}</span>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-green-700" style={{width:`${Math.min(100,day.startingFoodGrams/Math.max(1,quickForecast.startingFoodGrams)*100)}%`}}/></div>
              <span className="text-right text-xs font-semibold tabular-nums text-gray-900">{format(day.startingFoodGrams)}</span>
            </div>)}
          </div>:<p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">Add trip dates in Overview to see the day-by-day estimate.</p>}
          {quickForecast.days>0 && <p className="mt-3 text-xs text-gray-500">{quickForecast.days>14 ? "Showing the first 7 days and the final day. " : ""}Actual food use, resupplies, meal timing, and packaging may change this curve. Track specific items below for a recorded-weight forecast.</p>}
        </div>
      </div>
    </section>

    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1"><Droplets className="h-4 w-4 text-blue-700"/><h3 className="text-sm font-bold text-gray-950">Water along your route</h3></div>
      <WaterPlanningSection buildId={trip.id} routePoints={route} logistics={trip.tripLogistics} />
    </div>

    <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <button className="flex w-full items-center justify-between gap-3 text-left" type="button" onClick={()=>setShowDetails(value=>!value)} aria-expanded={showDetails}>
        <span><strong className="block text-base text-gray-950">Detailed inventory & resupply</strong>
          <span className="mt-1 block text-xs text-gray-500">Optional: exact food items, individual meals, existing fuel assumptions, and mapped supply stops.{hasFood ? ` ${plan.foods.length} food items saved in this plan.` : ""}</span></span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${showDetails?"rotate-180":""}`}/>
      </button>
      {showDetails && <div className="mt-5 space-y-4 border-t border-gray-100 pt-4">
        <div className="grid gap-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-700 sm:grid-cols-2">
          <span>Builder consumables: <strong>{format(pack.consumableGrams)}</strong></span>
          <span>Additional itemized food: <strong>{format(forecast.startingFoodKnownGrams)}{forecast.missingFoodWeights?" + unknown":""}</strong></span>
          <span>Recorded fuel at start: <strong>{format(plan.settings.startingFuelGrams)}</strong></span>
          <span>Known carried gear + recorded supplies: <strong>{format(forecast.initialCarriedKnownGrams)}{unknownMass?" + unknown":""}</strong></span>
        </div>
        <p className="text-xs leading-5 text-gray-500">The detailed inventory is saved separately from the quick scenario. Only itemized supplies with their pack-weight switches enabled affect the Builder total; avoid counting the same supplies twice.</p>
    <div className={card}>
      {panelButton("inventory","Food inventory")}
      {expanded.inventory && <div className="mt-4 space-y-3">
        <p className="text-xs leading-5 text-gray-500">Use a unit consistently, such as one packet or one serving. Enter mass for <strong>one unit</strong>, including packaging if you carry it. Unknown mass stays unknown.</p>
        {plan.foods.map(food=><div key={food.id} className="grid items-end gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 sm:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))_auto]">
          <label className={label}>Food name<input className={input} value={food.name} maxLength={120} onChange={e=>patchFood(food.id,{name:e.target.value})}/></label>
          <label className={label}>Unit weight (g)<input className={input} type="number" min="0" max="100000" step="0.1" placeholder="Unknown" value={food.gramsPerUnit??""} onChange={e=>patchFood(food.id,{gramsPerUnit:e.target.value===""?null:numeric(e.target.value,0,100000)})}/></label>
          <label className={label}>Start quantity<input className={input} type="number" min="0" max="10000" step="0.25" value={food.startingUnits} onChange={e=>patchFood(food.id,{startingUnits:numeric(e.target.value,0,10000)})}/></label>
          <button type="button" className="rounded-lg p-2 text-red-700 hover:bg-red-50" aria-label={`Remove ${food.name}`} onClick={()=>removeFood(food.id)}><Trash2 className="h-4 w-4"/></button>
          <label className="flex items-center gap-2 text-xs text-gray-600 sm:col-span-4"><input type="checkbox" checked={food.countInPack} onChange={e=>patchFood(food.id,{countInPack:e.target.checked})}/>Add this inventory to carried-weight forecast (uncheck if already counted in Builder)</label>
        </div>)}
        <button className={button} type="button" disabled={plan.foods.length>=150} onClick={()=>setPlan({...plan,foods:[...plan.foods,{id:newId(),name:`Food ${plan.foods.length+1}`,gramsPerUnit:null,startingUnits:1,countInPack:true}]})}><Plus className="h-4 w-4"/>Add food</button>
        {!hasFood && <p className="text-sm text-gray-500">No food yet. Add an inventory item to start scheduling meals.</p>}
      </div>}
    </div>
    <div className={card}>
      <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="flex items-center gap-2 text-base font-bold text-gray-950"><CookingPot className="h-4 w-4"/>Daily meal plan</h3>
        {days.length>0 && <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">Trip day
          <select className={input} value={Math.min(activeDay,days.length-1)} onChange={e=>setActiveDay(Number(e.target.value))}>{days.map((d,i)=><option key={d.id} value={i}>{dayLabel(d.date,i)}</option>)}</select>
        </label>}</div>
      {!days.length?<p className="mt-3 text-sm text-amber-800">Set your trip dates to create itinerary days before scheduling meals.</p>:<div className="mt-4 grid gap-4 sm:grid-cols-2">
        {MEAL_SLOTS.map(slot=><section key={slot} className="rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between gap-2"><h4 className="text-sm font-semibold capitalize text-gray-900">{slot}</h4>
            <button type="button" className={button} disabled={!hasFood||plan.meals.length>=3000} onClick={()=>addMeal(slot)}><Plus className="h-3 w-3"/>Add</button></div>
          <div className="mt-2 space-y-2">{selectedMeals.filter(m=>m.slot===slot).map(meal=><div key={meal.id} className="space-y-2 rounded-lg bg-gray-50 p-2">
            <div className="flex gap-2"><select className={input} aria-label={`${slot} food`} value={meal.foodId} onChange={e=>patchMeal(meal.id,{foodId:e.target.value})}>{plan.foods.map(f=><option value={f.id} key={f.id}>{f.name}</option>)}</select>
              <button className="p-2 text-red-700" type="button" aria-label="Remove meal" onClick={()=>setPlan({...plan,meals:plan.meals.filter(m=>m.id!==meal.id)})}><Trash2 className="h-4 w-4"/></button></div>
            <div className="flex flex-wrap items-center gap-3"><label className="flex items-center gap-1 text-xs">Units<input type="number" min="0.01" max="10000" step="0.25" className={`${input} w-20`} value={meal.units} onChange={e=>patchMeal(meal.id,{units:numeric(e.target.value,0.01,10000,0.01)})}/></label>
              <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={meal.heated} onChange={e=>patchMeal(meal.id,{heated:e.target.checked})}/>Count a heating session</label></div>
          </div>)}{!selectedMeals.some(m=>m.slot===slot)&&<p className="text-xs text-gray-400">No meals planned</p>}</div>
        </section>)}
      </div>}
      <p className="mt-3 text-xs text-gray-500">Meal entries reduce inventory on the assigned day. If supplies run short, the forecast flags missing quantities instead of pretending they were packed.</p>
    </div>
    <div className={card}>
      {panelButton("fuel","Fuel planning assumptions")}
      {expanded.fuel && <div className="mt-4 space-y-3"><p className="text-xs text-gray-500">Fuel mass is a configurable planning estimate, not a stove-specific consumption prediction. Heating sessions come from the meal checkboxes.</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {([
          ["startingFuelGrams","Fuel packed initially (g)",0,50000,1],
          ["fuelGramsPerHeating","Assumed g per heating session",0,1000,1],
          ["fuelAdjustment","Adjustment factor",0.25,4,0.05],
          ["fuelReservePercent","Extra planning reserve (%)",0,100,1],
          ["otherDailyUseGrams","Other Builder consumables used daily (g)",0,100000,1],
        ] as const).map(([key,title,min,max,step])=><label key={key} className={label}>{title}<input type="number" min={min} max={max} step={step} className={input} value={plan.settings[key]} onChange={e=>patchSettings({[key]:numeric(e.target.value,min,max)} as Partial<FoodSettings>)}/></label>)}
        </div><label className="flex items-center gap-2 text-xs text-gray-700"><input type="checkbox" checked={plan.settings.countFuelInPack} onChange={e=>patchSettings({countFuelInPack:e.target.checked})}/>Add separately planned fuel to carried pack weight (uncheck if already in Builder)</label>
        <button className="text-xs font-semibold text-gray-500 underline" type="button" onClick={()=>patchSettings(DEFAULT_FOOD_SETTINGS)}>Restore default assumptions</button>
      </div>}
      <div className="mt-3 flex flex-wrap gap-4 border-t border-gray-100 pt-3 text-sm"><span>Heating sessions: <strong>{plan.meals.filter(m=>m.heated).length}</strong></span><span>Estimated consumption: <strong>{format(forecast.fuelNeededGrams)}</strong></span><span>With reserve: <strong>{format(forecast.fuelTargetWithReserveGrams)}</strong></span><span>Available from start + mapped resupplies: <strong>{format(forecast.totalFuelSuppliedGrams)}</strong></span></div>
      {forecast.totalFuelSuppliedGrams < forecast.fuelTargetWithReserveGrams && <p role="status" className="mt-2 text-xs text-amber-800">Planned fuel is below the selected consumption-plus-reserve estimate. This does not verify fuel needs or availability.</p>}
    </div>
    <div className={card}>
      {panelButton("resupply","Food & fuel resupply stops")}
      {expanded.resupply && <div className="mt-4 space-y-3">
        <p className="text-xs text-gray-600">Attach supplies to a Phase 6 resupply waypoint with a trip day. Supplies are added at the <strong>start</strong> of that day. Changes to route day assignment take effect after saving the route and refreshing the plan.</p>
        {plan.resupplies.map(r=><div key={r.id} className="grid gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className={`${label} lg:col-span-2`}>Mapped resupply stop<select className={input} value={r.waypointId} onChange={e=>patchResupply(r.id,{waypointId:e.target.value})}>
            {!resupplyStops.some(p=>p.id===r.waypointId)&&<option value={r.waypointId}>Removed stop (reassign)</option>}
            {resupplyStops.map(p=><option key={p.id} value={p.id}>{p.name}{p.dayId?` · ${days.findIndex(d=>d.id===p.dayId)+1>0?`Day ${days.findIndex(d=>d.id===p.dayId)+1}`:"Unassigned"}`:" · Unassigned"}</option>)}
          </select></label>
          <label className={label}>Food<select className={input} value={r.foodId} onChange={e=>patchResupply(r.id,{foodId:e.target.value,units:e.target.value?r.units||1:0})}><option value="">Fuel only</option>{plan.foods.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
          <label className={label}>Food units<input type="number" min="0" max="10000" step="0.25" className={input} disabled={!r.foodId} value={r.units} onChange={e=>patchResupply(r.id,{units:numeric(e.target.value,0,10000)})}/></label>
          <label className={label}>Fuel added (g)<div className="flex gap-2"><input type="number" min="0" max="50000" className={input} value={r.fuelGrams} onChange={e=>patchResupply(r.id,{fuelGrams:numeric(e.target.value,0,50000)})}/><button type="button" aria-label="Remove resupply" onClick={()=>setPlan({...plan,resupplies:plan.resupplies.filter(x=>x.id!==r.id)})} className="text-red-700"><Trash2 className="h-4 w-4"/></button></div></label>
        </div>)}
        <button type="button" className={button} disabled={!resupplyStops.length||plan.resupplies.length>=200} onClick={addResupply}><Truck className="h-4 w-4"/>Add resupply</button>
        {!resupplyStops.length&&<p className="text-sm text-amber-800">Add a Resupply stop under Route & itinerary, assign it to a day, and save the route first.</p>}
      </div>}
    </div>
    <div className={card}>
      <h3 className="flex items-center gap-2 text-base font-bold text-gray-950"><TrendingDown className="h-4 w-4"/>Daily carried-weight forecast</h3>
      <p className="mt-1 text-xs text-gray-500">Weight at the start of each day after resupply, before that day's meals and other usage. Base gear stays constant. Results include only known masses.</p>
      {forecast.days.length ? <div className="mt-4 space-y-3" role="list" aria-label="Daily estimated pack weight">
        {forecast.days.map(d=><div role="listitem" key={d.dayId} className="grid grid-cols-[3.5rem_minmax(0,1fr)_6.2rem] items-center gap-2 sm:grid-cols-[5rem_minmax(0,1fr)_8rem]">
          <span className="text-xs font-semibold text-gray-700">Day {d.day}</span><div className="min-w-0">
            <div className="h-3 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-green-700" style={{width:`${Math.min(100,d.packStartKnownGrams/maxCarried*100)}%`}}/></div>
            {(d.foodAddedGrams>0||d.fuelAddedGrams>0)&&<span className="text-[11px] text-green-800">+ {format(d.foodAddedGrams+d.fuelAddedGrams)} resupplied</span>}
            {(d.shortfalls.length>0||d.fuelShortfallGrams>0)&&<span className="block text-[11px] font-semibold text-amber-800">Supply shortfall · {d.shortfalls.length} food line(s){d.fuelShortfallGrams>0?` · ${format(d.fuelShortfallGrams)} fuel`:""}</span>}
          </div><span className="text-right text-xs font-bold text-gray-900 tabular-nums">{format(d.packStartKnownGrams)}{unknownMass?" +?":""}</span>
        </div>)}
        </div>:<div className="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-6 text-sm text-gray-500"><Package className="h-5 w-5"/>Set trip dates to see daily weight changes.</div>}
      <div className="mt-4 grid gap-2 border-t border-gray-100 pt-3 text-xs text-gray-600 sm:grid-cols-2">
        <p>Food and fuel consumption are taken from scheduled meals and editable assumptions. Unplanned food stays in your pack.</p>
        <p>Builder consumables stay constant unless you set daily usage. Water planning appears above; water mass is not automatically added to the carried-weight forecast.</p>
      </div>
      {(forecast.orphanedResupplies>0||forecast.orphanedMeals>0||unknownMass||forecast.days.some(d=>d.shortfalls.length||d.fuelShortfallGrams))&&<div role="status" className="mt-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0"/>
        <span>{forecast.orphanedResupplies>0?`${forecast.orphanedResupplies} resupply entry/entries have no mapped day. `:""}{forecast.orphanedMeals>0?`${forecast.orphanedMeals} meal(s) refer to removed days. `:""}{unknownMass?"Some weights are unknown; totals show known mass only. ":""}{forecast.days.some(d=>d.shortfalls.length||d.fuelShortfallGrams)?"Scheduled supplies exceed recorded inventory on at least one day.":""}</span>
      </div>}
    </div>
      </div>}
    </section>
    {dirty&&<p role="status" className="text-xs font-semibold text-amber-800">Unsaved changes to your food and consumables plan.</p>}
  </section>;
}
