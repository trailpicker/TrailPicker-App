"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { GripHorizontal } from "lucide-react";

const DEFAULT_HEIGHT = 235;
const MIN_HEIGHT = 185;
const MAX_HEIGHT = 410;
const HANDLE_HEIGHT = 12;
const STORAGE_KEY = "trailpicker:route-elevation:height";
const clamp = (height: number) => Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, height));

// This drawer mounts only after the client opens it, so a synchronous preference
// read avoids painting the default size and resizing a frame later.
function initialHeight(): number {
  if (typeof window === "undefined") return DEFAULT_HEIGHT;
  try {
    const stored = Number(window.localStorage.getItem(STORAGE_KEY));
    if (Number.isFinite(stored) && stored >= MIN_HEIGHT && stored <= MAX_HEIGHT) return stored;
  } catch { /* Browsers can disable storage. */ }
  return DEFAULT_HEIGHT;
}

/** Optional map overlay. It never occupies a grid row or reduces the map's size. */
export default function ResizableElevationDock({ children, onHeightChange }: {
  children: ReactNode;
  onHeightChange?: (height: number) => void;
}) {
  const [height, setHeight] = useState(initialHeight);
  const currentHeight = useRef(height);
  const drag = useRef<{ y: number; initial: number } | null>(null);
  const [resizing, setResizing] = useState(false);

  useEffect(() => { onHeightChange?.(height); }, [height, onHeightChange]);

  function update(next: number, persist = false) {
    const value = clamp(next);
    currentHeight.current = value;
    setHeight(value);
    if (persist) {
      try { window.localStorage.setItem(STORAGE_KEY, String(value)); }
      catch { /* Optional preference storage. */ }
    }
  }

  function stop() {
    if (!drag.current) return;
    drag.current = null;
    setResizing(false);
    update(currentHeight.current, true);
  }

  return (
    <div
      data-route-elevation-dock
      style={{ height: `min(${height + HANDLE_HEIGHT}px, calc(100% - 170px))` }}
      className="absolute inset-x-0 bottom-0 z-[1100] flex min-h-0 min-w-0 flex-col overflow-hidden border-t border-gray-200 bg-white shadow-[0_-10px_25px_-15px_rgba(15,23,42,0.4)]"
    >
      <div
        role="separator"
        aria-label="Resize elevation profile height"
        aria-orientation="horizontal"
        aria-controls="route-elevation-profile"
        aria-valuemin={MIN_HEIGHT}
        aria-valuemax={MAX_HEIGHT}
        aria-valuenow={Math.round(height)}
        aria-valuetext={`Elevation profile ${Math.round(height)} pixels tall`}
        tabIndex={0}
        title="Drag up to enlarge elevation · Double-click to reset · Arrow keys also work"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          drag.current = { y: event.clientY, initial: currentHeight.current };
          setResizing(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          update(drag.current.initial + drag.current.y - event.clientY);
        }}
        onPointerUp={(event) => {
          stop();
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={stop}
        onLostPointerCapture={stop}
        onDoubleClick={() => update(DEFAULT_HEIGHT, true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            update(currentHeight.current + (event.key === "ArrowUp" ? 18 : -18), true);
          } else if (event.key === "Home") {
            event.preventDefault();
            update(MIN_HEIGHT, true);
          } else if (event.key === "End") {
            event.preventDefault();
            update(MAX_HEIGHT, true);
          }
        }}
        className={`group flex h-3 w-full shrink-0 cursor-row-resize touch-none select-none items-center justify-center border-b border-gray-100 focus-visible:outline-2 focus-visible:outline-green-700 ${resizing ? "bg-green-50" : "hover:bg-gray-50"}`}
      >
        <span className="flex h-2.5 w-12 items-center justify-center rounded-full bg-white text-gray-400 group-hover:text-green-800 group-focus-visible:text-green-800">
          <GripHorizontal className="h-3 w-5" aria-hidden="true" />
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

