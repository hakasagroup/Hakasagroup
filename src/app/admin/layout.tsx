import Link from "next/link";
import type { ReactNode } from "react";
import NotificationBell from "./components/NotificationBell";
import prisma from "@/lib/prisma";

// Prisma mengambil data terbaru saat request; layout admin tidak divalidasi
// sebagai navigasi instan agar query uncached dapat menunggu di server.
export const instant = false;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const recentLeads = await prisma.lead.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, createdAt: true },
  });

  const notificationLeads = recentLeads.map((lead) => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
  }));

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="z-20 hidden w-64 flex-shrink-0 flex-col bg-slate-900 text-slate-300 shadow-xl md:flex">
        <div className="flex h-16 items-center border-b border-slate-800 bg-slate-950 px-6">
          <span className="text-xl font-bold tracking-wider text-white">
            HAKASA<span className="text-emerald-500">.</span>
          </span>
        </div>

        <nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto px-4 py-8">
          <div className="mb-4 px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Menu Utama
          </div>

          <Link
            className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2.5 font-medium text-emerald-400 transition-colors"
            href="/admin"
          >
            <span className="text-lg" aria-hidden="true">🏠</span>
            Dashboard
          </Link>
          <Link
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-800 hover:text-white"
            href="/admin/articles"
          >
            <span className="text-lg opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" aria-hidden="true">📝</span>
            Artikel
          </Link>
          <Link
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-800 hover:text-white"
            href="/admin/layanan"
          >
            <span className="text-lg opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" aria-hidden="true">💼</span>
            Layanan
          </Link>
          <Link
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-800 hover:text-white"
            href="/admin/leads"
          >
            <span className="text-lg opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" aria-hidden="true">👥</span>
            Data Leads
          </Link>

          <div className="mb-4 mt-8 block px-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Sistem
          </div>
          <Link
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-800 hover:text-white"
            href="/admin/pengaturan"
          >
            <span className="text-lg opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0" aria-hidden="true">⚙️</span>
            Pengaturan
          </Link>
        </nav>

        <div className="border-t border-slate-800 bg-slate-950 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 font-bold text-white shadow-md">
              AD
            </div>
            <div className="overflow-hidden text-sm">
              <p className="truncate font-medium text-white">Admin HAKASA</p>
              <p className="truncate text-xs text-slate-400">Superadmin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Area konten utama */}
      <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button
              className="text-xl text-slate-500 hover:text-slate-700 md:hidden"
              type="button"
              aria-label="Buka menu navigasi"
            >
              ☰
            </button>
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Cari data klien atau artikel..."
                className="w-72 rounded-lg border-transparent bg-slate-100 py-2 pl-9 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                aria-label="Cari data klien atau artikel"
              />
              <span className="absolute left-3 top-2 text-slate-400" aria-hidden="true">🔍</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <NotificationBell recentLeads={notificationLeads} />
            <Link
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100 hover:text-emerald-800"
              href="/"
              target="_blank"
            >
              Lihat Web ↗
            </Link>
          </div>
        </header>

        <div className="relative flex-1 overflow-auto bg-slate-50 pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}