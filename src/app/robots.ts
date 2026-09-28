import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/static/"],
      },
      {
        // GPTBot: OpenAI eğitim verisi tarayıcısı
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // OAI-SearchBot: ChatGPT arama özelliğinin canlı tarayıcısı (GPTBot'tan ayrı)
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // ClaudeBot: Claude'un canlı/gerçek-zamanlı web erişimi (anthropic-ai eski/eğitim botu)
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // CCBot: Common Crawl — birçok LLM'in eğitim verisi kaynağı
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        // Applebot-Extended: Apple Intelligence / Siri için içerik kullanım izni
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
