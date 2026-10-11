export default function Testimonial() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center shadow-lg md:p-12">
          {/* 5 Star Icons */}
          <div className="flex justify-center gap-1" aria-label="Rating 5 dari 5 bintang">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="h-6 w-6 text-amber-400"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="my-6 text-xl font-medium italic text-slate-700 md:text-2xl">
            &ldquo;Proses verifikasi dokumen legal sangat rumit, namun tim
            HAKASA memberikan pendampingan yang luar biasa rapi. Berkat
            HAKASA, brand kami berhasil menembus ketatnya kurasi dan resmi
            menjadi Shopee Mall.&rdquo;
          </blockquote>

          {/* Attribution */}
          <div>
            <p className="font-bold text-emerald-900">Klien E-Commerce Retail</p>
            <p className="mt-1 text-sm text-slate-500">
              Verified Shopee Mall Partner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
