import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan Layanan",
  description:
    "Syarat dan Ketentuan Layanan HAKASA Group — kedudukan, jaminan keabsahan dokumen klien, sifat keputusan instansi, dan ketentuan finansial.",
};

export default function SyaratKetentuanPage() {
  return (
    <LegalPage
      title="Syarat & Ketentuan Layanan"
      lastUpdated="Oktober 2026"
      justify
    >
      <LegalPasal
        number={1}
        title="Kedudukan dan Ruang Lingkup"
        content="HAKASA Group berkedudukan sebagai biro konsultan independen yang memfasilitasi pendampingan pendaftaran Kekayaan Intelektual (Merek dan Hak Cipta) serta setup kanal penjualan e-commerce. Kami bukan merupakan representasi, afiliasi, maupun perpanjangan tangan resmi dari instansi pemerintah (DJKI Kemenkumham) ataupun platform pihak ketiga (Shopee, TikTok)."
      />

      <LegalPasal
        number={2}
        title="Jaminan Keabsahan Dokumen Klien"
        content="Klien terikat kewajiban untuk menyertakan dokumen pendukung dan informasi yang valid, orisinal, serta tidak melanggar hak hukum pihak lain. Apabila di kemudian hari terbukti adanya pemalsuan dokumen atau pelanggaran hak cipta milik pihak ketiga atas objek yang didaftarkan, maka hal tersebut sepenuhnya menjadi tanggung jawab hukum klien. HAKASA Group secara tegas dibebaskan dari segala tuntutan pidana maupun gugatan perdata."
      />

      <LegalPasal
        number={3}
        title="Sifat Keputusan Instansi"
        content="Tim kami akan menyusun dan mengajukan permohonan berdasarkan standar operasional prosedur yang ditetapkan oleh negara. Kendati demikian, wewenang mutlak mengenai diterima atau ditolaknya suatu permohonan pendaftaran HAKI berada sepenuhnya pada Direktorat Jenderal Kekayaan Intelektual. Oleh karena itu, HAKASA Group tidak dapat memberikan jaminan mutlak (garansi 100%) atas hasil akhir dari proses pemeriksaan substantif yang dilakukan oleh instansi terkait."
      />

      <LegalPasal
        number={4}
        title="Ketentuan Finansial"
        content="Pengerjaan berkas dan proses filing (pengajuan ke sistem negara) baru akan diproses setelah klien menyelesaikan kewajiban pembayaran sesuai invoice yang diterbitkan. Seluruh dana yang telah disetorkan, khususnya yang dialokasikan untuk Penerimaan Negara Bukan Pajak (PNBP), bersifat final dan tidak dapat ditarik kembali (non-refundable) dalam kondisi apa pun."
      />
    </LegalPage>
  );
}

/**
 * Komponen "Pasal" — judul section bernomor dengan format
 * "Pasal N: Judul" untuk halaman Syarat & Ketentuan.
 */
function LegalPasal({
  number,
  title,
  content,
}: {
  number: number;
  title: string;
  content: string;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        Pasal {number}: {title}
      </h2>
      <p className="text-base leading-relaxed text-slate-700">{content}</p>
    </section>
  );
}
