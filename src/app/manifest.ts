import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gürgentekstil | Toptan Havlu Üretimi",
    short_name: "Gürgentekstil",
    description: "Denizli'de toptan havlu üretimi ve tedariki. El, yüz, ayak, mutfak ve banyo havlusu.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "portrait-primary",
    lang: "tr",
    categories: ["business", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      {
        name: "Ürünler",
        short_name: "Ürünler",
        description: "Havlu ürün kataloğu",
        url: "/urunler",
      },
      {
        name: "İletişim",
        short_name: "İletişim",
        description: "Teklif al ve iletişim",
        url: "/iletisim",
      },
    ],
  };
}
