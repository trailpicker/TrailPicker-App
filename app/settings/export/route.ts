import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return new Response("Sign in required.", {
      status: 401, headers: { "Cache-Control": "private, no-store" },
    });
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true, email: true, username: true, bio: true, location: true,
      isProfilePublic: true, createdAt: true, settings: true,
      builds: {
        orderBy: { createdAt: "asc" },
        include: {
          items: { include: { gear: { select: { id: true, name: true } } } },
          days: { orderBy: { date: "asc" } },
        },
      },
      ownedGear: { include: { gear: { select: { id: true, name: true } } } },
      favorites: { include: { gear: { select: { id: true, name: true } } } },
      reviews: { include: { gear: { select: { id: true, name: true } } } },
    },
  });
  if (!user) return new Response("Account not found.", {
    status: 404, headers: { "Cache-Control": "private, no-store" },
  });

  const json = JSON.stringify({
    format: "trailpicker-account-export",
    version: 1,
    exportedAt: new Date().toISOString(),
    account: user,
  }, null, 2);
  return new Response(json, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="trailpicker-account-${new Date().toISOString().slice(0, 10)}.json"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
