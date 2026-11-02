import tzlookup from "tz-lookup";
import canada from "./canada.json";
import { WeatherCache, limited } from "./cache";
import { array, obj, text, contains, parseAlerts, dateKey, validDate, modelTimes, modelValue, modelURL } from "./core";
import type { Alert } from "./core";
import { MODELS, chooseTimes, chooseSummaryTimes, modelPriority, summarizeModel, assessModel, type Schedule, type ModelHour, type ModelDef } from "./model-forecast";

const cache = new WeatherCache(1024);
const API = "https://api.weather.gc.ca/collections/";
const GEOMET = "https://geo.weather.gc.ca/geomet";
export class WeatherInputError extends Error {}
export function validateQuery(params: URLSearchParams) {
  const a = params.get("lat"), b = params.get("lng"), date = params.get("date") || "";
  if (!a?.trim() || !b?.trim()) throw new WeatherInputError("Choose a Canadian trip waypoint.");
  const lat = Number(a), lng = Number(b);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < 41 || lat > 84 || lng < -142 || lng > -52 || !contains(canada, lat, lng))
    throw new WeatherInputError("Weather is available for Canadian land locations only.");
  if (date && !validDate(date)) throw new WeatherInputError("Invalid weather date (YYYY-MM-DD).");
  return { lat, lng, date, zone: tzlookup(lat, lng) };
}
async function request(url: string, xml = false, revalidateSeconds = 0): Promise<unknown> {
  const u = new URL(url);
  if (u.protocol !== "https:" || !["api.weather.gc.ca", "geo.weather.gc.ca"].includes(u.hostname)) throw Error("Invalid ECCC endpoint.");
  return limited(async () => {
    // Cache published model layers across server instances, but NEVER cache live alerts.
    const res = await fetch(u, { ...(revalidateSeconds ? { next: { revalidate: revalidateSeconds } } : { cache: "no-store" as const }), redirect:"error", signal:AbortSignal.timeout(12000),
      headers:{ Accept: xml ? "application/xml" : "application/json", "User-Agent":"TrailPicker-model-weather/2.0" } });
    if (!res.ok) throw Error(`ECCC HTTP ${res.status}`);
    const raw = await res.text();
    if (raw.length > 8_000_000) throw Error("Oversized ECCC response.");
    return xml ? raw : JSON.parse(raw);
  });
}
async function collection(url: string) {
  const features: unknown[] = []; let next: string | null = url;
  for (let pages = 0; next; pages++) {
    if (pages >= 20) throw Error("ECCC alert pagination incomplete.");
    const data = obj(await request(next));
    if (!Array.isArray(data.features)) throw Error("Invalid alert collection.");
    features.push(...data.features);
    const link = array(data.links).map(obj).find(l => l.rel === "next");
    next = link ? text(link.href) : null;
    if (next) {
      const u = new URL(next);
      if (u.origin !== "https://api.weather.gc.ca" || u.pathname !== new URL(url).pathname) throw Error("Unexpected ECCC pagination URL.");
      u.searchParams.set("f", "json"); next = u.href;
    }
  }
  return { features };
}
async function schedule(model: ModelDef): Promise<Schedule> {
  const response = await cache.get(`schedule:${model.id}`, 15 * 60_000, 0, async () => {
    const u = GEOMET + "?" + new URLSearchParams({ SERVICE:"WMS", VERSION:"1.3.0", REQUEST:"GetCapabilities", layer:model.temperature });
    return modelTimes(String(await request(u, true, 15 * 60)));
  });
  return { model, ...response.value };
}
const POP_LAYER="HRDPS-WEonG_2.5km_Precip-Prob";
// Documented GDPS cloud-cover WMS layer (0–100%); sampled separately, never inferred from POP.
const CLOUD_LAYER="GDPS_15km_TotalCloudCover";
async function cloudSchedule():Promise<{times:string[];run:string}|null>{
  try {
    const v=await cache.get("schedule:gdps-cloud",15*60_000,0,async()=>
      modelTimes(String(await request(GEOMET+"?"+new URLSearchParams({SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetCapabilities",layer:CLOUD_LAYER}),true,15*60))));
    return v.value;
  }catch{return null;}
}
async function probabilitySchedule():Promise<{times:string[];run:string}|null>{
  try {
    const v=await cache.get("schedule:hrdps-pop",15*60_000,0,async()=>
      modelTimes(String(await request(GEOMET+"?"+new URLSearchParams({SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetCapabilities",layer:POP_LAYER}),true,15 * 60))));
    return v.value;
  }catch{return null;}
}
async function field(layer: string, lat: number, lng: number, time: string, run: string): Promise<number | null> {
  try {
    const key = `model:${layer}:${lat.toFixed(5)}:${lng.toFixed(5)}:${time}:${run}`;
    const result = await cache.get(key, 20 * 60_000, 40 * 60_000, async () => {
      const p = modelValue(await request(modelURL(layer, lat, lng, time, run), false, 20 * 60));
      if (p.value === null || p.time !== time || p.run !== run) throw Error("Model time/run mismatch or missing value.");
      return p.value;
    });
    return result.value;
  } catch { return null; }
}
async function hourAt(time: string, schedules: Schedule[], lat: number, lng: number, now: number, popSchedule: {times:string[];run:string}|null = null, cloud: {times:string[];run:string}|null = null): Promise<ModelHour | null> {
  for (const s of modelPriority(time, schedules, now)) {
    const temperature = await field(s.model.temperature, lat, lng, time, s.run);
    if (temperature === null) continue;
    const [wind, gust, rawPop, rawCloud] = await Promise.all([
      field(s.model.wind, lat, lng, time, s.run),
      // Wind-gust fields may be unavailable on particular models/runs; null is intentional.
      field(s.model.gust, lat, lng, time, s.run),
      s.model.id==="HRDPS" && popSchedule?.times.includes(time)
        ? field(POP_LAYER,lat,lng,time,popSchedule.run) : Promise.resolve(null),
      cloud?.times.includes(time)
        ? field(CLOUD_LAYER,lat,lng,time,cloud.run) : Promise.resolve(null),
    ]);
    return { time, temperature: Math.round(temperature * 10) / 10,
      wind: wind === null ? null : Math.round(wind * 3.6),
      gust: gust === null ? null : Math.round(gust * 3.6),
      pop:rawPop===null?null:Math.round(Math.max(0,Math.min(100,rawPop))),
      ...(rawCloud!==null&&Number.isFinite(rawCloud)&&rawCloud>=0&&rawCloud<=100
        ? {cloudCover:Math.round(rawCloud)} : {}),
      condition:rawPop!==null&&rawPop>=60?"Precipitation possible":"Deterministic model sample", model:s.model.id,
      resolutionKm:s.model.km, run:s.run, sampled:true };
  }
  return null;
}
export async function getWeather(query: ReturnType<typeof validateQuery>, options: { summary?: boolean } = {}) {
  const { lat, lng, date, zone } = query, now = Date.now();
  // Alert data never uses stale-on-error, unlike non-safety forecast fields.
  const alertsPromise = cache.get(`alerts:${lat}:${lng}`, 120000, 0, () => collection(API + "weather-alerts/items?" +
    new URLSearchParams({f:"json",limit:"500",bbox:`${lng-.001},${lat-.001},${lng+.001},${lat+.001}`})))
    .then(r => ({status:"ok" as const, checked:new Date(r.at).toISOString(), items:parseAlerts(r.value, lat, lng, Date.now())}))
    .catch(() => ({status:"unavailable" as const, checked:null, items:[] as Alert[]}));
  const [plans, alerts, popSchedule, cloud] = await Promise.all([
    Promise.all(MODELS.map(async m => { try {return await schedule(m);} catch {return null;} })), alertsPromise, probabilitySchedule(), cloudSchedule(),
  ]);
  const available = plans.filter((s): s is Schedule => s !== null);
  const forecastKey = `forecast:${options.summary ? "summary" : "detail"}:${lat.toFixed(5)}:${lng.toFixed(5)}:${date}:${available.map(s=>s.model.id+"@"+s.run).join(",")}:${popSchedule?.run||""}:cloud@${cloud?.run||""}`;
  const forecast = await cache.get(forecastKey, 10 * 60_000, 0, async () => {
    const times = options.summary ? chooseSummaryTimes(available, zone, date, now) : chooseTimes(available, zone, date, now);
    // Bound per-request work: groups of six waypoint/time queries.
    const samples: (ModelHour|null)[] = [];
    for (let offset = 0; offset < times.length; offset += 6) {
      const batch = await Promise.all(times.slice(offset, offset+6).map(t=>
        hourAt(t, available, lat, lng, now, popSchedule, cloud)));
      samples.push(...batch);
    }
    return samples.filter((s):s is ModelHour => s !== null).sort((a,b)=>a.time.localeCompare(b.time));
  });
  const hourly = forecast.value;
  const daily = summarizeModel(hourly, zone);
  const incomplete = !available.length || !hourly.length || alerts.status !== "ok";
  const assessment = assessModel(hourly, !date || date === dateKey(now, zone) ? alerts.items.length : 0, incomplete);
  return { query, alerts, sampleDensity: options.summary ? "summary" as const : "detail" as const, modelsAvailable:available.map(x=>x.model.id), hourly, daily,
    assessment, forecastStale:!hourly.length, hourlyStale:!hourly.length,
    generated:new Date(now).toISOString(),
    limitation:"Deterministic grid model, not a station observation, point-verified forecast, or avalanche assessment. Sampled daily extrema are not official highs/lows. Precipitation probability is shown only when the independent ECCC HRDPS-WEonG precipitation-probability layer returns a valid sample; otherwise unavailable. Cloud cover is included only when the independent GDPS grid layer returns a verified time-aligned sample. Icons are estimates, not observed conditions or precipitation-type forecasts." };
}
/** Backward-compatible optional model endpoint. Returns a coordinate-based sample, not a city forecast. */
export async function mountain(lat:number,lng:number,date:string,zone:string,now=Date.now()) {
  const plans = (await Promise.all(MODELS.map(async m=>{try{return await schedule(m);}catch{return null;}}))).filter((s):s is Schedule=>s!==null);
  const time = chooseTimes(plans,zone,date,now)[0];
  if (!time) return {status:"outside-range" as const,message:"No ECCC model samples for that date."};
  const sample = await hourAt(time,plans,lat,lng,now);
  if (!sample) return {status:"unavailable" as const,message:"Model sample unavailable for this point."};
  return {status:"ok" as const,time:sample.time,run:sample.run,temperature:sample.temperature!,wind:sample.wind,
    model:sample.model,resolutionKm:sample.resolutionKm,message:`${sample.model} ${sample.resolutionKm} km grid estimate; local conditions may differ.`};
}
export type WeatherResult = Awaited<ReturnType<typeof getWeather>>;