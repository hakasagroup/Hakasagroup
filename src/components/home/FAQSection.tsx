"use client";

export type FAQCategory = "umum" | "merek" | "hak-cipta" | "ecommerce";

interface FAQItem {
  category: FAQCategory;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  { category: "umum", question: "Apa bedanya pendaftaran Merek dan Hak Cipta?", answer: "Merek melindungi nama, logo, atau brand yang digunakan untuk membedakan barang/jasa dalam perdagangan. Hak Cipta melindungi karya seni, buku, desain grafis, program komputer, musik, atau konten digital lainnya." },
  { category: "umum", question: "Apakah layanan HAKASA mencakup seluruh Indonesia?", answer: "Ya. Pendaftaran HAKI (Merek dan Hak Cipta) dan optimasi E-Commerce dilakukan secara online yang terintegrasi penuh dengan sistem DJKI, Kemenkumham, dan platform marketplace, sehingga kami melayani klien dari seluruh Indonesia." },
  { category: "umum", question: "Bagaimana sistem pembayaran layanannya?", answer: "Kami menerapkan sistem pembayaran transparan di awal (Full Payment) sebelum proses filing dilakukan ke sistem DJKI atau platform E-Commerce. Hal ini guna memastikan kelancaran administrasi dan komitmen kedua belah pihak." },
  { category: "merek", question: "Berapa lama proses pendaftaran merek di DJKI?", answer: "Merek Anda mendapat perlindungan sejak tanggal permohonan diajukan. Untuk sertifikat resmi terbit, estimasi dari DJKI adalah 12-18 bulan jika tidak ada penolakan atau sanggahan dari pihak ketiga." },
  { category: "merek", question: "Mengapa pendaftaran merek bisa ditolak?", answer: "Penolakan biasanya terjadi karena merek memiliki persamaan pada pokoknya dengan merek yang sudah terdaftar lebih dulu, atau menggunakan kata umum / deskriptif yang tidak bisa dimonopoli oleh satu pihak." },
  { category: "merek", question: "Apakah HAKASA bisa membantu jika merek saya mendapat usulan penolakan?", answer: "Tentu. Kami memiliki layanan Sanggahan (Hearing) dan Oposisi untuk menyusun argumen hukum yang kuat guna mempertahankan hak merek Anda di DJKI, mulai dari analisis dokumen hingga pendampingan sidang." },
  { category: "hak-cipta", question: "Apa bedanya Hak Cipta dengan Paten?", answer: "Hak Cipta melindungi bentuk ekspresi dari suatu karya cipta (teks, kode program, musik, desain, dll) dan muncul otomatis begitu karya diciptakan dan dipublikasikan. Paten melindungi penemuan/inovasi teknis berupa metode, proses, atau produk baru - harus melalui pemeriksaan substantif yang ketat di DJKI." },
  { category: "hak-cipta", question: "Berapa lama proses pencatatan Hak Cipta di DJKI?", answer: "Pencatatan Hak Cipta melalui DJKI pada umumnya jauh lebih cepat dibanding pendaftaran Merek. Setelah dokumen lengkap dan pembayaran PNBP kami terima, sertifikat pencatatan ciptaan dapat terbit dalam hitungan hari hingga beberapa minggu, tergantung antrean DJKI." },
  { category: "hak-cipta", question: "Apakah software atau program komputer perlu didaftarkan Hak Cipta?", answer: "Sangat disarankan. Source code, UI/UX design, dan dokumentasi perangkat lunak adalah ciptaan yang dilindungi UU Hak Cipta. Pencatatan resmi dari DJKI memperkuat bukti kepemilikan dan memudahkan proses hukum apabila terjadi pembajakan atau sengketa." },
  { category: "ecommerce", question: "Apa syarat wajib untuk upgrade ke Shopee Mall atau TikTok Mall?", answer: "Syarat mutlaknya adalah memiliki legalitas badan usaha atau perorangan (NIB / NPWP) dan bukti kepemilikan merek, minimal tanda daftar atau sertifikat dari DJKI atas nama toko Anda." },
];

export const FAQ_CATEGORY_MAP = { merek: "merek", cipta: "hak-cipta", ecommerce: "ecommerce" } as const;

interface FAQSectionProps {
  category?: FAQCategory;
}

export default function FAQSection({ category }: FAQSectionProps = {}) {
  const filtered = category ? FAQS.filter((f) => f.category === category || f.category === "umum") : FAQS;

  const headingMap = {
    umum: { eyebrow: "FAQ", title: "Pertanyaan Seputar Layanan Kami", sub: "Jawaban cepat untuk pertanyaan yang paling sering diajukan klien kami." },
    merek: { eyebrow: "FAQ Merek", title: "Pertanyaan Seputar Pendaftaran Merek", sub: "Durasi proses, usulan penolakan, hingga strategi mempertahankan merek Anda di DJKI." },
    "hak-cipta": { eyebrow: "FAQ Hak Cipta", title: "Pertanyaan Seputar Pencatatan Hak Cipta", sub: "Perbedaan dengan paten, durasi proses, hingga perlindungan karya digital Anda." },
    ecommerce: { eyebrow: "FAQ E-Commerce", title: "Pertanyaan Seputar Setup Official Store", sub: "Syarat dokumen, durasi verifikasi, dan tips lolos kurasi Shopee Mall, TikTok Mall, dan LazMall." },
  } as const;
  const heading = category ? headingMap[category] : headingMap.umum;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: filtered.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="bg-slate-50 py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-emerald-800 sm:text-sm">{heading.eyebrow}</span>
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">{heading.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{heading.sub}</p>
        </div>
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((faq, idx) => (
              <details key={faq.question} className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all open:shadow-md hover:border-emerald-800/40 sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 transition-colors hover:text-emerald-800 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-800/10 text-xs font-bold text-emerald-800" aria-hidden="true">{idx + 1}</span>
                    <span className="text-sm sm:text-base">{faq.question}</span>
                  </span>
                  <svg className="h-5 w-5 flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-emerald-800" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </summary>
                <div className="mt-3 border-t border-slate-100 pt-3 pl-9 text-sm leading-relaxed text-slate-600 sm:text-base">{faq.answer}</div>
              </details>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500">Belum ada pertanyaan untuk kategori ini.</p>
        )}
      </div>
    </section>
  );
}
