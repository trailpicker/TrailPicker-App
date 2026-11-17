"use client";

import dynamic from "next/dynamic";
import type { Destination } from "@/lib/destinations";

const MapInner = dynamic(() => import("./DiscoverSearchMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] w-full items-center justify-center bg-slate-100 text-sm text-slate-500 sm:h-[500px]" role="status">
      Loading destination map…
    </div>
  ),
});

/** Leaflet must not be evaluated in the server renderer. */
export default function DiscoverSearchMap({
  destinations, selectedId, onSelect,
}: {
  destinations: Destination[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return <MapInner destinations={destinations} selectedId={selectedId} onSelect={onSelect} />;
}
