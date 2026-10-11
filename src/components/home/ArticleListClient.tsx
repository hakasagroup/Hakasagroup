"use client";

import { useState } from "react";
import Link from "next/link";

type ArticleListItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  image: string | null;
  excerpt: string | null;
  content: string;
  isPublished: boolean;
  createdAt: string;
};

type ActiveFilter = string;

interface ArticleListClientProps {
  posts: ArticleListItem[];
}

function filterPostsByCategory(
  posts: ArticleListItem[],
  category: ActiveFilter,
) {
  if (category === "Semua") return posts;
  return posts.filter((post) => post.category === category);
}

/**
 * Client component untuk halaman /artikel.
 * Menangani state filter kategori (Semua / Merek / Hak Cipta) dan
 * me-render card sesuai kategori aktif.
 *
 * Dipisah sebagai client component karena butuh `useState` untuk
 * tab interaktif. Server Component parent (`page.tsx`) tetap
 * static-prerendered dan mengirim seluruh data artikel sebagai prop.
 */
export default function ArticleListClient({ posts }: ArticleListClientProps) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const searchedPosts = normalizedSearchQuery
    ? posts.filter((post) =>
        `${post.title} ${post.content}`.toLowerCase().includes(normalizedSearchQuery),
      )
    : posts;
  const visiblePosts = filterPostsByCategory(searchedPosts, activeFilter);
  const totalCount = posts.length;
  const visibleCount = visiblePosts.length;

  // Kategori berasal dari artikel yang dikirim server, bukan daftar hardcode.
  const dynamicCategories = Array.from(
    new Set(posts.map((post) => post.category.trim()).filter(Boolean)),
  );
  const tabs: ActiveFilter[] = ["Semua", ...dynamicCategories];

  return (
    <div>
      {/* === Live Search === */}
      <div className="mx-auto mb-8 max-w-xl">
        <label htmlFor="article-search" className="sr-only">
          Cari artikel
        </label>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            🔍
          </span>
          <input
            id="article-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari artikel tentang Merek, Hak Cipta..."
            className="w-full rounded-full border border-slate-300 bg-white p-4 pl-12 pr-14 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl leading-none text-slate-400 transition-colors hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* === Tab Filter === */}
      <div
        role="tablist"
        aria-label="Filter kategori artikel"
        className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      >
        {tabs.map((tab) => {
          const isActive = activeFilter === tab;
          const count =
            tab === "Semua" ? totalCount : filterPostsByCategory(posts, tab).length;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(tab)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all sm:text-base ${
                isActive
                  ? "border-emerald-800 bg-emerald-800 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-800 hover:text-emerald-800"
              }`}
            >
              <span>{tab}</span>
              <span
                className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
                aria-hidden="true"
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* === Daftar Card (filtered) === */}
      {visibleCount === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-600 sm:text-base">
            {normalizedSearchQuery
              ? `Tidak ada artikel yang cocok dengan pencarian “${searchQuery}”.`
              : `Belum ada artikel di kategori ${activeFilter}.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Card individual untuk satu artikel. Dipakai di listing.
 * Tetap server-friendly (tidak butuh interactivity) sehingga aman
 * untuk dipanggil dari client component.
 */
function ArticleCard({ post }: { post: ArticleListItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-800/40 hover:shadow-md">
      {/* Featured image (opsional).
       * Ditampilkan sebagai thumbnail dengan aspect ratio 16:9.
       * Jika `post.image` tidak diisi, kartu tidak menampilkan
       * area gambar (tetap rapi dengan padding). */}
      {post.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element -- Gambar artikel
              bersumber dari CDN eksternal (Unsplash) dengan URL yang sudah
              diparameterisasi; tidak perlu optimasi Next.js Image. */}
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Category badge + date */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center rounded-full bg-emerald-800/10 px-2.5 py-0.5 font-bold uppercase tracking-wider text-emerald-800">
            {post.category}
          </span>
          <time dateTime={post.createdAt} className="font-medium text-slate-500">
            {new Intl.DateTimeFormat("id-ID", {
              month: "long",
              year: "numeric",
            }).format(new Date(post.createdAt))}
          </time>
        </div>

        {/* Judul */}
        <h2 className="mb-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-800 sm:text-xl">
          <Link href={`/artikel/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
          {post.excerpt ?? "Baca selengkapnya mengenai artikel ini."}
        </p>

        {/* CTA Baca */}
        <Link
          href={`/artikel/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-900"
        >
          Baca Selengkapnya
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
        </Link>
      </div>
    </article>
  );
}
