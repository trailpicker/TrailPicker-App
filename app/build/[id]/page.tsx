import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { calculateWeightBreakdown, calculateTotalCost } from "@/lib/calculations";
import { getCompatibilityIssues } from "@/lib/compatibility";
import BuildHeader from "@/components/builder/BuildHeader";
import GearTab from "@/components/builder/GearTab";
import TripPlanner from "@/components/builder/TripPlanner/TripPlanner";
import CompatibilityPanel from "@/components/builder/CompatibilityPanel";

export default async function BuildPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const activeTab = tab === "trip" ? "trip" : "gear";

  const build = await prisma.build.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          gear: {
            include: {
              brand: true,
              category: true,
              images: true,
            },
          },
        },
      },
      days: {
        orderBy: { date: "asc" },
      },
    },
  });

  if (!build) {
    notFound();
  }

  const { base, consumable, worn, total } = calculateWeightBreakdown(build.items);
  const totalCost = calculateTotalCost(build.items);
  const issues = getCompatibilityIssues(build);

  return (
    <div className="min-h-screen bg-gray-50">
      <BuildHeader
        buildId={id}
        name={build.name}
        active={activeTab}
        issueCount={issues.length}
      />

      <main className="max-w-screen-2xl mx-auto p-2">
        {activeTab === "trip" ? (
          <TripPlanner build={build} issues={issues} />
        ) : (
          <>
            <CompatibilityPanel issues={issues} />
            <GearTab
              buildId={id}
              items={build.items}
              base={base}
              consumable={consumable}
              worn={worn}
              total={total}
              totalCost={totalCost}
            />
          </>
        )}
      </main>
    </div>
  );
}