// ══════════════════════════════════════════════════════════
// GÜRGENTEKSTIL — JSON-LD Schema Üreticileri
// Google, ChatGPT, Gemini, Perplexity için GEO altyapısı
// ══════════════════════════════════════════════════════════

import { COMPANY, SITE_URL } from "@/lib/data";

// Schema'larda her zaman production URL kullan — SEO için kritik
const BASE = SITE_URL;

/* ── Organization Schema ─────────────────────────────────── */
export function schemaOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "Gürgentekstil",
    legalName: "Gürgentekstil Havlu İmalatı",
    alternateName: ["Gurgen Tekstil", "Gürgentekstil Denizli"],
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    image: `${BASE}/opengraph-image`,
    description:
      "Gürgentekstil, Denizli Merkezefendi'de kurulu havlu üretim tesisiyle el, yüz, ayak, mutfak ve banyo havlusu üretimi ve toptan tedariki sunan bir tekstil üreticisidir.",
    foundingDate: "2010",
    foundingLocation: {
      "@type": "Place",
      name: "Denizli, Türkiye",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sumer Mahallesi 2507 Sokak No:45 B/Z2",
      addressLocality: "Merkezefendi",
      addressRegion: "Denizli",
      postalCode: "20070",
      addressCountry: "TR",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: `+90${COMPANY.phone}`,
        contactType: "sales",
        availableLanguage: ["Turkish", "English"],
        areaServed: ["TR", "EU", "WORLD"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        url: `https://wa.me/${COMPANY.whatsapp}`,
        availableLanguage: ["Turkish", "English"],
      },
    ],
    sameAs: [
      COMPANY.instagram,
      `https://wa.me/${COMPANY.whatsapp}`,
    ],
    knowsAbout: [
      "Havlu üretimi",
      "Toptan havlu tedariki",
      "Tekstil imalatı",
      "Türk tekstil ihracatı",
      "Towel manufacturing",
      "Wholesale towels Turkey",
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 6,
    },
  };
}

/* ── LocalBusiness Schema ────────────────────────────────── */
export function schemaLocalBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Manufacturer"],
    "@id": `${BASE}/#localbusiness`,
    name: "Gürgentekstil",
    description:
      "Denizli'de havlu üretimi ve toptan tedarik. El, yüz, ayak, mutfak ve banyo havlusu gruplarında hazır stok ve özel üretim.",
    url: BASE,
    telephone: `+90${COMPANY.phone}`,
    image: `${BASE}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sumer Mahallesi 2507 Sokak No:45 B/Z2",
      addressLocality: "Merkezefendi",
      addressRegion: "Denizli",
      postalCode: "20070",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.7627,
      longitude: 29.0920,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "13:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "TRY, EUR, USD",
    paymentAccepted: "Bank transfer, cash",
    areaServed: [
      { "@type": "Country", name: "Turkey" },
      { "@type": "Continent", name: "Europe" },
      { "@type": "Place", name: "Worldwide" },
    ],
    hasMap: "https://maps.google.com/?q=Sumer+Mahallesi+2507+Sokak+No:45+Merkezefendi+Denizli",
    parentOrganization: { "@id": `${BASE}/#organization` },
  };
}

/* ── WebSite + SearchAction Schema ──────────────────────── */
export function schemaWebSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    name: "Gürgentekstil",
    url: BASE,
    description: "Denizli toptan havlu üretimi ve tedariki",
    inLanguage: ["tr", "en"],
    publisher: { "@id": `${BASE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/urunler?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ── Breadcrumb Schema ───────────────────────────────────── */
export function schemaBreadcrumb(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/* ── Product Schema ──────────────────────────────────────── */
export function schemaProduct(p: {
  name_tr: string;
  name_en?: string;
  description_tr?: string;
  description_en?: string;
  slug: string;
  size?: string;
  weight_label?: string;
  color_options?: string[];
  image_url?: string;
  is_stock_available?: boolean;
  category?: { name_tr: string; name_en?: string };
}) {
  const url = `${BASE}/urunler/${p.slug}`;
  const image = p.image_url ?? `${BASE}/opengraph-image`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name_tr,
    alternateName: p.name_en,
    description: p.description_tr ?? `${p.name_tr} — %100 pamuktan üretilmiş toptan havlu.`,
    url,
    image: [image],
    sku: p.slug,
    mpn: p.slug,
    brand: {
      "@type": "Brand",
      name: "Gürgentekstil",
    },
    manufacturer: {
      "@id": `${BASE}/#organization`,
    },
    material: "%100 Pamuk",
    countryOfOrigin: "TR",
    ...(p.color_options?.length
      ? { color: p.color_options.join(", ") }
      : {}),
    ...(p.size ? { size: p.size } : {}),
    ...(p.weight_label ? { weight: p.weight_label } : {}),
    category: p.category?.name_tr ?? "Havlu",
    offers: {
      "@type": "Offer",
      availability: p.is_stock_available
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      price: "0",
      priceCurrency: "TRY",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "Toptan fiyat — WhatsApp veya telefon üzerinden teklif alın.",
      },
      url,
      seller: { "@id": `${BASE}/#organization` },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          currency: "TRY",
          value: "0",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "d",
          },
        },
      },
    },
    additionalProperty: [
      ...(p.size
        ? [{ "@type": "PropertyValue", name: "Ebat", value: p.size }]
        : []),
      ...(p.weight_label
        ? [{ "@type": "PropertyValue", name: "Gramaj", value: p.weight_label }]
        : []),
      { "@type": "PropertyValue", name: "Üretim Yeri", value: "Denizli, Türkiye" },
      { "@type": "PropertyValue", name: "Hammadde", value: "%100 Pamuk" },
    ],
  };
}

/* ── FAQ Schema ──────────────────────────────────────────── */
export function schemaFAQ(
  items: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/* ── ItemList Schema (Ürün listesi) ──────────────────────── */
export function schemaItemList(
  items: Array<{ name: string; url: string; position: number }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };
}

/* ── WebPage Schema (landing/kurumsal sayfalar için) ─────── */
export function schemaWebPage(p: {
  name: string;
  description: string;
  url: string;
  inLanguage?: "tr" | "en";
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${p.url}#webpage`,
    name: p.name,
    description: p.description,
    url: p.url,
    inLanguage: p.inLanguage ?? "tr",
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": `${BASE}/#organization` },
  };
}

/* ── Yardımcı: JSON-LD — ayrı TSX dosyasından import edin ──
   Kullanım: import { JsonLd } from "@/components/JsonLd"
─────────────────────────────────────────────────────────── */
