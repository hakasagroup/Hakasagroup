"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// Dynamic import untuk Jodit Editor agar aman di Next.js (SSR false)
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type ArticleForm = {
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
  metaDesc: string;
  keywords: string;
  isPublished: boolean;
};

type ImageInputMode = "url" | "upload";

type Category = {
  id: string;
  name: string;
};

export default function CreateArticle() {
  const router = useRouter();
  const editor = useRef(null);
  const [form, setForm] = useState<ArticleForm>({
    title: "",
    slug: "",
    category: "",
    image: "",
    excerpt: "",
    metaDesc: "",
    keywords: "",
    isPublished: true,
  });
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<ImageInputMode>("url");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) return;
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setForm((currentForm) =>
            currentForm.category
              ? currentForm
              : { ...currentForm, category: data[0].name },
          );
        }
      } catch {
        // Kategori tetap menampilkan fallback jika API tidak tersedia.
      }
    };

    void fetchCategories();
  }, []);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Ketik isi artikel di sini...",
      height: 400,
    }),
    [],
  );

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengunggah gambar");
      }

      setForm((currentForm) => ({ ...currentForm, image: result.url }));
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Gagal mengunggah gambar.",
      );
      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    if (!form.image) {
      setError("Silakan masukkan URL atau unggah gambar terlebih dahulu.");
      setIsSaving(false);
      return;
    }

    const excerpt = content
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 150);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          content,
          excerpt: excerpt ? `${excerpt}...` : null,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan artikel");
      router.push("/admin/articles");
      router.refresh();
    } catch {
      setError("Gagal menyimpan artikel.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">
          Tulis Artikel Baru
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Judul Artikel
              </label>
              <input
                type="text"
                required
                className="w-full rounded border border-slate-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  })
                }
                placeholder="Contoh: Pentingnya Daftar Merek"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Slug (URL)
              </label>
              <input
                type="text"
                required
                readOnly
                className="w-full rounded border border-slate-300 bg-slate-100 p-2.5"
                value={form.slug}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Kategori
              </label>
              <select
                className="w-full rounded border border-slate-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.length === 0 ? (
                  <option value="">Belum ada kategori</option>
                ) : (
                  categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Gambar Artikel
              </label>
              <div className="mb-3 flex gap-4 rounded-lg bg-slate-50 p-2">
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="radio"
                    name="imageInputMode"
                    value="url"
                    checked={imageInputMode === "url"}
                    onChange={() => setImageInputMode("url")}
                    className="h-4 w-4 text-blue-600"
                  />
                  Gunakan Link URL
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                  <input
                    type="radio"
                    name="imageInputMode"
                    value="upload"
                    checked={imageInputMode === "upload"}
                    onChange={() => setImageInputMode("upload")}
                    className="h-4 w-4 text-blue-600"
                  />
                  Upload dari Komputer
                </label>
              </div>
              {imageInputMode === "url" ? (
                <input
                  type="text"
                  inputMode="url"
                  required
                  className="w-full rounded border border-slate-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="block w-full cursor-pointer rounded border border-slate-300 bg-white text-sm text-slate-600 file:mr-4 file:border-0 file:bg-slate-100 file:px-4 file:py-2.5 file:font-medium file:text-slate-700 hover:file:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  {form.image && (
                    <p className="mt-2 truncate text-xs text-green-600">
                      Gambar siap digunakan: {form.image}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Konten Artikel
            </label>
            <div className="mb-12">
              <JoditEditor
                config={config}
                onBlur={(newContent: string) => setContent(newContent)}
                ref={editor}
                value={content}
                onChange={() => undefined}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="mb-4 text-lg font-bold text-slate-800">
              Pengaturan SEO (Opsional)
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Meta Description
                </label>
                <textarea
                  className="w-full rounded border border-slate-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  value={form.metaDesc}
                  onChange={(e) =>
                    setForm({ ...form, metaDesc: e.target.value })
                  }
                  placeholder="Deskripsi singkat untuk pencarian Google (Maksimal 160 karakter)..."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Keywords
                </label>
                <input
                  type="text"
                  className="w-full rounded border border-slate-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                  value={form.keywords}
                  onChange={(e) =>
                    setForm({ ...form, keywords: e.target.value })
                  }
                  placeholder="Contoh: daftar merek, perlindungan hak cipta, konsultan HKI"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
            <input
              type="checkbox"
              id="publish"
              className="h-4 w-4 rounded text-blue-600"
              checked={form.isPublished}
              onChange={(e) =>
                setForm({ ...form, isPublished: e.target.checked })
              }
            />
            <label htmlFor="publish" className="font-medium text-slate-700">
              Langsung Publish ke Halaman Depan
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded border border-slate-300 px-6 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="rounded bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUploading
                ? "Sedang mengunggah..."
                : isSaving
                  ? "Menyimpan..."
                  : "Simpan Artikel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}