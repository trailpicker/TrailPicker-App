"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  Backpack,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Table2,
  Printer,
  DatabaseBackup,
  FileDown,
  FileJson2,
  FileUp,
  ChevronDown,
  Route as RouteIcon,
  History,
  Loader2,
  MapPinned,
  PackageOpen,
  RotateCcw,
  UploadCloud,
  X,
} from "lucide-react";
import { getBuildExport, importBuildItems } from "@/lib/tracked-build-actions";
import { importGpx, GPX_MAX_BYTES, type GpxImport } from "@/lib/gpx-route";
import { GPX_TOOLBAR_PING, GPX_TOOLBAR_READY, GPX_TOOLBAR_IMPORT, GPX_TOOLBAR_EXPORT, type GpxToolbarImport, type GpxToolbarExport } from "@/lib/gpx-toolbar-events";
import { getBuildHistory, restoreBuildRevision, undoLastBuildChange } from "@/lib/tracked-build-actions";
import { getTripExportData } from "@/lib/trip-export-actions";
import {
  exportLogisticsCsv, exportCampsitesCsv, exportPackCsv, printableTripHtml,
  type TripExport, type TripDocumentSection, type TripDocumentOptions,
} from "@/lib/trip-resources-export";
import { TRIP_EXPORT_REQUEST, type TripExportRequest } from "@/lib/trip-export-events";

type Tool = "import" | "export" | "history" | "gpx-import" | "gpx-export" | "trip-document" | "csv-export";
type CsvKind = "logistics" | "campsites" | "packing";
type ImportMode = "merge" | "replace";
import { inspectImport, bytes, safeFileName, relativeTime, historyGroups, type SelectedImport, type HistoryEntry } from "./build-data-utils";

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
  "gpx-import": "Import GPX route",
  "gpx-export": "Export GPX route",
  "trip-document": "Export trip document",
  "csv-export": "Export spreadsheet",
};

