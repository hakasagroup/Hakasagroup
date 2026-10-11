"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

type Article = {
  id: string;
  title: string;
  category: string;
  isPublished: boolean;
};

type ArticlesResponse = {
  articles: Article[];
  page: number;
  totalPages: number;
};

export default function AdminArticles() {
  const { status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [error, setError] = useState("");

  const fetchArticles = useCallback(async () => {
    setIsLoadingArticles(true);
    setError("");

    try {
      const res = await fetch(`/api/articles?page=${currentPage}`);
      if (!res.ok) throw new Error("Gagal mengambil artikel");
      const data = (await res.json()) as ArticlesResponse;
      setArticles(data.articles);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch {
      setError("Gagal mengambil artikel.");
    } finally {
      setIsLoadingArticles(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") void fetchArticles();
  }, [status, router, fetchArticles]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;

    const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Gagal menghapus artikel.");
      return;
    }

    void fetchArticles();
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  if (status === "loading") {
    return <p className="p-8 text-center text-slate-500">Memuat data...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">
            Manajemen Artikel
          </h1>
          <div className="flex gap-4">
            <Link
              className="rounded bg-slate-200 px-4 py-2 font-medium text-slate-800 hover:bg-slate-300"
              href="/admin"
            >
              Kembali
            </Link>
            <Link
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              href="/admin/articles/create"
            >
              + Tulis Artikel
            </Link>
          </div>
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b bg-slate-100">
                <th className="p-4 font-semibold text-slate-700">Judul</th>
                <th className="p-4 font-semibold text-slate-700">Kategori</th>
                <th className="p-4 font-semibold text-slate-700">Status</th>
                <th className="p-4 font-semibold text-slate-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 text-sm font-medium">{article.title}</td>
                  <td className="p-4 text-sm">{article.category}</td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        article.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="flex gap-3 p-4">
                    <Link
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      href={`/admin/articles/edit/${article.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => void handleDelete(article.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoadingArticles && articles.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center italic text-slate-500"
                  >
                    Belum ada artikel di database. Silakan buat artikel pertama
                    Anda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow">
          <p className="text-sm text-slate-600">
            Halaman {currentPage} dari {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || isLoadingArticles}
              className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || isLoadingArticles}
              className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}