import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const instant = false;

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const totalArticles = await prisma.article.count();
  const publishedArticles = await prisma.article.count({ where: { isPublished: true } });
  const draftArticles = totalArticles - publishedArticles;
  const totalLeads = await prisma.lead.count();
  const recentLeads = await prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } });

  const formatWA = (whatsapp: string) => {
    let formatted = whatsapp.replace(/\D/g, "");
    if (formatted.startsWith("0")) formatted = `62${formatted.substring(1)}`;
    return formatted;
  };

  return (
    <div className="w-full">
      <div className="relative h-64 bg-gradient-to-r from-emerald-800 to-teal-500 px-8 pt-10 text-white">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Selamat Datang, CEO! 👋</h1>
        <p className="font-medium text-emerald-100">Berikut adalah ringkasan performa HAKASA Group hari ini.</p>
      </div>

      <div className="relative z-10 -mt-20 px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Leads" value={totalLeads} icon="👥" iconClass="bg-orange-100 text-orange-500" description="Prospek masuk ke database" descriptionClass="text-emerald-600" />
          <StatCard label="Artikel Live" value={publishedArticles} icon="📝" iconClass="bg-emerald-100 text-emerald-600" description={`Dari ${totalArticles} total artikel`} />
          <StatCard label="Draft & Antrean" value={draftArticles} icon="⏳" iconClass="bg-slate-100 text-slate-600" description="Belum dipublikasi ke web" />
          <StatCard label="Sistem Web" value="Optimal" icon="🚀" iconClass="bg-blue-100 text-blue-500" description="Semua fitur berjalan baik" valueClass="text-2xl text-emerald-600 mt-2" descriptionClass="text-blue-600" />
        </div>
      </div>

      <div className="mt-8 px-8 pb-12">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-5">
            <h3 className="text-lg font-bold text-slate-800">5 Prospek Terbaru</h3>
            <Link className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-600 transition-colors hover:text-emerald-700" href="/admin/leads">
              Lihat Semua Data →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-white text-xs font-bold uppercase text-slate-500">
                <tr><th className="px-6 py-4">Waktu Masuk</th><th className="px-6 py-4">Nama Prospek</th><th className="px-6 py-4">Sumber Halaman</th><th className="px-6 py-4 text-center">Aksi Cepat</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center font-medium text-slate-500">Belum ada data masuk.</td></tr>
                ) : recentLeads.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-600">{new Date(lead.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</td>
                    <td className="px-6 py-4 text-base font-bold text-slate-800">{lead.name}</td>
                    <td className="px-6 py-4"><span className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{lead.source || "Website"}</span></td>
                    <td className="px-6 py-4 text-center">
                      <a href={`https://wa.me/${formatWA(lead.whatsapp)}?text=Halo%20${encodeURIComponent(lead.name)},%20ini%20dengan%20tim%20HAKASA...`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600">💬 Chat</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  iconClass,
  description,
  descriptionClass = "text-slate-500",
  valueClass = "text-4xl text-slate-800",
}: {
  label: string;
  value: string | number;
  icon: string;
  iconClass: string;
  description: string;
  descriptionClass?: string;
  valueClass?: string;
}) {
  return (
    <div className="flex h-36 flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div><p className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">{label}</p><h3 className={`font-black ${valueClass}`}>{value}</h3></div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-inner ${iconClass}`} aria-hidden="true">{icon}</div>
      </div>
      <p className={`text-sm font-medium ${descriptionClass}`}>{description}</p>
    </div>
  );
}