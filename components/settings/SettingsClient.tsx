"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  ArrowDownToLine,
  ArrowRight,
  Backpack,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Database,
  Fingerprint,
  Globe2,
  LockKeyhole,
  LogOut,
  Ruler,
  Settings2,
  Shield,
  SlidersHorizontal,
  Trash2,
  UserRound,
} from "lucide-react";
import {
  saveSettings,
  deleteMyAccount,
} from "@/app/settings/actions";
import type { SettingsActionState } from "@/app/settings/actions";
import type { UserPreferences } from "@/lib/user-preferences";

type Account = {
  name: string | null;
  email: string;
  username: string | null;
  image: string | null;
  joined: string;
  providers: string[];
  isProfilePublic: boolean;
  buildCount: number;
  gearCount: number;
};

const initialSettingsState: SettingsActionState = { status: "idle", message: "" };

const sectionClass = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const selectClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15";

function SectionHeading({ icon: Icon, title, description }: {
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-green-800">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ToggleRow({ name, title, description, defaultChecked }: {
  name: string;
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl px-4 py-4 hover:bg-slate-50">
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900">{title}</span>
        <span className="mt-1 block max-w-xl text-sm leading-relaxed text-slate-500">{description}</span>
      </span>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-green-800"
      />
    </label>
  );
}

