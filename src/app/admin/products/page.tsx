import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Package, Pencil, Eye, EyeOff, CheckCircle } from "lucide-react";
import { getAdminSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createServerClient } from "@/lib/supabase";
import type { Product } from "@/types";

export default async function AdminProductsPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const supabase = createServerClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, category:product_categories(name_tr)")
    .order("display_order", { ascending: true });

  const list = (products ?? []) as Product[];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", overflowX: "hidden" }}>
      <AdminSidebar />
      <main className="adm-main" style={{ flex: 1, minWidth: 0 }}>
        <div className="adm-content">

          {/* Başlık */}
          <div className="adm-page-header">
            <div>
              <h1 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: 0 }}>Ürünler</h1>
              <p style={{ fontSize: "0.8125rem", color: "#6b7280", marginTop: "0.25rem" }}>
                {list.length} ürün kayıtlı
              </p>
            </div>
            <Link href="/admin/products/new" className="adm-btn adm-btn-primary">
              <Plus size={16} /> Yeni Ürün
            </Link>
          </div>

          {list.length === 0 ? (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "4rem 1.5rem", textAlign: "center" }}>
              <div style={{ width: 56, height: 56, background: "#f3f4f6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Package size={24} color="#9ca3af" strokeWidth={1.5} />
              </div>
              <p style={{ fontWeight: 700, color: "#111827", marginBottom: "0.375rem" }}>Henüz ürün yok</p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
                İlk ürününüzü ekleyerek başlayın.
              </p>
              <Link href="/admin/products/new" className="adm-btn adm-btn-primary">
                <Plus size={16} /> İlk Ürünü Ekle
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {list.map((p) => {
                const cat = p.category as { name_tr?: string } | undefined;
                return (
                  <Link key={p.id} href={`/admin/products/${p.id}`} className="adm-product-item">
                    {/* Görsel */}
                    <div className="adm-product-thumb">
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name_tr} />
                        : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Package size={18} color="#9ca3af" />
                          </div>
                        )
                      }
                    </div>

                    {/* Bilgiler */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem" }}>
                        <p style={{
                          fontWeight: 700, color: "#111827", fontSize: "0.9rem",
                          lineHeight: 1.3, overflow: "hidden",
                          textOverflow: "ellipsis", whiteSpace: "nowrap",
                          flex: 1, minWidth: 0,
                        }}>
                          {p.name_tr}
                        </p>
                        <span className={`adm-badge ${p.is_active ? "adm-badge-green" : "adm-badge-gray"}`} style={{ flexShrink: 0 }}>
                          {p.is_active ? <Eye size={9} /> : <EyeOff size={9} />}
                          {p.is_active ? "Aktif" : "Pasif"}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
                        {cat?.name_tr && (
                          <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{cat.name_tr}</span>
                        )}
                        {p.size && (
                          <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{p.size}</span>
                        )}
                        {p.is_stock_available && (
                          <span style={{ fontSize: "0.7rem", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.2rem" }}>
                            <CheckCircle size={10} /> Stokta
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Düzenle ikonu */}
                    <div style={{ flexShrink: 0, width: 32, height: 32, background: "#f3f4f6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Pencil size={14} color="#374151" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
