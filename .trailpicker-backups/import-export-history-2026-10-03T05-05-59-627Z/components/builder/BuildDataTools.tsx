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
} from "lucide-react";
import { getBuildExport, importBuildItems } from "@/app/build/actions";
import { getBuildHistory, restoreBuildRevision } from "@/lib/build-history-actions";

type Tool = "import" | "export" | "history";
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
    throw new Error("This doesn’t look like a TrailPicker export.");
  }
  if (parsed.format != null && parsed.format !== "trailpicker-build") {
    throw new Error("This file was not exported by TrailPicker.");
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

const toolTitle: Record<Tool, string> = {
  import: "Import build",
  export: "Export build",
  history: "History",
};

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

  const [tool, setTool] = useState<Tool>("import");
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
      setHistoryError("Couldn’t load history.");
    } finally {
      setHistoryLoading(false);
    }
  }

  function open(nextTool: Tool) {
    setTool(nextTool);
    setImportError(null);
    setImportNotice(null);
    setExportNotice(null);
    setHistoryError(null);
    setConfirmRestore(null);
    dialog.current?.showModal();
    if (nextTool === "history") void loadHistory();
  }

  async function readImportFile(file: File) {
    setImportError(null);
    setImportNotice(null);
    if (file.size > 2_000_000) {
      setSelectedImport(null);
      setImportError("File is too large. Maximum size is 2 MB.");
      return;
    }
    try {
      const text = await file.text();
      const preview = inspectImport(text);
      setSelectedImport({ fileName: file.name, size: file.size, text, preview });
    } catch (error) {
      setSelectedImport(null);
      setImportError(error instanceof Error ? error.message : "Couldn’t read that file.");
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
          ? `Imported ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`
          : `Added ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`,
      );
      setSelectedImport(null);
      if (fileInput.current) fileInput.current.value = "";
      setHistory([]);
      router.refresh();
    } catch (error) {
      setImportError(error instanceof Error ? error.message : "Import failed.");
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
      setExportNotice("Downloaded.");
    } catch {
      setExportNotice("Export failed. Try again.");
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
      setHistoryError("Couldn’t restore that version.");
    } finally {
      setRestoring(null);
    }
  }

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
        className="fixed inset-0 m-auto max-h-[88vh] w-[calc(100%_-_2rem)] max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/45"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
          if (outside) event.currentTarget.close();
        }}
      >
        <div className="flex max-h-[88vh] flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-5">
            <h2 id="build-data-title" className="text-lg font-semibold text-gray-950">{toolTitle[tool]}</h2>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="overflow-y-auto px-6 py-6">
            {tool === "import" && (
              <div className="space-y-5">
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
                  className="group flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-9 text-center transition hover:border-green-600 hover:bg-green-50/40"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-800 shadow-sm ring-1 ring-gray-200">
                    <UploadCloud className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-3 text-sm font-semibold text-gray-900">Choose a JSON file</span>
                  <span className="mt-1 text-xs text-gray-500">or drop it here</span>
                </button>

                {selectedImport && (
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-800 ring-1 ring-gray-200">
                        <FileJson2 className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-gray-900">{selectedImport.fileName}</p>
                        <p className="text-xs text-gray-500">{bytes(selectedImport.size)} · {selectedImport.preview.version ? `v${selectedImport.preview.version}` : "legacy"}</p>
                      </div>
                      <button type="button" onClick={() => setSelectedImport(null)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="Remove file">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-3 p-4 sm:grid-cols-3">
                      <div>
                        <p className="text-xs text-gray-500">Build</p>
                        <p className="mt-1 truncate text-sm font-medium text-gray-900">{selectedImport.preview.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gear</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedImport.preview.itemCount} item{selectedImport.preview.itemCount === 1 ? "" : "s"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Trip</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">{selectedImport.preview.fullBuild ? `${selectedImport.preview.dayCount} day${selectedImport.preview.dayCount === 1 ? "" : "s"}` : "Gear only"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedImport && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setImportMode("merge")}
                      className={`rounded-xl border p-4 text-left transition ${importMode === "merge" ? "border-green-700 bg-green-50 ring-1 ring-green-700/10" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <PackageOpen className="h-5 w-5 text-green-800" />
                        {importMode === "merge" && <CheckCircle2 className="h-5 w-5 text-green-700" />}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-gray-900">Add gear</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">Keep this build and add the imported gear.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setImportMode("replace")}
                      className={`rounded-xl border p-4 text-left transition ${importMode === "replace" ? "border-amber-500 bg-amber-50 ring-1 ring-amber-500/10" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <RotateCcw className="h-5 w-5 text-amber-700" />
                        {importMode === "replace" && <CheckCircle2 className="h-5 w-5 text-amber-600" />}
                      </div>
                      <p className="mt-3 text-sm font-semibold text-gray-900">Replace build</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">Replace the current gear and trip data.</p>
                    </button>
                  </div>
                )}

                {importError && <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{importError}</p>}
                {importNotice && <p role="status" className="flex items-start gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{importNotice}</p>}

                <div className="flex justify-end border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={runImport}
                    disabled={!selectedImport || importing}
                    className="inline-flex min-w-28 items-center justify-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileUp className="h-4 w-4" />}
                    {importing ? "Importing…" : importMode === "replace" ? "Replace" : "Import"}
                  </button>
                </div>
              </div>
            )}

            {tool === "export" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800">
                      <Download className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-950">{buildName}</p>
                      <p className="mt-1 text-sm text-gray-500">Gear, trip details, route, logistics, and itinerary.</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runExport}
                    disabled={exporting}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:opacity-60"
                  >
                    {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                    {exporting ? "Preparing…" : "Download JSON"}
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  Created {createdAt.toLocaleString()} · Updated {updatedAt.toLocaleString()}
                </p>

                {exportNotice && (
                  <p role="status" className={`rounded-lg px-4 py-3 text-sm ${exportNotice === "Downloaded." ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                    {exportNotice}
                  </p>
                )}
              </div>
            )}

            {tool === "history" && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button type="button" onClick={() => void loadHistory()} disabled={historyLoading} className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50">
                    Refresh
                  </button>
                </div>

                {historyLoading && history.length === 0 && (
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-12 text-sm text-gray-500"><Loader2 className="h-4 w-4 animate-spin" />Loading…</div>
                )}
                {historyError && <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{historyError}</p>}

                {!historyLoading && !historyError && history.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center">
                    <History className="mx-auto h-7 w-7 text-gray-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-800">No history yet</p>
                  </div>
                )}

                <div className="space-y-2">
                  {history.map((entry) => {
                    const Icon = historyIcon(entry.action);
                    const confirming = confirmRestore === entry.id;
                    return (
                      <div key={entry.id} className={`rounded-xl border p-4 ${entry.isCurrent ? "border-green-200 bg-green-50/50" : "border-gray-200 bg-white"}`}>
                        <div className="flex items-start gap-3">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${entry.isCurrent ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                            <Icon className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">{entry.summary}</p>
                              {entry.isCurrent && <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">Current</span>}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{new Date(entry.createdAt).toLocaleString()} · {entry.itemCount} gear · {entry.dayCount} day{entry.dayCount === 1 ? "" : "s"}</p>
                          </div>
                          {!entry.isCurrent && !confirming && (
                            <button type="button" onClick={() => setConfirmRestore(entry.id)} className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                              Restore
                            </button>
                          )}
                        </div>

                        {confirming && (
                          <div className="mt-4 flex flex-col gap-3 rounded-lg bg-amber-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs leading-5 text-amber-900">Restore this version? Your current version will stay in history.</p>
                            <div className="flex shrink-0 gap-2">
                              <button type="button" onClick={() => setConfirmRestore(null)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white/70">Cancel</button>
                              <button type="button" onClick={() => void restore(entry)} disabled={Boolean(restoring)} className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50">
                                {restoring === entry.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                                Restore
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
