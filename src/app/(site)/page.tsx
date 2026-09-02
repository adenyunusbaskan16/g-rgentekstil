import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, MessageCircle, CheckCircle,
  Package, Ruler, Award, Truck, Settings, Users,
} from "lucide-react";
import { COMPANY, PRODUCT_SIZES, getWhatsAppUrl, SITE_URL } from "@/lib/data";
import { getProducts, getCategories } from "@/lib/products";
import { IMAGES, CATEGORY_IMAGES, PRODUCT_FALLBACK_IMAGES } from "@/lib/images";
import {
  schemaOrganization, schemaLocalBusiness,
  schemaWebSite, schemaBreadcrumb, schemaFAQ,
} from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 60; // Her 60 saniyede yenile

export const metadata: Metadata = {
  title: "Gürgentekstil | Denizli Toptan Havlu Üretimi ve Tedariki",
  description:
    "Gürgentekstil, Denizli'de toptan havlu, el havlusu, yüz havlusu ve banyo havlusu tedariki sunan üretici firmasıdır. WhatsApp ile teklif alın.",
  alternates: {
    canonical: `${SITE_URL}`,
    languages: { "tr": `${SITE_URL}/`, "en": `${SITE_URL}/en`, "x-default": `${SITE_URL}/` },
  },
  openGraph: {
    title: "Gürgentekstil | Denizli Toptan Havlu Üretimi",
    description: "El, yüz, ayak, mutfak ve banyo havlusu — hazır stok ve özel üretim. Teklif için WhatsApp.",
    url: `${SITE_URL}`,
    type: "website",
    locale: "tr_TR",
  },
};

/* ─── CATS fallback ─── */
const CATS_FALLBACK = [
  { slug: "el",     tr: "El Havluları",     sub: "30×50 · 40×80 cm" },
  { slug: "yuz",    tr: "Yüz Havluları",    sub: "50×90 cm" },
  { slug: "ayak",   tr: "Ayak Havluları",   sub: "50×70 cm" },
  { slug: "banyo",  tr: "Banyo Havluları",  sub: "90×150 cm" },
  { slug: "mutfak", tr: "Mutfak Havluları", sub: "30×50 cm" },
  { slug: "toptan", tr: "Toptan Grup",      sub: "Çuval / Düzine" },
];

const FEATS = [
  {
    icon: Award,
    t: "Hazır Stok",
    d: "Düzine ve çuval bazlı stok ürünler hızlı teslimat için hazır.",
  },
  {
    icon: Settings,
    t: "Özel Üretim",
    d: "Siparişe göre renk, desen ve gramaj seçeneği.",
  },
  {
    icon: Truck,
    t: "Toptan Tedarik",
    d: "Mağaza, toptancı ve ihracat müşterilerine esnek satış.",
  },
  {
    icon: Users,
    t: "İhracat Odaklı",
    d: "Turkish towel supplier olarak yurt dışı alıcılara hizmet.",
  },
];

/* ─── Cotton / Leaf SVG icon ─── */
function IconCotton({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12"/>
      <path d="M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z"/>
      <path d="M12 12C12 12 17 9 17 5"/>
      <path d="M12 12C12 12 7 15 5 18"/>
      <path d="M12 12C12 12 17 15 19 18"/>
    </svg>
  );
}

function IconThread({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v8M8 12h8"/>
      <path d="M9.17 9.17l5.66 5.66M14.83 9.17l-5.66 5.66"/>
    </svg>
  );
}

