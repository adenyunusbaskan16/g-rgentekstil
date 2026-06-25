import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createServerClient } from "@/lib/supabase";
import SettingsClient from "./SettingsClient";
import type { SiteSetting } from "@/types";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = createServerClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .order("group_name");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", paddingTop: "calc(56px + 2rem)" }} className="lg:!pt-8">
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)" }}>Site Ayarları</h1>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: "0.25rem" }}>
              İletişim bilgileri, SEO ve site metinlerini düzenleyin
            </p>
          </div>
          <SettingsClient settings={(settings as SiteSetting[]) ?? []} />
        </div>
      </main>
    </div>
  );
}
