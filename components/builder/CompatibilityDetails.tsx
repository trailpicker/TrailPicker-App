import {
    evaluateCompatibility,
    type BuildForCompat,
    type CompatItem,
    type CompatibilityIssue,
    type TripDayForCompat,
} from "@/lib/compatibility";
//components/builder/CompatibilityDetails.tsx
type Props = {
    build: BuildForCompat;
    items: CompatItem[];
    days?: TripDayForCompat[];
};

const severityStyles: Record<CompatibilityIssue["severity"], string> = {
    error: "border-red-200 bg-red-50 text-red-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    info: "border-gray-200 bg-gray-50 text-gray-700",
};

const severityLabel: Record<CompatibilityIssue["severity"], string> = {
    error: "Issue",
    warning: "Warning",
    info: "Note",
};

export default function CompatibilityDetails({ build, items, days = [] }: Props) {
    const issues = evaluateCompatibility(build, items, days);

    return (
        <section id="compatibility-details" className="mt-10 scroll-mt-24">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Compatibility Check
            </h2>

            {issues.length === 0 ? (
                <p className="mt-3 text-sm text-gray-500">No compatibility issues found for this build.</p>
            ) : (
                <div className="mt-3 space-y-2">
                    {issues.map((issue) => (
                        <div key={issue.id} className={`rounded-lg border px-4 py-3 text-sm ${severityStyles[issue.severity]}`}>
                            <span className="mr-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                                {severityLabel[issue.severity]} · {issue.category}
                            </span>
                            {issue.message}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}