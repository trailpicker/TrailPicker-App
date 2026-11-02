/** ECCC GeoMet adapters. Missing values remain null; official text is preserved. */
export type Obj = Record<string, unknown>;
export const obj = (v: unknown): Obj =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Obj) : {};
export const array = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
export function en(v: unknown): unknown {
  const o = obj(v);
  return "value" in o ? en(o.value) : "en" in o ? en(o.en) : v;
}
export function text(v: unknown): string {
  const x = en(v);
  return typeof x === "string" ? x : "";
}
export function num(v: unknown): number | null {
  const x = en(v);
  return (typeof x === "number" ||
    (typeof x === "string" && x.trim() !== "")) &&
    Number.isFinite(Number(x))
    ? Number(x)
    : null;
}
export function iso(v: unknown): string | null {
  const s = text(v);
  return s && Number.isFinite(Date.parse(s)) ? new Date(s).toISOString() : null;
}
export function dateKey(time: string | number, zone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(time));
}
export function validDate(s: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(s) &&
    Number.isFinite(Date.parse(s)) &&
    new Date(s).toISOString().slice(0, 10) === s
  );
}
export function distanceKm(
  lat: number,
  lng: number,
  lat2: number,
  lng2: number,
): number {
  const r = Math.PI / 180,
    a =
      Math.sin(((lat2 - lat) * r) / 2) ** 2 +
      Math.cos(lat * r) *
        Math.cos(lat2 * r) *
        Math.sin(((lng2 - lng) * r) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
}
export type Site = { id: string; lat: number; lng: number };
export function catalog(raw: unknown): Site[] {
  return array(obj(raw).features).flatMap((f) => {
    const o = obj(f),
      g = obj(o.geometry),
      c = array(g.coordinates),
      id = text(obj(o.properties).identifier) || text(o.id);
    return g.type === "Point" &&
      /^[a-z]{2}-\d+$/.test(id) &&
      typeof c[0] === "number" &&
      typeof c[1] === "number"
      ? [{ id, lat: c[1], lng: c[0] }]
      : [];
  });
}
export function nearest(
  sites: Site[],
  lat: number,
  lng: number,
): Site & { distanceKm: number } {
  const ranked = sites
    .map((s) => ({ ...s, distanceKm: distanceKm(lat, lng, s.lat, s.lng) }))
    .sort((a, b) => a.distanceKm - b.distanceKm);
  if (!ranked.length) throw Error("ECCC forecast locations unavailable.");
  return ranked[0];
}
export type Hour = {
  time: string;
  temperature: number | null;
  wind: number | null;
  gust: number | null;
  pop: number | null;
  condition: string;
};
export type Period = {
  date: string;
  label: string;
  summary: string;
  high: number | null;
  low: number | null;
  wind: number | null;
  gust: number | null;
  pop: number | null;
};
const max = (v: (number | null)[]) =>
  v.some((x) => x !== null)
    ? Math.max(...v.filter((x): x is number => x !== null))
    : null;
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export function periodDate(
  label: string,
  issued: string,
  zone: string,
): string | null {
  const base = dateKey(issued, zone),
    lower = label.toLowerCase();
  if (/^(today|tonight|this morning|this afternoon|this evening)$/.test(lower))
    return base;
  const weekday = weekdays.findIndex((w) => lower.startsWith(w.toLowerCase()));
  if (weekday < 0) return null;
  const d = new Date(base + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + ((weekday - d.getUTCDay() + 7) % 7));
  return d.toISOString().slice(0, 10);
}
export function parseCity(raw: unknown, zone: string) {
  const p = obj(obj(raw).properties),
    current = obj(p.currentConditions),
    fg = obj(p.forecastGroup),
    hg = obj(p.hourlyForecastGroup);
  const issued = iso(fg.timestamp),
    hourlyIssued = iso(hg.timestamp);
  const hourly: Hour[] = array(hg.hourlyForecasts).flatMap((h) => {
    const o = obj(h),
      w = obj(o.wind),
      time = iso(o.timestamp);
    return time
      ? [
          {
            time,
            temperature: num(o.temperature),
            wind: num(w.speed),
            gust: num(w.gust),
            pop: num(o.lop),
            condition: text(o.condition),
          },
        ]
      : [];
  });
  const daily: Period[] = issued
    ? array(fg.forecasts).flatMap((f) => {
        const o = obj(f),
          period = obj(o.period),
          label = text(period.textForecastName) || text(period.value);
        const date =
          periodDate(label, issued, zone) ||
          periodDate(text(period.value), issued, zone);
        const temperatures = array(obj(o.temperatures).temperature).map(obj),
          winds = array(obj(o.winds).periods).map(obj);
        return date
          ? [
              {
                date,
                label,
                summary: text(o.textSummary),
                high: num(temperatures.find((t) => text(t.class) === "high")),
                low: num(temperatures.find((t) => text(t.class) === "low")),
                wind: max(winds.map((w) => num(w.speed))),
                gust: max(winds.map((w) => num(w.gust))),
                pop: num(obj(o.abbreviatedForecast).pop),
              },
            ]
          : [];
      })
    : [];
  return {
    name: text(p.name),
    updated: iso(p.lastUpdated),
    issued,
    hourlyIssued,
    url: safeURL(text(p.url)),
    current: {
      time: iso(current.timestamp),
      station: text(current.station),
      condition: text(current.condition),
      temperature: num(current.temperature),
      wind: num(obj(current.wind).speed),
      gust: num(obj(current.wind).gust),
      humidity: num(current.relativeHumidity),
    },
    hourly,
    daily,
  };
}
export function safeURL(url: string): string {
  try {
    const u = new URL(url);
    return u.protocol === "https:" &&
      ["weather.gc.ca", "meteo.gc.ca"].includes(u.hostname)
      ? u.href
      : "https://weather.gc.ca/";
  } catch {
    return "https://weather.gc.ca/";
  }
}
type Ring = number[][];
function inRing(x: number, y: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i],
      [xj, yj] = ring[j];
    const cross = (x - xi) * (yj - yi) - (y - yi) * (xj - xi);
    if (
      Math.abs(cross) < 1e-9 &&
      x >= Math.min(xi, xj) &&
      x <= Math.max(xi, xj) &&
      y >= Math.min(yi, yj) &&
      y <= Math.max(yi, yj)
    )
      return true;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}
