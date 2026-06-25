import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gürgentekstil | Toptan Havlu Üretimi",
    short_name: "Gürgentekstil",
    description: "Denizli'de toptan havlu üretimi ve tedariki. El, yüz, ayak, mutfak ve banyo havlusu.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1520",
    theme_color: "#0a1520",
    orientation: "portrait-primary",
    lang: "tr",
    categories: ["business", "shopping"],
    icons: [
      { src: "/icon",       sizes: "32x32",   type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
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
