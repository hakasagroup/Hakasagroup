import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const instant = false;

export default async function AdminLeadsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const formatWA = (wa: string) => {
    let formatted = wa.replace(/\D/g, "");
    if (formatted.startsWith("0")) formatted = `62${formatted.substring(1)}`;
    return formatted;
  };

  return (
    <div className="w-full px-8 py-10">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Data Prospek (Leads)</h1>
          <p className="mt-1 font-medium text-slate-500">Kelola data calon klien dari Lead Magnet dan kontak website.</p>
        </div>
        <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-100 px-6 py-3 font-bold text-emerald-700 transition-all hover:bg-emerald-200">
          <span aria-hidden="true">💻</span> Buka WhatsApp Web
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4">
          <div className="relative">
            <input type="text" placeholder="Cari nama prospek..." className="w-64 rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" aria-label="Cari nama prospek" />
            <span className="absolute left-3 top-2.5 text-sm text-slate-400" aria-hidden="true">🔍</span>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">Total: {leads.length} Prospek</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-white text-xs font-bold uppercase text-slate-500">
              <tr><th className="px-6 py-4">Waktu Masuk</th><th className="px-6 py-4">Nama Lengkap</th><th className="px-6 py-4">Nomor WhatsApp</th><th className="px-6 py-4">Sumber Halaman</th><th className="px-6 py-4 text-right">Aksi Cepat</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center font-medium text-slate-500">Belum ada data prospek masuk.</td></tr>
              ) : leads.map((lead) => (
                <tr key={lead.id} className="group transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{new Date(lead.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                  <td className="px-6 py-4"><p className="text-base font-bold text-slate-800">{lead.name}</p></td>
                  <td className="px-6 py-4 font-medium text-slate-600">+{formatWA(lead.whatsapp)}</td>
                  <td className="px-6 py-4"><span className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{lead.source || "Website"}</span></td>
                  <td className="px-6 py-4 text-right">
                    <a href={`https://wa.me/${formatWA(lead.whatsapp)}?text=Halo%20${encodeURIComponent(lead.name)},%20ini%20dengan%20tim%20HAKASA%20Group...`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:bg-orange-600">💬 Chat WA</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}