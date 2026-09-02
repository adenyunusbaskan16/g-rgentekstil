import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import { getWhatsAppUrl, SITE_URL } from "@/lib/data";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Üretim Kapasitesi — Yıllık 1.216 Ton Havlu Dokuma | Gürgentekstil",
  description:
    "Gürgentekstil, Denizli'de 450 m² kapalı üretim alanı ve yıllık 1.216 ton havlu dokuma kapasitesiyle toptan ve ihracat odaklı müşterilere hizmet verir.",
  alternates: {
    canonical: `${SITE_URL}/uretim-kapasitesi`,
    languages: { "tr": `${SITE_URL}/uretim-kapasitesi`, "en": `${SITE_URL}/en/production-capacity`, "x-default": `${SITE_URL}/uretim-kapasitesi` },
  },
  openGraph: {
    title: "Üretim Kapasitesi | Gürgentekstil Denizli",
    description: "450 m² kapalı üretim alanı, yıllık 1.216 ton dokuma kapasitesi. Armurlu ve jakarli makineler.",
    url: `${SITE_URL}/uretim-kapasitesi`,
    type: "website",
    locale: "tr_TR",
  },
};

const steps = [
  { n: "01", t: "Ham Madde Temini",   d: "Kaliteli pamuk ipliği temini ve stok yönetimi." },
  { n: "02", t: "Dokuma Üretimi",     d: "Armurlu ve jakarli makinelerle havlu kumaş üretimi." },
  { n: "03", t: "Kalite Kontrol",     d: "Kalite kontrol ekipmanlarıyla üretim boyunca denetim." },
  { n: "04", t: "Tartım & Paketleme", d: "Düzine veya çuval bazlı tartım ve paketleme." },
  { n: "05", t: "Stok & Sevkiyat",   d: "Hazır stok yönetimi ve zamanında teslimat." },
  { n: "06", t: "Müşteri Teslimi",   d: "Sipariş tamamlama ve müşteri memnuniyeti takibi." },
];

export default function UretimKapasitesiPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <Image src={IMAGES.weaving} alt="" fill style={{ objectFit: "cover", opacity: 0.12 }} quality={30} priority aria-hidden />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Üretim Kapasitesi</span>
          </nav>
          <span className="eyebrow">Altyapı</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12, maxWidth: "18ch" }}>
            Üretim Kapasitesi
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.875rem", maxWidth: "50ch", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Denizli Merkezefendi&apos;deki üretim altyapısı ve yıllık 1.216 ton havlu dokuma kapasitesi.
          </p>
        </div>
      </section>

      {/* Stat strip */}
      <section className="stat-strip">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }} className="sm:grid-cols-4">
            {[
              { v: "450 m²",    l: "Kapalı Üretim Alanı" },
              { v: "600 m²",    l: "Toplam Tesis Alanı" },
              { v: "1.216 ton", l: "Yıllık Dokuma Kap." },
              { v: "1.253 ton", l: "Pamuk İpliği Kap." },
            ].map((s) => (
              <div key={s.l} className="stat-item">
                <p className="stat-val">{s.v}</p>
                <p className="stat-label">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İçerik */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "start" }} className="lg:grid-cols-2">

            {/* Metin */}
            <div>
              <span className="eyebrow">Tesis</span>
              <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>Üretim Tesisi</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.75rem" }}>
                <p className="body-text">
                  Üretim tesisi Denizli Merkezefendi'de, 450 m² kapalı ve 600 m² toplam alana sahip
                  bir yapıda faaliyet göstermektedir.
                </p>
                <p className="body-text">
                  Yıllık 1.216 ton havlu dokuma kumaş üretim kapasitesiyle hem hazır stok ürünler
                  hem de siparişe göre değerlendirilen özel üretim taleplerini karşılamaktadır.
                </p>
                <p className="body-text">
                  Yıllık 1.253 ton pamuk ipliği tüketim kapasitesiyle kesintisiz üretim altyapısı
                  sürdürülmektedir.
                </p>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[
                  "Armurlu ve jakarli dokuma makineleri",
                  "Kalite kontrol ekipmanı",
                  "Tartım ve paketleme altyapısı",
                  "Hazır stok ve özel üretim imkânı",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.875rem", color: "var(--muted)" }}>
                    <CheckCircle size={14} color="var(--gold)" style={{ flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Teknik tablo */}
            <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
              <table className="tbl">
                <thead>
                  <tr><th>Bileşen</th><th>Detay</th></tr>
                </thead>
                <tbody>
                  {[
                    ["Makine Tipi",       "Armurlu ve jakarli dokuma"],
                    ["Makine Kökeni",     "İthal ve yerli yeni nesil"],
                    ["Üretim Kapasitesi", "Yıllık 1.216 ton"],
                    ["Ham Madde",         "Yıllık 1.253 ton pamuk ipliği"],
                    ["Kalite Kontrol",    "Ekipman mevcut"],
                    ["Destek Ekipman",    "Tartım, kompresör, levend kaldırma"],
                    ["Üretim Alanı",      "450 m² kapalı alan"],
                  ].map(([l, v]) => (
                    <tr key={l}><td>{l}</td><td style={{ fontWeight: 400 }}>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Süreç adımları */}
      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="eyebrow-center">Süreç</span>
            <h2 className="section-title">Üretim Sürecimiz</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "1px", background: "var(--border)" }}>
            {steps.map((s) => (
              <div key={s.n} style={{ background: "#fff", padding: "1.75rem 1.25rem", textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--navy)", color: "var(--gold)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  {s.n}
                </div>
                <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.4rem", fontSize: "0.875rem" }}>{s.t}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="div-gold" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow-center">İletişim</span>
          <h2 className="section-title-light" style={{ marginBottom: "1rem" }}>Üretim Talebiniz İçin Görüşelim</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "2.25rem", maxWidth: "45ch", margin: "0 auto 2.25rem", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Özel üretim ve toptan tedarik için WhatsApp veya teklif formu üzerinden ulaşın.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href={getWhatsAppUrl("tr")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-xl">
              <MessageCircle size={17} /> WhatsApp ile Teklif Al
            </a>
            <Link href="/makine-parkuru" className="btn btn-outline-w btn-xl">
              Makine Parkuru <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
