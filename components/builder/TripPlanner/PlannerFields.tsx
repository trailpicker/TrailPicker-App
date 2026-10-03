import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-700 focus:ring-4 focus:ring-green-700/10 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

export function Field({
  name,
  label,
  value,
  type = "text",
  min,
  max,
  step,
}: {
  name: string;
  label: string;
  value?: string | number | null;
  type?: string;
  min?: number;
  max?: number;
  step?: number | string;
}) {
  return (
    <label className="block space-y-1.5 text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <input
        className={inputClass}
        name={name}
        type={type}
        defaultValue={value ?? ""}
        min={min}
        max={max}
        step={step}
        maxLength={type === "text" ? 5000 : undefined}
      />
    </label>
  );
}

export function Group({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-green-800">
        {title}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function SaveStatus({
  pending,
  error,
  saved,
}: {
  pending: boolean;
  error: string;
  saved?: boolean;
}) {
  return (
    <div aria-live="polite" className="flex flex-col items-start text-sm">
      {error ? (
        <p role="alert" className="mb-2 font-medium text-red-700">
          {error}
        </p>
      ) : saved ? (
        <p className="mb-2 font-medium text-green-700">Saved.</p>
      ) : null}

      <button
        disabled={pending}
        className="rounded-xl bg-green-900 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-900/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}
