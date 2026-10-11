import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const instant = false;

export default async function AdminArtikelPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full px-8 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Manajemen Artikel</h1>
          <p className="mt-1 font-medium text-slate-500">Kelola publikasi konten SEO dan edukasi HAKASA.</p>
        </div>
        <Link
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-lg shadow-emerald-600/30 transition-all hover:bg-emerald-700"
          href="/admin/articles/create"
        >
          <span aria-hidden="true">✍️</span> Tulis Artikel Baru
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari judul artikel..."
              className="w-64 rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              aria-label="Cari judul artikel"
            />
            <span className="absolute left-3 top-2.5 text-sm text-slate-400" aria-hidden="true">🔍</span>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-bold text-slate-500">
            Total: {articles.length} Artikel
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-white text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="w-1/2 px-6 py-4">Judul Artikel</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center font-medium text-slate-500">
                    Belum ada artikel yang ditulis.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="group transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="line-clamp-1 text-base font-bold text-slate-800">{article.title}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-slate-400">/{article.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {article.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" /> Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden="true" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <a
                          href={`/artikel/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                          title="Lihat di Web"
                        >
                          👁️
                        </a>
                        <Link
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-orange-50 hover:text-orange-600"
                          href={`/admin/articles/edit/${article.id}`}
                          title="Edit Artikel"
                        >
                          ✏️
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}