"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setBuildVisibility } from "@/lib/build-visibility-actions";

export default function BuildVisibilityToggle({ buildId, isPublic }: { buildId: string; isPublic: boolean }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const router = useRouter();

  function toggle() {
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await setBuildVisibility(buildId, !isPublic);
        router.refresh();
      } catch {
        setError("Couldn’t save visibility. Please try again.");
      }
    });
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/build/${buildId}`);
      setNotice("Link copied.");
    } catch {
      setError("Couldn’t copy the link. Copy this page’s address instead.");
    }
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <div>
          <h2 className="font-semibold text-gray-900">Build visibility: {isPublic ? "Public" : "Private"}</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-600">
            {isPublic
              ? "Anyone with the link can view your gear, trip dates, location, and notes. Only you can edit."
              : "Only you can view this build. Making it public shares gear, trip dates, location, and notes with anyone who has the link."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {isPublic && <button type="button" onClick={copyLink} className="rounded-lg border px-3 py-2 text-sm">Copy public link</button>}
          <button type="button" role="switch" aria-checked={isPublic} aria-label="Public build" disabled={pending} onClick={toggle}
            className={`relative h-7 w-12 rounded-full transition disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 ${isPublic ? "bg-green-700" : "bg-gray-300"}`}>
            <span aria-hidden="true" className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${isPublic ? "left-6" : "left-1"}`} />
          </button>
          <span className="text-sm text-gray-600" aria-live="polite">{pending ? "Saving…" : isPublic ? "Public" : "Private"}</span>
        </div>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="mt-2 text-sm text-green-800">{notice}</p>}
    </section>
  );
}
