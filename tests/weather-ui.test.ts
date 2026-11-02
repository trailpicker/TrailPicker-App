import assert from "node:assert/strict";
import { test } from "node:test";
import { chooseTimes, modelPriority, summarizeModel, MODELS, type ModelHour, type Schedule } from "../lib/weather/model-forecast";
import { forecastHints, tripDayForecast, comparePlan } from "../lib/weather/presentation";
import type { WeatherResult } from "../lib/weather/service";
const now=Date.parse("2026-10-25T12:00:00Z");
const dates=[0,1,2,3,4,5].map(h=>new Date(now+h*3600000).toISOString());
const schedule=(model:(typeof MODELS)[number],times:string[]):Schedule=>({model,run:new Date(now).toISOString(),times});
test("HRDPS is chosen ahead of RDPS, GDPS at same valid time",()=>{
  const schedules=MODELS.map(m=>schedule(m,dates));
  assert.deepEqual(modelPriority(dates[2],schedules,now).map(s=>s.model.id),["HRDPS","RDPS","GDPS"]);
});
test("model times are real published samples; no fabricated hours",()=>{
  const times=chooseTimes([schedule(MODELS[0],[dates[0],dates[2],dates[5]])],"UTC","",now);
  assert.deepEqual(times,[dates[0],dates[2],dates[5]]);
});
test("waypoint model summary only computes sampled extrema",()=>{
  const hour=(time:string,temp:number):ModelHour=>({time,temperature:temp,wind:36,gust:null,pop:null,condition:"Model sample",model:"HRDPS",resolutionKm:2.5,run:new Date(now).toISOString(),sampled:true});
  const hs=[hour(dates[0],-2),hour(dates[2],8)];
  const [day]=summarizeModel(hs,"UTC");
  assert.equal(day.high,8);assert.equal(day.low,-2);assert.equal(day.pop,null);
  assert.equal(day.samples,2);assert.equal(day.sampledExtrema,true);
  const data={query:{zone:"UTC"},hourly:hs,daily:[day],forecastStale:false} as WeatherResult;
  const fc=tripDayForecast(data,"2026-10-25");
  assert.equal(fc?.low,-2);
  assert.ok(forecastHints(fc!).some(h=>h.includes("insulation")));
  assert.equal(comparePlan(fc!,{minTemperature:2,conditions:"dry"}).length,1);
  assert.equal(tripDayForecast({...data,forecastStale:true},"2026-10-25"),null);
  assert.equal(tripDayForecast(data,"2027-01-01"),null);
});
