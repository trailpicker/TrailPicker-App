"use client";

import { removeGearFromBuild } from "@/app/build/[id]/actions";

export default function RemoveGearButton({
  itemId,
  buildId,
}: {
  itemId: string;
  buildId: string;
}) {
  return (
    <form
      action={async () => {
        await removeGearFromBuild(
          itemId,
          buildId
        );
      }}
    >
      <button
        className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white"
      >
        Remove
      </button>
    </form>
  );
}