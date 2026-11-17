import type {Destination} from "./destinations";
/** Recommendations use only supplied catalog facts. Missing trail data never becomes a claim. */
export type TripStyle = "any" | "day" | "overnight";
export type Area = "any" | "vancouver" | "sea-to-sky" | "island" | "rockies" | "interior" | "north";
export type Scenery = "any" | "lakes" | "summits" | "forest" | "coast" | "meadows";
export type Priority = "balanced" | "facilities" | "distance" | "featured";
export type Activity = "any" | "hiking" | "backpacking" | "camping" | "paddling";
export type DistancePreference = "any" | "5" | "10" | "15" | "25";
export type GainPreference = "any" | "300" | "600" | "1000";
export type ConfirmedPreference = "any" | "yes";
export type FinderPreferences = {
  style: TripStyle; area: Area; difficulty: "any" | "easy" | "moderate" | "hard";
  scenery: Scenery; priority: Priority;
  /** Additional inputs are optional to preserve old bookmarked finder URLs. */
  activity?: Activity; distance?: DistancePreference; gain?: GainPreference;
  dogs?: ConfirmedPreference; toilets?: ConfirmedPreference; storage?: ConfirmedPreference;
};
export type QueryValues = Record<string,string | string[] | undefined>;
export const DEFAULT_PREFERENCES: FinderPreferences = {
  style:"any",area:"any",difficulty:"any",scenery:"any",priority:"balanced",
};
function enumValue<T extends string>(value:string | string[] | undefined, options: readonly T[], fallback:T):T {
  const first=Array.isArray(value)?value[0]:value;
  return options.includes(first as T)?first as T:fallback;
}
export function parseFinderPreferences(params:QueryValues):FinderPreferences {
  const preferences:FinderPreferences = {
    style:enumValue(params.style,["any","day","overnight"],"any"),
    area:enumValue(params.area,["any","vancouver","sea-to-sky","island","rockies","interior","north"],"any"),
    difficulty:enumValue(params.difficulty,["any","easy","moderate","hard"],"any"),
    scenery:enumValue(params.scenery,["any","lakes","summits","forest","coast","meadows"],"any"),
    priority:enumValue(params.priority,["balanced","facilities","distance","featured"],"balanced"),
  };
  // Ignore unknown/invalid extras. Existing links retain their old behavior.
  if(params.activity!==undefined) preferences.activity=enumValue(params.activity,["any","hiking","backpacking","camping","paddling"],"any");
  if(params.distance!==undefined) preferences.distance=enumValue(params.distance,["any","5","10","15","25"],"any");
  if(params.gain!==undefined) preferences.gain=enumValue(params.gain,["any","300","600","1000"],"any");
  if(params.dogs!==undefined) preferences.dogs=enumValue(params.dogs,["any","yes"],"any");
  if(params.toilets!==undefined) preferences.toilets=enumValue(params.toilets,["any","yes"],"any");
  if(params.storage!==undefined) preferences.storage=enumValue(params.storage,["any","yes"],"any");
  return preferences;
}
const AREA_REGIONS:Record<Exclude<Area,"any">,readonly string[]> = {
  vancouver:["Lower Mainland","Sea to Sky","Manning"],
  "sea-to-sky":["Sea to Sky"],
  island:["Vancouver Island"],
  rockies:["Canadian Rockies","Northern Rockies"],
  interior:["Okanagan-Similkameen","West Kootenay","Columbia Mountains","Purcell Mountains","Thompson","Cariboo-Chilcotin"],
  north:["Northern BC","Northern Rockies","Peace Region","Haida Gwaii"],
};
const SCENERY_TERMS:Record<Exclude<Scenery,"any">,RegExp> = {
  lakes:/\b(lake|lakes|tarn|lakeshore|lakefront)\b/i,
  summits:/\b(summit|summits|peak|peaks|ridge|ridges|mountain|mountains|panorama)\b/i,
  forest:/\b(forest|forested|forestland|waterfall|waterfalls|falls|creek|rainforest|old.growth)\b/i,
  coast:/\b(coast|coastal|beach|bay|ocean|sea|shore|shoreline|marine)\b/i,
  meadows:/\b(meadow|meadows|alpine|subalpine|wildflower|wildflowers)\b/i,
};
export const SCENERY_LABELS:Record<Scenery,string> = {
  any:"Any scenery",lakes:"Lakes",summits:"Peaks & ridges",forest:"Forests & waterfalls",coast:"Coastlines",meadows:"Alpine meadows",
};
export function sceneryMatches(destination:Destination,scene:Scenery):boolean {
  if(scene==="any")return true;
  const text=`${destination.name} ${destination.summary} ${destination.kind}`;
  return SCENERY_TERMS[scene].test(text);
}
export function finderEligible(destination:Destination,preferences:FinderPreferences):boolean {
  if(preferences.area!=="any"&&!AREA_REGIONS[preferences.area].includes(destination.region))return false;
  if(preferences.difficulty!=="any"&&preferences.difficulty!==destination.difficulty)return false;
  if(preferences.activity&&preferences.activity!=="any"&&!destination.activities.includes(preferences.activity))return false;
  if(preferences.dogs==="yes"&&destination.dogs!=="leashed"&&destination.dogs!=="under-control")return false;
  if(preferences.toilets==="yes"&&destination.toilet!=="yes")return false;
  if(preferences.storage==="yes"&&destination.foodStorage!=="yes")return false;
  // Distance/gain are soft preferences when missing. Known values outside the chosen maximum are excluded.
  if(preferences.distance&&preferences.distance!=="any"&&destination.distanceKm!==null&&destination.distanceKm>Number(preferences.distance))return false;
  if(preferences.gain&&preferences.gain!=="any"&&destination.elevationGainM!==null&&destination.elevationGainM>Number(preferences.gain))return false;
  if(preferences.style==="overnight") {
    return destination.kind==="campground" && destination.activities.includes("camping") && destination.activities.includes("backpacking");
  }
  if(preferences.style==="day") return destination.activities.includes("hiking");
  return true;
}
export type FinderMatch = {destination:Destination;reasons:string[];cautions:string[];score:number;sceneryMatch:boolean};
function matchOne(destination:Destination,preferences:FinderPreferences):FinderMatch {
  let score=0;
  const reasons:string[]=[];
  const cautions:string[]=[];
  const matchedScenery=sceneryMatches(destination,preferences.scenery);
  if(preferences.scenery!=="any"&&matchedScenery){score+=12;reasons.push(`${SCENERY_LABELS[preferences.scenery]} in catalog description`);}
  if(preferences.area!=="any"){score+=2;reasons.push(destination.region);}
  if(preferences.difficulty!=="any"){score+=2;reasons.push(`${destination.difficulty} catalog difficulty`);}
  if(preferences.style==="overnight"){score+=3;reasons.push("Cataloged camping area");}
  if(preferences.style==="day"){score+=2;reasons.push("Hiking listed as an activity");}
  if(preferences.activity&&preferences.activity!=="any"){score+=3;reasons.push(`${preferences.activity} listed as an activity`);}
  if(preferences.dogs==="yes"){score+=3;reasons.push("Dog access explicitly listed (check current rules)");}
  if(preferences.toilets==="yes"){score+=3;reasons.push("Toilets recorded as available");}
  if(preferences.storage==="yes"){score+=3;reasons.push("Food storage recorded as available");}
  if(destination.toilet==="yes"&&destination.foodStorage==="yes") {
    score+=preferences.priority==="facilities"?9:1;
    if(preferences.priority==="facilities")reasons.push("Toilet and food storage listed");
  } else if(preferences.priority==="facilities")cautions.push("Facilities not fully confirmed in the catalog");
  if(destination.distanceKm!==null) {
    score+=preferences.priority==="distance"?9:2;
    if(preferences.distance&&preferences.distance!=="any") {score+=6;reasons.push(`${destination.distanceKm} km recorded, within preferred maximum`);}
    else reasons.push("Route distance listed");
  } else {
    cautions.push(preferences.distance&&preferences.distance!=="any"?"Route distance unknown; preferred maximum unverified":"Route distance missing");
  }
  if(preferences.gain&&preferences.gain!=="any") {
    if(destination.elevationGainM!==null){score+=6;reasons.push(`${destination.elevationGainM} m recorded gain, within preferred maximum`);}
    else cautions.push("Elevation gain unknown; preferred maximum unverified");
  } else if(destination.elevationGainM===null)cautions.push("Elevation gain missing");
  if(destination.featured)score+=preferences.priority==="featured"?8:2;
  if(destination.caution)cautions.push("Review destination cautions and current park notices");
  if(preferences.scenery!=="any"&&!matchedScenery)cautions.push("Preferred scenery not confirmed");
  return {destination,reasons:reasons.slice(0,5),cautions,score,sceneryMatch:matchedScenery};
}
/** Four varied, traceable suggestions. Unknown catalog fields remain unknown. */
export function recommendDestinations(destinations:readonly Destination[],preferences:FinderPreferences,limit=4):FinderMatch[] {
  const candidates=destinations.filter(item=>finderEligible(item,preferences)).map(item=>matchOne(item,preferences));
  const supported=preferences.scenery==="any"?candidates:candidates.filter(item=>item.sceneryMatch);
  supported.sort((a,b)=>b.score-a.score||Number(b.destination.featured)-Number(a.destination.featured)||a.destination.name.localeCompare(b.destination.name)||a.destination.id.localeCompare(b.destination.id));
  const max=Math.max(1,Math.min(limit,8));
  const results:FinderMatch[]=[],parks=new Set<string>();
  for(const candidate of supported){if(parks.has(candidate.destination.park))continue;results.push(candidate);parks.add(candidate.destination.park);if(results.length>=max)return results;}
  for(const candidate of supported){if(results.some(row=>row.destination.id===candidate.destination.id))continue;results.push(candidate);if(results.length>=max)break;}
  return results;
}
