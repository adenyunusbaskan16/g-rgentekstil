"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * Ürün fotoğrafı — tıklanınca (mobil ve masaüstünde) tam ekran büyüteç
 * açar. Harici bir lightbox kütüphanesi kullanılmaz; site genelindeki
 * Header mobil menüsüyle aynı desen (state + body scroll kilidi).
 */
export default function ZoomableImage({
  src,
  alt,
  sizes = "(max-width:1024px)50vw,25vw",
  quality = 85,
}: {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          padding: 0,
          border: "none",
          background: "none",
          cursor: "zoom-in",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "contain", padding: "0.5rem" }}
          sizes={sizes}
          quality={quality}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(8,15,26,0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.25rem",
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Kapat"
            style={{
              position: "fixed",
              top: "1rem",
              right: "1rem",
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
          <div
            style={{ position: "relative", width: "min(92vw, 900px)", height: "min(86vh, 1100px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} sizes="92vw" quality={95} />
          </div>
        </div>
      )}
    </>
  );
}
