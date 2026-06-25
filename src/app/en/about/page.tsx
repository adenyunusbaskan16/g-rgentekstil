import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, CheckCircle, ChevronRight } from "lucide-react";
import { COMPANY, getWhatsAppUrl } from "@/lib/data";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us | Gurgen Tekstil Towel Manufacturer Denizli",
  description: "Gurgen Tekstil is a towel manufacturer based in Denizli Merkezefendi serving wholesale, brand and export customers.",
  alternates: { canonical: "https://gürgentekstil.com/en/about", languages: { tr: "/kurumsal" } },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <Image src={IMAGES.towelStack} alt="" fill style={{ objectFit: "cover", opacity: 0.1 }} quality={30} priority aria-hidden />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.97) 0%,rgba(8,15,26,0.82) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">About</span>
          </nav>
          <span className="eyebrow">About</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12, maxWidth: "18ch" }}>
            About Gurgen Tekstil
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginTop: "0.875rem", maxWidth: "50ch", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            A towel manufacturer in Denizli serving wholesalers, brands and export buyers.
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4rem", alignItems: "start" }} className="lg:grid-cols-2">
            <div>
              <span className="eyebrow">Who We Are</span>
              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>Towel Manufacturing & Wholesale Supply in Denizli</h2>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                <strong style={{ color: "var(--navy)" }}>Gurgen Tekstil</strong> is a corporate textile manufacturer producing hand towels, face towels, foot towels, kitchen hand towels and bath towels in a 450 m² closed production area in Denizli Merkezefendi.
              </p>
              <p className="body-text" style={{ marginBottom: "1rem" }}>
                With dobby and jacquard, imported and domestic next-generation weaving machines, the company has an annual production capacity of 1,216 tons of towel woven fabric.
              </p>
              <p className="body-text" style={{ marginBottom: "1.75rem" }}>
                Ready-stock products are offered to wholesalers and stores by bale and dozen. Custom production requests are evaluated on a per-order basis.
              </p>
              <div style={{ background: "var(--cream)", borderLeft: "3px solid var(--gold)", padding: "1rem 1.25rem", marginBottom: "2rem", fontSize: "0.8125rem", color: "var(--muted)", lineHeight: 1.75 }}>
                <strong style={{ color: "var(--navy)", display: "block", marginBottom: "0.2rem" }}>Sales Model</strong>
                Flexible purchasing for ready-stock products; custom orders evaluated per request. This site does not display prices — quotes are handled via WhatsApp and phone.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
                <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                  <MessageCircle size={16} /> Get a WhatsApp Quote
                </a>
                <Link href="/en/contact" className="btn btn-outline">Quote Form <ArrowRight size={15} /></Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "var(--navy)", padding: "1.75rem", position: "relative", overflow: "hidden" }}>
                <Image src={IMAGES.weaving} alt="" fill style={{ objectFit: "cover", opacity: 0.07 }} quality={30} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "1.25rem" }}>Company Info</p>
                  <dl style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                    {[
                      { l: "Company",  v: "Gurgen Tekstil" },
                      { l: "Sector",   v: "Towel Mfr. & Wholesale" },
                      { l: "Location", v: "Merkezefendi / Denizli" },
                      { l: "Phone",    v: COMPANY.phoneFormatted },
                    ].map((item) => (
                      <div key={item.l} style={{ display: "flex", gap: "0.875rem" }}>
                        <dt style={{ width: "5rem", flexShrink: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.32)" }}>{item.l}</dt>
                        <dd style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.78)" }}>{item.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid var(--border)", padding: "1.75rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "1.25rem" }}>Who We Serve</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {["Stores looking to buy wholesale towels", "Companies producing towels under their brand", "Export textile intermediaries", "Hotels, spas and corporate buyers", "International towel manufacturer seekers"].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.8375rem", color: "var(--muted)" }}>
                      <CheckCircle size={14} color="var(--gold)" style={{ flexShrink: 0 }} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--cream)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="lg:grid-cols-3">
            {[
              { img: IMAGES.factory,    t: "Production Facility",  d: "450 m² closed production area in Denizli Merkezefendi" },
              { img: IMAGES.weaving,    t: "Weaving Infrastructure", d: "Dobby and jacquard, imported and domestic next-gen machines" },
              { img: IMAGES.towelStack, t: "Ready Stock",          d: "Hand, face, foot, kitchen and bath towel groups" },
            ].map((item) => (
              <div key={item.t} style={{ overflow: "hidden", background: "#fff", border: "1px solid var(--border)" }}>
                <div style={{ position: "relative", paddingBottom: "62%", overflow: "hidden" }}>
                  <Image src={item.img} alt={item.t} fill style={{ objectFit: "cover", transition: "transform 0.5s" }} sizes="(max-width:1024px)100vw,33vw" quality={75} className="hover:scale-105" />
                </div>
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem", fontSize: "0.9rem" }}>{item.t}</p>
                  <p className="body-sm">{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
        <div className="div-gold" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="eyebrow-center">Contact</span>
          <h2 className="section-title-light" style={{ marginBottom: "1rem" }}>Start a Discussion</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "2.25rem", maxWidth: "45ch", margin: "0 auto 2.25rem", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            Contact us via WhatsApp or quote form for quotes and orders.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            <a href={getWhatsAppUrl("en")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-xl">
              <MessageCircle size={17} /> Get a WhatsApp Quote
            </a>
            <Link href="/en/contact" className="btn btn-outline-w btn-xl">Quote Form <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
