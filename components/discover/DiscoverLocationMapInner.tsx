"use client";

import {useEffect,useMemo,useRef,useState} from "react";
import {MapContainer,TileLayer,CircleMarker,Popup,Polyline,useMap} from "react-leaflet";
import type {Waypoint} from "@/lib/trip-planner";
import {openStreetMapLink,type Coordinates} from "@/lib/destination-detail";
import "leaflet/dist/leaflet.css";

function FitPublishedRoute({points}:{points:Waypoint[]}){
  const map=useMap();
  const key=useMemo(()=>points.map(point=>`${point.lat},${point.lng}`).join(";"),[points]);
  useEffect(()=>{if(points.length>1)map.fitBounds(points.map(point=>[point.lat,point.lng] as [number,number]),{padding:[35,35],maxZoom:13});},[map,key,points]);
  return null;
}
/** Keep normal page scrolling; only Ctrl + wheel zooms the map under the pointer. */
function CtrlWheelZoom(){
  const map=useMap();
  const accumulated=useRef(0);
  useEffect(()=>{
    const container=map.getContainer();
    const onWheel=(event:WheelEvent)=>{
      if(!event.ctrlKey){accumulated.current=0;return;}
      event.preventDefault();
      event.stopPropagation();
      const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?container.clientHeight:1);
      accumulated.current+=delta;
      if(Math.abs(accumulated.current)<60)return;
      const steps=Math.trunc(accumulated.current/100)||Math.sign(accumulated.current);
      accumulated.current-=steps*100;
      const zoom=Math.max(map.getMinZoom(),Math.min(map.getMaxZoom(),map.getZoom()-steps));
      if(zoom!==map.getZoom())map.setZoomAround(map.mouseEventToContainerPoint(event),zoom,{animate:false});
    };
    container.addEventListener("wheel",onWheel,{capture:true,passive:false});
    return ()=>container.removeEventListener("wheel",onWheel,true);
  },[map]);
  return <div className="pointer-events-none absolute bottom-4 left-3 z-[800] rounded-md bg-white/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm">Ctrl + scroll to zoom</div>;
}
export default function DiscoverLocationMapInner({coords,points,title,height}:{coords:Coordinates|null;points:Waypoint[];title:string;height:"destination"|"trip"}) {
  const [failed,setFailed]=useState(false);
  const initial=points[0]?[points[0].lat,points[0].lng] as [number,number]:coords?[coords.latitude,coords.longitude] as [number,number]:[49.28,-123.12] as [number,number];
  const external=coords?openStreetMapLink(coords):points[0]?openStreetMapLink({latitude:points[0].lat,longitude:points[0].lng}):"https://www.openstreetmap.org/";
  return <div className="relative">
    <MapContainer center={initial} zoom={points.length>1?10:12} scrollWheelZoom={false} className={height==="trip"?"relative z-0 h-[310px] w-full sm:h-[385px]":"relative z-0 h-[310px] w-full sm:h-[375px]"} aria-label={title}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        referrerPolicy="origin"
        eventHandlers={{tileerror:()=>setFailed(true)}}
      />
      <CtrlWheelZoom/>
      <FitPublishedRoute points={points}/>
      {points.length>1&&<Polyline interactive={false} positions={points.map(point=>[point.lat,point.lng])} pathOptions={{color:"#166534",weight:3,dashArray:"6 8"}}/>}
      {points.map((point,index)=><CircleMarker key={point.id} center={[point.lat,point.lng]} radius={8} pathOptions={{color:"#fff",weight:2,fillColor:"#166534",fillOpacity:1}}><Popup><strong>{index+1}. {point.name}</strong><br/>{point.kind.replace("waypoint","Stop")}{point.time?` · ${point.time}`:""}</Popup></CircleMarker>)}
      {!points.length&&coords&&<CircleMarker center={[coords.latitude,coords.longitude]} radius={9} pathOptions={{color:"#fff",weight:2,fillColor:"#166534",fillOpacity:1}}><Popup>Catalog destination location</Popup></CircleMarker>}
    </MapContainer>
    {failed&&<div role="status" className="absolute inset-x-3 top-3 z-[700] rounded-xl border border-amber-200 bg-white/95 p-3 text-xs leading-5 text-slate-700 shadow-md">Map tiles could not load. Your destination or route information is still available below. <a href={external} target="_blank" rel="noopener noreferrer" className="font-bold text-green-900 underline">Open in OpenStreetMap</a>.</div>}
  </div>;
}
