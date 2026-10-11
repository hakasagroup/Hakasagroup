"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

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

type Category = {
  id: string;
  name: string;
};

export default function EditArticle() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const editor = useRef(null);
  const articleId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
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

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Gagal mengambil artikel");
        }

        setForm({
          title: data.title,
          slug: data.slug,
          category: data.category,
          image: data.image,
          excerpt: data.excerpt ?? "",
          metaDesc: data.metaDesc ?? "",
          keywords: data.keywords ?? "",
          isPublished: data.isPublished,
        });
        setContent(data.content);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal mengambil artikel.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) void fetchArticle();
  }, [articleId]);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Ketik isi artikel...",
      height: 400,
    }),
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    const plainContent = content
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          content,
          excerpt: plainContent
            ? `${plainContent.substring(0, 150)}...`
            : form.excerpt || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Gagal update artikel");
      }

      router.push("/admin/articles");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Gagal update artikel.",
      );
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Memuat data artikel...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-800">Edit Artikel</h1>
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
                onChange={(event) =>
                  setForm({
                    ...form,
                    title: event.target.value,
                    slug: generateSlug(event.target.value),
                  })
                }
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
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                {categories.length === 0 ? (
                  <option value="">Belum ada kategori</option>
                ) : (
                  <>
                    {!categories.some((category) => category.name === form.category) &&
                      form.category && (
                        <option value={form.category}>{form.category}</option>
                      )}
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                URL Gambar
              </label>
              <input
                type="text"
                inputMode="url"
                className="w-full rounded border border-slate-300 p-2.5 focus:ring-2 focus:ring-blue-500"
                value={form.image}
                onChange={(event) =>
                  setForm({ ...form, image: event.target.value })
                }
              />
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
                  onChange={(event) =>
                    setForm({ ...form, metaDesc: event.target.value })
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
                  onChange={(event) =>
                    setForm({ ...form, keywords: event.target.value })
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
              onChange={(event) =>
                setForm({ ...form, isPublished: event.target.checked })
              }
            />
            <label htmlFor="publish" className="font-medium text-slate-700">
              Tampilkan di Halaman Depan (Published)
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
              disabled={isSaving}
              className="rounded bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Memperbarui..." : "Update Artikel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}