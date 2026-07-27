"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";

function startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addMonths(date: Date, n: number) {
    return new Date(date.getFullYear(), date.getMonth() + n, 1);
}
function daysInMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function isSameDay(a?: Date | null, b?: Date | null) {
    return !!a && !!b && a.toDateString() === b.toDateString();
}
function toISO(d: Date) {
    return d.toISOString().split("T")[0];
}

export default function DateRangePicker({
    startName,
    endName,
    initialStart,
    initialEnd,
}: {
    startName: string;
    endName: string;
    initialStart?: string;
    initialEnd?: string;
}) {
    const [viewMonth, setViewMonth] = useState(() =>
        startOfMonth(initialStart ? new Date(initialStart) : new Date())
    );
    const [start, setStart] = useState<Date | null>(
        initialStart ? new Date(initialStart) : null
    );
    const [end, setEnd] = useState<Date | null>(
        initialEnd ? new Date(initialEnd) : null
    );
    const [hover, setHover] = useState<Date | null>(null);
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    function updateCoords() {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
            top: rect.bottom + window.scrollY + 8,
            left: rect.left + window.scrollX,
            width: Math.max(rect.width, 288), // 288px = w-72
        });
    }

    useLayoutEffect(() => {
        if (open) updateCoords();
    }, [open]);

    useEffect(() => {
        if (!open) return;

        function handleScrollOrResize() {
            updateCoords();
        }

        function handleClickOutside(e: MouseEvent) {
            if (
                triggerRef.current?.contains(e.target as Node) ||
                panelRef.current?.contains(e.target as Node)
            ) {
                return;
            }
            setOpen(false);
        }

        window.addEventListener("scroll", handleScrollOrResize, true);
        window.addEventListener("resize", handleScrollOrResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize, true);
            window.removeEventListener("resize", handleScrollOrResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    function handleDayClick(day: Date) {
        if (!start || (start && end)) {
            setStart(day);
            setEnd(null);
        } else if (day < start) {
            setStart(day);
            setEnd(null);
        } else {
            setEnd(day);
            setOpen(false);
        }
    }

    const numDays = daysInMonth(viewMonth);
    const startWeekday = viewMonth.getDay();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= numDays; d++) {
        cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
    }

    const rangeEndPreview = end ?? hover;

    function inRange(day: Date) {
        if (!start || !rangeEndPreview) return false;
        const lo = start < rangeEndPreview ? start : rangeEndPreview;
        const hi = start < rangeEndPreview ? rangeEndPreview : start;
        return day > lo && day < hi;
    }

    const label =
        start && end
            ? `${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${end.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}`
            : start
                ? `${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })} – select end date`
                : "Select dates";

    return (
        <div>
            <input type="hidden" name={startName} value={start ? toISO(start) : ""} />
            <input type="hidden" name={endName} value={end ? toISO(end) : ""} />

            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full text-left text-sm outline-none cursor-pointer"
            >
                <span className={start ? "text-gray-900" : "text-gray-300"}>{label}</span>
            </button>

            {open && typeof document !== "undefined" && createPortal(
                <div
                    ref={panelRef}
                    style={{ position: "absolute", top: coords.top, left: coords.left, width: coords.width }}
                    className="z-[999] rounded-xl border bg-white p-3 shadow-xl"
                >
                    <div className="flex items-center justify-between mb-2">
                        <button
                            type="button"
                            onClick={() => setViewMonth(addMonths(viewMonth, -1))}
                            className="h-7 w-7 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                        >
                            ‹
                        </button>
                        <p className="text-sm font-semibold">
                            {viewMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                        </p>
                        <button
                            type="button"
                            onClick={() => setViewMonth(addMonths(viewMonth, 1))}
                            className="h-7 w-7 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                        >
                            ›
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-gray-400 mb-1">
                        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                            <div key={i}>{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {cells.map((day, i) => {
                            if (!day) return <div key={i} />;
                            const isStart = isSameDay(day, start);
                            const isEnd = isSameDay(day, end);
                            const selected = isStart || isEnd;
                            const between = inRange(day);
                            const isPast = day < new Date(new Date().toDateString());

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={isPast}
                                    onMouseEnter={() => setHover(day)}
                                    onClick={() => handleDayClick(day)}
                                    className={`
                    h-8 w-8 text-xs rounded-full transition cursor-pointer
                    ${isPast ? "text-gray-200 cursor-not-allowed" : ""}
                    ${selected ? "bg-green-700 text-white font-semibold" : ""}
                    ${between && !selected ? "bg-green-100 text-green-800" : ""}
                    ${!selected && !between && !isPast ? "hover:bg-gray-100 text-gray-700" : ""}
                  `}
                                >
                                    {day.getDate()}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-2 flex justify-between items-center pt-2 border-t">
                        <button
                            type="button"
                            onClick={() => {
                                setStart(null);
                                setEnd(null);
                            }}
                            className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            Clear
                        </button>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-xs font-semibold text-green-700 hover:text-green-800 cursor-pointer"
                        >
                            Done
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}