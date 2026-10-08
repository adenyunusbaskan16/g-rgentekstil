import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FactoryVideo from "@/components/sections/FactoryVideo";

/** Fabrika videosu üzerinde kısa tanıtım metni olan tam genişlik bant. */
export default function VideoBand({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const isEn = lang === "en";
  return (
    <section className="video-band" aria-label={isEn ? "Inside our factory" : "Fabrikamızdan kareler"}>
      <FactoryVideo
        label={isEn ? "Towel weaving looms at the Gurgen Tekstil factory in Denizli" : "Gürgentekstil Denizli fabrikasında havlu dokuma tezgâhları"}
      />
      <div className="wrap video-band-content">
        <div style={{ maxWidth: 520 }}>
          <span className="video-chip"><i aria-hidden />{isEn ? "Live production" : "Canlı üretim"}</span>
          <h2 className="section-title-light" style={{ marginBottom: "1rem" }}>
            {isEn ? "Woven in Denizli, on our own looms" : "Denizli'de, kendi tezgâhlarımızda dokunuyor"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9375rem", lineHeight: 1.8, marginBottom: "1.75rem" }}>
            {isEn
              ? "Dobby and jacquard weaving machines, 450 m² of closed production area and 1,216 tons of annual weaving capacity."
              : "Armürlü ve jakarlı dokuma makineleri, 450 m² kapalı üretim alanı ve yıllık 1.216 ton dokuma kapasitesi."}
          </p>
          <Link href={isEn ? "/en/machinery" : "/makine-parkuru"} className="btn btn-outline-w btn-lg">
            {isEn ? "Our Machinery" : "Makine Parkurumuz"} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
