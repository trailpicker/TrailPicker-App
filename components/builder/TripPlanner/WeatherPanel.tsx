"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AlertTriangle, ChevronDown, CircleHelp, Cloud, CloudRain, CloudSnow, CloudSun, ExternalLink, MapPin, RefreshCw, Sun, Wind } from "lucide-react";
import type { WeatherResult } from "@/lib/weather/service";
import type { WeatherPoint } from "@/lib/weather/locations";
import { loadWaypointWeather } from "@/lib/weather/client-cache";
import { comparePlan, forecastHints, tripDayForecast, localHour, type PlanningInputs } from "@/lib/weather/presentation";
import { dateKey } from "@/lib/weather/core";
import { useDisplayPreferences } from "@/components/settings/DisplayPreferencesProvider";
import { temperatureNumber, windText } from "@/lib/user-preferences";

type Snapshot = { key: string; data?: WeatherResult; error?: string };

const number = (value: number | null | undefined, unit = "") =>
  value == null ? "—" : `${Math.round(value)}${unit}`;
const shortDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-CA", {
    timeZone: "UTC", weekday: "short", month: "short", day: "numeric",
  });
const timeLabel = (iso: string | null | undefined, zone: string) =>
  iso ? new Date(iso).toLocaleString("en-CA", {
    timeZone: zone, month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  }) : "Unavailable";

// Model-based icons: never present unknown cloud cover as "sunny".
// The PoP layer cannot establish precipitation type; temperature is only a rough hint.
type ModelSample = WeatherResult["hourly"][number];
type SkyKind = "sun" | "partly" | "cloud" | "rain" | "snow" | "mixed" | "precip" | "unknown";
type SkyCondition = { kind: SkyKind; label: string; detail: string };

function skyCondition(samples: readonly ModelSample[]): SkyCondition {
  const wet = samples.filter(s => s.pop != null && s.pop >= 60)
    .sort((a, b) => (b.pop ?? 0) - (a.pop ?? 0));
  if (wet.length) {
    const temperature = wet[0].temperature;
    if (temperature == null) return { kind: "precip", label: "Precipitation possible", detail: "Based on model precipitation probability" };
    if (temperature <= -1) return { kind: "snow", label: "Snow possible", detail: "Precipitation chance + air temperature estimate" };
    if (temperature >= 3) return { kind: "rain", label: "Rain possible", detail: "Precipitation chance + air temperature estimate" };
    return { kind: "mixed", label: "Rain or snow possible", detail: "Precipitation chance + near-freezing air temperature" };
  }
  const cloud = samples.map(s => s.cloudCover)
    .filter((v): v is number => typeof v === "number" && v >= 0 && v <= 100);
  if (cloud.length) {
    const average = cloud.reduce((sum, value) => sum + value, 0) / cloud.length;
    if (average < 20) return { kind: "sun", label: "Mostly clear", detail: "Estimated from model cloud cover" };
    if (average < 70) return { kind: "partly", label: "Partly cloudy", detail: "Estimated from model cloud cover" };
    return { kind: "cloud", label: "Cloudy", detail: "Estimated from model cloud cover" };
  }
  return { kind: "unknown", label: "Sky conditions unavailable", detail: "Cloud and precipitation data not available for this sample" };
}

function SkyIcon({ kind, className = "h-8 w-8" }: { kind: SkyKind; className?: string }) {
  const props = { className, "aria-hidden": true as const };
  switch (kind) {
    case "sun": return <Sun {...props} className={`${className} text-amber-600`} />;
    case "partly": return <CloudSun {...props} className={`${className} text-amber-600`} />;
    case "cloud": return <Cloud {...props} className={`${className} text-slate-500`} />;
    case "rain": return <CloudRain {...props} className={`${className} text-blue-600`} />;
    case "snow": return <CloudSnow {...props} className={`${className} text-sky-600`} />;
    case "mixed": return <CloudSnow {...props} className={`${className} text-sky-600`} />;
    case "precip": return <CloudRain {...props} className={`${className} text-blue-600`} />;
    default: return <CircleHelp {...props} className={`${className} text-gray-400`} />;
  }
}

