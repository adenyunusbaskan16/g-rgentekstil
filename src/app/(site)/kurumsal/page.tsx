import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import { COMPANY, getWhatsAppUrl } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import { schemaOrganization, schemaBreadcrumb } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Hakkımızda — Denizli Havlu Üreticisi | Gürgentekstil",
  description:
    "Gürgentekstil, Denizli Merkezefendi'de 450 m² kapalı üretim alanında el, yüz, ayak, mutfak ve banyo havlusu üreten kurumsal bir tekstil üreticisidir.",
  alternates: {
    canonical: "https://gürgentekstil.com/kurumsal",
    languages: { "tr": "https://gürgentekstil.com/kurumsal", "en": "https://gürgentekstil.com/en/about", "x-default": "https://gürgentekstil.com/kurumsal" },
  },
  openGraph: {
    title: "Hakkımızda — Gürgentekstil Denizli Havlu Üreticisi",
    description: "Denizli Merkezefendi'de kurulu üretim tesisimizle toptancılara, markalara ve ihracat müşterilerine hizmet veriyoruz.",
    url: "https://gürgentekstil.com/kurumsal",
    type: "website",
    locale: "tr_TR",
  },
};

export default function KurumsalPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <Image
          src={IMAGES.towelStack}
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.1 }}
          quality={30}
          priority
          aria-hidden
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(120deg, rgba(10,21,31,0.97) 0%, rgba(10,21,31,0.82) 60%, rgba(10,21,31,0.6) 100%)",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Kurumsal</span>
          </nav>
          <span className="eyebrow">Kurumsal</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
              maxWidth: "18ch",
            }}
          >
            Gürgentekstil Hakkında
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              marginTop: "0.875rem",
              maxWidth: "50ch",
              fontSize: "0.9375rem",
              lineHeight: 1.8,
            }}
          >
            Denizli Merkezefendi&apos;de kurulu üretim tesisimizle toptancılara, markalara
            ve ihracat müşterilerine hizmet veriyoruz.
          </p>
        </div>
      </section>

      {/* ── Ana İçerik ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "start" }}
            className="lg:grid-cols-12"
          >
            {/* Sol — Metin */}
            <div style={{ gridColumn: "span 7" }} className="lg:col-span-7">
              <span className="eyebrow">Kim Biz?</span>
              <h2 className="section-title" style={{ marginBottom: "1.375rem" }}>
                Denizli&apos;de Havlu Üretimi<br />ve Toptan Tedarik
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <p className="body-text">
                  <strong style={{ color: "var(--navy)", fontWeight: 700 }}>Gürgentekstil</strong>,
                  Denizli Merkezefendi&apos;de 450 m² kapalı üretim alanında el havlusu, yüz havlusu,
                  ayak havlusu, mutfak el havlusu ve banyo havlusu üretimi yapan kurumsal bir tekstil üreticisidir.
                </p>
                <p className="body-text">
                  Armurlu ve jakarli, ithal ve yerli yeni nesil dokuma makineleriyle oluşturulan
                  üretim altyapısıyla yıllık 1.216 ton havlu dokuma kumaş üretim kapasitesine sahiptir.
                </p>
                <p className="body-text">
                  Hazır stok ürünleri toptancılara ve mağazalara çuval bazlı ve düzine şeklinde
                  sunulmaktadır. Özel üretim talepleri siparişe göre değerlendirilmektedir.
                </p>
              </div>

              {/* Satış modeli notu */}
              <div
                style={{
                  background: "var(--cream)",
                  borderLeft: "3px solid var(--gold)",
                  padding: "1.125rem 1.375rem",
                  marginBottom: "2.25rem",
                  fontSize: "0.8375rem",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                }}
              >
                <strong style={{ color: "var(--navy)", display: "block", marginBottom: "0.25rem", fontSize: "0.875rem" }}>
                  Satış Modeli
                </strong>
                Hazır stok ürünlerde esnek alım imkânı; özel üretim talepleri siparişe göre değerlendirilir.
                Site fiyat göstermemekte, teklif ve sipariş görüşmeleri WhatsApp ve telefon üzerinden yürütülmektedir.
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
                <a
                  href={getWhatsAppUrl("tr")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa btn-lg"
                >
                  <MessageCircle size={16} />
                  WhatsApp ile Teklif Al
                </a>
                <Link href="/iletisim" className="btn btn-outline btn-lg">
                  Teklif Formu
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Sağ — Kartlar */}
            <div
              style={{ gridColumn: "span 5", display: "flex", flexDirection: "column", gap: "1px" }}
              className="lg:col-span-5"
            >
              {/* Firma Bilgileri */}
              <div className="info-card">
                <Image
                  src={IMAGES.factory}
                  alt=""
                  fill
                  style={{ objectFit: "cover", opacity: 0.07 }}
                  quality={30}
                  aria-hidden
                />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <span className="info-card-head">Firma Bilgileri</span>
                  <dl style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {[
                      { l: "Firma",     v: "Gürgentekstil" },
                      { l: "Sektör",   v: "Havlu Üretimi ve Toptan Tedarik" },
                      { l: "Lokasyon", v: "Merkezefendi / Denizli" },
                      { l: "Telefon",  v: COMPANY.phoneFormatted },
                    ].map((item) => (
                      <div key={item.l} style={{ display: "flex", gap: "1rem" }}>
                        <dt
                          style={{
                            width: "5rem",
                            flexShrink: 0,
                            fontSize: "0.775rem",
                            color: "rgba(255,255,255,0.28)",
                            paddingTop: "0.1rem",
                          }}
                        >
                          {item.l}
                        </dt>
                        <dd style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                          {item.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Müşteri Grupları */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderTop: "none",
                  padding: "2rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "1.25rem",
                  }}
                >
                  Müşteri Grupları
                </span>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Toptan havlu almak isteyen mağazalar",
                    "Kendi markası için havlu ürettiren firmalar",
                    "İhracat yapan tekstil aracıları",
                    "Otel, spa ve kurumsal alıcılar",
                    "Yurt dışı towel manufacturer arayanlar",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}
                    >
                      <CheckCircle size={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: "0.8375rem", color: "var(--muted)", lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Görsel ── */}
      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="eyebrow">Tesisimiz</span>
            <h2 className="section-title">Üretim Altyapımız</h2>
          </div>
          {/* İmalathane görseli tam boyut */}
          <div style={{ overflow: "hidden", border: "1px solid var(--border)" }}>
            <Image
              src={IMAGES.factory}
              alt="Gürgentekstil üretim tesisi — Denizli Merkezefendi"
              width={941}
              height={1672}
              style={{ width: "100%", height: "auto", display: "block" }}
              sizes="100vw"
              quality={85}
            />
            {/* Alt bilgi bandı */}
            <div style={{ background: "var(--navy)", padding: "1.25rem 1.75rem", display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { v: "450 m²", l: "Kapalı Üretim Alanı" },
                { v: "600 m²", l: "Toplam Alan" },
                { v: "1.216 ton", l: "Yıllık Kapasite" },
              ].map((s) => (
                <div key={s.l}>
                  <p style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--gold)", lineHeight: 1 }}>{s.v}</p>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stat Band ── */}
      <section className="stat-strip">
        <div className="wrap">
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
            className="sm:grid-cols-4"
          >
            {[
              { v: "450 m²",    l: "Kapalı Üretim\nAlanı" },
              { v: "600 m²",    l: "Toplam\nAlan" },
              { v: "1.216 ton", l: "Yıllık Dokuma\nKapasitesi" },
              { v: "B2B",       l: "Toptancı &\nİhracat" },
            ].map((s) => (
              <div key={s.l} className="stat-item">
                <p className="stat-val" style={{ whiteSpace: "pre-line" }}>{s.v}</p>
                <p className="stat-label" style={{ whiteSpace: "pre-line" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="sec"
        style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}
      >
        <div className="div-gold" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <Image
          src={IMAGES.cotton}
          alt=""
          fill
          aria-hidden
          style={{ objectFit: "cover", opacity: 0.06 }}
          quality={30}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow-center">İletişim</span>
          <h2 className="section-title-light" style={{ marginBottom: "1rem" }}>
            Görüşme Başlatın
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              marginBottom: "2.25rem",
              maxWidth: "44ch",
              margin: "0 auto 2.25rem",
              fontSize: "0.9375rem",
              lineHeight: 1.8,
            }}
          >
            Teklif ve sipariş için WhatsApp veya teklif formu üzerinden ulaşın.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a
              href={getWhatsAppUrl("tr")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-xl"
            >
              <MessageCircle size={17} />
              WhatsApp ile Teklif Al
            </a>
            <Link href="/iletisim" className="btn btn-outline-w btn-xl">
              Teklif Formu
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <JsonLd data={schemaOrganization()} />
      <JsonLd data={schemaBreadcrumb([
        { name: "Ana Sayfa", url: "https://gürgentekstil.com" },
        { name: "Kurumsal", url: "https://gürgentekstil.com/kurumsal" },
      ])} />
    </>
  );
}
