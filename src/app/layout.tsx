import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://gürgentekstil.com"
    : (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
const OG_IMAGE = `${process.env.NODE_ENV === "production" ? "https://gürgentekstil.com" : ""}/opengraph-image`;

/* ════════════════════════════════════════════
   VIEWPORT — theme-color, mobile optimization
════════════════════════════════════════════ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1520" },
    { media: "(prefers-color-scheme: dark)",  color: "#0a1520" },
  ],
  colorScheme: "dark light",
};

/* ════════════════════════════════════════════
   ROOT METADATA
════════════════════════════════════════════ */
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  /* ── Title ── */
  title: {
    default: "Gürgentekstil | Denizli Toptan Havlu Üretimi ve Tedariki",
    template: "%s | Gürgentekstil",
  },

  /* ── Description ── */
  description:
    "Gürgentekstil, Denizli'de toptan havlu, el havlusu, yüz havlusu ve banyo havlusu tedariki sunan üretici firmasıdır. WhatsApp ile teklif alın.",

  /* ── Keywords ── */
  keywords: [
    "Denizli havlu üreticisi",
    "toptan havlu Denizli",
    "havlu imalatı Denizli",
    "havlu fabrikası Denizli",
    "towel manufacturer Turkey",
    "towel manufacturer Denizli",
    "Turkish towel supplier",
    "wholesale towels Turkey",
    "banyo havlusu toptan",
    "el havlusu toptan",
    "yüz havlusu toptan",
    "mutfak havlusu toptan",
    "özel üretim havlu",
  ],

  /* ── Authors & Publisher ── */
  authors: [{ name: "Gürgentekstil", url: BASE_URL }],
  creator: "Gürgentekstil",
  publisher: "Gürgentekstil",

  /* ── Canonical & hreflang ── */
  alternates: {
    canonical: BASE_URL,
    languages: {
      "tr":    `${BASE_URL}/`,
      "en":    `${BASE_URL}/en`,
      "x-default": `${BASE_URL}/`,
    },
  },

  /* ── Open Graph ── */
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    siteName: "Gürgentekstil",
    url: BASE_URL,
    title: "Gürgentekstil | Denizli Toptan Havlu Üretimi ve Tedariki",
    description:
      "Gürgentekstil, Denizli'de toptan havlu tedariki ve siparişe göre üretim sunan havlu üreticisidir.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Gürgentekstil — Denizli Havlu Üretimi",
        type: "image/jpeg",
      },
    ],
  },

  /* ── Twitter / X Card ── */
  twitter: {
    card: "summary_large_image",
    title: "Gürgentekstil | Denizli Toptan Havlu Üretimi",
    description:
      "Denizli'de toptan havlu tedariki ve siparişe göre üretim. WhatsApp ile teklif alın.",
    images: [OG_IMAGE],
    creator: "@gurgentekstil",
    site: "@gurgentekstil",
  },

  /* ── Icons — Next.js otomatik üretiyor (icon.tsx + apple-icon.tsx) ── */
  icons: {
    other: [
      { rel: "mask-icon", url: "/icons/safari-pinned-tab.svg", color: "#0a1520" },
    ],
  },

  /* ── Manifest ── */
  manifest: "/manifest.webmanifest",

  /* ── Verification placeholders ── */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },

  /* ── Robots ── */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Category ── */
  category: "business",
};

/* ════════════════════════════════════════════
   ROOT LAYOUT
════════════════════════════════════════════ */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />

        {/* Preload hero image for LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-towel.webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${geistSans.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
