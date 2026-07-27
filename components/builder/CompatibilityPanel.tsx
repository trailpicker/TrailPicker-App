import type { CompatibilityIssue } from "@/lib/compatibility";

export default function CompatibilityPanel({ issues }: { issues: CompatibilityIssue[] }) {
  if (issues.length === 0) return null;

  const warnings = issues.filter((i) => i.severity === "warning");
  const infos = issues.filter((i) => i.severity === "info");

  return (
    <div className="mt-4 rounded-xl border bg-white p-4 space-y-2">
      <h2 className="text-sm font-bold text-gray-700">Compatibility Check</h2>
      {[...warnings, ...infos].map((issue, i) => (
        <div
          key={i}
          className={`
            flex items-start gap-2 rounded-lg px-3 py-2 text-sm
            ${issue.severity === "warning" ? "bg-amber-50 text-amber-900" : "bg-gray-50 text-gray-600"}
          `}
        >
          <span className="font-semibold shrink-0">{issue.category}:</span>
          <span>{issue.message}</span>
        </div>
      ))}
    </div>
  );
}