import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COMPANY, SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "KVKK ve Gizlilik Politikası | Gürgentekstil",
  description: "Gürgentekstil kişisel verilerin korunması ve gizlilik politikası.",
  alternates: { canonical: `${SITE_URL}/kvkk`, languages: { en: "/en/privacy" } },
};

export default function KvkkPage() {
  return (
    <>
      <section className="page-hero">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.98) 0%,rgba(8,15,26,0.9) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/">Ana Sayfa</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">KVKK</span>
          </nav>
          <span className="eyebrow">Yasal</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            KVKK ve Gizlilik Politikası
          </h1>
          <p style={{ color: "rgba(255,255,255,0.38)", marginTop: "0.625rem", fontSize: "0.875rem" }}>
            Son güncelleme: Haziran 2025
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ maxWidth: 760 }} className="prose">
            {[
              { title: "1. Veri Sorumlusu", content: `Bu internet sitesi, Gürgentekstil tarafından işletilmektedir. Adres: ${COMPANY.address}. Sorularınız için ${COMPANY.phoneFormatted} numaralı telefon veya WhatsApp üzerinden iletişime geçebilirsiniz.` },
              { title: "2. Toplanan Kişisel Veriler", content: "Sitemizde yalnızca teklif formu aracılığıyla gönüllülük esasına dayalı olarak ad soyad/firma adı, telefon numarası, e-posta adresi (isteğe bağlı), ülke/şehir bilgisi ve talep bilgileri toplanmaktadır. Teknik işleyiş gereği IP adresi kaydı tutulabilir." },
              { title: "3. İşlenme Amaçları", content: "Toplanan veriler yalnızca teklif talebinize yanıt verilmesi, ticari görüşme sürecinin yürütülmesi ve siparişe göre üretim taleplerinin değerlendirilmesi amacıyla kullanılmaktadır. Verileriniz üçüncü taraflarla paylaşılmaz, satılmaz veya reklam amacıyla kullanılmaz." },
              { title: "4. Hukuki Dayanak", content: "Kişisel verileriniz, 6698 sayılı KVKK kapsamında meşru menfaat ve sözleşmenin ifası hukuki gerekçelerine dayanılarak işlenmektedir." },
              { title: "5. Saklama Süresi", content: "Teklif talep formları ve iletişim bilgileri, ticari ilişki süresince ve yasal yükümlülükler çerçevesinde saklanmaktadır. Talebiniz üzerine verileriniz silinebilir." },
              { title: "6. İlgili Kişi Hakları", content: "KVKK'nın 11. maddesi kapsamında kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz." },
              { title: "7. Çerezler", content: "Bu site temel işlevsellik için gerekli oturum çerezleri kullanabilir. Üçüncü taraf reklam veya takip çerezleri kullanılmamaktadır." },
              { title: "8. İletişim", content: `KVKK kapsamındaki talepleriniz için WhatsApp (${COMPANY.phoneFormatted}) veya telefon üzerinden bizimle iletişime geçebilirsiniz.` },
            ].map((sec) => (
              <div key={sec.title} style={{ marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid var(--border)" }}>
                <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.625rem" }}>{sec.title}</h2>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.8 }}>{sec.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
