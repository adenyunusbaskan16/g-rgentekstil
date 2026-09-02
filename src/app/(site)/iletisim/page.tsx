import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageCircle, MapPin, ChevronRight } from "lucide-react";
import { COMPANY, getWhatsAppUrl, SITE_URL } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import QuoteForm from "@/components/sections/QuoteForm";

export const metadata: Metadata = {
  title: "Teklif Al & İletişim | Gürgentekstil Denizli",
  description:
    "Toptan havlu, stok ürün ve siparişe göre üretim talepleriniz için Gürgentekstil ile WhatsApp, telefon veya teklif formu üzerinden iletişime geçin. Hızlı dönüş garantisi.",
  alternates: {
    canonical: `${SITE_URL}/iletisim`,
    languages: { "tr": `${SITE_URL}/iletisim`, "en": `${SITE_URL}/en/contact`, "x-default": `${SITE_URL}/iletisim` },
  },
  openGraph: {
    title: "Teklif Al — Gürgentekstil İletişim",
    description: "Toptan havlu tedariki için WhatsApp, telefon veya form üzerinden teklif alın.",
    url: `${SITE_URL}/iletisim`,
    type: "website",
    locale: "tr_TR",
  },
};

function IconInstagram({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
    </svg>
  );
}

function IconClock({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  );
}

export default function IletisimPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <Image
          src={IMAGES.factory}
          alt=""
          fill
          style={{ objectFit: "cover", opacity: 0.09 }}
          quality={30}
          priority
          aria-hidden
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">İletişim</span>
          </nav>
          <span className="eyebrow">İletişim</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem,4vw,3rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
            }}
          >
            Teklif Al &amp; İletişim
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
            Toptan tedarik, stok ürünler ve özel üretim talepleriniz için hızla iletişime geçin.
          </p>
        </div>
      </section>

      {/* ── İçerik ── */}
      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "start" }}
            className="lg:grid-cols-5"
          >
            {/* Sol — İletişim kartları */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }} className="lg:col-span-2">

              {/* WhatsApp */}
              <a
                href={getWhatsAppUrl("tr")}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem 1.375rem",
                  background: "var(--navy)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                className="hover:bg-[var(--navy-2)]"
              >
                <div
                  style={{
                    width: 46, height: 46,
                    background: "var(--wa)",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle size={22} color="#fff" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.9375rem" }}>
                    WhatsApp ile Teklif Al
                  </p>
                  <p style={{ fontSize: "0.775rem", color: "rgba(255,255,255,0.38)", marginTop: "0.15rem" }}>
                    {COMPANY.phoneFormatted}
                  </p>
                </div>
              </a>

              {/* Telefon */}
              <a href={`tel:+90${COMPANY.phone}`} className="contact-row">
                <div className="contact-icon" style={{ background: "var(--cream)" }}>
                  <Phone size={20} color="var(--gold)" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9375rem" }}>
                    Telefonla Ara
                  </p>
                  <p style={{ fontSize: "0.775rem", color: "var(--muted)", marginTop: "0.15rem" }}>
                    {COMPANY.phoneFormatted}
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={COMPANY.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-row"
              >
                <div
                  className="contact-icon"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)" }}
                >
                  <IconInstagram size={20} color="#fff" />
                  <span style={{ display: "none" }}>Instagram</span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9375rem" }}>
                    Instagram
                  </p>
                  <p style={{ fontSize: "0.775rem", color: "var(--muted)", marginTop: "0.15rem" }}>
                    {COMPANY.instagramHandle}
                  </p>
                </div>
              </a>

              {/* Adres */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  padding: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Adres
                </p>

                {/* İmalathane */}
                <a
                  href="https://maps.app.goo.gl/YEYEtyKA69TTFUoA9"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", textDecoration: "none", marginBottom: "1.25rem" }}
                >
                  <MapPin size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>
                      İmalathane
                    </p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.2rem" }}>
                      Gürgentekstil
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.7 }}>
                      Sümer Mah. 2507 Sok. No:45/B<br />Merkezefendi / Denizli
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: "0.3rem", fontWeight: 600 }}>
                      Yol tarifi al →
                    </p>
                  </div>
                </a>

                {/* Konfeksiyon */}
                <a
                  href="https://maps.app.goo.gl/dSsCnLMB7D6r1aoe6"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", textDecoration: "none", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}
                >
                  <MapPin size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>
                      Konfeksiyon
                    </p>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.2rem" }}>
                      Gürgentekstil Konfeksiyon
                    </p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.7 }}>
                      Merkezefendi / Denizli
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--gold)", marginTop: "0.3rem", fontWeight: 600 }}>
                      Yol tarifi al →
                    </p>
                  </div>
                </a>
              </div>

              {/* Çalışma Saatleri */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderTop: "none",
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  <IconClock size={13} />
                  Çalışma Saatleri
                </div>
                {[
                  ["Pzt – Cuma",  "08:00 – 18:00"],
                  ["Cumartesi",   "08:00 – 13:00"],
                  ["Pazar",       "Kapalı"],
                ].map(([d, h]) => (
                  <div
                    key={d}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0",
                      borderBottom: "1px solid var(--border)",
                      fontSize: "0.8125rem",
                    }}
                  >
                    <span style={{ color: "var(--muted)" }}>{d}</span>
                    <span
                      style={{
                        fontWeight: 600,
                        color: h === "Kapalı" ? "#dc2626" : "var(--navy)",
                      }}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sağ — Form */}
            <div className="lg:col-span-3">
              <div
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  padding: "2.25rem",
                }}
              >
                <span className="eyebrow">Form</span>
                <h2
                  className="section-title-sm"
                  style={{ marginBottom: "0.625rem" }}
                >
                  Teklif Formu
                </h2>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted)",
                    marginBottom: "2rem",
                    lineHeight: 1.75,
                  }}
                >
                  Ürün grubu, ebat ve miktar bilgilerinizi paylaşın; en kısa sürede dönelim.
                </p>
                <QuoteForm lang="tr" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
