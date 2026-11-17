import type {Metadata} from "next";
import AdventureFinder from "@/components/discover/AdventureFinder";
import {DESTINATIONS} from "@/lib/destinations";
import {parseFinderPreferences,recommendDestinations} from "@/lib/discover-finder";

export const metadata:Metadata = {
  title:"Find a Trip | TrailPicker",
  description:"Find BC destinations with three quick preferences and optional detailed filters.",
};
export default async function DiscoverFindPage({searchParams}: {
  searchParams:Promise<Record<string,string | string[] | undefined>>;
}) {
  const params=await searchParams;
  const preferences=parseFinderPreferences(params);
  const show=Array.isArray(params.show)?params.show[0]:params.show;
  const showResults=show==="1";
  const matches=showResults?recommendDestinations(DESTINATIONS,preferences):[];
  return <AdventureFinder preferences={preferences} matches={matches} showResults={showResults}/>;
}