export default function SettingsClient({ user, initialPreferences }: {
  user: Account;
  initialPreferences: UserPreferences;
}) {
  const [saveState, saveAction, saving] = useActionState(saveSettings, initialSettingsState);
  const [deleteState, deleteAction, deleting] = useActionState(deleteMyAccount, initialSettingsState);
  const [confirmation, setConfirmation] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const initials = user.name?.trim().slice(0, 1).toUpperCase() || "T";
  const joined = new Date(user.joined).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50 pb-24 text-slate-900">
      <div className="border-b border-green-950/10 bg-gradient-to-br from-green-950 via-green-900 to-emerald-800 px-5 py-12 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-center gap-2 text-sm text-emerald-100/80">
            <Link href="/profile" className="hover:text-white hover:underline">Your profile</Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="font-semibold text-white">Settings</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Account settings</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-100/85 sm:text-base">
                Customize your experience, choose trip-sharing defaults and manage your account data.
              </p>
            </div>
            <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-4 sm:block">
              <Settings2 className="h-7 w-7 text-emerald-100" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 sm:px-8 lg:grid-cols-[215px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <nav aria-label="Settings sections" className="flex gap-2 overflow-x-auto pb-2 text-sm lg:flex-col lg:overflow-visible">
            {[
              ["account", UserRound, "Account"],
              ["preferences", SlidersHorizontal, "Preferences"],
              ["privacy", Shield, "Privacy"],
              ["data", Database, "Your data"],
              ["danger", LockKeyhole, "Account management"],
            ].map(([id, Icon, label]) => {
              const SectionIcon = Icon as typeof UserRound;
              return (
                <a
                  key={id as string}
                  href={`#${id}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-3 font-semibold text-slate-600 transition hover:bg-white hover:text-green-900 hover:shadow-sm"
                >
                  <SectionIcon className="h-4 w-4" aria-hidden="true" />{label as string}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-7">
          <section id="account" className={`${sectionClass} scroll-mt-8`}>
            <SectionHeading icon={UserRound} title="Account & identity" description="Your TrailPicker account and the information associated with it." />
            <div className="flex flex-wrap items-center gap-4 px-5 py-6 sm:px-6">
              {user.image ? (
                <Image src={user.image} alt="" width={64} height={64} unoptimized className="h-16 w-16 rounded-2xl object-cover" />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-900 text-2xl font-bold text-white">{initials}</div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-slate-950">{user.name || "TrailPicker explorer"}</p>
                <p className="truncate text-sm text-slate-500">{user.username ? `@${user.username}` : "No username yet"}</p>
                <p className="mt-1 text-xs text-slate-400">Member since {joined}</p>
              </div>
              <Link href="/profile/edit" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-green-900 hover:bg-emerald-50">
                Edit profile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 border-t border-slate-100 px-5 py-5 sm:grid-cols-2 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email address</p>
                <p className="mt-1 break-all text-sm font-semibold text-slate-800">{user.email}</p>
                <p className="mt-1 text-xs text-slate-500">Managed by your sign-in provider</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sign-in method</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold capitalize text-slate-800"><Fingerprint className="h-4 w-4 text-green-700" />{user.providers.join(", ") || "Connected account"}</p>
                <p className="mt-1 text-xs text-slate-500">No separate TrailPicker password is stored</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-slate-100 p-5 sm:p-6">
              <Link href="/profile/builds" className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 hover:bg-emerald-50">
                <Backpack className="h-5 w-5 text-green-800" /><span><strong className="block text-lg text-slate-950">{user.buildCount}</strong><span className="text-xs text-slate-500">Saved builds</span></span>
              </Link>
              <Link href="/profile/gear" className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 hover:bg-emerald-50">
                <Globe2 className="h-5 w-5 text-green-800" /><span><strong className="block text-lg text-slate-950">{user.gearCount}</strong><span className="text-xs text-slate-500">Owned gear items</span></span>
              </Link>
            </div>
          </section>

          <form action={saveAction} className="space-y-7">
            <section id="preferences" className={`${sectionClass} scroll-mt-8`}>
              <SectionHeading icon={Ruler} title="Measurement preferences" description="Choose how measurements appear. Your stored gear weights, route distances and weather data stay in their original units." />
              <div className="grid gap-5 px-5 py-6 sm:grid-cols-3 sm:px-6">
                <label className="block text-sm font-semibold text-slate-800">
                  Weight
                  <select name="weightUnit" className={selectClass} defaultValue={initialPreferences.weightUnit}>
                    <option value="metric">Metric · kg / g</option>
                    <option value="imperial">Imperial · lb / oz</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-800">
                  Distance
                  <select name="distanceUnit" className={selectClass} defaultValue={initialPreferences.distanceUnit}>
                    <option value="metric">Metric · km</option>
                    <option value="imperial">Imperial · miles</option>
                  </select>
                </label>
                <label className="block text-sm font-semibold text-slate-800">
                  Temperature
                  <select name="temperatureUnit" className={selectClass} defaultValue={initialPreferences.temperatureUnit}>
                    <option value="c">Celsius · °C</option>
                    <option value="f">Fahrenheit · °F</option>
                  </select>
                </label>
              </div>
              <p className="border-t border-slate-100 px-5 py-4 text-xs leading-relaxed text-slate-500 sm:px-6">
                Display units are used in the profile build cards and connected trip weather/summary panels. Trip-entry fields currently remain metric to avoid changing stored calculations.
              </p>
            </section>

            <section id="privacy" className={`${sectionClass} scroll-mt-8`}>
              <SectionHeading icon={Shield} title="Privacy & trip sharing" description="Control how future trips start and what profile visibility preference is stored." />
              <div className="divide-y divide-slate-100 p-2 sm:p-3">
                <ToggleRow
                  name="defaultBuildPublic"
                  title="New builds are public by default"
                  description="When enabled, new trips created while signed in can be opened by anyone with their share link, including route and location details. Existing trips will not be changed. Off is recommended."
                  defaultChecked={initialPreferences.defaultBuildPublic}
                />
                <ToggleRow
                  name="isProfilePublic"
                  title="Public profile preference"
                  description="Remember your choice for future public profile pages. TrailPicker does not currently publish a public profile page, so this setting does not make your profile publicly accessible yet."
                  defaultChecked={user.isProfilePublic}
                />
              </div>
              <div className="flex gap-2.5 border-t border-amber-100 bg-amber-50/60 px-5 py-4 text-xs leading-relaxed text-amber-950 sm:px-6">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                Privacy settings do not override individual builds you have already shared. Review each build's visibility before sharing trip plans.
              </div>
            </section>

            <div className="sticky bottom-3 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 px-5 py-4 shadow-lg backdrop-blur sm:px-6">
              <p role="status" aria-live="polite" className={`flex min-w-0 items-center gap-2 text-sm ${saveState.status === "error" ? "text-red-700" : saveState.status === "success" ? "text-green-800" : "text-slate-500"}`}>
                {saveState.status === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : null}
                {saveState.message || "Changes take effect after you save."}
              </p>
              <button type="submit" disabled={saving} className="rounded-xl bg-green-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800 disabled:cursor-wait disabled:opacity-60">
                {saving ? "Saving…" : "Save settings"}
              </button>
            </div>
          </form>

          <section id="data" className={`${sectionClass} scroll-mt-8`}>
            <SectionHeading icon={Database} title="Your TrailPicker data" description="Take a copy of what you've saved in your account." />
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-6">
              <div className="max-w-xl">
                <p className="font-semibold text-slate-900">Download account data</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">Export a JSON archive of your profile, settings, builds, itinerary days, gear library, favourites and reviews. This archive is for backup/reference, not a one-click import file.</p>
                <p className="mt-2 text-xs text-amber-800">Contains private trip locations, reservations and notes. Store the download somewhere safe.</p>
              </div>
              <a href="/settings/export" className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:border-green-700 hover:text-green-900">
                <ArrowDownToLine className="h-4 w-4" /> Download JSON
              </a>
            </div>
          </section>

          <section id="danger" className={`${sectionClass} scroll-mt-8`}>
            <SectionHeading icon={LockKeyhole} title="Account management" description="Manage your session or permanently close your TrailPicker account." />
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div><p className="text-sm font-semibold text-slate-900">Sign out</p><p className="mt-1 text-sm text-slate-500">End your current TrailPicker session on this device.</p></div>
              <button type="button" onClick={() => signOut({ redirectTo: "/" })} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"><LogOut className="h-4 w-4" />Sign out</button>
            </div>
            <div className="px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-red-800">Delete account</p>
                  <p className="mt-1 max-w-lg text-sm leading-relaxed text-slate-500">Permanently delete your account, saved builds, owned gear list, favourites and reviews. Shared build links will stop working. This cannot be undone.</p>
                </div>
                <button type="button" aria-expanded={deleteOpen} onClick={() => setDeleteOpen(v => !v)} className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />{deleteOpen ? "Cancel" : "Delete account"}
                </button>
              </div>
              {deleteOpen && (
                <form action={deleteAction} className="mt-5 space-y-4 rounded-xl border border-red-200 bg-red-50/50 p-5">
                  <p className="text-sm font-bold text-red-900">This is permanent</p>
                  <p className="text-sm text-red-900">Download your data first if you want a copy. To proceed, type <strong>DELETE MY ACCOUNT</strong>.</p>
                  <label className="block text-sm font-semibold text-red-950">
                    Confirmation phrase
                    <input
                      type="text"
                      name="confirmation"
                      value={confirmation}
                      onChange={e => setConfirmation(e.target.value)}
                      autoComplete="off"
                      spellCheck={false}
                      className="mt-2 block w-full rounded-xl border border-red-300 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-300"
                      placeholder="DELETE MY ACCOUNT"
                    />
                  </label>
                  {deleteState.message && <p role="alert" className="text-sm text-red-800">{deleteState.message}</p>}
                  <button type="submit" disabled={deleting || confirmation !== "DELETE MY ACCOUNT"} className="rounded-xl bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50">
                    {deleting ? "Deleting…" : "Permanently delete my account"}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
