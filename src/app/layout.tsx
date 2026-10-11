import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingWA from "@/components/FloatingWA";
import AuthProvider from "@/components/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hakasagroup.com"),
  manifest: "/manifest.json",
  title: {
    default: "HAKASA Group | Konsultan Kekayaan Intelektual & E-Commerce",
    template: "%s | HAKASA Group",
  },
  description:
    "Layanan profesional pendampingan pendaftaran Merek, Hak Cipta, dan akselerasi bisnis di Shopee Mall & TikTok Mall.",
  keywords: [
    "jasa pendaftaran merek",
    "konsultan HAKI",
    "jasa shopee mall",
    "jasa tiktok mall",
    "hakasa group",
    "pendaftaran hak cipta",
  ],
  authors: [{ name: "HAKASA Group" }],
  openGraph: {
    title: "HAKASA Group | Konsultan Kekayaan Intelektual & E-Commerce",
    description:
      "Layanan profesional pendampingan pendaftaran Merek, Hak Cipta, dan akselerasi bisnis di Shopee Mall & TikTok Mall.",
    url: "https://hakasagroup.com",
    siteName: "HAKASA Group",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HAKASA Group Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HAKASA Group | Konsultan HAKI & E-Commerce",
    description:
      "Layanan profesional pendampingan Merek, Hak Cipta, dan Setup Mall.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>{children}</AuthProvider>
        {/* Floating WhatsApp — muncul di SEMUA halaman */}
        <FloatingWA />
      </body>
    </html>
  );
}
