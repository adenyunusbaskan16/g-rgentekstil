// =============================================
// GÜRGENTEKSTIL - Ürün veri erişim fonksiyonları
// =============================================

import { createServerClient } from "./supabase";
import type { Product, ProductCategory } from "@/types";

export async function getProducts(activeOnly = true): Promise<Product[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("products")
    .select("*, category:product_categories(*)")
    .order("display_order", { ascending: true });

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getProducts error:", error);
    return [];
  }
  return (data as Product[]) ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:product_categories(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as Product;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:product_categories(*)")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) return [];

  // JOIN üzerinden filtrele
  return ((data as Product[]) ?? []).filter(
    (p) => p.category?.slug === categorySlug
  );
}

export async function getCategories(activeOnly = true): Promise<ProductCategory[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("product_categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (activeOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getCategories error:", error);
    return [];
  }
  return (data as ProductCategory[]) ?? [];
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  const supabase = createServerClient();
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) return {};

  const settings: Record<string, string> = {};
  for (const row of data ?? []) {
    settings[row.key] = row.value ?? "";
  }
  return settings;
}
