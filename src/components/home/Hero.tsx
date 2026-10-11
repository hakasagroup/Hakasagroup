import Link from "next/link";
import { DEFAULT_CONSULTATION_URL } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-slate-50"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        {/* Eyebrow / Label kecil */}
        <span className="mb-4 inline-flex items-center rounded-full border border-emerald-800/20 bg-emerald-800/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-800 sm:text-sm">
          Jasa Legalitas & E-Commerce
        </span>

        {/* Headline */}
        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
          Solusi Legalitas & Skala Bisnis{" "}
          <span className="text-emerald-800">E-Commerce</span> Anda
        </h1>

        {/* Subheadline */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          HAKASA melayani pendaftaran Merek, Hak Cipta, hingga pembuatan dan
          optimasi Shopee/TikTok Mall dengan transparan dan terpercaya.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={DEFAULT_CONSULTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
          >
            Hubungi Kami
          </a>
          <Link
            href="#layanan"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-7 py-3 text-base font-semibold text-slate-700 shadow-sm transition-colors hover:border-emerald-800 hover:text-emerald-800"
          >
            Lihat Layanan
          </Link>
        </div>

        {/* Trust indicator sederhana */}
        <p className="mt-10 text-xs text-slate-500 sm:text-sm">
          Dipercaya oleh puluhan UMKM & brand lokal di Indonesia.
        </p>
      </div>
    </section>
  );
}
