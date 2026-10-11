"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Lead = {
  id: string;
  name: string;
  createdAt: string;
};

export default function NotificationBell({ recentLeads }: { recentLeads: Lead[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 transition-colors hover:text-emerald-600 focus:outline-none"
        aria-label="Notifikasi"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className="text-xl" aria-hidden="true">🔔</span>
        {recentLeads.length > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-orange-500" />
        )}
      </button>

      {isOpen && (
        <div
          className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-200/50 duration-200"
          role="menu"
        >
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
            <h3 className="text-sm font-bold text-slate-800">Notifikasi Terbaru</h3>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
              {recentLeads.length} Baru
            </span>
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {recentLeads.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                Belum ada notifikasi baru.
              </div>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="border-b border-slate-50 px-4 py-3 transition-colors hover:bg-slate-50">
                  <p className="text-sm font-medium text-slate-800">
                    🎉 Prospek baru dari <span className="font-bold text-emerald-600">{lead.name}</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(lead.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-100 p-2">
            <Link
              href="/admin/leads"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-lg py-2 text-center text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
            >
              Lihat Semua Data Leads →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}