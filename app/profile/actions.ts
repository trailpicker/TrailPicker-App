"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function currentUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("You must be signed in.");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) throw new Error("User not found.");
  return user;
}

export async function deleteBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  await prisma.build.deleteMany({ where: { id: buildId, userId: user.id } });
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function renameBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Build name is required.");
  await prisma.build.updateMany({ where: { id: buildId, userId: user.id }, data: { name: name.slice(0, 80) } });
  revalidatePath("/profile");
  revalidatePath("/profile/builds");
}

export async function duplicateProfileBuild(formData: FormData) {
  const user = await currentUser();
  const buildId = String(formData.get("buildId") || "");
  const original = await prisma.build.findFirst({ where: { id: buildId, userId: user.id }, include: { items: true, days: true } });
  if (!original) throw new Error("Build not found.");
  const copy = await prisma.build.create({
    data: {
      name: `${original.name} (copy)`,
      userId: user.id,
      location: original.location,
      locationLat: original.locationLat,
      locationLng: original.locationLng,
      startDate: original.startDate,
      endDate: original.endDate,
      people: original.people,
      minTemperature: original.minTemperature,
      conditions: original.conditions,
      items: {
        create: original.items.map(
          ({ gearId, quantity, isConsumable, isWorn, customCategory, gearNameSnapshot, weightSnapshot, priceSnapshot }) => ({
            gearId,
            quantity,
            isConsumable,
            isWorn,
            customCategory,
            gearNameSnapshot,
            weightSnapshot,
            priceSnapshot,
          }),
        ),
      },
      days: {
        create: original.days.map(({ date, minTemperature, conditions, notes }) => ({
          date,
          minTemperature,
          conditions,
          notes,
        })),
      },
    },
  });
  redirect(`/build/${copy.id}`);
}

export async function updateProfile(formData: FormData) {
  const user = await currentUser();
  const name = String(formData.get("name") || "").trim();
  const username = String(formData.get("username") || "").trim().toLowerCase();
  const bio = String(formData.get("bio") || "").trim();
  const location = String(formData.get("location") || "").trim();
  if (!name) throw new Error("Display name is required.");
  if (username && !/^[a-z0-9_]{3,24}$/.test(username)) throw new Error("Username must be 3–24 letters, numbers, or underscores.");
  await prisma.user.update({ where: { id: user.id }, data: { name, username: username || null, bio: bio || null, location: location || null, isProfilePublic: formData.get("isProfilePublic") === "on" } });
  revalidatePath("/profile", "layout");
  redirect("/profile");
}
