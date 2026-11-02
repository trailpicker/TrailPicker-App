"use client";
import { evaluatePackIntelligence, type IntelligenceItem } from "@/lib/pack-intelligence";
import type { PlannerBuild } from "@/lib/trip-planner";
import { useIgnoredFindings } from "./useIgnoredFindings";
import BuildSaveStatus from "@/components/builder/BuildSaveStatus";
import Link from "next/link";
import type { CompatItem } from "@/lib/compatibility";

type Props = {
  buildId?: string;
  trip: PlannerBuild;
  items: CompatItem[];
  totalWeight: number;
};

const styles = {
  ok: { bar: "bg-emerald-50 border-emerald-200 text-emerald-900", dot: "bg-emerald-500", label: "No issues detected" },
  warning: { bar: "bg-amber-50 border-amber-200 text-amber-900", dot: "bg-amber-500", label: "Action recommended" },
  error: { bar: "bg-red-50 border-red-200 text-red-900", dot: "bg-red-500", label: "Fix compatibility issue" },
  incomplete: { bar: "bg-slate-50 border-slate-200 text-slate-900", dot: "bg-slate-500", label: "Verify missing specs" },
  notes: { bar: "bg-sky-50 border-sky-200 text-sky-900", dot: "bg-sky-500", label: "Planning advice" },
};

export default function CompatibilityBar({ buildId, trip, items, totalWeight }: Props) {
  const findings = evaluatePackIntelligence(trip, items as IntelligenceItem[], trip.days).findings;
  const { ignoredIds } = useIgnoredFindings(buildId ?? "", findings, !!buildId);
  const active = findings.filter(f => !ignoredIds.has(f.id));
  const summary = {
    errors: active.filter(f => f.level === "critical").length,
    warnings: active.filter(f => f.level === "review").length,
    unknowns: active.filter(f => f.level === "unknown").length,
    total: active.length,
  };
  const status = summary.errors ? "error" : summary.warnings ? "warning" : summary.unknowns ? "incomplete" : summary.total ? "notes" : "ok";
  const style = styles[findings.length && active.length === 0 ? "notes" : status];
  // Details render only in the gear tab. The bar also renders on trip/analysis tabs.
  const detailsHref = buildId ? `/build/${encodeURIComponent(buildId)}?tab=gear#compatibility-details` : "#compatibility-details";

  return (
    <div className={`flex items-center justify-between gap-3 border px-5 py-3 text-sm max-md:flex-wrap ${style.bar}`}>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span aria-hidden="true" className={`h-2 w-2 rounded-full ${style.dot}`} />
        <span className="font-semibold">{findings.length && !active.length ? "All findings acknowledged" : style.label}</span>
        <span className="text-xs opacity-80">
          {summary.errors > 0 ? `${summary.errors} issue${summary.errors === 1 ? "" : "s"} · ` : ""}
          {summary.warnings > 0 ? `${summary.warnings} warning${summary.warnings === 1 ? "" : "s"} · ` : ""}
          {summary.unknowns > 0 ? `${summary.unknowns} unknown${summary.unknowns === 1 ? "" : "s"} · ` : ""}
          {summary.total === 0 ? "No active findings (not a safety guarantee)" : `${summary.total} active finding${summary.total === 1 ? "" : "s"}`}
        </span>
        {ignoredIds.size > 0 && <span className="text-xs opacity-80">{ignoredIds.size} ignored</span>}
        {findings.length > 0 && <Link href={detailsHref} className="font-semibold underline underline-offset-2">See what to fix</Link>}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-md bg-white/60 px-3 py-1 text-xs font-semibold">
          Known weight: {(totalWeight / 1000).toFixed(1)} kg
        </span>
        {buildId && <BuildSaveStatus buildId={buildId} />}
      </div>
    </div>
  );
}

