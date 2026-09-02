// ════════════════════════════════════════════════════════════
// GÜRGENTEKSTIL — Görsel Kaynakları
// Tüm görseller Unsplash üzerinden yükleniyor
// Kendi ürün görsellerinizi admin panelinden yükleyebilirsiniz
// ════════════════════════════════════════════════════════════

export const IMAGES = {

  // ── HERO — Kullanıcının eklediği özel görsel ─────────────────────
  hero: "/images/hero-towel.webp",

  // ── ÜRETİM / HAKKIMIZDA ──────────────────────────────────────────
  factory:    "/images/imalathane.webp",
  imalathane: "/images/imalathane.webp",
  weaving:    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1000&q=80&auto=format&fit=crop",
  towelStack: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&q=80&auto=format&fit=crop",
  yarn:       "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=900&q=80&auto=format&fit=crop",
  cotton:     "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80&auto=format&fit=crop",

  // ── KATEGORİ KARTLARI — Gerçek ürün görselleri ─────────────────────
  categories: {
    // El havlusu — gerçek ürün görseli yok, imalathane görseli fallback
    elHavlusu:     "https://okymonntnhjoqhcuyyjd.supabase.co/storage/v1/object/public/product-images/armullu-petek-desen-yuz-bas-havlusu-50x85.png",
    // Yüz havlusu
    yuzHavlusu:    "https://okymonntnhjoqhcuyyjd.supabase.co/storage/v1/object/public/product-images/dantel-desen-jakarli-yuz-bas-havlusu-50x85.png",
    // Ayak havlusu
    ayakHavlusu:   "https://okymonntnhjoqhcuyyjd.supabase.co/storage/v1/object/public/product-images/ayak-desen-jakarli-renkli-paspas-ayak-havlusu-50x70.png",
    // Banyo havlusu
    banyoHavlusu:  "https://okymonntnhjoqhcuyyjd.supabase.co/storage/v1/object/public/product-images/armullu-petek-desen-banyo-havlusu-90x150.png",
    // Mutfak havlusu — düğüncü havlusu fallback
    mutfakHavlusu: "https://okymonntnhjoqhcuyyjd.supabase.co/storage/v1/object/public/product-images/duguncu-havlusu-40x70.png",
    // Toptan grup
    toptanGrup:    "https://okymonntnhjoqhcuyyjd.supabase.co/storage/v1/object/public/product-images/kismi-kadife-jakarli-yuz-bas-havlusu-50x85.png",
  },

  // ── ÜRÜN FALLBACK ─────────────────────────────────────────────────
  products: {
    p1: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&q=75&auto=format&fit=crop",
    p2: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=75&auto=format&fit=crop",
    p3: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=75&auto=format&fit=crop",
    p4: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&q=75&auto=format&fit=crop",
    p5: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=75&auto=format&fit=crop",
    p6: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&q=75&auto=format&fit=crop",
  },

} as const;

export const CATEGORY_IMAGES = [
  IMAGES.categories.elHavlusu,
  IMAGES.categories.yuzHavlusu,
  IMAGES.categories.ayakHavlusu,
  IMAGES.categories.banyoHavlusu,
  IMAGES.categories.mutfakHavlusu,
  IMAGES.categories.toptanGrup,
];

export const PRODUCT_FALLBACK_IMAGES = [
  IMAGES.products.p1,
  IMAGES.products.p2,
  IMAGES.products.p3,
  IMAGES.products.p4,
  IMAGES.products.p5,
  IMAGES.products.p6,
];

// ════════════════════════════════════════════════════════════
// OTEL ÜRÜNLERİ SAYFASI
// Her ürün grubu KENDİ gerçek fotoğrafını kullanır — başka bir
// üründen/kategoriden ödünç görsel yok. Henüz fotoğrafı olmayan
// gruplar `undefined` bırakılır ve sayfada bir placeholder çerçeve
// gösterilir (bkz. ImagePlaceholder bileşeni). Yeni fotoğraf
// eklendiğinde sadece buradaki değeri güncellemeniz yeterli.
// ════════════════════════════════════════════════════════════
export const HOTEL_IMAGES = {
  heroBg: IMAGES.towelStack, // dekoratif arka plan — ürün fotoğrafı değil
  towel: ["/images/otel/otel-havlu.webp"],
  footTowel: ["/images/otel/otel-ayak-havlusu.webp"],
  bathrobe: ["/images/otel/otel-bornoz.webp"],
  bedspread: ["/images/otel/otel-pike.jpg"],
  duvetCover: ["/images/otel/otel-nevresim.jpg"],
  bedsheet: ["/images/otel/otel-carsaf.jpg"],
  beddingSet: ["/images/otel/otel-nevresim-takimi.png"],
  pillowcase: ["/images/otel/otel-yastik-kilifi.jpg"],
} as const;
