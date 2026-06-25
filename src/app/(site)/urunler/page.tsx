import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Package, Ruler, ChevronRight, ArrowRight } from "lucide-react";
import { COMPANY, PRODUCT_SIZES, getWhatsAppUrl } from "@/lib/data";
import { getProducts, getCategories } from "@/lib/products";
import { IMAGES, CATEGORY_IMAGES, PRODUCT_FALLBACK_IMAGES } from "@/lib/images";
import CategoryNav from "@/components/ui/CategoryNav";

export const revalidate = 60; // Her 60 saniyede yenile

export const metadata: Metadata = {
  title: "Toptan Havlu Kataloğu — El, Yüz, Banyo, Mutfak | Gürgentekstil",
  description:
    "El havlusu, yüz havlusu, ayak havlusu, banyo havlusu ve mutfak havlusu gruplarında hazır stok ve özel üretim. Denizli'den toptan havlu tedariki.",
  alternates: {
    canonical: "https://gürgentekstil.com/urunler",
    languages: { "tr": "https://gürgentekstil.com/urunler", "en": "https://gürgentekstil.com/en/products", "x-default": "https://gürgentekstil.com/urunler" },
  },
  openGraph: {
    title: "Toptan Havlu Ürünleri | Gürgentekstil",
    description: "El, yüz, ayak, mutfak ve banyo havlusu — hazır stok ve siparişe göre üretim.",
    url: "https://gürgentekstil.com/urunler",
    type: "website",
    locale: "tr_TR",
  },
};

