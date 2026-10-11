# HAKASA Group — Website Beranda

Website company profile & landing page untuk **HAKASA Group** (Jasa Legalitas & E-Commerce) di domain `hakasagroup.com`.

Dibangun dengan:

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **ESLint** (konfigurasi `next/core-web-vitals`)

## Struktur Halaman Beranda

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata SEO (OG, lang=id, dll)
│   ├── page.tsx            # Halaman beranda, merangkai semua section
│   └── globals.css         # Tailwind v4 entry
├── components/home/
│   ├── Header.tsx          # Sticky navbar: Logo HAKASA + nav + CTA Konsultasi
│   ├── Hero.tsx            # Hero section (center alignment)
│   ├── ServicesSection.tsx # Section "Layanan Utama" + grid 4 kolom
│   ├── ServiceCard.tsx     # Reusable card (judul + 3 checklist + CTA)
│   ├── Footer.tsx          # Footer (HAKASA Group, Jakarta Barat, © tahun)
│   └── CurrentYear.tsx     # Client component untuk tahun copyright dinamis
└── data/
    └── services.ts         # Data services (single source of truth, type-safe)
```

## Color Palette

| Token              | Tailwind class        | Dipakai untuk                          |
| ------------------ | --------------------- | -------------------------------------- |
| Primary (hijau)    | `emerald-800`         | Logo, headline accent, ikon checklist  |
| Background         | `slate-50`            | Background halaman (off-white)         |
| Card surface       | `white` + `slate-200` | Card layanan dengan border & shadow-sm |
| Accent / CTA       | `amber-500` / `600`   | Tombol CTA "Konsultasi" & "Hubungi"    |

## Perintah Pengembangan

```bash
# Install dependencies
npm install

# Jalankan dev server (http://localhost:3000)
npm run dev

# Build production
npm run build

# Jalankan production build
npm start

# Linting
npm run lint
```

## Catatan Teknis

- **`CurrentYear`**: Di Next.js 16, static prerendering default tidak mengizinkan `new Date()` saat server render. Tahun copyright di-handle oleh Client Component dengan initial literal + `useEffect` untuk update di client (zero hydration mismatch, no flicker yang berarti).
- **Path alias**: Gunakan `@/components/...` dan `@/data/...` sesuai `tsconfig.json` → `paths`.
- **Logo & Brand**: Placeholder menggunakan teks "HAKASA" (tanpa ikon). Tambahkan SVG logo di `public/` lalu ganti di `Header.tsx` saat asset tersedia.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
