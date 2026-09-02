import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle, ChevronRight, ArrowRight,
  Ruler, Package, CheckCircle, ArrowLeft,
} from "lucide-react";
import { COMPANY, getWhatsAppUrl, SITE_URL } from "@/lib/data";
import { getProductBySlug, getProducts } from "@/lib/products";
import { PRODUCT_FALLBACK_IMAGES } from "@/lib/images";
import { schemaProduct, schemaBreadcrumb } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

function autoDescriptionEn(p: {
  name_en: string;
  size?: string;
  weight_label?: string;
  sale_unit?: string;
  category?: { name_en: string };
}): string {
  const parts: string[] = [];
  if (p.category?.name_en) parts.push(`Part of the ${p.category.name_en} group,`);
  parts.push(`${p.name_en}`);
  if (p.size) parts.push(`in ${p.size}`);
  if (p.weight_label) parts.push(`at ${p.weight_label}`);
  parts.push(
    `is made from 100% cotton and offers high absorbency and long-lasting durability.` +
    ` Available in ready stock and custom production options for wholesale supply.`
  );
  if (p.sale_unit) parts.push(`Sales unit: ${p.sale_unit}.`);
  return parts.join(" ");
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) return { title: "Product Not Found" };

  const desc = (p.description_en || autoDescriptionEn(p)).slice(0, 160);
  const canonicalUrl = `${SITE_URL}/en/products/${slug}`;
  const imgUrl = p.image_url ?? `${SITE_URL}/opengraph-image`;

  return {
    title: `${p.name_en}${p.size ? ` ${p.size}` : ""} — Wholesale Towel | Gurgen Tekstil`,
    description: desc,
    keywords: [p.name_en, p.category?.name_en, "wholesale towel Turkey", "towel manufacturer Denizli", p.size].filter(Boolean) as string[],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": canonicalUrl,
        "tr": `${SITE_URL}/urunler/${slug}`,
        "x-default": `${SITE_URL}/urunler/${slug}`,
      },
    },
    openGraph: {
      title: `${p.name_en}${p.size ? ` (${p.size})` : ""} | Gurgen Tekstil`,
      description: desc,
      url: canonicalUrl,
      type: "website",
      locale: "en_US",
      images: [{ url: imgUrl, width: 1200, height: 630, alt: p.image_alt_en ?? p.name_en }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name_en} | Gurgen Tekstil`,
      description: desc,
      images: [imgUrl],
    },
  };
}

export default async function EnProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const description = product.description_en || autoDescriptionEn(product);
  const waMsg = encodeURIComponent(
    `Hello Gurgen Tekstil, I would like to get a quote for ${product.name_en}${product.size ? ` (${product.size})` : ""}.`
  );
  const waUrl = `https://wa.me/${COMPANY.whatsapp}?text=${waMsg}`;

  const related = product.category_id
    ? (await getProducts())
        .filter((p) => p.category_id === product.category_id && p.id !== product.id)
        .slice(0, 4)
    : [];

  const imgSrc = product.image_url || PRODUCT_FALLBACK_IMAGES[0];

  return (
    <>
      {/* ── Breadcrumb ── */}
      <div style={{ background: "var(--navy-4)", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingTop: "var(--hdr)" }}>
        <div className="wrap" style={{ padding: "0.875rem 1.25rem" }}>
          <nav className="breadcrumb" style={{ marginBottom: 0 }}>
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <Link href="/en/products">Products</Link>
            <ChevronRight size={11} />
            {product.category && (
              <>
                <Link href={`/en/products#${product.category.slug}`}>{product.category.name_en}</Link>
                <ChevronRight size={11} />
              </>
            )}
            <span className="breadcrumb-current"
              style={{ maxWidth: "20ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {product.name_en}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ── */}
      <section style={{ background: "var(--warm)", paddingBottom: "4rem" }}>
        <div className="wrap" style={{ paddingTop: "2rem" }}>
          <Link href="/en/products"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", fontWeight: 600, color: "var(--muted)", marginBottom: "1.5rem", letterSpacing: "0.04em", transition: "color 0.15s" }}
            className="hover:!text-[var(--navy)]">
            <ArrowLeft size={14} /> All Products
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "start" }} className="lg:grid-cols-2">

            {/* Image */}
            <div>
              <div style={{ position: "relative", paddingBottom: "130%", overflow: "hidden", background: "#f8f5f0", border: "1px solid var(--border)" }}>
                <Image src={imgSrc} alt={product.image_alt_en || product.name_en} fill priority
                  style={{ objectFit: "contain", padding: "1rem" }} sizes="(max-width:1024px)100vw,50vw" quality={85} />
                <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem", zIndex: 2 }}>
                  {product.is_stock_available && <span className="badge badge-gold">In Stock</span>}
                  {product.is_custom_order && <span className="badge badge-navy">Custom Order</span>}
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                {product.category && (
                  <Link href={`/en/products#${product.category.slug}`}
                    style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", display: "inline-block", marginBottom: "0.625rem" }}>
                    {product.category.name_en}
                  </Link>
                )}
                <h1 style={{ fontSize: "clamp(1.5rem,3.5vw,2.25rem)", fontWeight: 700, color: "var(--navy)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "0.875rem" }}>
                  {product.name_en}
                </h1>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.85 }}>{description}</p>
              </div>

              {/* Specs table */}
              <div style={{ background: "#fff", border: "1px solid var(--border)" }}>
                <div style={{ padding: "0.75rem 1.25rem", background: "var(--navy)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
                  Product Details
                </div>
                {(
                  [
                    product.size         ? { label: "Size",       val: product.size,             icon: <Ruler size={13} color="var(--gold)" /> as React.ReactNode } : null,
                    product.weight_label ? { label: "Weight",     val: product.weight_label,      icon: <span style={{ fontSize: "0.6rem", fontWeight: 800, color: "var(--gold)" }}>gr</span> as React.ReactNode } : null,
                    product.sale_unit    ? { label: "Sales Unit", val: product.sale_unit,         icon: <Package size={13} color="var(--gold)" /> as React.ReactNode } : null,
                    product.category     ? { label: "Category",   val: product.category.name_en,  icon: null as React.ReactNode } : null,
                    { label: "Material",   val: "100% Cotton · Turkey", icon: null as React.ReactNode },
                  ] as Array<{ label: string; val: string; icon: React.ReactNode } | null>
                ).filter((r): r is { label: string; val: string; icon: React.ReactNode } => r !== null).map((row, i, arr) => {
                  return (
                    <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1.25rem", borderBottom: i < arr.length - 1 ? "1px solid var(--border)" : "none", gap: "1rem" }}>
                      <span style={{ fontSize: "0.8rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>{row.icon}{row.label}</span>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--navy)", textAlign: "right" }}>{row.val}</span>
                    </div>
                  );
                })}
              </div>

              {/* Colors */}
              {product.color_options?.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "0.75rem" }}>Available Colors</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {product.color_options.map((c) => (
                      <span key={c} style={{ padding: "0.4rem 0.875rem", border: "1.5px solid var(--border)", fontSize: "0.8rem", fontWeight: 500, color: "var(--navy)", background: "#fff" }}>{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-xl btn-fw" style={{ fontSize: "0.875rem" }}>
                  <MessageCircle size={18} /> Get a Quote via WhatsApp
                </a>
                <a href={`tel:+90${COMPANY.phone}`} className="btn btn-outline btn-lg btn-fw" style={{ fontSize: "0.8125rem" }}>
                  Call Us · {COMPANY.phoneFormatted}
                </a>
              </div>

              {/* Trust */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {["Ready stock — same day dispatch possible", "Contact via WhatsApp for wholesale pricing", "Custom color and weight options available"].map((t) => (
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

      {/* Related */}
      {related.length > 0 && (
        <section className="sec" style={{ background: "#fff" }}>
          <div className="wrap">
            <div className="sec-head-line">
              <div>
                <span className="eyebrow">Same Category</span>
                <h2 className="section-title-sm">Related Products</h2>
              </div>
              <Link href="/en/products" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>All <ArrowRight size={13} /></Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1.25rem" }}>
              {related.map((p, i) => (
                <Link key={p.id} href={`/en/products/${p.slug}`} className="prod-card" style={{ textDecoration: "none", display: "block" }}>
                  <div className="prod-img-wrap" style={{ aspectRatio: "4/3", position: "relative" }}>
                    <Image src={p.image_url || PRODUCT_FALLBACK_IMAGES[i % PRODUCT_FALLBACK_IMAGES.length]}
                      alt={p.image_alt_en || p.name_en} fill style={{ objectFit: "cover" }} sizes="(max-width:640px)50vw,25vw" quality={70} />
                  </div>
                  <div style={{ padding: "1rem 1.125rem" }}>
                    <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.875rem", lineHeight: 1.3, marginBottom: "0.3rem" }}>{p.name_en}</p>
                    {p.size && <p style={{ fontSize: "0.775rem", color: "var(--muted)" }}>{p.size}</p>}
                    <p style={{ fontSize: "0.7rem", color: "var(--gold)", fontWeight: 700, marginTop: "0.5rem" }}>Get Quote →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* JSON-LD */}
      <JsonLd data={schemaProduct({
        name_tr:            product.name_tr,
        name_en:            product.name_en,
        description_tr:     product.description_en ?? description,
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
        { name: "Home",     url: `${SITE_URL}/en` },
        { name: "Products", url: `${SITE_URL}/en/products` },
        ...(product.category ? [{ name: product.category.name_en, url: `${SITE_URL}/en/products#${product.category.slug}` }] : []),
        { name: product.name_en, url: `${SITE_URL}/en/products/${product.slug}` },
      ])} />
    </>
  );
}
