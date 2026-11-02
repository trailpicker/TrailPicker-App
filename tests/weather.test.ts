import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  catalog,
  nearest,
  parseCity,
  num,
  parseAlerts,
  contains,
  periodDate,
  dateKey,
  risk,
  modelTimes,
  modelValue,
  modelURL,
  safeURL,
} from "../lib/weather/core";
import { WeatherCache, limited } from "../lib/weather/cache";
import { validateQuery, getWeather, mountain } from "../lib/weather/service";
import { dayWeatherPoint } from "../lib/weather/locations";
import { GET } from "../app/api/weather/route";
const fixture = (name: string) =>
  readFileSync(
    fileURLToPath(new URL("./fixtures/weather/" + name, import.meta.url)),
    "utf8",
  );
const city = JSON.parse(fixture("city.json")).features[0];
const now = Date.parse("2026-10-25T18:00:00Z");
const square = {
  type: "Polygon",
  coordinates: [
    [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
      [0, 0],
    ],
    [
      [4, 4],
      [6, 4],
      [6, 6],
      [4, 6],
      [4, 4],
    ],
  ],
};
test("verified bilingual ECCC payload preserves numeric zero, missing fields and full text", () => {
  const p = parseCity(city, "America/Vancouver");
  assert.equal(p.current.temperature, 11.1);
  assert.equal(p.current.condition, "");
  assert.equal(p.hourly[0].temperature, 11);
  assert.equal(p.hourly[0].pop, 30);
  assert.equal(p.daily[0].high, 12);
  assert.equal(p.daily[1].low, 8);
  assert.equal(p.daily[0].date, "2026-10-25");
  assert.equal(p.daily[2].date, "2026-10-26");
  assert.equal(num({ value: { en: 0 } }), 0);
  assert.equal(num(""), null);
  assert.equal(num(false), null);
  assert.equal(num({ value: { en: null } }), null);
  assert.equal(parseCity({}, "UTC").daily.length, 0);
});
test("calendar mapping crosses UTC midnight, DST, year and Newfoundland half hour", () => {
  assert.equal(
    periodDate("Tonight", "2026-10-26T01:00:00Z", "America/Vancouver"),
    "2026-10-25",
  );
  assert.equal(
    periodDate("Monday", "2026-10-26T01:00:00Z", "America/Vancouver"),
    "2026-10-26",
  );
  assert.equal(
    periodDate("Friday", "2026-12-31T17:00:00Z", "America/Toronto"),
    "2027-01-01",
  );
  assert.equal(
    dateKey("2026-11-01T08:30:00Z", "America/Vancouver"),
    "2026-11-01",
  );
  assert.equal(
    dateKey("2026-10-25T02:00:00Z", "America/St_Johns"),
    "2026-10-24",
  );
  assert.equal(periodDate("unexpected", "2026-10-25T00:00:00Z", "UTC"), null);
});
test("point-in-polygon handles holes, boundaries and MultiPolygon", () => {
  assert.equal(contains(square, 2, 2), true);
  assert.equal(contains(square, 5, 5), false);
  assert.equal(contains(square, 2, 0), true);
  assert.equal(contains(square, 12, 2), false);
  assert.equal(
    contains({ type: "MultiPolygon", coordinates: [square.coordinates] }, 2, 2),
    true,
  );
});
test("alerts exclude ended, expired, future and bbox-only matches; preserve official text", () => {
  const original = JSON.parse(fixture("alerts.json")).features[0];
  const f = {
    ...original,
    geometry: square,
    properties: { ...original.properties, status_en: "issued" },
  };
  assert.equal(
    parseAlerts({ features: [f] }, 2, 2, now)[0].text,
    f.properties.alert_text_en,
  );
  assert.equal(parseAlerts({ features: [f, f] }, 2, 2, now).length, 1);
  for (const p of [
    { status_en: "ended" },
    { expiration_datetime: "2026-10-25T17:00:00Z" },
    { publication_datetime: "2026-10-26T17:00:00Z" },
  ])
    assert.equal(
      parseAlerts(
        { features: [{ ...f, properties: { ...f.properties, ...p } }] },
        2,
        2,
        now,
      ).length,
      0,
    );
  assert.equal(parseAlerts({ features: [f] }, 5, 5, now).length, 0);
});
test("national location catalogue chooses nearest point and rejects empty catalogue", () => {
  const sites = catalog({
    features: [
      city,
      {
        id: "ab-1",
        geometry: { type: "Point", coordinates: [-115, 51] },
        properties: { identifier: "ab-1" },
      },
    ],
  });
  assert.equal(nearest(sites, 49.3, -123.2).id, "bc-99");
  assert.throws(() => nearest([], 49, -123));
});
test("Canadian coverage includes provinces and territories and rejects foreign / invalid input", () => {
  for (const [lat, lng] of [
    [49.28, -123.12],
    [51.425, -116.18],
    [43.65, -79.38],
    [45.5, -73.57],
    [47.56, -52.71],
    [60.72, -135.06],
    [62.45, -114.38],
    [63.75, -68.52],
    [82.5, -62.35],
  ])
    assert.ok(
      validateQuery(new URLSearchParams({ lat: String(lat), lng: String(lng) }))
        .zone,
    );
  for (const params of [
    "lat=&lng=-123",
    "lat=NaN&lng=-123",
    "lat=47.6&lng=-122.3",
    "lat=64.8&lng=-147.7",
    "lat=49&lng=Infinity",
    "lat=49.28&lng=-123.12&date=2026-02-30",
  ])
    assert.throws(() => validateQuery(new URLSearchParams(params)));
});
test("risk reports unknown rather than safe for missing data; identifies high winds and cold", () => {
  assert.equal(risk([], [], [], true).level, "Unknown");
  assert.equal(
    risk(
      [],
      [
        {
          time: "x",
          temperature: -12,
          wind: 70,
          gust: null,
          pop: null,
          condition: "Snow",
        },
      ],
      [],
      false,
    ).level,
    "High",
  );
  assert.equal(
    risk(
      [],
      [
        {
          time: "x",
          temperature: 15,
          wind: 5,
          gust: null,
          pop: null,
          condition: "Clear",
        },
      ],
      [],
      false,
    ).level,
    "No flagged factors",
  );
});
test("cache coalesces, expires, bounds entries and limits stale fallback; alerts can forbid stale", async () => {
  let clock = 0,
    calls = 0;
  const cache = new WeatherCache(2, () => clock);
  const load = async () => {
    calls++;
    return 7;
  };
  await Promise.all([cache.get("a", 10, 5, load), cache.get("a", 10, 5, load)]);
  assert.equal(calls, 1);
  clock = 11;
  assert.equal(
    (
      await cache.get("a", 10, 5, async () => {
        throw Error("offline");
      })
    ).stale,
    true,
  );
  clock = 16;
  await assert.rejects(
    cache.get("a", 10, 5, async () => {
      throw Error("offline");
    }),
  );
  await cache.get("b", 10, 0, load);
  await cache.get("c", 10, 0, load);
  clock = 17;
  await cache.get("a", 10, 0, load);
  assert.equal(calls, 4);
  clock = 28;
  await assert.rejects(
    cache.get("a", 10, 0, async () => {
      throw Error("offline");
    }),
  );
});
test("outbound concurrency stays bounded", async () => {
  let active = 0,
    peak = 0;
  await Promise.all(
    Array.from({ length: 20 }, () =>
      limited(async () => {
        active++;
        peak = Math.max(active, peak);
        await new Promise((r) => setTimeout(r, 2));
        active--;
      }),
    ),
  );
  assert.ok(peak <= 6);
});
test("model schedule supports interval and discrete times; sampled values match units and run", () => {
  const s = modelTimes('<Dimension name="time">2026-10-25T12:00:00Z/2026-10-27T12:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension>');
  assert.ok(s.times.length > 24);
  assert.equal(s.run, "2026-10-25T12:00:00.000Z");
  assert.equal(modelValue(JSON.parse(fixture("model.json"))).value, -6.3080812);
  assert.equal(
    modelTimes(
      '<Dimension name="time">2026-10-25T12:00:00Z,2026-10-25T15:00:00Z</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z"/>',
    ).times.length,
    2,
  );
  assert.equal(
    modelValue({ features: [{ properties: { value: -9999 } }] }).value,
    null,
  );
  const u = new URL(
    modelURL("RDPS_10km_AirTemp_2m", 51, -116, s.times[0], s.run),
  );
  assert.equal(u.searchParams.get("BBOX"), "50.99,-116.01,51.01,-115.99");
  assert.equal(
    u.searchParams.get("DIM_REFERENCE_TIME"),
    s.run.replace(".000Z", "Z"),
  );
  assert.equal(safeURL("javascript:alert(1)"), "https://weather.gc.ca/");
});
test("day matching is exact and unambiguous; elevation gain is never used as altitude", () => {
  const points = [
    { id: "a", name: "Camp", lat: 51, lng: -116, elevationM: 2200 },
  ];
  assert.equal(
    dayWeatherPoint(
      { campsite: " camp ", startLocation: null, endLocation: null },
      points,
    ),
    "a",
  );
  assert.equal(
    dayWeatherPoint(
      { campsite: "Camp", startLocation: null, endLocation: null },
      [...points, { ...points[0], id: "b" }],
    ),
    undefined,
  );
  assert.equal(
    dayWeatherPoint(
      { campsite: "Unknown", startLocation: null, endLocation: null },
      points,
    ),
    undefined,
  );
});
test("API rejects invalid input without network access", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    throw Error("Should not fetch");
  });
  const r = await GET(
    new Request("http://localhost/api/weather?lat=47.6&lng=-122.3"),
  );
  assert.equal(r.status, 400);
  assert.equal(calls, 0);
  assert.equal(r.headers.get("Cache-Control"), "no-store");
});
test("model-only service never fetches a city forecast, marks alert failure unknown", async t => {
  t.mock.method(Date, "now", () => now);
  const fetched: string[] = [];
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    const u = new URL(String(input)); fetched.push(u.href);
    if (u.href.includes("weather-alerts")) throw Error("offline");
    if (u.searchParams.get("REQUEST") === "GetCapabilities") {
      return new Response(`<WMS_Capabilities><Dimension name="time">2026-10-25T18:00:00Z/2026-10-26T00:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension></WMS_Capabilities>`);
    }
    const layer=u.searchParams.get("LAYERS") || "";
    return Response.json({features:[{properties:{value:layer.includes("Wind")||layer.includes("WSPD")?10:layer.includes("WGE")?15:6,
      time:u.searchParams.get("TIME"),dim_reference_time:u.searchParams.get("DIM_REFERENCE_TIME")}}]});
  });
  const result=await getWeather(validateQuery(new URLSearchParams("lat=49.28&lng=-123.12")));
  assert.equal(result.alerts.status,"unavailable");
  assert.ok(result.hourly.length);
  assert.equal(result.hourly[0].model,"HRDPS");
  assert.equal(result.hourly[0].temperature,6);
  assert.equal(result.hourly[0].wind,36);
  assert.ok(result.assessment.reasons.some(r=>r.includes("incomplete")));
  assert.equal(result.hourly[0].pop,6);
  assert.ok(!fetched.some(x=>x.includes("citypageweather")));
});
test("model sample uses matching valid time and model run", async t => {
  t.mock.method(Date, "now", () => now);
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL) => {
    const u=new URL(String(input));
    if (u.searchParams.get("REQUEST")==="GetCapabilities") return new Response(`<WMS_Capabilities><Dimension name="time">2026-10-25T18:00:00Z/2026-10-26T18:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension></WMS_Capabilities>`);
    return Response.json({features:[{properties:{value:10,time:u.searchParams.get("TIME"),dim_reference_time:u.searchParams.get("DIM_REFERENCE_TIME")}}]});
  });
  const result=await mountain(51.425,-116.18,"2026-10-25","America/Edmonton",now);
  assert.equal(result.status,"ok");
  if (result.status==="ok") { assert.equal(result.temperature,10); assert.equal(result.model,"HRDPS"); }
  assert.equal((await mountain(51.425,-116.18,"2027-01-01","America/Edmonton",now)).status,"outside-range");
});
test("distinct trailhead and campsite coordinates are sampled independently", async t => {
  t.mock.method(Date,"now",()=>now);
  t.mock.method(globalThis,"fetch",async(input:RequestInfo|URL)=>{
    const u=new URL(String(input));
    if(u.href.includes("weather-alerts")) return Response.json({features:[]});
    if(u.searchParams.get("REQUEST")==="GetCapabilities")
      return new Response(`<WMS_Capabilities><Dimension name="time">2026-10-25T18:00:00Z/2026-10-25T19:00:00Z/PT1H</Dimension><Dimension name="reference_time" default="2026-10-25T12:00:00Z">2026-10-25T12:00:00Z</Dimension></WMS_Capabilities>`);
    const lat=Number((u.searchParams.get("BBOX")||"0").split(",")[0]);
    return Response.json({features:[{properties:{value:Math.round((lat-50)*100),time:u.searchParams.get("TIME"),dim_reference_time:u.searchParams.get("DIM_REFERENCE_TIME")}}]});
  });
  const a=await getWeather({lat:50.1,lng:-122.95,date:"",zone:"America/Vancouver"});
  const b=await getWeather({lat:50.06,lng:-122.85,date:"",zone:"America/Vancouver"});
  assert.ok(a.hourly.length&&b.hourly.length);
  assert.notEqual(a.hourly[0].temperature,b.hourly[0].temperature);
  assert.equal(a.hourly[0].model,"HRDPS");
});

