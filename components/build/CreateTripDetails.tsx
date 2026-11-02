
"use client";

import { useRef, useState } from "react";
import { ArrowLeft, Check, MapPin, Pencil, Plus } from "lucide-react";
import DestinationPicker from "./DestinationPicker";
import DateRangePicker from "./DateRangePicker";

type Destination = {
  id: string;
  name: string;
  lat: string;
  lng: string;
};

const emptyDestination: Destination = {
  id: "",
  name: "",
  lat: "",
  lng: "",
};

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition hover:border-green-300 hover:bg-green-50 hover:text-green-900";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-green-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/10";

export default function CreateTripDetails() {
  const [open, setOpen] = useState(false);
  const [choosingDestination, setChoosingDestination] = useState(false);
  const [destination, setDestination] =
    useState<Destination>(emptyDestination);
  const [pickerSession, setPickerSession] = useState(0);
  const [pickerError, setPickerError] = useState("");
  const pickerContainer = useRef<HTMLDivElement>(null);

  function openPicker() {
    setPickerError("");
    setPickerSession((value) => value + 1);
    setChoosingDestination(true);
  }

  function confirmDestination() {
    const parentForm = pickerContainer.current?.closest("form");
    if (!parentForm) return;

    const values = new FormData(parentForm);

    const next: Destination = {
      id: String(
        values.get("candidateDestinationId") ?? ""
      ).trim(),
      name: String(
        values.get("candidateLocation") ?? ""
      ).trim(),
      lat: String(
        values.get("candidateLat") ?? ""
      ).trim(),
      lng: String(
        values.get("candidateLng") ?? ""
      ).trim(),
    };

    if (!next.name) {
      setPickerError(
        "Choose a destination or a custom wilderness location first."
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
      setPickerError("Choose a location with valid coordinates.");
      return;
    }

    setDestination(next);
    setChoosingDestination(false);
    setPickerError("");
  }

  return (
    <section className="min-w-0">
      {/* Actual values submitted when creating the trip */}
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

      {/* Optional details disclosure */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="additional-trip-details"
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full cursor-pointer items-center justify-between border-b border-gray-200 py-3 text-left transition-colors hover:border-gray-400"
      >
        <span className="text-sm font-medium text-gray-900">
          Additional trip details
          <span className="ml-2 text-xs font-normal text-gray-400">
            Optional
          </span>
        </span>

        <Plus
          aria-hidden="true"
          className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${
            open ? "rotate-45" : "rotate-0"
          }`}
        />
      </button>

      {/* Animated accordion */}
      <div
        id="additional-trip-details"
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="space-y-5 pt-5">
            {/* Keep dates and travelers mounted while picking a destination */}
            <div
              className={
                choosingDestination ? "hidden" : "space-y-5"
              }
            >
              {/* Destination */}
              <div>
                <label className={labelClass}>
                  Destination
                </label>

                <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/60 p-3 sm:flex-nowrap">
                  <MapPin
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-green-800"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-semibold text-gray-900">
                      {destination.name ||
                        "No destination selected"}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {destination.name
                        ? destination.id
                          ? "Popular destination"
                          : "Custom wilderness location"
                        : "Optional"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openPicker}
                    className={`${secondaryButton} shrink-0`}
                  >
                    <Pencil
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                    {destination.name ? "Change" : "Choose"}
                  </button>
                </div>

                {destination.name && (
                  <button
                    type="button"
                    onClick={() =>
                      setDestination(emptyDestination)
                    }
                    className="mt-2 text-xs text-gray-500 underline-offset-2 hover:text-gray-800 hover:underline"
                  >
                    Remove destination
                  </button>
                )}
              </div>

              {/* Dates and travelers */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="min-w-0">
                  <label className={labelClass}>
                    Trip dates
                  </label>

                  <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                    <DateRangePicker
                      startName="startDate"
                      endName="endDate"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="create-trip-people"
                    className={labelClass}
                  >
                    Travelers
                  </label>

                  <input
                    id="create-trip-people"
                    name="people"
                    type="number"
                    min={1}
                    max={100}
                    defaultValue={1}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Destination selection view */}
            {choosingDestination && (
              <div
                ref={pickerContainer}
                className="space-y-4 animate-in fade-in duration-300"
              >
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <h3 className="text-base font-semibold text-gray-900">
                    Choose destination
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      setChoosingDestination(false)
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                </div>

                <DestinationPicker
                  key={pickerSession}
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

                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-4">
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
                    type="button"
                    onClick={confirmDestination}
                    className={primaryButton}
                  >
                    <Check className="h-4 w-4" />
                    Use this destination
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
