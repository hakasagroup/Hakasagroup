import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { getServiceBySlug, SERVICES } from "@/data/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

/**
 * Pre-render semua halaman detail layanan sebagai static content
 * (sesuai strategi Static Generation Next.js 16).
 *
 * Best practice: kembalikan array `{ slug }` agar setiap slug
 * di-baked ke static HTML saat build — tidak ada runtime
 * resolution params yang bisa muncul sebagai warning.
 */
export function generateStaticParams() {
  const aliases = ["pendaftaran-merek", "sanggahan-oposisi", "hak-cipta"];

  return [
    ...SERVICES.map((service) => ({ slug: service.slug })),
    ...aliases.map((slug) => ({ slug })),
  ];
}

/**
 * Generate metadata per-layanan (title, description, OG) untuk SEO.
 * Dipanggil saat build untuk setiap slug dari `generateStaticParams`.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | HAKASA Group`,
      description: service.description,
      url: `https://hakasagroup.com/layanan/${service.slug}`,
      siteName: "HAKASA Group",
      locale: "id_ID",
      type: "article",
    },
  };
}

/**
 * Halaman detail layanan — `/layanan/[slug]`.
 * Untuk: pendaftaran-merek, sanggahan-oposisi, hak-cipta, setup-mall.
 *
 * Catatan arsitektur (Next.js 16):
 * - Halaman ini adalah Server Component async yang me-resolve `params`.
 * - Untuk menghindari warning "URL data outside of Suspense" di runtime,
 *   resolution `params` dilakukan di sini, lalu UI rendering dipisah ke
 *   `<ServiceDetailContent />` yang menerima data `service` sebagai prop
 *   (sudah resolved, tidak perlu await lagi).
 * - Output dibungkus `<Suspense>` agar UI bisa di-stream saat Next.js
 *   melakukan partial prerendering (PPR) untuk path non-prerender.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Jangan `await params` di sini — karena Next.js 16 mewajibkan
  // setiap akses ke data URL (params) berada DI DALAM `<Suspense>`.
  // Kita teruskan `params` (yang merupakan Promise) ke child component
  // yang dibungkus Suspense, dan child tersebut yang akan me-await.
  return (
    <Suspense fallback={<ServiceDetailSkeleton />}>
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}

/**
 * Loading skeleton yang ditampilkan saat Suspense boundary menunggu
 * data di-resolve. Untuk halaman static-prerendered, ini jarang muncul.
 */
function ServiceDetailSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-8 h-10 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200" />
        </div>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Komponen async yang me-await `params` DI DALAM Suspense boundary.
 * Di sinilah `await params` terjadi — setelah Suspense membungkus,
 * sehingga Next.js 16 tidak mengeluh "URL data outside of Suspense".
 */
async function ServiceDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // URL WhatsApp: "saya siap memproses layanan [Judul]"
  const whatsappUrl = buildWhatsAppUrl(
    `Halo tim HAKASA, saya siap memproses layanan ${service.title}.`,
  );
  const relatedServices = SERVICES.filter((item) => item.slug !== service.slug).slice(
    0,
    3,
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50">
        <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-emerald-800">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/#layanan"
                  className="transition-colors hover:text-emerald-800"
                >
                  Layanan
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-slate-700" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>

          {/* Judul */}
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl md:text-5xl">
            {service.title}
          </h1>

          {/* Deskripsi */}
          <p className="mb-12 text-base leading-relaxed text-slate-600 sm:text-lg">
            {service.description}
          </p>


          {/* === BODY KONTEN LAYANAN (rich HTML) === */}
          {service.content ? (
            // Service memiliki field `content` (rich HTML Tailwind) —
            // render penuh dengan `dangerouslySetInnerHTML` agar styling
            // class Tailwind di dalam string HTML diterapkan.
            // Lebar container mengikuti wrapper `max-w-4xl mx-auto`
            // di level <article>, sehingga area baca tetap nyaman.
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          ) : (
            // Fallback: layout lama berbasis features/requirements/process
            // (dipakai service yang belum punya field `content`).
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Card 1: Syarat Kelengkapan Dokumen */}
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800/10 text-emerald-800"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="15" y2="17" />
                    </svg>
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Syarat Kelengkapan Dokumen
                  </h2>
                </div>

                <ul className="space-y-3">
                  {service.requirements.map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                    >
                      <svg
                        className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-800"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>


              {/* Card 2: Alur Kerja Kami (numbered list) */}
              <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800/10 text-emerald-800"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 11 12 14 22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    Alur Kerja Kami
                  </h2>
                </div>

                <ol className="space-y-4">
                  {service.process.map((step, idx) => (
                    <li
                      key={step}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-600 sm:text-base"
                    >
                      <span
                        className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm"
                        aria-hidden="true"
                      >
                        {idx + 1}
                      </span>
                      <span className="pt-0.5 sm:pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          )}


          {/* === TOMBOL KONSULTASI WHATSAPP (untuk service yang punya rich `content`) === */}
          {service.content && (() => {
            // Pemetaan slug → teks tombol agar CTA tetap presisi
            // untuk service yang di-migrasi, dengan fallback generik.
            const ctaLabel: Record<string, string> = {
              "daftar-merek": "Konsultasi Merek via WhatsApp",
              "sanggahan-merek": "Konsultasi Sanggahan Merek via WhatsApp",
            };
            const label = ctaLabel[service.slug]
              ?? `Konsultasi ${service.title} via WhatsApp`;
            return (
              <div className="mt-12">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-500 px-6 py-5 text-base font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/30 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 sm:text-lg"
                >
                  <svg
                    className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110 sm:h-7 sm:w-7"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span>{label}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 transition-transform group-hover:translate-x-1 sm:h-6 sm:w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <p className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
                  Balasan cepat pada jam kerja · Konsultasi awal gratis · Tanpa komitmen.
                </p>
              </div>
            );
          })()}

          {/* Rekomendasi layanan lain */}
          <section className="mt-16 border-t border-slate-200 pt-10">
            <h2 className="mb-6 text-center text-xl font-bold text-slate-800 sm:text-2xl">
              Jelajahi Layanan Kami Lainnya
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/layanan/${relatedService.slug}`}
                  className="group flex min-h-32 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center transition hover:shadow-md"
                >
                  <span className="mb-2 text-2xl" aria-hidden="true">
                    {relatedService.category === "ecommerce" ? "🛒" : "©️"}
                  </span>
                  <h3 className="font-bold text-slate-700 transition group-hover:text-emerald-700">
                    {relatedService.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>


          {/* Link kembali ke daftar layanan */}
          <div className="mt-10 text-center">
            <Link
              href="/#layanan"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-800 transition-colors hover:text-emerald-900"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Lihat layanan lainnya
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

