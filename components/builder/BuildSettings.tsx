"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Settings2, X, LockKeyhole, Globe2 } from "lucide-react";
import { setBuildVisibility } from "@/lib/build-visibility-actions";
import { renameBuild } from "@/lib/build-settings-actions";

export default function BuildSettings({ buildId, buildName, isPublic, buttonClassName }: {
  buildId: string;
  buildName: string;
  isPublic: boolean;
  buttonClassName: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(buildName);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const cleanName = name.trim();

  function open() {
    setName(buildName);
    setError(null);
    setNotice(null);
    dialog.current?.showModal();
  }

  function saveName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cleanName || cleanName.length > 100) {
      setError("Enter a build name between 1 and 100 characters.");
      return;
    }
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await renameBuild(buildId, cleanName);
        setNotice("Build name saved.");
        router.refresh();
      } catch {
        setError("Couldn’t save the build name. Please try again.");
      }
    });
  }

  function changeVisibility(next: boolean) {
    if (next === isPublic || pending) return;
    setError(null);
    setNotice(null);
    startTransition(async () => {
      try {
        await setBuildVisibility(buildId, next);
        setNotice(next ? "Build is now public." : "Build is now private.");
        router.refresh();
      } catch {
        setError("Couldn’t save visibility. Please try again.");
      }
    });
  }

  return <>
    <button type="button" onClick={open} className={buttonClassName} aria-haspopup="dialog">
      <Settings2 className="h-4 w-4" aria-hidden="true" />
      Settings
    </button>
    <dialog ref={dialog} aria-labelledby="build-settings-title"
      className="fixed inset-0 m-auto max-h-[85vh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-gray-950/35"
      onClick={e => { if (e.target === e.currentTarget) {
        const rect = e.currentTarget.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) e.currentTarget.close();
      } }}>
      <header className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <h2 id="build-settings-title" className="text-lg font-semibold">Build settings</h2>
          <p className="mt-1 text-xs text-gray-500">Name and sharing</p>
        </div>
        <button type="button" autoFocus onClick={() => dialog.current?.close()} aria-label="Close settings"
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-green-700">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>
      <div className="space-y-7 px-6 py-6">
        <form onSubmit={saveName}>
          <label htmlFor="build-settings-name" className="text-sm font-semibold">Build name</label>
          <div className="mt-2 flex gap-2">
            <input id="build-settings-name" value={name} onChange={e => setName(e.target.value)} maxLength={100} required disabled={pending}
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10 disabled:opacity-50" />
            <button type="submit" disabled={pending || !cleanName || cleanName === buildName}
              className="rounded-lg bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-40">Save</button>
          </div>
        </form>
        <section>
          <h3 className="text-sm font-semibold">Visibility</h3>
          <div role="group" aria-label="Build visibility" className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
            {[{ value: false, label: "Private", Icon: LockKeyhole }, { value: true, label: "Public", Icon: Globe2 }].map(({ value, label, Icon }) =>
              <button key={label} type="button" aria-pressed={isPublic === value} disabled={pending} onClick={() => changeVisibility(value)}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-green-700 disabled:cursor-wait ${isPublic === value ? "bg-white text-green-900 shadow-sm" : "text-gray-500 hover:text-gray-800"}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />{label}
              </button>)}
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            {isPublic ? "Anyone with the link can view this build. Only you can edit it." : "Only you can view and edit this build."}
          </p>
          <p className="mt-2 text-xs leading-5 text-gray-400">Public sharing includes gear, trip dates, location, and itinerary notes. Visibility changes save automatically.</p>
        </section>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <p role="status" aria-live="polite" className="text-sm text-green-800">{pending ? "Saving…" : notice}</p>
      </div>
      <footer className="flex justify-end border-t border-gray-100 px-6 py-4">
        <button type="button" onClick={() => dialog.current?.close()} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Done</button>
      </footer>
    </dialog>
  </>;
}
