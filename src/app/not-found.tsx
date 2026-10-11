import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Halaman Tidak Ditemukan",
  description:
    "Halaman yang Anda cari tidak ditemukan di situs HAKASA Group.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col">
      {/* Header minimal */}
      <header className="border-b border-slate-200 bg-white py-4">
        <div className="mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-emerald-800 sm:text-2xl"
          >
            HAKASA
          </Link>
        </div>
      </header>

      {/* 404 Content */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl font-bold text-emerald-900 sm:text-8xl" aria-hidden="true">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold text-slate-800 sm:text-3xl">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-2 max-w-md text-base text-slate-600 sm:text-lg">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak
          lagi tersedia.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 py-3 px-6 text-base font-medium text-white transition-colors hover:bg-emerald-800 sm:text-lg"
        >
          <svg
            className="h-5 w-5"
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
      </main>
    </div>
  );
}
