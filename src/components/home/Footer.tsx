import Link from "next/link";
import CurrentYear from "./CurrentYear";

/**
 * Link-link di kolom Layanan (footer).
 * Mengarah ke halaman detail layanan (sudah ada sebelumnya).
 */
const SERVICE_LINKS = [
  { label: "Pendaftaran Merek", href: "/layanan/pendaftaran-merek" },
  { label: "Sanggahan & Oposisi", href: "/layanan/sanggahan-oposisi" },
  { label: "Pendaftaran Hak Cipta", href: "/layanan/hak-cipta" },
  { label: "Setup Shopee Mall", href: "/layanan/setup-shopee-mall" },
];

/**
 * Link-link legal/corporate (footer).
 * Mengarah ke halaman legalitas masing-masing.
 */
const LEGAL_LINKS = [
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  { label: "Disclaimer Hukum", href: "/disclaimer-hukum" },
];

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-slate-300">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* === GRID 4 KOLOM === */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* KOLOM 1: Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white sm:text-xl"
            >
              HAKASA Group
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
              Konsultan perlindungan Kekayaan Intelektual dan akselerasi
              E-Commerce.
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-300/90">
              {/* Icon lokasi */}
              <svg
                className="h-4 w-4 flex-shrink-0 text-emerald-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9zM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  clipRule="evenodd"
                />
              </svg>
              Jakarta Barat, Indonesia
            </p>
          </div>


          {/* KOLOM 2: Layanan */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Layanan
            </h3>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3: Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* KOLOM 4: Kontak */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/6285179986415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-sm text-slate-300 transition-colors hover:text-emerald-400"
                >
                  {/* Icon WhatsApp */}
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span>+62 851-7998-6415</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hakasagroup.consulting@gmail.com"
                  className="group flex items-start gap-2.5 text-sm text-slate-300 transition-colors hover:text-emerald-400"
                >
                  {/* Icon email */}
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>hakasagroup.consulting@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* === BOTTOM BAR: Divider + Copyright === */}
        <div className="mt-10 border-t border-emerald-900/50 pt-6 sm:mt-12">
          <p className="text-center text-xs text-slate-400 sm:text-sm">
            &copy; <CurrentYear /> HAKASA Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

