import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { preferencesFromRow } from "@/lib/user-preferences";
import SettingsClient from "@/components/settings/SettingsClient";

export const metadata = {
  title: "Settings | TrailPicker",
  description: "Manage your TrailPicker account, units, trip privacy and data.",
};

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/settings");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true, email: true, username: true, image: true,
      isProfilePublic: true, createdAt: true, settings: true,
      accounts: { select: { provider: true } },
      _count: { select: { builds: true, ownedGear: true } },
    },
  });
  if (!user) redirect("/api/auth/signin?callbackUrl=/settings");

  return (
    <SettingsClient
      user={{
        name: user.name,
        email: user.email,
        username: user.username,
        image: user.image,
        isProfilePublic: user.isProfilePublic,
        joined: user.createdAt.toISOString(),
        providers: [...new Set(user.accounts.map(account => account.provider))],
        buildCount: user._count.builds,
        gearCount: user._count.ownedGear,
      }}
      initialPreferences={preferencesFromRow(user.settings)}
    />
  );
}
