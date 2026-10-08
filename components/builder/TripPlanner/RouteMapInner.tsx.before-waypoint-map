"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap, useMapEvents } from "react-leaflet";
import type { Waypoint } from "@/lib/trip-planner";
import "leaflet/dist/leaflet.css";
function Controls({ points, onPick }: { points: Waypoint[]; onPick?: (lat: number,lng: number)=>void }) {
  const map = useMap();
  useMapEvents({ click(e) { onPick?.(e.latlng.lat,e.latlng.lng); } });
  useEffect(()=>{if(points.length>1)map.fitBounds(points.map(p=>[p.lat,p.lng]),{padding:[32,32],maxZoom:14});else if(points.length===1)map.setView([points[0].lat,points[0].lng],12);},[map,points]);
  return null;
}
export default function RouteMapInner({ points, fallback, onPick }: { points: Waypoint[]; fallback: [number,number] | null; onPick?: (lat: number,lng: number)=>void }) {
  return <MapContainer center={fallback ?? [49.7,-123.1]} zoom={9} scrollWheelZoom={false} className="relative z-0 h-80 w-full"><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' /><Controls points={points} onPick={onPick} />{points.length>1 && <Polyline positions={points.map(p=>[p.lat,p.lng])} pathOptions={{color:"#166534",dashArray:"6 8"}} />}{points.map((p,i)=><CircleMarker key={p.id} center={[p.lat,p.lng]} radius={8} pathOptions={{color:p.kind==="water"?"#0369a1":"#166534",fillOpacity:1}}><Popup>{i+1}. {p.name} · {p.kind}</Popup></CircleMarker>)}{!points.length && fallback && <CircleMarker center={fallback} radius={8}><Popup>Trip location</Popup></CircleMarker>}</MapContainer>;
}
