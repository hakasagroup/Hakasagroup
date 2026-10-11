"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal mengambil kategori");
      setCategories(data);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Gagal mengambil kategori");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) return;
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal membuat kategori");
      setName("");
      await fetchCategories();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Gagal membuat kategori");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus kategori ini?")) return;
    setError("");
    try {
      const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Gagal menghapus");
      }
      await fetchCategories();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Gagal menghapus");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Kategori</h1>
          <Link className="rounded bg-slate-200 px-4 py-2 font-medium text-slate-800 hover:bg-slate-300" href="/admin">
            Kembali
          </Link>
        </div>

        <div className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow">
          <form onSubmit={handleAdd} className="flex items-end gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-semibold text-slate-700">Nama Kategori Baru</label>
              <input type="text" className="w-full rounded border border-slate-300 p-2.5 focus:ring-2 focus:ring-blue-500" value={name} onChange={(event) => setName(event.target.value)} placeholder="Contoh: Tips Bisnis" required />
            </div>
            <button type="submit" disabled={isSaving} className="rounded bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60">
              {isSaving ? "Menambahkan..." : "Tambah"}
            </button>
          </form>
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow">
          <table className="w-full text-left">
            <thead className="border-b bg-slate-100">
              <tr><th className="p-4 font-semibold text-slate-700">Nama Kategori</th><th className="w-24 p-4 font-semibold text-slate-700">Aksi</th></tr>
            </thead>
            <tbody>
              {isLoading ? <tr><td className="p-4 text-slate-500" colSpan={2}>Memuat kategori...</td></tr> : categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-slate-50">
                  <td className="p-4 font-medium">{category.name}</td>
                  <td className="p-4"><button onClick={() => void handleDelete(category.id)} className="text-sm font-medium text-red-600 hover:text-red-800">Hapus</button></td>
                </tr>
              ))}
              {!isLoading && categories.length === 0 && <tr><td className="p-4 text-slate-500" colSpan={2}>Belum ada kategori.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}