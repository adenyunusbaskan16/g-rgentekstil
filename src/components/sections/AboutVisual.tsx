import Image from "next/image";
import { IMAGES } from "@/lib/images";

/**
 * Ana sayfa "Hakkımızda" görseli: dış çekim büyük, fabrika içi küçük iç görsel.
 * Göz yormaması için tek ana görsel + tek küçük vurgu.
 */
export default function AboutVisual({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const isEn = lang === "en";
  return (
    <div className="about-visual">
      <div className="about-visual-main">
        <Image
          src={IMAGES.exterior}
          alt={isEn ? "Gurgen Tekstil towel factory exterior — Denizli" : "Gürgentekstil havlu fabrikası dış görünüm — Denizli"}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width:1024px)100vw,50vw"
          quality={82}
        />
      </div>
      <div className="about-visual-inset">
        <Image
          src={IMAGES.interior}
          alt={isEn ? "Inside the factory — towel stock and finishing area" : "Fabrika içi — havlu stok ve son işlem alanı"}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width:1024px)45vw,22vw"
          quality={78}
        />
      </div>
      <div className="about-visual-badge">
        <p className="about-visual-badge-val">450m²</p>
        <p className="about-visual-badge-lbl">{isEn ? "Closed Production Area" : "Kapalı Üretim Alanı"}</p>
      </div>
    </div>
  );
}
