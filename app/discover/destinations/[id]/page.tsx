import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/components/discover/DestinationDetail";
import { DESTINATIONS, getDestination } from "@/lib/destinations";
import { relatedCampgrounds, relatedPlaces } from "@/lib/destination-detail";
import { currentBuildUserId } from "@/lib/build-access";
import { prisma } from "@/lib/prisma";
import { findRelatedPublicContent } from "@/lib/discover-related-query";

export function generateStaticParams() {
  return DESTINATIONS.map(destination => ({ id: destination.id }));
}

export async function generateMetadata({ params }: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const destination = getDestination(id);
  if (!destination) return { title: "Destination not found | TrailPicker" };
  return {
    title: `${destination.name} | Discover BC | TrailPicker`,
    description: `${destination.summary} Explore ${destination.park}, ${destination.region} with trip planning and official park information.`.slice(0, 200),
  };
}

export default async function DestinationPage({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = getDestination(id);
  if (!destination) notFound();
  const userId = await currentBuildUserId();
  const saved = userId ? Boolean(await prisma.savedDestination.findUnique({
    where: { userId_destinationId: { userId, destinationId: id } }, select: { destinationId: true },
  })) : false;

  const related = await findRelatedPublicContent(destination.id, { limit: 4 });

  return <DestinationDetail
    destination={destination}
    saved={saved}
    signedIn={Boolean(userId)}
    related={related}
    campgrounds={relatedCampgrounds(destination, DESTINATIONS)}
    places={relatedPlaces(destination, DESTINATIONS)}
  />;
}

