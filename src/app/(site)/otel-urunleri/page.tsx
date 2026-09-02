import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ChevronRight, ArrowRight, Ruler, Layers, Settings, CheckCircle, Image as ImageIcon } from "lucide-react";
import { COMPANY, getWhatsAppUrl, SITE_URL } from "@/lib/data";
import { HOTEL_IMAGES } from "@/lib/images";
import { schemaOrganization, schemaBreadcrumb, schemaWebPage, schemaItemList } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import ZoomableImage from "@/components/ui/ZoomableImage";

const PAGE_URL = `${SITE_URL}/otel-urunleri`;

export const metadata: Metadata = {
  title: "Otel Tekstili Ürünleri | Otel Havlusu, Bornoz, Nevresim ve Çarşaf Üreticisi",
  description:
    "Gürgentekstil; otel, resort ve spa işletmeleri için otel havlusu, bornoz, pike, nevresim, çarşaf ve yastık kılıfı üretimi yapar. Özel ölçü, gramaj ve desen seçenekleriyle toptan hospitality tekstili tedariki.",
  keywords: [
    "otel tekstili",
    "otel tekstili üreticisi",
    "otel havlusu",
    "otel havlusu toptan",
    "otel bornozu",
    "otel nevresimi",
    "otel çarşafı",
    "otel yastık kılıfı",
    "jakarlı otel havlusu",
    "hotel textile manufacturer Turkey",
    "hotel towels manufacturer Turkey",
    "hospitality textile manufacturer Turkey",
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      tr: PAGE_URL,
      en: `${SITE_URL}/en/hotel-products`,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "Otel Tekstili Ürünleri | Gürgentekstil",
    description:
      "Otel, resort ve spa işletmeleri için havlu, bornoz, nevresim, çarşaf ve yastık kılıfında özel üretim imkânı.",
    url: PAGE_URL,
    type: "website",
    locale: "tr_TR",
  },
};

/* ─── Örnek ebat/iplik verileri — "kesin standart" değil, örnek/tercih edilebilir seçenekler ─── */
const TOWEL_SIZES = ["30 × 50 cm", "50 × 70 cm", "50 × 90 cm", "70 × 140 cm", "90 × 150 cm", "100 × 150 cm"];
const YARN_OPTIONS = ["16/1", "20/2", "20/2 Ring Çift Kat"];

const PRODUCT_GROUPS = [
  { id: "otel-havlulari", name: "Otel Havluları" },
  { id: "otel-ayak-havlulari", name: "Otel Ayak Havluları" },
  { id: "otel-bornozlari", name: "Otel Bornozları" },
  { id: "otel-pike", name: "Otel Pike" },
  { id: "otel-nevresimleri", name: "Otel Nevresimleri" },
  { id: "otel-carsaflari", name: "Otel Çarşafları" },
  { id: "otel-nevresim-takimlari", name: "Otel Nevresim Takımları" },
  { id: "otel-yastik-kiliflari", name: "Otel Yastık Kılıfları" },
];

