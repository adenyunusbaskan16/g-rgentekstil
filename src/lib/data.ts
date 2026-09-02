// =============================================
// GÜRGENTEKSTIL - Sabit İçerik Verileri
// =============================================

// Tek kaynak — tüm canonical/hreflang/JSON-LD/sitemap/robots bu domaini kullanır.
// Punycode (xn--) formu next.config.ts'deki redirect hedefiyle birebir aynıdır.
export const SITE_URL = "https://xn--grgentekstil-dlb.com";

export const COMPANY = {
  name: "Gürgentekstil",
  nameFull: "Gürgentekstil Havlu İmalatı",
  nameEn: "Gurgen Tekstil",
  address: "Sumer Mahallesi 2507 Sokak No:45 B/Z2, Merkezefendi / Denizli",
  phone: "05325570971",
  phoneFormatted: "0532 557 09 71",
  whatsapp: "905325570971",
  instagram: "https://www.instagram.com/gurgentekstil/",
  instagramHandle: "@gurgentekstil",
  domain: "gürgentekstil.com",
} as const;

export const STATS = [
  {
    value: "450 m²",
    label_tr: "Kapalı Üretim Alanı",
    label_en: "Closed Production Area",
    icon: "factory",
  },
  {
    value: "600 m²",
    label_tr: "Toplam Alan",
    label_en: "Total Area",
    icon: "building",
  },
  {
    value: "1.216 ton",
    label_tr: "Yıllık Havlu Dokuma Kapasitesi",
    label_en: "Annual Towel Weaving Capacity",
    icon: "layers",
  },
  {
    value: "6 Kişi",
    label_tr: "Uzman Ekip",
    label_en: "Expert Team",
    icon: "users",
  },
] as const;

export const PRODUCT_SIZES = [
  { size: "30x50 cm", use_tr: "Mutfak El Havlusu / El Havlusu", use_en: "Kitchen Hand Towel / Hand Towel" },
  { size: "40x80 cm", use_tr: "Yüz ve Baş Havlusu", use_en: "Face and Head Towel" },
  { size: "50x70 cm", use_tr: "Ayak Havlusu", use_en: "Foot Towel" },
  { size: "50x90 cm", use_tr: "Yüz ve Baş Havlusu", use_en: "Face and Head Towel" },
  { size: "90x150 cm", use_tr: "Banyo Havlusu", use_en: "Bath Towel" },
  { size: "Diğer Ebatlar", use_tr: "Stok ve üretim durumuna göre görüşülür", use_en: "Subject to stock and production status" },
] as const;

export const WHATSAPP_TEMPLATE = {
  tr: "Merhabalar, İnternet Sitenizden Ulaşıyorum. Havlu ürünleri hakkında bilgi almak istiyorum.",
  en: "Hello, I am reaching you from your website. I would like to get information about your towel products.",
};

export function getWhatsAppUrl(lang: "tr" | "en" = "tr") {
  const message = encodeURIComponent(WHATSAPP_TEMPLATE[lang]);
  return `https://wa.me/${COMPANY.whatsapp}?text=${message}`;
}

export function getPhoneUrl() {
  // phone: "05325570971" → tel:+905325570971
  return `tel:+9${COMPANY.phone}`;
}

