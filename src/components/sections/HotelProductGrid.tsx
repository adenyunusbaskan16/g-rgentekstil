import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { COMPANY } from "@/lib/data";
import type { HotelProduct } from "@/lib/hotelProducts";

/**
 * Otel ürünleri kart ızgarası — mevcut ürün kartlarıyla (prod-card) aynı
 * görünüm. Server Component; ek JS göndermez.
 */
export default function HotelProductGrid({
  items,
  lang = "tr",
}: {
  items: HotelProduct[];
  lang?: "tr" | "en";
}) {
  const isEn = lang === "en";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(272px, 1fr))",
        gap: "1.25rem",
      }}
    >
      {items.map((p) => {
        const name = isEn ? p.name_en : p.name_tr;
        const href = isEn
          ? `/en/hotel-products#${p.anchor_en}`
          : `/otel-urunleri#${p.anchor_tr}`;
        const waMsg = isEn
          ? `Hello, I am reaching you from your website. I would like to get information about ${name}.`
          : `Merhabalar, İnternet Sitenizden Ulaşıyorum. ${name} hakkında bilgi almak istiyorum.`;

        return (
          <article key={p.id} className="prod-card">
            <Link href={href} style={{ textDecoration: "none", display: "block" }}>
              <div
                className="prod-img-wrap"
                style={{ aspectRatio: "4/5", position: "relative", background: "#f8f5f0" }}
              >
                <Image
                  src={p.image}
                  alt={isEn ? `${name} — wholesale production` : `${name} — toptan üretim`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                  quality={75}
                />
                <span
                  className="badge badge-gold"
                  style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}
                >
                  {isEn ? "Hotel" : "Otel"}
                </span>
              </div>
            </Link>
            <div style={{ padding: "1.375rem" }}>
              <Link href={href} style={{ textDecoration: "none" }}>
                <h3
                  style={{
                    fontWeight: 700,
                    color: "var(--navy)",
                    marginBottom: "0.625rem",
                    fontSize: "0.9375rem",
                    lineHeight: 1.3,
                  }}
                >
                  {name}
                </h3>
              </Link>
              <p className="body-sm" style={{ marginBottom: "1.125rem" }}>
                {isEn ? p.desc_en : p.desc_tr}
              </p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <Link href={href} className="btn btn-outline btn-sm" style={{ flex: 1, fontSize: "0.7rem" }}>
                  {isEn ? "View" : "İncele"}
                </Link>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa btn-sm"
                  style={{ flex: 1, fontSize: "0.7rem" }}
                >
                  <MessageCircle size={13} /> {isEn ? "Get a Quote" : "Teklif Al"}
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
