import type { Metadata } from "next";
import DiscoverResultsServer from "@/components/discover/DiscoverResultsServer";

export const metadata: Metadata = {
  title: "Community Trips & Gear Lists | TrailPicker",
  description: "Browse public backpacking itineraries and gear lists shared on TrailPicker.",
};

type RawParams = Record<string, string | string[] | undefined>;
export default async function CommunityPage({searchParams}: {searchParams: Promise<RawParams>}) {
  const params = await searchParams;
  const mode = Array.isArray(params.type) ? params.type[0] : params.type;
  return <DiscoverResultsServer searchParams={Promise.resolve(params)} section={mode === "packs" || mode === "builds" ? "packs" : "trips"} />;
}
