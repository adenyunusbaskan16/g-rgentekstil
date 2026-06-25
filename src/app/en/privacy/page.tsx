import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy | Gurgen Tekstil",
  description: "Gurgen Tekstil privacy policy and personal data protection.",
  alternates: { canonical: "https://gürgentekstil.com/en/privacy", languages: { tr: "/kvkk" } },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-hero">
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg,rgba(8,15,26,0.98) 0%,rgba(8,15,26,0.92) 100%)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <nav className="breadcrumb">
            <Link href="/en">Home</Link>
            <ChevronRight size={11} />
            <span className="breadcrumb-current">Privacy</span>
          </nav>
          <span className="eyebrow">Legal</span>
          <h1 style={{ fontSize: "clamp(1.75rem,4vw,2.5rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.12 }}>
            Privacy Policy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.38)", marginTop: "0.625rem", fontSize: "0.875rem" }}>
            Last updated: June 2025
          </p>
        </div>
      </section>

      <section className="sec" style={{ background: "#fff" }}>
        <div className="wrap">
          <div style={{ maxWidth: 760 }}>
            {[
              { t: "1. Data Controller", c: `This website is operated by Gurgen Tekstil. Address: ${COMPANY.address}. For questions, contact us at ${COMPANY.phoneFormatted} or via WhatsApp.` },
              { t: "2. Data Collected", c: "Only the following information is collected voluntarily through the quote form: full name/company name, phone number, email address (optional), country/city and request details. IP address may be logged server-side." },
              { t: "3. Purpose of Processing", c: "Collected data is used only to respond to your quote request, conduct commercial discussions and evaluate custom production requests. Data is not shared with third parties, sold or used for advertising." },
              { t: "4. Legal Basis", c: "Personal data is processed based on legitimate interest and contract performance under applicable data protection laws." },
              { t: "5. Data Retention", c: "Quote request forms and contact information are retained during the commercial relationship and as required by law. Data can be deleted upon request." },
              { t: "6. Your Rights", c: "You have the right to access, correct, delete or restrict the processing of your personal data. Contact us via WhatsApp or phone to exercise these rights." },
              { t: "7. Cookies", c: "This site may use session cookies required for basic functionality. No third-party advertising or tracking cookies are used." },
              { t: "8. Contact", c: `For privacy-related requests, contact us via WhatsApp (${COMPANY.phoneFormatted}) or phone.` },
            ].map((sec) => (
              <div key={sec.t} style={{ marginBottom: "1.75rem", paddingBottom: "1.75rem", borderBottom: "1px solid var(--border)" }}>
                <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "var(--navy)", marginBottom: "0.625rem" }}>{sec.t}</h2>
                <p style={{ fontSize: "0.9375rem", color: "var(--muted)", lineHeight: 1.8 }}>{sec.c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
