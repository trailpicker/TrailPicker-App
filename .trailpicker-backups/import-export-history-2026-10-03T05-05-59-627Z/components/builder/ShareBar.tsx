"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, CopyCheck, Plus, Save } from "lucide-react";
import BuildSettings from "@/components/builder/BuildSettings";
import BuildDataTools from "@/components/builder/BuildDataTools";
import { duplicateBuild } from "@/app/build/actions";

type Props = {
  buildId: string;
  buildName: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const btnClass =
  "flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50";

export default function ShareBar({ buildId, buildName, isPublic, createdAt, updatedAt }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/build/${buildId}` : `/build/${buildId}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // The URL remains selectable if clipboard permission is blocked.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5 px-5 py-4">
      <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 shadow-inner shadow-gray-100/70">
        <button
          type="button"
          onClick={copyLink}
          title={isPublic ? "Copy public link" : "Copy private link"}
          className="shrink-0 rounded-md p-1 text-gray-400 transition hover:bg-white hover:text-green-800"
        >
          {copied ? <CopyCheck className="h-4 w-4 text-green-700" /> : <Copy className="h-4 w-4" />}
        </button>
        <input
          readOnly
          value={shareUrl}
          onFocus={(event) => event.currentTarget.select()}
          className="w-full truncate bg-transparent text-sm text-gray-700 outline-none"
        />
        <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${isPublic ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-600"}`}>
          {isPublic ? "Public" : "Private"}
        </span>
      </div>

      <BuildDataTools
        buildId={buildId}
        buildName={buildName}
        createdAt={createdAt}
        updatedAt={updatedAt}
        buttonClassName={btnClass}
      />

      <BuildSettings buildId={buildId} buildName={buildName} isPublic={isPublic} buttonClassName={btnClass} />

      <form action={duplicateBuild}>
        <input type="hidden" name="buildId" value={buildId} />
        <button type="submit" className={btnClass}>
          <Save className="h-4 w-4" aria-hidden="true" />
          Save As
        </button>
      </form>

      <Link href="/build" className={btnClass}>
        <Plus className="h-4 w-4" aria-hidden="true" />
        New Build
      </Link>
    </div>
  );
}
