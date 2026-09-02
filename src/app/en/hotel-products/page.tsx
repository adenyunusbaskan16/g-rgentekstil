import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ChevronRight, ArrowRight, Ruler, Layers, Settings, CheckCircle, Image as ImageIcon } from "lucide-react";
import { COMPANY, getWhatsAppUrl, SITE_URL } from "@/lib/data";
import { HOTEL_IMAGES } from "@/lib/images";
import { schemaOrganization, schemaBreadcrumb, schemaWebPage, schemaItemList } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import ZoomableImage from "@/components/ui/ZoomableImage";

const PAGE_URL = `${SITE_URL}/en/hotel-products`;

export const metadata: Metadata = {
  title: "Hotel Textile Products | Hotel Towels, Bathrobes, Bedding Manufacturer",
  description:
    "Gurgen Tekstil manufactures hotel towels, bathrobes, bedspreads, duvet covers, bed sheets and pillowcases for hotels, resorts and spas in Denizli, Turkey. Custom sizes, weights and jacquard patterns for wholesale hospitality textile supply.",
  keywords: [
    "hotel textile manufacturer Turkey",
    "hotel towels manufacturer Turkey",
    "hospitality textile manufacturer Turkey",
    "wholesale hotel towels",
    "hotel bathrobe manufacturer",
    "hotel bedding manufacturer Turkey",
    "custom hotel towels",
    "jacquard hotel towel",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      tr: `${SITE_URL}/otel-urunleri`,
      "x-default": `${SITE_URL}/otel-urunleri`,
    },
  },
  openGraph: {
    title: "Hotel Textile Products | Gurgen Tekstil",
    description:
      "Custom production of towels, bathrobes, bedding and pillowcases for hotels, resorts and spas.",
    url: PAGE_URL,
    type: "website",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
  },
};

const TOWEL_SIZES = ["30 × 50 cm", "50 × 70 cm", "50 × 90 cm", "70 × 140 cm", "90 × 150 cm", "100 × 150 cm"];
const YARN_OPTIONS = ["16/1", "20/2", "20/2 Ring Two-Ply"];

const PRODUCT_GROUPS = [
  { id: "hotel-towels", name: "Hotel Towels" },
  { id: "hotel-foot-towels", name: "Hotel Foot Towels" },
  { id: "hotel-bathrobes", name: "Hotel Bathrobes" },
  { id: "hotel-bedspreads", name: "Hotel Bedspreads" },
  { id: "hotel-duvet-covers", name: "Hotel Duvet Covers" },
  { id: "hotel-bed-sheets", name: "Hotel Bed Sheets" },
  { id: "hotel-bedding-sets", name: "Hotel Bedding Sets" },
  { id: "hotel-pillowcases", name: "Hotel Pillowcases" },
];

const FAQ_ITEMS = [
  {
    q: "What sizes are hotel towels produced in?",
    a: "Commonly preferred hotel towel sizes include 30×50, 50×90, 70×140, 90×150 and 100×150 cm. These are example sizes rather than fixed standards — a different size can also be discussed for your property.",
  },
  {
    q: "Can custom weight (GSM) be produced?",
    a: "Yes, production can be planned according to the requested weight. The exact weight and lead time are confirmed after sampling and order quantity are discussed via WhatsApp or the quote form.",
  },
  {
    q: "Can custom-size hotel towels be produced?",
    a: "Yes, sizes outside the standard range can be evaluated for your property. Please get in touch for details.",
  },
  {
    q: "Can jacquard-pattern towels be produced?",
    a: "Yes, with our dobby and jacquard weaving infrastructure, jacquard-pattern towels can be produced. Pattern and logo requests are discussed before ordering.",
  },
  {
    q: "Do you manufacture hotel bathrobes?",
    a: "Yes, bathrobe production requests for hotels and spas are evaluated. Fabric type and size options can be discussed by contacting us.",
  },
  {
    q: "Do you produce hotel duvet covers and bed sheets?",
    a: "Yes, duvet covers, bed sheets, bedding sets and pillowcases for hotel bedrooms are also part of our production scope.",
  },
  {
    q: "How does the quote process work for bulk hotel textile orders?",
    a: "You can reach us via WhatsApp or the quote form with the product group, size/weight preference and estimated order quantity. Your request is reviewed and we get back to you as soon as possible.",
  },
  {
    q: "Can you produce for B2B buyers outside Turkey?",
    a: "Yes, export and wholesale supply requests from outside Turkey are also evaluated. Please contact us via WhatsApp or phone with your country and quantity details.",
  },
];

