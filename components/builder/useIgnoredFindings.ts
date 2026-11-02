"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import type { Finding } from "@/lib/pack-intelligence";
import { findingAcknowledgementId, findingFingerprint, isFindingIgnored, parseIgnoredFindings } from "@/lib/finding-dismissals";

const CHANGE_EVENT = "trailpicker:ignored-findings-changed";
const storageKey = (buildId: string) => `trailpicker:ignored-findings:v1:${buildId}`;

/** Private-to-this-browser acknowledgement. Public/read-only builds cannot be dismissed. */
export function useIgnoredFindings(buildId: string, findings: readonly Finding[], canIgnore: boolean) {
  const key = canIgnore ? storageKey(buildId) : null;
  const [storageError, setStorageError] = useState(false);
  const subscribe = useCallback((onChange: () => void) => {
    if (!key) return () => {};
    const fromOtherTab = (event: StorageEvent) => { if (event.key === key) onChange(); };
    const fromThisTab = () => onChange();
    window.addEventListener("storage", fromOtherTab);
    window.addEventListener(CHANGE_EVENT, fromThisTab);
    return () => {
      window.removeEventListener("storage", fromOtherTab);
      window.removeEventListener(CHANGE_EVENT, fromThisTab);
    };
  }, [key]);
  const getSnapshot = useCallback(() => {
    try { return key ? window.localStorage.getItem(key) ?? "{}" : "{}"; }
    catch { return "{}"; }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => "{}");
  const records = useMemo(() => parseIgnoredFindings(raw), [raw]);
  const ignoredIds = useMemo(() => new Set(findings.filter(f => isFindingIgnored(f, records)).map(f => f.id)), [findings, records]);

  const toggleIgnore = useCallback((finding: Finding) => {
    if (!key) return;
    try {
      // Read at interaction time so two mounted panels cannot overwrite each other.
      const latest = parseIgnoredFindings(window.localStorage.getItem(key));
      const fingerprint = findingFingerprint(finding);
      const acknowledgementId = findingAcknowledgementId(finding);
      if (latest[acknowledgementId] === fingerprint) delete latest[acknowledgementId];
      else latest[acknowledgementId] = fingerprint;
      window.localStorage.setItem(key, JSON.stringify(latest));
      setStorageError(false);
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      setStorageError(true); // Never claim a warning was ignored when storage failed.
    }
  }, [key]);
  return { ignoredIds, toggleIgnore, storageError };
}
