import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0a1520",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          position: "relative",
        }}
      >
        {/* Sol gold aksan çizgisi */}
        <div
          style={{
            position: "absolute",
            left: 4,
            top: 7,
            width: 2,
            height: 18,
            background: "#b8965a",
            borderRadius: 1,
          }}
        />
        {/* G harfi */}
        <div
          style={{
            color: "#b8965a",
            fontSize: 19,
            fontWeight: 900,
            fontFamily: "Georgia, 'Times New Roman', serif",
            lineHeight: 1,
            marginLeft: 5,
            letterSpacing: "-0.02em",
          }}
        >
          G
        </div>
      </div>
    ),
    { ...size }
  );
}
