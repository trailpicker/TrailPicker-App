"use client";

import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { GripVertical } from "lucide-react";

const DEFAULT_MAP_WIDTH = 58;
const MIN_MAP_WIDTH = 45;
const MAX_MAP_WIDTH = 70;
const STORAGE_KEY = "trailpicker:route-itinerary:map-width";

function clamp(value: number) {
  return Math.min(MAX_MAP_WIDTH, Math.max(MIN_MAP_WIDTH, value));
}

/** The desktop divider can be dragged, resized by keyboard, or double-clicked to reset. */
export default function ResizableRouteLayout({
  children,
  enabled = true,
}: {
  children: ReactNode;
  enabled?: boolean;
}) {
  const [mapWidth, setMapWidth] = useState(DEFAULT_MAP_WIDTH);
  const currentWidth = useRef(DEFAULT_MAP_WIDTH);
  const dragging = useRef(false);
  const [isResizing, setIsResizing] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const restoreWidth = () => {
    try {
      const stored = Number(window.localStorage.getItem(STORAGE_KEY));
      if (Number.isFinite(stored) && stored >= MIN_MAP_WIDTH && stored <= MAX_MAP_WIDTH) {
        currentWidth.current = stored;
        setMapWidth(stored);
      }
    } catch { /* Private browsing can disable storage; resizing still works. */ }
    };
    // Browser callback avoids an extra synchronous render in the effect.
    const id = window.requestAnimationFrame(restoreWidth);
    return () => window.cancelAnimationFrame(id);
  }, []);

  function applyWidth(next: number, save = false) {
    const value = clamp(next);
    currentWidth.current = value;
    setMapWidth(value);
    if (save) {
      try { window.localStorage.setItem(STORAGE_KEY, String(value)); } catch { /* no-op */ }
    }
  }

  function resizeFromPointer(clientX: number) {
    const bounds = container.current?.getBoundingClientRect();
    if (!bounds || !bounds.width) return;
    applyWidth(((clientX - bounds.left) / bounds.width) * 100);
  }

  if (!enabled) return <div className="min-w-0">{children}</div>;

  const [map, itinerary] = Children.toArray(children);
  return (
    <div
      ref={container}
      style={{ "--trailpicker-map-width": `${mapWidth}%` } as CSSProperties}
      className={`grid min-w-0 grid-cols-1 items-start gap-y-5 xl:grid-cols-[minmax(0,var(--trailpicker-map-width))_14px_minmax(0,1fr)] xl:gap-y-0 motion-reduce:transition-none ${isResizing ? "" : "xl:transition-[grid-template-columns] xl:duration-200 xl:ease-out"}`}
    >
      <div id="trip-route-map-pane" className="min-w-0 xl:pr-2">{map}</div>

      <div
        role="separator"
        aria-label="Resize map and itinerary panels"
        aria-orientation="vertical"
        aria-controls="trip-route-map-pane itinerary"
        aria-valuemin={MIN_MAP_WIDTH}
        aria-valuemax={MAX_MAP_WIDTH}
        aria-valuenow={Math.round(mapWidth)}
        aria-valuetext={`Map ${Math.round(mapWidth)} percent, itinerary ${Math.round(100 - mapWidth)} percent`}
        tabIndex={0}
        title="Drag to resize · Double-click to reset · Arrow keys also work"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          dragging.current = true;
          setIsResizing(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          resizeFromPointer(event.clientX);
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          if (dragging.current) resizeFromPointer(event.clientX);
        }}
        onPointerUp={(event) => {
          if (!dragging.current) return;
          resizeFromPointer(event.clientX);
          dragging.current = false;
          setIsResizing(false);
          applyWidth(currentWidth.current, true);
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
          }
        }}
        onPointerCancel={() => { dragging.current = false; setIsResizing(false); }}
        onLostPointerCapture={() => { dragging.current = false; setIsResizing(false); }}
        onDoubleClick={() => applyWidth(DEFAULT_MAP_WIDTH, true)}
        onKeyDown={(event) => {
          const steps: Record<string, number> = { ArrowLeft: -3, ArrowRight: 3 };
          if (event.key in steps) {
            event.preventDefault();
            applyWidth(currentWidth.current + steps[event.key], true);
          } else if (event.key === "Home") {
            event.preventDefault();
            applyWidth(MIN_MAP_WIDTH, true);
          } else if (event.key === "End") {
            event.preventDefault();
            applyWidth(MAX_MAP_WIDTH, true);
          }
        }}
        className="group relative hidden min-h-[420px] cursor-col-resize touch-none select-none items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-green-700 xl:flex"
      >
        <div className="h-full w-px bg-gray-200 transition-colors group-hover:bg-green-700 group-focus-visible:bg-green-700" />
        <span className="absolute flex h-11 w-5 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-400 shadow-sm transition-colors group-hover:border-green-700 group-hover:text-green-800 group-focus-visible:border-green-700 group-focus-visible:text-green-800">
          <GripVertical aria-hidden="true" className="h-4 w-4" />
        </span>
      </div>

      <div className="min-w-0 xl:pl-2">{itinerary}</div>
    </div>
  );
}
