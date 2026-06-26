import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* ── Image Optimization ── */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nmhmrfyhirkxewbizdsp.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "okymonntnhjoqhcuyyjd.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [30, 60, 70, 75, 80, 85, 90],
    minimumCacheTTL: 31536000, // 1 yıl — prod için
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /* ── Experimental ── */
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  /* ── HTTP Headers ── */
  async headers() {
    return [
      /* ── Security headers (tüm sayfalar) ── */
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control",     value: "on" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },

      /* ── Immutable static assets (JS/CSS/fonts) ── */
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      /* ── Image cache — 1 yıl ── */
      {
        source: "/_next/image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" },
        ],
      },

      /* ── Public görseller ── */
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },

      /* ── İkonlar ── */
      {
        source: "/icons/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      /* ── Sitemap & Robots — kısa cache ── */
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=3600" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },

      /* ── OG Image cache ── */
      {
        source: "/opengraph-image(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  /* ── Redirects ── */
  async redirects() {
    return [
      // www.xn-- (Punycode www) → xn--grgentekstil-dlb.com (ana domain)
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.xn--grgentekstil-dlb.com" }],
        destination: "https://xn--grgentekstil-dlb.com/:path*",
        permanent: true,
      },
      // gurgentekstil.com (ASCII, ü'süz) → xn--grgentekstil-dlb.com
      {
        source: "/(.*)",
        has: [{ type: "host", value: "gurgentekstil.com" }],
        destination: "https://xn--grgentekstil-dlb.com/:path*",
        permanent: true,
      },
      // www.gurgentekstil.com → xn--grgentekstil-dlb.com
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.gurgentekstil.com" }],
        destination: "https://xn--grgentekstil-dlb.com/:path*",
        permanent: true,
      },
    ];
  },

  /* ── Compiler ── */
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  /* ── Power ── */
  poweredByHeader: false,

  /* ── Compression ── */
  compress: true,
};

export default nextConfig;
