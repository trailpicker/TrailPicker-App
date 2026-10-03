"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Map,
  MapPin,
  Search,
  TentTree,
} from "lucide-react";

import LocationPicker from "./LocationPicker";

import {
  DESTINATIONS,
  getDestination,
  getDestinationRegions,
  type Destination,
} from "@/lib/destinations";

type Props = {
  destinationField?: string;
  nameField: string;
  latField: string;
  lngField: string;
  initialDestinationId?: string | null;
  initialName?: string;
  initialLat?: number | null;
  initialLng?: number | null;
};

const dogLabels = {
  "not-allowed": "No dogs",
  leashed: "Dogs leashed",
  "under-control": "Dogs allowed",
  "check-current-rules": "Check dog rules",
};

const difficultyStyles = {
  easy: "bg-emerald-100 text-emerald-800",
  moderate: "bg-amber-100 text-amber-800",
  hard: "bg-rose-100 text-rose-800",
};

function DestinationCard({
  destination,
  selected,
  onSelect,
}: {
  destination: Destination;
  selected: boolean;
  onSelect: () => void;
}) {
  const toiletLabel =
    destination.toilet === "yes"
      ? "Toilet"
      : destination.toilet === "no"
        ? "No toilet"
        : "Toilet: check";

  const storageLabel =
    destination.foodStorage === "yes"
      ? "Food storage"
      : destination.foodStorage === "seasonal"
        ? "Seasonal storage"
        : destination.foodStorage === "no"
          ? "No storage"
          : "Storage: check";

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-green-700 bg-green-50 ring-2 ring-green-700/15"
          : "border-gray-200 bg-white hover:border-green-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-gray-950">
              {destination.name}
            </p>

            {destination.featured && (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-800">
                Popular
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {destination.park} · {destination.region}
          </p>
        </div>

        {selected ? (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-800 text-white">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : (
          <TentTree className="h-5 w-5 shrink-0 text-gray-300" />
        )}
      </div>

      <p className="mt-3 text-xs leading-5 text-gray-600">
        {destination.summary}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium">
        <span
          className={`rounded-full px-2 py-1 capitalize ${
            difficultyStyles[destination.difficulty]
          }`}
        >
          {destination.difficulty}
        </span>

        {destination.distanceKm !== null && (
          <span className="rounded-full bg-gray-100 px-2 py-1">
            {destination.distanceKm} km in
          </span>
        )}

        <span className="rounded-full bg-gray-100 px-2 py-1">
          {toiletLabel}
        </span>

        <span className="rounded-full bg-gray-100 px-2 py-1">
          {storageLabel}
        </span>

        <span className="rounded-full bg-gray-100 px-2 py-1">
          {dogLabels[destination.dogs]}
        </span>
      </div>
    </button>
  );
}

export default function DestinationPicker({
  destinationField = "destinationId",
  nameField,
  latField,
  lngField,
  initialDestinationId,
  initialName,
  initialLat,
  initialLng,
}: Props) {
  const initialDestination = getDestination(
    initialDestinationId,
  );

  const [mode, setMode] = useState<"popular" | "custom">(
    initialDestination || !initialName
      ? "popular"
      : "custom",
  );

  const [selectedId, setSelectedId] = useState(
    initialDestination?.id ?? "",
  );

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [dogsOnly, setDogsOnly] = useState(false);

  const selected = getDestination(selectedId);
  const regions = getDestinationRegions();

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return DESTINATIONS.filter((destination) => {
      const searchable =
        `${destination.name} ${destination.park} ${destination.region}`.toLowerCase();

      const dogFriendly =
        destination.dogs === "leashed" ||
        destination.dogs === "under-control";

      return (
        (region === "All" ||
          destination.region === region) &&
        (difficulty === "All" ||
          destination.difficulty === difficulty) &&
        (!dogsOnly || dogFriendly) &&
        (!search || searchable.includes(search))
      );
    }).sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        a.name.localeCompare(b.name),
    );
  }, [difficulty, dogsOnly, query, region]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setMode("popular")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
            mode === "popular"
              ? "bg-white text-green-900 shadow-sm"
              : "text-gray-500"
          }`}
        >
          <TentTree className="h-4 w-4" />
          Popular destinations
        </button>

        <button
          type="button"
          onClick={() => setMode("custom")}
          className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
            mode === "custom"
              ? "bg-white text-green-900 shadow-sm"
              : "text-gray-500"
          }`}
        >
          <Map className="h-4 w-4" />
          Custom wilderness trip
        </button>
      </div>

      {mode === "popular" ? (
        <>
          <input
            type="hidden"
            name={destinationField}
            value={selected?.id ?? ""}
          />

          <input
            type="hidden"
            name={nameField}
            value={
              selected
                ? `${selected.name}, ${selected.park}`
                : ""
            }
          />

          <input
            type="hidden"
            name={latField}
            value={selected?.latitude ?? ""}
          />

          <input
            type="hidden"
            name={lngField}
            value={selected?.longitude ?? ""}
          />

          <div className="grid gap-2 md:grid-cols-[1fr_auto_auto]">
            <label className="flex items-center gap-2 rounded-xl border bg-white px-3">
              <Search className="h-4 w-4 text-gray-400" />

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search campground or park"
                className="w-full py-2.5 text-sm outline-none"
              />
            </label>

            <select
              value={region}
              onChange={(event) =>
                setRegion(event.target.value)
              }
              className="rounded-xl border bg-white px-3 py-2.5 text-sm"
            >
              <option value="All">All regions</option>

              {regions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(event) =>
                setDifficulty(event.target.value)
              }
              className="rounded-xl border bg-white px-3 py-2.5 text-sm"
            >
              <option value="All">All difficulty</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <label className="flex w-fit cursor-pointer items-center gap-2 text-xs font-medium text-gray-600">
            <input
              type="checkbox"
              checked={dogsOnly}
              onChange={(event) =>
                setDogsOnly(event.target.checked)
              }
              className="h-4 w-4 accent-green-800"
            />
            Dog-friendly only
          </label>

          <div className="grid max-h-[430px] gap-3 overflow-y-auto pr-1 md:grid-cols-2">
            {filtered.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                selected={destination.id === selectedId}
                onSelect={() =>
                  setSelectedId(destination.id)
                }
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="rounded-xl bg-gray-100 px-4 py-6 text-center text-sm text-gray-500">
              No destinations match those filters.
            </p>
          )}

          {selected ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-800" />

                <div>
                  <p className="font-semibold text-green-950">
                    Selected: {selected.name}
                  </p>

                  {selected.caution && (
                    <p className="mt-1 text-xs leading-5 text-green-900/75">
                      {selected.caution}
                    </p>
                  )}

                  <div className="mt-2 flex gap-3 text-xs font-semibold">
                    <a
                      href={selected.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-800 underline"
                    >
                      Official information
                    </a>

                    {selected.bookingUrl && (
                      <a
                        href={selected.bookingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-800 underline"
                      >
                        Book campsite
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-xs text-amber-900">
              Choose a destination to continue.
            </p>
          )}
        </>
      ) : (
        <>
          <input
            type="hidden"
            name={destinationField}
            value=""
          />

          <div className="rounded-xl border bg-white p-3">
            <p className="mb-2 text-xs text-gray-500">
              Search for any wilderness location, then adjust
              it on the map if needed.
            </p>

            <LocationPicker
              nameField={nameField}
              latField={latField}
              lngField={lngField}
              initialName={initialName}
              initialLat={initialLat ?? undefined}
              initialLng={initialLng ?? undefined}
            />
          </div>
        </>
      )}
    </div>
  );
}