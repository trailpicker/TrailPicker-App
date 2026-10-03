import Link from "next/link";

export default function PrivateBuildNotice({ buildId }: { buildId: string }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">This build is private</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">Only the owner can view this build. Sign in with the account that created it to continue.</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(`/build/${buildId}`)}`} className="rounded-lg bg-green-800 px-4 py-3 text-sm font-medium text-white">Sign in</Link>
          <Link href="/build" className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700">Create your own build</Link>
        </div>
      </section>
    </main>
  );
}
