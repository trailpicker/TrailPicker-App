"use client";

import dynamic from "next/dynamic";
import type {Waypoint} from "@/lib/trip-planner";
import type {Coordinates} from "@/lib/destination-detail";
const Inner=dynamic(()=>import("./DiscoverLocationMapInner"),{ssr:false,loading:()=> <div className="h-[310px] animate-pulse bg-slate-100 sm:h-[375px]" aria-label="Loading location map"/>});
export default function DiscoverLocationMap({coords,points=[],title="Destination location",height="destination"}:{coords:Coordinates|null;points?:Waypoint[];title?:string;height?:"destination"|"trip"}){
  return <Inner coords={coords} points={points} title={title} height={height}/>;
}
