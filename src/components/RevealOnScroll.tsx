"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Sayfa kaydırıldıkça bölüm içeriklerini yumuşakça belirtir.
 * Sadece ekranın altında kalan öğeleri gizler (ilk görünen içerik asla
 * yanıp sönmez); JS yoksa veya "hareketi azalt" açıksa hiçbir şey gizlenmez.
 */
const SELECTOR = [
  "main .sec .wrap > *",
  "main .prod-card",
  "main .cat-card",
  "main .feat-item",
  "main .stat-item",
  "main .hotel-sec",
].join(",");

export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !el.classList.contains("rv") && el.getBoundingClientRect().top > vh * 0.92
    );

    // Aynı satırdaki kartlara hafif kademeli gecikme
    const rowIndex = new Map<number, number>();
    els.forEach((el) => {
      const top = Math.round(el.getBoundingClientRect().top / 40);
      const i = rowIndex.get(top) ?? 0;
      rowIndex.set(top, i + 1);
      el.style.transitionDelay = `${Math.min(i, 4) * 70}ms`;
      el.classList.add("rv");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
