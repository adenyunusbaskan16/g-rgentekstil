import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import { getWhatsAppUrl, SITE_URL } from "@/lib/data";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Machinery | Dobby and Jacquard Towel Weaving",
  description: "Gurgen Tekstil evaluates towel production requests with dobby and jacquard, imported and domestic next-generation weaving machines.",
  alternates: { canonical: `${SITE_URL}/en/machinery`, languages: { tr: "/makine-parkuru" } },
};

const machines = [
  { n: "01", t: "Dobby Weaving Machines", d: "High-speed machines for plain and small-patterned towel production. Offers various weight options.", specs: ["High production speed", "Various weight options", "Wide product range"] },
  { n: "02", t: "Jacquard Weaving Machines", d: "Ideal infrastructure for complex pattern towel fabrics. Perfect for brand and custom production.", specs: ["Custom pattern capacity", "Brand production compatible", "High pattern resolution"] },
  { n: "03", t: "Auxiliary Equipment", d: "Weighing, compressor and levend lifting systems for full integration and quality control.", specs: ["Weighing & quality control", "Compressor system", "Levend lifting infrastructure"] },
];

export default function MachineryPage() {
  return (
    <>
      <section className="page-hero">
        <Image src={IMAGES.factory} alt="" fill style={{ objectFit: "cover", opacity: 0.12 }} quality={30} priority aria-hidden />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Machinery</span>
          </nav>
          <span className="eyebrow">Technical Infrastructure</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12, maxWidth: "20ch" }}>
            Machinery &amp; Weaving Infrastructure
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.875rem", maxWidth: "50ch", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Dobby and jacquard, imported and domestic next-generation weaving machines.
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ maxWidth: 680, marginBottom: "3rem" }}>
            <span className="eyebrow">Infrastructure</span>
            <h2 className="section-title" style={{ marginBottom: "1rem" }}>Our Production Infrastructure</h2>
            <p className="body-text">Gurgen Tekstil uses dobby and jacquard, imported and domestic next-generation weaving machines. This infrastructure provides production flexibility across different towel categories and supports both ready-stock and custom production requests.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem" }}>
            {machines.map((m) => (
              <div key={m.n} style={{ background: "#fff", border: "1px solid var(--border)", padding: "2rem 1.75rem", transition: "border-color 0.22s, box-shadow 0.22s" }} className="hover:border-[var(--gold)] hover:shadow-lg">
                <div style={{ width: 44, height: 44, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)" }}>{m.n}</span>
                </div>
                <h3 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.625rem", fontSize: "1rem" }}>{m.t}</h3>
                <p className="body-sm" style={{ marginBottom: "1.125rem" }}>{m.d}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {m.specs.map((s) => (
                    <li key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                      <CheckCircle size={13} color="var(--gold)" style={{ flexShrink: 0 }} /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Technical Data</span>
              <h2 className="section-title" style={{ marginBottom: "1rem" }}>Infrastructure Summary</h2>
              <div style={{ background: "#fff", borderLeft: "3px solid var(--gold)", padding: "1rem 1.25rem", fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.75 }}>
                <strong style={{ color: "var(--navy)", display: "block", marginBottom: "0.2rem" }}>About Machine Brands</strong>
                Machine brands used in our production infrastructure are not shared for commercial reasons. Technical details available upon request.
              </div>
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
                  ].map(([l, v]) => <tr key={l}><td>{l}</td><td style={{ fontWeight: 400 }}>{v}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="div-gold" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow-center">Production</span>
          <h2 className="section-title-light" style={{ marginBottom: "1rem" }}>Custom Production Requests</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "2.25rem", maxWidth: "45ch", margin: "0 auto 2.25rem", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Start a technical discussion for custom pattern, size or weight requests.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-xl">
              <MessageCircle size={17} /> Contact via WhatsApp
            </a>
            <Link href="/en/production-capacity" className="btn btn-outline-w btn-xl">
              Production Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
