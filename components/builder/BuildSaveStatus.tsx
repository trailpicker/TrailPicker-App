"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getSaveStatus, serverSaveStatus, subscribeSaveStatus } from "@/lib/build-save-status";

export default function BuildSaveStatus({ buildId }: { buildId: string }) {
  const status = useSyncExternalStore(subscribeSaveStatus, () => getSaveStatus(buildId), serverSaveStatus);
  useEffect(() => {
    if (status.state === "saved") return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [status.state]);
  return <span role="status" aria-live="polite" aria-atomic="true" title={status.message} className="inline-flex shrink-0 items-center gap-1.5 text-[10px] font-semibold tracking-wide">
    STATUS:
    <span aria-hidden="true" className={`h-2 w-2 rounded-full ${status.state === "saved" ? "bg-green-600" : status.state === "error" ? "bg-red-600" : "bg-amber-500"} ${status.state === "saving" ? "animate-pulse" : ""}`} />
    <span className="sr-only">{status.message}</span>
  </span>;
}
