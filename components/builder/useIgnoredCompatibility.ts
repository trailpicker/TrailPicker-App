"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { CompatibilityIssue } from "@/lib/compatibility";

const EVENT = "trailpicker:compatibility-ignored";
const storageKey = (buildId: string) => `trailpicker:compatibility-ignored:v1:${buildId}`;

/** A changed issue, item or trip context must be acknowledged again. */
export function issueFingerprint(issue: CompatibilityIssue, context: string) {
  return JSON.stringify([context, issue.id, issue.severity, issue.kind, issue.message, issue.basis, issue.action, issue.itemIds]);
}

export function useIgnoredCompatibility(buildId: string | undefined, issues: readonly CompatibilityIssue[], context: string) {
  const key = buildId ? storageKey(buildId) : null;
  const fingerprints = useMemo(() => new Map(issues.map(issue => [issue.id, issueFingerprint(issue, context)])), [issues, context]);

  const subscribe = useCallback((onChange: () => void) => {
    if (!key) return () => {};
    const onStorage = (event: StorageEvent) => { if (event.key === key) onChange(); };
    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT, onChange);
    };
  }, [key]);

  const getSnapshot = useCallback(() => {
    try { return key ? window.localStorage.getItem(key) ?? "[]" : "[]"; }
    catch { return "[]"; }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const ignored = useMemo(() => {
    let saved: unknown;
    try { saved = JSON.parse(raw); } catch { saved = []; }
    const current = new Set(fingerprints.values());
    return new Set(Array.isArray(saved) ? saved.filter((value): value is string => typeof value === "string" && current.has(value)) : []);
  }, [raw, fingerprints]);

  const toggle = (issue: CompatibilityIssue) => {
    if (!key) return;
    const fingerprint = fingerprints.get(issue.id);
    if (!fingerprint) return;
    // Read the latest storage state to avoid overwriting another mounted panel.
    let saved: unknown;
    try { saved = JSON.parse(window.localStorage.getItem(key) ?? "[]"); } catch { saved = []; }
    const current = new Set(fingerprints.values());
    const next = new Set<string>(Array.isArray(saved) ? saved.filter((v): v is string => typeof v === "string" && current.has(v)) : []);
    if (next.has(fingerprint)) next.delete(fingerprint);
    else next.add(fingerprint);
    try {
      window.localStorage.setItem(key, JSON.stringify([...next]));
      window.dispatchEvent(new Event(EVENT));
    } catch { /* Storage may be blocked; don't claim a dismissal was saved. */ }
  };

  return { ignored, toggle, fingerprints, canIgnore: Boolean(key), ready: true };
}
