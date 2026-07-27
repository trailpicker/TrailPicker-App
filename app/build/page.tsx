// app/build/page.tsx
import { createBuild } from "./actions";
import CreateTripDetails from "@/components/build/CreateTripDetails";

const features = [
  {
    label: "Add gear",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: "Track weight",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 0a4 4 0 100 8 4 4 0 000-8zm-7 15a7 7 0 0114 0" />
      </svg>
    ),
  },
  {
    label: "Optimize pack",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function BuildPage() {
  return (
    <main
      className="min-h-[calc(100vh-64px)] flex items-center px-6 py-16 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.1) 100%), url('/garibaldi-lake.jpg')",
        backgroundPosition: "center 30%",
      }}
    >
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-14 items-center">

        {/* Left — pitch */}
        <div>
          <span className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            Trip Builder
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white drop-shadow-md leading-[1.1]">
            Plan your next backpacking trip
          </h1>

          <p className="mt-5 text-lg text-white/85 max-w-md drop-shadow-sm">
            Build your perfect setup, track weight, compare costs, and get
            ready for the trail.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur px-4 py-3 text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
                  {feature.icon}
                </span>
                <span className="text-sm font-semibold">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div className="rounded-3xl bg-white shadow-2xl border overflow-hidden">
          <div className="bg-green-900 px-8 py-5 flex items-center justify-between">
            <p className="trip-card text-lg font-bold text-white">Set Up Your Trip</p>
          </div>

          <form action={createBuild} className="px-8 py-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Trip Name
              </label>

              <input
                name="name"
                placeholder="My Summer Backpack"
                className="
                  w-full rounded-xl border px-4 py-3 text-lg
                  outline-none transition
                  focus:ring-2 focus:ring-green-700 focus:border-green-700
                "
                required
              />
            </div>

            <CreateTripDetails />

            <button
              className="
                w-full rounded-xl bg-green-900 py-3.5 text-lg font-semibold text-white
                hover:bg-green-800 transition cursor-pointer
                flex items-center justify-center gap-2
              "
            >
              Create Trip
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}