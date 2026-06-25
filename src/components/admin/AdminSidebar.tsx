"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, Settings, MessageSquare, LogOut, Menu, X, ExternalLink } from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard",        icon: LayoutDashboard },
  { href: "/admin/products",  label: "Ürünler",          icon: Package },
  { href: "/admin/quotes",    label: "Teklif Talepleri", icon: MessageSquare },
  { href: "/admin/settings",  label: "Site Ayarları",    icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const SidebarBody = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "1.5rem 1.25rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.9375rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>GürgenTekstil</p>
        <p style={{ fontSize: "0.65rem", color: "rgba(200,164,90,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>Yönetim Paneli</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "1rem 0.625rem", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
            className={`adm-link${isActive(item.href) ? " active" : ""}`}>
            <item.icon size={17} />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Alt */}
      <div style={{ padding: "0.75rem 0.625rem", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        <a href="/" target="_blank" rel="noopener noreferrer" className="adm-link">
          <ExternalLink size={16} /> Siteyi Görüntüle
        </a>
        <button onClick={logout} className="adm-link" style={{ border: "none", background: "none", width: "100%", textAlign: "left", color: "#f87171", cursor: "pointer" }}>
          <LogOut size={16} /> Çıkış Yap
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="adm-sidebar hidden lg:flex flex-col" style={{ position: "sticky", top: 0, maxHeight: "100vh", overflowY: "auto" }}>
        <SidebarBody />
      </aside>

      {/* Mobile topbar */}
      <div className="lg:hidden" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 56, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div>
          <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.875rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>GürgenTekstil</p>
          <p style={{ fontSize: "0.55rem", color: "rgba(200,164,90,0.5)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Admin</p>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: "#fff", background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 49, display: "flex" }}>
          <div style={{ width: 240, background: "var(--navy)", overflowY: "auto", paddingTop: 56 }}>
            <SidebarBody />
          </div>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)" }} onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}
