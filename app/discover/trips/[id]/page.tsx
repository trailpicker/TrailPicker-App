import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {prisma} from "@/lib/prisma";
import {currentBuildUserId} from "@/lib/build-access";
import {getDestination} from "@/lib/destinations";
import {publicTripAuthor} from "@/lib/discover-trips";
import PublicTripDetail from "@/components/discover/PublicTripDetail";
import {findRelatedPublicContent} from "@/lib/discover-related-query";

export const metadata: Metadata = { title: "Community Trip | TrailPicker" };
export default async function CommunityTripPage({params}: {params: Promise<{id: string}>}) {
  const {id}=await params;
  if (!id||id.length>200) notFound();
  const trip=await prisma.build.findFirst({
    where:{id,isPublic:true,days:{some:{}}},
    select:{
      id:true,name:true,location:true,destinationId:true,
      startDate:true,endDate:true,people:true,routeWaypoints:true,
      user:{select:{name:true,username:true,isProfilePublic:true}},
      _count:{select:{savedBy:true,items:true}},
      days:{select:{id:true,date:true,startLocation:true,endLocation:true,distanceKm:true,elevationGainM:true,elevationLossM:true,durationMinutes:true,campsite:true,activities:true},orderBy:{date:"asc"}},
    },
  });
  if (!trip) notFound();
  const related=await findRelatedPublicContent(trip.destinationId,{excludeBuildId:trip.id,limit:3});
  const userId=await currentBuildUserId();
  const saved=userId?Boolean(await prisma.savedBuild.findUnique({where:{userId_buildId:{userId,buildId:trip.id}},select:{buildId:true}})):false;
  return <PublicTripDetail
    id={trip.id} name={trip.name} location={trip.location}
    author={publicTripAuthor(trip.user)} destination={getDestination(trip.destinationId)}
    startDate={trip.startDate} endDate={trip.endDate} people={trip.people}
    days={trip.days} waypoints={trip.routeWaypoints} saves={trip._count.savedBy} saved={saved} signedIn={Boolean(userId)} gearCount={trip._count.items} related={related}
  />;
}