export default function WeatherPanel({ points, date, defaultPointId, tripStart, tripEnd, planning, gearIssueCount = 0 }: {
  points: WeatherPoint[];
  date?: string;
  defaultPointId?: string;
  tripStart?: string;
  tripEnd?: string;
  planning?: PlanningInputs;
  gearIssueCount?: number;
}) {
  const { temperatureUnit, distanceUnit } = useDisplayPreferences();
  const temp = (value: number | null | undefined, withUnit = false) => {
    const converted = temperatureNumber(value, temperatureUnit);
    return converted == null ? "—" : `${Math.round(converted)}°${withUnit ? (temperatureUnit === "f" ? "F" : "C") : ""}`;
  };
  const wind = (value: number | null | undefined) => windText(value, distanceUnit);
  const controlId = useId();
  const [selected, setSelected] = useState(defaultPointId || points[0]?.id || "");
  const [revision, setRevision] = useState(0);
  const forceNext = useRef(false);
  const [snapshot, setSnapshot] = useState<Snapshot>({ key: "" });
  const [updating, setUpdating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const point = points.find(p => p.id === selected) ||
    points.find(p => p.id === defaultPointId) || points[0];
  const coordinates = point ? new URLSearchParams({
    lat: String(point.lat), lng: String(point.lng), ...(date ? { date } : {}),
  }).toString() : "";
  const summaryUrl = coordinates ? `/api/weather?${coordinates}&view=summary` : "";
  const detailUrl = coordinates ? `/api/weather?${coordinates}` : "";

  useEffect(() => {
    if (!summaryUrl) return;
    let active = true;
    const force = forceNext.current;
    forceNext.current = false;
    void loadWaypointWeather(summaryUrl, force)
      .then(data => {
        if (!active) return;
        setSnapshot({ key: coordinates, data });
      })
      .catch(error => {
        if (!active) return;
        setSnapshot(previous => ({
          key: coordinates,
          // Keep a previous forecast only for a failed refresh of this point.
          data: previous.key === coordinates ? previous.data : undefined,
          error: error instanceof Error ? error.message : "Forecast unavailable.",
        }));
      })
      .finally(() => { if (active) setUpdating(false); });
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setUpdating(true);
        forceNext.current = true;
        setRevision(n => n + 1);
      }
    }, 10 * 60_000);
    return () => { active = false; window.clearInterval(interval); };
  }, [summaryUrl, coordinates, revision]);

  const isLoading = updating || (Boolean(summaryUrl) && snapshot.key !== coordinates);
  const data = snapshot.key === coordinates ? snapshot.data : undefined;
  const error = snapshot.key === coordinates ? snapshot.error : undefined;

  async function loadDetails() {
    if (!detailUrl || detailsLoading) return;
    if (data?.sampleDensity === "detail") { setShowDetails(value => !value); return; }
    setDetailsLoading(true);
    setDetailsError("");
    try {
      const detailed = await loadWaypointWeather(detailUrl);
      // A request may finish after a waypoint change. Never display it for another point.
      if (currentCoordinates.current !== coordinates) return;
      setSnapshot({ key: coordinates, data: detailed });
      setShowDetails(true);
    } catch (cause) {
      if (currentCoordinates.current === coordinates)
        setDetailsError(cause instanceof Error ? cause.message : "Detailed samples unavailable.");
    } finally {
      setDetailsLoading(false);
    }
  }
  const currentCoordinates = useRef(coordinates);
  useEffect(() => { currentCoordinates.current = coordinates; }, [coordinates]);

  const zone = data?.query.zone || "UTC";
  const days = useMemo(() => data?.daily || [], [data?.daily]);
  const day = date ? days.find(item => item.date === date) : undefined;
  const tripDays = tripStart ? days.filter(item => item.date >= tripStart && item.date <= (tripEnd || tripStart)) : [];
  const visibleDays = date ? [] : tripDays.length ? tripDays : days.slice(0, 10);
  const hours = data?.hourly.filter(hour => !date || dateKey(hour.time, zone) === date) || [];
  const nearest = hours[0] || data?.hourly[0];
  const relevant = date ? tripDayForecast(data, date)
    : tripDays.length ? tripDayForecast(data, tripDays[0].date)
    : days[0] ? tripDayForecast(data, days[0].date) : null;
  const hints = relevant ? forecastHints(relevant) : [];
  const changes = planning && relevant ? comparePlan(relevant, planning) : [];
  const risks = data?.assessment;
  const warningCount = data?.alerts.items.length || 0;
  const featuredSky = skyCondition(date ? hours : nearest ? [nearest] : []);
  const daySky = (dayDate: string) => skyCondition(
    data?.hourly.filter(hour => dateKey(hour.time, zone) === dayDate) ?? [],
  );

  // The itinerary only needs a quick glance. Keep the detailed model dashboard
  // below for the main Weather section (where `date` is not provided).
  if (date) {
    const forecastAvailable = !!data && !data.forecastStale && !!day;
    const hasNumbers = forecastAvailable && [day.high, day.low, day.pop, day.wind].some(value => value != null);
    const condition = forecastAvailable && hours.length ? featuredSky : {
      kind: "unknown" as const,
      label: "Conditions unavailable",
      detail: "No sky-condition samples for this date",
    };
    const actualAlerts = data?.alerts.items ?? [];
    const alertsUnknown = data?.alerts.status === "unavailable";

    return (
      <section aria-label={`Day forecast for ${shortDate(date)}`} className="min-w-0 text-sm text-gray-800">
        <div className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-3 sm:px-4">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex min-w-0 items-center gap-2">
              <SkyIcon kind={condition.kind} className="h-5 w-5 shrink-0" />
              <span className="font-semibold text-gray-900">Day forecast</span>
              {isLoading && <span role="status" className="text-xs text-gray-500">Updating…</span>}
            </div>
            <span className="text-xs text-gray-500">Model estimate</span>
          </div>

          {!point ? (
            <p className="mt-2 text-xs text-gray-600">Add a Canadian trip location or route waypoint to see weather.</p>
          ) : !data ? (
            <p role={error ? "alert" : "status"} className="mt-3 text-xs text-gray-600">
              {error ? "Forecast couldn't be loaded. Try reopening this day forecast." : "Loading forecast…"}
            </p>
          ) : !forecastAvailable ? (
            <p className="mt-3 text-sm text-gray-600">Forecast not available for this day.</p>
          ) : (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <div className="flex min-w-0 items-center gap-3">
                <SkyIcon kind={condition.kind} className="h-9 w-9 shrink-0" />
                <div>
                  <p className="text-xl font-semibold tabular-nums tracking-tight text-gray-950">
                    {temp(day.high)} <span className="font-normal text-gray-400">/</span> {temp(day.low)}
                  </p>
                  <p className="text-xs text-gray-500">{hasNumbers ? condition.label : "Forecast values unavailable"}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-700">
                <span className="inline-flex items-center gap-1.5">
                  <CloudRain aria-hidden="true" className="h-4 w-4 text-gray-500" />
                  Precip. {number(day.pop, "%")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Wind aria-hidden="true" className="h-4 w-4 text-gray-500" />
                  Wind {wind(day.wind)}
                </span>
              </div>
            </div>
          )}

          {point && (
            <div className="mt-3 flex min-w-0 items-center gap-2 border-t border-gray-200 pt-3">
              <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-500" />
              <label htmlFor={controlId} className="sr-only">Day forecast location</label>
              <select
                id={controlId}
                aria-label="Day forecast location"
                value={point.id}
                onChange={event => {
                  setSelected(event.target.value);
                  setShowDetails(false);
                  setDetailsError("");
                }}
                className="min-w-0 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 text-xs text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                {points.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          )}
          {point && !defaultPointId && (
            <p className="mt-2 text-xs text-amber-900">
              No unique waypoint matches this day&apos;s plan. Select the correct forecast location above.
            </p>
          )}
          {error && data && <p role="status" className="mt-2 text-xs text-amber-800">Could not refresh; showing previously loaded data.</p>}
          {alertsUnknown && (
            <p role="status" className="mt-2 text-xs text-amber-900">Official weather alert status couldn&apos;t be checked.</p>
          )}
          {actualAlerts.length > 0 && (
            <div className="mt-3 border-t border-amber-200 pt-2 text-xs text-amber-950">
              <p className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle aria-hidden="true" className="h-4 w-4" />
                {actualAlerts.length} active ECCC {actualAlerts.length === 1 ? "alert" : "alerts"} at this location
              </p>
              <p className="mt-1">Current alerts may not apply to your future trip date.</p>
              {actualAlerts.map(alert => (
                <details key={alert.id} className="mt-2">
                  <summary className="cursor-pointer font-medium">{alert.title} · {alert.area}</summary>
                  <p className="mt-1 whitespace-pre-wrap leading-relaxed">{alert.text}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      id={!date ? "weather" : undefined}
      aria-label={date ? `Weather for ${shortDate(date)}` : "Trip forecast"}
      className={`scroll-mt-20 min-w-0 text-sm text-gray-800 ${!date ? "border-b border-gray-200 pb-6" : ""}`}
    >
      {/* Match Route's flat section heading; only forecast content uses cards. */}
      <header className="mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-950">
              {date ? `Weather · ${shortDate(date)}` : "Weather"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Model forecasts for your route waypoints.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {gearIssueCount > 0 && (
              <a
                href="#compatibility-details"
                className="inline-flex min-h-9 items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-green-900 hover:bg-gray-50"
              >
                Gear checks ({gearIssueCount})
              </a>
            )}
            <button
              type="button"
              disabled={!point || isLoading}
              onClick={() => {
                setUpdating(true);
                forceNext.current = true;
                setShowDetails(false);
                setRevision(n => n + 1);
              }}
              className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw aria-hidden="true" className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Updating…" : "Refresh"}
            </button>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-green-800" />
            <label htmlFor={controlId} className="text-xs font-semibold text-gray-700">
              Forecast location
            </label>
            {point ? (
              <select
                id={controlId}
                value={point.id}
                onChange={event => {
                  setSelected(event.target.value);
                  setShowDetails(false);
                  setDetailsError("");
                }}
                className="min-w-0 max-w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                {points.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}{item.elevationM == null ? "" : ` · ${item.elevationM} m`}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-sm text-gray-500">No route waypoints available</span>
            )}
          </div>
          {point && (
            <span className="text-xs tabular-nums text-gray-500">
              {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
            </span>
          )}
        </div>
        {data && (
          <p className="mt-3 text-xs text-gray-500" aria-live="polite">
            {isLoading ? "Checking for updated model data…" : `Checked ${timeLabel(data.generated, zone)}`}
            {data.sampleDensity === "summary" ? " · Quick overview" : " · Detailed samples"}
          </p>
        )}
      </header>

      {!point ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-gray-600">
          Add a Canadian route waypoint to see the forecast.
        </div>
      ) : !data ? (
        <div role={error ? "alert" : "status"} className="rounded-xl border border-gray-200 p-6 text-gray-700">
          {error ? (
            <p>{error} Use Refresh to try again.</p>
          ) : (
            <>
              <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
              <div className="mt-4 h-10 w-40 animate-pulse rounded bg-gray-100" />
              <p className="mt-4 text-xs text-gray-500">Loading model samples for {point.name}…</p>
            </>
          )}
        </div>
      ) : (
        <div className="min-w-0">
          {error && (
            <p role="alert" className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-950">
              Unable to update: {error}. Showing the previous forecast.
            </p>
          )}

          {/* Official alerts remain visible, never hidden behind disclosure controls. */}
          {data.alerts.status !== "ok" ? (
            <p role="alert" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
              Official alert status could not be checked. Do not assume there are no warnings.
            </p>
          ) : warningCount > 0 ? (
            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-amber-950">
              <p className="flex items-center gap-2 font-semibold">
                <AlertTriangle aria-hidden="true" className="h-4 w-4 shrink-0" />
                {warningCount} active ECCC {warningCount === 1 ? "alert" : "alerts"}
              </p>
              <p className="mt-1 text-xs">Alerts apply to current conditions at this point, not a future trip date.</p>
              {data.alerts.items.map(alert => (
                <details key={alert.id} className="mt-3 border-t border-amber-200 pt-3">
                  <summary className="cursor-pointer font-medium">{alert.title} · {alert.area}</summary>
                  <p className="mt-2 whitespace-pre-wrap text-xs leading-relaxed">{alert.text}</p>
                </details>
              ))}
            </div>
          ) : null}

          {/* Primary overview: one important reading, three supporting measurements. */}
          <div className="grid min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white lg:grid-cols-[minmax(0,1.4fr)_minmax(260px,1fr)]">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {date ? `Sampled forecast · ${shortDate(date)}` : "Next sampled forecast"}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {date ? "High and low from available model samples" : timeLabel(nearest?.time, zone)}
                  </p>
                </div>
                <div className="flex min-w-0 max-w-[160px] flex-col items-end gap-1 text-right" title={featuredSky.detail}>
                  <SkyIcon kind={featuredSky.kind} className="h-12 w-12" />
                  <span className="text-xs font-medium leading-snug text-gray-600">{featuredSky.label}</span>
                </div>
              </div>
              <p className="mt-6 text-5xl font-semibold tabular-nums tracking-tight text-gray-950 sm:text-6xl">
                {date ? temp(day?.high) : temp(nearest?.temperature, true)}
                {date && (
                  <span className="ml-2 text-2xl font-medium text-gray-400 sm:text-3xl">
                    / {temp(day?.low)}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                {date ? "Sampled high / low" : "Temperature at the next available model time"}
              </p>
            </div>
            <div className="grid grid-cols-3 border-t border-gray-200 bg-gray-50/60 lg:grid-cols-1 lg:border-l lg:border-t-0">
              <div className="min-w-0 px-3 py-5 sm:px-5 lg:py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <Wind aria-hidden="true" className="h-4 w-4" /> Wind
                </p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-gray-950 sm:text-xl">
                  {wind(date ? day?.wind : nearest?.wind)}
                </p>
              </div>
              <div className="min-w-0 border-l border-gray-200 px-3 py-5 sm:px-5 lg:border-l-0 lg:border-t lg:py-4">
                <p className="text-xs font-medium text-gray-500">Gusts</p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-gray-950 sm:text-xl">
                  {wind(date ? day?.gust : nearest?.gust)}
                </p>
              </div>
              <div className="min-w-0 border-l border-gray-200 px-3 py-5 sm:px-5 lg:border-l-0 lg:border-t lg:py-4">
                <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <CloudRain aria-hidden="true" className="h-4 w-4" /> Precip. chance
                </p>
                <p className="mt-2 text-lg font-semibold tabular-nums text-gray-950 sm:text-xl">
                  {number(date ? day?.pop : nearest?.pop, "%")}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            TrailPicker provides model-based weather estimates, not live observations or official safety advice. Actual conditions may differ. Terrain and avalanche hazards are not assessed. Cloud cover and precipitation icons are model estimates, not confirmed conditions. “—” means unavailable data.
          </p>

          {/* Days use easy-to-scan tiles instead of a dense data table. */}
          {!date && (
            <section className="mt-8" aria-label="Forecast by day">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-gray-950">
                    {tripDays.length ? "Forecast for your trip" : "Upcoming forecast"}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">Daily values sampled from available forecast models.</p>
                </div>
                <span className="text-xs text-gray-500">{visibleDays.length} {visibleDays.length === 1 ? "day" : "days"}</span>
              </div>
              {visibleDays.length ? (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {visibleDays.map(item => (
                    <div key={item.date} className="min-w-[155px] flex-1 rounded-xl border border-gray-200 bg-white px-4 py-4">
                      <p className="text-sm font-semibold text-gray-950">{shortDate(item.date)}</p>
                      <div className="mt-3 flex min-h-[65px] flex-col items-start gap-1" title={daySky(item.date).detail}>
                        <SkyIcon kind={daySky(item.date).kind} className="h-8 w-8" />
                        <span className="text-xs leading-tight text-gray-600">{daySky(item.date).label}</span>
                      </div>
                      <p className="mt-3 text-xl font-bold tabular-nums tracking-tight text-gray-950">
                        {temp(item.high)}
                        <span className="ml-1 text-base font-medium text-gray-400">/ {temp(item.low)}</span>
                      </p>
                      <div className="mt-4 space-y-2 border-t border-gray-100 pt-3 text-xs text-gray-600">
                        <p className="flex items-center justify-between gap-2">
                          <span>Wind</span><span className="font-medium tabular-nums text-gray-800">{wind(item.wind)}</span>
                        </p>
                        <p className="flex items-center justify-between gap-2">
                          <span>Precip.</span><span className="font-medium tabular-nums text-gray-800">{number(item.pop, "%")}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-600">No forecast samples available.</p>
              )}
              {tripStart && !tripDays.length && (
                <p className="mt-3 text-xs text-amber-900">
                  Your trip dates are outside the available forecast. The upcoming days shown are not predictions for your trip.
                </p>
              )}
            </section>
          )}

          {/* Risk screening is supportive information, not a safety clearance. */}
          <section className="mt-8 rounded-xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6" aria-label="Weather considerations">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle aria-hidden="true" className="h-4 w-4 text-gray-600" />
                <h3 className="text-base font-bold text-gray-950">Weather considerations</h3>
              </div>
              <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                {risks?.level || "Unknown"}
              </span>
            </div>
            {risks?.reasons.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
                {risks.reasons.slice(0, 5).map((reason, index) => (
                  <li key={`${reason}-${index}`}>{reason}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-gray-600">
                No issues flagged in the available temperature and wind samples. This is not a safety assessment.
              </p>
            )}
            {hints.length > 0 && <p className="mt-3 text-gray-700">{hints.join(" ")}</p>}
          </section>

          {date && planning && (
            <section className="mt-6 rounded-xl border border-gray-200 p-5" aria-label="Plan comparison">
              <h3 className="font-bold text-gray-950">Compared with your trip plan</h3>
              <p className="mt-2 text-gray-600">
                Planned minimum: {temp(planning.minTemperature, true)} · Sampled minimum: {temp(day?.low, true)}
              </p>
              {changes.length > 0 && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-amber-900">
                  {changes.map(change => <li key={change}>{change}</li>)}
                </ul>
              )}
              <p className="mt-3 text-xs text-gray-500">Forecasts never overwrite saved trip conditions.</p>
            </section>
          )}

          {/* Full model time steps are only fetched when the user requests them. */}
          <section className="mt-8 overflow-hidden rounded-xl border border-gray-200" aria-label="Model time steps">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
              <div>
                <h3 className="font-bold text-gray-950">Model time steps</h3>
                <p className="mt-1 text-xs text-gray-500">
                  {data.sampleDensity === "summary"
                    ? "Load detailed samples to explore forecast changes over time."
                    : `${hours.length} model samples available for this selection.`}
                </p>
              </div>
              <button
                type="button"
                disabled={detailsLoading}
                onClick={() => { void loadDetails(); }}
                aria-expanded={showDetails}
                className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
              >
                {detailsLoading ? "Loading details…" : data.sampleDensity === "detail" ? showDetails ? "Hide time steps" : "Show time steps" : "Load time steps"}
                <ChevronDown aria-hidden="true" className={`h-4 w-4 transition-transform ${showDetails ? "rotate-180" : ""}`} />
              </button>
            </div>
            {detailsError && <p role="alert" className="px-4 pb-3 text-xs text-amber-900">{detailsError}</p>}
            {showDetails && (
              <div className="overflow-x-auto border-t border-gray-200 px-4 py-2 sm:px-5">
                {hours.length > 0 ? (
                  <table className="w-full min-w-[580px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-xs text-gray-500">
                        <th scope="col" className="py-3 pr-3 font-semibold">Local time</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Temp.</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Wind</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Gusts</th>
                        <th scope="col" className="px-3 py-3 font-semibold">Precip.</th>
                        <th scope="col" className="py-3 pl-3 font-semibold">Model</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hours.map(hour => (
                        <tr key={hour.time} className="border-b border-gray-100 last:border-0">
                          <th scope="row" className="whitespace-nowrap py-3 pr-3 font-medium text-gray-900">
                            {shortDate(dateKey(hour.time, zone))} · {localHour(hour.time, zone)}
                          </th>
                          <td className="px-3 py-3 tabular-nums">{temp(hour.temperature, true)}</td>
                          <td className="px-3 py-3 tabular-nums">{wind(hour.wind)}</td>
                          <td className="px-3 py-3 tabular-nums">{wind(hour.gust)}</td>
                          <td className="px-3 py-3 tabular-nums">{number(hour.pop, "%")}</td>
                          <td className="py-3 pl-3 text-xs text-gray-600">{hour.model}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="py-3 text-gray-600">No time steps were returned for this date.</p>
                )}
              </div>
            )}
          </section>

          <footer className="mt-6 border-t border-gray-100 pt-4 text-xs leading-relaxed text-gray-500">
            <p>
              Source: Environment and Climate Change Canada (ECCC) GeoMet · {data.modelsAvailable.join(" / ") || "Model unavailable"}.
            </p>
            <a
              href="https://eccc-msc.github.io/open-data/msc-geomet/readme_en/"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-semibold text-green-800 underline underline-offset-2"
            >
              ECCC model documentation <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </footer>
        </div>
      )}
    </section>
  );
}

