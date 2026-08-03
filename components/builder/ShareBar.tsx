"use client";
//components/builder/ShareBar.tsx
import { useRef, useState } from "react";
import Link from "next/link";
import { duplicateBuild, getBuildExport, importBuildItems } from "@/app/build/actions";

type Props = {
    buildId: string;
    buildName: string;
    createdAt: Date;
    updatedAt: Date;
};

const btnClass =
    "flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed";

export default function ShareBar({ buildId, buildName, createdAt, updatedAt }: Props) {
    const [copied, setCopied] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const shareUrl =
        typeof window !== "undefined" ? `${window.location.origin}/build/${buildId}` : `/build/${buildId}`;

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard blocked — user can still select the text manually
        }
    }

    async function exportBuild() {
        const data = await getBuildExport(buildId);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${buildName.replace(/\s+/g, "-").toLowerCase()}.json`;
        a.click();

        URL.revokeObjectURL(url);
    }

    async function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setImporting(true);
        try {
            const text = await file.text();
            JSON.parse(text);

            const formData = new FormData();
            formData.append("buildId", buildId);
            formData.append("payload", text);
            await importBuildItems(formData);

            window.location.reload();
        } catch {
            alert("Couldn't read that file — check it's a TrailPicker export.");
        } finally {
            setImporting(false);
            e.target.value = "";
        }
    }

    return (
        <div className="flex flex-wrap items-center gap-3 px-5 py-4">
            <div className="flex flex-1 min-w-[280px] items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-3 py-2">
                <button
                    type="button"
                    onClick={copyLink}
                    title="Copy link"
                    className="shrink-0 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                    {copied ? (
                        <span className="text-xs font-semibold text-green-700 whitespace-nowrap">Copied!</span>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                        </svg>
                    )}
                </button>

                <input
                    readOnly
                    value={shareUrl}
                    onFocus={(e) => e.currentTarget.select()}
                    className="w-full bg-transparent text-sm text-gray-700 outline-none truncate"
                />
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                onChange={handleImportFile}
                className="hidden"
            />

            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={importing} className={btnClass}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                {importing ? "Importing…" : "Import"}
            </button>

            <button type="button" onClick={exportBuild} className={btnClass}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V3m0 0l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                Export
            </button>

            <div className="relative">
                <button type="button" onClick={() => setShowHistory(!showHistory)} className={btnClass}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                        <circle cx="12" cy="12" r="9" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
                    </svg>
                    History
                </button>

                {showHistory && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-white p-3 text-xs text-gray-600 shadow-lg z-20">
                        <p><span className="font-semibold">Created:</span> {createdAt.toLocaleDateString()}</p>
                        <p className="mt-1"><span className="font-semibold">Last updated:</span> {updatedAt.toLocaleDateString()}</p>
                    </div>
                )}
            </div>

            <form action={duplicateBuild}>
                <input type="hidden" name="buildId" value={buildId} />
                <button type="submit" className={btnClass}>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                        <rect x="8" y="8" width="12" height="12" rx="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16V5a1 1 0 011-1h11" />
                    </svg>
                    Save As
                </button>
            </form>

            <Link href="/build" className={btnClass}>
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New Build
            </Link>
        </div>

    );
}