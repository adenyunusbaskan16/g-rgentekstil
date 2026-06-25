import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle, ChevronRight, ArrowRight,
  Ruler, Package, CheckCircle, ArrowLeft,
} from "lucide-react";
import { COMPANY, getWhatsAppUrl } from "@/lib/data";
import { getProductBySlug, getProducts } from "@/lib/products";
import { PRODUCT_FALLBACK_IMAGES } from "@/lib/images";
import { schemaProduct, schemaBreadcrumb, schemaOrganization } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

/* ─── Otomatik açıklama üretimi (DB'de yoksa) ─── */
function autoDescription(p: {
  name_tr: string;
  size?: string;
  weight_label?: string;
  sale_unit?: string;
  category?: { name_tr: string };
}): string {
  const parts: string[] = [];
  if (p.category?.name_tr) parts.push(`${p.category.name_tr} grubunda yer alan`);
  parts.push(`${p.name_tr}`);
  if (p.size) parts.push(`${p.size} ebadında`);
  if (p.weight_label) parts.push(`${p.weight_label} gramajında`);
  parts.push(
    `%100 pamuktan üretilen bu havlu, yüksek emicilik ve uzun ömürlü kullanım sunar.` +
    ` Hazır stok ve siparişe göre üretim seçenekleriyle toptan tedarik için uygundur.`
  );
  if (p.sale_unit) parts.push(`Satış birimi: ${p.sale_unit}.`);
  return parts.join(" ");
}

/* ─── Statik path üretimi ─── */
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

