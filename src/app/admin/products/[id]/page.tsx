import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import { createServerClient } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductForm from "@/components/admin/ProductForm";
import type { Product, ProductCategory } from "@/types";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  const supabase = createServerClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, category:product_categories(*)")
      .eq("id", id)
      .single(),
    supabase
      .from("product_categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
  ]);

  if (!product) notFound();

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
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: 0 }}>
              Ürünü Düzenle
            </h1>
            <p style={{ fontSize: "0.8125rem", color: "#6b7280", marginTop: "0.25rem" }}>
              {(product as Product).name_tr}
            </p>
          </div>

          <ProductForm
            product={product as Product}
            categories={(categories ?? []) as ProductCategory[]}
            isEdit={true}
          />
        </div>
      </main>
    </div>
  );
}
