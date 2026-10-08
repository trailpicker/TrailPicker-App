"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Menu, Tent, X } from "lucide-react";

type Category = { id: string; name: string; slug: string; subcategories: { id: string; name: string; slug: string }[] };
const links = [{ name: "Marketplace", href: "/marketplace" }, { name: "Community", href: "/community" }, { name: "Guides", href: "/guide" }];

export default function NavbarNavigation({ builderHref, categories, account }: {
  builderHref: string; categories: Category[]; account: ReactNode;
}) {
  const [panel, setPanel] = useState<"gear" | "mobile" | null>(null);
  const [mobileGear, setMobileGear] = useState(false);
  const [selectedId, setSelectedId] = useState(categories[0]?.id ?? "");
  const selected = categories.find(category => category.id === selectedId) ?? categories[0];
  const headerRef = useRef<HTMLElement>(null);
  const gearRef = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function close() { setPanel(null); setMobileGear(false); }
  useEffect(() => { setPanel(null); setMobileGear(false); }, [pathname]);
  useEffect(() => {
    if (!panel) return;
    function outside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) close();
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPanel(null); setMobileGear(false);
        (panel === "gear" ? gearRef : mobileRef).current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, [panel]);
  useEffect(() => {
    // Close the old surface when crossing the desktop/mobile breakpoint.
    const breakpoint = window.matchMedia("(min-width: 1280px)");
    const reset = () => { setPanel(null); setMobileGear(false); };
    breakpoint.addEventListener("change", reset);
    return () => breakpoint.removeEventListener("change", reset);
  }, []);

  const navLink = "rounded-md px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  const categoriesPanel = <div className="grid sm:grid-cols-[220px_minmax(0,1fr)]">
    <div className="border-b border-gray-200 bg-gray-50 p-3 sm:border-b-0 sm:border-r">
      <p className="px-3 pb-3 pt-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Shop by category</p>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-1">
        {categories.map(category => <button key={category.id} type="button" onClick={() => setSelectedId(category.id)} onFocus={() => setSelectedId(category.id)}
          aria-pressed={selected?.id === category.id}
          className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${selected?.id === category.id ? "bg-green-900 text-white" : "text-gray-700 hover:bg-green-100"}`}>
          {category.name}<ChevronRight size={16} className="shrink-0" />
        </button>)}
      </div>
    </div>
    <div className="min-w-0 p-5 sm:p-6">
      {selected ? <>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold text-gray-900">{selected.name}</h2>
          <Link href={`/gear/${encodeURIComponent(selected.slug)}`} onClick={close} className="rounded-lg border border-green-800 px-3 py-2 text-xs font-semibold text-green-900 hover:bg-green-50">Browse {selected.name.toLowerCase()}</Link>
        </div>
        <div className="grid gap-1 md:grid-cols-2">
          {selected.subcategories.map(subcategory => <Link key={subcategory.id} href={`/gear/${encodeURIComponent(selected.slug)}/${encodeURIComponent(subcategory.slug)}`} onClick={close}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-900 focus-visible:outline-2 focus-visible:outline-green-800">
            {subcategory.name}<ChevronRight size={16} className="shrink-0 text-gray-400" />
          </Link>)}
        </div>
        {!selected.subcategories.length && <p className="text-sm text-gray-500">Browse this category to see its gear.</p>}
      </> : <p className="text-sm text-gray-500">No gear categories yet.</p>}
    </div>
  </div>;

  return <header ref={headerRef} className="sticky top-0 z-50 bg-green-900 text-white shadow-md">
    <div className="mx-auto flex h-16 max-w-[110rem] items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
      <Link href="/" onClick={close} className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight sm:text-2xl"><Tent className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />TrailPicker</Link>
      <nav aria-label="Main navigation" className="ml-auto hidden items-center gap-1 xl:flex">
        <Link href={builderHref} onClick={close} className={navLink}>Builder</Link>
        <button ref={gearRef} type="button" onClick={() => setPanel(panel === "gear" ? null : "gear")} aria-expanded={panel === "gear"} aria-controls="gear-navigation" className={`${navLink} flex items-center gap-1.5`}>Gear<ChevronDown size={16} className={panel === "gear" ? "rotate-180" : ""} /></button>
        {links.map(link => <Link key={link.href} href={link.href} onClick={close} className={navLink}>{link.name}</Link>)}
      </nav>
      <div className="ml-auto shrink-0 xl:ml-3">{account}</div>
      <button ref={mobileRef} type="button" onClick={() => { setPanel(panel === "mobile" ? null : "mobile"); setMobileGear(false); }} aria-label={panel === "mobile" ? "Close navigation" : "Open navigation"} aria-expanded={panel === "mobile"} aria-controls="mobile-navigation" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-green-800 xl:hidden">
        {panel === "mobile" ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
    {panel === "gear" && <div id="gear-navigation" className="absolute inset-x-0 top-full hidden border-b border-gray-200 bg-white text-gray-900 shadow-xl xl:block">
      <div className="mx-auto max-h-[calc(100dvh-80px)] max-w-5xl overflow-y-auto">{categoriesPanel}</div>
    </div>}
    {panel === "mobile" && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-full max-h-[calc(100dvh-80px)] overflow-y-auto border-b border-green-800 bg-green-900 shadow-xl xl:hidden">
      <div className="space-y-1 p-3">
        <Link href={builderHref} onClick={close} className={`${navLink} block`}>Builder</Link>
        <button type="button" onClick={() => setMobileGear(!mobileGear)} aria-expanded={mobileGear} aria-controls="mobile-gear-navigation" className={`${navLink} flex w-full items-center justify-between`}>Gear<ChevronDown size={16} className={mobileGear ? "rotate-180" : ""} /></button>
        {mobileGear && <div id="mobile-gear-navigation" className="overflow-hidden rounded-xl bg-white text-gray-900">{categoriesPanel}</div>}
        {links.map(link => <Link key={link.href} href={link.href} onClick={close} className={`${navLink} block`}>{link.name}</Link>)}
      </div>
    </nav>}
  </header>;
}
