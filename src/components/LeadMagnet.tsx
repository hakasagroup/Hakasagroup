"use client";

import { useState } from "react";

export default function LeadMagnet({ source = "Website" }: { source?: string }) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, source }),
      });

      if (res.ok) {
        setStatus("success");
        setName("");
        setWhatsapp("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="my-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <h3 className="mb-2 text-2xl font-bold text-emerald-800">
          Terima Kasih! 🎉
        </h3>
        <p className="text-emerald-700">
          Tim HAKASA Group akan segera menghubungi Anda via WhatsApp untuk
          mengirimkan panduan gratisnya.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-2xl font-bold text-blue-900">
          Dapatkan Panduan Gratis!
        </h3>
        <p className="mx-auto max-w-md text-blue-700">
          Download Checklist Syarat Pendaftaran Merek DJKI & Optimasi E-Commerce
          secara gratis. Masukkan nomor WhatsApp Anda untuk kami kirimkan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
        <input
          type="text"
          required
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          required
          placeholder="Nomor WhatsApp (Cth: 0812...)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Mengirim..." : "Kirimkan Panduan Gratis 📥"}
        </button>
        {status === "error" && (
          <p className="mt-2 text-center text-sm text-red-500">
            Terjadi kesalahan, silakan coba lagi.
          </p>
        )}
      </form>
    </div>
  );
}