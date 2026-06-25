import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Production Capacity | Gurgen Tekstil Denizli",
  description: "Gurgen Tekstil serves wholesale and export customers with 1,216 tons annual towel weaving capacity in Denizli.",
  alternates: { canonical: "https://gürgentekstil.com/en/production-capacity", languages: { tr: "/uretim-kapasitesi" } },
};

const steps = [
  { n: "01", t: "Raw Material",     d: "Quality cotton yarn procurement and stock management." },
  { n: "02", t: "Weaving",          d: "Towel fabric production with dobby and jacquard machines." },
  { n: "03", t: "Quality Control",  d: "Inspection throughout production with control equipment." },
  { n: "04", t: "Weighing & Pack",  d: "Weighing and packaging by dozen or bale." },
  { n: "05", t: "Stock & Delivery", d: "Ready stock management and on-time delivery." },
];

export default function ProductionCapacityPage() {
  return (
    <>
      <section className="page-hero">
        <Image src={IMAGES.weaving} alt="" fill style={{ objectFit: "cover", opacity: 0.12 }} quality={30} priority aria-hidden />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Production</span>
          </nav>
          <span className="eyebrow">Infrastructure</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12, maxWidth: "18ch" }}>
            Production Capacity
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.875rem", maxWidth: "50ch", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            1,216 tons annual towel weaving capacity from our facility in Denizli Merkezefendi.
          </p>
        </div>
      </section>

      <section className="stat-strip">
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }} className="sm:grid-cols-4">
            {[
              { v: "450 m²",     l: "Closed Production Area" },
              { v: "600 m²",     l: "Total Facility Area" },
              { v: "1,216 tons", l: "Annual Weaving Cap." },
              { v: "1,253 tons", l: "Cotton Yarn Cap." },
            ].map((s) => (
              <div key={s.l} className="stat-item">
                <p className="stat-val">{s.v}</p>
                <p className="stat-label">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "start" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Facility</span>
              <h2 className="section-title" style={{ marginBottom: "1.125rem" }}>Production Facility</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.75rem" }}>
                <p className="body-text">The production facility operates in Denizli Merkezefendi with 450 m² closed and 600 m² total area.</p>
                <p className="body-text">With an annual capacity of 1,216 tons of towel woven fabric, it meets both ready-stock and custom production requests.</p>
                <p className="body-text">Annual cotton yarn consumption capacity of 1,253 tons ensures continuous production.</p>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {["Dobby and jacquard weaving machines", "Quality control equipment", "Weighing and packaging infrastructure", "Ready stock and custom production"].map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.875rem", color: "var(--muted)" }}>
                    <CheckCircle size={14} color="var(--gold)" style={{ flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ border: "1px solid var(--border)", overflow: "hidden" }}>
              <table className="tbl">
                <thead><tr><th>Component</th><th>Detail</th></tr></thead>
                <tbody>
                  {[
                    ["Machine Type",       "Dobby and jacquard weaving"],
                    ["Machine Origin",     "Imported and domestic next-gen"],
                    ["Production Cap.",    "1,216 tons/year"],
                    ["Raw Material",       "1,253 tons cotton yarn/year"],
                    ["Quality Control",   "Equipment available"],
                    ["Support Equipment", "Weighing, compressor, levend lift"],
                    ["Production Area",   "450 m² closed"],
                  ].map(([l, v]) => (
                    <tr key={l}><td>{l}</td><td style={{ fontWeight: 400 }}>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="eyebrow-center">Process</span>
            <h2 className="section-title">Our Production Process</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: "1px", background: "var(--border)" }}>
            {steps.map((s) => (
              <div key={s.n} style={{ background: "#fff", padding: "1.75rem 1.25rem", textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--navy)", color: "var(--gold)", fontSize: "0.75rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>{s.n}</div>
                <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.4rem", fontSize: "0.875rem" }}>{s.t}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="div-gold" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow-center">Contact</span>
          <h2 className="section-title-light" style={{ marginBottom: "1rem" }}>Let&apos;s Discuss Your Production Request</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "2.25rem", maxWidth: "45ch", margin: "0 auto 2.25rem", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Contact us via WhatsApp or quote form for custom production and wholesale supply.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-xl">
              <MessageCircle size={17} /> Get a WhatsApp Quote
            </a>
            <Link href="/en/machinery" className="btn btn-outline-w btn-xl">
              Machinery <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
