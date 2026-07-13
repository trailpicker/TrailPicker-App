"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addGearToBuild(
  buildId: string,
  gearId: string
) {
  const existingItem = await prisma.buildItem.findFirst({
    where: {
      buildId,
      gearId,
    },
  });

  if (existingItem) {
    await prisma.buildItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.buildItem.create({
      data: {
        buildId,
        gearId,
      },
    });
  }

  revalidatePath(`/build/${buildId}`);
}
export async function removeGearFromBuild(
  buildItemId: string,
  buildId: string
) {
  const item = await prisma.buildItem.findUnique({
    where: {
      id: buildItemId,
    },
  });

  if (!item) return;

  if (item.quantity > 1) {
    await prisma.buildItem.update({
      where: {
        id: buildItemId,
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    });
  } else {
    await prisma.buildItem.delete({
      where: {
        id: buildItemId,
      },
    });
  }

  revalidatePath(`/build/${buildId}`);
}