"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ChevronUp,
  Info,
  Package,
  Pencil,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

import type { PackAnalysis } from "@/lib/pack-analysis";
import type { PlannerBuild } from "@/lib/trip-planner";
import { projectConsumableLoad } from "@/lib/consumables-model";
import { useDisplayPreferences } from "@/components/settings/DisplayPreferencesProvider";
import { weightText } from "@/lib/user-preferences";

type Props = {
  pack: PackAnalysis;
  trip: PlannerBuild;
};

const INITIAL_VISIBLE_DAYS = 10;

function numberOfDays(trip: PlannerBuild): number {
  if (trip.days.length) {
    return Math.min(31, Math.max(1, trip.days.length));
  }

  if (!trip.startDate || !trip.endDate) return 1;

  const from = new Date(trip.startDate).valueOf();
  const to = new Date(trip.endDate).valueOf();

  if (!Number.isFinite(from) || !Number.isFinite(to) || to < from) {
    return 1;
  }

  return Math.min(31, Math.max(1, Math.round((to - from) / 86_400_000) + 1));
}

export default function ConsumablesTimeline({ pack, trip }: Props) {
  const { weightUnit } = useDisplayPreferences();
  const formatWeight = (grams: number) => weightText(grams, weightUnit);
  const days = numberOfDays(trip);
  const settingsId = useId();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showAllDays, setShowAllDays] = useState(false);

  // String inputs let someone clear a field while editing, without making
  // the mass model receive NaN or an out-of-range value.
  const [dailyInput, setDailyInput] = useState<string | null>(null);
  const [resupplyDay, setResupplyDay] = useState(0);
  const [resupplyInput, setResupplyInput] = useState("0");

  const defaultDaily = Math.min(
    100_000,
    Math.round(pack.consumableGrams / days)
  );
  const dailyUse = dailyInput === null ? defaultDaily : Number(dailyInput || 0);
  const activeResupplyDay =
    resupplyDay >= 2 && resupplyDay <= days ? resupplyDay : 0;
  const resupplyGrams = Number(resupplyInput || 0);
  const effectiveResupply = activeResupplyDay ? resupplyGrams : 0;

  const timeline = useMemo(
    () =>
      projectConsumableLoad(
        pack.consumableGrams,
        days,
        dailyUse,
        activeResupplyDay || null,
        effectiveResupply
      ),
    [pack.consumableGrams, days, dailyUse, activeResupplyDay, effectiveResupply]
  );

  const unknownConsumables = pack.lines
    .filter((line) => line.weightClass === "consumable" && line.grams === null)
    .reduce((sum, line) => sum + line.quantity, 0);

  const firstShortfall = timeline.find((day) => day.unmetGrams > 0);
  const startingLoad = pack.baseGrams + pack.consumableGrams;
  const endingLoad =
    pack.baseGrams + (timeline.at(-1)?.remainingGrams ?? pack.consumableGrams);

  // Bars show base weight (blue) plus the consumables present at the START
  // of that day (green), including any resupply before that day.
  const dailyLoads = timeline.map((day) => ({
    ...day,
    supplies: day.startingGrams + day.addedGrams,
    carried: pack.baseGrams + day.startingGrams + day.addedGrams,
  }));
  const maxCarried = Math.max(1, ...dailyLoads.map((day) => day.carried));
  const visibleLoads = showAllDays
    ? dailyLoads
    : dailyLoads.slice(0, INITIAL_VISIBLE_DAYS);

  function resetAssumptions() {
    setDailyInput(null);
    setResupplyDay(0);
    setResupplyInput("0");
  }

  return (
    <section
      aria-labelledby="consumables-heading"
      className="min-w-0 border-b border-gray-200 pb-8 text-gray-800"
    >
      {/* Same section typography and understated metadata as Trip Planner. */}
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="consumables-heading" className="text-xl font-bold text-gray-950">
            Consumables
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            See how your estimated carried weight changes as supplies are used
            and replenished during the trip.
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
          {days} {days === 1 ? "day" : "days"} modeled
        </span>
      </header>

      {pack.consumableGrams === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col items-center rounded-lg bg-white px-6 py-12 text-center">
            <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500">
              <Package aria-hidden="true" className="h-9 w-9" />
            </span>
            <h3 className="text-base font-semibold text-gray-950">
              No consumables recorded yet
            </h3>
            <p className="mt-3 max-w-lg text-base leading-7 text-gray-500">
              Add food, water, fuel, or other consumable supplies to see how
              your pack weight changes each day.
            </p>
            <Link
              href={`/build/${trip.id}?tab=gear`}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Add consumables
            </Link>
            {unknownConsumables > 0 && (
              <p className="mt-4 max-w-md text-xs leading-5 text-amber-800" role="status">
                {unknownConsumables} consumable {unknownConsumables === 1 ? "unit has" : "units have"} unknown weight. Add recorded weights to include them in the estimate.
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
      {/* One connected panel, matching Trip Planner's divided sections. */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 border-b border-gray-200 px-4 py-5 sm:grid-cols-3 sm:gap-x-8 sm:px-5">
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">Starting pack</p>
            <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-gray-950">
              {formatWeight(startingLoad)}
            </p>
            <p className="mt-1 text-xs text-gray-500">Base + recorded supplies</p>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">End of trip</p>
            <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-green-800">
              {formatWeight(endingLoad)}
            </p>
            <p className="mt-1 text-xs text-gray-500">After day {days}</p>
          </div>
          <div className="col-span-2 min-w-0 border-t border-gray-100 pt-4 sm:col-span-1 sm:border-l sm:border-t-0 sm:py-0 sm:pl-7">
            <p className="text-xs font-medium text-gray-500">Recorded consumables</p>
            <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums text-gray-950">
              {formatWeight(pack.consumableGrams)}
            </p>
            <p className="mt-1 text-xs text-gray-500">At the trailhead</p>
          </div>
        </div>

        {/* An editable row styled like the collapsible Trip Logistics rows. */}
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-950">
                  Consumption &amp; resupply
                </h3>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {formatWeight(dailyUse)} per day
                  {activeResupplyDay
                    ? ` · ${formatWeight(effectiveResupply)} added before day ${activeResupplyDay}`
                    : " · No resupply"}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-expanded={settingsOpen}
              aria-controls={settingsId}
              onClick={() => setSettingsOpen((open) => !open)}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              {settingsOpen ? (
                <>
                  <ChevronUp aria-hidden="true" className="h-4 w-4" />
                  Close
                </>
              ) : (
                <>
                  <Pencil aria-hidden="true" className="h-4 w-4" />
                  Edit assumptions
                </>
              )}
            </button>
          </div>

          <div
            id={settingsId}
            hidden={!settingsOpen}
            className="border-t border-gray-100 bg-gray-50/60 px-4 pb-5 pt-4 sm:px-5"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Daily consumption (g)
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={100_000}
                  step={10}
                  value={dailyInput ?? String(defaultDaily)}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    if (
                      value === "" ||
                      (Number.isFinite(Number(value)) &&
                        Number(value) >= 0 &&
                        Number(value) <= 100_000)
                    ) {
                      setDailyInput(value);
                    }
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                />
              </label>
              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Resupply before
                </span>
                <select
                  value={activeResupplyDay}
                  disabled={days === 1}
                  onChange={(event) => setResupplyDay(Number(event.currentTarget.value))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value={0}>No resupply</option>
                  {Array.from({ length: days - 1 }, (_, index) => index + 2).map(
                    (day) => (
                      <option key={day} value={day}>
                        Day {day}
                      </option>
                    )
                  )}
                </select>
              </label>
              <label className="block min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                  Resupply amount (g)
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={1_000_000}
                  step={10}
                  disabled={!activeResupplyDay}
                  value={resupplyInput}
                  onChange={(event) => {
                    const value = event.currentTarget.value;
                    if (
                      value === "" ||
                      (Number.isFinite(Number(value)) &&
                        Number(value) >= 0 &&
                        Number(value) <= 1_000_000)
                    ) {
                      setResupplyInput(value);
                    }
                  }}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                />
              </label>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <p className="max-w-xl text-xs leading-5 text-gray-500">
                Daily use starts as an even division of recorded supplies, not
                a recommended amount. Edits update this estimate only.
              </p>
              <button
                type="button"
                onClick={resetAssumptions}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 transition-colors hover:text-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
                Reset assumptions
              </button>
            </div>
          </div>
        </div>

        {/* Readable, proportional bars distinguish fixed gear from supplies. */}
        <div className="px-4 py-5 sm:px-5 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
            <div>
              <h3 className="text-base font-semibold text-gray-950">
                Estimated weight by day
              </h3>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Pack weight at the start of each day, before daily use.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-600" aria-label="Chart legend">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                Base weight
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-green-700" />
                Consumables
              </span>
            </div>
          </div>

          {startingLoad === 0 && effectiveResupply === 0 ? (
            <div className="mt-5 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-7 text-center text-sm text-gray-500">
              Add items with recorded weights to see a meaningful weight projection.
            </div>
          ) : (
            <div
              role="list"
              aria-label="Estimated starting pack weight for each displayed trip day"
              className="mt-6 space-y-3"
            >
              {visibleLoads.map((day) => {
                const basePercent = (pack.baseGrams / maxCarried) * 100;
                const suppliesPercent = (day.supplies / maxCarried) * 100;

                return (
                  <div
                    key={day.day}
                    role="listitem"
                    aria-label={`Day ${day.day}: ${formatWeight(day.carried)} carried${
                      day.addedGrams > 0
                        ? `, including ${formatWeight(day.addedGrams)} resupply`
                        : ""
                    }`}
                    className="grid grid-cols-[3.3rem_minmax(0,1fr)_5.7rem] items-center gap-2.5 sm:grid-cols-[4rem_minmax(0,1fr)_7rem] sm:gap-4"
                  >
                    <span className="text-xs font-medium text-gray-600">
                      Day {day.day}
                    </span>
                    <div className="min-w-0">
                      <div aria-hidden="true" className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full shrink-0 bg-blue-500 transition-[width] duration-300"
                          style={{ width: `${basePercent}%` }}
                        />
                        <div
                          className="h-full shrink-0 bg-green-700 transition-[width] duration-300"
                          style={{ width: `${suppliesPercent}%` }}
                        />
                      </div>
                      {day.addedGrams > 0 && (
                        <span className="mt-1 block text-[11px] font-medium text-green-800">
                          + {formatWeight(day.addedGrams)} resupply
                        </span>
                      )}
                    </div>
                    <span className="text-right text-xs font-semibold tabular-nums text-gray-900">
                      {formatWeight(day.carried)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {dailyLoads.length > INITIAL_VISIBLE_DAYS &&
            !(startingLoad === 0 && effectiveResupply === 0) && (
              <button
                type="button"
                aria-expanded={showAllDays}
                onClick={() => setShowAllDays((shown) => !shown)}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                {showAllDays
                  ? "Show fewer days"
                  : `Show all ${dailyLoads.length} days`}
              </button>
            )}
        </div>
      </div>

      {/* Keep warnings and model limitations distinct from trip-day results. */}
      {unknownConsumables > 0 && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            {unknownConsumables} consumable {unknownConsumables === 1 ? "unit has" : "units have"} unknown weight.
            Your starting load may be incomplete.
          </p>
        </div>
      )}

      {firstShortfall && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Recorded consumable mass runs short by day <strong>{firstShortfall.day}</strong> with
            these assumptions. This is a weight projection, not a check of food,
            water, or fuel sufficiency.
          </p>
        </div>
      )}

      </>
      )}

      <p className="mt-5 flex items-start gap-2 border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500">
        <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          Estimates use recorded consumable mass and your assumptions. Worn
          weight is excluded; the model does not calculate nutritional,
          hydration, or fuel requirements or verify resupply availability.
          Trips are modeled for up to 31 days.
        </span>
      </p>
    </section>
  );
}
