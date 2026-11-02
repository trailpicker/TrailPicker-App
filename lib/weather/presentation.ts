/** Read-only model-weather presentation. Never overwrites saved trip conditions. */
import { risk, dateKey, type Period } from "./core";
import type { WeatherResult } from "./service";
export type ForecastDay = {
  date:string; high:number|null; low:number|null; pop:number|null; wind:number|null; gust:number|null;
  summary:string; level:ReturnType<typeof risk>["level"]; reasons:string[]; periods:Period[];
};
export function tripDayForecast(data:WeatherResult|null|undefined,date:string):ForecastDay|null {
  if(!data || data.forecastStale) return null;
  const day=data.daily.find(d=>d.date===date);
  if(!day) return null;
  const hours=data.hourly.filter(h=>dateKey(h.time,data.query.zone)===date);
  const a=risk([],hours,[],!hours.length);
  return {...day,level:a.level,reasons:a.reasons,periods:[]};
}
export function forecastHints(day:ForecastDay):string[] {
  const hints:string[]=[];
  if((day.pop??0)>=60 || /rain|shower|drizzle/i.test(day.summary)) hints.push("Check rain protection and a dry clothing system.");
  if((day.low!==null&&day.low<=0)||/snow|freezing|ice/i.test(day.summary)) hints.push("Check insulation and possible slippery sections.");
  if((day.gust??day.wind??0)>=40) hints.push("Review exposure to wind on ridges and open terrain.");
  if(/thunder|storm/i.test(day.summary)) hints.push("Review storm exposure and your turnaround plan.");
  if(day.high!==null&&day.high>=30) hints.push("Review sun exposure, water, and heat management.");
  return hints;
}
export type PlanningInputs={minTemperature:number|null;conditions:string|null;distanceKm?:number|null;elevationGainM?:number|null;durationMinutes?:number|null};
export function comparePlan(day:ForecastDay,plan:PlanningInputs):string[]{
  const notes:string[]=[];
  if(plan.minTemperature!==null&&day.low!==null&&day.low<plan.minTemperature)
    notes.push(`The sampled model low (${day.low}°C) is below your planned low (${plan.minTemperature}°C).`);
  if(plan.conditions==="dry"&&((day.pop??0)>=60||/rain|shower|snow|drizzle/i.test(day.summary)))
    notes.push("Saved conditions say dry, but forecast data suggests precipitation.");
  if((plan.durationMinutes??0)>=360&&((day.pop??0)>=60||(day.gust??0)>=40))
    notes.push("This is a longer day. Recheck timing and escape options if weather changes.");
  return notes;
}
export function localHour(iso:string,zone:string):string {return new Date(iso).toLocaleTimeString("en-CA",{timeZone:zone,hour:"numeric",hour12:true});}
