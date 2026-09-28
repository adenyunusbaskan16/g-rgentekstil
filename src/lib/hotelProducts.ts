// =============================================
// GÜRGENTEKSTIL - Otel ürün grupları (ortak veri)
// /otel-urunleri sayfasındaki bölümlerle birebir aynı gruplar; ürünler
// sayfası ve ana sayfadaki "Otel Ürünleri" örnekleri buradan beslenir.
// Görseller lib/images.ts içindeki HOTEL_IMAGES'tan gelir.
// =============================================

import { HOTEL_IMAGES } from "@/lib/images";

export interface HotelProduct {
  id: string;
  anchor_tr: string; // /otel-urunleri#<anchor>
  anchor_en: string; // /en/hotel-products#<anchor>
  name_tr: string;
  name_en: string;
  desc_tr: string;
  desc_en: string;
  image: string;
  featured: boolean; // ana sayfada örnek olarak gösterilir
}

export const HOTEL_PRODUCTS: HotelProduct[] = [
  {
    id: "towel",
    anchor_tr: "otel-havlulari",
    anchor_en: "hotel-towels",
    name_tr: "Otel Havluları",
    name_en: "Hotel Towels",
    desc_tr: "Örnek ölçüler, iplik seçenekleri, özel gramaj ve jakar desen imkânı.",
    desc_en: "Example sizes, yarn options, custom weight and jacquard pattern options.",
    image: HOTEL_IMAGES.towel[0],
    featured: true,
  },
  {
    id: "foot-towel",
    anchor_tr: "otel-ayak-havlulari",
    anchor_en: "hotel-foot-towels",
    name_tr: "Otel Ayak Havluları",
    name_en: "Hotel Foot Towels",
    desc_tr: "Otel banyoları için 50 × 70 cm örnek ölçüsüyle ayak havlusu.",
    desc_en: "Foot towels for hotel bathrooms, with 50 × 70 cm as an example size.",
    image: HOTEL_IMAGES.footTowel[0],
    featured: true,
  },
  {
    id: "bathrobe",
    anchor_tr: "otel-bornozlari",
    anchor_en: "hotel-bathrobes",
    name_tr: "Otel Bornozları",
    name_en: "Hotel Bathrobes",
    desc_tr: "Otel ve spa işletmeleri için toplu bornoz üretimi.",
    desc_en: "Bulk bathrobe production for hotels and spas.",
    image: HOTEL_IMAGES.bathrobe[0],
    featured: true,
  },
  {
    id: "bedspread",
    anchor_tr: "otel-pike",
    anchor_en: "hotel-bedspreads",
    name_tr: "Otel Pike",
    name_en: "Hotel Bedspreads",
    desc_tr: "Otel odalarının tasarım diline uygun sade ve dayanıklı pike.",
    desc_en: "Simple, durable bedspreads that suit hotel room design.",
    image: HOTEL_IMAGES.bedspread[0],
    featured: false,
  },
  {
    id: "duvet-cover",
    anchor_tr: "otel-nevresimleri",
    anchor_en: "hotel-duvet-covers",
    name_tr: "Otel Nevresimleri",
    name_en: "Hotel Duvet Covers",
    desc_tr: "Yoğun kullanıma dayanıklı, kolay yıkanabilir nevresim.",
    desc_en: "Durable, easy-to-wash duvet covers for heavy use.",
    image: HOTEL_IMAGES.duvetCover[0],
    featured: false,
  },
  {
    id: "bed-sheet",
    anchor_tr: "otel-carsaflari",
    anchor_en: "hotel-bed-sheets",
    name_tr: "Otel Çarşafları",
    name_en: "Hotel Bed Sheets",
    desc_tr: "Sık yıkamaya dayanıklı çarşaf; yatak ölçülerine göre ebat seçenekleri.",
    desc_en: "Bed sheets built for frequent washing, sized to your beds.",
    image: HOTEL_IMAGES.bedsheet[0],
    featured: true,
  },
  {
    id: "bedding-set",
    anchor_tr: "otel-nevresim-takimlari",
    anchor_en: "hotel-bedding-sets",
    name_tr: "Otel Nevresim Takımları",
    name_en: "Hotel Bedding Sets",
    desc_tr: "Oda standardizasyonu için nevresim, çarşaf ve yastık kılıfı setleri.",
    desc_en: "Duvet cover, sheet and pillowcase sets for room standardization.",
    image: HOTEL_IMAGES.beddingSet[0],
    featured: true,
  },
  {
    id: "pillowcase",
    anchor_tr: "otel-yastik-kiliflari",
    anchor_en: "hotel-pillowcases",
    name_tr: "Otel Yastık Kılıfları",
    name_en: "Hotel Pillowcases",
    desc_tr: "Set bazlı veya adet bazlı toptan yastık kılıfı tedariki.",
    desc_en: "Set-based or unit-based wholesale pillowcase supply.",
    image: HOTEL_IMAGES.pillowcase[0],
    featured: true,
  },
];
