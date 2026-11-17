import type { Metadata } from "next";
import DiscoverResultsServer from "@/components/discover/DiscoverResultsServer";

export const metadata: Metadata = {
  title: "Saved Destinations, Trips & Builds | TrailPicker",
  description: "Your saved backpacking destinations, itineraries and gear lists.",
};
export default function SavedPage({searchParams}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <DiscoverResultsServer searchParams={searchParams} section="saved" />;
}
