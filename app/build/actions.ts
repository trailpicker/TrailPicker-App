"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createBuild(formData: FormData) {
  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Build name is required.");
  }

  const build = await prisma.build.create({
    data: {
      name,
    },
  });


  const cookieStore = await cookies();

  cookieStore.set(
    "currentBuild",
    build.id
  );


  redirect(`/build/${build.id}`);
}
export async function addGear(
  formData: FormData
) {

  const buildId =
    formData.get("buildId") as string;

  const gearId =
    formData.get("gearId") as string;


  await prisma.buildItem.create({
    data: {
      buildId,
      gearId,
    },
  });


  redirect(`/build/${buildId}`);
}
export async function removeGear(
  formData: FormData
) {
  const itemId = formData.get("itemId") as string;
  const buildId = formData.get("buildId") as string;

  await prisma.buildItem.delete({
    where: {
      id: itemId,
    },
  });

  redirect(`/build/${buildId}`);
}