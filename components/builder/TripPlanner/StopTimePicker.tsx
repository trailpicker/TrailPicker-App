"use client";

import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Clock3, X } from "lucide-react";

type Period = "AM" | "PM";
type Selection = { hour: number; minute: number; period: Period };
type Position = { top: number; left: number; width: number; maxHeight: number };

type Props = {
  label: string;
  value?: string | null; // Saved itinerary format: local HH:mm (24-hour)
  onChange: (value: string | null) => void;
  disabled?: boolean;
};

const HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
const MINUTES = Array.from({ length: 60 }, (_, index) => index);
const PERIODS: Period[] = ["AM", "PM"];
const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2";

function parseTime(value?: string | null): Selection | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value ?? "");
  if (!match) return null;
  const hours = Number(match[1]);
  const minute = Number(match[2]);
  if (hours > 23 || minute > 59) return null;
  return { hour: hours % 12 || 12, minute, period: hours >= 12 ? "PM" : "AM" };
}

function timeLabel(selection: Selection) {
  return `${selection.hour}:${String(selection.minute).padStart(2, "0")} ${selection.period}`;
}

function timeValue(selection: Selection) {
  const hours = (selection.hour % 12) + (selection.period === "PM" ? 12 : 0);
  return `${String(hours).padStart(2, "0")}:${String(selection.minute).padStart(2, "0")}`;
}

