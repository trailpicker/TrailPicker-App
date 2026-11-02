"use client";

import { useEffect, useRef } from "react";
import { clearBuildDirty, failBuildSave, markBuildDirty } from "@/lib/build-save-status";

type Options = { buildId: string; resource: string; save: (data: FormData) => Promise<unknown>; enabled?: boolean; canAutosave?: (data: FormData) => boolean; onError?: (message: string) => void; onSaved?: () => void };
const signature = (data: FormData) => JSON.stringify([...data.entries()].map(([key, value]) => [key, typeof value === "string" ? value : value.name]));
export function useBuildAutosave(options: Options) {
  const formRef = useRef<HTMLFormElement>(null);
  const latest = useRef(options); latest.current = options;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef<string | null>(null);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const mounted = useRef(false);
  const skipStaleUnmountSave = useRef(false);
  // A full import/restore replaces this form's saved contents. Do not let an
  // old debounce or editor cleanup immediately overwrite the restored data.
  useEffect(() => {
    const onReplaced = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== latest.current.buildId) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      skipStaleUnmountSave.current = true;
      clearBuildDirty(latest.current.buildId, latest.current.resource);
    };
    window.addEventListener("trailpicker:build-replaced", onReplaced);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplaced);
  }, []);

  function saveNow(data: FormData): Promise<void> {
    if (timer.current) clearTimeout(timer.current);
    const snapshot = new FormData(); data.forEach((value, key) => snapshot.append(key, value));
    const key = signature(snapshot);
    const task = queue.current.catch(() => {}).then(async () => {
      if (key === lastSaved.current) {
        if (formRef.current && signature(new FormData(formRef.current)) !== key) changed();
        else clearBuildDirty(latest.current.buildId, latest.current.resource);
        return;
      }
      const current = latest.current;
      try {
        await current.save(snapshot);
        lastSaved.current = key;
        if (mounted.current) { current.onError?.(""); current.onSaved?.(); }
        const form = formRef.current;
        if (form && signature(new FormData(form)) !== key) changed();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not save. Try again.";
        failBuildSave(current.buildId, current.resource, message);
        if (mounted.current) current.onError?.(message);
        throw error;
      }
    });
    queue.current = task;
    return task;
  }
  function changed() {
    if (!formRef.current || latest.current.enabled === false) return;
    skipStaleUnmountSave.current = false;
    if (timer.current) clearTimeout(timer.current);
    const data = new FormData(formRef.current), current = latest.current;
    if (signature(data) === lastSaved.current) { clearBuildDirty(current.buildId, current.resource); return; }
    const allowed = current.canAutosave?.(data) !== false;
    markBuildDirty(current.buildId, current.resource, allowed ? "Changes waiting to save…" : "Date changes need Save Trip Details.");
    if (!allowed) return;
    timer.current = setTimeout(() => {
      const form = formRef.current;
      if (!form) return;
      if (!form.checkValidity()) {
        const message = "Complete the highlighted fields to save changes.";
        failBuildSave(current.buildId, current.resource, message); current.onError?.(message); return;
      }
      void saveNow(new FormData(form)).catch(() => {});
    }, 900);
  }
  useEffect(() => {
    const form = formRef.current;
    if (!form || options.enabled === false) return;
    mounted.current = true;
    lastSaved.current = signature(new FormData(form));
    // Native events plus hidden-value mutations cover date/destination pickers.
    const observer = new MutationObserver(changed);
    observer.observe(form, { subtree: true, attributes: true, attributeFilter: ["value", "checked"] });
    form.addEventListener("input", changed); form.addEventListener("change", changed);
    return () => {
      observer.disconnect(); form.removeEventListener("input", changed); form.removeEventListener("change", changed);
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
      const data = new FormData(form);
      if (!skipStaleUnmountSave.current && signature(data) !== lastSaved.current && form.checkValidity() && latest.current.canAutosave?.(data) !== false) void saveNow(data).catch(() => {});
      else if (skipStaleUnmountSave.current || latest.current.canAutosave?.(data) === false) clearBuildDirty(latest.current.buildId, latest.current.resource);
    };
    // The form lifecycle depends on its editor opening, not on refreshed server props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled]);
  return { formRef, saveNow };
}
