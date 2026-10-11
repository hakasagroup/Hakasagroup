import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

export const metadata: Metadata = {
  title: "Layanan Kami | HAKASA Group",
  description:
    "Solusi lengkap pendaftaran Merek, Hak Cipta, dan setup E-Commerce (Shopee Mall & TikTok Shop) untuk skala bisnis Anda.",
};

const SERVICES = [
  {
    id: "daftar-merek",
    title: "Pendaftaran Merek",
    description:
      "Lindungi identitas brand Anda secara hukum di DJKI Kemenkumham. Termasuk penelusuran dan analisis merek.",
    icon: "®️",
  },
  {
    id: "sanggahan-merek",
    title: "Sanggahan & Oposisi",
    description:
      "Bantuan hukum profesional untuk mengajukan sanggahan atau membalas usulan penolakan dari DJKI.",
    icon: "⚖️",
  },
  {
    id: "daftar-hak-cipta",
    title: "Pendaftaran Hak Cipta",
    description:
      "Amankan karya cipta berupa desain, buku, lagu, atau software dari plagiarisme dengan sertifikat resmi.",
    icon: "©️",
  },
  {
    id: "setup-shopee-mall",
    title: "Setup Shopee Mall",
    description:
      "Layanan end-to-end pembuatan dan optimasi toko official di Shopee Mall atau TikTok Shop.",
    icon: "🛒",
  },
];

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-800 md:text-5xl">
              Solusi <span className="text-emerald-600">Terpadu</span> Bisnis Anda
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Dari perlindungan kekayaan intelektual hingga penetrasi pasar E-Commerce, HAKASA Group hadir sebagai partner strategis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {SERVICES.map((service) => (
              <Link
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                href={`/layanan/${service.id}`}
                key={service.id}
              >
                <div className="absolute right-0 top-0 -z-0 h-32 w-32 rounded-bl-full bg-emerald-50 transition-transform group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="mb-6 text-5xl" aria-hidden="true">{service.icon}</div>
                  <h2 className="mb-3 text-2xl font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
                    {service.title}
                  </h2>
                  <p className="mb-6 leading-relaxed text-slate-600">{service.description}</p>
                  <span className="inline-flex items-center gap-2 font-bold text-emerald-600 transition-all group-hover:gap-3">
                    Pelajari Lebih Lanjut <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="relative mt-20 overflow-hidden rounded-3xl bg-slate-900 p-10 text-center text-white shadow-2xl md:p-16">
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="relative z-10">
              <h3 className="mb-4 text-3xl font-bold">Butuh Konsultasi Khusus?</h3>
              <p className="mx-auto mb-8 max-w-xl text-lg text-slate-300">
                Tim ahli kami siap mendiskusikan kebutuhan legalitas dan strategi E-Commerce yang paling tepat untuk perusahaan Anda.
              </p>
              <a
                href="https://wa.me/6285179986415?text=Halo%20HAKASA,%20saya%20ingin%20konsultasi%20layanan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600"
              >
                💬 Hubungi Konsultan Kami
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}