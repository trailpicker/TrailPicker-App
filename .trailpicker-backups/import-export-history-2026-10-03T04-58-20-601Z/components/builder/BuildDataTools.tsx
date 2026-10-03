"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Backpack,
  CheckCircle2,
  Clock3,
  Download,
  FileDown,
  FileJson2,
  FileUp,
  History,
  Loader2,
  MapPinned,
  PackageOpen,
  RotateCcw,
  UploadCloud,
  X,
  type LucideIcon,
} from "lucide-react";
import { getBuildExport, importBuildItems } from "@/app/build/actions";
import { getBuildHistory, restoreBuildRevision } from "@/lib/build-history-actions";

type Tab = "import" | "export" | "history";
type ImportMode = "merge" | "replace";

type ImportPreview = {
  name: string;
  itemCount: number;
  dayCount: number;
  version: number | null;
  fullBuild: boolean;
};

type SelectedImport = {
  fileName: string;
  size: number;
  text: string;
  preview: ImportPreview;
};

type HistoryEntry = {
  id: string;
  action: string;
  summary: string;
  createdAt: string;
  itemCount: number;
  dayCount: number;
  name: string;
  isCurrent: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function inspectImport(text: string): ImportPreview {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("That file is not valid JSON.");
  }

  if (!isRecord(parsed) || !Array.isArray(parsed.items)) {
    throw new Error("This doesn’t look like a TrailPicker build export.");
  }
  if (parsed.format != null && parsed.format !== "trailpicker-build") {
    throw new Error("This JSON file was not exported by TrailPicker.");
  }

  const version = typeof parsed.version === "number" ? parsed.version : null;
  return {
    name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name.trim() : "Imported build",
    itemCount: parsed.items.length,
    dayCount: Array.isArray(parsed.days) ? parsed.days.length : 0,
    version,
    fullBuild: version === 2 || Array.isArray(parsed.days) || "routeWaypoints" in parsed || "tripLogistics" in parsed,
  };
}

function bytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function safeFileName(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "trailpicker-build"}.json`;
}

function historyIcon(action: string) {
  if (action === "import") return FileUp;
  if (action === "restore") return RotateCcw;
  if (action === "route" || action === "trip" || action === "itinerary" || action === "logistics") return MapPinned;
  if (action === "gear") return Backpack;
  return Clock3;
}

export default function BuildDataTools({
  buildId,
  buildName,
  createdAt,
  updatedAt,
  buttonClassName,
}: {
  buildId: string;
  buildName: string;
  createdAt: Date;
  updatedAt: Date;
  buttonClassName: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [tab, setTab] = useState<Tab>("import");
  const [selectedImport, setSelectedImport] = useState<SelectedImport | null>(null);
  const [importMode, setImportMode] = useState<ImportMode>("merge");
  const [importError, setImportError] = useState<string | null>(null);
  const [importNotice, setImportNotice] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [confirmRestore, setConfirmRestore] = useState<string | null>(null);
  const [restoring, setRestoring] = useState<string | null>(null);

  async function loadHistory() {
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const entries = await getBuildHistory(buildId);
      setHistory(entries);
    } catch {
      setHistoryError("Couldn’t load version history. Make sure the history database migration has been applied.");
    } finally {
      setHistoryLoading(false);
    }
  }

  function open(nextTab: Tab) {
    setTab(nextTab);
    setImportError(null);
    setExportNotice(null);
    setHistoryError(null);
    setConfirmRestore(null);
    dialog.current?.showModal();
    if (nextTab === "history") void loadHistory();
  }

  function chooseTab(nextTab: Tab) {
    setTab(nextTab);
    setConfirmRestore(null);
    if (nextTab === "history" && history.length === 0 && !historyLoading) void loadHistory();
  }

  async function readImportFile(file: File) {
    setImportError(null);
    setImportNotice(null);
    if (file.size > 2_000_000) {
      setSelectedImport(null);
      setImportError("That file is over 2 MB. TrailPicker exports should be much smaller than that.");
      return;
    }
    try {
      const text = await file.text();
      const preview = inspectImport(text);
      setSelectedImport({ fileName: file.name, size: file.size, text, preview });
    } catch (error) {
      setSelectedImport(null);
      setImportError(error instanceof Error ? error.message : "Couldn’t read that import file.");
    }
  }

  async function runImport() {
    if (!selectedImport || importing) return;
    setImporting(true);
    setImportError(null);
    setImportNotice(null);
    try {
      const formData = new FormData();
      formData.set("buildId", buildId);
      formData.set("payload", selectedImport.text);
      formData.set("mode", importMode);
      const result = await importBuildItems(formData);
      setImportNotice(
        result.mode === "replace"
          ? `Build replaced successfully. Imported ${result.itemCount} gear item${result.itemCount === 1 ? "" : "s"}.`
          : `Added ${result.itemCount} gear item${result.itemCount === 1 ? "" : "s"} to this build.`,
      );
      setSelectedImport(null);
      if (fileInput.current) fileInput.current.value = "";
      setHistory([]);
      router.refresh();
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed. The current build was left unchanged.");
    } finally {
      setImporting(false);
    }
  }

  async function runExport() {
    if (exporting) return;
    setExporting(true);
    setExportNotice(null);
    try {
      const data = await getBuildExport(buildId);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = safeFileName(buildName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setExportNotice("Export downloaded. It includes gear, trip details, route, logistics, and itinerary days.");
    } catch {
      setExportNotice("Couldn’t create the export. Refresh the page and try again.");
    } finally {
      setExporting(false);
    }
  }

  async function restore(entry: HistoryEntry) {
    if (restoring || entry.isCurrent) return;
    setRestoring(entry.id);
    setHistoryError(null);
    try {
      await restoreBuildRevision(buildId, entry.id);
      setConfirmRestore(null);
      await loadHistory();
      router.refresh();
    } catch {
      setHistoryError("Couldn’t restore that version. The current build was left unchanged.");
    } finally {
      setRestoring(null);
    }
  }

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "import", label: "Import", icon: FileUp },
    { id: "export", label: "Export", icon: FileDown },
    { id: "history", label: "History", icon: History },
  ];

  return (
    <>
      <button type="button" onClick={() => open("import")} className={buttonClassName}>
        <FileUp className="h-4 w-4" aria-hidden="true" />
        Import
      </button>
      <button type="button" onClick={() => open("export")} className={buttonClassName}>
        <FileDown className="h-4 w-4" aria-hidden="true" />
        Export
      </button>
      <button type="button" onClick={() => open("history")} className={buttonClassName}>
        <History className="h-4 w-4" aria-hidden="true" />
        History
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="build-data-title"
        className="fixed inset-0 m-auto max-h-[88vh] w-[calc(100%_-_2rem)] max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/45"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
          if (outside) event.currentTarget.close();
        }}
      >
        <div className="flex max-h-[88vh] flex-col">
          <header className="border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/70 px-6 pt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-700">Build tools</p>
                <h2 id="build-data-title" className="mt-1 text-xl font-semibold tracking-tight text-gray-950">Import, export & history</h2>
                <p className="mt-1 text-sm text-gray-500">Move your build around safely or roll it back when human decision-making does what it does.</p>
              </div>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                aria-label="Close build tools"
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-green-700"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 flex gap-1" role="tablist" aria-label="Build data tools">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => chooseTab(id)}
                  className={`relative flex items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-medium transition ${
                    tab === id ? "bg-white text-green-900 shadow-[0_-1px_0_0_#e5e7eb,1px_0_0_0_#e5e7eb,-1px_0_0_0_#e5e7eb]" : "text-gray-500 hover:bg-white/60 hover:text-gray-800"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                  {tab === id && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-green-700" />}
                </button>
              ))}
            </div>
          </header>

          <div className="overflow-y-auto px-6 py-6">
            {tab === "import" && (
              <div className="space-y-5">
                <section>
                  <h3 className="text-base font-semibold text-gray-950">Import a TrailPicker build</h3>
                  <p className="mt-1 text-sm leading-6 text-gray-500">Drop in a JSON export. You’ll see what’s inside before anything is changed.</p>
                </section>

                <input
                  ref={fileInput}
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) void readImportFile(file);
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInput.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files?.[0];
                    if (file) void readImportFile(file);
                  }}
                  className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/70 px-6 py-9 text-center transition hover:border-green-500 hover:bg-green-50/40 focus-visible:outline-2 focus-visible:outline-green-700"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-800 shadow-sm ring-1 ring-gray-200 transition group-hover:-translate-y-0.5">
                    <UploadCloud className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="mt-4 text-sm font-semibold text-gray-900">Choose a JSON file or drop it here</span>
                  <span className="mt-1 text-xs text-gray-500">TrailPicker export, up to 2 MB</span>
                </button>

                {selectedImport && (
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/70 px-4 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-800 ring-1 ring-gray-200">
                        <FileJson2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{selectedImport.fileName}</p>
                        <p className="text-xs text-gray-500">{bytes(selectedImport.size)} · {selectedImport.preview.version ? `export v${selectedImport.preview.version}` : "legacy export"}</p>
                      </div>
                      <button type="button" onClick={() => setSelectedImport(null)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Remove import file">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-3">
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Build</p>
                        <p className="mt-1 truncate text-sm font-semibold text-gray-800">{selectedImport.preview.name}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Gear</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">{selectedImport.preview.itemCount} item{selectedImport.preview.itemCount === 1 ? "" : "s"}</p>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Itinerary</p>
                        <p className="mt-1 text-sm font-semibold text-gray-800">{selectedImport.preview.fullBuild ? `${selectedImport.preview.dayCount} day${selectedImport.preview.dayCount === 1 ? "" : "s"}` : "Gear-only export"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedImport && (
                  <section>
                    <p className="text-sm font-semibold text-gray-900">How should it be imported?</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setImportMode("merge")}
                        className={`rounded-2xl border p-4 text-left transition ${importMode === "merge" ? "border-green-700 bg-green-50 ring-1 ring-green-700/10" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm"><PackageOpen className="h-5 w-5" /></span>
                          {importMode === "merge" && <CheckCircle2 className="h-5 w-5 text-green-700" />}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-gray-900">Add gear to this build</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">Keeps your current trip and adds imported gear. Matching catalog gear increases quantity.</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setImportMode("replace")}
                        className={`rounded-2xl border p-4 text-left transition ${importMode === "replace" ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500/10" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm"><RotateCcw className="h-5 w-5" /></span>
                          {importMode === "replace" && <CheckCircle2 className="h-5 w-5 text-amber-600" />}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-gray-900">Replace current build</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">Replaces gear and trip data with the file. A history snapshot is kept after the import.</p>
                      </button>
                    </div>
                  </section>
                )}

                {importError && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{importError}</p>}
                {importNotice && <p role="status" className="flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{importNotice}</p>}

                <div className="flex justify-end border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={runImport}
                    disabled={!selectedImport || importing}
                    className="inline-flex min-w-32 items-center justify-center gap-2 rounded-xl bg-green-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
                    {importing ? "Importing…" : importMode === "replace" ? "Replace build" : "Import gear"}
                  </button>
                </div>
              </div>
            )}

            {tab === "export" && (
              <div className="space-y-5">
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-green-950 to-green-800 p-6 text-white shadow-sm">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-200">Portable backup</p>
                      <h3 className="mt-2 text-xl font-semibold">{buildName}</h3>
                      <p className="mt-2 max-w-lg text-sm leading-6 text-green-50/80">One JSON file with the build’s gear, trip details, route, logistics, and day-by-day itinerary.</p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"><Download className="h-6 w-6" /></span>
                  </div>
                  <button
                    type="button"
                    onClick={runExport}
                    disabled={exporting}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-green-950 shadow-sm transition hover:bg-green-50 disabled:opacity-60"
                  >
                    {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                    {exporting ? "Preparing…" : "Download JSON export"}
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <Backpack className="h-5 w-5 text-green-700" />
                    <p className="mt-3 text-sm font-semibold text-gray-900">Gear & quantities</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Catalog and custom items, weight snapshots, prices, worn and consumable flags.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <MapPinned className="h-5 w-5 text-green-700" />
                    <p className="mt-3 text-sm font-semibold text-gray-900">Trip & route</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">Dates, destination, party size, route waypoints, and logistics.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-4">
                    <History className="h-5 w-5 text-green-700" />
                    <p className="mt-3 text-sm font-semibold text-gray-900">Portable, not public</p>
                    <p className="mt-1 text-xs leading-5 text-gray-500">The file contains build data, not account credentials or ownership permissions.</p>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-500">
                  Created {createdAt.toLocaleString()} · Last build update {updatedAt.toLocaleString()}
                </div>

                {exportNotice && <p role="status" className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">{exportNotice}</p>}
              </div>
            )}

            {tab === "history" && (
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-950">Version history</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-500">TrailPicker saves snapshots after build changes. Restore an older version without deleting the newer history.</p>
                  </div>
                  <button type="button" onClick={() => void loadHistory()} disabled={historyLoading} className="rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                    Refresh
                  </button>
                </div>

                {historyLoading && history.length === 0 && (
                  <div className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 py-12 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Loading history…</div>
                )}
                {historyError && <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{historyError}</p>}

                {!historyLoading && !historyError && history.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-10 text-center">
                    <History className="mx-auto h-7 w-7 text-gray-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-800">No saved versions yet</p>
                    <p className="mt-1 text-xs text-gray-500">Your first snapshot will appear here automatically.</p>
                  </div>
                )}

                <div className="space-y-3">
                  {history.map((entry) => {
                    const Icon = historyIcon(entry.action);
                    const confirming = confirmRestore === entry.id;
                    return (
                      <div key={entry.id} className={`rounded-2xl border p-4 transition ${entry.isCurrent ? "border-green-200 bg-green-50/45" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                        <div className="flex items-start gap-3">
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${entry.isCurrent ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">{entry.summary}</p>
                              {entry.isCurrent && <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">Current</span>}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{new Date(entry.createdAt).toLocaleString()} · {entry.itemCount} gear · {entry.dayCount} day{entry.dayCount === 1 ? "" : "s"}</p>
                          </div>
                          {!entry.isCurrent && !confirming && (
                            <button type="button" onClick={() => setConfirmRestore(entry.id)} className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900">
                              Restore
                            </button>
                          )}
                        </div>

                        {confirming && (
                          <div className="mt-4 flex flex-col gap-3 rounded-xl bg-amber-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-start gap-2 text-xs leading-5 text-amber-900">
                              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>Restore this snapshot? Your current version will remain in history so you can come back to it.</span>
                            </div>
                            <div className="flex shrink-0 gap-2">
                              <button type="button" onClick={() => setConfirmRestore(null)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white/70">Cancel</button>
                              <button type="button" onClick={() => void restore(entry)} disabled={Boolean(restoring)} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50">
                                {restoring === entry.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                                Restore version
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
