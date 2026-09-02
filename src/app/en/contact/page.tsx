import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, ExternalLink, ChevronRight } from "lucide-react";
import { COMPANY, getWhatsAppUrl, SITE_URL } from "@/lib/data";
import QuoteForm from "@/components/sections/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Quote | Gurgen Tekstil Contact",
  description: "Contact Gurgen Tekstil via WhatsApp, phone or quote form for wholesale towels, stock products and custom production requests.",
  alternates: { canonical: `${SITE_URL}/en/contact`, languages: { tr: "/iletisim" } },
};

export default function EnContactPage() {
  return (
    <>
      <section className="page-hero">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.9) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Contact</span>
          </nav>
          <span className="eyebrow">Contact</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Get a Quote &amp; Contact
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.875rem", maxWidth: "50ch", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Contact us quickly for wholesale supply, stock products and custom production requests.
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--warm)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "start" }} className="lg:grid-cols-5">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }} className="lg:col-span-2">
      {/* Updated contact rows with consistent spacing */}
              <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.375rem", background: "var(--navy)", textDecoration: "none", transition: "background 0.2s" }}
                className="hover:bg-[var(--navy-2)]">
                <div style={{ width: 46, height: 46, background: "var(--wa)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageCircle size={22} color="#fff" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.9375rem" }}>Get a WhatsApp Quote</p>
                  <p style={{ fontSize: "0.775rem", color: "rgba(255,255,255,0.38)", marginTop: "0.15rem" }}>{COMPANY.phoneFormatted}</p>
                </div>
              </a>

              <a href={`tel:+90${COMPANY.phone}`} className="contact-row">
                <div className="contact-icon" style={{ background: "var(--cream)" }}>
                  <Phone size={20} color="var(--gold)" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9375rem" }}>Call Us</p>
                  <p style={{ fontSize: "0.775rem", color: "var(--muted)", marginTop: "0.15rem" }}>{COMPANY.phoneFormatted}</p>
                </div>
              </a>

              <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="contact-row">
                <div className="contact-icon" style={{ background: "linear-gradient(135deg,#7c3aed,#ec4899)" }}>
                  <ExternalLink size={20} color="#fff" />
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9375rem" }}>Instagram</p>
                  <p style={{ fontSize: "0.775rem", color: "var(--muted)", marginTop: "0.15rem" }}>{COMPANY.instagramHandle}</p>
                </div>
              </a>

              <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "1rem" }}>Address</p>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <MapPin size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem" }}>Gurgen Tekstil</p>
                    <p style={{ fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.7 }}>{COMPANY.address}</p>
                  </div>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid var(--border)", borderTop: "none", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "1rem" }}>Working Hours</p>
                {[["Mon – Fri", "08:00 – 18:00"], ["Saturday", "08:00 – 13:00"], ["Sunday", "Closed"]].map(([d, h]) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid var(--border)", fontSize: "0.8125rem" }}>
                    <span style={{ color: "var(--muted)" }}>{d}</span>
                    <span style={{ fontWeight: 600, color: h === "Closed" ? "#dc2626" : "var(--navy)" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "2.25rem" }}>
                <span className="eyebrow">Form</span>
                <h2 className="section-title-sm" style={{ marginBottom: "0.625rem" }}>Quote Form</h2>
                <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "2rem", lineHeight: 1.75 }}>
                  Share your product group, size and quantity — we&apos;ll get back to you quickly.
                </p>
                <QuoteForm lang="en" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
