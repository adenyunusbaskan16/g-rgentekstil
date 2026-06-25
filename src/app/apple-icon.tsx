import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0a1520",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          position: "relative",
        }}
      >
        {/* Üst gold bant */}
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 30,
            right: 30,
            height: 2,
            background: "rgba(184,150,90,0.5)",
            borderRadius: 1,
          }}
        />

        {/* Sol dikey gold aksan */}
        <div
          style={{
            position: "absolute",
            left: 28,
            top: 40,
            width: 4,
            height: 100,
            background: "#b8965a",
            borderRadius: 2,
          }}
        />

        {/* G harfi */}
        <div
          style={{
            color: "#b8965a",
            fontSize: 90,
            fontWeight: 900,
            fontFamily: "Georgia, 'Times New Roman', serif",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginLeft: 8,
          }}
        >
          G
        </div>

        {/* Alt firma adı */}
        <div
          style={{
            color: "rgba(184,150,90,0.5)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginTop: 4,
            marginLeft: 8,
          }}
        >
          TEKSTİL
        </div>

        {/* Alt gold bant */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            right: 30,
            height: 2,
            background: "rgba(184,150,90,0.5)",
            borderRadius: 1,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