export function contains(geometry: unknown, lat: number, lng: number): boolean {
  const g = obj(geometry);
  const polygons =
    g.type === "Polygon"
      ? [g.coordinates]
      : g.type === "MultiPolygon"
        ? array(g.coordinates)
        : [];
  return polygons.some((p) => {
    const rings = p as Ring[];
    return (
      Array.isArray(rings) &&
      rings.length > 0 &&
      inRing(lng, lat, rings[0]) &&
      !rings.slice(1).some((r) => inRing(lng, lat, r))
    );
  });
}
export type Alert = {
  id: string;
  title: string;
  text: string;
  area: string;
  colour: string;
  issued: string | null;
  expires: string;
};
export function parseAlerts(
  raw: unknown,
  lat: number,
  lng: number,
  now = Date.now(),
): Alert[] {
  const result: Alert[] = [];
  for (const f of array(obj(raw).features)) {
    const o = obj(f),
      p = obj(o.properties),
      expiry = iso(p.expiration_datetime),
      status = text(p.status_en).toLowerCase();
    if (status === "ended") continue;
    if (
      !["active", "issued", "continued", "updated"].includes(status) ||
      !expiry ||
      !["Polygon", "MultiPolygon"].includes(text(obj(o.geometry).type)) ||
      !text(p.alert_text_en)
    )
      throw Error("Unrecognized ECCC alert payload.");
    if (!expiry || Date.parse(expiry) <= now || !contains(o.geometry, lat, lng))
      continue;
    const issued = iso(p.publication_datetime);
    if (issued && Date.parse(issued) > now) continue;
    const a = {
      id: text(o.id),
      title: text(p.alert_name_en),
      text: text(p.alert_text_en),
      area: text(p.feature_name_en),
      colour: text(p.risk_colour_en),
      issued,
      expires: expiry,
    };
    if (
      !result.some(
        (v) => v.title === a.title && v.text === a.text && v.area === a.area,
      )
    )
      result.push(a);
  }
  return result;
}
export function risk(
  periods: Period[],
  hours: Hour[],
  alerts: Alert[],
  incomplete: boolean,
) {
  const reasons: string[] = [];
  let score = 0;
  const raise = (level: number, reason: string) => {
    score = Math.max(score, level);
    reasons.push(reason);
  };
  const temps = [
    ...periods.flatMap((p) => [p.low, p.high]),
    ...hours.map((h) => h.temperature),
  ].filter((v): v is number => v !== null);
  const winds = [
    ...periods.flatMap((p) => [p.wind, p.gust]),
    ...hours.flatMap((h) => [h.wind, h.gust]),
  ].filter((v): v is number => v !== null);
  const summary = [
    ...periods.map((p) => p.summary),
    ...hours.map((h) => h.condition),
  ].join(" ");
  if (alerts.length)
    raise(
      3,
      "Active official alerts at this location now; read their timing and instructions.",
    );
  if (winds.some((v) => v >= 60))
    raise(3, "Forecast wind/gusts ≥60 km/h: exposed terrain may be hazardous.");
  else if (winds.some((v) => v >= 40))
    raise(2, "Forecast wind/gusts ≥40 km/h: consider ridge exposure.");
  if (temps.some((v) => v <= -10))
    raise(3, "Forecast temperature ≤−10°C: significant cold exposure.");
  else if (temps.some((v) => v <= 0))
    raise(2, "Freezing temperatures: ice or frozen surfaces are possible.");
  if (temps.some((v) => v >= 30))
    raise(2, "Forecast temperature ≥30°C: heat exposure.");
  if (/thunder|freezing rain|blizzard/i.test(summary))
    raise(
      3,
      "Thunderstorms, freezing rain or blizzard conditions mentioned in the forecast.",
    );
  else if (/snow|fog/i.test(summary))
    raise(2, "Snow or fog mentioned: visibility and footing may deteriorate.");
  if (/rain|shower/i.test(summary))
    raise(1, "Rain/showers mentioned: plan for wet conditions.");
  const unknown =
    incomplete || (!periods.length && !hours.length) || !temps.length;
  if (unknown)
    reasons.push(
      "Assessment incomplete: forecast or alert data is missing, stale, or outside the available forecast window.",
    );
  return {
    level:
      score === 3
        ? "High"
        : score === 2
          ? "Elevated"
          : unknown
            ? "Unknown"
            : score === 1
              ? "Caution"
              : "No flagged factors",
    reasons,
  };
}
export function modelValue(raw: unknown): {
  value: number | null;
  time: string | null;
  run: string | null;
} {
  const p = obj(obj(array(obj(raw).features)[0]).properties),
    v = num(p.value);
  return {
    value: v === null || Math.abs(v) > 9990 ? null : v,
    time: iso(p.time),
    run: iso(p.dim_reference_time),
  };
}
export function modelTimes(xml: string): { times: string[]; run: string } {
  const time =
    xml.match(/<Dimension\b[^>]*name="time"[^>]*>([^<]+)<\/Dimension>/)?.[1] ||
    "";
  const run =
    xml.match(
      /<Dimension\b[^>]*name="reference_time"[^>]*default="([^"]+)"/,
    )?.[1] || "";
  const times: string[] = [];
  for (const entry of time.trim().split(",")) {
    if (!entry.includes("/")) {
      if (iso(entry)) times.push(new Date(entry).toISOString());
      continue;
    }
    const [start, end, step] = entry.split("/"),
      hours = Number(step?.match(/^PT(\d+)H$/)?.[1]);
    if (!hours || !iso(start) || !iso(end)) continue;
    for (
      let t = Date.parse(start);
      t <= Date.parse(end) && times.length < 500;
      t += hours * 3600000
    )
      times.push(new Date(t).toISOString());
  }
  if (!iso(run) || !times.length) throw Error("Model schedule unavailable.");
  return { times, run: new Date(run).toISOString() };
}
export function modelURL(
  layer: string,
  lat: number,
  lng: number,
  time: string,
  run: string,
): string {
  return (
    "https://geo.weather.gc.ca/geomet?" +
    new URLSearchParams({
      SERVICE: "WMS",
      VERSION: "1.3.0",
      REQUEST: "GetFeatureInfo",
      LAYERS: layer,
      QUERY_LAYERS: layer,
      CRS: "EPSG:4326",
      BBOX: `${lat - 0.01},${lng - 0.01},${lat + 0.01},${lng + 0.01}`,
      WIDTH: "3",
      HEIGHT: "3",
      I: "1",
      J: "1",
      INFO_FORMAT: "application/json",
      FORMAT: "image/png",
      TIME: time.replace(/\.\d{3}Z$/, "Z"),
      DIM_REFERENCE_TIME: run.replace(/\.\d{3}Z$/, "Z"),
    })
  );
}
