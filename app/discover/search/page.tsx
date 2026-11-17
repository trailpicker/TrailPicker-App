import type { Metadata } from "next";
import DiscoverResultsServer from "@/components/discover/DiscoverResultsServer";

export const metadata: Metadata = {
  title: "Search BC Destinations | TrailPicker",
  description: "Browse British Columbia's backpacking destinations by region, activity and difficulty.",
};

export default function DestinationSearchPage({searchParams}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <DiscoverResultsServer searchParams={searchParams} section="destinations" />;
}
