import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100svh",
      background: "linear-gradient(155deg,#07131f 0%,#0b1d35 50%,#122240 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle glow */}
      <div style={{ position: "absolute", top: "30%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle,rgba(200,164,90,0.06) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* 404 büyük metin */}
        <p style={{ fontSize: "clamp(6rem,20vw,10rem)", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1, marginBottom: "-1rem", userSelect: "none" }}>
          404
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ flex: "0 0 2rem", height: 1, background: "rgba(200,164,90,0.4)" }} />
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>
            Sayfa Bulunamadı
          </span>
          <div style={{ flex: "0 0 2rem", height: 1, background: "rgba(200,164,90,0.4)" }} />
        </div>

        <h1 style={{ fontSize: "clamp(1.25rem,3vw,1.875rem)", fontWeight: 700, color: "#fff", marginBottom: "0.875rem", letterSpacing: "-0.015em" }}>
          Bu sayfa mevcut değil
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9375rem", lineHeight: 1.75, maxWidth: "38ch", margin: "0 auto 2.5rem" }}>
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
          Ana sayfaya dönün ya da WhatsApp ile bize ulaşın.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
          <Link href="/" className="btn btn-gold btn-lg">
            <Home size={17} /> Ana Sayfaya Dön
          </Link>
          <a href={getWhatsAppUrl("tr")} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-lg">
            <MessageCircle size={17} /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
