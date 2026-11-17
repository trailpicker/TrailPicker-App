"use client";

import { useState } from "react";
import { ImageOff, Mountain } from "lucide-react";
import { discoverPhotoUrl, discoverPhotoSource, getDiscoverPhoto } from "@/lib/discover-photos";
import type { Destination } from "@/lib/destinations";

export default function DestinationDetailHero({ destination }: { destination: Destination }) {
  const [error, setError] = useState(false);
  const photo = getDiscoverPhoto(destination);
  return <div className="relative isolate aspect-[1.38/1] w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-sky-200 via-emerald-100 to-emerald-900 sm:aspect-[2.3/1] lg:aspect-[2.9/1]">
    {photo && !error ? <>
      {/* Wikimedia Commons photo with a visible, clickable licence credit. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={discoverPhotoUrl(photo)}
        alt={photo.representative ? `Representative park scenery: ${photo.description}` : photo.description}
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        referrerPolicy="no-referrer"
        onError={() => setError(true)}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/65 to-transparent" />
      <a href={discoverPhotoSource(photo)} target="_blank" rel="noopener noreferrer" className="absolute bottom-3 right-3 rounded-lg bg-slate-950/70 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm hover:bg-slate-950/90">
        {photo.representative ? "Area photo" : "Photo"} · {photo.author} · {photo.license}
      </a>
    </> : <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-emerald-950/55">
      <div aria-hidden="true" className="absolute -bottom-40 left-[-20%] h-96 w-[70%] rotate-[-25deg] rounded-[50%] bg-green-950/15" />
      <Mountain size={56} className="relative" strokeWidth={1.2} aria-hidden="true" />
      <span className="relative inline-flex items-center gap-2 text-sm font-medium"><ImageOff size={15} aria-hidden="true" /> Photo not available</span>
      <span className="relative text-xs">No unrelated photo substituted</span>
    </div>}
  </div>;
}
