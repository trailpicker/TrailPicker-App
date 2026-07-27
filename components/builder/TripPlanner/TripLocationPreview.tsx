"use client";
//components/builder/TripPlanner/TripLocationPreview.tsx
import dynamic from "next/dynamic";

const MapPreviewInner = dynamic(() => import("./MapPreviewInner"), { ssr: false });

export default function TripLocationPreview({ lat, lng }: { lat: number; lng: number }) {
  return <MapPreviewInner lat={lat} lng={lng} />;
}