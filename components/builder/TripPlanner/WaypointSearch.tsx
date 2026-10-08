"use client";
import { useEffect, useRef, useState } from "react";
import { Search, LoaderCircle, MapPin } from "lucide-react";
import { parsePlaceResults, type PlaceResult } from "@/lib/waypoint-map";

type Props = { near: [number, number] | null; onChoose: (place: PlaceResult) => void; disabled?: boolean };

export default function WaypointSearch({ near, onChoose, disabled = false }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const request = useRef<AbortController | null>(null);
  const cache = useRef(new Map<string, PlaceResult[]>());
  const lastSearch = useRef(0);
  useEffect(() => () => { request.current?.abort(); request.current = null; }, []);

  async function search(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = query.trim();
    if (disabled || busy || text.length < 2) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const key = `${text.toLocaleLowerCase()}:${near?.map(n => n.toFixed(2)).join(",") ?? ""}`;
    const cached = cache.current.get(key);
    if (cached) { setResults(cached); setMessage(cached.length ? "" : "No places found. Try a nearby town or place the stop on the map."); return; }
    if (Date.now() - lastSearch.current < 1000) { setMessage("Wait a moment before searching again."); return; }
    lastSearch.current = Date.now();
    setBusy(true);
    setResults([]);
    setMessage("");
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const endpoint = process.env.NEXT_PUBLIC_WAYPOINT_SEARCH_URL || "https://photon.komoot.io/api/";
      const url = new URL(endpoint, window.location.origin);
      url.searchParams.set("q", text);
      url.searchParams.set("limit", "6");
      if (near) { url.searchParams.set("lat", String(near[0])); url.searchParams.set("lon", String(near[1])); }
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error("Search failed.");
      const found = parsePlaceResults(await response.json());
      if (request.current !== controller || controller.signal.aborted) return;
      if (cache.current.size >= 20) cache.current.delete(cache.current.keys().next().value!);
      cache.current.set(key, found);
      setResults(found);
      setMessage(found.length ? "" : "No places found. Try a nearby town or place the stop on the map.");
    } catch {
      if (request.current === controller) setMessage("Place search is unavailable. You can still add stops by clicking the map.");
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) setBusy(false);
    }
  }

  return <div className="space-y-2">
    <form onSubmit={search} className="flex gap-2">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search for a place</span>
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" aria-hidden="true" />
        <input type="search" value={query} maxLength={200} onChange={e => {
          setQuery(e.target.value); setResults([]); setMessage("");
          request.current?.abort(); request.current = null; setBusy(false);
        }} disabled={disabled} placeholder="Lake, campground, trailhead…" className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-green-700 focus:ring-2 focus:ring-green-700/10" />
      </label>
      <button type="submit" disabled={disabled || busy || query.trim().length < 2} aria-label="Search places" className="rounded-xl bg-green-900 px-3 text-sm font-semibold text-white disabled:opacity-40">
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : "Search"}
      </button>
    </form>
    <p role="status" aria-live="polite" className="text-xs text-gray-500">{busy ? "Searching…" : message}</p>
    {results.length > 0 && <ul aria-label="Place search results" className="overflow-hidden rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
      {results.map(place => <li key={place.id}><button type="button" disabled={disabled} onClick={() => { onChoose(place); setResults([]); }} className="flex w-full items-start gap-2 px-3 py-3 text-left hover:bg-green-50 disabled:opacity-40">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
        <span className="min-w-0"><span className="block text-sm font-medium text-gray-900">{place.name}</span><span className="mt-0.5 block text-xs text-gray-500">{place.detail}</span></span>
      </button></li>)}
    </ul>}
    <p className="text-[10px] text-gray-400">Place search: <a href="https://photon.komoot.io/" target="_blank" rel="noreferrer" className="underline">Photon</a> / <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="underline">OpenStreetMap</a></p>
  </div>;
}
