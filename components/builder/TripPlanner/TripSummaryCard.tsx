"use client";
//components/builder/TripPlanner/TripSummaryCard.tsx
import dynamic from "next/dynamic";
import { formatDateRange, getNights, getDaysUntil } from "@/lib/trip";
import type { CompatibilityIssue } from "@/lib/compatibility";

const TripLocationPreview = dynamic(() => import("./TripLocationPreview"), { ssr: false });

const conditionMeta: Record<string, { label: string; icon: string; className: string }> = {
    dry: { label: "Dry", icon: "☀️", className: "bg-amber-50 text-amber-800" },
    rain: { label: "Rain expected", icon: "🌧️", className: "bg-blue-50 text-blue-800" },
    snow: { label: "Snow expected", icon: "❄️", className: "bg-sky-50 text-sky-800" },
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
    onEdit: () => void;
};

export default function TripSummaryCard({ build, issues, onEdit }: Props) {
    const nights = getNights(build.startDate, build.endDate);
    const daysUntil = getDaysUntil(build.startDate);
    const condition = build.conditions ? conditionMeta[build.conditions] : null;
    const warningCount = issues.filter((i) => i.severity === "warning").length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-widest
                        text-gray-400
                    ">
                        Trip Overview
                    </p>


                    <h2 className="
                        mt-2
                        text-3xl
                        font-bold
                        text-gray-900
                    ">
                        {build.location?.split(",")[0] ?? "Unnamed Trip"}
                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-gray-500
                    ">
                        {formatDateRange(build.startDate, build.endDate)}
                        {" · "}
                        {nights} night{nights !== 1 && "s"}
                        {" · "}
                        {build.people} people
                    </p>

                </div>


                <button
                    onClick={onEdit}
                    className="
                        rounded-lg
                        bg-green-900
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-green-800
                    "
                >
                    Edit Trip
                </button>

            </div>


            {/* Map */}
            {build.locationLat != null &&
                build.locationLng != null && (
                    <div className="
                        overflow-hidden
                        rounded-2xl
                        shadow-sm
                        border
                        bg-white
                    ">
                        <TripLocationPreview
                            lat={build.locationLat}
                            lng={build.locationLng}
                        />
                    </div>
                )}



            {/* Stats */}
            <div className="
                grid
                grid-cols-4
                rounded-xl
                border
                bg-white
                overflow-hidden
            ">

                <StatCard
                    label="Dates"
                    value={formatDateRange(build.startDate, build.endDate)}
                    sub={`${nights} nights`}
                />

                <StatCard
                    label="People"
                    value={`${build.people}`}
                />

                <StatCard
                    label="Lowest"
                    value={
                        build.minTemperature != null
                            ? `${build.minTemperature}°C`
                            : "-"
                    }
                />

                <StatCard
                    label="Conditions"
                    value={condition?.label ?? "Unknown"}
                />

            </div>


            {warningCount > 0 && (
                <div className="
                    rounded-xl
                    border border-amber-200
                    bg-amber-50
                    px-5 py-4
                    text-sm
                    text-amber-900
                ">
                    {warningCount} compatibility warning
                    {warningCount !== 1 && "s"} found.
                    Check your gear list.
                </div>
            )}

        </div>
    );
}

function StatCard({
    label,
    value,
    sub,
}: {
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <div
            className="
            p-5
            border-r
            last:border-r-0
            "
        >
            <p className="
            text-xs
            uppercase
            tracking-wider
            font-semibold
            text-gray-400
            ">
                {label}
            </p>

            <p className="
            mt-2
            text-lg
            font-semibold
            text-gray-900
            truncate
            ">
                {value}
            </p>

            {sub && (
                <p className="
                mt-1
                text-sm
                text-gray-400
                ">
                    {sub}
                </p>
            )}
        </div>
    );
}