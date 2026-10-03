"use client";

import {
    AlertTriangle,
    CalendarDays,
    CloudSun,
    MapPin,
    Pencil,
    Thermometer,
    Users,
} from "lucide-react";

import {
    formatDateRange,
    getDaysUntil,
    getNights,
} from "@/lib/trip";

import type { CompatibilityIssue } from "@/lib/compatibility";

const conditionMeta: Record<
    string,
    {
        label: string;
        icon: string;
        className: string;
    }
> = {
    dry: {
        label: "Dry",
        icon: "☀️",
        className: "bg-amber-50 text-amber-800",
    },
    rain: {
        label: "Rain expected",
        icon: "🌧️",
        className: "bg-blue-50 text-blue-800",
    },
    snow: {
        label: "Snow expected",
        icon: "❄️",
        className: "bg-sky-50 text-sky-800",
    },
};

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
    };
    issues: CompatibilityIssue[];
    onEdit?: () => void;
};

export default function TripSummaryCard({
    build,
    issues,
    onEdit,
}: Props) {
    const nights = getNights(
        build.startDate,
        build.endDate,
    );

    const daysUntil = getDaysUntil(build.startDate);

    const condition = build.conditions
        ? conditionMeta[build.conditions]
        : null;

    const issueCount = issues.filter(
        (issue) =>
            issue.severity === "warning" ||
            issue.severity === "error",
    ).length;

    const shortLocation =
        build.location?.split(",")[0] || "Unnamed trip";

    const countdown =
        daysUntil == null
            ? "Dates not set"
            : daysUntil > 1
                ? `${daysUntil} days away`
                : daysUntil === 1
                    ? "Tomorrow"
                    : daysUntil === 0
                        ? "Starts today"
                        : "Trip date passed";

    return (
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-5 py-6 text-white sm:px-8 sm:py-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-green-50">
                                {countdown}
                            </span>

                            {condition && (
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${condition.className}`}
                                >
                                    {condition.icon} {condition.label}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {shortLocation}
                        </h1>

                        {build.location && (
                            <p className="mt-2 flex items-center gap-2 text-sm text-green-100">
                                <MapPin className="h-4 w-4" />
                                {build.location}
                            </p>
                        )}

                        <p className="mt-3 text-sm text-white/70">
                            {formatDateRange(
                                build.startDate,
                                build.endDate,
                            )}
                            {" · "}
                            {nights} night{nights === 1 ? "" : "s"}
                            {" · "}
                            {build.people} traveler
                            {build.people === 1 ? "" : "s"}
                        </p>
                    </div>

                    {onEdit && <button
                        type="button"
                        onClick={onEdit}
                        className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-green-950 shadow-sm transition hover:bg-green-50"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit trip
                    </button>}
                </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y border-b border-gray-200 sm:grid-cols-4 sm:divide-y-0">
                <StatCard
                    icon={<CalendarDays className="h-4 w-4" />}
                    label="Dates"
                    value={formatDateRange(
                        build.startDate,
                        build.endDate,
                    )}
                    sub={`${nights} night${nights === 1 ? "" : "s"}`}
                />

                <StatCard
                    icon={<Users className="h-4 w-4" />}
                    label="Group"
                    value={`${build.people}`}
                    sub={`traveler${build.people === 1 ? "" : "s"}`}
                />

                <StatCard
                    icon={<Thermometer className="h-4 w-4" />}
                    label="Lowest"
                    value={
                        build.minTemperature != null
                            ? `${build.minTemperature}°C`
                            : "Not set"
                    }
                    sub="expected low"
                />

                <StatCard
                    icon={<CloudSun className="h-4 w-4" />}
                    label="Conditions"
                    value={condition?.label ?? "Unknown"}
                    sub="overall trip"
                />
            </div>

            {issueCount > 0 ? (
                <div className="flex items-start gap-3 bg-amber-50 px-5 py-4 text-sm text-amber-950 sm:px-8">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div>
                        <p className="font-bold">
                            {issueCount} gear issue
                            {issueCount === 1 ? "" : "s"} to check
                        </p>

                        <p className="mt-0.5 text-xs text-amber-800">
                            Review your gear tab before leaving.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-800 sm:px-8">
                    ✓ No major gear compatibility problems found.
                </div>
            )}
        </section>
    );
}

function StatCard({
    icon,
    label,
    value,
    sub,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <div className="min-w-0 p-4 sm:p-5">
            <div className="flex items-center gap-2 text-gray-400">
                {icon}

                <p className="text-[10px] font-bold uppercase tracking-wider">
                    {label}
                </p>
            </div>

            <p className="mt-2 truncate text-base font-bold text-gray-900 sm:text-lg">
                {value}
            </p>

            {sub && (
                <p className="mt-1 text-xs text-gray-400">
                    {sub}
                </p>
            )}
        </div>
    );
}
