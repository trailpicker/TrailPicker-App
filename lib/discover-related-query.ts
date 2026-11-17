import { getDestination } from "@/lib/destinations";
import { prisma } from "@/lib/prisma";
import {
  EMPTY_RELATED_CONTENT,
  type RelatedPublicContent,
  type RelatedPublicItem,
} from "@/lib/discover-related";

type RelatedOptions = { excludeBuildId?: string; limit?: number };

/**
 * Only query explicitly linked, published builds. No user-entered location
 * matching, private itinerary notes, route coordinates, or trip logistics.
 * Days and items are only counted here; no individual private fields selected.
 */
export async function findRelatedPublicContent(
  destinationId: string | null | undefined,
  options: RelatedOptions = {},
): Promise<RelatedPublicContent> {
  if (!getDestination(destinationId)) return EMPTY_RELATED_CONTENT;
  const limit = Math.max(1, Math.min(6, Math.trunc(options.limit ?? 3) || 3));
  const where = {
    isPublic: true,
    destinationId: destinationId!,
    ...(options.excludeBuildId ? { id: { not: options.excludeBuildId } } : {}),
  };
  const select = {
    id: true,
    name: true,
    _count: { select: { days: true, items: true } },
  } as const;
  const [trips, packs] = await Promise.all([
    prisma.build.findMany({
      where: { ...where, days: { some: {} } },
      select,
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
      take: limit,
    }),
    prisma.build.findMany({
      where: { ...where, items: { some: {} } },
      select,
      orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
      take: limit,
    }),
  ]);
  const card = (build: {id: string; name: string; _count: {days: number; items: number}}): RelatedPublicItem => ({
    id: build.id,
    name: build.name,
    dayCount: build._count.days,
    gearCount: build._count.items,
  });
  return { trips: trips.map(card), packs: packs.map(card) };
}
