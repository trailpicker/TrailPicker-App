/** Bounded, parameterized PostgreSQL summary query for public community packs.
 * Aggregation happens in the database so numeric filters and sorting work across
 * the ENTIRE public catalog, not only the first screen of results. No migration.
 */
import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { PACK_PAGE_SIZE, type PackFilters } from "@/lib/discover-packs";

const base = Prisma.sql`
  WITH pack_metrics AS (
    SELECT b."id", b."name", b."location", b."people", b."createdAt", b."updatedAt",
      COALESCE(SUM(CASE WHEN NOT i."isWorn" AND NOT i."isConsumable"
        THEN COALESCE(g."weight_g", i."weightSnapshot")::bigint * i."quantity" ELSE 0 END), 0)::bigint AS "baseWeightG",
      COUNT(*) FILTER (WHERE NOT i."isWorn" AND NOT i."isConsumable"
        AND COALESCE(g."weight_g", i."weightSnapshot") IS NULL)::integer AS "missingBase",
      COALESCE(SUM(COALESCE(g."price_cad", i."priceSnapshot") * i."quantity"), 0)::double precision AS "knownCost",
      COUNT(*) FILTER (WHERE COALESCE(g."price_cad", i."priceSnapshot") IS NULL)::integer AS "missingCost"
    FROM "Build" b
    INNER JOIN "BuildItem" i ON i."buildId" = b."id"
    LEFT JOIN "Gear" g ON g."id" = i."gearId"
    WHERE b."isPublic" = TRUE
    GROUP BY b."id"
  )`;

function whereClause(filters: PackFilters) {
  const terms: Prisma.Sql[] = [Prisma.sql`TRUE`];
  if (filters.q) terms.push(Prisma.sql`(POSITION(LOWER(${filters.q}) IN LOWER(p."name")) > 0 OR POSITION(LOWER(${filters.q}) IN LOWER(COALESCE(p."location", ''))) > 0)`);
  if (filters.location) terms.push(Prisma.sql`POSITION(LOWER(${filters.location}) IN LOWER(COALESCE(p."location", ''))) > 0`);
  if (filters.people !== null) terms.push(Prisma.sql`p."people" = ${filters.people}`);
  if (filters.category) terms.push(Prisma.sql`EXISTS (
    SELECT 1 FROM "BuildItem" ci
    LEFT JOIN "Gear" cg ON cg."id" = ci."gearId"
    LEFT JOIN "Category" cc ON cc."id" = cg."categoryId"
    WHERE ci."buildId" = p."id"
      AND LOWER(COALESCE(cc."name", ci."customCategory", 'Other')) = LOWER(${filters.category})
  )`);
  if (filters.minBaseKg !== null) terms.push(Prisma.sql`p."missingBase" = 0 AND p."baseWeightG" >= ${Math.round(filters.minBaseKg * 1000)}`);
  if (filters.maxBaseKg !== null) terms.push(Prisma.sql`p."missingBase" = 0 AND p."baseWeightG" <= ${Math.round(filters.maxBaseKg * 1000)}`);
  if (filters.maxCostCad !== null) terms.push(Prisma.sql`p."missingCost" = 0 AND p."knownCost" <= ${filters.maxCostCad}`);
  return Prisma.sql`${Prisma.join(terms, " AND ")}`;
}
function sorting(sort: PackFilters["sort"]) {
  switch(sort) {
    case "updated": return Prisma.sql`p."updatedAt" DESC, p."id" ASC`;
    case "popular": return Prisma.sql`(SELECT COUNT(*) FROM "SavedBuild" s WHERE s."buildId" = p."id") DESC, p."createdAt" DESC, p."id" ASC`;
    case "name": return Prisma.sql`p."name" ASC, p."id" ASC`;
    case "lightest": return Prisma.sql`(CASE WHEN p."missingBase" > 0 THEN 1 ELSE 0 END) ASC, p."baseWeightG" ASC, p."id" ASC`;
    case "cheapest": return Prisma.sql`(CASE WHEN p."missingCost" > 0 THEN 1 ELSE 0 END) ASC, p."knownCost" ASC, p."id" ASC`;
    default: return Prisma.sql`p."createdAt" DESC, p."id" ASC`;
  }
}
/** Get exactly one page of IDs and the matching total count. */
export async function queryPublicPackIds(filters: PackFilters) {
  const where = whereClause(filters);
  const countRows = await prisma.$queryRaw<{count: bigint}[]>(Prisma.sql`${base} SELECT COUNT(*)::bigint AS "count" FROM pack_metrics p WHERE ${where}`);
  const total = Number(countRows[0]?.count ?? 0n);
  const totalPages = Math.max(1, Math.ceil(total / PACK_PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  if (!total) return {ids: [] as string[], total, totalPages, page};
  const rows = await prisma.$queryRaw<{id: string}[]>(Prisma.sql`${base} SELECT p."id" FROM pack_metrics p WHERE ${where} ORDER BY ${sorting(filters.sort)} LIMIT ${PACK_PAGE_SIZE} OFFSET ${(page - 1) * PACK_PAGE_SIZE}`);
  return {ids: rows.map(row=>row.id), total, totalPages, page};
}
