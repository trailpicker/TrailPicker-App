"use client";
//components/builder/TripPlanner/TripEditForm.tsx
import { useTransition } from "react";
import DestinationPicker from "@/components/build/DestinationPicker";
import DateRangePicker from "@/components/build/DateRangePicker";
import { updateTripDetails } from "@/app/build/actions";

type Props = {
  build: {
    id: string;
    location: string | null;
    startDate: Date | null;
    endDate: Date | null;
    people: number;
    minTemperature: number | null;
    conditions: string | null;
    locationLat: number | null;
    locationLng: number | null;
  };
  onSaved: () => void;
  onCancel?: () => void;
};

export default function TripEditForm({ build, onSaved, onCancel }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await updateTripDetails(formData);
      onSaved();
    });
  }

  return (
    <div className="
      rounded-2xl
      bg-white
      border
      shadow-sm
      p-8
      space-y-6
    ">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Trip Details</h2>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>

      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="buildId" value={build.id} />

        <div className="rounded-lg border p-3">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
            Location
          </label>
          <DestinationPicker
            nameField="location"
            latField="locationLat"
            lngField="locationLng"
            initialName={build.location ?? undefined}
            initialLat={build.locationLat}
            initialLng={build.locationLng}
          />
        </div>

        <div className="rounded-lg border p-3">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
            Dates
          </label>
          <DateRangePicker
            startName="startDate"
            endName="endDate"
            initialStart={build.startDate?.toISOString().split("T")[0]}
            initialEnd={build.endDate?.toISOString().split("T")[0]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-3">
            <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
              People
            </label>
            <input
              name="people"
              type="number"
              min="1"
              defaultValue={build.people}
              className="w-full text-sm outline-none"
            />
          </div>

          <div className="rounded-lg border p-3">
            <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
              Overall Lowest Temp (°C)
            </label>
            <input
              name="minTemperature"
              type="number"
              defaultValue={build.minTemperature ?? undefined}
              placeholder="-5"
              className="w-full text-sm outline-none"
            />
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <label className="text-xs font-semibold uppercase text-gray-400 mb-2 block">
            Overall Conditions
          </label>
          <select
            name="conditions"
            defaultValue={build.conditions ?? ""}
            className="w-full text-sm outline-none cursor-pointer"
          >
            <option value="">Unknown</option>
            <option value="dry">Dry</option>
            <option value="rain">Rain</option>
            <option value="snow">Snow</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-green-900 py-2.5 text-white font-semibold hover:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isPending ? "Saving..." : "Save Trip Details"}
        </button>
      </form>
    </div>
  );
}