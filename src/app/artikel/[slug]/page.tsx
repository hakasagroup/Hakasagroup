import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import LeadMagnet from "@/components/LeadMagnet";
import TableOfContents from "@/components/TableOfContents";

function calculateReadingTime(content: string): string {
  if (!content) return "1 menit";

  const wordsPerMinute = 200;
  // Hapus tag HTML jika konten berupa rich text.
  const textContent = content.replace(/<[^>]*>?/gm, " ");
  const words = textContent.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} menit`;
}

/**
 * Generate metadata per-artikel (title, description, OG) untuk SEO.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.article.findUnique({ where: { slug } });

  if (!post) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  return {
    title: `${post.title} | HAKASA Blog`,
    description: post.metaDesc || post.excerpt || "Baca artikel terbaru dari HAKASA Group.",
    keywords: post.keywords || "HAKASA Group, Konsultan Merek, E-Commerce",
    openGraph: {
      title: post.title,
      description: post.metaDesc || post.excerpt || "Baca artikel terbaru dari HAKASA Group.",
      url: `https://hakasagroup.com/artikel/${post.slug}`,
      siteName: "HAKASA Group",
      locale: "id_ID",
      type: "article",
      images: post.image ? [post.image] : [],
    },
  };
}

/**
 * Halaman baca artikel — `/artikel/[slug]`.
 * Server Component async yang me-resolve `params`, lalu UI rendering
 * dipisah ke `<BlogPostContent />` (menerima `post` sebagai prop) dan
 * dibungkus `<Suspense>` agar konsisten dengan best practice PPR.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Jangan `await params` di sini — Next.js 16 mewajibkan akses ke
  // data URL (params) berada DI DALAM `<Suspense>`.
  // Kita teruskan `params` (Promise) ke child component yang dibungkus
  // Suspense, dan child tersebut yang akan me-await.
  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-8 h-10 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
async function BlogPostContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.article.findUnique({
    where: { slug, isPublished: true },
  });

  if (!post) {
    notFound();
  }

  const relatedArticles = await prisma.article.findMany({
    where: {
      category: post.category,
      id: { not: post.id },
      isPublished: true,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const articleUrl = `https://hakasagroup.com/artikel/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const encodedArticleUrl = encodeURIComponent(articleUrl);
  const shareText = encodeURIComponent(`${post.title} - ${articleUrl}`);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-slate-50">
        <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
              <li>
                <Link
                  href="/artikel"
                  className="transition-colors hover:text-blue-600"
                >
                  Artikel
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/artikel?q=${encodeURIComponent(post.category)}`}
                  className="transition-colors hover:text-blue-600"
                >
                  {post.category}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                className="max-w-[200px] truncate font-medium text-slate-800 md:max-w-[400px]"
                aria-current="page"
              >
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Hero Image (opsional).
           * Ditampilkan dengan aspect ratio 16:9, kredit foto kecil
           * di pojok kanan bawah. Jika `post.image` tidak diisi,
           * section ini di-skip. */}
          {post.image && (
            <figure className="mb-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element -- Gambar
                  artikel bersumber dari CDN eksternal (Unsplash); tidak
                  perlu optimasi Next.js Image. */}
              <img
                src={post.image}
                alt={post.title}
                className="aspect-video w-full object-cover"
              />
            </figure>
          )}

          {/* Judul */}
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl md:text-5xl">
            {post.title}
          </h1>

          {/* Meta: Category + Date + Reading Time */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center rounded-full bg-emerald-800/10 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              {post.category}
            </span>
            <time dateTime={post.createdAt.toISOString()} className="font-medium text-slate-500">
              {new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(post.createdAt)}
            </time>
            <span className="flex items-center gap-1">
              <span aria-hidden="true">⏱️</span>
              Waktu baca: {calculateReadingTime(post.content)}
            </span>
          </div>

          {/* Excerpt sebagai lead/intro */}
          <p className="mb-10 text-base leading-relaxed text-slate-700 sm:text-lg">
            {post.excerpt}
          </p>

          {/* Table of Contents */}
          <TableOfContents content={post.content} />

          {/* Konten Utama Artikel */}
          <div
            id="article-content"
            className="prose prose-lg prose-slate mb-12 max-w-none prose-headings:text-slate-800 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <LeadMagnet source={`Artikel: ${post.title}`} />

          {/* Tombol Share */}
          <div className="mt-12 border-y border-slate-200 py-6">
            <h4 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-slate-700">
              Bagikan Artikel Ini
            </h4>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href={`https://api.whatsapp.com/send?text=${shareText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-500 px-5 py-2 font-medium text-white transition hover:bg-green-600"
              >
                📱 WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedArticleUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                💼 LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodedArticleUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-800 px-5 py-2 font-medium text-white transition hover:bg-black"
              >
                🐦 X / Twitter
              </a>
            </div>
          </div>
        </article>

        {relatedArticles.length > 0 && (
          <section className="mx-auto w-full max-w-3xl border-t border-slate-200 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              Baca Juga Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/artikel/${relatedArticle.slug}`}
                  className="group block"
                >
                  <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md">
                    <span className="mb-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      {relatedArticle.category}
                    </span>
                    <h3 className="mb-3 line-clamp-2 text-lg font-bold text-slate-800 transition group-hover:text-emerald-800">
                      {relatedArticle.title}
                    </h3>
                    <p className="mt-auto line-clamp-2 text-sm text-slate-600">
                      {relatedArticle.excerpt ?? "Baca selengkapnya mengenai artikel ini."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto mt-16 w-full max-w-5xl rounded-2xl bg-slate-900 p-8 text-center shadow-xl md:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            Butuh Bantuan Legalitas atau E-Commerce?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            HAKASA Group siap membantu Anda mulai dari pendaftaran Merek, Hak
            Cipta, hingga optimasi toko di Shopee Mall dan TikTok Shop.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              className="rounded-full bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
              href="/layanan"
            >
              Lihat Layanan Kami
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

