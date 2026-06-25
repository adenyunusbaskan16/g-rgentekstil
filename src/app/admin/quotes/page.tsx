import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createServerClient } from "@/lib/supabase";
import type { QuoteRequest } from "@/types";
import QuotesClient from "./QuotesClient";

export default async function AdminQuotesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = createServerClient();
  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", paddingTop: "calc(56px + 2rem)" }} className="lg:!pt-8">
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)" }}>Teklif Talepleri</h1>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginTop: "0.25rem" }}>
              {(quotes ?? []).length} toplam talep
            </p>
          </div>
          <QuotesClient quotes={(quotes as QuoteRequest[]) ?? []} />
        </div>
      </main>
    </div>
  );
}
