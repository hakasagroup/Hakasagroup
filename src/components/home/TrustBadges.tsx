/**
 * Daftar otoritas / platform yang menjadi acuan & integrasi HAKASA.
 * Ditampilkan sebagai badge teks tebal — bisa diganti logo SVG nanti.
 */
const AUTHORITY_BADGES = [
  { label: "DJKI KEMENKUMHAM" },
  { label: "SHOPEE MALL" },
  { label: "TIKTOK SHOP" },
];

/**
 * Placeholder jumlah kotak logo klien yang akan ditampilkan.
 * Nanti diganti dengan komponen <Image> dari /public/clients/*.svg
 * begitu klien menyediakan aset logo asli.
 */
const CLIENT_LOGO_PLACEHOLDERS = 4;

export default function TrustBadges() {
  return (
    <section
      aria-label="Otoritas & Klien"
      className="bg-slate-50 py-8 sm:py-10"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* === Baris 1: Otoritas === */}
        <div className="mb-8 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">
            Mematuhi standar &amp; terintegrasi dengan:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
            {AUTHORITY_BADGES.map((badge) => (
              <li
                key={badge.label}
                className="text-sm font-bold tracking-wide text-slate-400 sm:text-base"
              >
                {badge.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Divider halus antara 2 baris */}
        <div
          aria-hidden="true"
          className="mx-auto mb-8 h-px w-24 bg-slate-200"
        />

        {/* === Baris 2: Klien Kami (placeholder) === */}
        <div className="text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500 sm:text-sm">
            Dipercaya oleh berbagai bisnis:
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {Array.from({ length: CLIENT_LOGO_PLACEHOLDERS }).map((_, idx) => (
              <li
                key={idx}
                aria-label={`Logo klien ${idx + 1} (placeholder)`}
                className="flex h-12 w-24 items-center justify-center rounded bg-slate-200"
              >
                {/* Placeholder sengaja kosong — akan diganti <Image> */}
                <span className="sr-only">Placeholder logo klien</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
