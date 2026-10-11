import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer Hukum",
  description:
    "Disclaimer Hukum HAKASA Group — informasi di situs ini bersifat edukasi, bukan nasihat hukum formal. Konsultasikan kasus spesifik Anda dengan profesional.",
};

export default function DisclaimerHukumPage() {
  return (
    <LegalPage
      title="Disclaimer Hukum"
      lastUpdated="Oktober 2026"
      justify
    >
      <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-700">
        <p>
          Situs web HAKASA Group, termasuk namun tidak terbatas pada seluruh
          artikel, panduan, infografis, dan materi publikasi di dalamnya,
          disajikan secara eksklusif untuk tujuan edukasi dan pemahaman umum
          terkait ranah Kekayaan Intelektual dan operasional bisnis digital.
        </p>
        <p>
          Materi yang terdapat di dalam situs ini tidak dikonstruksikan
          sebagai, dan tidak dapat menggantikan, nasihat hukum formal (legal
          advice) yang bersifat mengikat. Hukum, yurisprudensi, dan regulasi
          pendaftaran di Indonesia bersifat sangat dinamis dan dapat berubah
          sewaktu-waktu tanpa pemberitahuan sebelumnya. Meskipun kami
          mendedikasikan upaya terbaik untuk memastikan validitas dan
          keakuratan informasi saat dipublikasikan, kami tidak memberikan
          pernyataan atau jaminan apa pun—baik tersurat maupun
          tersirat—terkait kelengkapan atau relevansi informasi tersebut
          dengan kondisi spesifik yang sedang Anda hadapi.
        </p>
        <p>
          Setiap tindakan, manuver bisnis, atau keputusan hukum yang Anda
          ambil berdasarkan informasi dari situs ini merupakan risiko dan
          tanggung jawab Anda secara pribadi. Untuk menghindari kerugian
          hukum, kami sangat merekomendasikan Anda untuk melakukan konsultasi
          secara langsung dan komprehensif dengan tim HAKASA Group sebelum
          mengambil langkah pendaftaran atau litigasi apa pun.
        </p>
      </div>
    </LegalPage>
  );
}
