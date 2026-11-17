export default function DiscoverLoading() {
  return <main aria-busy="true" aria-label="Loading Discover" className="mx-auto max-w-screen-2xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
    <div className="h-9 w-56 rounded-xl bg-slate-200"/><div className="mt-3 h-5 w-72 max-w-full rounded bg-slate-200"/>
    <div className="mt-9 h-32 rounded-2xl bg-slate-200"/>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({length:6},(_,i)=><div key={i} className="h-64 rounded-2xl bg-slate-200"/>)}</div>
  </main>;
}
