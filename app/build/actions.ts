"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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

  redirect(`/build/${build.id}`);
}