import Link from "next/link";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { COMPANY, getWhatsAppUrl } from "@/lib/data";

function IconInstagram({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none"/>
    </svg>
  );
}

export default function Footer({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const isEn = lang === "en";

  const pages = isEn
    ? [
        { href: "/en",                       l: "Home" },
        { href: "/en/about",                 l: "About" },
        { href: "/en/production-capacity",   l: "Production" },
        { href: "/en/machinery",             l: "Machinery" },
        { href: "/en/products",              l: "Products" },
        { href: "/en/hotel-products",        l: "Hotel Products" },
        { href: "/en/contact",               l: "Contact" },
      ]
    : [
        { href: "/",                  l: "Ana Sayfa" },
        { href: "/kurumsal",          l: "Kurumsal" },
        { href: "/uretim-kapasitesi", l: "Üretim Kapasitesi" },
        { href: "/makine-parkuru",    l: "Makine Parkuru" },
        { href: "/urunler",           l: "Ürünler" },
        { href: "/otel-urunleri",     l: "Otel Ürünleri" },
        { href: "/iletisim",          l: "İletişim" },
      ];

  const prods = isEn
    ? ["Hand Towels", "Face Towels", "Foot Towels", "Bath Towels", "Kitchen Towels", "Wholesale"]
    : ["El Havluları", "Yüz Havluları", "Ayak Havluları", "Banyo Havluları", "Mutfak Havluları", "Toptan Grup"];

  const linkStyle: React.CSSProperties = {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.3)",
    display: "block",
    padding: "0.3rem 0",
    transition: "color 0.18s",
    lineHeight: 1.6,
  };

  const colHeadStyle: React.CSSProperties = {
    fontSize: "0.6rem",
    fontWeight: 700,
    letterSpacing: "0.22em",
    color: "var(--gold)",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "1.25rem",
  };

  return (
    <footer style={{ background: "var(--navy-4)" }}>
      <div className="div-gold" />

      <div className="wrap" style={{ paddingTop: "4rem", paddingBottom: "3rem" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}
          className="sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* ── Marka ── */}
          <div>
            {/* Logo */}
            <div style={{ marginBottom: "1.25rem" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/logo-dark.svg"
                alt="Gürgentekstil"
                width={150}
                height={34}
                style={{ height: 34, width: "auto", display: "block" }}
              />
            </div>

            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              {isEn
                ? "Towel manufacturer in Denizli serving brands, wholesalers and export buyers."
                : "Denizli'de toptancılara, markalara ve ihracat müşterilerine hizmet veren havlu üreticisi."}
            </p>

            <a
              href={COMPANY.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                fontSize: "0.75rem", color: "rgba(255,255,255,0.28)",
                transition: "color 0.18s", textDecoration: "none",
              }}
              className="hover:!text-[var(--gold)]"
            >
              <IconInstagram size={15} color="currentColor" />
              {COMPANY.instagramHandle}
            </a>
          </div>

          {/* ── Sayfalar ── */}
          <div>
            <span style={colHeadStyle}>{isEn ? "Pages" : "Sayfalar"}</span>
            {pages.map((p) => (
              <Link key={p.href} href={p.href} style={linkStyle} className="hover:!text-white">
                {p.l}
              </Link>
            ))}
          </div>

          {/* ── Ürünler ── */}
          <div>
            <span style={colHeadStyle}>{isEn ? "Products" : "Ürün Grupları"}</span>
            {prods.map((l) => (
              <Link
                key={l}
                href={isEn ? "/en/products" : "/urunler"}
                style={linkStyle}
                className="hover:!text-white"
              >
                {l}
              </Link>
            ))}
          </div>

          {/* ── İletişim ── */}
          <div>
            <span style={colHeadStyle}>{isEn ? "Contact" : "İletişim"}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>

              {/* Adres */}
              <div style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                <MapPin size={13} color="rgba(184,150,90,0.5)" style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: "0.775rem", color: "rgba(255,255,255,0.25)", lineHeight: 1.7 }}>
                  {COMPANY.address}
                </span>
              </div>

              {/* Telefon */}
              <a
                href={`tel:+90${COMPANY.phone}`}
                style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "0.5rem" }}
                className="hover:!text-white"
              >
                <Phone size={13} color="rgba(184,150,90,0.5)" style={{ flexShrink: 0 }} />
                {COMPANY.phoneFormatted}
              </a>
            </div>

            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-wa btn-sm btn-fw"
            >
              <MessageCircle size={13} />
              {isEn ? "WhatsApp Quote" : "Teklif Al"}
            </a>
          </div>
        </div>
      </div>

      {/* Alt bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          className="wrap"
          style={{
            paddingTop: "1.125rem",
            paddingBottom: "1.125rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ fontSize: "0.675rem", color: "rgba(255,255,255,0.15)" }}>
            &copy; {new Date().getFullYear()} GürgenTekstil.{" "}
            {isEn ? "All rights reserved." : "Tüm hakları saklıdır."}{" "}
            <span style={{ color: "rgba(255,255,255,0.1)" }}>|</span>{" "}
            <a
              href="https://hayb.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none", transition: "color 0.18s" }}
              className="hover:!text-white/40"
            >
              HAYB Dijital Sistemler
            </a>
          </p>
          <Link
            href={isEn ? "/en/privacy" : "/kvkk"}
            style={{ fontSize: "0.675rem", color: "rgba(255,255,255,0.15)", transition: "color 0.18s" }}
            className="hover:!text-white/40"
          >
            {isEn ? "Privacy Policy" : "KVKK"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