const FAQ_ITEMS = [
  {
    q: "Otel havlusu hangi ölçülerde üretiliyor?",
    a: "Otel işletmelerinde sık tercih edilen 30×50, 50×90, 70×140, 90×150 ve 100×150 cm gibi ölçülerde üretim değerlendirilir. Bunlar örnek ölçülerdir; işletmenizin ihtiyacına göre farklı bir ölçü de talep edebilirsiniz.",
  },
  {
    q: "Özel gramaj üretimi yapılabilir mi?",
    a: "Evet, talep edilen gramaja göre üretim planlaması yapılabilir. Kesin gramaj ve teslim süresi, numune ve sipariş miktarına göre WhatsApp veya teklif formu üzerinden netleştirilir.",
  },
  {
    q: "Özel ölçü otel havlusu üretilebilir mi?",
    a: "Evet, standart ölçüler dışında işletmenize özel ölçü talepleri değerlendirilir. Detaylar için iletişime geçmeniz yeterlidir.",
  },
  {
    q: "Jakar desenli havlu üretilebilir mi?",
    a: "Evet, armurlu ve jakarlı dokuma altyapımızla jakar desenli havlu üretimi yapılabilir. Desen ve logo talepleri sipariş öncesi görüşülür.",
  },
  {
    q: "Otel bornozu üretimi yapılıyor mu?",
    a: "Evet, otel ve spa işletmeleri için bornoz üretimi talepleri değerlendirilir. Kumaş tipi ve ebat seçenekleri için iletişime geçebilirsiniz.",
  },
  {
    q: "Otel nevresim ve çarşaf üretimi var mı?",
    a: "Evet, nevresim, çarşaf, nevresim takımı ve yastık kılıfı gibi otel yatak tekstili ürünleri de üretim kapsamımızdadır.",
  },
  {
    q: "Toplu otel tekstili siparişlerinde nasıl teklif alınır?",
    a: "İhtiyacınız olan ürün grubu, ölçü, gramaj ve tahmini miktar bilgisiyle WhatsApp'tan veya sitemizdeki teklif formundan bize ulaşabilirsiniz. Talebiniz değerlendirilip en kısa sürede geri dönüş yapılır.",
  },
  {
    q: "Türkiye dışına B2B üretim yapılabilir mi?",
    a: "Evet, ihracat ve yurt dışı toptan tedarik talepleri de değerlendirilmektedir. Ülke ve miktar bilgisiyle WhatsApp veya telefon üzerinden iletişime geçebilirsiniz.",
  },
];

