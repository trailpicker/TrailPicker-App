import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile } from "../actions";

export default async function EditProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/api/auth/signin?callbackUrl=/profile/edit");
  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { name: true, username: true, bio: true, location: true, isProfilePublic: true } });
  if (!user) redirect("/profile");
  const input = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15";
  return (
    <div className="max-w-2xl"><p className="text-sm font-semibold text-green-700">Account identity</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Edit profile</h2><p className="mt-2 text-sm text-slate-500">Choose what represents you across TrailPicker.</p>
      <form action={updateProfile} className="mt-6 space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <label className="block text-sm font-semibold text-slate-800">Display name<input name="name" required defaultValue={user.name || ""} className={input} /></label>
        <label className="block text-sm font-semibold text-slate-800">Username<input name="username" defaultValue={user.username || ""} placeholder="minjae" pattern="[A-Za-z0-9_]{3,24}" className={input} /><span className="mt-1 block text-xs font-normal text-slate-500">3–24 letters, numbers, or underscores.</span></label>
        <label className="block text-sm font-semibold text-slate-800">Location<input name="location" defaultValue={user.location || ""} placeholder="Coquitlam, BC" maxLength={80} className={input} /></label>
        <label className="block text-sm font-semibold text-slate-800">Bio<textarea name="bio" defaultValue={user.bio || ""} placeholder="Backpacker, gear optimizer, and weekend trail hunter." maxLength={240} rows={4} className={input} /></label>
        <label className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4"><input type="checkbox" name="isProfilePublic" defaultChecked={user.isProfilePublic} className="mt-1 h-4 w-4 accent-green-800" /><span><span className="block text-sm font-semibold text-slate-900">Public profile</span><span className="mt-0.5 block text-xs text-slate-500">Reserved for public profile pages in a later release.</span></span></label>
        <div className="flex justify-end gap-3"><a href="/profile" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</a><button className="rounded-xl bg-green-900 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800">Save changes</button></div>
      </form>
    </div>
  );
}
