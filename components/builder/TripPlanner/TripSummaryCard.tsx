
"use client";

import {
    AlertTriangle,
    CalendarDays,
    CloudRain,
    CloudSnow,
    CloudSun,
    MapPin,
    Pencil,
    Thermometer,
    Route,
} from "lucide-react";

import {
    formatDateRange,
    getDaysUntil,
    getNights,
} from "@/lib/trip";

import type { CompatibilityIssue } from "@/lib/compatibility";
import { useDisplayPreferences } from "@/components/settings/DisplayPreferencesProvider";
import { temperatureText, distanceText } from "@/lib/user-preferences";

type Props = {
    build: {
        id: string;
        location: string | null;
        locationLat: number | null;
        locationLng: number | null;
        startDate: Date | null;
        endDate: Date | null;
        people: number;
        minTemperature: number | null;
        conditions: string | null;
        days?: Array<{ distanceKm: number | null }>;
    };
    issues: CompatibilityIssue[];
    onEdit?: () => void;
};

const conditions = {
    dry: {
        label: "Dry conditions",
        Icon: CloudSun,
    },
    rain: {
        label: "Rain expected",
        Icon: CloudRain,
    },
    snow: {
        label: "Snow expected",
        Icon: CloudSnow,
    },
} as const;

export default function TripSummaryCard({
    build,
    issues,
    onEdit,
}: Props) {
    const { temperatureUnit, distanceUnit } = useDisplayPreferences();
    const measuredDays = build.days?.filter(day => day.distanceKm != null) ?? [];
    const recordedDistanceKm = measuredDays.reduce((sum, day) => sum + (day.distanceKm ?? 0), 0);
    const nights = getNights(
        build.startDate,
        build.endDate,
    );

    const daysUntil = getDaysUntil(build.startDate);

    const condition =
        build.conditions &&
        build.conditions in conditions
            ? conditions[
                  build.conditions as keyof typeof conditions
              ]
            : null;

    const issueCount = issues.filter(
        (issue) =>
            issue.severity === "warning" ||
            issue.severity === "error",
    ).length;

    const countdown =
        daysUntil == null
            ? null
            : daysUntil > 1
              ? `${daysUntil} days away`
              : daysUntil === 1
                ? "Tomorrow"
                : daysUntil === 0
                  ? "Starts today"
                  : "Trip date passed";

    const ConditionIcon = condition?.Icon;

    return (
        <section
            aria-label="Trip overview"
            className="border-b border-gray-200 pb-6 pt-2"
        >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="min-w-0">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1 shrink-0 rounded-full bg-green-700" />

                        <h2 className="min-w-0 break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {formatDateRange(build.startDate, build.endDate)}
                        </h2>
                    </div>

                    {build.location && (
                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>{build.location}</span>
                        </p>
                    )}

                    <p className="mt-2 text-sm text-gray-500">
                        {nights} night
                        {nights === 1 ? "" : "s"}
                        {" · "}
                        {build.people} traveler
                        {build.people === 1 ? "" : "s"}
                    </p>
                </div>

                {onEdit && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-900"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit trip
                    </button>
                )}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                {countdown && (
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        <span>{countdown}</span>
                    </div>
                )}

                {condition && ConditionIcon && (
                    <div className="flex items-center gap-2">
                        <ConditionIcon className="h-4 w-4 text-gray-400" />
                        <span>{condition.label}</span>
                    </div>
                )}

                {measuredDays.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Route className="h-4 w-4 text-gray-400" />
                        <span>Recorded distance {distanceText(recordedDistanceKm, distanceUnit)}</span>
                    </div>
                )}

                {build.minTemperature != null && (
                    <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-gray-400" />
                        <span>
                            Low {temperatureText(build.minTemperature, temperatureUnit)}
                        </span>
                    </div>
                )}

                {issueCount > 0 && (
                    <div className="flex items-center gap-2 text-amber-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span>
                            {issueCount} gear issue
                            {issueCount === 1 ? "" : "s"} to review
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}
