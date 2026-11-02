/** TrailPicker 0.3 pack intelligence. Pure calculations and conservative, explainable rules.
 * No product database guesses, scraped weather, implied safety certification, or generated AI claims.
 */
import { analyzePack, type PackAnalysis, type PackInputItem } from './pack-analysis';
import { evaluateCompatibility, type CompatibilityIssue, type CompatItem, type BuildForCompat } from './compatibility';
import type { PlannerDay } from './trip-planner';

export type FindingLevel = 'critical' | 'review' | 'opportunity' | 'unknown';
export type FindingSection = 'compatibility' | 'weather' | 'optimization' | 'planning';
export type Finding = {
  id: string;
  section: FindingSection;
  level: FindingLevel;
  title: string;
  detail: string;
  action: string;
  basis: string;
  itemIds: string[];
};
export type IntelligenceBuild = Pick<BuildForCompat,'people'|'minTemperature'|'conditions'|'startDate'|'endDate'>;
export type IntelligenceDay = Pick<PlannerDay,'date'|'minTemperature'|'conditions'|'waterCarryL'|'waterSource'|'distanceKm'|'elevationGainM'|'campsite'>;
export type IntelligenceItem = CompatItem & PackInputItem;
export type ForecastPoint = { name:string; lat:number; lng:number; elevationM:number|null };
export type ForecastDay = {date:string; low:number|null; high:number|null; wind:number|null; gust:number|null; pop:number|null; model:string; samples:number};
export type ForecastEvidence = {point:ForecastPoint; days:ForecastDay[]; alertsStatus:'ok'|'unavailable'; alerts:{title:string}[]; loadedAt:string};
export type IntelligenceResult = { findings:Finding[]; pack:PackAnalysis; coverage:{ratedSleep:number; unratedSleep:number; unknownWeights:number; tripDays:number; modelDays:number}; plannedNights:number|null; coldest:number|null; weatherSource:'forecast'|'planned'|'none' };

const canon = (s:string|null|undefined) => (s||'').trim().toLowerCase();
const category = (i:IntelligenceItem) => canon(i.gear?.category.name ?? i.customCategory);
const name = (i:IntelligenceItem) => i.gear?.name ?? i.gearNameSnapshot ?? 'Custom item';
const positive = (n:number|null|undefined):n is number => typeof n === 'number' && Number.isFinite(n) && n > 0;
function tripNights(build:IntelligenceBuild):number|null {
  if (!build.startDate || !build.endDate) return null;
  const ms = new Date(build.endDate).valueOf() - new Date(build.startDate).valueOf();
  return Number.isFinite(ms) && ms >= 0 ? Math.max(0, Math.round(ms/86400000)) : null;
}
function validTemp(n:unknown):n is number { return typeof n === 'number' && Number.isFinite(n) && n >= -80 && n <= 60; }
const priority:Record<FindingLevel,number> = {critical:0,review:1,opportunity:2,unknown:3};

