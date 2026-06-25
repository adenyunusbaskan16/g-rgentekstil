"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";

type FormState = "idle" | "loading" | "success" | "error";

export default function QuoteForm({ lang = "tr" }: { lang?: "tr" | "en" }) {
  const isEn = lang === "en";
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    full_name: "", company_name: "", phone: "", email: "",
    country_city: "", product_group: "", size: "", quantity: "", message: "",
  });

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading"); setError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setState("success");
        setForm({ full_name: "", company_name: "", phone: "", email: "", country_city: "", product_group: "", size: "", quantity: "", message: "" });
      } else throw new Error(data.error ?? "Hata");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    }
  }

  const productGroups = isEn
    ? ["Hand Towels", "Face Towels", "Foot Towels", "Bath Towels", "Kitchen Towels", "Wholesale Bale", "Custom Order"]
    : ["El Havluları", "Yüz Havluları", "Ayak Havluları", "Banyo Havluları", "Mutfak El Havluları", "Toptan Çuval", "Özel Üretim"];

  const sizes = ["30x50 cm", "40x80 cm", "50x70 cm", "50x90 cm", "90x150 cm", isEn ? "Other" : "Diğer"];

  if (state === "success") return (
    <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "2.5rem", textAlign: "center" }}>
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
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {state === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", fontSize: "0.875rem", color: "#dc2626" }}>
          <AlertCircle size={15} style={{ flexShrink: 0 }} />
          {error || (isEn ? "An error occurred." : "Bir hata oluştu.")}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem" }}>
        <div>
          <label className="f-label">{isEn ? "Name *" : "Ad Soyad *"}</label>
          <input name="full_name" type="text" required value={form.full_name} onChange={set}
            placeholder={isEn ? "Your name" : "Adınız"} className="f-input" />
        </div>
        <div>
          <label className="f-label">{isEn ? "Phone *" : "Telefon *"}</label>
          <input name="phone" type="tel" required value={form.phone} onChange={set}
            placeholder="0532 xxx xx xx" className="f-input" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.875rem" }}>
        <div>
          <label className="f-label">{isEn ? "Email" : "E-posta"}</label>
          <input name="email" type="email" value={form.email} onChange={set}
            placeholder="ornek@email.com" className="f-input" />
        </div>
        <div>
          <label className="f-label">{isEn ? "Country / City" : "Ülke / Şehir"}</label>
          <input name="country_city" type="text" value={form.country_city} onChange={set}
            placeholder={isEn ? "Istanbul, Turkey" : "İstanbul, Türkiye"} className="f-input" />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.875rem" }}>
        <div>
          <label className="f-label">{isEn ? "Product" : "Ürün Grubu"}</label>
          <select name="product_group" value={form.product_group} onChange={set} className="f-input">
            <option value="">{isEn ? "Select…" : "Seçin…"}</option>
            {productGroups.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="f-label">{isEn ? "Size" : "Ebat"}</label>
          <select name="size" value={form.size} onChange={set} className="f-input">
            <option value="">{isEn ? "Select…" : "Seçin…"}</option>
            {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="f-label">{isEn ? "Quantity" : "Miktar"}</label>
          <input name="quantity" type="text" value={form.quantity} onChange={set}
            placeholder={isEn ? "e.g. 10 doz" : "ör. 10 düzine"} className="f-input" />
        </div>
      </div>

      <div>
        <label className="f-label">{isEn ? "Message" : "Mesaj"}</label>
        <textarea name="message" rows={4} value={form.message} onChange={set}
          placeholder={isEn ? "Your request details…" : "Talep detaylarınız…"}
          className="f-input" style={{ resize: "none" }} />
      </div>

      <p style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: 1.6 }}>
        {isEn ? "By submitting, you accept our " : "Formu göndererek "}
        <a href={isEn ? "/en/privacy" : "/kvkk"} style={{ textDecoration: "underline" }}>
          {isEn ? "Privacy Policy" : "KVKK"}
        </a>
        {!isEn && "'yi kabul etmiş olursunuz."}
      </p>

      <button type="submit" disabled={state === "loading"}
        className="btn btn-navy btn-lg btn-fw" style={{ opacity: state === "loading" ? 0.65 : 1 }}>
        {state === "loading" ? (
          <><svg style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
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
