import Link from "next/link";

export default function AdminPengaturanPage() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center px-8 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-4xl shadow-inner">
        ⚙️
      </div>
      <h1 className="mb-3 text-3xl font-bold text-slate-800">Pengaturan Sistem</h1>
      <p className="mb-8 max-w-md text-slate-500">
        Fitur konfigurasi website dan SEO global sedang disiapkan untuk pembaruan sistem berikutnya.
      </p>
      <Link className="rounded-lg bg-emerald-600 px-6 py-3 font-bold text-white transition-colors hover:bg-emerald-700" href="/admin">
        ← Kembali ke Dashboard
      </Link>
    </div>
  );
}