"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sessiz, döngüsel fabrika videosu.
 * - Ekran yönüne göre yatay (16:9) veya dikey (9:16) kaynak seçer.
 * - Görünür alana girene kadar video indirilmez (poster gösterilir).
 * - "Hareketi azalt" tercihi açıksa oynatılmaz, sadece poster kalır.
 */
export default function FactoryVideo({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [portrait, setPortrait] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px) and (orientation: portrait)");
    const update = () => setPortrait(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSrc(portrait ? "/videos/fabrika-9x16.mp4" : "/videos/fabrika-16x9.mp4");
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [portrait]);

  return (
    <video
      ref={ref}
      key={portrait ? "v" : "h"}
      src={src ?? undefined}
      poster={portrait ? "/videos/fabrika-9x16-poster.jpg" : "/videos/fabrika-16x9-poster.jpg"}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-label={label}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
