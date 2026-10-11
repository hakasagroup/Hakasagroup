const STEPS = [
  {
    number: "01",
    title: "Konsultasi & Analisis",
    description:
      "Diskusikan kebutuhan dan pengecekan potensi HAKI secara gratis — tim kami menganalisis kelayakan dokumen dan strategi terbaik.",
  },
  {
    number: "02",
    title: "Pengumpulan Berkas",
    description:
      "Kirimkan dokumen dasar secara online tanpa perlu tatap muka — hemat waktu dan bisa dilakukan dari mana saja.",
  },
  {
    number: "03",
    title: "Eksekusi & Filing",
    description:
      "Tim HAKASA memproses pendaftaran ke sistem DJKI atau langsung ke platform E-Commerce yang dituju.",
  },
  {
    number: "04",
    title: "Selesai & Terlindungi",
    description:
      "Sertifikat atau persetujuan Mall terbit, bisnis Anda aman beroperasi dan dilindungi secara hukum.",
  },
];

export default function WorkProcess() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl">
            Proses Kerja yang Transparan &amp; Bebas Ribet
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Fokus pada bisnis Anda, biarkan kami yang mengurus legalitas dan
            administrasinya.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              {/* Step Number Badge */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-emerald-800 bg-white shadow-sm">
                <span className="text-lg font-bold text-emerald-800 sm:text-xl">
                  {step.number}
                </span>
              </div>

              {/* Connector line (desktop only, except last) */}
              <div className="hidden md:block absolute left-0 top-0 w-full h-0">
              </div>

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
