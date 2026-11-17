"use client";

import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

type StopOption = { value: string; label: string; detail?: string; icon?: ReactNode };
type Position = { top: number; left: number; width: number; maxHeight: number };

type Props = {
  label: string;
  value: string;
  options: readonly StopOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  hideLabel?: boolean;
  placeholder?: string;
  variant?: "default" | "action" | "analysis";
};

const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2";

/** Shared popover selector for stop fields and forecast locations. */
export default function StopSelectPicker({ label, value, options, onChange, disabled = false, hideLabel = false, placeholder = "Select…", variant = "default" }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, width: 220, maxHeight: 320 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = options.find(option => option.value === value);
  const selectedIndex = Math.max(0, options.findIndex(option => option.value === value));
  const triggerStyle = variant === "action"
    ? "border-green-200 bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-green-900 hover:border-green-400 hover:bg-green-100"
    : variant === "analysis"
      ? "min-h-10 border-green-200 bg-white px-3 py-2 text-sm font-semibold text-green-950 hover:border-green-400 hover:bg-green-50"
      : "border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 hover:border-gray-300";

  function getPosition(height = 300): Position {
    const rect = triggerRef.current?.getBoundingClientRect();
    const margin = 12;
    const width = Math.min(Math.max(rect?.width ?? 220, 180), window.innerWidth - 2 * margin);
    if (!rect) return { top: margin, left: margin, width, maxHeight: height };
    const below = window.innerHeight - rect.bottom - margin;
    const above = rect.top - margin;
    const flip = below < height + 8 && above > below;
    const available = flip ? above - 8 : below - 8;
    const maxHeight = Math.min(height, Math.max(120, available));
    const top = flip ? Math.max(margin, rect.top - maxHeight - 6)
      : Math.max(margin, Math.min(rect.bottom + 6, window.innerHeight - margin - maxHeight));
    const left = Math.max(margin, Math.min(rect.left, window.innerWidth - margin - width));
    return { top, left, width, maxHeight };
  }

  function close(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  function show() {
    if (disabled || options.length === 0) return;
    setPosition(getPosition(Math.min(320, options.length * 60 + 16)));
    setOpen(true);
  }

  useLayoutEffect(() => {
    if (!open) return;
    optionRefs.current[selectedIndex]?.focus();
    const update = () => {
      const height = Math.min(320, options.length * 60 + 16);
      const next = getPosition(height);
      setPosition(old => old.top === next.top && old.left === next.left && old.width === next.width && old.maxHeight === next.maxHeight ? old : next);
    };
    function outside(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Node && !panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) close(false);
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, options.length, selectedIndex]);

  function choose(next: string) {
    if (next !== value) onChange(next);
    close();
  }

  function onOptionKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let target: number;
    if (event.key === "ArrowDown") target = (index + 1) % options.length;
    else if (event.key === "ArrowUp") target = (index - 1 + options.length) % options.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = options.length - 1;
    else if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return; }
    else if (event.key === "Tab") { close(false); return; }
    else return;
    event.preventDefault();
    optionRefs.current[target]?.focus();
  }

  return (
    <div className="min-w-0">
      <span className={hideLabel ? "sr-only" : "block text-xs font-medium text-gray-600"}>{label}</span>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => open ? close() : show()}
        onKeyDown={event => {
          if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
            event.preventDefault();
            show();
          }
        }}
        className={`${hideLabel ? "" : "mt-1 "}flex w-full items-center justify-between gap-2 rounded-lg border text-left disabled:cursor-not-allowed disabled:opacity-50 ${triggerStyle} ${FOCUS_RING}`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected?.icon && <span className="shrink-0" aria-hidden="true">{selected.icon}</span>}
          <span className="min-w-0"><span className="block truncate">{selected?.label ?? placeholder}</span>{selected?.detail && <span className="block truncate text-[11px] font-normal text-gray-500">{selected.detail}</span>}</span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {open && typeof document !== "undefined" && createPortal(
        <div
          ref={panelRef}
          id={id}
          role="listbox"
          aria-label={label}
          style={{ position: "fixed", ...position, overflowY: "auto" }}
          className="z-[999] rounded-xl border border-slate-200 bg-white p-1 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.25)]"
          onKeyDown={event => {
            if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); }
          }}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={element => { optionRefs.current[index] = element; }}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onKeyDown={event => onOptionKey(event, index)}
              onClick={() => choose(option.value)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm ${FOCUS_RING} ${option.value === value ? "bg-green-50 font-semibold text-green-900" : "text-gray-700 hover:bg-gray-50"}`}
            >
              {option.icon && <span className="shrink-0" aria-hidden="true">{option.icon}</span>}
              <span className="min-w-0 flex-1"><span className="block truncate">{option.label}</span>{option.detail && <span className="block truncate text-[11px] font-normal text-gray-500">{option.detail}</span>}</span>
              {option.value === value && <Check className="h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />}
            </button>
          ))}
        </div>, document.body
      )}
    </div>
  );
}