const extraTitles:Record<string,string> = {
  'missing-packs': 'No backpack recorded',
  'missing-shelter': 'No shelter recorded',
  'missing-sleep': 'No sleep gear recorded',
  'missing-water': 'No water gear recorded',
  'empty-build': 'No gear to evaluate',
  'cooking-plan': 'Cooking plan not recorded',
  'sleep-no-trip-low': 'Cannot assess sleeping temperature',
  'sleep-rating-unknown': 'Sleep system temperature ratings missing',
  'sleep-rating-limits': 'Check sleeping bag comfort ratings',
  'shelter-waterproof-unknown': 'Shelter waterproofing unknown',
  'shelter-wet-weather': 'Shelter may need more rain protection',
  'shelter-winter-review': 'Review shelter suitability for winter',
  'unknown-weights': 'Some gear weights are unknown',
  'multiple-shelter': 'Review multiple shelters',
  'multiple-packs': 'Review multiple packs',
  'trip-low-unknown': 'Cannot assess overnight temperature',
  'sleep-pad-not-listed': 'No sleeping pad recorded',
  'sleep-pad-units': 'Check sleeping pad quantity',
  'sleep-units': 'Not enough sleeping bag/quilt units listed',
  'sleep-insulation-missing': 'No sleeping bag or quilt recorded',
  'sleep-items-unclassified': 'Identify your sleep gear',
  'pad-insulation-unknown': 'Sleeping pad insulation is unknown',
  'pad-insulation-review': 'Review sleeping pad insulation',
  'pad-cold-weather-review': 'Check pad insulation for cold weather',
  'shelter-occupancy-unknown': 'Shelter sleeping capacity unknown',
  'shelter-capacity-short': 'Not enough documented shelter space',
  'shelter-capacity-unverified': 'Shelter capacity cannot be confirmed',
  'shelter-season-unknown': 'Shelter winter suitability unknown',
  'water-volume-unknown': 'Container capacities are missing',
  'water-volume-check': 'Planned water carry exceeds listed capacity',
  'water-volume-unverified': 'Water-carry capacity cannot be confirmed',
  'water-treatment-unverified': 'Water-treatment plan needs checking',
  'water-carry-unplanned': 'Water-carry target not recorded',
  'pack-volume-unknown': 'Backpack volume is unknown',
  'trip-conditions-unknown': 'Trip weather conditions not recorded',
  'rain-layer-unverified': 'Rain protection is unverified',
  'zero-weights': 'Check zero-weight entries',
};

export function compatibilityIssueToFinding(issue:CompatibilityIssue):Finding {
  return {
    id:`gear-${issue.id}`, section:'compatibility',
    // Only official ECCC alerts use the original red "Official alert" card.
    level:issue.kind==='unknown'?'unknown':issue.severity==='error'||issue.severity==='warning'?'review':'opportunity',
    title:extraTitles[issue.id] ??
      (issue.id.startsWith('sleep-rating-review-') ? 'Sleeping temperature mismatch' :
      issue.id.startsWith('pack-fit-review-') ? 'Check backpack fit' :
      issue.id.startsWith('duplicate-units-') ? 'Check duplicate gear quantity' : issue.category),
    detail:issue.message,
    action:issue.action ?? 'Review this finding against your trip arrangements.',
    basis:issue.basis ?? 'Recorded trip and gear data',
    itemIds:issue.itemIds ?? [],
  };
}

