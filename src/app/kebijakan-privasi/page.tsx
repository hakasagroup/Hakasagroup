import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi HAKASA Group — komitmen kami melindungi kerahasiaan data pribadi, dokumen legalitas, dan aset kekayaan intelektual Anda sesuai hukum yang berlaku di Indonesia.",
};

export default function KebijakanPrivasiPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      lastUpdated="Oktober 2026"
      justify
      intro="HAKASA Group menyadari bahwa informasi dan aset bisnis yang Anda percayakan kepada kami merupakan hal yang sangat krusial. Kebijakan Privasi ini disusun untuk memberikan transparansi mengenai tata cara kami mengumpulkan, menggunakan, dan melindungi data Anda selama proses pendampingan legalitas dan optimasi e-commerce."
    >
      <LegalSection title="Pengumpulan dan Penggunaan Data">
        <p>
          Segala bentuk dokumen identitas (KTP, NPWP), legalitas usaha (NIB,
          Akta Pendirian), hingga aset kekayaan intelektual (logo, desain
          kemasan, deskripsi ciptaan) yang diserahkan kepada HAKASA Group
          digunakan secara eksklusif untuk keperluan administratif. Penggunaan
          data ini terbatas pada pengisian formulir pendaftaran di Direktorat
          Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum dan HAM RI,
          serta verifikasi pada platform e-commerce terkait.
        </p>
      </LegalSection>

      <LegalSection title="Standar Kerahasiaan dan Keamanan">
        <p>
          Kami menerapkan prinsip kehati-hatian dalam mengelola setiap berkas
          klien. HAKASA Group menjamin bahwa kami tidak akan
          memperjualbelikan, mendistribusikan, ataupun menyalahgunakan data
          pribadi serta rahasia dagang Anda kepada pihak ketiga mana pun.
          Akses terhadap dokumen Anda sangat dibatasi hanya untuk tim internal
          yang menangani langsung permohonan Anda.
        </p>
      </LegalSection>

      <LegalSection title="Pengecualian Pengungkapan Hukum">
        <p>
          Kerahasiaan data Anda akan senantiasa kami jaga, kecuali apabila
          pengungkapan tersebut diwajibkan oleh undang-undang yang berlaku di
          yurisdiksi Republik Indonesia, atau atas perintah tertulis dari
          pengadilan maupun aparat penegak hukum yang berwenang.
        </p>
      </LegalSection>
    </LegalPage>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-slate-700">
        {children}
      </div>
    </section>
  );
}
