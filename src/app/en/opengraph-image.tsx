import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Gurgen Tekstil — Towel Manufacturer in Denizli, Turkey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImageEN() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
          alignItems: "flex-start", justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0a1520 0%, #1a2332 60%, #232e40 100%)",
          padding: "64px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, width: 320, height: 320, background: "radial-gradient(circle, rgba(184,150,90,0.15) 0%, transparent 70%)", borderRadius: "50%", transform: "translate(80px, -80px)" }} />
        <div style={{ width: 60, height: 4, background: "#b8965a", borderRadius: 2, marginBottom: 24 }} />
        <div style={{ fontSize: 18, fontWeight: 700, color: "#b8965a", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>
          Gurgen Tekstil · Towel Manufacturer
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 24, maxWidth: 800 }}>
          Wholesale Towels
          <br />
          from Turkey
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, maxWidth: 680, marginBottom: 48 }}>
          Hand, face, bath &amp; kitchen towels · Ready stock &amp; Custom production
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {["gürgentekstil.com", "Denizli, Turkey", "100% Cotton"].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#b8965a" }} />
              <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