export function evaluatePackIntelligence(build:IntelligenceBuild, items:readonly IntelligenceItem[], days:readonly IntelligenceDay[], forecast:ForecastEvidence|null=null):IntelligenceResult {
  const pack = analyzePack(items);
  const findings:Finding[] = [];
  const add = (f:Finding) => findings.push(f);
  const active = items.filter(i=>i.quantity>0);
  const matching = (cat:string) => active.filter(i=>category(i)===cat);
  const nights = tripNights(build);
  const overnight = (nights!==null && nights>0) || days.some(d=>!!d.campsite?.trim());
  const forecastTemps = forecast?.days.map(d=>d.low).filter(validTemp) ?? [];
  const plannedTemps = [build.minTemperature,...days.map(d=>d.minTemperature)].filter(validTemp);
  const temps = [...forecastTemps,...plannedTemps];
  const coldest = temps.length?Math.min(...temps):null;
  const weatherSource = forecastTemps.length ? 'forecast' : plannedTemps.length ? 'planned' : 'none';
  const windy = !!forecast?.days.some(d=>positive(d.gust) && d.gust>=60);
  const activeAlerts = forecast?.alertsStatus==='ok' ? forecast.alerts : [];

  const sleepItems = matching('sleep').filter(i => !i.isConsumable);
  const rated = sleepItems.filter(i => validTemp(i.gear?.temperature_rating));
  const unrated = sleepItems.filter(i => !validTemp(i.gear?.temperature_rating));
  const shelters = matching('shelter');

  if (windy) add({id:'strong-gust',section:'weather',level:'review',title:'Strong gusts in model forecast',detail:'At least one selected-day ECCC model sample has gusts of 60 km/h or more. Ridge and campsite wind can differ.',action:'Review exposed camps, tent guy lines, shelter limits and route alternatives.',basis:'ECCC model-sampled gusts',itemIds:shelters.map(i=>i.id)});
  if (forecast) {
    if (forecast.alertsStatus==='unavailable') add({id:'alerts-unavailable',section:'weather',level:'unknown',title:'Official alerts could not be checked',detail:'ECCC alert data is unavailable. This is not an all-clear.',action:'Check official ECCC weather alerts before departure.',basis:'ECCC alert service unavailable',itemIds:[]});
    if (activeAlerts.length) add({id:'alerts-active',section:'weather',level:'critical',title:`${activeAlerts.length} current ECCC alert${activeAlerts.length===1?'':'s'} at this point`,detail:(activeAlerts.slice(0,3).map(a=>a.title).filter(Boolean).join(' · ')||'Review the alert details.')+' These are current alerts and might not apply to your planned trip dates.',action:'Read the official alert text, coverage and validity before making trip decisions.',basis:'ECCC alert feed at selected location',itemIds:[]});
    if (!forecast.days.length) add({id:'forecast-no-days',section:'weather',level:'unknown',title:'No matching forecast days',detail:'No sampled dates were available for the planned period at this point.',action:'Try a nearer trip date or a different waypoint.',basis:'ECCC model forecast horizon',itemIds:[]});
  } else if (overnight) add({id:'forecast-not-loaded',section:'weather',level:'unknown',title:'Live weather not checked',detail:'Trip conditions alone do not verify the weather at your actual route or campsite.',action:'Select a mapped trip waypoint and load the ECCC model forecast.',basis:'Live forecast not requested',itemIds:[]});

  const duplicates=new Map<string,IntelligenceItem[]>();
  for (const i of active.filter(i=>!i.isConsumable)) {
    if (!i.gear?.id || i.quantity<1) continue;
    duplicates.set(i.gear.id,[...(duplicates.get(i.gear.id)||[]),i]);
  }
  for (const [id, entries] of duplicates) {
    const qty=entries.reduce((sum,i)=>sum+i.quantity,0);
    if (qty>=2 && (category(entries[0])==='packs'||category(entries[0])==='shelter')) add({id:`duplicate-${id}`,section:'optimization',level:'opportunity',title:`Check ${qty} × ${name(entries[0])}`,detail:'Multiple copies of this item are listed. Group equipment and intentional backups are common.',action:'Confirm the quantity is intentional before considering a change.',basis:'Same catalog product and quantity',itemIds:entries.map(i=>i.id)});
  }
  // Similarity is only a review prompt. No automated claim that functional layers or backups are redundant.
  for (const cat of ['shelter','packs']) {
    const entries=matching(cat).filter(i=>!i.isConsumable);
    if (entries.length>=2 && (build.people||1)===1 && new Set(entries.map(i=>i.gear?.id??i.id)).size>1) add({id:`review-multiple-${cat}`,section:'optimization',level:'opportunity',title:`Review multiple ${cat} options`,detail:`${entries.length} different ${cat} entries are recorded for a solo trip; some may be alternatives rather than carried together.`,action:'Check which ones are actually packed. Do not remove shared or backup equipment without reviewing the plan.',basis:'Solo trip, inventory category count',itemIds:entries.map(i=>i.id)});
  }
  if (pack.unknownWeightUnits>0) add({id:'unknown-weight',section:'planning',level:'unknown',title:'Some weight data is missing',detail:`${pack.unknownWeightUnits} item unit(s) have no valid recorded weight. The visible total is a known-weight subtotal, not a complete pack weight.`,action:'Fill missing item weights to improve planning and comparisons.',basis:'Inventory data completeness',itemIds:pack.lines.filter(l=>l.grams===null).map(l=>l.id)});
  if (nights!==null && nights>0 && pack.consumableGrams>0) add({id:'consumables-budget',section:'planning',level:'opportunity',title:'Model how consumables change your load',detail:`${(pack.consumableGrams/1000).toFixed(2)} kg of consumables are listed. Consumption rate and resupplies are not recorded, so any daily curve is an adjustable scenario, not a prediction.`,action:'Use the Pack planning tab to test daily consumption assumptions.',basis:'Consumable flags and trip duration',itemIds:pack.lines.filter(l=>l.weightClass==='consumable').map(l=>l.id)});
  if (days.some(d=>positive(d.waterCarryL))) add({id:'water-demand',section:'planning',level:'opportunity',title:'Water-carry plan is recorded',detail:'At least one trip day specifies water carried. This is not proof that containers have enough capacity, since product volume fields are not consistently container capacity.',action:'Compare daily planned carries with your actual bottle, bladder, or reservoir volumes.',basis:'Trip Planner waterCarryL fields',itemIds:matching('water').map(i=>i.id)});
  if (forecast?.days.some(d=>d.samples<=0)) add({id:'sparse-forecast',section:'weather',level:'unknown',title:'Sparse forecast samples',detail:'At least one forecast day has no model samples; do not treat it as verified.',action:'Review source data and trip timing.',basis:'ECCC sampled days',itemIds:[]});

  // The exact same compatibility IDs, severity, evidence, and actions
  // are used in Gear, Analysis, and the Gear summary bar.
  // Forecast observations remain separate weather findings: loading a forecast
  // must not silently change user-entered trip conditions in one tab only.
  const compatibilityIssues = evaluateCompatibility(build, [...items], [...days]);
  findings.push(...compatibilityIssues.map(compatibilityIssueToFinding));

  findings.sort((a,b)=>priority[a.level]-priority[b.level]||a.section.localeCompare(b.section)||a.title.localeCompare(b.title));
  return {findings,pack,coverage:{ratedSleep:rated.length,unratedSleep:unrated.length,unknownWeights:pack.unknownWeightUnits,tripDays:days.length,modelDays:forecast?.days.length??0},plannedNights:nights,coldest,weatherSource};
}

