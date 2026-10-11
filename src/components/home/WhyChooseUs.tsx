/**
 * WhyChooseUs — section "Mengapa Memilih HAKASA Group?"
 *
 * Menampilkan 4 nilai jual utama (USP) untuk meningkatkan trust
 * dan konversi di Halaman Utama. Konten sepenuhnya statis,
 * sehingga komponen ini tetap Server Component (default).
 *
 * Dipakai di: src/app/page.tsx (di antara ServicesSection dan WorkProcess).
 */
export default function WhyChooseUs() {
  // Data nilai jual — dipisah dari markup agar mudah di-maintain
  // dan (jika dibutuhkan nanti) bisa dipindahkan ke data file.
  const reasons = [
    {
      title: "Transparansi Harga",
      description:
        "Tidak ada biaya tersembunyi. Penawaran harga kami jelas dan tegas, dengan opsi jasa Konsultan HKI yang bersifat transparan sejak awal.",
      icon: (
        <svg
          className="w-8 h-8 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Proses 100% Praktis",
      description:
        "Konsultasi dan pemberkasan sepenuhnya dapat dilakukan secara online melalui WhatsApp. Anda fokus pada bisnis, kami urus legalitasnya.",
      icon: (
        <svg
          className="w-8 h-8 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Monitoring Berkala",
      description:
        "Sistem pelaporan progres yang rutin. Anda akan selalu mendapatkan update status permohonan dari pendaftaran hingga sertifikat terbit.",
      icon: (
        <svg
          className="w-8 h-8 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
    },
    {
      title: "Pengalaman Ekstensif",
      description:
        "Dipercaya menangani verifikasi legalitas E-Commerce (Shopee/TikTok Mall) dan administrasi kekayaan intelektual berbagai klien korporat.",
      icon: (
        <svg
          className="w-8 h-8 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="bg-white py-16 border-t border-slate-100 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h2
            id="why-choose-us-heading"
            className="mb-4 text-3xl font-bold text-emerald-900"
          >
            Mengapa Memilih HAKASA Group?
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Kami menghadirkan layanan legalitas Kekayaan Intelektual yang
            terpercaya, praktis, dan profesional untuk melindungi aset bisnis
            Anda dari hulu ke hilir.
          </p>
        </div>

        {/* Grid 4 Kartu USP */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 text-center transition-all duration-300 hover:border-emerald-200 hover:shadow-lg"
            >
              {/* Icon Wrapper */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                {reason.icon}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-emerald-900">
                {reason.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
