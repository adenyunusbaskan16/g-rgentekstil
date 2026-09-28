"use client";

import { useId, useRef, useState } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";
type FieldName = "full_name" | "phone" | "email";

const EMPTY = {
  full_name: "", company_name: "", phone: "", email: "",
  country_city: "", product_group: "", size: "", quantity: "", message: "",
  website: "", // honeypot — gerçek kullanıcılar doldurmaz
};

export default function QuoteForm({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const isEn = lang === "en";
  const uid = useId();
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [form, setForm] = useState(EMPTY);
  const formRef = useRef<HTMLFormElement>(null);

  const id = (n: string) => `${uid}-${n}`;

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    // kullanıcı düzeltmeye başlayınca o alanın hatasını kaldır
    if (name in fieldErrors) setFieldErrors((p) => ({ ...p, [name]: undefined }));
  };

  const t = {
    nameReq: isEn ? "Please enter your name." : "Lütfen adınızı ve soyadınızı girin.",
    phoneReq: isEn ? "Please enter a valid phone number (at least 10 digits)." : "Lütfen geçerli bir telefon numarası girin (en az 10 hane).",
    emailBad: isEn ? "Please enter a valid e-mail address." : "Lütfen geçerli bir e-posta adresi girin.",
    tooMany: isEn ? "Too many requests. Please try again in a few minutes." : "Çok fazla istek gönderildi. Lütfen birkaç dakika sonra tekrar deneyin.",
    generic: isEn ? "Something went wrong. Please try again or contact us on WhatsApp." : "Bir sorun oluştu. Lütfen tekrar deneyin veya WhatsApp'tan bize ulaşın.",
    network: isEn ? "Connection problem. Please check your internet and try again." : "Bağlantı sorunu. İnternetinizi kontrol edip tekrar deneyin.",
  };

  function validate() {
    const errs: Partial<Record<FieldName, string>> = {};
    if (!form.full_name.trim()) errs.full_name = t.nameReq;
    if (form.phone.replace(/\D/g, "").length < 10) errs.phone = t.phoneReq;
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = t.emailBad;
    return errs;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const errs = validate();
    setFieldErrors(errs);
    const first = (Object.keys(errs) as FieldName[])[0];
    if (first) {
      setState("idle");
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        setState("success");
        setForm(EMPTY);
      } else {
        setState("error");
        // Sunucu mesajları Türkçe; EN formda yerelleştirilmiş mesaj göster
        setError(res.status === 429 ? t.tooMany : isEn ? t.generic : data.error ?? t.generic);
      }
    } catch {
      setState("error");
      setError(t.network);
    }
  }

  const productGroups = isEn
    ? ["Hand Towels", "Face Towels", "Foot Towels", "Bath Towels", "Kitchen Towels", "Wholesale Bale", "Custom Order"]
    : ["El Havluları", "Yüz Havluları", "Ayak Havluları", "Banyo Havluları", "Mutfak El Havluları", "Toptan Çuval", "Özel Üretim"];

  const sizes = ["30x50 cm", "40x80 cm", "50x70 cm", "50x90 cm", "90x150 cm", isEn ? "Other" : "Diğer"];

  const errStyle: React.CSSProperties = { fontSize: "0.75rem", color: "#b91c1c", marginTop: "0.375rem", display: "flex", gap: "0.375rem", alignItems: "center" };
  const invalid = (n: FieldName): React.CSSProperties | undefined =>
    fieldErrors[n] ? { borderColor: "#dc2626" } : undefined;
  const fieldErr = (n: FieldName) =>
    fieldErrors[n] ? (
      <p id={id(`${n}-err`)} style={errStyle}>
        <AlertCircle size={12} style={{ flexShrink: 0 }} aria-hidden /> {fieldErrors[n]}
      </p>
    ) : null;

  if (state === "success") return (
    <div role="status" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "2.5rem", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
        <CheckCircle size={28} color="#16a34a" />
      </div>
      <h3 style={{ fontWeight: 700, color: "var(--navy)", fontSize: "1rem", marginBottom: "0.5rem" }}>
        {isEn ? "Request received!" : "Talebiniz İletildi!"}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
        {isEn ? "We will contact you as soon as possible." : "En kısa sürede sizinle iletişime geçeceğiz."}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
        <a href={getWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">
          <MessageCircle size={14} /> {isEn ? "Also WhatsApp" : "WhatsApp ile de ulaşın"}
        </a>
        <button onClick={() => setState("idle")} className="btn btn-outline btn-sm">
          {isEn ? "New Request" : "Yeni Talep"}
        </button>
      </div>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {state === "error" && (
        <div role="alert" style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", fontSize: "0.875rem", color: "#b91c1c" }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} aria-hidden />
          {error}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem" }}>
        <div>
          <label htmlFor={id("full_name")} className="f-label">{isEn ? "Name *" : "Ad Soyad *"}</label>
          <input id={id("full_name")} name="full_name" type="text" required autoComplete="name"
            value={form.full_name} onChange={set}
            aria-invalid={!!fieldErrors.full_name} aria-describedby={fieldErrors.full_name ? id("full_name-err") : undefined}
            placeholder={isEn ? "Your name" : "Adınız"} className="f-input" style={invalid("full_name")} />
          {fieldErr("full_name")}
        </div>
        <div>
          <label htmlFor={id("phone")} className="f-label">{isEn ? "Phone *" : "Telefon *"}</label>
          <input id={id("phone")} name="phone" type="tel" inputMode="tel" required autoComplete="tel"
            value={form.phone} onChange={set}
            aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? id("phone-err") : undefined}
            placeholder="0532 xxx xx xx" className="f-input" style={invalid("phone")} />
          {fieldErr("phone")}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem" }}>
        <div>
          <label htmlFor={id("email")} className="f-label">{isEn ? "Email" : "E-posta"}</label>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email"
            value={form.email} onChange={set}
            aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? id("email-err") : undefined}
            placeholder="ornek@email.com" className="f-input" style={invalid("email")} />
          {fieldErr("email")}
        </div>
        <div>
          <label htmlFor={id("country_city")} className="f-label">{isEn ? "Country / City" : "Ülke / Şehir"}</label>
          <input id={id("country_city")} name="country_city" type="text" autoComplete="address-level2"
            value={form.country_city} onChange={set}
            placeholder={isEn ? "Istanbul, Turkey" : "İstanbul, Türkiye"} className="f-input" />
        </div>
      </div>

      <div>
        <label htmlFor={id("company_name")} className="f-label">{isEn ? "Company" : "Firma"}</label>
        <input id={id("company_name")} name="company_name" type="text" autoComplete="organization"
          value={form.company_name} onChange={set}
          placeholder={isEn ? "Company name (optional)" : "Firma adı (isteğe bağlı)"} className="f-input" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.875rem" }}>
        <div>
          <label htmlFor={id("product_group")} className="f-label">{isEn ? "Product" : "Ürün Grubu"}</label>
          <select id={id("product_group")} name="product_group" value={form.product_group} onChange={set} className="f-input">
            <option value="">{isEn ? "Select…" : "Seçin…"}</option>
            {productGroups.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={id("size")} className="f-label">{isEn ? "Size" : "Ebat"}</label>
          <select id={id("size")} name="size" value={form.size} onChange={set} className="f-input">
            <option value="">{isEn ? "Select…" : "Seçin…"}</option>
            {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={id("quantity")} className="f-label">{isEn ? "Quantity" : "Miktar"}</label>
          <input id={id("quantity")} name="quantity" type="text" value={form.quantity} onChange={set}
            placeholder={isEn ? "e.g. 10 doz" : "ör. 10 düzine"} className="f-input" />
        </div>
      </div>

      <div>
        <label htmlFor={id("message")} className="f-label">{isEn ? "Message" : "Mesaj"}</label>
        <textarea id={id("message")} name="message" rows={4} value={form.message} onChange={set}
          placeholder={isEn ? "Your request details…" : "Talep detaylarınız…"}
          className="f-input" style={{ resize: "vertical" }} />
      </div>

      {/* Honeypot — botlar doldurur, insanlar görmez */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off"
          value={form.website} onChange={set} />
      </div>

      <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6 }}>
        {isEn ? "By submitting, you accept our " : "Formu göndererek "}
        <a href={isEn ? "/en/privacy" : "/kvkk"} style={{ textDecoration: "underline" }}>
          {isEn ? "Privacy Policy" : "KVKK"}
        </a>
        {!isEn && "'yi kabul etmiş olursunuz."}
      </p>

      <button type="submit" disabled={state === "loading"} aria-busy={state === "loading"}
        className="btn btn-navy btn-lg btn-fw" style={{ opacity: state === "loading" ? 0.65 : 1 }}>
        {state === "loading" ? (
          <><svg style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" style={{ opacity: 0.25 }} />
            <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" style={{ opacity: 0.75 }} />
          </svg>{isEn ? "Sending…" : "Gönderiliyor…"}</>
        ) : (
          <><Send size={15} /> {isEn ? "Send Request" : "Teklif Talebi Gönder"}</>
        )}
      </button>
    </form>
  );
}