export default async function UrunlerPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const grouped = categories
    .map((c) => ({ cat: c, prods: products.filter((p) => p.category_id === c.id) }))
    .filter((g) => g.prods.length > 0);

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
            background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)",
          }}
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Ürünler</span>
          </nav>
          <span className="eyebrow">Ürün Kataloğu</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem,4vw,3rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
            }}
          >
            Toptan Havlu Ürünleri
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
            Hazır stok ve siparişe göre üretim imkânıyla geniş ürün yelpazesi.
          </p>
        </div>
      </section>

      {/* ── Sticky Kategori Nav ── */}
      {categories.length > 0 && (
        <CategoryNav categories={categories} />
      )}

      {/* ── Ürün Listesi ── */}
      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap">
          {grouped.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>
              {grouped.map(({ cat, prods }, gi) => (
                <div key={cat.id} id={cat.slug}>
                  {/* Kategori başlığı — sade */}
                  <div style={{ marginBottom: "1.75rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                    <span className="eyebrow">{cat.description_tr ?? "Kategori"}</span>
                    <h2 className="section-title-sm">{cat.name_tr}</h2>
                  </div>

                  {/* Ürün grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(272px, 1fr))",
                      gap: "1.25rem",
                    }}
                  >
                    {prods.map((p, i) => (
                      <article key={p.id} className="prod-card">
                        <Link href={`/urunler/${p.slug}`} style={{ textDecoration: "none", display: "block" }}>
                          <div
                            className="prod-img-wrap"
                            style={{ aspectRatio: "3/4", position: "relative", background: "#f8f5f0" }}
                          >
                            {p.image_url ? (
                              <Image src={p.image_url} alt={p.image_alt_tr ?? p.name_tr} fill style={{ objectFit: "contain", padding: "0.5rem" }} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" quality={75} />
                            ) : (
                              <Image src={PRODUCT_FALLBACK_IMAGES[i % PRODUCT_FALLBACK_IMAGES.length]} alt={p.name_tr} fill style={{ objectFit: "contain", padding: "0.5rem" }} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" quality={70} />
                            )}
                            {p.is_stock_available && (
                              <span className="badge badge-gold" style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>Stokta</span>
                            )}
                            {p.is_custom_order && (
                              <span className="badge badge-navy" style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>Özel</span>
                            )}
                          </div>
                        </Link>
                        <div style={{ padding: "1.375rem" }}>
                          <Link href={`/urunler/${p.slug}`} style={{ textDecoration: "none" }}>
                            <h3 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.875rem", fontSize: "0.9375rem", lineHeight: 1.3 }}>{p.name_tr}</h3>
                          </Link>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.4rem",
                              marginBottom: "1rem",
                            }}
                          >
                            {p.size && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  fontSize: "0.8rem",
                                  color: "var(--muted)",
                                }}
                              >
                                <Ruler size={12} color="var(--gold)" style={{ flexShrink: 0 }} />
                                Ebat:{" "}
                                <strong style={{ color: "var(--navy)" }}>{p.size}</strong>
                              </div>
                            )}
                            {p.weight_label && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  fontSize: "0.8rem",
                                  color: "var(--muted)",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "0.6rem",
                                    fontWeight: 800,
                                    color: "var(--gold)",
                                    flexShrink: 0,
                                  }}
                                >
                                  gr
                                </span>
                                Gramaj:{" "}
                                <strong style={{ color: "var(--navy)" }}>{p.weight_label}</strong>
                              </div>
                            )}
                            {p.sale_unit && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "0.5rem",
                                  fontSize: "0.8rem",
                                  color: "var(--muted)",
                                }}
                              >
                                <Package size={12} color="var(--gold)" style={{ flexShrink: 0 }} />
                                Birim:{" "}
                                <strong style={{ color: "var(--navy)" }}>{p.sale_unit}</strong>
                              </div>
                            )}
                          </div>
                          {p.color_options?.length > 0 && (
                            <div style={{ marginBottom: "1rem" }}>
                              <p
                                style={{
                                  fontSize: "0.6rem",
                                  fontWeight: 700,
                                  letterSpacing: "0.12em",
                                  textTransform: "uppercase",
                                  color: "var(--muted)",
                                  marginBottom: "0.4rem",
                                }}
                              >
                                Renkler
                              </p>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                                {p.color_options.map((c) => (
                                  <span
                                    key={c}
                                    style={{
                                      padding: "0.2rem 0.55rem",
                                      border: "1px solid var(--border)",
                                      fontSize: "0.7rem",
                                      color: "var(--muted)",
                                    }}
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.875rem" }}>
                            <Link href={`/urunler/${p.slug}`} className="btn btn-outline btn-sm" style={{ flex: 1, fontSize: "0.7rem" }}>
                              İncele
                            </Link>
                            <a
                              href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(`Merhabalar, İnternet Sitenizden Ulaşıyorum. ${p.name_tr} hakkında bilgi almak istiyorum.`)}`}
                              target="_blank" rel="noopener noreferrer"
                              className="btn btn-wa btn-sm" style={{ flex: 1, fontSize: "0.7rem" }}
                            >
                              <MessageCircle size={13} /> Teklif Al
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  background: "#fff",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}
              >
                <Package size={30} color="rgba(184,150,90,0.5)" strokeWidth={1.2} />
              </div>
              <h2
                style={{
                  fontWeight: 700,
                  color: "var(--navy)",
                  marginBottom: "0.75rem",
                  fontSize: "1.25rem",
                }}
              >
                Ürünler Yakında
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  marginBottom: "2rem",
                  maxWidth: 380,
                  margin: "0 auto 2rem",
                  fontSize: "0.875rem",
                  lineHeight: 1.75,
                }}
              >
                Ürün kataloğumuz hazırlanıyor. WhatsApp üzerinden ulaşabilirsiniz.
              </p>
              <a
                href={getWhatsAppUrl("tr")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-lg"
              >
                <MessageCircle size={17} />
                WhatsApp ile Teklif Al
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── Ebat Tablosu ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3.5rem",
              alignItems: "center",
            }}
            className="lg:grid-cols-2"
          >
            <div>
              <span className="eyebrow">Ebatlar</span>
              <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>
                Standart Havlu Ebatları
              </h2>
              <p className="body-text" style={{ marginBottom: "1.375rem" }}>
                Aşağıdaki standart ebatlarda hazır stok mevcuttur. Diğer ebatlar
                üretim durumuna göre görüşülür.
              </p>
              <div
                style={{
                  background: "var(--cream)",
                  borderLeft: "3px solid var(--gold)",
                  padding: "1.125rem 1.375rem",
                  fontSize: "0.8125rem",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                }}
              >
                Hazır stok ürünlerde çuval ve düzine bazlı toptan satış;
                özel üretim talepleri siparişe göre değerlendirilir.
              </div>
            </div>
            <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Ebat</th>
                    <th>Kullanım Alanı</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCT_SIZES.map((s) => (
                    <tr key={s.size}>
                      <td>{s.size}</td>
                      <td style={{ fontWeight: 400 }}>{s.use_tr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section
        style={{
          background: "var(--navy)",
          padding: "4rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="div-gold" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              alignItems: "flex-start",
            }}
            className="sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2
                style={{
                  fontSize: "1.375rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.5rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Toplu Sipariş &amp; Özel Üretim
              </h2>
              <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                İhtiyacınıza özel gramaj, renk ve ebat seçenekleriyle üretim imkânı.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", flexShrink: 0 }}>
              <a
                href={getWhatsAppUrl("tr")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa btn-lg"
              >
                <MessageCircle size={16} />
                Teklif Al
              </a>
              <Link href="/iletisim" className="btn btn-outline-w btn-lg">
                Teklif Formu
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
