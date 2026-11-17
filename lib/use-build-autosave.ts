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
  // React hydration and server revalidation can update controlled input
  // attributes without any user edit. Never turn those changes into another
  // server action, which can otherwise create a refresh/autosave feedback loop.
  const userEdited = useRef(false);
  const userRevision = useRef(0);
  // A full import/restore replaces this form's saved contents. Do not let an
  // old debounce or editor cleanup immediately overwrite the restored data.
  useEffect(() => {
    const onReplaced = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== latest.current.buildId) return;
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      skipStaleUnmountSave.current = true;
      userEdited.current = false;
      userRevision.current = 0;
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
        if (userEdited.current && formRef.current && signature(new FormData(formRef.current)) !== key) changed();
        else { userEdited.current = false; clearBuildDirty(latest.current.buildId, latest.current.resource); }
        return;
      }
      const current = latest.current;
      const userRevisionAtSave = userRevision.current;
      try {
        await current.save(snapshot);
        lastSaved.current = key;
        if (mounted.current) { current.onError?.(""); current.onSaved?.(); }
        const form = formRef.current;
        // A server revalidation may update form attributes while this request
        // is running. Re-save only when the user actually edited again.
        if (userRevision.current !== userRevisionAtSave && form && signature(new FormData(form)) !== key) changed();
        else {
          userEdited.current = false;
          if (timer.current) clearTimeout(timer.current);
          timer.current = null;
        }
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
    if (!userEdited.current || !formRef.current || latest.current.enabled === false) return;
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
  function userChanged() {
    userEdited.current = true;
    userRevision.current++;
    changed();
  }
  // Some pickers update hidden form values through React instead of firing a
  // native input event. Their explicit confirmation action marks user intent;
  // the subsequent value-attribute mutation then schedules the autosave.
  function markUserEdit() { userEdited.current = true; userRevision.current++; }
  useEffect(() => {
    const form = formRef.current;
    if (!form || options.enabled === false) return;
    mounted.current = true;
    lastSaved.current = signature(new FormData(form));
    userEdited.current = false;
    userRevision.current = 0;
    // Native events plus hidden-value mutations cover date/destination pickers.
    const observer = new MutationObserver(changed);
    observer.observe(form, { subtree: true, attributes: true, attributeFilter: ["value", "checked"] });
    form.addEventListener("input", userChanged); form.addEventListener("change", userChanged);
    return () => {
      observer.disconnect(); form.removeEventListener("input", userChanged); form.removeEventListener("change", userChanged);
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
      const data = new FormData(form);
      if (userEdited.current && !skipStaleUnmountSave.current && signature(data) !== lastSaved.current && form.checkValidity() && latest.current.canAutosave?.(data) !== false) void saveNow(data).catch(() => {});
      else if (skipStaleUnmountSave.current || latest.current.canAutosave?.(data) === false) clearBuildDirty(latest.current.buildId, latest.current.resource);
    };
    // The form lifecycle depends on its editor opening, not on refreshed server props.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.enabled]);
  return { formRef, saveNow, markUserEdit };
}

