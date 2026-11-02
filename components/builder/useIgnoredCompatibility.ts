"use client";

import { useEffect, useMemo, useState } from "react";
import type { CompatibilityIssue } from "@/lib/compatibility";

const EVENT = "trailpicker:compatibility-ignored";
const storageKey = (buildId: string) => `trailpicker:compatibility-ignored:v1:${buildId}`;

/** A changed issue, item or trip context must be acknowledged again. */
export function issueFingerprint(issue: CompatibilityIssue, context: string) {
  return JSON.stringify([context, issue.id, issue.severity, issue.kind, issue.message, issue.basis, issue.action, issue.itemIds]);
}

export function useIgnoredCompatibility(buildId: string | undefined, issues: readonly CompatibilityIssue[], context: string) {
  const key = buildId ? storageKey(buildId) : null;
  const [saved, setSaved] = useState<string[]>([]);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const fingerprints = useMemo(() => new Map(issues.map(issue => [issue.id, issueFingerprint(issue, context)])), [issues, context]);

  useEffect(() => {
    if (!key) { setSaved([]); setLoadedKey(null); return; }
    const read = () => {
      try {
        const parsed: unknown = JSON.parse(localStorage.getItem(key) || "[]");
        setSaved(Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : []);
      } catch { setSaved([]); }
      setLoadedKey(key);
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener(EVENT, read);
    return () => { window.removeEventListener("storage", read); window.removeEventListener(EVENT, read); };
  }, [key]);

  const ignored = useMemo(() => {
    const current = new Set(fingerprints.values());
    return new Set(loadedKey === key ? saved.filter(value => current.has(value)) : []);
  }, [saved, fingerprints, loadedKey, key]);

  const toggle = (issue: CompatibilityIssue) => {
    if (!key) return;
    const fingerprint = fingerprints.get(issue.id);
    if (!fingerprint) return;
    const next = new Set(ignored);
    if (next.has(fingerprint)) next.delete(fingerprint);
    else next.add(fingerprint);
    try {
      localStorage.setItem(key, JSON.stringify([...next]));
      setSaved([...next]);
      window.dispatchEvent(new Event(EVENT));
    } catch { /* Storage may be blocked; don't claim a dismissal was saved. */ }
  };

  return { ignored, toggle, fingerprints, canIgnore: Boolean(key), ready: !key || loadedKey === key };
}
