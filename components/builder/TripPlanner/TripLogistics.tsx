"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  CarFront,
  Check,
  ChevronDown,
  LockKeyhole,
  NotebookPen,
  Shield,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { saveTripLogistics } from "@/lib/tracked-build-actions";
import { readLogistics, type Logistics } from "@/lib/trip-planner";
import { useBuildAutosave } from "@/lib/use-build-autosave";

type FieldSpec = {
  key: keyof Logistics;
  label: string;
  placeholder: string;
};

type LogisticsSection = {
  id: "bookings" | "access" | "safety" | "other";
  title: string;
  description: string;
  icon: LucideIcon;
  fields: readonly FieldSpec[];
};

// The form still submits all seven original field names. No schema or
// server-action changes are needed to use this layout with existing trips.
const SECTIONS: readonly LogisticsSection[] = [
  {
    id: "bookings",
    title: "Permits & reservations",
    description: "Access permits, campsite bookings and confirmation details",
    icon: Ticket,
    fields: [
      {
        key: "permits",
        label: "Permits",
        placeholder: "Permit type, number, pickup location or requirements…",
      },
      {
        key: "reservations",
        label: "Reservations",
        placeholder: "Campsite bookings, dates, confirmation numbers…",
      },
    ],
  },
  {
    id: "access",
    title: "Getting there",
    description: "Transportation, parking and trailhead access",
    icon: CarFront,
    fields: [
      {
        key: "transportation",
        label: "Transportation",
        placeholder: "Driving, shuttle arrangements, pickups or drop-offs…",
      },
      {
        key: "parking",
        label: "Parking & trailhead access",
        placeholder: "Parking area, fees, road conditions or access notes…",
      },
    ],
  },
  {
    id: "safety",
    title: "Emergency information",
    description: "Your contact details and backup or exit plans",
    icon: Shield,
    fields: [
      {
        key: "emergencyContact",
        label: "Emergency contact",
        placeholder: "Name, contact number and relevant details…",
      },
      {
        key: "emergencyPlan",
        label: "Emergency plan & exit routes",
        placeholder: "Exit points, alternate routes, communication or check-in plan…",
      },
    ],
  },
  {
    id: "other",
    title: "Other notes",
    description: "Anything else you'll want handy on the trip",
    icon: NotebookPen,
    fields: [
      {
        key: "notes",
        label: "Trip notes",
        placeholder: "Additional logistics or reminders…",
      },
    ],
  },
];

type SectionId = LogisticsSection["id"];

function compactText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function sectionPreview(section: LogisticsSection, values: Logistics): string {
  const filled = section.fields
    .map(({ key, label }) => {
      const content = compactText(values[key]);
      return content ? `${label}: ${content}` : null;
    })
    .filter((preview): preview is string => preview !== null);

  return filled.length ? filled.join("  ·  ") : section.description;
}

