import Link from "next/link";
import type { ServiceItem } from "@/data/services";

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-800/40 hover:shadow-md">
      {/* Nomor urut / badge kecil */}
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-800/10 text-sm font-bold text-emerald-800">
        0{index + 1}
      </div>

      {/* Judul Layanan */}
      <h3 className="mb-4 text-lg font-bold text-slate-900 sm:text-xl">
        {service.title}
      </h3>

      {/* Checklist poin fasilitas */}
      <ul className="mb-6 flex-1 space-y-2.5">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
          >
            {/* Inline check icon (SVG) — tidak butuh library tambahan */}
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-800"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Detail → Halaman detail layanan */}
      <Link
        href={`/layanan/${service.slug}`}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-800 hover:bg-emerald-800 hover:text-white"
      >
        Lihat Detail
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L11.586 10 7.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </article>
  );
}
