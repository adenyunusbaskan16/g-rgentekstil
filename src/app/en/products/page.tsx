import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Package, Ruler, ChevronRight } from "lucide-react";
import { COMPANY, PRODUCT_SIZES, getWhatsAppUrl } from "@/lib/data";
import { getProducts, getCategories } from "@/lib/products";
import { PRODUCT_FALLBACK_IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Wholesale Towels from Turkey | Gurgen Tekstil",
  description: "Hand, face, foot, kitchen and bath towels in various sizes — wholesale and custom production from Denizli, Turkey.",
  alternates: { canonical: "https://gürgentekstil.com/en/products", languages: { tr: "/urunler" } },
};

export default async function EnProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const grouped = categories.map((c) => ({ cat: c, prods: products.filter((p) => p.category_id === c.id) })).filter((g) => g.prods.length > 0);

  return (
    <>
      <section className="page-hero">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.9) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Products</span>
          </nav>
          <span className="eyebrow">Product Catalogue</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Wholesale Towels
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.875rem", maxWidth: "50ch", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Ready stock and custom production — hand, face, foot, kitchen and bath towel groups.
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <div className="cat-sticky-nav">
          <div className="cat-sticky-nav-inner">
            <div style={{ display: "flex", minWidth: "max-content" }}>
              {categories.map((c) => (
                <a key={c.slug} href={`#${c.slug}`} className="cat-sticky-nav-item">{c.name_en}</a>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap">
          {grouped.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
              {grouped.map(({ cat, prods }) => (
                <div key={cat.id} id={cat.slug}>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                      <span className="eyebrow" style={{ fontSize: "0.6rem", marginBottom: "0.25rem" }}>Category</span>
                      <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--navy)" }}>{cat.name_en}</h2>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 600, background: "rgba(184,150,90,0.08)", padding: "0.25rem 0.75rem", border: "1px solid rgba(184,150,90,0.2)" }}>
                      {prods.length} products
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
                    {prods.map((p, i) => (
                      <article key={p.id} className="prod-card">
                        <div className="prod-img-wrap" style={{ aspectRatio: "3/4", background: "#f8f5f0" }}>
                          <Image src={p.image_url ?? PRODUCT_FALLBACK_IMAGES[i % PRODUCT_FALLBACK_IMAGES.length]} alt={p.image_alt_en ?? p.name_en} fill style={{ objectFit: "contain", padding: "0.5rem" }} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" quality={75} />
                          {p.is_stock_available && <span className="badge badge-gold" style={{ position: "absolute", top: "0.875rem", left: "0.875rem" }}>In Stock</span>}
                        </div>
                        <div style={{ padding: "1.375rem" }}>
                          <h3 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem", fontSize: "0.9375rem", lineHeight: 1.3 }}>{p.name_en}</h3>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.875rem" }}>
                            {p.size && <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}><Ruler size={12} color="var(--gold)" />Size: <strong style={{ color: "var(--navy)" }}>{p.size}</strong></div>}
                            {p.weight_label && <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}><span style={{ fontSize: "0.65rem", fontWeight: 800, color: "var(--gold)" }}>g</span>Weight: <strong style={{ color: "var(--navy)" }}>{p.weight_label}</strong></div>}
                            {p.sale_unit && <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}><Package size={12} color="var(--gold)" />Unit: <strong style={{ color: "var(--navy)" }}>{p.sale_unit}</strong></div>}
                          </div>
                          {p.color_options?.length > 0 && (
                            <div style={{ marginBottom: "1rem" }}>
                              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.375rem" }}>Colors</p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                                {p.color_options.map((c) => <span key={c} style={{ padding: "0.2rem 0.5rem", border: "1px solid var(--border)", fontSize: "0.7rem", color: "var(--muted)" }}>{c}</span>)}
                              </div>
                            </div>
                          )}
                          <a href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Hello, I would like to get a quote for ${p.name_en}.`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm btn-fw">
                            <MessageCircle size={13} /> Get a Quote
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <Package size={40} color="rgba(200,164,90,0.3)" style={{ margin: "0 auto 1.25rem" }} strokeWidth={1} />
              <h2 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.625rem" }}>Products Coming Soon</h2>
              <p style={{ color: "var(--muted)", marginBottom: "1.75rem", maxWidth: 380, margin: "0 auto 1.75rem", fontSize: "0.875rem" }}>Product catalogue is being prepared. Contact us via WhatsApp.</p>
              <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg"><MessageCircle size={17} /> Get a WhatsApp Quote</a>
            </div>
          )}
        </div>
      </section>

      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Sizes</span>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>Standard Towel Sizes</h2>
              <p className="body-text" style={{ marginBottom: "1.25rem" }}>Ready stock in standard sizes. Other sizes subject to production capacity.</p>
              <div style={{ background: "var(--cream)", borderLeft: "3px solid var(--gold)", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.75 }}>
                Wholesale sales by bale and dozen for ready-stock products. Custom production requests evaluated per order.
              </div>
            </div>
            <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
              <table className="tbl">
                <thead><tr><th>Size</th><th>Use</th></tr></thead>
                <tbody>{PRODUCT_SIZES.map((s) => <tr key={s.size}><td>{s.size}</td><td style={{ fontWeight: 400 }}>{s.use_en}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
