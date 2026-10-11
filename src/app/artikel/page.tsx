import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import ArticleListClient from "@/components/home/ArticleListClient";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Artikel & Insight",
  description:
    "Baca artikel pilihan dari tim HAKASA seputar pendaftaran merek, hak cipta, dan strategi E-Commerce. Insight praktis untuk pemilik brand dan UMKM Indonesia.",
};

/**
 * Halaman daftar artikel — `/artikel`.
 *
 * Server Component: render shell (header, hero section, footer) dan
 * oper data database ke client component `<ArticleListClient />` yang
 * menangani interactivity tab filter.
 */
export default function ArtikelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Breadcrumb />
          <ArticleHeader />

          <Suspense fallback={<ArticleListSkeleton />}>
            <ArticleListContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="transition-colors hover:text-emerald-800">
            Beranda
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-medium text-slate-700" aria-current="page">
          Artikel
        </li>
      </ol>
    </nav>
  );
}

function ArticleHeader() {
  return (
    <div className="mb-10 max-w-2xl sm:mb-12">
      <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-emerald-800 sm:text-sm">
        Blog &amp; Insight
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        Artikel Terbaru dari Tim HAKASA
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
        Insight praktis, panduan step-by-step, dan analisa tren seputar
        perlindungan brand dan strategi E-Commerce di Indonesia.
      </p>
    </div>
  );
}

async function ArticleListContent() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  const articleList = articles.map((article) => ({
    ...article,
    createdAt: article.createdAt.toISOString(),
  }));

  return <ArticleListClient posts={articleList} />;
}

function ArticleListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-xl border border-slate-200 bg-white"
        />
      ))}
    </div>
  );
}
