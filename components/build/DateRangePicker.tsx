"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
    startName: string;
    endName: string;
    initialStart?: string;
    initialEnd?: string;
};

// Date-only values belong to the user's calendar, not UTC.
function parseDate(value?: string): Date | null {
    if (!value) return null;
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return null;
    const [, y, m, d] = match.map(Number);
    const date = new Date(y, m - 1, d);
    return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d ? date : null;
}
function dateValue(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function monthOf(date: Date) { return new Date(date.getFullYear(), date.getMonth(), 1); }
function sameDay(a: Date | null, b: Date | null) { return !!a && !!b && dateValue(a) === dateValue(b); }
function shortDate(date: Date, year = false) {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", ...(year ? { year: "numeric" } : {}) });
}
function duration(start: Date, end: Date) {
    // Count calendar days correctly even across daylight saving changes.
    return Math.round((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / 86400000);
}

export default function DateRangePicker({ startName, endName, initialStart, initialEnd }: Props) {
    const [start, setStart] = useState(() => parseDate(initialStart));
    const [end, setEnd] = useState(() => {
        const a = parseDate(initialStart), b = parseDate(initialEnd);
        return a && b && b >= a ? b : null;
    });
    const [viewMonth, setViewMonth] = useState(() => monthOf(parseDate(initialStart) ?? new Date()));
    const [hover, setHover] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0, width: 380, maxHeight: 600 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const id = useId();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nights = start && end ? duration(start, end) : null;
    const summary = nights !== null ? `${nights + 1} ${nights === 0 ? "day" : "days"} · ${nights} ${nights === 1 ? "night" : "nights"}` : "Choose your departure and return dates";
    const label = start && end
        ? `${shortDate(start, start.getFullYear() !== end.getFullYear())} – ${shortDate(end, true)}`
        : start ? `${shortDate(start)} – select return date` : "Select trip dates";

    function close() { setOpen(false); setHover(null); triggerRef.current?.focus(); }
    function updatePosition() {
        const trigger = triggerRef.current;
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        const margin = 12;
        const width = Math.min(380, window.innerWidth - margin * 2);
        const height = Math.min(panelRef.current?.getBoundingClientRect().height ?? 420, window.innerHeight - margin * 2);
        const below = window.innerHeight - rect.bottom - margin - 8;
        const above = rect.top - margin - 8;
        const placeAbove = below < height && above > below;
        const available = Math.max(0, placeAbove ? above : below);
        const maxHeight = Math.max(120, available);
        const top = placeAbove ? Math.max(margin, rect.top - Math.min(height, maxHeight) - 8) : Math.min(rect.bottom + 8, window.innerHeight - Math.min(height, maxHeight) - margin);
        setPosition({ top: Math.max(margin, top), left: Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin)), width, maxHeight: Math.min(maxHeight, window.innerHeight - margin * 2) });
    }
    useLayoutEffect(() => { if (open) updatePosition(); }, [open, viewMonth, start, end]);
    useEffect(() => {
        if (!open) return;
        const frame = requestAnimationFrame(() => {
            const target = panelRef.current?.querySelector<HTMLButtonElement>('button[data-day][aria-pressed="true"]:not(:disabled), button[data-today]:not(:disabled), button[data-day]:not(:disabled)');
            (target ?? panelRef.current)?.focus();
        });
        function outside(event: PointerEvent) {
            if (!triggerRef.current?.contains(event.target as Node) && !panelRef.current?.contains(event.target as Node)) {
                setOpen(false); setHover(null);
            }
        }
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        document.addEventListener("pointerdown", outside);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
            document.removeEventListener("pointerdown", outside);
        };
    }, [open]);

    function select(day: Date) {
        setHover(null);
        if (!start || end || day < start) { setStart(day); setEnd(null); }
        else setEnd(day);
    }
    const preview = start && !end && hover && hover >= start ? hover : end;
    const monthDays = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const totalCells = Math.ceil((viewMonth.getDay() + monthDays) / 7) * 7;
    const cells = Array.from({ length: totalCells }, (_, i) => new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i - viewMonth.getDay() + 1));
    const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2";

    return (
        <div>
            <input type="hidden" name={startName} value={start ? dateValue(start) : ""} />
            <input type="hidden" name={endName} value={end ? dateValue(end) : ""} />
            <button ref={triggerRef} type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? id : undefined}
                onClick={() => { if (open) close(); else { setViewMonth(monthOf(start ?? new Date())); setOpen(true); } }}
                className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg text-left ${focusStyle}`}>
                <span><span className={`block text-sm font-medium ${start ? "text-slate-900" : "text-slate-500"}`}>{label}</span>
                    {nights !== null && <span className="mt-1 block text-xs text-slate-500">{summary}</span>}</span>
                <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-green-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 11h18M8 15h2M14 15h2" />
                </svg>
            </button>
            {open && typeof document !== "undefined" && createPortal(
                <div ref={panelRef} id={id} role="dialog" aria-label="Choose trip dates" tabIndex={-1}
                    style={{ position: "fixed", ...position, overflowY: "auto" }}
                    className="z-[999] rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.25)]"
                    onKeyDown={event => {
                        if (event.key === "Escape") { event.preventDefault(); close(); }
                        if (event.key === "Tab") {
                            const buttons = Array.from(panelRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
                            const first = buttons[0], last = buttons[buttons.length - 1];
                            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
                        }
                    }}>
                    <div className="mb-4 flex items-center justify-between">
                        <button type="button" aria-label="Previous month" onClick={() => { setHover(null); setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1)); }} className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl text-slate-600 hover:bg-slate-100 ${focusStyle}`}>‹</button>
                        <p aria-live="polite" className="text-base font-semibold tracking-tight">{viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
                        <button type="button" aria-label="Next month" onClick={() => { setHover(null); setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1)); }} className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl text-slate-600 hover:bg-slate-100 ${focusStyle}`}>›</button>
                    </div>
                    <p className="mb-3 text-center text-xs text-slate-500">{start && !end ? "Now choose your return date" : "Choose your departure date"}</p>
                    <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-semibold tracking-wide text-slate-500">
                        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => <span key={day}>{day}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-y-1" onMouseLeave={() => setHover(null)}>
                        {cells.map(day => {
                            const isStart = sameDay(day, start), isEnd = sameDay(day, end);
                            const selected = isStart || isEnd;
                            const between = !!start && !!preview && day > start && day < preview;
                            const previewEnd = !end && sameDay(day, preview);
                            const connected = !!start && !!preview && preview > start;
                            const isPast = day < today;
                            const outside = day.getMonth() !== viewMonth.getMonth();
                            const isToday = sameDay(day, today);
                            return <div key={dateValue(day)} className={`flex h-11 items-center justify-center ${between ? "bg-green-50" : ""} ${connected && isStart ? "rounded-l-full bg-green-50" : ""} ${connected && (isEnd || previewEnd) ? "rounded-r-full bg-green-50" : ""}`}>
                                <button type="button" data-day={dateValue(day)} data-today={isToday ? "true" : undefined}
                                    aria-label={`${day.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}${isStart ? ", departure date" : ""}${isEnd ? ", return date" : ""}`}
                                    aria-pressed={selected} disabled={isPast} onClick={() => select(day)} onMouseEnter={() => setHover(day)} onFocus={() => setHover(day)}
                                    className={`relative flex h-10 w-10 max-w-full items-center justify-center rounded-full text-sm transition-colors ${focusStyle} ${selected ? "bg-green-800 font-semibold text-white shadow-sm" : isPast ? "cursor-not-allowed text-slate-300" : `${outside ? "text-slate-400" : "text-slate-700"} cursor-pointer hover:bg-green-100`} ${isToday && !selected ? "ring-1 ring-inset ring-green-700" : ""} ${previewEnd ? "bg-green-100" : ""}`}>
                                    {day.getDate()}
                                </button>
                            </div>;
                        })}
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-4">
                        <div aria-live="polite" className="mb-3"><p className="text-sm font-semibold">{start ? label : "Your next adventure"}</p><p className="mt-1 text-xs text-slate-500">{summary}</p></div>
                        <div className="flex items-center justify-between">
                            {start ? <button type="button" onClick={() => { setStart(null); setEnd(null); setHover(null); }} className={`rounded-md px-2 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 ${focusStyle}`}>Clear dates</button> : <span />}
                            <button type="button" disabled={!start || !end} onClick={close} className={`rounded-lg bg-green-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-900 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 ${focusStyle}`}>Done</button>
                        </div>
                    </div>
                </div>, document.body
            )}
        </div>
    );
}
