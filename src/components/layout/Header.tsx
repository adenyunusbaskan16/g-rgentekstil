"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, LANG_PAIRS, COMPANY, getWhatsAppUrl } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const lang = isEn ? "en" : "tr";
  const links = NAV_LINKS[lang];
  const alt = LANG_PAIRS[pathname] ?? (isEn ? "/" : "/en");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Menü açıkken sayfa kaymasın; Esc ile kapansın; sayfa değişince kapansın
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  // Sayfa değişince menüyü kapat (render sırasında, efekt olmadan)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isAct = (h: string) =>
    h === "/" || h === "/en" ? pathname === h : pathname === h || pathname.startsWith(h + "/");

  return (
    <>
      <header className={`site-hdr${scrolled || open ? " is-scrolled" : ""}`}>
        <div className="wrap hdr-wrap site-hdr-inner">
          <Link href={isEn ? "/en" : "/"} className="site-logo" aria-label={isEn ? "Gürgen Tekstil — Home" : "Gürgen Tekstil — Ana Sayfa"}>
            <Image
              src="/brand/logo-horizontal.png"
              alt="Gürgen Tekstil"
              width={492}
              height={140}
              priority
              sizes="200px"
              style={{ height: "100%", width: "auto" }}
            />
          </Link>

          <div className="hdr-actions">
            <Link href={alt} className="hdr-lang" title={isEn ? "Türkçe" : "English"}>
              {isEn ? "TR" : "EN"}
            </Link>
            <a href={getWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm hdr-cta">
              <MessageCircle size={14} />
              <span className="hdr-cta-text">{isEn ? "Get Quote" : "Teklif Al"}</span>
            </a>
            <button
              type="button"
              className={`burger${open ? " is-open" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? (isEn ? "Close menu" : "Menüyü kapat") : isEn ? "Open menu" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Tam ekran menü ── */}
      <div id="site-menu" className={`menu-overlay${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="wrap menu-grid">
          <nav aria-label={isEn ? "Main menu" : "Ana menü"}>
            <ol className="menu-list">
              {links.map((l, i) => (
                <li key={l.href} style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}>
                  <Link
                    href={l.href}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={`menu-link${isAct(l.href) ? " active" : ""}`}
                  >
                    <span className="menu-num">{String(i + 1).padStart(2, "0")}</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <aside className="menu-side" style={{ transitionDelay: open ? "320ms" : "0ms" }}>
            <p className="menu-eyebrow">{isEn ? "Get in touch" : "İletişim"}</p>
            <a href={getWhatsAppUrl(lang)} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-wa btn-lg btn-fw">
              <MessageCircle size={18} /> {isEn ? "Quote via WhatsApp" : "WhatsApp ile Teklif Al"}
            </a>
            <a href={`tel:+90${COMPANY.phone}`} tabIndex={open ? 0 : -1} className="menu-contact">
              <Phone size={15} /> {COMPANY.phoneFormatted}
            </a>
            <p className="menu-address">{COMPANY.address}</p>
            <Link href={alt} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="menu-contact">
              {isEn ? "Türkçe" : "English"} <ArrowUpRight size={14} />
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