export default function StopTimePicker({ label, value, onChange, disabled = false }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Selection>({ hour: 8, minute: 0, period: "AM" });
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, width: 320, maxHeight: 340 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);
  const chosen = parseTime(value);
  const title = label.replace(/\s*\(optional\)$/i, "");

  function getPosition(panelHeight = 336): Position {
    const rect = triggerRef.current?.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(320, Math.max(0, window.innerWidth - margin * 2));
    if (!rect) return { top: margin, left: margin, width, maxHeight: panelHeight };
    const below = window.innerHeight - rect.bottom - margin;
    const above = rect.top - margin;
    const flip = below < panelHeight + 8 && above > below;
    const available = flip ? above - 8 : below - 8;
    const maxHeight = Math.min(panelHeight, Math.max(150, available));
    const top = flip ? Math.max(margin, rect.top - maxHeight - 8)
      : Math.max(margin, Math.min(rect.bottom + 8, window.innerHeight - margin - maxHeight));
    const left = Math.max(margin, Math.min(rect.left, window.innerWidth - margin - width));
    return { top, left, width, maxHeight };
  }

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function show() {
    if (disabled) return;
    setDraft(chosen ?? { hour: 8, minute: 0, period: "AM" });
    setPosition(getPosition());
    setOpen(true);
  }

  // Unlike an in-flow dropdown, this stays in view inside the scrollable itinerary sidebar.
  useLayoutEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.focus();
    const scrollToSelected = (container: HTMLDivElement | null) => {
      if (!container) return;
      const selected = container.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (selected) container.scrollTop = selected.offsetTop - container.offsetTop - container.clientHeight / 2 + selected.offsetHeight / 2;
    };
    scrollToSelected(hoursRef.current);
    scrollToSelected(minutesRef.current);
    scrollToSelected(periodRef.current);
    const update = () => {
      const height = panelRef.current?.getBoundingClientRect().height ?? 336;
      setPosition((old) => {
        const next = getPosition(height);
        return old.top === next.top && old.left === next.left && old.width === next.width && old.maxHeight === next.maxHeight ? old : next;
      });
    };
    const frame = requestAnimationFrame(update);
    function outside(event: PointerEvent) {
      const node = event.target;
      if (node instanceof Node && !panelRef.current?.contains(node) && !triggerRef.current?.contains(node)) setOpen(false);
    }
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    document.addEventListener("pointerdown", outside);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  function moveOption(event: KeyboardEvent<HTMLDivElement>, values: readonly number[] | readonly Period[], current: number, select: (index: number) => void) {
    const key = event.key;
    if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(key)) return;
    event.preventDefault();
    const next = key === "Home" ? 0 : key === "End" ? values.length - 1
      : (current + (key === "ArrowDown" ? 1 : -1) + values.length) % values.length;
    select(next);
    const options = event.currentTarget.querySelectorAll<HTMLButtonElement>("button[data-time-option]");
    options[next]?.focus();
  }

  function commit() {
    onChange(timeValue(draft));
    close();
  }

  return (
    <div className="min-w-0">
      <span className="block text-xs font-medium text-gray-600">{label}</span>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => open ? close() : show()}
        className={`mt-1 flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-900 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS_RING}`}
      >
        <span className={chosen ? "tabular-nums" : "text-gray-400"}>{chosen ? timeLabel(chosen) : "Add time"}</span>
        <Clock3 className="h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" />
      </button>
      {open && typeof document !== "undefined" && createPortal(
        <div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-label={`Set ${title.toLowerCase()}`}
          tabIndex={-1}
          style={{ position: "fixed", ...position, overflowY: "auto" }}
          className="z-[999] rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.25)]"
          onKeyDown={(event) => {
            if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); }
            if (event.key === "Tab") {
              const buttons = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('button:not([tabindex="-1"]):not(:disabled)') ?? []);
              const first = buttons[0];
              const last = buttons[buttons.length - 1];
              if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) { event.preventDefault(); last?.focus(); }
              else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }
          }}
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Set {title.toLowerCase()}</h3>
            <button type="button" onClick={close} aria-label="Close time picker" className={`rounded-full p-1.5 text-gray-500 hover:bg-gray-100 ${FOCUS_RING}`}><X className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-[1fr_1fr_72px] gap-2">
            <div className="min-w-0">
              <div className="mb-1 text-center text-xs font-medium text-slate-500">Hour</div>
              <div ref={hoursRef} aria-label="Hour" className="h-44 overflow-y-auto rounded-lg border border-slate-100 bg-slate-50/40 p-1" onKeyDown={(event) => moveOption(event, HOURS, draft.hour - 1, (index) => setDraft((old) => ({ ...old, hour: HOURS[index] })))}>
                {HOURS.map((hour) => <button key={hour} data-time-option type="button" tabIndex={draft.hour === hour ? 0 : -1} aria-pressed={draft.hour === hour}
                  onClick={() => setDraft((old) => ({ ...old, hour }))}
                  className={`block w-full rounded-md py-2 text-center text-sm tabular-nums ${FOCUS_RING} ${draft.hour === hour ? "bg-green-800 font-semibold text-white" : "text-slate-700 hover:bg-green-50"}`}>
                  {String(hour).padStart(2, "0")}
                </button>)}
              </div>
            </div>
            <div className="min-w-0">
              <div className="mb-1 text-center text-xs font-medium text-slate-500">Minute</div>
              <div ref={minutesRef} aria-label="Minute" className="h-44 overflow-y-auto rounded-lg border border-slate-100 bg-slate-50/40 p-1" onKeyDown={(event) => moveOption(event, MINUTES, draft.minute, (index) => setDraft((old) => ({ ...old, minute: MINUTES[index] })))}>
                {MINUTES.map((minute) => <button key={minute} data-time-option type="button" tabIndex={draft.minute === minute ? 0 : -1} aria-pressed={draft.minute === minute}
                  onClick={() => setDraft((old) => ({ ...old, minute }))}
                  className={`block w-full rounded-md py-2 text-center text-sm tabular-nums ${FOCUS_RING} ${draft.minute === minute ? "bg-green-800 font-semibold text-white" : "text-slate-700 hover:bg-green-50"}`}>
                  {String(minute).padStart(2, "0")}
                </button>)}
              </div>
            </div>
            <div>
              <div className="mb-1 text-center text-xs font-medium text-slate-500">Period</div>
              <div ref={periodRef} aria-label="AM or PM" className="flex flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50/40 p-1" onKeyDown={(event) => moveOption(event, PERIODS, PERIODS.indexOf(draft.period), (index) => setDraft((old) => ({ ...old, period: PERIODS[index] })))}>
                {PERIODS.map((period) => <button key={period} data-time-option type="button" tabIndex={draft.period === period ? 0 : -1} aria-pressed={draft.period === period}
                  onClick={() => setDraft((old) => ({ ...old, period }))}
                  className={`rounded-md py-2 text-center text-sm ${FOCUS_RING} ${draft.period === period ? "bg-green-800 font-semibold text-white" : "text-slate-700 hover:bg-green-50"}`}>
                  {period}
                </button>)}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            {chosen ? <button type="button" onClick={() => { onChange(null); close(); }} className={`rounded-md px-2 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 ${FOCUS_RING}`}>Clear time</button> : <span />}
            <button type="button" onClick={commit} className={`rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-900 ${FOCUS_RING}`}>Done</button>
          </div>
        </div>, document.body
      )}
    </div>
  );
}