// SEO meta verileri
export const SEO = {
  tr: {
    home: {
      title: "Gürgentekstil | Denizli Toptan Havlu Üretimi ve Tedariki",
      description:
        "Gürgentekstil, Denizli'de toptan havlu, el havlusu, yüz havlusu ve banyo havlusu tedariki sunan üretici firmasıdır. WhatsApp ile teklif alın.",
    },
    about: {
      title: "Hakkımızda | Gürgentekstil Denizli Havlu Üreticisi",
      description:
        "Gürgentekstil, Denizli Merkezefendi'de toptan havlu tedariki ve siparişe göre üretim talepleri için hizmet veren tekstil üreticisidir.",
    },
    production: {
      title: "Havlu Üretim Kapasitesi | Gürgentekstil Denizli",
      description:
        "Gürgentekstil, Denizli'deki üretim altyapısı ve yıllık 1.216 ton havlu dokuma kumas kapasitesiyle toptan ve ihracat odaklı müşterilere hizmet verir.",
    },
    machinery: {
      title: "Makine Parkuru | Armurlu ve Jakarli Havlu Dokuma",
      description:
        "Gürgentekstil; armurlu ve jakarli, ithal ve yerli yeni nesil dokuma makineleriyle havlu üretimi ve toptan tedarik taleplerini değerlendirir.",
    },
    products: {
      title: "Toptan Havlu Ürünleri | El, Yüz ve Banyo Havlusu",
      description:
        "30x50, 40x80, 50x70, 50x90, 90x150 ve diğer ebatlarda el, yüz, baş, mutfak ve banyo havlusu için Gürgentekstil ile görüşün.",
    },
    contact: {
      title: "Teklif Al | Gürgentekstil İletişim",
      description:
        "Toptan havlu, stok ürün ve siparişe göre üretim talepleriniz için Gürgentekstil ile WhatsApp, telefon veya teklif formu üzerinden iletişime geçin.",
    },
  },
  en: {
    home: {
      title: "Gurgen Tekstil | Towel Manufacturer in Denizli, Turkey",
      description:
        "Gurgen Tekstil is a Denizli-based towel manufacturer and wholesale supplier serving brands, wholesalers and export buyers. Contact us for towel offers.",
    },
    about: {
      title: "About Us | Gurgen Tekstil Denizli Towel Manufacturer",
      description:
        "Gurgen Tekstil is a textile manufacturer based in Denizli Merkezefendi serving wholesale towel supply and custom production requests.",
    },
    production: {
      title: "Production Capacity | Gurgen Tekstil Denizli",
      description:
        "Gurgen Tekstil serves wholesale and export-focused customers with its production infrastructure and annual capacity of 1,216 tons of towel weaving.",
    },
    machinery: {
      title: "Machinery | Dobby and Jacquard Towel Weaving",
      description:
        "Gurgen Tekstil evaluates towel production and wholesale supply requests with dobby and jacquard, imported and domestic new generation weaving machines.",
    },
    products: {
      title: "Wholesale Towels from Turkey | Gurgen Tekstil",
      description:
        "Contact Gurgen Tekstil for hand towels, face towels, head towels, kitchen towels and bath towels in 30x50, 40x80, 50x70, 50x90, 90x150 and other sizes.",
    },
    contact: {
      title: "Get a Quote | Gurgen Tekstil Contact",
      description:
        "Contact Gurgen Tekstil via WhatsApp, phone or quote form for wholesale towels, stock products and custom production requests.",
    },
  },
} as const;

// Nav linkleri
export const NAV_LINKS = {
  tr: [
    { href: "/", label: "Ana Sayfa" },
    { href: "/kurumsal", label: "Kurumsal" },
    { href: "/uretim-kapasitesi", label: "Üretim Kapasitesi" },
    { href: "/makine-parkuru", label: "Makine Parkuru" },
    { href: "/urunler", label: "Ürünler" },
    { href: "/otel-urunleri", label: "Otel Ürünleri" },
    { href: "/iletisim", label: "İletişim" },
  ],
  en: [
    { href: "/en", label: "Home" },
    { href: "/en/about", label: "About" },
    { href: "/en/production-capacity", label: "Production" },
    { href: "/en/machinery", label: "Machinery" },
    { href: "/en/products", label: "Products" },
    { href: "/en/hotel-products", label: "Hotel Products" },
    { href: "/en/contact", label: "Contact" },
  ],
} as const;

// TR <-> EN sayfa eşleşmeleri (dil değiştirici için)
export const LANG_PAIRS: Record<string, string> = {
  "/": "/en",
  "/kurumsal": "/en/about",
  "/uretim-kapasitesi": "/en/production-capacity",
  "/makine-parkuru": "/en/machinery",
  "/urunler": "/en/products",
  "/otel-urunleri": "/en/hotel-products",
  "/iletisim": "/en/contact",
  "/kvkk": "/en/privacy",
  "/en": "/",
  "/en/about": "/kurumsal",
  "/en/production-capacity": "/uretim-kapasitesi",
  "/en/machinery": "/makine-parkuru",
  "/en/products": "/urunler",
  "/en/hotel-products": "/otel-urunleri",
  "/en/contact": "/iletisim",
  "/en/privacy": "/kvkk",
};