export default function BuildDataTools({
  buildId,
  buildName,
  createdAt,
  updatedAt,
  buttonClassName,
  activeTab, gpxDays,
}: {
  buildId: string;
  buildName: string;
  createdAt: Date;
  updatedAt: Date;
  buttonClassName: string;
  activeTab: "gear" | "trip";
  gpxDays: { id: string; date: Date | string }[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const gpxFileInput = useRef<HTMLInputElement>(null);
  const menuRoot = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [tool, setTool] = useState<Tool>("import");
  const [menu, setMenu] = useState<"import" | "export" | null>(null);
  const [gpxDayId, setGpxDayId] = useState("");
  const [gpxPreview, setGpxPreview] = useState<GpxImport | null>(null);
  const [gpxFileName, setGpxFileName] = useState("");
  const [gpxError, setGpxError] = useState<string | null>(null);
  const [selectedImport, setSelectedImport] = useState<SelectedImport | null>(null);
  const [importMode, setImportMode] = useState<ImportMode>("merge");
  const [importError, setImportError] = useState<string | null>(null);
  const [importNotice, setImportNotice] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [documentSections, setDocumentSections] = useState<Record<TripDocumentSection, boolean>>({
    itinerary: true, resources: true, logistics: true, packing: true,
  });
  const [includePrivate, setIncludePrivate] = useState(false);
  const [csvKind, setCsvKind] = useState<CsvKind>("logistics");
  const [gpxStopCount, setGpxStopCount] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historyNotice, setHistoryNotice] = useState<string | null>(null);
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
    setMenu(null);
    setGpxError(null);
    setImportError(null);
    setImportNotice(null);
    setExportNotice(null);
    setIncludePrivate(false);
    setHistoryError(null);
    setHistoryNotice(null);
    setConfirmRestore(null);
    dialog.current?.showModal();
    if (nextTool === "history") void loadHistory();
    if (nextTool === "gpx-export") void loadGpxStatus();
  }

  // Import/export actions in the global toolbar also work from Gear: opening
  // GPX automatically navigates to Trip Planner, where the live draft lives.
  const pendingGpxKey = `trailpicker:gpx-pending:${buildId}`;

  function startGpxAction(action: "import" | "export") {
    setMenu(null);
    if (activeTab !== "trip") {
      sessionStorage.setItem(pendingGpxKey, action);
      router.push(`/build/${encodeURIComponent(buildId)}?tab=trip`);
      return;
    }
    if (action === "import") {
      setGpxPreview(null);
      setGpxFileName("");
      setGpxDayId("");
      open("gpx-import");
    } else {
      open("gpx-export");
    }
  }

  function liveTripExport(): TripExport | null {
    let current: TripExport | null = null;
    const detail: TripExportRequest = { buildId, respond: data => { current = data; } };
    window.dispatchEvent(new CustomEvent(TRIP_EXPORT_REQUEST, { detail }));
    return current;
  }

  async function tripExport(): Promise<TripExport> {
    // The open Trip Planner supplies current route and booking drafts. On Gear,
    // use a full saved server projection with up-to-date catalog gear specs.
    return liveTripExport() ?? getTripExportData(buildId);
  }

  async function loadGpxStatus() {
    setGpxStopCount(null);
    try {
      const data = await tripExport();
      setGpxStopCount(data.points.length);
    } catch {
      setGpxError("Could not load route information. Please try again.");
    }
  }

  function requestGpxExport() {
    let replied = false;
    const detail: GpxToolbarExport = {
      buildId,
      respond: (exported, reason) => {
        replied = true;
        if (exported) setExportNotice("Downloaded GPX route.");
        else setGpxError(reason || "GPX export failed.");
      },
    };
    window.dispatchEvent(new CustomEvent(GPX_TOOLBAR_EXPORT, { detail }));
    if (!replied) setGpxError("Open Trip Planner to export the current route.");
  }

  useEffect(() => {
    if (!menu) return;
    const outside = (event: PointerEvent) => {
      if (!menuRoot.current?.contains(event.target as Node)) setMenu(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [menu]);

  useEffect(() => {
    if (activeTab !== "trip") return;
    const ready = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== buildId) return;
      const action = sessionStorage.getItem(pendingGpxKey);
      if (action !== "import" && action !== "export") return;
      sessionStorage.removeItem(pendingGpxKey);
      if (action === "import") open("gpx-import");
      else open("gpx-export");
    };
    window.addEventListener(GPX_TOOLBAR_READY, ready);
    // Handshake also handles a route workspace which mounted before this toolbar.
    window.dispatchEvent(new CustomEvent(GPX_TOOLBAR_PING, { detail: buildId }));
    return () => window.removeEventListener(GPX_TOOLBAR_READY, ready);
  }, [activeTab, buildId, pendingGpxKey]);

  async function readGpxFile(file: File) {
    setGpxError(null);
    setGpxPreview(null);
    setGpxFileName("");
    if (file.size > GPX_MAX_BYTES) {
      setGpxError("GPX file must be 4 MB or smaller.");
      return;
    }
    try {
      const result = importGpx(await file.text(), gpxDayId || null);
      setGpxFileName(file.name);
      setGpxPreview(result);
    } catch (error) {
      setGpxError(error instanceof Error ? error.message : "Could not read the GPX file.");
    }
  }

  function chooseGpxDay(nextId: string) {
    setGpxDayId(nextId);
    setGpxPreview(current => current ? {
      ...current,
      points: current.points.map(point => ({ ...point, dayId: nextId || undefined })),
    } : null);
  }

  function applyGpxImport() {
    if (!gpxPreview || importing) return;
    if (!window.confirm(`Replace the current working route with ${gpxFileName}? Unsaved route edits will be discarded. The new route will not be stored until you click Save route.`)) return;
    let replied = false;
    const detail: GpxToolbarImport = {
      buildId,
      points: gpxPreview.points,
      respond: (accepted, reason) => {
        replied = true;
        if (!accepted) {
          setGpxError(reason || "Could not update the working route.");
          return;
        }
        setGpxPreview(null);
        setGpxFileName("");
        if (gpxFileInput.current) gpxFileInput.current.value = "";
        dialog.current?.close();
      },
    };
    window.dispatchEvent(new CustomEvent(GPX_TOOLBAR_IMPORT, { detail }));
    if (!replied) setGpxError("Open Trip Planner to import GPX into the route editor.");
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
        (result.mode === "replace"
          ? `Imported ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`
          : `Added ${result.itemCount} item${result.itemCount === 1 ? "" : "s"}.`) +
          (result.unassignedStops ? ` ${result.unassignedStops} route stop${result.unassignedStops === 1 ? " was" : "s were"} left unassigned because the original day IDs were unavailable.` : ""),
      );
      setSelectedImport(null);
      if (fileInput.current) fileInput.current.value = "";
      setHistory([]);
      if (result.mode === "replace") window.dispatchEvent(new CustomEvent("trailpicker:build-replaced", { detail: buildId }));
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

  // Open synchronously in the click handler to avoid browser popup blockers.
  // The read-only server action (when needed) can then fill the new document.
  function runTripDocument() {
    if (exporting || !Object.values(documentSections).some(Boolean)) return;
    const tab = window.open("", "_blank");
    if (!tab) {
      setExportNotice("Allow pop-ups to open the printable trip document.");
      return;
    }
    tab.opener = null;
    tab.document.write("<!doctype html><title>Preparing trip document…</title><p>Preparing trip document…</p>");
    setExportNotice(null);
    setExporting(true);
    void (async () => {
      try {
        const data = await tripExport();
        const html = printableTripHtml(data, includePrivate, documentSections as TripDocumentOptions);
        tab.document.open();
        tab.document.write(html);
        tab.document.close();
        tab.focus();
        setExportNotice("Trip document opened. Use Print to save as PDF.");
      } catch {
        tab.close();
        setExportNotice("Could not prepare this trip document. Try again.");
      } finally {
        setExporting(false);
      }
    })();
  }

  async function runCsvExport() {
    if (exporting) return;
    setExportNotice(null);
    setExporting(true);
    try {
      const data = await tripExport();
      const text = csvKind === "logistics" ? exportLogisticsCsv(data, includePrivate)
        : csvKind === "campsites" ? exportCampsitesCsv(data, includePrivate)
        : exportPackCsv(data);
      const name = buildName.replace(/[^a-zA-Z0-9_-]+/g, "-").slice(0, 50) || "trailpicker";
      const url = URL.createObjectURL(new Blob([text], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}-${csvKind}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 5000);
      setExportNotice("Downloaded CSV.");
    } catch {
      setExportNotice("Could not export the spreadsheet. Try again.");
    } finally {
      setExporting(false);
    }
  }

  async function restore(entry: HistoryEntry) {
    if (restoring || entry.isCurrent) return;
    setRestoring(entry.id);
    setHistoryError(null);
    try {
      const result = await restoreBuildRevision(buildId, entry.id);
      setConfirmRestore(null);
      setHistoryNotice(`Version restored.${result.unassignedStops ? ` ${result.unassignedStops} route stop${result.unassignedStops === 1 ? " is" : "s are"} now unassigned (older history without day IDs).` : ""}`);
      await loadHistory();
      window.dispatchEvent(new CustomEvent("trailpicker:build-replaced", { detail: buildId }));
      router.refresh();
    } catch {
      setHistoryError("Couldn’t restore that version.");
    } finally {
      setRestoring(null);
    }
  }

  async function undoLastChange() {
    if (restoring || history.length < 2) return;
    setRestoring("undo");
    setHistoryError(null);
    setHistoryNotice(null);
    try {
      const result = await undoLastBuildChange(buildId);
      setHistoryNotice(`Last change undone.${result.unassignedStops ? ` ${result.unassignedStops} route stop${result.unassignedStops === 1 ? " is" : "s are"} now unassigned.` : ""}`);
      await loadHistory();
      window.dispatchEvent(new CustomEvent("trailpicker:build-replaced", { detail: buildId }));
      router.refresh();
    } catch (error) {
      setHistoryError(error instanceof Error ? error.message : "Couldn’t undo the last change.");
    } finally {
      setRestoring(null);
    }
  }

  return (
    <>
      <div ref={menuRoot} className="contents">
        {(["import", "export"] as const).map(action => (
          <div key={action} className="relative">
            <button type="button" className={buttonClassName} aria-haspopup="menu" aria-expanded={menu === action}
              onClick={() => { setMenu(previous => previous === action ? null : action); }}>
              {action === "import" ? <FileUp className="h-4 w-4" aria-hidden="true" /> : <FileDown className="h-4 w-4" aria-hidden="true" />}
              {action === "import" ? "Import" : "Export"}
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" aria-hidden="true" />
            </button>
            {menu === action && (
              <div role="menu" aria-label={`${action === "import" ? "Import" : "Export"} options`}
                className="absolute right-0 z-40 mt-1 w-64 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl">
                <button type="button" role="menuitem"
                  onClick={() => { setMenu(null); if (action === "import") open("import"); else open("export"); }}
                  className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-50">
                  <DatabaseBackup className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                  <span className="min-w-0"><span className="block text-sm font-semibold text-gray-900">TrailPicker backup</span>
                    <span className="block text-xs text-gray-500">Build data (JSON)</span></span>
                </button>
                {action === "export" && (
                  <button type="button" role="menuitem" onClick={() => open("trip-document")}
                    className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-50">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                    <span><span className="block text-sm font-semibold text-gray-900">Trip document</span>
                      <span className="block text-xs text-gray-500">Print or save as PDF</span></span>
                  </button>
                )}
                <button type="button" role="menuitem" onClick={() => startGpxAction(action)}
                  className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-50">
                  <RouteIcon className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                  <span><span className="block text-sm font-semibold text-gray-900">GPX route</span>
                    <span className="block text-xs text-gray-500">{action === "import" ? "Load a GPS track" : "Navigation apps and GPS devices"}</span></span>
                </button>
                {action === "export" && (
                  <>
                    <div className="my-1 border-t border-gray-100" />
                    <button type="button" role="menuitem" onClick={() => open("csv-export")}
                      className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-gray-50">
                      <Table2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
                      <span><span className="block text-sm font-semibold text-gray-900">Spreadsheet (CSV)</span>
                        <span className="block text-xs text-gray-500">Logistics, campsites or packing</span></span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
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
            {tool === "gpx-import" && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Import a GPX track into the working route. Review the track before replacing the route; saving is a separate step.</p>
                <label className="block space-y-1.5 text-sm font-medium text-gray-700">
                  Assign imported track to a day
                  <select value={gpxDayId} onChange={event => chooseGpxDay(event.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">
                    <option value="">Unassigned</option>
                    {gpxDays.map((day, index) => (
                      <option key={day.id} value={day.id}>Day {index + 1} · {new Date(day.date).toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "UTC" })}</option>
                    ))}
                  </select>
                </label>
                <input ref={gpxFileInput} type="file" accept=".gpx,application/gpx+xml,application/xml,text/xml"
                  aria-label="Choose GPX track" onChange={event => { const file=event.target.files?.[0]; if(file) void readGpxFile(file); }} className="hidden" />
                <button type="button" onClick={() => gpxFileInput.current?.click()}
                  onDragOver={event=>event.preventDefault()}
                  onDrop={event=>{ event.preventDefault(); const file=event.dataTransfer.files?.[0]; if(file) void readGpxFile(file); }}
                  className="group flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center hover:border-green-600 hover:bg-green-50/40">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-green-800 ring-1 ring-gray-200"><UploadCloud className="h-5 w-5" /></span>
                  <span className="mt-3 text-sm font-semibold text-gray-900">{gpxFileName || "Choose a GPX file"}</span>
                  <span className="mt-1 text-xs text-gray-500">or drop it here · maximum 4 MB</span>
                </button>
                {gpxPreview && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-950">
                    <p className="font-semibold">{gpxFileName}</p>
                    <p className="mt-1 text-xs">{gpxPreview.segments} segment(s) · {gpxPreview.trackPoints.toLocaleString()} samples · {(gpxPreview.distanceM / 1000).toFixed(2)} km</p>
                    <p className="mt-1 text-xs">{gpxPreview.hasCompleteElevation ? "Elevation samples available" : "Elevation missing for some sections"}{gpxPreview.approximateSegments ? ` · ${gpxPreview.approximateSegments} approximate connection(s)` : ""}</p>
                  </div>
                )}
                {gpxError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{gpxError}</p>}
                <div className="flex justify-end border-t border-gray-100 pt-4">
                  <button type="button" onClick={applyGpxImport} disabled={!gpxPreview || importing}
                    className="rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900 disabled:opacity-40">
                    Replace working route
                  </button>
                </div>
              </div>
            )}

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

            {tool === "trip-document" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800"><FileText className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-950">{buildName}</p>
                      <p className="mt-1 text-sm text-gray-500">A readable trip plan for printing or saving as PDF.</p>
                    </div>
                  </div>
                  <fieldset className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                    <legend className="sr-only">Document sections</legend>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Include sections</p>
                    {([
                      ["itinerary", "Day-by-day itinerary"],
                      ["resources", "Waypoint resources & water sources"],
                      ["logistics", "Transportation & logistics"],
                      ["packing", "Packing checklist & food"],
                    ] as [TripDocumentSection, string][]).map(([key,label]) => (
                      <label key={key} className="flex items-center gap-3 text-sm text-gray-800">
                        <input type="checkbox" checked={documentSections[key]}
                          onChange={event => setDocumentSections(current => ({ ...current, [key]: event.target.checked }))}
                          className="h-4 w-4 accent-green-800" />
                        {label}
                      </label>
                    ))}
                  </fieldset>
                  {(documentSections.resources || documentSections.logistics) && (
                    <label className="mt-5 flex items-start gap-3 border-t border-gray-100 pt-4 text-sm text-gray-800">
                      <input type="checkbox" checked={includePrivate} onChange={event=>setIncludePrivate(event.target.checked)} className="mt-0.5 h-4 w-4 accent-green-800" />
                      <span>Include private reservation and emergency details<span className="block text-xs text-gray-500">Off by default. Share these documents carefully.</span></span>
                    </label>
                  )}
                  <button type="button" onClick={runTripDocument} disabled={exporting || !Object.values(documentSections).some(Boolean)}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900 disabled:opacity-40">
                    {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Printer className="h-4 w-4" />}
                    {exporting ? "Preparing…" : "Open trip document"}
                  </button>
                </div>
                <p className="text-xs leading-5 text-gray-500">Current route and campsite edits are included when Trip Planner is open. Save other edits first. A printout does not replace current park rules or navigation resources.</p>
                {exportNotice && <p role="status" className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">{exportNotice}</p>}
              </div>
            )}

            {tool === "csv-export" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800"><Table2 className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-950">{buildName}</p>
                      <p className="mt-1 text-sm text-gray-500">Choose the data you want as a spreadsheet.</p>
                    </div>
                  </div>
                  <fieldset className="mt-5 space-y-2 border-t border-gray-100 pt-4">
                    <legend className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Export data</legend>
                    {([
                      ["logistics", "Trip logistics", "Transportation, parking, permits and bookings"],
                      ["campsites", "Campsites", "Campsite stops, coordinates and booking status"],
                      ["packing", "Packing checklist", "Gear, weights, quantities and planned food"],
                    ] as [CsvKind,string,string][]).map(([key,label,description]) => (
                      <label key={key} className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 ${csvKind===key?"border-green-600 bg-green-50/50":"border-gray-200 hover:bg-gray-50"}`}>
                        <input type="radio" name="csv-kind" value={key} checked={csvKind===key} onChange={() => setCsvKind(key)} className="mt-1 h-4 w-4 accent-green-800" />
                        <span><span className="block text-sm font-semibold text-gray-900">{label}</span><span className="block text-xs text-gray-500">{description}</span></span>
                      </label>
                    ))}
                  </fieldset>
                  {csvKind !== "packing" && (
                    <label className="mt-5 flex items-start gap-3 text-sm text-gray-800">
                      <input type="checkbox" checked={includePrivate} onChange={event=>setIncludePrivate(event.target.checked)} className="mt-0.5 h-4 w-4 accent-green-800" />
                      <span>{csvKind === "campsites" ? "Include booking confirmation numbers" : "Include private reservation and emergency details"}<span className="block text-xs text-gray-500">Off by default.</span></span>
                    </label>
                  )}
                  <button type="button" onClick={() => void runCsvExport()} disabled={exporting}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900 disabled:opacity-40">
                    {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                    {exporting ? "Preparing…" : "Download CSV"}
                  </button>
                </div>
                <p className="text-xs text-gray-500">Saved data is used from Gear; current route and campsite drafts are available when Trip Planner is open.</p>
                {exportNotice && <p role="status" className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">{exportNotice}</p>}
              </div>
            )}

            {tool === "gpx-export" && (
              <div className="space-y-5">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-800"><RouteIcon className="h-5 w-5" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-950">{buildName}</p>
                      <p className="mt-1 text-sm text-gray-500">Export route geometry and named stops for compatible GPS apps.</p>
                    </div>
                  </div>
                  {gpxStopCount !== null && gpxStopCount < 2 && (
                    <p role="status" className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                      Nothing to export yet. Add at least two route stops in Route & itinerary, then try again.
                    </p>
                  )}
                  {gpxStopCount !== null && gpxStopCount >= 2 && (
                    <p className="mt-4 text-sm text-gray-600">{gpxStopCount} route stops available. Unmapped connections are marked as approximate, not verified trails.</p>
                  )}
                  <button type="button" onClick={requestGpxExport} disabled={gpxStopCount === null || gpxStopCount < 2}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900 disabled:opacity-40">
                    <FileDown className="h-4 w-4" />Download GPX
                  </button>
                </div>
                {gpxError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{gpxError}</p>}
                {exportNotice && <p role="status" className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">{exportNotice}</p>}
              </div>
            )}

            {tool === "history" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => void undoLastChange()}
                    disabled={historyLoading || history.length < 2 || Boolean(restoring)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {restoring === "undo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
                    Undo last change
                  </button>
                  <button
                    type="button"
                    onClick={() => void loadHistory()}
                    disabled={historyLoading}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
                  >
                    Refresh
                  </button>
                </div>

                {historyError && (
                  <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                    {historyError}
                  </p>
                )}
                {historyNotice && (
                  <p role="status" className="flex items-start gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {historyNotice}
                  </p>
                )}

                {historyLoading && history.length === 0 && (
                  <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-12 text-sm text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading…
                  </div>
                )}

                {!historyLoading && !historyError && history.length === 0 && (
                  <div className="rounded-xl border border-dashed border-gray-300 px-6 py-10 text-center">
                    <History className="mx-auto h-7 w-7 text-gray-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-800">No history yet</p>
                  </div>
                )}

                {history[0] && (
                  <section>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Current</p>
                    <div className="rounded-xl border border-green-200 bg-green-50/60 p-4">
                      <div className="flex items-start gap-3">
                        {(() => {
                          const Icon = historyIcon(history[0].action);
                          return (
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-800">
                              <Icon className="h-4 w-4" />
                            </span>
                          );
                        })()}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-950">{history[0].summary}</p>
                          <p className="mt-1 text-xs text-gray-500" title={new Date(history[0].createdAt).toLocaleString()}>
                            {relativeTime(history[0].createdAt)} · {history[0].itemCount} gear · {history[0].dayCount} day{history[0].dayCount === 1 ? "" : "s"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {historyGroups(history.slice(1)).map((group) => (
                  <section key={group.label}>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">{group.label}</p>
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                      {group.entries.map((entry, index) => {
                        const Icon = historyIcon(entry.action);
                        const confirming = confirmRestore === entry.id;
                        return (
                          <div key={entry.id} className={index === 0 ? "" : "border-t border-gray-100"}>
                            <div className="flex items-start gap-3 px-4 py-3.5">
                              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                                <Icon className="h-4 w-4" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">{entry.summary}</p>
                                <p className="mt-1 text-xs text-gray-500" title={new Date(entry.createdAt).toLocaleString()}>
                                  {new Date(entry.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} · {entry.itemCount} gear · {entry.dayCount} day{entry.dayCount === 1 ? "" : "s"}
                                </p>
                              </div>
                              {!confirming && (
                                <button
                                  type="button"
                                  onClick={() => { setConfirmRestore(entry.id); setHistoryNotice(null); }}
                                  disabled={Boolean(restoring)}
                                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-40"
                                >
                                  Restore
                                </button>
                              )}
                            </div>

                            {confirming && (
                              <div className="flex flex-col gap-3 border-t border-amber-100 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs font-medium text-amber-900">Restore this version?</p>
                                <div className="flex shrink-0 gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setConfirmRestore(null)}
                                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-white/70"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => void restore(entry)}
                                    disabled={Boolean(restoring)}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
                                  >
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
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}


