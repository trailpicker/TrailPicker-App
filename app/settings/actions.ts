"use server";

import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { DistanceUnit, TemperatureUnit, WeightUnit } from "@/lib/user-preferences";

export type SettingsActionState = { status: "idle" | "success" | "error"; message: string };

async function requireUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Please sign in to manage account settings.");
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }, select: { id: true, email: true },
  });
  if (!user) throw new Error("Your account could not be found.");
  return user;
}

export async function saveSettings(
  _previous: SettingsActionState,
  data: FormData,
): Promise<SettingsActionState> {
  try {
    const user = await requireUser();
    const weightUnit = data.get("weightUnit");
    const distanceUnit = data.get("distanceUnit");
    const temperatureUnit = data.get("temperatureUnit");
    if (
      (weightUnit !== "metric" && weightUnit !== "imperial") ||
      (distanceUnit !== "metric" && distanceUnit !== "imperial") ||
      (temperatureUnit !== "c" && temperatureUnit !== "f")
    ) return { status: "error", message: "Choose valid measurement units." };

    const defaultBuildPublic = data.get("defaultBuildPublic") === "on";
    const isProfilePublic = data.get("isProfilePublic") === "on";

    await prisma.$transaction(async (tx) => {
      await tx.userSettings.upsert({
        where: { userId: user.id },
        update: {
          weightUnit: weightUnit as WeightUnit,
          distanceUnit: distanceUnit as DistanceUnit,
          temperatureUnit: temperatureUnit as TemperatureUnit,
          defaultBuildPublic,
        },
        create: {
          userId: user.id,
          weightUnit: weightUnit as WeightUnit,
          distanceUnit: distanceUnit as DistanceUnit,
          temperatureUnit: temperatureUnit as TemperatureUnit,
          defaultBuildPublic,
        },
      });
      await tx.user.update({ where: { id: user.id }, data: { isProfilePublic } });
    });
    revalidatePath("/", "layout");
    revalidatePath("/profile", "layout");
    revalidatePath("/settings");
    return { status: "success", message: "Settings saved. Your display preferences will apply after a page refresh." };
  } catch (error) {
    console.error("Settings could not be saved", error);
    return { status: "error", message: "Could not save settings. Please try again." };
  }
}

export async function deleteMyAccount(
  _previous: SettingsActionState,
  data: FormData,
): Promise<SettingsActionState> {
  if (data.get("confirmation") !== "DELETE MY ACCOUNT") {
    return { status: "error", message: 'Type "DELETE MY ACCOUNT" to confirm.' };
  }
  let user;
  try {
    user = await requireUser();
    // In Auth.js database-session mode, sign out BEFORE deleting the User:
    // the adapter needs the current Session row to revoke it cleanly.
    await signOut({ redirect: false });
  } catch (error) {
    console.error("Could not verify or sign out before deletion", error);
    return { status: "error", message: "Could not confirm your session. Account was not deleted." };
  }
  try {
    // These relations lack onDelete: Cascade in the existing schema.
    await prisma.$transaction(async (tx) => {
      await tx.favorite.deleteMany({ where: { userId: user.id } });
      await tx.review.deleteMany({ where: { userId: user.id } });
      await tx.build.deleteMany({ where: { userId: user.id } });
      // Owned gear, linked login accounts, settings, and remaining sessions cascade.
      await tx.user.delete({ where: { id: user.id } });
    });
  } catch (error) {
    console.error("Account deletion failed", error);
    return { status: "error", message: "Deletion failed without removing your account. You've been signed out; sign back in to try again." };
  }
  redirect("/");
}
