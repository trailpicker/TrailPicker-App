"use server";

import { prisma } from "@/lib/prisma";
import { requireBuildAccess, setCurrentBuild } from "@/lib/build-access";
import { redirect } from "next/navigation";

export async function openGearSelection(buildId: string, category: string) {
  const access = await requireBuildAccess(buildId);
  const type = await prisma.category.findUnique({
    where: { slug: category.toLowerCase() }, select: { slug: true },
  });
  if (!type) throw new Error("Category not found.");
  await setCurrentBuild(access.id);
  redirect(`/gear/${encodeURIComponent(type.slug)}`);
}
