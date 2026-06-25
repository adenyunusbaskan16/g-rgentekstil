import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, MessageCircle, CheckCircle,
  Package, Ruler, Award, Truck, Settings, Users,
} from "lucide-react";
import { COMPANY, PRODUCT_SIZES, getWhatsAppUrl } from "@/lib/data";
import { getProducts, getCategories } from "@/lib/products";
import { IMAGES, CATEGORY_IMAGES, PRODUCT_FALLBACK_IMAGES } from "@/lib/images";
import { schemaOrganization, schemaWebSite, schemaBreadcrumb, schemaFAQ } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Gurgen Tekstil | Towel Manufacturer in Denizli, Turkey",
  description:
    "Gurgen Tekstil is a Denizli-based towel manufacturer producing hand, face, foot, kitchen and bath towels. Wholesale supply and custom production for brands and export buyers.",
  alternates: {
    canonical: "https://gürgentekstil.com/en",
    languages: { "en": "https://gürgentekstil.com/en", "tr": "https://gürgentekstil.com/", "x-default": "https://gürgentekstil.com/" },
  },
  keywords: ["Turkish towel manufacturer", "wholesale towels Turkey", "towel factory Denizli", "bath towel wholesale", "custom towel production Turkey"],
  openGraph: {
    title: "Gurgen Tekstil | Towel Manufacturer in Turkey",
    description: "Hand, face, bath & kitchen towels — ready stock and custom production from Denizli, Turkey.",
    url: "https://gürgentekstil.com/en",
    type: "website",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gurgen Tekstil | Towel Manufacturer Turkey",
    description: "Wholesale towel manufacturer in Denizli, Turkey. Ready stock & custom production.",
  },
};

const CATS_FALLBACK = [
  { slug: "hand",    en: "Hand Towels",    sub: "30×50 · 40×80 cm" },
  { slug: "face",    en: "Face Towels",    sub: "50×90 cm" },
  { slug: "foot",    en: "Foot Towels",    sub: "50×70 cm" },
  { slug: "bath",    en: "Bath Towels",    sub: "90×150 cm" },
  { slug: "kitchen", en: "Kitchen Towels", sub: "30×50 cm" },
  { slug: "wholesale",en: "Wholesale",     sub: "Bale / Dozen" },
];

const FEATS = [
  { icon: Award,    t: "Ready Stock",     d: "Bale and dozen-based stock products ready for fast delivery." },
  { icon: Settings, t: "Custom Orders",   d: "Color, pattern and weight options per order." },
  { icon: Truck,    t: "Wholesale",       d: "Flexible sales to stores, wholesalers and exporters." },
  { icon: Users,    t: "Export Ready",    d: "Turkish towel supplier serving international buyers." },
];

