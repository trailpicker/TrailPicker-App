"use client";

import { Trash2 } from "lucide-react";

export default function DeleteBuildButton() {
  return (
    <button
      type="submit"
      aria-label="Delete build"
      onClick={(event) => {
        if (!window.confirm("Delete this build? This cannot be undone.")) event.preventDefault();
      }}
      className="rounded-xl border border-red-100 p-2.5 text-red-600 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
