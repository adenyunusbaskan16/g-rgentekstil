"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100svh",
        background: "linear-gradient(155deg,#0e0e10 0%,#18181b 50%,#27272a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div role="alert" style={{ textAlign: "center", maxWidth: 480 }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
          Beklenmedik Hata
        </p>
        <h1 style={{ fontSize: "clamp(1.375rem,3vw,1.875rem)", fontWeight: 700, color: "#fff", marginBottom: "0.875rem", letterSpacing: "-0.015em" }}>
          Bir şeyler ters gitti
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9375rem", lineHeight: 1.75, marginBottom: "2.25rem" }}>
          Sayfa yüklenirken bir sorun oluştu. Tekrar deneyebilir veya doğrudan WhatsApp
          üzerinden bize ulaşabilirsiniz.
          <br />
          <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)" }}>
            Something went wrong. Please try again or contact us on WhatsApp.
          </span>
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <button onClick={reset} className="btn btn-gold btn-lg">
            <RefreshCw size={16} /> Tekrar Dene
          </button>
          <Link href="/" className="btn btn-outline-w btn-lg">
            <Home size={16} /> Ana Sayfa
          </Link>
          <a href={getWhatsAppUrl("tr")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
