"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { safeGearUrl } from "@/lib/gear-display";

export default function ProductGallery({ name, images }: { name: string; images: Array<{ id: string; url: string; isPrimary: boolean }> }) {
  const photos = images.filter(image => safeGearUrl(image.url)).sort((a,b) => Number(b.isPrimary)-Number(a.isPrimary));
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const image = photos[selected] ?? photos[0];
  const unavailable = !image || failed.includes(image.id);
  return <div>
    <div className="relative flex aspect-square max-h-[520px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
      {unavailable ? <div className="text-center text-gray-400"><ImageOff className="mx-auto h-12 w-12" /><p className="mt-3 text-sm">Photo unavailable</p></div> : <Image src={safeGearUrl(image.url)!} alt={name} fill priority sizes="(max-width: 767px) 90vw, 45vw" className="object-contain p-6 sm:p-10" onError={() => setFailed(previous => [...previous, image.id])} />}
    </div>
    {photos.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Product photos">{photos.map((photo,index) => <button key={photo.id} type="button" onClick={() => setSelected(index)} aria-label={`View photo ${index+1}`} aria-pressed={photo.id===image?.id} className={`relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border bg-white ${photo.id===image?.id ? "border-green-700 ring-1 ring-green-700" : "border-gray-200 hover:border-gray-400"}`}>
      {failed.includes(photo.id) ? <ImageOff className="mx-auto h-5 w-5 text-gray-300" /> : <Image src={safeGearUrl(photo.url)!} alt="" fill sizes="64px" className="object-contain p-2" onError={() => setFailed(previous => [...previous,photo.id])} />}
    </button>)}</div>}
  </div>;
}