function IconCotton({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/><path d="M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z"/>
      <path d="M12 12C12 12 17 9 17 5"/><path d="M12 12C12 12 7 15 5 18"/><path d="M12 12C12 12 17 15 19 18"/>
    </svg>
  );
}
function IconThread({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
      <path d="M9.17 9.17l5.66 5.66M14.83 9.17l-5.66 5.66"/>
    </svg>
  );
}
function IconFactory({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20V8l6-4v4l6-4v4l6-4v16H2z"/><rect x="6" y="14" width="4" height="6"/><rect x="14" y="14" width="4" height="6"/>
    </svg>
  );
}
function IconGlobe({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

export default async function EnHomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const featured = products.slice(0, 6);

  const displayCats =
    categories.length > 0
      ? categories.map((c, i) => ({
          slug: c.slug,
          en: c.name_en,
          sub: CATS_FALLBACK[i]?.sub ?? "",
          img: CATEGORY_IMAGES[i] ?? CATEGORY_IMAGES[0],
        }))
      : CATS_FALLBACK.map((c, i) => ({ ...c, img: CATEGORY_IMAGES[i] }));

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <Image
          src={IMAGES.hero}
          alt="Gurgen Tekstil — Quality Towel Manufacturing Denizli Turkey"
          fill priority
          style={{ objectFit: "cover", objectPosition: "center 50%" }}
          sizes="100vw" quality={90}
        />
        <div
          className="hero-bg"
          style={{ background: "linear-gradient(110deg,rgba(8,15,26,0.92) 0%,rgba(8,15,26,0.75) 38%,rgba(8,15,26,0.4) 62%,rgba(8,15,26,0.15) 100%)" }}
        />
        <div className="wrap hero-content">
          <div style={{ maxWidth: 600 }}>
            <span className="eyebrow anim" style={{ color: "var(--gold)" }}>Denizli · Turkey</span>
            <h1 className="hero-h1 anim d1">
              Wholesale Towel<br />Manufacturer in Turkey
            </h1>
            <p className="hero-sub anim d2">
              Hand towels, face towels, bath towels and kitchen towels — ready stock
              and custom production for wholesalers, brands and export buyers.
            </p>
            <div className="anim d3" style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
              <Link href="/en/products" className="btn btn-outline-w btn-lg">
                View Products <ArrowRight size={15} />
              </Link>
              <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
                <MessageCircle size={15} /> Get a Quote
              </a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", opacity: 0.35 }} aria-hidden>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom,rgba(184,150,90,0.9),transparent)" }} />
          <span style={{ fontSize: "0.55rem", color: "#fff", letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
        </div>
      </section>

      {/* ── FEATURE BAND ── */}
      <section className="feat-band">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="sm:grid-cols-4">
            {[
              { Icon: IconCotton,  t: "100% Cotton",       d: "Premium quality raw material" },
              { Icon: IconThread,  t: "Fast Production",   d: "On-time delivery" },
              { Icon: IconFactory, t: "Wholesale Prices",  d: "Best competitive rates" },
              { Icon: IconGlobe,   t: "Export Ready",      d: "Custom brand solutions" },
            ].map((f, i) => (
              <div key={f.t} className="feat-band-item"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                <div className="feat-band-icon"><f.Icon size={18} color="var(--gold)" /></div>
                <div>
                  <p className="feat-band-title">{f.t}</p>
                  <p className="feat-band-sub">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="eyebrow">Product Groups</span>
            <h2 className="section-title">Towel Categories</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "3px", background: "var(--border)" }} className="sm:grid-cols-3">
            {displayCats.map((cat) => (
              <Link key={cat.slug}
                href={categories.length > 0 ? `/en/products#${cat.slug}` : "/en/products"}
                className="cat-card"
                style={{ aspectRatio: "3/2", position: "relative", overflow: "hidden" }}>
                <Image src={cat.img} alt={cat.en} fill
                  sizes="(max-width:640px)50vw,(max-width:1024px)33vw,400px"
                  style={{ objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)" }}
                  quality={75} />
                <div className="cat-card-overlay" />
                <div className="cat-card-label">
                  <p className="cat-card-name">{cat.en}</p>
                  {cat.sub && <p className="cat-card-sub">{cat.sub}</p>}
                  <span className="cat-card-cta">Explore <ArrowRight size={10} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/en/products" className="btn btn-outline btn-lg">
              All Products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", paddingBottom: "65%", overflow: "hidden", background: "var(--cream)" }}>
                <Image src={IMAGES.factory} alt="Gurgen Tekstil production facility — Denizli" fill style={{ objectFit: "cover" }} sizes="(max-width:1024px)100vw,50vw" quality={80} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", marginTop: "3px" }}>
                {[{ src: IMAGES.towelStack, alt: "Towel stack" }, { src: IMAGES.yarn, alt: "Yarn weaving" }].map((img) => (
                  <div key={img.alt} style={{ position: "relative", paddingBottom: "65%", overflow: "hidden" }}>
                    <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="25vw" quality={75} />
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", bottom: "calc(35% + 3px)", right: "-0.75rem", background: "var(--navy)", color: "#fff", padding: "1.25rem 1.5rem", minWidth: 148, zIndex: 10, boxShadow: "0 8px 32px rgba(10,21,32,0.35)" }}>
                <p style={{ fontSize: "1.875rem", fontWeight: 800, color: "var(--gold)", lineHeight: 1, letterSpacing: "-0.02em" }}>450m²</p>
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", marginTop: "0.3rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>Closed Production Area</p>
              </div>
            </div>
            <div>
              <span className="eyebrow">About Us</span>
              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
                Towel Manufacturing<br />Excellence in Denizli
              </h2>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                Gurgen Tekstil operates in Denizli Merkezefendi with dobby and jacquard, imported
                and domestic next-generation weaving machines — offering custom size, weight and
                color options in towel production.
              </p>
              <p className="body-text" style={{ marginBottom: "1.875rem" }}>
                With an annual capacity of 1,216 tons of towel weaving, we serve wholesalers,
                brands and export buyers with ready stock and custom production.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2.25rem" }}>
                {["High Production Capacity", "Quality Control Equipment", "Custom Design & Production", "On-Time Delivery", "Customer Satisfaction Focused"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <CheckCircle size={16} color="var(--gold)" style={{ flexShrink: 0 }} />
                    <span className="body-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/en/about" className="btn btn-navy btn-lg">
                More About Us <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stat-strip">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }} className="sm:grid-cols-4">
            {[
              { v: "450 m²",      l: "Closed Production\nArea" },
              { v: "1,216 tons",  l: "Annual Weaving\nCapacity" },
              { v: "Dobby &\nJacquard", l: "Weaving\nInfrastructure" },
              { v: "B2B",         l: "Wholesale &\nExport" },
            ].map((s) => (
              <div key={s.l} className="stat-item">
                <p className="stat-val" style={{ whiteSpace: "pre-line" }}>{s.v}</p>
                <p className="stat-label" style={{ whiteSpace: "pre-line" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      {featured.length > 0 && (
        <section className="sec" style={{ background: "#fff" }}>
          <div className="wrap">
            <div className="sec-head-line">
              <div>
                <span className="eyebrow">Catalogue</span>
                <h2 className="section-title">Featured Products</h2>
              </div>
              <Link href="/en/products" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
                View All <ArrowRight size={13} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
              {featured.map((p, i) => (
                <article key={p.id} className="prod-card">
                  <div className="prod-img-wrap" style={{ aspectRatio: "3/4", position: "relative", background: "#f8f5f0" }}>
                    <Image
                      src={p.image_url ?? PRODUCT_FALLBACK_IMAGES[i % PRODUCT_FALLBACK_IMAGES.length]}
                      alt={p.image_alt_en ?? p.name_en}
                      fill
                      style={{ objectFit: "contain", padding: "0.5rem", transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)" }}
                      sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" quality={75}
                    />
                    {p.is_stock_available && (
                      <span className="badge badge-gold" style={{ position: "absolute", top: "0.875rem", left: "0.875rem" }}>In Stock</span>
                    )}
                  </div>
                  <div style={{ padding: "1.375rem" }}>
                    {p.category && (
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                        {p.category.name_en}
                      </p>
                    )}
                    <h3 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem", fontSize: "0.9375rem", lineHeight: 1.3 }}>
                      {p.name_en}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "1rem" }}>
                      {p.size && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                          <Ruler size={12} color="var(--gold)" style={{ flexShrink: 0 }} />
                          Size: <strong style={{ color: "var(--navy)" }}>{p.size}</strong>
                        </div>
                      )}
                      {p.weight_label && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                          <span style={{ fontWeight: 800, fontSize: "0.65rem", color: "var(--gold)", flexShrink: 0 }}>gr</span>
                          Weight: <strong style={{ color: "var(--navy)" }}>{p.weight_label}</strong>
                        </div>
                      )}
                      {p.sale_unit && (
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                          <Package size={12} color="var(--gold)" style={{ flexShrink: 0 }} />
                          Unit: <strong style={{ color: "var(--navy)" }}>{p.sale_unit}</strong>
                        </div>
                      )}
                    </div>
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hello, I would like to get a quote for ${p.name_en}.`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn btn-wa btn-sm btn-fw"
                    >
                      <MessageCircle size={13} /> Get a Quote
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SIZE TABLE ── */}
      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Sizes</span>
              <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>Standard Towel Sizes</h2>
              <p className="body-text" style={{ marginBottom: "1.25rem" }}>
                Ready stock available in standard sizes below.
                Other sizes subject to production capacity and discussed on request.
              </p>
              <div style={{ background: "#fff", borderLeft: "3px solid var(--gold)", padding: "1.125rem 1.375rem", fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.8 }}>
                Ready-stock products are sold wholesale by bale and dozen.
                Custom production requests are evaluated per order.
              </div>
            </div>
            <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
              <table className="tbl">
                <thead><tr><th>Size</th><th>Use</th></tr></thead>
                <tbody>
                  {PRODUCT_SIZES.map((s) => (
                    <tr key={s.size}><td>{s.size}</td><td style={{ fontWeight: 400 }}>{s.use_en}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <Image src={IMAGES.factory} alt="" fill aria-hidden style={{ objectFit: "cover", opacity: 0.07 }} quality={30} sizes="100vw" />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="eyebrow-center">Advantages</span>
            <h2 className="section-title-light">Why Gurgen Tekstil?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }} className="sm:grid-cols-2 lg:grid-cols-4">
            {FEATS.map((f) => (
              <div key={f.t} style={{ background: "var(--navy)", padding: "2rem 1.75rem", transition: "background 0.2s" }} className="hover:bg-[var(--navy-2)]">
                <div className="feat-icon-dark" style={{ marginBottom: "1.25rem" }}>
                  <f.icon size={20} color="var(--gold)" />
                </div>
                <p style={{ fontWeight: 700, color: "#fff", marginBottom: "0.625rem", fontSize: "1rem" }}>{f.t}</p>
                <p style={{ fontSize: "0.8375rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.7 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", overflow: "hidden" }} className="sec">
        <Image src={IMAGES.towelStack} alt="" fill aria-hidden style={{ objectFit: "cover" }} quality={60} sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(10,21,32,0.95) 0%,rgba(10,21,32,0.88) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow-center">Contact</span>
          <h2 className="section-title-light" style={{ maxWidth: "18ch", margin: "0 auto 1rem" }}>
            Start a Conversation Today
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", maxWidth: "44ch", margin: "0 auto 2.5rem", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Contact us via WhatsApp or quote form for ready-stock and custom production requests.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-xl">
              <MessageCircle size={17} /> Get a WhatsApp Quote
            </a>
            <Link href="/en/contact" className="btn btn-outline-w btn-xl">
              Quote Form <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      {/* ── JSON-LD ── */}
      <JsonLd data={schemaOrganization()} />
      <JsonLd data={schemaWebSite()} />
      <JsonLd data={schemaBreadcrumb([
        { name: "Home", url: "https://gürgentekstil.com/en" },
      ])} />
      <JsonLd data={schemaFAQ([
        { question: "What towel types does Gurgen Tekstil produce?", answer: "Gurgen Tekstil produces hand towels, face towels, foot towels, kitchen towels and bath towels — all made from 100% cotton in Denizli, Turkey." },
        { question: "What is the minimum order quantity?", answer: "Ready-stock products are sold by bale and dozen. Custom production requests are evaluated per order." },
        { question: "How can I get a quote?", answer: "Contact us via WhatsApp (+90 532 557 09 71) or through our website quote form. We respond as quickly as possible." },
        { question: "Does Gurgen Tekstil export internationally?", answer: "Yes, Gurgen Tekstil serves international buyers. Contact us via WhatsApp or phone for export inquiries." },
        { question: "What is the annual production capacity?", answer: "Gurgen Tekstil has an annual towel weaving capacity of 1,216 tons, operating in a 450 m² closed production facility with dobby and jacquard weaving machines." },
      ])} />
    </>
  );
}
