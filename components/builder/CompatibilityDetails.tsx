"use client";

import { useState } from "react";
import type { CompatItem } from "@/lib/compatibility";
import type { PlannerBuild } from "@/lib/trip-planner";
import { evaluatePackIntelligence, type IntelligenceItem } from "@/lib/pack-intelligence";
import { FindingList } from "./AnalysisFindingCard";
import { useIgnoredFindings } from "./useIgnoredFindings";

type Props = {
  buildId?: string;
  trip: PlannerBuild;
  items: CompatItem[];
  readOnly?: boolean;
};

export default function CompatibilityDetails({ buildId, trip, items, readOnly = false }: Props) {
  const findings = evaluatePackIntelligence(trip, items as IntelligenceItem[], trip.days).findings;
  const { ignoredIds, toggleIgnore, storageError } = useIgnoredFindings(buildId ?? "", findings, !!buildId && !readOnly);
  const [showIgnored, setShowIgnored] = useState(false);
  const active = findings.filter(f => !ignoredIds.has(f.id));
  const shown = showIgnored ? findings : active;

  return (
    <section id="compatibility-details" className="mt-10 scroll-mt-24" aria-labelledby="compatibility-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 pt-8">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Compatibility
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {active.length} active · {ignoredIds.size} acknowledged
          </p>
        </div>
        {!readOnly && ignoredIds.size > 0 && <button type="button" onClick={() => setShowIgnored(v => !v)} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
          {showIgnored ? "Hide ignored" : `Show ignored (${ignoredIds.size})`}
        </button>}
      </div>
      {storageError && <p role="alert" className="mt-3 text-sm text-amber-800">Could not save ignored findings in this browser.</p>}
      <div className="mt-4">
        <FindingList
          findings={shown}
          ignoredIds={ignoredIds}
          onToggleIgnore={!readOnly && buildId ? toggleIgnore : undefined}
          empty={findings.length ? "All current findings are acknowledged. They may still need attention." : "No analysis findings flagged this build."}
        />
      </div>
    </section>
  );
}
