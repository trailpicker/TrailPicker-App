import SavedLibrary from "@/components/discover/SavedLibrary";
import { parseSavedSearch, type SavedEntry } from "@/lib/discover-saved";
import PackExplore, {type PublicPackCard} from "@/components/discover/PackExplore";
import {parsePackFilters, summarizePack} from "@/lib/discover-packs";
import {queryPublicPackIds} from "@/lib/discover-packs-query";
import TripExplore, { type PublicTripCard } from "@/components/discover/TripExplore";
import {parseTripFeature, publicTripAuthor, type TripDayPublic} from "@/lib/discover-trips";
import {getDestination} from "@/lib/destinations";
import { prisma } from "@/lib/prisma";
import { currentBuildUserId } from "@/lib/build-access";
import type { Prisma } from "@/app/generated/prisma/client";
import DiscoverLanding from "@/components/discover/DiscoverLanding";
import { parseDiscoverSearch, filterDiscoverDestinations } from "@/lib/discover";
import { DESTINATIONS, getDestinationRegions } from "@/lib/destinations";
import { splitMappedDestinations } from "@/lib/discover-search-map";

const PAGE_SIZE = 12;

export default async function DiscoverResultsServer({searchParams, section}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  section: "destinations" | "trips" | "packs" | "saved";
}) {
  const params = await searchParams;
  const filters = parseDiscoverSearch({...params, view: section});
  const regions = getDestinationRegions();
  if (filters.view === "packs") {
    const packFilters = parsePackFilters(params);
    const {ids,total,totalPages,page} = await queryPublicPackIds(packFilters);
    const userId = await currentBuildUserId();
    const builds = ids.length ? await prisma.build.findMany({
      where: {id:{in:ids},isPublic:true,items:{some:{}}},
      select: {
        id:true,name:true,location:true,people:true,updatedAt:true,
        user:{select:{name:true,username:true,isProfilePublic:true}},
        _count:{select:{savedBy:true}},
        items:{select:{quantity:true,isWorn:true,isConsumable:true,weightSnapshot:true,priceSnapshot:true,customCategory:true,
          gear:{select:{weight_g:true,price_cad:true,category:{select:{name:true}}}},
        }},
      },
    }):[];
    const byId = new Map(builds.map(build=>[build.id,build]));
    const savedIds=userId&&ids.length?new Set((await prisma.savedBuild.findMany({
      where:{userId,buildId:{in:ids}},select:{buildId:true},
    })).map(saved=>saved.buildId)):new Set<string>();
    const cards: PublicPackCard[] = ids.flatMap(id=>{
      const build=byId.get(id);
      if (!build) return [];
      return [{id:build.id,name:build.name,location:build.location,
        author:build.user?.isProfilePublic?(build.user.username||build.user.name||"Community member"):"Community member",
        people:build.people,updatedAt:build.updatedAt.toISOString(),saves:build._count.savedBy,
        saved:savedIds.has(build.id),summary:summarizePack(build.items),
      }];
    });
    return <PackExplore packs={cards} filters={{...packFilters,page}} total={total} totalPages={totalPages} signedIn={Boolean(userId)}/>;
  }
  if (filters.view === "trips") {
    const feature = parseTripFeature(params.feature);
    const userId = await currentBuildUserId();
    const regionIds = filters.region
      ? DESTINATIONS.filter(destination => destination.region === filters.region).map(destination => destination.id)
      : [];
    const tripWhere: Prisma.BuildWhereInput = {
      isPublic: true, days: {some: {}},
      ...(filters.q ? {OR: [
        {name: {contains:filters.q,mode:"insensitive"}},
        {location: {contains:filters.q,mode:"insensitive"}},
      ]} : {}),
      ...(filters.location ? {location: {contains:filters.location,mode:"insensitive"}} : {}),
      ...(filters.region ? {AND: [{OR: [
        {destinationId: {in:regionIds}},
        {location: {contains:filters.region,mode:"insensitive"}},
      ]}]} : {}),
      ...(feature === "campsite" ? {days:{some:{campsite:{not:null}}}} : {}),
      ...(feature === "route" ? {days:{some:{OR:[
        {distanceKm:{not:null}},{startLocation:{not:null}},{endLocation:{not:null}},
      ]}}} : {}),
      ...(feature === "gear" ? {items:{some:{}}} : {}),
    };
    const tripOrder: Prisma.BuildOrderByWithRelationInput[] =
      filters.sort === "name" ? [{name:"asc"},{id:"asc"}] :
      filters.sort === "popular" ? [{savedBy:{_count:"desc"}},{createdAt:"desc"},{id:"asc"}] :
      filters.sort === "updated" ? [{updatedAt:"desc"},{id:"asc"}] :
      [{createdAt:"desc"},{id:"asc"}];
    const count = await prisma.build.count({where:tripWhere});
    const totalPages = Math.max(1,Math.ceil(count/PAGE_SIZE));
    const page=Math.min(filters.page,totalPages);
    const trips = count===0?[]:await prisma.build.findMany({
      where:tripWhere, orderBy:tripOrder, skip:(page-1)*PAGE_SIZE,take:PAGE_SIZE,
      select:{
        id:true,name:true,location:true,destinationId:true,startDate:true,endDate:true,updatedAt:true,people:true,
        user:{select:{name:true,username:true,isProfilePublic:true}},
        _count:{select:{savedBy:true,items:true}},
        days:{select:{date:true,startLocation:true,endLocation:true,distanceKm:true,elevationGainM:true,campsite:true,activities:true},orderBy:{date:"asc"}},
      },
    });
    const savedIds=userId&&trips.length?new Set((await prisma.savedBuild.findMany({
      where:{userId,buildId:{in:trips.map(trip=>trip.id)}},select:{buildId:true},
    })).map(item=>item.buildId)):new Set<string>();
    const cards: PublicTripCard[]=trips.map(trip=>({
      id:trip.id,name:trip.name,location:trip.location,author:publicTripAuthor(trip.user),
      destination:getDestination(trip.destinationId),startDate:trip.startDate?.toISOString()??null,
      endDate:trip.endDate?.toISOString()??null,updatedAt:trip.updatedAt.toISOString(),people:trip.people,
      days:trip.days as TripDayPublic[],saves:trip._count.savedBy,saved:savedIds.has(trip.id),gearCount:trip._count.items,
    }));
    return <TripExplore trips={cards} filters={{...filters,page}} feature={feature} regions={regions}
      total={count} totalPages={totalPages} signedIn={Boolean(userId)} />;
  }
  if (filters.view === "saved") {
    const search = parseSavedSearch(params);
    const userId = await currentBuildUserId();
    if (!userId) return <SavedLibrary entries={[]} search={search} signedIn={false}/>;
    // Both sections are private to the signed-in user. A single Build bookmark
    // can appear in Trip and Builds filters when it has both days and equipment.
    const [destinations, builds] = await Promise.all([
      prisma.savedDestination.findMany({where:{userId},select:{destinationId:true,createdAt:true}}),
      prisma.savedBuild.findMany({where:{userId},select:{createdAt:true,build:{select:{
        id:true,name:true,location:true,isPublic:true,
        days:{select:{id:true},take:1},items:{select:{id:true},take:1},
      }}}}),
    ]);
    const entries: SavedEntry[] = [
      ...destinations.map(row => {
        const item = getDestination(row.destinationId);
        return {id:row.destinationId,kind:"destination" as const,name:item?.name ?? "Unavailable destination",
          subtitle:item ? `${item.park} · ${item.region}` : "Removed from the catalog",
          savedAt:row.createdAt.toISOString(),available:!!item};
      }),
      ...builds.map(row => {
        // Unpublished builds must not leak their previous private metadata.
        const available = row.build.isPublic;
        const hasDays = available && row.build.days.length > 0;
        const hasItems = available && row.build.items.length > 0;
        return {id:row.build.id,kind:hasDays?"trip" as const:"pack" as const,
          name:available?row.build.name:"Unavailable public plan",
          subtitle:available?(row.build.location||"Location not specified"):"No longer public",
          savedAt:row.createdAt.toISOString(),available,hasDays,hasItems};
      }),
    ];
    return <SavedLibrary entries={entries} search={search} signedIn/>;
  }
  if (filters.view === "destinations") {
    const matching = filterDiscoverDestinations(DESTINATIONS, filters);
    // Search is the full database, not a curated feed. Every matching entry is listed and paginated.
    const listings = matching;
    const { mapped, unmapped } = splitMappedDestinations(matching);
    const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE));
    const page = Math.min(filters.page, totalPages);
    const userId = await currentBuildUserId();
    const visibleIds = listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(d=>d.id);
    const savedDestinationIds = userId && visibleIds.length ? (await prisma.savedDestination.findMany({
      where:{userId,destinationId:{in:visibleIds}},select:{destinationId:true},
    })).map(x=>x.destinationId) : [];
    return <DiscoverLanding
      savedDestinationIds={savedDestinationIds}
      destinations={listings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
      mapDestinations={filters.display === "map" ? mapped : []}
      unmappedDestinations={filters.display === "map" ? unmapped : []}
      featuredDestinations={[]}
      entries={[]}
      filters={{ ...filters, page }}
      total={matching.length}
      totalPages={totalPages}
      regions={regions}
      signedIn={Boolean(userId)}
    />;
  }

}
