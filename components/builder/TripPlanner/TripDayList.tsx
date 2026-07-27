import TripDayRow from "./TripDayRow";
//components/builder/TripPlanner/TripDayList.tsx
type TripDay = {
  id: string;
  date: Date;
  minTemperature: number | null;
  conditions: string | null;
  notes: string | null;
};

export default function TripDayList({ buildId, days }: { buildId: string; days: TripDay[] }) {
  return (
    <div className="
      rounded-2xl
      bg-white
      border
      overflow-hidden
      shadow-sm
    ">
      <div className="
        px-6 py-4
        hover:bg-gray-50
        transition
      ">
        <h3 className="font-bold">Day-by-Day Forecast</h3>
        <p className="text-sm text-gray-400 mt-0.5">
          Override the expected low and conditions for specific nights — useful if the forecast
          shifts partway through the trip.
        </p>
      </div>

      <div className="divide-y">
        {days.map((day, i) => (
          <TripDayRow key={day.id} buildId={buildId} day={day} dayNumber={i + 1} />
        ))}
      </div>
    </div>
  );
}