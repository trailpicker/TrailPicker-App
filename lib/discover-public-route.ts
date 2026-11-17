import type {Waypoint} from "./trip-planner";
/** Explicitly published route stops. Strip per-stop free-text notes and invalid day references. */
export function publicRouteWaypoints(value:unknown,dayIds:readonly string[]=[]):Waypoint[] {
  if(!Array.isArray(value))return [];
  const days=new Set(dayIds);
  const ids=new Set<string>();
  const route:Waypoint[]=[];
  for(const raw of value){
    if(!raw||typeof raw!=="object")continue;
    const p=raw as Record<string,unknown>;
    if(typeof p.id!=="string"||!p.id||p.id.length>200||ids.has(p.id))continue;
    if(typeof p.name!=="string"||!p.name.trim()||p.name.length>200)continue;
    if(typeof p.lat!=="number"||!Number.isFinite(p.lat)||Math.abs(p.lat)>90||typeof p.lng!=="number"||!Number.isFinite(p.lng)||Math.abs(p.lng)>180)continue;
    if(p.kind!=="camp"&&p.kind!=="trailhead"&&p.kind!=="water"&&p.kind!=="resupply"&&p.kind!=="waypoint")continue;
    const elevation=typeof p.elevationM==="number"&&Number.isFinite(p.elevationM)&&p.elevationM>=-500&&p.elevationM<=9000?p.elevationM:null;
    const time=typeof p.time==="string"&&/^([01]\d|2[0-3]):[0-5]\d$/.test(p.time)?p.time:null;
    const dayId=typeof p.dayId==="string"&&days.has(p.dayId)?p.dayId:null;
    ids.add(p.id);
    route.push({id:p.id,name:p.name.trim(),lat:p.lat,lng:p.lng,kind:p.kind,elevationM:elevation,...(dayId?{dayId}:{}),...(time?{time}:{})});
    if(route.length>=200)break;
  }
  return route;
}