function IconFactory({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20V8l6-4v4l6-4v4l6-4v16H2z"/>
      <rect x="6" y="14" width="4" height="6"/>
      <rect x="14" y="14" width="4" height="6"/>
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

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const featured = products.slice(0, 6);

  const displayCats =
    categories.length > 0
      ? categories.map((c) => {
          // Slug'a göre doğru görsel eşleştir
          const imgMap: Record<string, string> = {
            "el-havlusu":     CATEGORY_IMAGES[0],
            "yuz-havlusu":    CATEGORY_IMAGES[1],
            "ayak-havlusu":   CATEGORY_IMAGES[2],
            "banyo-havlusu":  CATEGORY_IMAGES[3],
            "mutfak-havlusu": CATEGORY_IMAGES[4],
            "toptan-havlu":   CATEGORY_IMAGES[5],
            "bas-havlusu":    CATEGORY_IMAGES[1], // yüz ile aynı
          };
          const subMap: Record<string, string> = {
            "el-havlusu":     "30×50 · 40×80 cm",
            "yuz-havlusu":    "50×85 cm",
            "ayak-havlusu":   "50×70 cm",
            "banyo-havlusu":  "90×150 cm",
            "mutfak-havlusu": "30×50 cm",
            "toptan-havlu":   "Çuval / Düzine",
            "bas-havlusu":    "50×85 cm",
          };
          return {
            slug: c.slug,
            tr: c.name_tr,
            sub: subMap[c.slug] ?? "",
            img: imgMap[c.slug] ?? CATEGORY_IMAGES[0],
          };
        })
      : CATS_FALLBACK.map((c, i) => ({ ...c, img: CATEGORY_IMAGES[i] }));

  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="hero">
        <Image
          src={IMAGES.hero}
          alt="Gürgentekstil — Kaliteli Havlu Üretimi Denizli"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center 50%" }}
          sizes="100vw"
          quality={90}
        />
        {/* Gradient — açık renkli görsel için sol taraf koyu overlay */}
        <div
          className="hero-bg"
          style={{
            background:
              "linear-gradient(110deg, rgba(8,15,26,0.92) 0%, rgba(8,15,26,0.75) 38%, rgba(8,15,26,0.4) 62%, rgba(8,15,26,0.15) 100%)",
          }}
        />

        <div className="wrap hero-content">
          <div style={{ maxWidth: 580 }}>
            <span className="eyebrow anim" style={{ color: "var(--gold)" }}>
              Denizli · Türkiye
            </span>
            <h1 className="hero-h1 anim d1">
              Havluda Üstün Kalite,<br />
              Güvenilir Toptan Çözümler
            </h1>
            <p className="hero-sub anim d2">
              El, yüz, ayak, mutfak ve banyo havlusu gruplarında hazır stok
              ve siparişe göre özel üretim — toptancılar, markalar ve ihracat için.
            </p>
            <div
              className="anim d3"
              style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}
            >
              <Link href="/urunler" className="btn btn-outline-w btn-lg">
                Ürünleri İncele
                <ArrowRight size={15} />
              </Link>
              <a
                href={getWhatsAppUrl("tr")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold btn-lg"
              >
                <MessageCircle size={15} />
                Teklif Al
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            opacity: 0.35,
          }}
          aria-hidden
        >
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(184,150,90,0.9), transparent)",
            }}
          />
          <span
            style={{
              fontSize: "0.55rem",
              color: "#fff",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURE BAND — 4 ikonu SVG
      ══════════════════════════════════════ */}
      <section className="feat-band">
        <div className="wrap">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
            className="sm:grid-cols-4"
          >
            {[
              {
                Icon: IconCotton,
                t: "%100 Pamuk",
                d: "Yüksek kalite hammadde",
              },
              {
                Icon: IconThread,
                t: "Hızlı Üretim",
                d: "Zamanında teslimat",
              },
              {
                Icon: IconFactory,
                t: "Toptan Fiyat",
                d: "En uygun fiyatlar",
              },
              {
                Icon: IconGlobe,
                t: "İhracat Odaklı",
                d: "Markanıza özel çözümler",
              },
            ].map((f, i) => (
              <div
                key={f.t}
                className="feat-band-item"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}
              >
                <div className="feat-band-icon">
                  <f.Icon size={18} color="var(--gold)" />
                </div>
                <div>
                  <p className="feat-band-title">{f.t}</p>
                  <p className="feat-band-sub">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          KATEGORİLER
      ══════════════════════════════════════ */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="eyebrow">Ürün Grupları</span>
            <h2 className="section-title">Havlu Kategorileri</h2>
          </div>
          {/* Kategoriler — bas-havlusu hariç göster (yüz havlusu ile örtüşüyor), 6 kategori = 3x2 grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "3px",
              background: "var(--border)",
            }}
            className="sm:grid-cols-3"
          >
            {displayCats
              .filter((cat) => cat.slug !== "bas-havlusu")
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={categories.length > 0 ? `/urunler#${cat.slug}` : "/urunler"}
                  className="cat-card"
                  style={{
                    aspectRatio: "3/2",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.tr}
                    fill
                    sizes="(max-width:640px)50vw,(max-width:1024px)33vw,400px"
                    style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)" }}
                    quality={75}
                  />
                  <div className="cat-card-overlay" />
                  <div className="cat-card-label">
                    <p className="cat-card-name">{cat.tr}</p>
                    {cat.sub && <p className="cat-card-sub">{cat.sub}</p>}
                    <span className="cat-card-cta">
                      Keşfet
                      <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/urunler" className="btn btn-outline btn-lg">
              Tüm Ürünleri Gör
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HAKKIMIZDA — Fotoğraf Kolajı
      ══════════════════════════════════════ */}
      <section className="sec" style={{ background: "var(--warm)" }}>
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
            {/* Fotoğraf — imalathane görseli tam boyut */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Image
                  src={IMAGES.factory}
                  alt="Gürgentekstil üretim tesisi — Denizli"
                  width={941}
                  height={1672}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  sizes="(max-width:1024px)100vw,50vw"
                  quality={85}
                />
              </div>
              {/* Floating badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: "1rem",
                  background: "var(--navy)",
                  color: "#fff",
                  padding: "1rem 1.25rem",
                  minWidth: 130,
                  zIndex: 10,
                  boxShadow: "0 8px 32px rgba(10,21,32,0.35)",
                }}
              >
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "var(--gold)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  450m²
                </p>
                <p
                  style={{
                    fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "0.25rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Kapalı Üretim Alanı
                </p>
              </div>
            </div>

            {/* Metin */}
            <div>
              <span className="eyebrow">Hakkımızda</span>
              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
                Havlu İmalatında<br />Mükemmelliği Hedefliyoruz
              </h2>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                Modern üretim tesisimiz ve deneyimli ekibimizle müşterilerimize
                en kaliteli havlu ürünlerini sunuyoruz. İhtiyacınıza özel çözümler
                ve markanıza değer katacak üretim anlayışıyla yanınızdayız.
              </p>
              <p className="body-text" style={{ marginBottom: "1.875rem" }}>
                Armurlu ve jakarli, ithal ve yerli yeni nesil dokuma makineleriyle
                yıllık 1.216 ton havlu dokuma kapasitesiyle faaliyet gösteriyoruz.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginBottom: "2.25rem",
                }}
              >
                {[
                  "Yüksek Üretim Kapasitesi",
                  "Kalite Kontrol Ekipmanı",
                  "Özel Tasarım ve Üretim",
                  "Zamanında Teslimat",
                  "Müşteri Memnuniyeti Odaklı",
                ].map((item) => (
                  <li
                    key={item}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
                  >
                    <CheckCircle size={16} color="var(--gold)" style={{ flexShrink: 0 }} />
                    <span className="body-sm" style={{ color: "var(--muted)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/kurumsal" className="btn btn-navy btn-lg">
                Hakkımızda Daha Fazla
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          İSTATİSTİK BANDI
      ══════════════════════════════════════ */}
      <section className="stat-strip">
        <div className="wrap">
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
            className="sm:grid-cols-4"
          >
            {[
              { v: "450 m²",    l: "Kapalı Üretim\nAlanı" },
              { v: "1.216 ton", l: "Yıllık Dokuma\nKapasitesi" },
              { v: "Armurlu &\nJakarli", l: "Dokuma\nAltyapısı" },
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

      {/* ══════════════════════════════════════
          ÖNE ÇIKAN ÜRÜNLER
      ══════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="sec" style={{ background: "#fff" }}>
          <div className="wrap">
            <div className="sec-head-line">
              <div>
                <span className="eyebrow">Katalog</span>
                <h2 className="section-title">Öne Çıkan Ürünler</h2>
              </div>
              <Link href="/urunler" className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>
                Tümünü Gör
                <ArrowRight size={13} />
              </Link>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {featured.map((p, i) => (
                <article key={p.id} className="prod-card">
                  <div
                    className="prod-img-wrap"
                    style={{ aspectRatio: "3/4", position: "relative", background: "#f8f5f0" }}
                  >
                    <Image
                      src={p.image_url ?? PRODUCT_FALLBACK_IMAGES[i % PRODUCT_FALLBACK_IMAGES.length]}
                      alt={p.image_alt_tr ?? p.name_tr}
                      fill
                      style={{ objectFit: "contain", padding: "0.5rem", transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)" }}
                      sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
                      quality={75}
                    />
                    {p.is_stock_available && (
                      <span
                        className="badge badge-gold"
                        style={{ position: "absolute", top: "0.875rem", left: "0.875rem" }}
                      >
                        Stokta
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "1.375rem" }}>
                    {p.category && (
                      <p
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          color: "var(--gold)",
                          textTransform: "uppercase",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {p.category.name_tr}
                      </p>
                    )}
                    <h3
                      style={{
                        fontWeight: 700,
                        color: "var(--navy)",
                        marginBottom: "0.75rem",
                        fontSize: "0.9375rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.name_tr}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.35rem",
                        marginBottom: "1rem",
                      }}
                    >
                      {p.size && (
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            fontSize: "0.8rem",
                            color: "var(--muted)",
                            alignItems: "center",
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
                            gap: "0.5rem",
                            fontSize: "0.8rem",
                            color: "var(--muted)",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 800,
                              fontSize: "0.65rem",
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
                            gap: "0.5rem",
                            fontSize: "0.8rem",
                            color: "var(--muted)",
                            alignItems: "center",
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
                            marginBottom: "0.375rem",
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
                    <a
                      href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
                        `Merhabalar, İnternet Sitenizden Ulaşıyorum. ${p.name_tr} hakkında bilgi almak istiyorum.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-wa btn-sm btn-fw"
                    >
                      <MessageCircle size={13} />
                      Teklif Al
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          EBAT TABLOSU
      ══════════════════════════════════════ */}
      <section className="sec" style={{ background: "var(--cream)" }}>
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
              <p className="body-text" style={{ marginBottom: "1.25rem" }}>
                Aşağıdaki standart ebatlarda hazır stok mevcuttur.
                Diğer ebatlar stok ve üretim durumuna göre görüşülür.
              </p>
              <div
                style={{
                  background: "#fff",
                  borderLeft: "3px solid var(--gold)",
                  padding: "1.125rem 1.25rem",
                  fontSize: "0.8125rem",
                  color: "var(--muted)",
                  lineHeight: 1.8,
                }}
              >
                Hazır stok ürünlerde çuval ve düzine bazlı toptan satış.
                Özel üretim talepleri siparişe göre değerlendirilir.
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

      {/* ══════════════════════════════════════
          ÖZELLİKLER / NEDEN BİZ
      ══════════════════════════════════════ */}
      <section
        className="sec"
        style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}
      >
        <Image
          src={IMAGES.factory}
          alt=""
          fill
          aria-hidden
          style={{ objectFit: "cover", opacity: 0.07 }}
          quality={30}
          sizes="100vw"
        />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <span className="eyebrow-center">
              Avantajlarımız
            </span>
            <h2 className="section-title-light">Neden Gürgentekstil?</h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1px",
              background: "rgba(255,255,255,0.06)",
            }}
            className="sm:grid-cols-2 lg:grid-cols-4"
          >
            {FEATS.map((f) => (
              <div
                key={f.t}
                style={{
                  background: "var(--navy)",
                  padding: "2rem 1.75rem",
                  transition: "background 0.2s",
                }}
                className="hover:bg-[var(--navy-2)]"
              >
                <div className="feat-icon-dark" style={{ marginBottom: "1.25rem" }}>
                  <f.icon size={20} color="var(--gold)" />
                </div>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.625rem",
                    fontSize: "1rem",
                    lineHeight: 1.3,
                  }}
                >
                  {f.t}
                </p>
                <p
                  style={{
                    fontSize: "0.8375rem",
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.7,
                  }}
                >
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          KALİTE / SERTIFIKA BANDI
      ══════════════════════════════════════ */}
      <section className="cert-strip">
        <div className="wrap">
          <p
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textAlign: "center",
              marginBottom: "1.75rem",
            }}
          >
            Kalite Standartları &amp; Üretim Güvencesi
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {[
              {
                label: "Sipariş Garantisi",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ),
              },
              {
                label: "Kalite Kontrolü",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                ),
              },
              {
                label: "%100 Pamuk",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5">
                    <path d="M12 22V12"/>
                    <path d="M12 12C12 12 7 9 7 5a5 5 0 0 1 10 0c0 4-5 7-5 7z"/>
                    <path d="M12 12C12 12 7 15 5 18"/>
                    <path d="M12 12C12 12 17 15 19 18"/>
                  </svg>
                ),
              },
              {
                label: "Yerli Üretim",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                ),
              },
              {
                label: "İhracat Deneyimi",
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                ),
              },
            ].map((cert) => (
              <div key={cert.label} className="cert-item">
                <div className="cert-icon-wrap">{cert.icon}</div>
                <span className="cert-label">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BÖLÜMÜ
      ══════════════════════════════════════ */}
      <section
        style={{ position: "relative", overflow: "hidden" }}
        className="sec"
      >
        <Image
          src={IMAGES.towelStack}
          alt=""
          fill
          aria-hidden
          style={{ objectFit: "cover" }}
          quality={60}
          sizes="100vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(10,21,32,0.95) 0%, rgba(10,21,32,0.88) 100%)",
          }}
        />
        <div
          className="wrap"
          style={{ position: "relative", zIndex: 1, textAlign: "center" }}
        >
          <span className="eyebrow-center">
            İletişim
          </span>
          <h2
            className="section-title-light"
            style={{ marginBottom: "1rem", maxWidth: "16ch", margin: "0 auto 1rem" }}
          >
            Bugün Görüşme Başlatın
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              marginBottom: "2.5rem",
              maxWidth: "44ch",
              margin: "0 auto 2.5rem",
              fontSize: "0.9375rem",
              lineHeight: 1.8,
            }}
          >
            Teklif ve sipariş için WhatsApp veya teklif formu üzerinden ulaşın.
            En kısa sürede dönüş yapılır.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
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
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      {/* ═══════════════════════════════════════
          JSON-LD STRUCTURED DATA — GEO + SEO
      ═══════════════════════════════════════ */}
      <JsonLd data={schemaOrganization()} />
      <JsonLd data={schemaLocalBusiness()} />
      <JsonLd data={schemaWebSite()} />
      <JsonLd data={schemaBreadcrumb([
        { name: "Ana Sayfa", url: `${SITE_URL}` },
      ])} />
      <JsonLd data={schemaFAQ([
        {
          question: "Gürgentekstil hangi havlu türlerini üretiyor?",
          answer: "Gürgentekstil; el havlusu, yüz havlusu, ayak havlusu, mutfak el havlusu ve banyo havlusu üretimi yapmaktadır. Tüm ürünler %100 pamuktan üretilmektedir.",
        },
        {
          question: "Minimum sipariş miktarı nedir?",
          answer: "Hazır stok ürünlerde düzine ve çuval bazlı satış yapılmaktadır. Özel üretim talepleri siparişe göre ayrıca değerlendirilmektedir.",
        },
        {
          question: "Nasıl teklif alınır?",
          answer: "WhatsApp (+90 532 557 09 71) veya sitemizin iletişim formu üzerinden teklif talebinde bulunabilirsiniz. En kısa sürede geri dönüş yapılır.",
        },
        {
          question: "İhracat yapıyor musunuz?",
          answer: "Evet, Gürgentekstil yurt dışı alıcılara da hizmet vermektedir. İhracat talepleri için WhatsApp veya telefon üzerinden iletişime geçebilirsiniz.",
        },
        {
          question: "Havlu üretim kapasitesi nedir?",
          answer: "Gürgentekstil, yıllık 1.216 ton havlu dokuma kumaş üretim kapasitesine sahiptir. 450 m² kapalı üretim alanında armurlu ve jakarli dokuma makineleriyle üretim yapılmaktadır.",
        },
        {
          question: "Özel renk ve desen üretimi mümkün mü?",
          answer: "Evet, siparişe göre özel renk, desen ve gramaj seçenekleriyle üretim yapılabilmektedir. Detaylar için WhatsApp üzerinden iletişime geçin.",
        },
      ])} />
    </>
  );
}