/* ─── Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Ürün Bulunamadı" };

  const desc = p.description_tr || autoDescription(p);
  const canonicalUrl = `https://gürgentekstil.com/urunler/${slug}`;
  const imgUrl = p.image_url ?? `https://gürgentekstil.com/opengraph-image`;

  const keywords = [
    p.name_tr,
    p.category?.name_tr,
    "toptan havlu",
    "havlu Denizli",
    "Gürgentekstil",
    p.size ? `${p.size} havlu` : null,
    p.weight_label ? `${p.weight_label} gramaj havlu` : null,
  ].filter(Boolean) as string[];

  return {
    title: `${p.name_tr}${p.size ? ` ${p.size}` : ""} — Toptan Havlu | Gürgentekstil`,
    description: desc.slice(0, 160),
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "tr": canonicalUrl,
        "en": `https://gürgentekstil.com/en/products/${slug}`,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: `${p.name_tr}${p.size ? ` (${p.size})` : ""} | Gürgentekstil`,
      description: desc.slice(0, 160),
      url: canonicalUrl,
      type: "website",
      locale: "tr_TR",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: p.image_alt_tr ?? p.name_tr,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name_tr} | Gürgentekstil`,
      description: desc.slice(0, 160),
      images: [imgUrl],
    },
  };
}

/* ─── Page ─── */
export default async function UrunDetayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const description = product.description_tr || autoDescription(product);
  const waMsg = encodeURIComponent(
    `Merhabalar, İnternet Sitenizden Ulaşıyorum. ${product.name_tr}${product.size ? ` (${product.size})` : ""} hakkında bilgi almak istiyorum.`
  );
  const waUrl = `https://wa.me/${COMPANY.whatsapp}?text=${waMsg}`;

  /* İlgili ürünler — aynı kategoriden */
  const related = product.category_id
    ? (await getProducts()).filter(
        (p) => p.category_id === product.category_id && p.id !== product.id
      ).slice(0, 4)
    : [];

  const imgSrc = product.image_url || PRODUCT_FALLBACK_IMAGES[0];

  return (
    <>
      {/* ── Breadcrumb bar ── */}
      <div
        style={{
          background: "var(--navy-4)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "var(--hdr)",
        }}
      >
        <div className="wrap" style={{ padding: "0.875rem 1.25rem" }}>
          <nav className="breadcrumb" style={{ marginBottom: 0 }}>
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <Link href="/urunler">Ürünler</Link>
            <ChevronRight size={11} />
            {product.category && (
              <>
                <Link href={`/urunler#${product.category.slug}`}>
                  {product.category.name_tr}
                </Link>
                <ChevronRight size={11} />
              </>
            )}
            <span className="breadcrumb-current"
              style={{ maxWidth: "20ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {product.name_tr}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Ana İçerik ── */}
      <section style={{ background: "var(--warm)", paddingBottom: "4rem" }}>
        <div className="wrap" style={{ paddingTop: "2rem" }}>

          {/* Geri butonu */}
          <Link
            href="/urunler"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)",
              marginBottom: "1.5rem", letterSpacing: "0.04em",
              transition: "color 0.15s",
            }}
            className="hover:!text-[var(--navy)]"
          >
            <ArrowLeft size={14} /> Tüm Ürünler
          </Link>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "start" }}
            className="lg:grid-cols-2"
          >
            {/* ── Sol: Görsel ── */}
            <div>
              <div
                style={{
                  position: "relative",
                  paddingBottom: "130%",
                  overflow: "hidden",
                  background: "#f8f5f0",
                  border: "1px solid var(--border)",
                }}
              >
                <Image
                  src={imgSrc}
                  alt={product.image_alt_tr || product.name_tr}
                  fill
                  priority
                  style={{ objectFit: "contain", padding: "1rem" }}
                  sizes="(max-width:1024px)100vw,50vw"
                  quality={85}
                />
                {/* Rozet */}
                <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem", zIndex: 2 }}>
                  {product.is_stock_available && (
                    <span className="badge badge-gold">Stokta</span>
                  )}
                  {product.is_custom_order && (
                    <span className="badge badge-navy">Özel Üretim</span>
                  )}
                </div>
              </div>
            </div>

            {/* ── Sağ: Detaylar ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Başlık */}
              <div>
                {product.category && (
                  <Link
                    href={`/urunler#${product.category.slug}`}
                    style={{
                      fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em",
                      color: "var(--gold)", textTransform: "uppercase",
                      display: "inline-block", marginBottom: "0.625rem",
                    }}
                  >
                    {product.category.name_tr}
                  </Link>
                )}
                <h1
                  style={{
                    fontSize: "clamp(1.5rem,3.5vw,2.25rem)",
                    fontWeight: 700,
                    color: "var(--navy)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    marginBottom: "0.875rem",
                  }}
                >
                  {product.name_tr}
                </h1>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.85 }}>
                  {description}
                </p>
              </div>

              {/* Özellikler tablosu */}
              <div style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <div
                  style={{
                    padding: "0.75rem 1.25rem",
                    background: "var(--navy)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                    textTransform: "uppercase",
                  }}
                >
                  Ürün Bilgileri
                </div>
                <div style={{ padding: "0" }}>
                  {(
                    [
                      product.size         ? { label: "Ebat",         val: product.size,             icon: <Ruler size={13} color="var(--gold)" /> as React.ReactNode } : null,
                      product.weight_label ? { label: "Gramaj",       val: product.weight_label,      icon: <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--gold)" }}>gr</span> as React.ReactNode } : null,
                      product.sale_unit    ? { label: "Satış Birimi", val: product.sale_unit,         icon: <Package size={13} color="var(--gold)" /> as React.ReactNode } : null,
                      product.category     ? { label: "Kategori",     val: product.category.name_tr,  icon: null as React.ReactNode } : null,
                      { label: "Üretim",   val: "%100 Pamuk · Türkiye", icon: null as React.ReactNode },
                    ] as Array<{ label: string; val: string; icon: React.ReactNode } | null>
                  ).filter((r): r is { label: string; val: string; icon: React.ReactNode } => r !== null).map((row, i, arr) => {
                    return (
                      <div
                        key={row.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.75rem 1.25rem",
                          borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none",
                          gap: "1rem",
                        }}
                      >
                        <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {row.icon}
                          {row.label}
                        </span>
                        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--navy)", textAlign: "right" }}>
                          {row.val}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Renk seçenekleri */}
              {product.color_options?.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "0.75rem" }}>
                    Mevcut Renkler
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {product.color_options.map((c) => (
                      <span
                        key={c}
                        style={{
                          padding: "0.4rem 0.875rem",
                          border: "1.5px solid var(--border)",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          color: "var(--navy)",
                          background: "#fff",
                          cursor: "default",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Butonları */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa btn-xl btn-fw"
                  style={{ fontSize: "0.875rem" }}
                >
                  <MessageCircle size={18} />
                  WhatsApp ile Teklif Al
                </a>
                <a
                  href={`tel:+90${COMPANY.phone}`}
                  className="btn btn-outline btn-lg btn-fw"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Telefonla Ara · {COMPANY.phoneFormatted}
                </a>
              </div>

              {/* Güven notu */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "Hazır stok — aynı gün sevkiyat imkânı",
                  "Toptan fiyat için WhatsApp ile görüşün",
                  "Siparişe göre renk ve gramaj seçeneği",
                ].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <CheckCircle size={13} color="var(--gold)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── İlgili Ürünler ─── */}
      {related.length > 0 && (
        <section className="sec" style={{ background: "#fff" }}>
          <div className="wrap">
            <div className="sec-head-line">
              <div>
                <span className="eyebrow">Aynı Kategoriden</span>
                <h2 className="section-title-sm">Benzer Ürünler</h2>
              </div>
              <Link href="/urunler" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
                Tümü <ArrowRight size={13} />
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
                gap: "1.25rem",
              }}
            >
              {related.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/urunler/${p.slug}`}
                  className="prod-card"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div className="prod-img-wrap" style={{ aspectRatio: "4/3", position: "relative" }}>
                    <Image
                      src={p.image_url || PRODUCT_FALLBACK_IMAGES[i % PRODUCT_FALLBACK_IMAGES.length]}
                      alt={p.image_alt_tr || p.name_tr}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width:640px)50vw,25vw"
                      quality={70}
                    />
                  </div>
                  <div style={{ padding: "1rem 1.125rem" }}>
                    <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.875rem", lineHeight: 1.3, marginBottom: "0.3rem" }}>
                      {p.name_tr}
                    </p>
                    {p.size && (
                      <p style={{ fontSize: "0.775rem", color: "var(--muted)" }}>{p.size}</p>
                    )}
                    <p style={{ fontSize: "0.7rem", color: "var(--gold)", fontWeight: 700, marginTop: "0.5rem", letterSpacing: "0.05em" }}>
                      Teklif Al →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── JSON-LD Structured Data ─── */}
      <JsonLd data={schemaProduct({
        name_tr:            product.name_tr,
        name_en:            product.name_en,
        description_tr:     product.description_tr ?? description,
        slug:               product.slug,
        size:               product.size ?? undefined,
        weight_label:       product.weight_label ?? undefined,
        color_options:      product.color_options ?? [],
        image_url:          product.image_url ?? undefined,
        is_stock_available: product.is_stock_available,
        category:           product.category
          ? { name_tr: product.category.name_tr, name_en: product.category.name_en }
          : undefined,
      })} />
      <JsonLd data={schemaBreadcrumb([
        { name: "Ana Sayfa", url: "https://gürgentekstil.com" },
        { name: "Ürünler",   url: "https://gürgentekstil.com/urunler" },
        ...(product.category ? [{ name: product.category.name_tr, url: `https://gürgentekstil.com/urunler#${product.category.slug}` }] : []),
        { name: product.name_tr, url: `https://gürgentekstil.com/urunler/${product.slug}` },
      ])} />
      <JsonLd data={schemaOrganization()} />
    </>
  );
}