function TripLogisticsEditor({
  buildId,
  value,
}: {
  buildId: string;
  value: unknown;
}) {
  const [values, setValues] = useState<Logistics>(() => readLogistics(value));
  const [expanded, setExpanded] = useState<SectionId | null>(() =>
    Object.values(readLogistics(value)).some((entry) => entry.trim())
      ? null
      : "bookings"
  );
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const committed = useRef(readLogistics(value));
  const externalReset = useRef(false);
  const serverSignature = JSON.stringify(value ?? null);
  useEffect(() => {
    const onReplace = (event: Event) => {
      if ((event as CustomEvent<string>).detail === buildId) externalReset.current = true;
    };
    window.addEventListener("trailpicker:build-replaced", onReplace);
    return () => window.removeEventListener("trailpicker:build-replaced", onReplace);
  }, [buildId]);
  useEffect(() => {
    const next = readLogistics(value);
    if (externalReset.current || JSON.stringify(values) === JSON.stringify(committed.current)) {
      committed.current = next;
      setValues(next);
      setSaved(false);
      setError("");
      externalReset.current = false;
    }
    // Apply new server data without clobbering edits that haven't saved yet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSignature]);

  const autosave = useBuildAutosave({
    buildId,
    resource: "logistics",
    save: saveTripLogistics,
    onError: setError,
    onSaved: () => setSaved(true),
  });
  const { formRef } = autosave;

  function changeField(key: keyof Logistics, next: string) {
    setValues((current) => ({ ...current, [key]: next }));
    setSaved(false);
    setError("");
  }

  function submit(formData: FormData) {
    setSaved(false);
    setError("");
    startTransition(async () => {
      try {
        await autosave.saveNow(formData);
        setSaved(true);
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Could not save logistics."
        );
      }
    });
  }

  return (
    <section
      id="logistics"
      aria-labelledby="logistics-heading"
      className="min-w-0 scroll-mt-20 border-b border-gray-200 pb-6 text-gray-800"
    >
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="logistics-heading" className="text-xl font-bold text-gray-950">
            Logistics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Permits, access details and other practical trip information.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />
          Private when sharing
        </span>
      </header>

      <form ref={formRef} action={submit}>
        <input type="hidden" name="buildId" value={buildId} />

        {/* A single divided list, rather than a collection of separate cards. */}
        <div className="border-y border-gray-200">
          {SECTIONS.map((section) => {
            const open = expanded === section.id;
            const Icon = section.icon;
            const hasContent = section.fields.some(({ key }) =>
              Boolean(values[key].trim())
            );
            const editorId = `logistics-${section.id}`;

            return (
              <div
                key={section.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={editorId}
                    onClick={() => setExpanded(open ? null : section.id)}
                    className="group flex w-full items-start gap-3 py-4 text-left outline-none transition-colors hover:bg-gray-50/50 focus-visible:bg-green-50/50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-700 sm:gap-4 sm:px-2"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600 group-hover:text-green-900">
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-gray-950">
                        {section.title}
                      </span>
                      <span
                        className={`mt-1 block break-words text-xs leading-5 ${
                          hasContent ? "text-gray-600" : "text-gray-500"
                        } ${open ? "" : "line-clamp-2"}`}
                      >
                        {open ? section.description : sectionPreview(section, values)}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`mt-2 h-4 w-4 shrink-0 text-gray-400 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                {/* Keep every input mounted even when its row is collapsed.
                    saveTripLogistics replaces all seven values on each save. */}
                <div
                  id={editorId}
                  hidden={!open}
                  className="pb-5 pl-0 sm:pl-[3.75rem] sm:pr-7"
                >
                  <div
                    className={`grid gap-4 ${
                      section.fields.length > 1 ? "md:grid-cols-2" : ""
                    }`}
                  >
                    {section.fields.map((field) => (
                      <label key={field.key} className="block min-w-0">
                        <span className="mb-1.5 block text-xs font-semibold text-gray-700">
                          {field.label}
                        </span>
                        <textarea
                          name={field.key}
                          value={values[field.key]}
                          onChange={(event) =>
                            changeField(field.key, event.target.value)
                          }
                          rows={3}
                          maxLength={5000}
                          placeholder={field.placeholder}
                          className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3.5 py-3 text-sm leading-6 text-gray-900 outline-none transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:border-green-700 focus:ring-2 focus:ring-green-700/10"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="min-w-0 text-xs text-gray-500">
            {error ? (
              <span role="alert" className="font-medium text-red-700">
                {error}
              </span>
            ) : pending ? (
              "Saving changes…"
            ) : saved ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-green-800">
                <Check aria-hidden="true" className="h-3.5 w-3.5" />
                Saved
              </span>
            ) : (
              "Changes save automatically as you type."
            )}
          </p>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-green-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function TripLogistics(props: {
  buildId: string;
  value: unknown;
}) {
  // If the client navigates between builds without remounting the page,
  // reset the editor and autosave baseline for the new build.
  return <TripLogisticsEditor key={props.buildId} {...props} />;
}
