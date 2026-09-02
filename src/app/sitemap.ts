import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/data";

const BASE = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /* ── Statik TR sayfaları ── */
  const trStatic: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/urunler`,             lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/otel-urunleri`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/kurumsal`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/iletisim`,            lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/uretim-kapasitesi`,   lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/makine-parkuru`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kvkk`,               lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  /* ── Statik EN sayfaları ── */
  const enStatic: MetadataRoute.Sitemap = [
    { url: `${BASE}/en`,                       lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE}/en/products`,              lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/en/hotel-products`,        lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/en/about`,                 lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/en/contact`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/en/production-capacity`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/en/machinery`,             lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/en/privacy`,               lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  /* ── Dinamik ürün sayfaları ── */
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts(true);
    productUrls = products.flatMap((p) => [
      {
        url: `${BASE}/urunler/${p.slug}`,
        lastModified: new Date(p.updated_at ?? now),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      },
      {
        url: `${BASE}/en/products/${p.slug}`,
        lastModified: new Date(p.updated_at ?? now),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ]);
  } catch {
    // Ürünler alınamazsa statik sitemapla devam et
  }

  return [...trStatic, ...enStatic, ...productUrls];
}
