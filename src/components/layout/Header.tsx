"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV_LINKS, LANG_PAIRS, getWhatsAppUrl } from "@/lib/data";

/* ─── Dil bayrağı yerine SVG ikon ─── */
function IconTR({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 14" fill="none" aria-hidden>
      <rect width="20" height="14" rx="2" fill="#E30A17"/>
      <circle cx="8.5" cy="7" r="3" fill="white"/>
      <circle cx="9.5" cy="7" r="2.3" fill="#E30A17"/>
      <path d="M12 5.5l.6 1.8 1.8-.6-1.1 1.5 1.1 1.5-1.8-.6L12 10.5l-.6-1.9-1.8.6 1.1-1.5-1.1-1.5 1.8.6z" fill="white" transform="scale(0.9) translate(1.5,0.5)"/>
    </svg>
  );
}

function IconEN({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 14" fill="none" aria-hidden>
      <rect width="20" height="14" rx="2" fill="#012169"/>
      <path d="M0 0l20 14M20 0L0 14" stroke="white" strokeWidth="3"/>
      <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.5"/>
      <path d="M10 0v14M0 7h20" stroke="white" strokeWidth="4"/>
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.5"/>
    </svg>
  );
}

export default function Header() {
  const [open, setOpen]   = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const isEn  = pathname.startsWith("/en");
  const lang  = isEn ? "en" : "tr";
  const links = NAV_LINKS[lang];
  const alt   = LANG_PAIRS[pathname] ?? (isEn ? "/" : "/en");

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isAct = (h: string) =>
    h === "/" || h === "/en"
      ? pathname === h
      : pathname === h || pathname.startsWith(h + "/");

  return (
    <>
      {/* ─── HEADER BAR ─── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: "var(--hdr)",
          background: solid ? "rgba(10,21,32,0.97)" : "transparent",
          backdropFilter: solid ? "blur(24px)" : "none",
          WebkitBackdropFilter: solid ? "blur(24px)" : "none",
          boxShadow: solid ? "0 1px 0 rgba(184,150,90,0.12)" : "none",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        <div
          className="wrap"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* LOGO */}
          <Link
            href={isEn ? "/en" : "/"}
            onClick={() => setOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
              textDecoration: "none",
            }}
            aria-label="Gürgentekstil — Ana Sayfa"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/logo-dark.svg"
              alt="Gürgentekstil"
              width={160}
              height={36}
              style={{ height: 36, width: "auto", display: "block" }}
            />
          </Link>

          {/* DESKTOP NAV ≥1024px */}
          <nav
            id="desktop-nav"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              gap: "0.125rem",
              visibility: "hidden",
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link${isAct(l.href) ? " active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* DESKTOP SAĞ ≥1024px */}
          <div
            id="desktop-right"
            style={{
              display: "none",
              alignItems: "center",
              gap: "1rem",
              flexShrink: 0,
            }}
          >
            <Link
              href={alt}
              title={isEn ? "Türkçe" : "English"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.35)",
                transition: "color 0.18s",
                textDecoration: "none",
              }}
              className="hover:!text-[var(--gold)]"
            >
              {isEn ? <IconTR size={16} /> : <IconEN size={16} />}
              {isEn ? "TR" : "EN"}
            </Link>
            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
            >
              <MessageCircle size={13} />
              {isEn ? "Get Quote" : "Teklif Al"}
            </a>
          </div>

          {/* MOBİL SAĞ — her zaman görünür */}
          <div
            id="mobile-right"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm"
              style={{ padding: "0.5rem 0.75rem" }}
              aria-label="WhatsApp ile Teklif Al"
            >
              <MessageCircle size={16} />
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              style={{
                color: "#fff",
                background: "none",
                border: "1.5px solid rgba(255,255,255,0.2)",
                borderRadius: 4,
                padding: "0.4rem",
                lineHeight: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.18s",
                width: 36,
                height: 36,
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBİL MENÜ OVERLAY ─── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "var(--navy-4)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          paddingTop: "var(--hdr)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s, visibility 0.25s",
        }}
      >
        {/* Gold divider */}
        <div className="div-gold" />

        <div style={{ flex: 1, paddingBottom: "1.5rem" }}>
          {/* Nav links */}
          <nav>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`mob-nav-link${isAct(l.href) ? " active" : ""}`}
              >
                <span
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    background: isAct(l.href) ? "var(--gold)" : "rgba(255,255,255,0.2)",
                    flexShrink: 0,
                    display: "inline-block",
                  }}
                />
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA butonlar */}
          <div
            style={{
              padding: "2rem 1.5rem 0",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-wa btn-lg btn-fw"
            >
              <MessageCircle size={18} />
              {isEn ? "Get a Quote via WhatsApp" : "WhatsApp ile Teklif Al"}
            </a>
            <Link
              href={alt}
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.625rem",
                padding: "0.875rem",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                textDecoration: "none",
                transition: "color 0.18s, border-color 0.18s",
              }}
            >
              {isEn ? <IconTR size={16} /> : <IconEN size={16} />}
              {isEn ? "Türkçe" : "English"}
            </Link>
          </div>
        </div>

        {/* Alt bilgi */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.15)" }}>
            &copy; {new Date().getFullYear()} GürgenTekstil &middot; Denizli, Türkiye
          </p>
        </div>
      </div>
    </>
  );
}
