// components/build/LocationPicker.tsx
"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), { ssr: false });

type LatLng = { lat: number; lng: number };
type Suggestion = { display_name: string; lat: string; lon: string };

export default function LocationPicker({
    nameField,
    latField,
    lngField,
    initialName,
}: {
    nameField: string;
    latField: string;
    lngField: string;
    initialName?: string;
}) {
    const [query, setQuery] = useState(initialName ?? "");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [position, setPosition] = useState<LatLng | null>(null);
    const [placeName, setPlaceName] = useState(initialName ?? "");
    const [showMap, setShowMap] = useState(false);

    const [listCoords, setListCoords] = useState({ top: 0, left: 0, width: 0 });
    const [mapCoords, setMapCoords] = useState({ top: 0, left: 0, width: 0 });

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const mapTriggerRef = useRef<HTMLButtonElement>(null);
    const mapPanelRef = useRef<HTMLDivElement>(null);

    function updateListCoords() {
        if (!inputRef.current) return;
        const rect = inputRef.current.getBoundingClientRect();
        setListCoords({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
            width: Math.max(rect.width, 288),
        });
    }

    function updateMapCoords() {
    if (!mapTriggerRef.current) return;
    const triggerRect = mapTriggerRef.current.getBoundingClientRect();
    const popupWidth = 460;

    const card = mapTriggerRef.current.closest(".trip-card");
    const cardRect = card ? card.getBoundingClientRect() : null;

    let left = cardRect
        ? cardRect.left + window.scrollX + cardRect.width / 2 - popupWidth / 2
        : triggerRect.left + window.scrollX + triggerRect.width / 2 - popupWidth / 2;

    // clamp so it never overflows the viewport horizontally
    const minLeft = 8;
    const maxLeft = window.scrollX + window.innerWidth - popupWidth - 8;
    left = Math.min(Math.max(left, minLeft), maxLeft);

    setMapCoords({
        top: triggerRect.bottom + window.scrollY + 8,
        left,
        width: popupWidth,
    });
}

    useLayoutEffect(() => {
        if (suggestions.length > 0) updateListCoords();
    }, [suggestions.length]);

    useLayoutEffect(() => {
        if (showMap) updateMapCoords();
    }, [showMap]);

    useEffect(() => {
        if (suggestions.length === 0 && !showMap) return;

        function handleScrollOrResize() {
            updateListCoords();
            updateMapCoords();
        }

        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;

            if (
                !inputRef.current?.contains(target) &&
                !listRef.current?.contains(target)
            ) {
                setSuggestions([]);
            }

            if (
                !mapTriggerRef.current?.contains(target) &&
                !mapPanelRef.current?.contains(target)
            ) {
                setShowMap(false);
            }
        }

        window.addEventListener("scroll", handleScrollOrResize, true);
        window.addEventListener("resize", handleScrollOrResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize, true);
            window.removeEventListener("resize", handleScrollOrResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [suggestions.length, showMap]);

    function handleQueryChange(value: string) {
        setQuery(value);
        setPlaceName(value);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (value.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`
                );
                setSuggestions(await res.json());
            } catch {
                setSuggestions([]);
            }
        }, 400);
    }

    function selectSuggestion(s: Suggestion) {
        setPosition({ lat: parseFloat(s.lat), lng: parseFloat(s.lon) });
        setPlaceName(s.display_name);
        setQuery(s.display_name);
        setSuggestions([]);
        setShowMap(true);
    }

    async function handleMapPick(pos: LatLng) {
        setPosition(pos);
        setShowMap(true);

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`
            );
            const data = await res.json();

            if (data.display_name) {
                setPlaceName(data.display_name);
                setQuery(data.display_name);
            } else {
                setPlaceName("Pinned location");
                setQuery("Pinned location");
            }
        } catch {
            setPlaceName("Pinned location");
            setQuery("Pinned location");
        }
    }

    return (
        <div>
            <input type="hidden" name={nameField} value={placeName} />
            <input type="hidden" name={latField} value={position ? position.lat : ""} />
            <input type="hidden" name={lngField} value={position ? position.lng : ""} />

            <div>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder="Garibaldi Provincial Park"
                    className="w-full rounded-lg border-0 bg-transparent px-0 py-0.5 text-sm outline-none focus:ring-0 placeholder:text-gray-300"
                />

                {suggestions.length > 0 && typeof document !== "undefined" && createPortal(
                    <ul
                        ref={listRef}
                        style={{ position: "absolute", top: listCoords.top, left: listCoords.left, width: listCoords.width }}
                        className="z-[999] rounded-lg border bg-white shadow-lg"
                    >
                        {suggestions.map((s, i) => (
                            <li key={i}>
                                <button
                                    type="button"
                                    onClick={() => selectSuggestion(s)}
                                    className="block w-full text-left px-3 py-2 text-xs hover:bg-gray-50 cursor-pointer truncate"
                                >
                                    {s.display_name}
                                </button>
                            </li>
                        ))}
                    </ul>,
                    document.body
                )}
            </div>

            <button
                ref={mapTriggerRef}
                type="button"
                onClick={() => setShowMap(!showMap)}
                className="mt-1 text-[11px] font-medium text-green-700 hover:text-green-800 cursor-pointer"
            >
                {showMap ? "Hide map" : "Pick on map"}
            </button>

            {showMap && typeof document !== "undefined" && createPortal(
                <div
                    ref={mapPanelRef}
                    style={{ position: "absolute", top: mapCoords.top, left: mapCoords.left, width: mapCoords.width }}
                    className="z-[999] rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
                >
                    <LocationMap position={position} onPick={handleMapPick} />
                </div>,
                document.body
            )}
        </div>
    );
}