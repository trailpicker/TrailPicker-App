"use client";

export type SaveSnapshot = { state: "saved" | "waiting" | "saving" | "error"; message: string };
type Entry = { pending: number; dirty: boolean; error: string; version: number; message: string };
type BuildState = { entries: Map<string, Entry>; snapshot: SaveSnapshot };
const saved: SaveSnapshot = { state: "saved", message: "Changes saved" };
const builds = new Map<string, BuildState>();
const listeners = new Set<() => void>();
function build(id: string) {
  let value = builds.get(id);
  if (!value) { value = { entries: new Map(), snapshot: saved }; builds.set(id, value); }
  return value;
}
function entry(id: string, key: string) {
  const value = build(id);
  let resource = value.entries.get(key);
  if (!resource) { resource = { pending: 0, dirty: false, error: "", version: 0, message: "" }; value.entries.set(key, resource); }
  return resource;
}
function publish(id: string) {
  const value = build(id), entries = [...value.entries.values()];
  const failed = entries.find(item => item.error), dirty = entries.find(item => item.dirty);
  const next: SaveSnapshot = failed ? { state: "error", message: failed.error }
    : entries.some(item => item.pending > 0) ? { state: "saving", message: "Saving changes…" }
    : dirty ? { state: "waiting", message: dirty.message || "Changes waiting to save…" } : saved;
  if (next.state === value.snapshot.state && next.message === value.snapshot.message) return;
  value.snapshot = next;
  listeners.forEach(listener => listener());
}
export function subscribeSaveStatus(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; }
export function getSaveStatus(id: string) { return builds.get(id)?.snapshot ?? saved; }
export function serverSaveStatus() { return saved; }
export function markBuildDirty(id: string, key: string, message = "") {
  const item = entry(id, key); item.dirty = true; item.message = message; publish(id);
}
export function clearBuildDirty(id: string, key: string) {
  const item = entry(id, key); item.dirty = false; item.error = ""; publish(id);
}
export function failBuildSave(id: string, key: string, message: string) {
  const item = entry(id, key); item.error = message; publish(id);
}
export async function trackBuildSave<T>(id: string, key: string, work: () => Promise<T>): Promise<T> {
  const item = entry(id, key); ++item.version;
  item.pending++; item.dirty = false; item.error = ""; publish(id);
  try {
    const result = await work();
    return result;
  } catch (error) {
    // A Next redirect is successful navigation after a committed mutation.
    const redirect = error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT;");
    if (!redirect) item.error = error instanceof Error ? error.message : "Could not save changes. Try again.";
    throw error;
  } finally { item.pending--; publish(id); }
}
