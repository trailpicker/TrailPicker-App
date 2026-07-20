"use client";

import { removeGear } from "@/app/build/actions";

type Props = {
  itemId: string;
  buildId: string;
};

export default function RemoveGearButton({
  itemId,
  buildId,
}: Props) {
  return (
    <form action={removeGear}>
      <input type="hidden" name="itemId" value={itemId} />
      <input type="hidden" name="buildId" value={buildId} />

      <button
        className="
          ml-2
          text-gray-400
          hover:text-red-600
          text-2xl
          font-semibold
          cursor-pointer
          transition
        "
        title="Remove item"
      >
        ×
      </button>
    </form>
  );
}