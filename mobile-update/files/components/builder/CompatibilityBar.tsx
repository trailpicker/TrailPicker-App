import Link from "next/link";
//components/builder/CompatibilityBar.tsx
import {
    evaluateCompatibility,
    summarizeCompatibility,
    type BuildForCompat,
    type CompatItem,
    type TripDayForCompat,
} from "@/lib/compatibility";

type Props = {
    build: BuildForCompat;
    items: CompatItem[];
    days?: TripDayForCompat[];
    totalWeight: number;
};

const statusStyles = {
    ok: { bar: "bg-emerald-50 border-emerald-200 text-emerald-900", dot: "bg-emerald-500", label: "Compatible" },
    warning: { bar: "bg-amber-100 border-amber-200 text-amber-900", dot: "bg-amber-500", label: "Warning" },
    error: { bar: "bg-red-100 border-red-200 text-red-900", dot: "bg-red-500", label: "Issue" },
};

export default function CompatibilityBar({ build, items, days = [], totalWeight }: Props) {
    const issues = evaluateCompatibility(build, items, days);
    const summary = summarizeCompatibility(issues);
    const style = statusStyles[summary.status];

    return (
    <div className={`flex items-center justify-between max-md:flex-wrap max-md:gap-3 px-5 py-3 text-sm ${style.bar}`}>
            <div className="flex items-center gap-2 max-md:flex-wrap max-md:min-w-0">
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                <span className="font-semibold">{style.label}</span>

                {summary.total > 0 ? (
                    <span>
                        {summary.errors > 0 && `${summary.errors} issue${summary.errors !== 1 ? "s" : ""}`}
                        {summary.errors > 0 && summary.warnings > 0 && ", "}
                        {summary.warnings > 0 && `${summary.warnings} warning${summary.warnings !== 1 ? "s" : ""}`}
                        {" — "}
                        <Link href="#compatibility-details" className="underline font-medium">
                            see details
                        </Link>
                    </span>
                ) : (
                    <span className="opacity-70">No issues found</span>
                )}
            </div>

            <div className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold">
                Total weight: {(totalWeight / 1000).toFixed(1)}kg
            </div>
        </div>
    );
}

