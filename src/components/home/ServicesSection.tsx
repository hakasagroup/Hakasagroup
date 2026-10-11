"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import FAQSection, { FAQ_CATEGORY_MAP } from "@/components/home/FAQSection";

type Tab = "merek" | "cipta" | "ecommerce";

const TABS: { id: Tab; label: string }[] = [
  { id: "merek", label: "HKI Merek" },
  { id: "cipta", label: "HKI Hak Cipta" },
  { id: "ecommerce", label: "E-Commerce" },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<Tab>("merek");

  const filtered = SERVICES.filter((s) => s.category === activeTab);

  return (
    <>
      <section id="layanan" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-emerald-800 sm:text-sm">
              Layanan Utama
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Solusi Lengkap untuk Brand &amp; Toko Online Anda
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Mulai dari perlindungan hukum hingga perluasan pasar — semua
              ditangani tim profesional HAKASA secara end-to-end.
            </p>
          </div>

          {/* 3 Tab Toggle */}
          <div className="mb-10 flex justify-center">
            <div className="inline-flex rounded-xl bg-slate-100 p-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                  className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Service List — Row Layout */}
          <div
            className="mx-auto max-w-4xl"
            role="tabpanel"
            aria-label={
              activeTab === "merek"
                ? "Layanan HKI Merek"
                : activeTab === "cipta"
                ? "Layanan HKI Hak Cipta"
                : "Layanan E-Commerce"
            }
          >
            <div className="flex flex-col gap-3">
              {filtered.map((service) => (
                <Link
                  key={service.slug}
                  href={`/layanan/${service.slug}`}
                  className="group flex w-full items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 text-left transition-all hover:border-emerald-500 hover:shadow-sm sm:p-6"
                >
                  {/* Left: checkmark icon + title */}
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <svg
                        className="h-4 w-4 text-emerald-700"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="text-base font-medium text-slate-800 sm:text-lg">
                      {service.title}
                    </span>
                  </div>

                  {/* Right: arrow */}
                  <span className="flex-shrink-0 text-slate-400 transition-colors group-hover:text-emerald-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ Dinamis Berdasarkan Tab Aktif ===
       * - Mapping kategori tab (merek/cipta/ecommerce) ke kategori FAQ
       *   dilakukan via `FAQ_CATEGORY_MAP` agar penamaan tetap eksplisit.
       * - FAQ di-render sebagai section terpisah (bukan nested di dalam
       *   <section id="layanan">) untuk HTML yang valid dan struktur
       *   semantik yang lebih bersih.
       */}
      <FAQSection category={FAQ_CATEGORY_MAP[activeTab]} />
    </>
  );
}
