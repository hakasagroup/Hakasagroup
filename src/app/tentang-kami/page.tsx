import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

export const metadata: Metadata = {
  title: "Tentang Kami | HAKASA Group",
  description:
    "Mengenal lebih dekat HAKASA Group, partner tepercaya Anda dalam perlindungan Kekayaan Intelektual dan eskalasi E-Commerce di Indonesia.",
};

function ShieldCheckIcon() {
  return (
    <svg className="h-6 w-6 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg className="h-6 w-6 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <section className="border-b border-slate-200 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-800 lg:text-5xl">
            Membangun Kepastian Hukum &amp; Skala Bisnis Anda
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
            HAKASA Group hadir sebagai jembatan bagi para pengusaha dan UMKM di Indonesia untuk melindungi identitas merek mereka sekaligus mendominasi pasar digital E-Commerce.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-slate-800">Siapa Kami?</h2>
            <p className="mb-6 leading-relaxed text-slate-600">
              Berbasis di Jakarta, HAKASA Group didirikan dengan satu misi sederhana: mengedukasi dan mendampingi pemilik bisnis agar tidak kehilangan hak atas karya dan merek yang telah mereka bangun dengan susah payah.
            </p>
            <p className="leading-relaxed text-slate-600">
              Kami menyadari bahwa memiliki produk yang bagus saja tidak cukup. Di era persaingan digital yang ketat, legalitas perlindungan Kekayaan Intelektual (DJKI) dan strategi penetrasi ke platform omnichannel seperti Shopee Mall dan TikTok Shop adalah kunci utama keberlanjutan bisnis.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-600 p-10 text-white shadow-xl">
            <h3 className="mb-4 text-2xl font-bold">Visi Kami</h3>
            <p className="mb-8 leading-relaxed text-blue-100">
              Menjadi konsultan legalitas dan E-Commerce nomor satu yang paling mudah diakses oleh UMKM di seluruh Indonesia.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3"><ShieldCheckIcon /><span className="font-medium">Perlindungan Merek Terjamin</span></div>
              <div className="flex items-center gap-3"><TrendingUpIcon /><span className="font-medium">Eskalasi Bisnis E-Commerce</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold text-slate-800">Siap Melindungi Bisnis Anda?</h2>
          <p className="mb-10 text-lg text-slate-600">
            Jangan tunggu sampai merek Anda dibajak kompetitor. Mari diskusi dengan tim HAKASA hari ini.
          </p>
          <Link className="inline-block rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl" href="/layanan">
            Lihat Layanan Kami
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}