/** Interpret model-first ECCC API output without inventing missing data or accepting an error payload. */
export function parseEcccEvidence(raw:unknown, point:ForecastPoint, relevantDates:readonly string[]):ForecastEvidence {
  if (!raw || typeof raw!=='object') throw new Error('Invalid ECCC response');
  const v=raw as Record<string,unknown>;
  if (!Array.isArray(v.daily) || !v.alerts || typeof v.alerts!=='object') throw new Error('Expected model-first ECCC data. Check the weather integration installation.');
  const alerts=v.alerts as Record<string,unknown>;
  const status: 'ok'|'unavailable' = alerts.status==='ok'?'ok':'unavailable';
  const dates=new Set(relevantDates.filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d)));
  const num=(n:unknown):number|null=>typeof n==='number'&&Number.isFinite(n)?n:null;
  const daily:ForecastDay[]=v.daily.filter(d=>d&&typeof d==='object').map(d=>{
    const o=d as Record<string,unknown>;
    return {date:String(o.date??''),low:num(o.low),high:num(o.high),wind:num(o.wind),gust:num(o.gust),pop:num(o.pop),model:String(o.model||'ECCC model'),samples:typeof o.samples==='number'&&Number.isFinite(o.samples)?o.samples:0};
  }).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d.date)&&d.samples>0&&dates.has(d.date));
  const alertItems=Array.isArray(alerts.items)?alerts.items.map((a:unknown)=>({title:a&&typeof a==='object'&&typeof (a as Record<string,unknown>).title==='string'?String((a as Record<string,unknown>).title):'Official weather alert'})):[];
  return {point,days:daily,alertsStatus:status,alerts:alertItems,loadedAt:new Date().toISOString()};
}

export function projectConsumables(totalGrams:number, nights:number, dailyFraction:number) {
  const days=Math.min(31,Math.max(1,Math.trunc(nights)+1));
  const fraction=Math.max(0,Math.min(1,Number.isFinite(dailyFraction)?dailyFraction:0));
  return Array.from({length:days},(_,idx)=>({day:idx+1,remainingGrams:Math.round(Math.max(0,totalGrams*(1-idx*fraction))*100)/100}));
}

