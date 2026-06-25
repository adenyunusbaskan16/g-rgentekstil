import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Makine Parkuru — Armurlu ve Jakarli Dokuma | Gürgentekstil",
  description:
    "Gürgentekstil; armurlu ve jakarli, ithal ve yerli yeni nesil dokuma makineleriyle yıllık 1.216 ton kapasiteyle havlu üretimi yapmaktadır.",
  alternates: {
    canonical: "https://gürgentekstil.com/makine-parkuru",
    languages: { "tr": "https://gürgentekstil.com/makine-parkuru", "en": "https://gürgentekstil.com/en/machinery", "x-default": "https://gürgentekstil.com/makine-parkuru" },
  },
  openGraph: {
    title: "Makine Parkuru | Gürgentekstil Denizli",
    description: "Armurlu ve jakarli dokuma makineleriyle yıllık 1.216 ton havlu üretim kapasitesi.",
    url: "https://gürgentekstil.com/makine-parkuru",
    type: "website",
    locale: "tr_TR",
  },
};

const machines = [
  {
    n: "01", t: "Armurlu Dokuma Makineleri",
    d: "Düz ve küçük desenli havlu üretimine uygun yüksek hızlı makineler. Farklı gramaj seçenekleri sunar.",
    specs: ["Yüksek üretim hızı", "Farklı gramaj seçenekleri", "Geniş ürün yelpazesi"],
  },
  {
    n: "02", t: "Jakarli Dokuma Makineleri",
    d: "Karmaşık desen ve motifli havlu kumaşları için ideal altyapı. Marka ve özel üretim talepleri için.",
    specs: ["Özel desen kapasitesi", "Marka üretimi uyumlu", "Yüksek desen çözünürlüğü"],
  },
  {
    n: "03", t: "Yardımcı Ekipmanlar",
    d: "Tartım, kompresör ve levend kaldırma sistemleriyle tam entegrasyon. Kalite kontrolü destekler.",
    specs: ["Tartım ve kalite kontrol", "Kompresör sistemi", "Levend kaldırma altyapısı"],
  },
];

export default function MakineParkuruPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <Image src={IMAGES.factory} alt="" fill style={{ objectFit: "cover", opacity: 0.12 }} quality={30} priority aria-hidden />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Makine Parkuru</span>
          </nav>
          <span className="eyebrow">Teknik Altyapı</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12, maxWidth: "18ch" }}>
            Makine Parkuru<br />ve Dokuma Altyapısı
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.875rem", maxWidth: "50ch", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Armurlu ve jakarli, ithal ve yerli yeni nesil dokuma makineleriyle oluşturulan üretim altyapısı.
          </p>
        </div>
      </section>

      {/* Makine kartları */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ maxWidth: 680, marginBottom: "3rem" }}>
            <span className="eyebrow">Altyapı</span>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>Üretim Altyapımız</h2>
            <p className="body-text">
              Gürgentekstil üretim tesisinde armurlu ve jakarli, ithal ve yerli yeni nesil dokuma
              makineleri kullanılmaktadır. Bu altyapı farklı kategorilerde üretim esnekliği sağlar.
              Havlu dokuma işleminin yanı sıra kalite kontrol, tartım ve levend kaldırma ekipmanlarıyla
              bütünleşik süreç yönetimi yapılmaktadır.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
            {machines.map((m) => (
              <div key={m.n} style={{
                background: "#fff",
                border: "1px solid var(--border)",
                padding: "2rem 1.75rem",
                transition: "border-color 0.22s, box-shadow 0.22s",
              }}
                className="hover:border-[var(--gold)] hover:shadow-lg">
                {/* Numara */}
                <div style={{
                  width: 44, height: 44, background: "var(--navy)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)" }}>{m.n}</span>
                </div>
                <h3 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.625rem", fontSize: "1rem" }}>{m.t}</h3>
                <p className="body-sm" style={{ marginBottom: "1.125rem" }}>{m.d}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {m.specs.map((s) => (
                    <li key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                      <CheckCircle size={13} color="var(--gold)" style={{ flexShrink: 0 }} /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teknik tablo */}
      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Teknik Veriler</span>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>Altyapı Özeti</h2>
              <p className="body-text" style={{ marginBottom: "1.25rem" }}>
                Üretim tesisimizin teknik kapasitesi ve altyapı bileşenleri.
              </p>
              {/* Uyarı notu */}
              <div style={{ background: "#fff", borderLeft: "3px solid var(--gold)", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.75 }}>
                <strong style={{ color: "var(--navy)", display: "block", marginBottom: "0.2rem" }}>Makine Markaları Hakkında</strong>
                Üretim altyapımızda kullanılan makine markaları ticari gerekçelerle paylaşılmamaktadır.
                Teknik detaylar için görüşme talep edebilirsiniz.
              </div>
            </div>
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

      {/* CTA */}
      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="div-gold" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow-center">Üretim</span>
          <h2 className="section-title-light" style={{ marginBottom: "1rem" }}>Siparişe Göre Üretim Talepleri</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "2.25rem", maxWidth: "45ch", margin: "0 auto 2.25rem", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Özel desen, ebat veya gramaj talepleriniz için görüşme başlatın.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href={getWhatsAppUrl("tr")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-xl">
              <MessageCircle size={17} /> WhatsApp ile Görüş
            </a>
            <Link href="/uretim-kapasitesi" className="btn btn-outline-w btn-xl">
              Kapasite Detayları <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