/* ─── Image placeholder — each product group gets its OWN photo here.
   No image is borrowed from another product/category. When the real
   photo HTML is provided, it replaces this component directly. ─── */
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        color: "var(--muted-2)",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <ImageIcon size={22} strokeWidth={1.3} />
      <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1.4 }}>
        {label}
      </span>
    </div>
  );
}

interface ProductImage {
  src?: string;
  alt: string;
}

function ProductSection({
  id, title, images, children,
}: {
  id: string;
  title: string;
  images: ProductImage[];
  children: React.ReactNode;
}) {
  const waUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
    `Hello, I am reaching you from your website. I would like to get information about ${title}.`
  )}`;

  return (
    <div id={id} style={{ scrollMarginTop: "calc(var(--hdr) + 1rem)" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "center" }}
        className="lg:grid-cols-2"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: images.length === 2 ? "repeat(2, 1fr)" : "1fr",
            gap: "0.75rem",
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "3/4",
                background: "var(--cream)",
                border: "1px solid var(--border)",
                overflow: "hidden",
              }}
            >
              {img.src ? (
                <ZoomableImage src={img.src} alt={img.alt} />
              ) : (
                <ImagePlaceholder label={img.alt} />
              )}
            </div>
          ))}
        </div>

        <div>
          <h2 className="section-title-sm" style={{ marginBottom: "1rem" }}>{title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
            {children}
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">
            <MessageCircle size={13} /> Get a Quote
          </a>
        </div>
      </div>
    </div>
  );
}

export default function HotelProductsPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <Image
          src={HOTEL_IMAGES.heroBg}
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
            background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Hotel Products</span>
          </nav>
          <span className="eyebrow">Hospitality Textile</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem,4vw,3rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
              maxWidth: "20ch",
            }}
          >
            Hotel Textile Products
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              marginTop: "0.875rem",
              maxWidth: "56ch",
              fontSize: "0.9375rem",
              lineHeight: 1.8,
            }}
          >
            Custom sizes, weights, yarns and patterns for hotels, resorts, spas and hospitality
            businesses — towels, bathrobes, duvet covers, bed sheets and pillowcases.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginTop: "1.75rem" }}>
            <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
              <MessageCircle size={15} /> Get a Quote
            </a>
            <Link href="/en/products" className="btn btn-outline-w btn-lg">
              Browse Products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ maxWidth: "68ch" }}>
            <span className="eyebrow">Hotel Textile Production</span>
            <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>
              Bulk Textile Production for Hospitality Businesses
            </h2>
            <p className="body-text" style={{ marginBottom: "1rem" }}>
              Textile needs of hotels, resorts, spas and boutique hotels differ from household
              purchases — they require high-volume, consistent quality and reliable supply.
              Gurgen Tekstil evaluates wholesale production and supply requests at its production
              facility in Denizli, using dobby and jacquard, imported and domestic new-generation
              weaving machines.
            </p>
            <p className="body-text">
              Alongside ready-stock products, custom production options aligned with your
              property&apos;s brand standard can also be discussed. Sizes, weight, yarn type and
              pattern preferences shape the sampling and quotation process.
            </p>
          </div>
        </div>
      </section>

      {/* ── Anchor nav ── */}
      <section style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="wrap" style={{ padding: "1rem 1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem 1.25rem", justifyContent: "center" }}>
          {PRODUCT_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              style={{
                fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em",
                textTransform: "uppercase", color: "var(--muted)",
                padding: "0.4rem 0", transition: "color 0.15s",
              }}
              className="hover:!text-[var(--navy)]"
            >
              {g.name}
            </a>
          ))}
        </div>
      </section>

      {/* ── Product sections ── */}
      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>

          <ProductSection
            id="hotel-towels"
            title="Hotel Towels"
            images={[{ src: HOTEL_IMAGES.towel[0], alt: "Hotel towel — Gurgen Tekstil wholesale production" }]}
          >
            <p className="body-sm">
              Commonly preferred hotel towel sizes include{" "}
              <strong style={{ color: "var(--navy)" }}>{TOWEL_SIZES.join(", ")}</strong>. These are
              example, preferred sizes rather than fixed standards — a different size can also be
              discussed for your property.
            </p>
            <p className="body-sm">
              Yarn options such as <strong style={{ color: "var(--navy)" }}>16/1, 20/2 and 20/2
              Ring Two-Ply</strong> can be discussed. Requested weight, jacquard patterns and
              corporate logo production are confirmed before ordering.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {YARN_OPTIONS.map((y) => (
                <span key={y} style={{ padding: "0.3rem 0.7rem", border: "1px solid var(--border)", fontSize: "0.7rem", color: "var(--muted)", background: "#fff" }}>
                  {y}
                </span>
              ))}
            </div>
          </ProductSection>

          <ProductSection
            id="hotel-foot-towels"
            title="Hotel Foot Towels"
            images={[{ src: HOTEL_IMAGES.footTowel[0], alt: "Hotel foot towel — wholesale production" }]}
          >
            <p className="body-sm">
              A commonly preferred example size for hotel foot towels is{" "}
              <strong style={{ color: "var(--navy)" }}>50 × 70 cm</strong>. This is a frequently
              chosen size rather than a fixed standard — a different size can also be discussed
              for your property.
            </p>
            <p className="body-sm">
              As with other towel groups, yarn type, weight and jacquard pattern options are
              discussed based on your request.
            </p>
          </ProductSection>

          <ProductSection
            id="hotel-bathrobes"
            title="Hotel Bathrobes"
            images={[{ src: HOTEL_IMAGES.bathrobe[0], alt: "Hotel bathrobe — wholesale production" }]}
          >
            <p className="body-sm">
              For guest comfort at hotels and spas, fabric type and size options are evaluated
              based on intended use. Corporate orders can include custom label/embroidery
              requests, discussed separately.
            </p>
            <p className="body-sm">
              Production planning is based on bulk order quantity; the exact lead time is
              confirmed after sample approval.
            </p>
          </ProductSection>

          <ProductSection
            id="hotel-bedspreads"
            title="Hotel Bedspreads"
            images={[{ src: HOTEL_IMAGES.bedspread[0], alt: "Hotel bedspread — wholesale production" }]}
          >
            <p className="body-sm">
              As a complement to bedroom textiles, bedspread production is evaluated with simple,
              durable weave options that suit the overall design language of hotel rooms. Size
              and color requests are discussed before ordering.
            </p>
          </ProductSection>

          <ProductSection
            id="hotel-duvet-covers"
            title="Hotel Duvet Covers"
            images={[{ src: HOTEL_IMAGES.duvetCover[0], alt: "Hotel duvet cover — wholesale production" }]}
          >
            <p className="body-sm">
              Durable, easy-to-wash duvet covers are an important part of hotel bedroom textile
              needs under heavy use. Production options are evaluated according to bed size
              (single/double).
            </p>
          </ProductSection>

          <ProductSection
            id="hotel-bed-sheets"
            title="Hotel Bed Sheets"
            images={[{ src: HOTEL_IMAGES.bedsheet[0], alt: "Hotel bed sheet — wholesale production" }]}
          >
            <p className="body-sm">
              Durability under frequent washing and a smooth weave matter for hotel bed sheets.
              Different size options and bulk order quantities are evaluated according to bed
              sizes.
            </p>
          </ProductSection>

          <ProductSection
            id="hotel-bedding-sets"
            title="Hotel Bedding Sets"
            images={[{ src: HOTEL_IMAGES.beddingSet[0], alt: "Hotel bedding set — set production" }]}
          >
            <p className="body-sm">
              Bedding sets combining duvet cover, bed sheet and pillowcase are a practical
              solution for room standardization in hotels. Set contents and quantities are
              shaped according to your request.
            </p>
          </ProductSection>

          {/* Hotel Pillowcases */}
          <ProductSection
            id="hotel-pillowcases"
            title="Hotel Pillowcases"
            images={[{ src: HOTEL_IMAGES.pillowcase[0], alt: "Hotel pillowcase — wholesale production" }]}
          >
            <p className="body-sm">
              Pillowcases can be ordered as part of a bedding set or separately, evaluated
              according to standard pillow sizes. Both set-based and unit-based wholesale
              supply are possible.
            </p>
          </ProductSection>
        </div>
      </section>

      {/* ── Custom production ── */}
      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="eyebrow-center">Customization</span>
            <h2 className="section-title-light">Custom Production</h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}
            className="sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Ruler, t: "Custom Size", d: "Size options evaluated to match your property's needs." },
              { icon: Layers, t: "Custom Weight", d: "Weight (GSM) preference discussed for intended use." },
              { icon: Settings, t: "Yarn & Pattern", d: "Yarn options such as 16/1, 20/2, 20/2 Ring Two-Ply and jacquard patterns." },
              { icon: CheckCircle, t: "Corporate Orders", d: "Order process aligned with your brand standard." },
            ].map((f) => (
              <div key={f.t} style={{ background: "var(--navy)", padding: "2rem 1.75rem" }}>
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

      {/* ── Choosing a hotel towel ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Guide</span>
              <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>What to Consider When Choosing Hotel Towels</h2>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                Choosing hotel towels means weighing size, weight and intended use together. For
                example, the preferred weight for a hand/face towel can differ from that of a bath
                towel; daily heavy use also affects durability expectations.
              </p>
              <p className="body-text">
                The exact combination of weight, size and yarn is determined together based on
                your property&apos;s usage intensity and budget — rather than presenting invented
                technical specifications, we prefer to listen to your needs and confirm the right
                option together.
              </p>
            </div>
            <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
              <table className="tbl">
                <thead>
                  <tr><th>Example Size</th><th>Typical Use</th></tr>
                </thead>
                <tbody>
                  <tr><td>30 × 50 cm</td><td style={{ fontWeight: 400 }}>Hand towel</td></tr>
                  <tr><td>50 × 70 cm</td><td style={{ fontWeight: 400 }}>Foot towel</td></tr>
                  <tr><td>50 × 90 cm</td><td style={{ fontWeight: 400 }}>Face / head towel</td></tr>
                  <tr><td>70 × 140 cm</td><td style={{ fontWeight: 400 }}>Medium bath towel</td></tr>
                  <tr><td>90 × 150 cm</td><td style={{ fontWeight: 400 }}>Bath towel</td></tr>
                  <tr><td>100 × 150 cm</td><td style={{ fontWeight: 400 }}>Large bath towel</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B quote process ── */}
      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ maxWidth: "68ch", margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow-center">Process</span>
            <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>Quote Process for Bulk Hotel Textile Orders</h2>
            <p className="body-text" style={{ marginBottom: "1.75rem" }}>
              Simply share the product group you need (towels, bathrobes, bedding, sheets, etc.),
              your preferred size/weight and estimated order quantity via WhatsApp or the quote
              form. Your request is reviewed and the sampling and pricing process begins.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
              <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
                <MessageCircle size={16} /> Get a Quote via WhatsApp
              </a>
              <Link href="/en/contact" className="btn btn-navy btn-lg">
                Quote Form <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap" style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="eyebrow-center">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions About Hotel Textiles</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {FAQ_ITEMS.map((item) => (
              <div key={item.q} style={{ background: "var(--warm)", border: "1px solid var(--border)", padding: "1.375rem 1.5rem" }}>
                <h3 style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9375rem", marginBottom: "0.5rem" }}>
                  {item.q}
                </h3>
                <p className="body-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD — see TR page for rationale on omitting FAQPage/Product schema */}
      <JsonLd data={schemaWebPage({
        name: "Hotel Textile Products | Gurgen Tekstil",
        description: "Custom production of towels, bathrobes, bedding and pillowcases for hotels, resorts and spas.",
        url: PAGE_URL,
        inLanguage: "en",
      })} />
      <JsonLd data={schemaBreadcrumb([
        { name: "Home", url: `${SITE_URL}/en` },
        { name: "Hotel Products", url: PAGE_URL },
      ])} />
      <JsonLd data={schemaItemList(
        PRODUCT_GROUPS.map((g, i) => ({ name: g.name, url: `${PAGE_URL}#${g.id}`, position: i + 1 }))
      )} />
      <JsonLd data={schemaOrganization()} />
    </>
  );
}
