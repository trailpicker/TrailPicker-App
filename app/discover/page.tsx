import type {Metadata} from "next";
import {redirect} from "next/navigation";
import DiscoverHome from "@/components/discover/DiscoverHome";
import {legacyDiscoverDestination} from "@/lib/discover-navigation";

export const metadata: Metadata = {
  title: "Discover Your Next Backpacking Adventure | TrailPicker",
  description: "Explore BC destinations, find trips matched to your preferences, and learn from public itineraries and gear lists.",
};

export default async function DiscoverPage({searchParams}: {
  searchParams: Promise<Record<string,string | string[] | undefined>>;
}) {
  const target=legacyDiscoverDestination(await searchParams);
  if (target) redirect(target);
  return <DiscoverHome/>;
}
