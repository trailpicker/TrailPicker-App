// components/build/CreateTripDetails.tsx
"use client";
import LocationPicker from "./LocationPicker";
import DateRangePicker from "./DateRangePicker";

import { useState } from "react";

const icons = {
    pin: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.1-7-11a7 7 0 1114 0c0 4.9-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    calendar: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <rect x="3" y="5" width="18" height="16" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v4M16 3v4M3 10h18" />
        </svg>
    ),
    users: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M13 7a4 4 0 11-8 0 4 4 0 018 0zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    thermometer: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
        </svg>
    ),
    cloud: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.5 19a4.5 4.5 0 000-9 6 6 0 00-11.4 1.5A4 4 0 006 19h11.5z" />
        </svg>
    ),
    chevron: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
    ),
};

function FieldShell({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="rounded-lg border bg-white p-2.5 transition focus-within:ring-2 focus-within:ring-green-700 focus-within:border-green-700">
            <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-green-700">
                    {icon}
                </span>
                {label}
            </label>
            {children}
        </div>
    );
}

const fieldInputClass = `
  w-full rounded-md border-0 bg-transparent px-0 py-0.5 text-sm
  outline-none focus:ring-0 placeholder:text-gray-300
`;

export default function CreateTripDetails() {
    const [open, setOpen] = useState(false);

    return (
        <div className={`overflow-hidden border ${open ? "rounded-xl" : "rounded-xl"}`}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="
                    w-full bg-slate-800 px-6 py-4 flex items-center justify-between
                    hover:bg-slate-900 transition cursor-pointer
                "
            >
                <span className="flex items-center gap-2">
                    <p className="text-medium font-semibold text-white">Trip Details</p>
                    <span className="text-xs font-medium text-white/50">(OPTIONAL)</span>
                </span>

                <span
                    className={`
                        flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white
                        transition-transform duration-200 ${open ? "rotate-180" : ""}
                    `}
                >
                    {icons.chevron}
                </span>
            </button>

            <div
                className={`
                transition-all duration-300
                ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div className="bg-gray-50 p-5 space-y-4">
                    <div className="rounded-lg border bg-white p-3">
                        <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2">
                            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-green-700">
                                {icons.pin}
                            </span>

                            Location
                        </label>

                        <LocationPicker
                            nameField="location"
                            latField="locationLat"
                            lngField="locationLng"
                        />
                    </div>

                    <FieldShell icon={icons.calendar} label="Dates">
                        <DateRangePicker startName="startDate" endName="endDate" />
                    </FieldShell>

                    <div className="grid grid-cols-2 gap-4">
                        <FieldShell icon={icons.users} label="People">
                            <input
                                name="people"
                                type="number"
                                min="1"
                                defaultValue="1"
                                className={fieldInputClass}
                            />
                        </FieldShell>

                        <FieldShell icon={icons.thermometer} label="Lowest Temp">
                            <div className="flex items-center gap-1">
                                <input
                                    name="minTemperature"
                                    type="number"
                                    placeholder="-5"
                                    className={fieldInputClass}
                                />
                                <span className="text-sm text-gray-400 shrink-0">°C</span>
                            </div>
                        </FieldShell>
                    </div>

                    <FieldShell icon={icons.cloud} label="Conditions">
                        <select
                            name="conditions"
                            className={`${fieldInputClass} cursor-pointer`}
                        >
                            <option value="">Unknown</option>
                            <option value="dry">Dry</option>
                            <option value="rain">Rain</option>
                            <option value="snow">Snow</option>
                        </select>
                    </FieldShell>
                </div>
            </div>
        </div>
    );
}