/* ─── Görsel placeholder — her ürün grubunun KENDİ görseli buraya gelecek.
   Başka bir üründen/kategoriden görsel ödünç alınmıyor. Gerçek fotoğraf
   HTML'i geldiğinde bu bileşenin yerine doğrudan o kod yerleştirilecek. ─── */
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
    `Merhabalar, İnternet Sitenizden Ulaşıyorum. ${title} hakkında bilgi almak istiyorum.`
  )}`;

  return (
    <div id={id} style={{ scrollMarginTop: "calc(var(--hdr) + 1rem)" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "center" }}
        className="lg:grid-cols-2"
      >
        {/* Görsel alanı — ürüne göre 1 veya 2 slot; her slot kendi fotoğrafını gösterir */}
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

        {/* Metin */}
        <div>
          <h2 className="section-title-sm" style={{ marginBottom: "1rem" }}>{title}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
            {children}
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">
            <MessageCircle size={13} /> Teklif Al
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OtelUrunleriPage() {
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
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Otel Ürünleri</span>
          </nav>
          <span className="eyebrow">Hospitality Tekstili</span>
          <h1
            style={{
              fontSize: "clamp(1.75rem,4vw,3rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
              maxWidth: "18ch",
            }}
          >
            Otel Tekstili Ürünleri
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
            Otel, resort, spa ve hospitality işletmeleri için özel ölçü, gramaj, iplik ve desen
            seçenekleriyle havlu, bornoz, nevresim, çarşaf ve yastık kılıfı üretimi.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginTop: "1.75rem" }}>
            <a href={getWhatsAppUrl("tr")} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">
              <MessageCircle size={15} /> Teklif Al
            </a>
            <Link href="/urunler" className="btn btn-outline-w btn-lg">
              Ürünleri İncele <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Otel Tekstili Üretimi (giriş) ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ maxWidth: "68ch" }}>
            <span className="eyebrow">Otel Tekstili Üretimi</span>
            <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>
              Otel ve İşletmelere Toplu Tekstil Üretimi
            </h2>
            <p className="body-text" style={{ marginBottom: "1rem" }}>
              Otel, resort, spa ve butik otel işletmelerinin tekstil ihtiyacı; ev tipi alımlardan
              farklı olarak yüksek adetli, standart kaliteli ve düzenli tedarik gerektiren bir
              süreçtir. Gürgentekstil, Denizli&apos;deki üretim tesisinde armurlu ve jakarlı, ithal
              ve yerli yeni nesil dokuma makineleriyle bu ihtiyaca yönelik toptan üretim ve tedarik
              taleplerini değerlendirir.
            </p>
            <p className="body-text">
              Hazır stok ürünler ile birlikte, işletmenizin marka standardına uygun özel üretim
              seçenekleri de görüşülebilir. Ölçü, gramaj, iplik tipi ve desen tercihleriniz
              doğrultusunda numune ve teklif süreci başlatılır.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ürün Grupları — Sticky benzeri basit anchor liste ── */}
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

      {/* ── Ürün Grupları — Detay Bölümleri ── */}
      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>

          {/* Otel Havluları */}
          <ProductSection
            id="otel-havlulari"
            title="Otel Havluları"
            images={[{ src: HOTEL_IMAGES.towel[0], alt: "Otel havlusu — Gürgentekstil toptan üretim" }]}
          >
            <p className="body-sm">
              Otel havlularında sık tercih edilen ölçüler arasında{" "}
              <strong style={{ color: "var(--navy)" }}>{TOWEL_SIZES.join(", ")}</strong> sayılabilir.
              Bunlar kesin standart değil, örnek ve tercih edilebilir ölçülerdir; işletmenizin
              ihtiyacına göre farklı bir ölçü de değerlendirilebilir.
            </p>
            <p className="body-sm">
              İplik seçeneği olarak <strong style={{ color: "var(--navy)" }}>16/1, 20/2 ve 20/2 Ring
              Çift Kat</strong> gibi alternatifler görüşülebilir. İstenilen gramaj, jakar desen ve
              kurumsal logo/marka üretimi talepleri sipariş öncesi netleştirilir.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {YARN_OPTIONS.map((y) => (
                <span key={y} style={{ padding: "0.3rem 0.7rem", border: "1px solid var(--border)", fontSize: "0.7rem", color: "var(--muted)", background: "#fff" }}>
                  {y}
                </span>
              ))}
            </div>
          </ProductSection>

          {/* Otel Ayak Havluları */}
          <ProductSection
            id="otel-ayak-havlulari"
            title="Otel Ayak Havluları"
            images={[{ src: HOTEL_IMAGES.footTowel[0], alt: "Otel ayak havlusu — toptan üretim" }]}
          >
            <p className="body-sm">
              Otel banyolarında sıkça tercih edilen ayak havlusunda örnek ölçü olarak{" "}
              <strong style={{ color: "var(--navy)" }}>50 × 70 cm</strong> öne çıkar. Bu, kesin bir
              standart değil, sık tercih edilen bir ölçüdür; işletmenizin ihtiyacına göre farklı bir
              ölçü de değerlendirilebilir.
            </p>
            <p className="body-sm">
              Diğer havlu gruplarında olduğu gibi iplik tipi, gramaj ve jakar desen seçenekleri
              talebe göre görüşülür.
            </p>
          </ProductSection>

          {/* Otel Bornozları */}
          <ProductSection
            id="otel-bornozlari"
            title="Otel Bornozları"
            images={[{ src: HOTEL_IMAGES.bathrobe[0], alt: "Otel bornozu — toptan üretim" }]}
          >
            <p className="body-sm">
              Otel ve spa işletmelerinin misafir konforu için tercih ettiği bornoz üretiminde,
              kullanım amacına göre kumaş tipi ve ebat seçenekleri değerlendirilir. Kurumsal
              siparişlerde işletmenize özel etiket/nakış talepleri ayrıca görüşülür.
            </p>
            <p className="body-sm">
              Toplu sipariş adedine göre üretim planlaması yapılır; kesin teslim süresi numune
              onayı sonrası netleşir.
            </p>
          </ProductSection>

          {/* Otel Pike */}
          <ProductSection
            id="otel-pike"
            title="Otel Pike"
            images={[{ src: HOTEL_IMAGES.bedspread[0], alt: "Otel pike — yatak örtüsü üretimi" }]}
          >
            <p className="body-sm">
              Yatak odası tekstilinin tamamlayıcısı olan pike üretiminde, otel odalarının genel
              tasarım diline uygun sade ve dayanıklı doku seçenekleri değerlendirilir. Ebat ve
              renk talepleri sipariş öncesi görüşülür.
            </p>
          </ProductSection>

          {/* Otel Nevresimleri */}
          <ProductSection
            id="otel-nevresimleri"
            title="Otel Nevresimleri"
            images={[{ src: HOTEL_IMAGES.duvetCover[0], alt: "Otel nevresimi — toptan üretim" }]}
          >
            <p className="body-sm">
              Yoğun kullanıma dayanıklı, kolay yıkanabilir nevresim üretimi otel işletmelerinin
              yatak odası tekstili ihtiyacının önemli bir parçasıdır. Yatak ölçüsüne (tek/çift
              kişilik) göre üretim seçenekleri değerlendirilir.
            </p>
          </ProductSection>

          {/* Otel Çarşafları */}
          <ProductSection
            id="otel-carsaflari"
            title="Otel Çarşafları"
            images={[{ src: HOTEL_IMAGES.bedsheet[0], alt: "Otel çarşafı — toptan üretim" }]}
          >
            <p className="body-sm">
              Otel çarşaflarında sık yıkamaya dayanıklılık ve düzgün doku önemlidir. Yatak
              ölçülerine göre farklı ebat seçenekleri ve toplu sipariş adetleri değerlendirilir.
            </p>
          </ProductSection>

          {/* Otel Nevresim Takımları */}
          <ProductSection
            id="otel-nevresim-takimlari"
            title="Otel Nevresim Takımları"
            images={[{ src: HOTEL_IMAGES.beddingSet[0], alt: "Otel nevresim takımı — set üretimi" }]}
          >
            <p className="body-sm">
              Nevresim, çarşaf ve yastık kılıfının bir arada değerlendirildiği takım siparişleri,
              otel işletmelerinin oda standardizasyonu için pratik bir çözümdür. Set içeriği ve
              adetleri talebe göre şekillendirilir.
            </p>
          </ProductSection>

          {/* Otel Yastık Kılıfları */}
          <ProductSection
            id="otel-yastik-kiliflari"
            title="Otel Yastık Kılıfları"
            images={[{ src: HOTEL_IMAGES.pillowcase[0], alt: "Otel yastık kılıfı — toptan üretim" }]}
          >
            <p className="body-sm">
              Nevresim takımıyla uyumlu veya ayrı sipariş edilebilen yastık kılıflarında,
              yastık ölçüsüne göre standart seçenekler değerlendirilir. Toptan siparişlerde
              set bazlı veya adet bazlı tedarik mümkündür.
            </p>
          </ProductSection>
        </div>
      </section>

      {/* ── Özel Üretim ── */}
      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="eyebrow-center">Özelleştirme</span>
            <h2 className="section-title-light">Özel Üretim</h2>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}
            className="sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Ruler, t: "İstenilen Ebat", d: "İşletmenizin ihtiyacına göre ölçü seçenekleri değerlendirilir." },
              { icon: Layers, t: "İstenilen Gramaj", d: "Kullanım amacına uygun gramaj tercihi görüşülür." },
              { icon: Settings, t: "İplik & Desen", d: "16/1, 20/2, 20/2 Ring Çift Kat gibi iplik seçenekleri ve jakar desen imkânı." },
              { icon: CheckCircle, t: "Kurumsal Üretim", d: "Marka standardınıza uygun kurumsal sipariş süreci." },
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

      {/* ── Otel Havlusu Seçimi ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3.5rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Rehber</span>
              <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>Otel Havlusu Seçiminde Nelere Dikkat Edilmeli?</h2>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                Otel havlusu seçiminde ölçü, gramaj ve kullanım amacı birlikte değerlendirilmelidir.
                Örneğin el/yüz havlusu için tercih edilen gramaj ile banyo havlusu için tercih
                edilen gramaj farklı olabilir; günlük yoğun kullanım da dayanıklılık beklentisini
                etkiler.
              </p>
              <p className="body-text">
                Kesin gramaj, ebat ve iplik kombinasyonu; işletmenizin kullanım yoğunluğu ve
                bütçesine göre birlikte belirlenir. Uydurma teknik veri paylaşmak yerine, ihtiyacınızı
                dinleyip uygun seçeneği birlikte netleştirmeyi tercih ediyoruz.
              </p>
            </div>
            <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
              <table className="tbl">
                <thead>
                  <tr><th>Örnek Ölçü</th><th>Genel Kullanım</th></tr>
                </thead>
                <tbody>
                  <tr><td>30 × 50 cm</td><td style={{ fontWeight: 400 }}>El havlusu</td></tr>
                  <tr><td>50 × 70 cm</td><td style={{ fontWeight: 400 }}>Ayak havlusu</td></tr>
                  <tr><td>50 × 90 cm</td><td style={{ fontWeight: 400 }}>Yüz / baş havlusu</td></tr>
                  <tr><td>70 × 140 cm</td><td style={{ fontWeight: 400 }}>Orta boy banyo havlusu</td></tr>
                  <tr><td>90 × 150 cm</td><td style={{ fontWeight: 400 }}>Banyo havlusu</td></tr>
                  <tr><td>100 × 150 cm</td><td style={{ fontWeight: 400 }}>Büyük boy banyo havlusu</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── B2B Teklif ── */}
      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ maxWidth: "68ch", margin: "0 auto", textAlign: "center" }}>
            <span className="eyebrow-center">Süreç</span>
            <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>Toplu Otel Tekstili Siparişlerinde Teklif Süreci</h2>
            <p className="body-text" style={{ marginBottom: "1.75rem" }}>
              İhtiyacınız olan ürün grubunu (havlu, bornoz, nevresim, çarşaf vb.), tercih ettiğiniz
              ölçü/gramaj bilgisini ve tahmini sipariş adedini WhatsApp veya teklif formu üzerinden
              iletmeniz yeterlidir. Talebiniz değerlendirilip numune ve fiyat teklifi süreci
              başlatılır.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
              <a href={getWhatsAppUrl("tr")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
                <MessageCircle size={16} /> WhatsApp ile Teklif Al
              </a>
              <Link href="/iletisim" className="btn btn-navy btn-lg">
                Teklif Formu <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap" style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="eyebrow-center">Sıkça Sorulanlar</span>
            <h2 className="section-title">Otel Tekstili Hakkında Sık Sorulan Sorular</h2>
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

      {/* ─── JSON-LD ───
          Not: Bu bir landing page olduğu için sahte Product/fiyat şeması
          eklenmedi. FAQ içeriği sayfada görünür durumda ama FAQPage
          structured-data eklenmedi — Google'ın güncel rich-result
          politikası FAQ zengin sonuçlarını büyük ölçüde sınırladığı için
          burada spam benzeri bir kullanım olmasın diye tercih edilmedi. */}
      <JsonLd data={schemaWebPage({
        name: "Otel Tekstili Ürünleri | Gürgentekstil",
        description: "Otel, resort ve spa işletmeleri için havlu, bornoz, nevresim, çarşaf ve yastık kılıfı üretimi.",
        url: PAGE_URL,
        inLanguage: "tr",
      })} />
      <JsonLd data={schemaBreadcrumb([
        { name: "Ana Sayfa", url: SITE_URL },
        { name: "Otel Ürünleri", url: PAGE_URL },
      ])} />
      <JsonLd data={schemaItemList(
        PRODUCT_GROUPS.map((g, i) => ({ name: g.name, url: `${PAGE_URL}#${g.id}`, position: i + 1 }))
      )} />
      <JsonLd data={schemaOrganization()} />
    </>
  );
}
