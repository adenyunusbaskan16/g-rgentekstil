import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, MessageSquare, Settings, Plus, ArrowRight } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createServerClient } from "@/lib/supabase";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = createServerClient();
  const [{ count: prodCount }, { count: quoteCount }, { count: newCount }] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("quote_requests").select("id", { count: "exact", head: true }),
    supabase.from("quote_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const stats = [
    { label: "Toplam Ürün",   value: prodCount ?? 0,  icon: Package,      href: "/admin/products", color: "#e0f2fe", ic: "#0284c7" },
    { label: "Teklif Talebi", value: quoteCount ?? 0,  icon: MessageSquare, href: "/admin/quotes",  color: "#f3e8ff", ic: "#9333ea" },
    { label: "Yeni Talep",    value: newCount ?? 0,    icon: MessageSquare, href: "/admin/quotes",  color: "#dcfce7", ic: "#16a34a" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", paddingTop: "calc(56px + 2rem)" }} className="lg:!pt-8">
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)" }}>Dashboard</h1>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: "0.25rem" }}>
              Hoş geldiniz, <strong>{session.username}</strong>
            </p>
          </div>

          {/* İstatistikler */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
            {stats.map((s) => (
              <Link key={s.label} href={s.href}
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.25rem", display: "block", transition: "box-shadow 0.2s, border-color 0.2s", textDecoration: "none" }}
                className="hover:shadow-md hover:border-[var(--gold)]">
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.875rem" }}>
                  <s.icon size={20} color={s.ic} />
                </div>
                <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--navy)", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.25rem" }}>{s.label}</p>
              </Link>
            ))}
          </div>

          {/* Hızlı aksiyonlar */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Hızlı Aksiyonlar</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "0.75rem" }}>
              {[
                { href: "/admin/products/new", icon: Plus,          label: "Yeni Ürün Ekle",      sub: "Ürün kataloğuna ekle",   color: "#e0f2fe", ic: "#0284c7" },
                { href: "/admin/quotes",        icon: MessageSquare, label: "Teklif Talepleri",    sub: `${newCount ?? 0} yeni`,  color: "#f3e8ff", ic: "#9333ea" },
                { href: "/admin/settings",      icon: Settings,      label: "Site Ayarları",       sub: "Bilgileri güncelle",     color: "#dcfce7", ic: "#16a34a" },
              ].map((a) => (
                <Link key={a.href} href={a.href}
                  style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "1rem", border: "1px dashed #e5e7eb", borderRadius: 10, transition: "all 0.18s", textDecoration: "none" }}
                  className="hover:border-[var(--gold)] hover:bg-[var(--warm)]">
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: a.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <a.icon size={18} color={a.ic} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--navy)" }}>{a.label}</p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>{a.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Site linki */}
          <div style={{ background: "var(--navy)", borderRadius: 12, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ fontWeight: 600, color: "#fff", fontSize: "0.9375rem" }}>Siteyi Görüntüle</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.1rem" }}>Canlı siteyi kontrol edin</p>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, fontSize: "0.875rem", fontWeight: 500, transition: "all 0.18s" }}
              className="hover:bg-white/20">
              Siteye Git <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
