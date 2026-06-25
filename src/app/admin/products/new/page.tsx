import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { createServerClient } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductForm from "@/components/admin/ProductForm";
import type { ProductCategory } from "@/types";

export default async function NewProductPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = createServerClient();
  const { data: categories } = await supabase
    .from("product_categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", overflowX: "hidden" }}>
      <AdminSidebar />
      <main className="adm-main" style={{ flex: 1, minWidth: 0 }}>
        <div className="adm-content-sm">

          <div style={{ marginBottom: "1.5rem" }}>
            <Link
              href="/admin/products"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", fontWeight: 600, color: "#6b7280", textDecoration: "none", marginBottom: "0.75rem" }}
            >
              <ChevronLeft size={15} /> Ürünler
            </Link>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: 0 }}>Yeni Ürün Ekle</h1>
            <p style={{ fontSize: "0.8125rem", color: "#6b7280", marginTop: "0.25rem" }}>
              Bilgileri doldurun ve kaydedin.
            </p>
          </div>

          <ProductForm
            categories={(categories ?? []) as ProductCategory[]}
            isEdit={false}
          />
        </div>
      </main>
    </div>
  );
}
