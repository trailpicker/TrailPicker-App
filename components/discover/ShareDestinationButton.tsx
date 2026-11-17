"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function ShareDestinationButton() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Copying is optional; no false confirmation if browser permission is denied.
      setCopied(false);
    }
  }
  return <button type="button" onClick={copy} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50" aria-live="polite">
    {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
    {copied ? "Copied" : "Copy link"}
  </button>;
}

