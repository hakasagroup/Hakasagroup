import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

interface LegalPageProps {
  /** Judul halaman (akan jadi <h1> & title metadata). */
  title: string;
  /** Tanggal "Terakhir diperbarui" — opsional, tampil di bawah judul. */
  lastUpdated?: string;
  /** Paragraf intro opsional di bawah judul, sebelum section pertama. */
  intro?: string;
  /** Section-section isi halaman (biasanya <LegalSection>). */
  children: React.ReactNode;
  /**
   * Jika `true`, semua paragraf di-intro dan section-content akan
   * ter-align `text-justify` (rata kiri-kanan). Default `false`
   * untuk backward-compat.
   */
  justify?: boolean;
}

/**
 * Shell seragam untuk semua halaman legal HAKASA:
 * - Header + Footer
 * - Breadcrumb Beranda / [Judul]
 * - Judul + last updated + intro (opsional)
 * - Slot untuk konten section
 *
 * Mirip dengan layout halaman statis lain (tentang-kami, detail layanan)
 * untuk konsistensi visual & navigasi.
 */
export default function LegalPage({
  title,
  lastUpdated,
  intro,
  children,
  justify = false,
}: LegalPageProps) {
  // ClassName tambahan ketika mode justify aktif
  const justifyClass = justify ? "text-justify" : "";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50">
        <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-emerald-800"
                >
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-medium text-slate-700" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          {/* Header Halaman */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {lastUpdated && (
              <p className="mt-3 text-sm italic text-slate-500">
                Terakhir diperbarui: {lastUpdated}
              </p>
            )}
          </header>

          {/* Intro opsional */}
          {intro && (
            <p
              className={`mb-2 text-base leading-relaxed text-slate-700 sm:text-lg ${justifyClass}`.trim()}
            >
              {intro}
            </p>
          )}

          {/* Konten halaman (section-section) */}
          <div className={justifyClass}>{children}</div>

          {/* Link kembali ke Beranda */}
          <div className="mt-12 border-t border-slate-200 pt-8 text-center">
            <Link
              href="/"
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
              Kembali ke Beranda
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Helper paragraf dengan styling konsisten untuk konten legal.
 * Pakai className ini untuk <p> di dalam section agar tipografi seragam.
 */
export function LegalParagraph({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-base leading-relaxed text-slate-700 ${className}`.trim()}
    >
      {children}
    </p>
  );
}
