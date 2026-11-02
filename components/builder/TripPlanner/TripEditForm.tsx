
"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ArrowLeft, Check, MapPin, Pencil, X } from "lucide-react";
import DestinationPicker from "@/components/build/DestinationPicker";
import DateRangePicker from "@/components/build/DateRangePicker";
import { updateTripDetails } from "@/lib/tracked-build-actions";
import { useBuildAutosave } from "@/lib/use-build-autosave";

type DestinationSelection = {
  id: string;
  name: string;
  lat: string;
  lng: string;
};

type Props = {
  build: {
    id: string;
    destinationId?: string | null;
    location: string | null;
    locationLat: number | null;
    locationLng: number | null;
    startDate: Date | null;
    endDate: Date | null;
    people: number;
    minTemperature: number | null;
    conditions: string | null;
    days?: { date: Date }[];
  };
  onSaved: () => void;
  onCancel?: () => void;
};

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-900 disabled:opacity-50";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-green-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50";

function iso(date: Date | null | undefined) {
  return date ? new Date(date).toISOString().slice(0, 10) : "";
}

export default function TripEditForm({
  build,
  onSaved,
  onCancel,
}: Props) {
  const [error, setError] = useState("");
  const [pickerError, setPickerError] = useState("");
  const [choosingDestination, setChoosingDestination] =
    useState(false);
  const [pickerSession, setPickerSession] = useState(0);
  const [isPending, startTransition] = useTransition();
  const pickerRef = useRef<HTMLFormElement>(null);

  const [destination, setDestination] =
    useState<DestinationSelection>(() => ({
      id: build.destinationId ?? "",
      name: build.location ?? "",
      lat:
        build.locationLat == null
          ? ""
          : String(build.locationLat),
      lng:
        build.locationLng == null
          ? ""
          : String(build.locationLng),
    }));

  const [willRemoveDays, setWillRemoveDays] = useState(false);

  const originalStart = iso(build.startDate);
  const originalEnd = iso(build.endDate);

  const autosave = useBuildAutosave({
    buildId: build.id,
    resource: "trip-details",
    save: updateTripDetails,
    onError: setError,
    canAutosave: (data) =>
      String(data.get("startDate") ?? "") === originalStart &&
      String(data.get("endDate") ?? "") === originalEnd,
  });
  const { formRef } = autosave;

  // Watch the hidden date inputs from DateRangePicker.
  // Show confirmation only if existing itinerary days
  // would actually be removed.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    function checkDateRange() {
      if (!form) return;

      const data = new FormData(form);
      const start = String(data.get("startDate") ?? "");
      const end = String(data.get("endDate") ?? "");

      const datesChanged =
        start !== originalStart || end !== originalEnd;

      const removesDays =
        datesChanged &&
        (build.days ?? []).some((day) => {
          const date = iso(day.date);
          return !start || !end || date < start || date > end;
        });

      setWillRemoveDays((previous) =>
        previous === removesDays ? previous : removesDays
      );
    }

    const observer = new MutationObserver(checkDateRange);

    observer.observe(form, {
      subtree: true,
      attributes: true,
      attributeFilter: ["value"],
    });

    form.addEventListener("input", checkDateRange);
    form.addEventListener("change", checkDateRange);

    checkDateRange();

    return () => {
      observer.disconnect();
      form.removeEventListener("input", checkDateRange);
      form.removeEventListener("change", checkDateRange);
    };
  }, [formRef, build.days, originalStart, originalEnd]);

  function openDestinationPicker() {
    setPickerError("");
    setPickerSession((current) => current + 1);
    setChoosingDestination(true);
  }

  function confirmDestination() {
    if (!pickerRef.current) return;

    const values = new FormData(pickerRef.current);

    const next: DestinationSelection = {
      id: String(
        values.get("candidateDestinationId") ?? ""
      ).trim(),
      name: String(
        values.get("candidateLocation") ?? ""
      ).trim(),
      lat: String(values.get("candidateLat") ?? "").trim(),
      lng: String(values.get("candidateLng") ?? "").trim(),
    };

    if (!next.name) {
      setPickerError(
        "Choose a destination or select a custom location first."
      );
      return;
    }

    if (
      (next.lat === "") !== (next.lng === "") ||
      (next.lat !== "" &&
        (!Number.isFinite(Number(next.lat)) ||
          !Number.isFinite(Number(next.lng)) ||
          Math.abs(Number(next.lat)) > 90 ||
          Math.abs(Number(next.lng)) > 180))
    ) {
      setPickerError(
        "Choose a location with valid coordinates."
      );
      return;
    }

    // Only confirming updates the actual trip form.
    // Browsing and cancelling do not change its location.
    setDestination(next);
    setChoosingDestination(false);
    setPickerError("");
    setError("");
  }

  function handleSubmit(formData: FormData) {
    if (choosingDestination) return;

    startTransition(async () => {
      setError("");

      try {
        await autosave.saveNow(formData);
        onSaved();
      } catch (cause) {
        setError(
          cause instanceof Error
            ? cause.message
            : "Could not save trip."
        );
      }
    });
  }

  return (
    <section
      aria-label="Edit trip details"
      className={`mx-auto w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 ${
        choosingDestination
          ? "max-w-screen-2xl"
          : "max-w-5xl"
      }`}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-gray-900">
            {choosingDestination
              ? "Choose destination"
              : "Trip Details"}
          </h2>

          {choosingDestination && (
            <p className="mt-1 text-sm text-gray-500">
              Search the catalogue or select a custom
              wilderness location.
            </p>
          )}
        </div>

        {choosingDestination ? (
          <button
            type="button"
            onClick={() => setChoosingDestination(false)}
            className={secondaryButton}
          >
            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
            Back to details
          </button>
        ) : (
          onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={secondaryButton}
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Close
            </button>
          )
        )}
      </div>

      {/* Main trip details form */}
      {/* Keep mounted while browsing so unsaved field
          values are not lost. */}

      <form
        ref={formRef}
        action={handleSubmit}
        className={
          choosingDestination ? "hidden" : "space-y-5"
        }
      >
        <fieldset
          disabled={isPending}
          className="space-y-5"
        >
          <input
            type="hidden"
            name="buildId"
            value={build.id}
          />
          <input
            type="hidden"
            name="destinationId"
            value={destination.id}
          />
          <input
            type="hidden"
            name="location"
            value={destination.name}
          />
          <input
            type="hidden"
            name="locationLat"
            value={destination.lat}
          />
          <input
            type="hidden"
            name="locationLng"
            value={destination.lng}
          />

          {/* Destination summary */}
          <div>
            <label className={labelClass}>
              Destination
            </label>

            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/60 p-3 sm:flex-nowrap">
              <MapPin
                className="h-5 w-5 shrink-0 text-green-800"
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1">
                <p className="break-words text-sm font-semibold text-gray-900">
                  {destination.name ||
                    "No destination selected"}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {destination.id
                    ? "Popular destination"
                    : "Custom wilderness location"}
                </p>
              </div>

              <button
                type="button"
                onClick={openDestinationPicker}
                disabled={isPending}
                className={`${secondaryButton} shrink-0`}
              >
                <Pencil
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Change
              </button>
            </div>
          </div>

          {/* Dates, travelers and weather */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Trip dates
              </label>

              <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                <DateRangePicker
                  startName="startDate"
                  endName="endDate"
                  initialStart={originalStart}
                  initialEnd={originalEnd}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="trip-people"
                className={labelClass}
              >
                Travelers
              </label>

              <input
                id="trip-people"
                name="people"
                type="number"
                min={1}
                max={100}
                required
                defaultValue={build.people}
                className={inputClass}
              />
            </div>
          </div>

          {/* Conditional date warning */}
          {willRemoveDays && (
            <label className="flex cursor-pointer items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              <input
                name="confirmDateChange"
                type="checkbox"
                value="yes"
                className="mt-0.5 h-4 w-4 accent-green-800"
              />

              <span>
                I understand that itinerary days outside
                the new date range will be removed.
                Stops assigned to those days will be kept but become unassigned.
                Days within the range will be kept.
              </span>
            </label>
          )}

          {error && (
            <p
              role="alert"
              className="text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 pt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className={secondaryButton}
              >
                Close
              </button>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={primaryButton}
            >
              <Check
                className="h-4 w-4"
                aria-hidden="true"
              />
              {isPending
                ? "Saving…"
                : "Save changes"}
            </button>
          </div>
        </fieldset>
      </form>

      {/* Separate destination selection view */}
      {choosingDestination && (
        <div>
          <form
            key={pickerSession}
            ref={pickerRef}
            onSubmit={(event) => {
              event.preventDefault();
              confirmDestination();
            }}
            className="space-y-4"
          >
            <DestinationPicker
              destinationField="candidateDestinationId"
              nameField="candidateLocation"
              latField="candidateLat"
              lngField="candidateLng"
              initialDestinationId={
                destination.id || undefined
              }
              initialName={destination.name}
              initialLat={
                destination.lat === ""
                  ? null
                  : Number(destination.lat)
              }
              initialLng={
                destination.lng === ""
                  ? null
                  : Number(destination.lng)
              }
            />

            {pickerError && (
              <p
                role="alert"
                className="text-sm text-red-700"
              >
                {pickerError}
              </p>
            )}

            <div className="flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() =>
                  setChoosingDestination(false)
                }
                className={secondaryButton}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={primaryButton}
              >
                <Check
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                Use this destination
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
