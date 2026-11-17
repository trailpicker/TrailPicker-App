"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess } from "@/lib/build-access";
import { analyzePack } from "@/lib/pack-analysis";
import { readLogistics, readWaypoints } from "@/lib/trip-planner";
import { readPrivateResources } from "@/lib/trip-resources";
import { readFoodPlan } from "@/lib/food-plan";
import type { TripExport } from "@/lib/trip-resources-export";

/** Read-only export projection, including live catalog item weights and categories.
 * The caller must have access to this build; private information is filtered
 * by each individual export format, not by this owner-only server action.
 */
export async function getTripExportData(buildId: string): Promise<TripExport> {
  const access = await requireBuildAccess(buildId);
  const build = await prisma.build.findUnique({
    where: { id: access.id, userId: access.userId },
    include: {
      days: { orderBy: { date: "asc" } },
      items: { include: { gear: { select: {
        name: true, weight_g: true, price_cad: true,
        category: { select: { name: true } },
      } } } },
    },
  });
  if (!build) throw new Error("Build not found.");
  return {
    name: build.name,
    people: build.people,
    days: build.days,
    points: readWaypoints(build.routeWaypoints),
    logistics: readLogistics(build.tripLogistics),
    bookings: readPrivateResources(build.tripLogistics).bookings,
    packLines: analyzePack(build.items).lines,
    foodPlan: readFoodPlan(build.tripLogistics),
  };
}
