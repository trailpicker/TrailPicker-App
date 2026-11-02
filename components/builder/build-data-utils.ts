export type ImportPreview = {
  name: string;
  itemCount: number;
  dayCount: number;
  version: number | null;
  fullBuild: boolean;
};

export type SelectedImport = {
  fileName: string;
  size: number;
  text: string;
  preview: ImportPreview;
};

export type HistoryEntry = {
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

export function inspectImport(text: string): ImportPreview {
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
    fullBuild: version === 2 || version === 3 || Array.isArray(parsed.days) || "routeWaypoints" in parsed || "tripLogistics" in parsed,
  };
}

export function bytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function safeFileName(name: string) {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${base || "trailpicker-build"}.json`;
}


export function relativeTime(value: string) {
  const date = new Date(value);
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 45) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function dayLabel(value: string) {
  const date = new Date(value);
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diff = Math.round((start - target) / 86_400_000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: date.getFullYear() === now.getFullYear() ? undefined : "numeric" });
}

export function historyGroups(entries: HistoryEntry[]) {
  const groups: { label: string; entries: HistoryEntry[] }[] = [];
  for (const entry of entries) {
    const label = dayLabel(entry.createdAt);
    const last = groups[groups.length - 1];
    if (last?.label === label) last.entries.push(entry);
    else groups.push({ label, entries: [entry] });
  }
  return groups;
}

