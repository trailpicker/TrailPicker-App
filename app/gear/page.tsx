import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

// The obsolete all-gear listing is retired. Keep old bookmarks useful.
export default async function GearPage() {
  const category = await prisma.category.findFirst({ orderBy: { createdAt: "asc" }, select: { slug: true } });
  if (!category) notFound();
  redirect(`/gear/${encodeURIComponent(category.slug)}`);
}
