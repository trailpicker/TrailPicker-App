/**
 * OPTIONAL, idempotent metadata backfill for the two original TrailPicker seed tents.
 * No new products are created. Run after your normal seed if these products exist.
 * The names and capacities come from TrailPicker's original seed data.
 */
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) throw new Error("DATABASE_URL is required");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: dbUrl }) });

const starters = [
  { name: "Durston X-Mid 1", brand: "Durston", people: 1 },
  { name: "Big Agnes Copper Spur HV UL2", brand: "Big Agnes", people: 2 },
] as const;

try {
  for (const original of starters) {
    const gear = await prisma.gear.findFirst({
      where: { name: original.name, brand: { name: original.brand }, category: { slug: "shelter" } },
      select: { id: true, name: true, capacity_l: true, specifications: { select: { id: true, key: true } } },
    });
    if (!gear) {
      console.log(`Skipped absent seed product: ${original.name}`);
      continue;
    }
    const hasCapacity = gear.specifications.some(spec => spec.key.toLowerCase().trim() === "sleeping capacity");
    if (!hasCapacity) await prisma.gearSpecification.create({
      data: { gearId: gear.id, key: "Sleeping capacity", value: String(original.people), unit: "people" },
    });
    // Legacy seed used liters to store persons. Correct ONLY these two exact
    // product rows when the field still matches the old seed's number.
    if (gear.capacity_l === original.people) await prisma.gear.update({
      where: { id: gear.id }, data: { capacity_l: null },
    });
    console.log(`Updated sleeping capacity metadata: ${gear.name}`);
  }
} finally {
  await prisma.$disconnect();
}
