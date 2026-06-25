// =============================================
// GÜRGENTEKSTIL - Global Tip Tanımları
// =============================================

export type Language = "tr" | "en";

// --- Ürün Kategorisi ---
export interface ProductCategory {
  id: string;
  slug: string;
  name_tr: string;
  name_en: string;
  description_tr?: string;
  description_en?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// --- Ürün ---
export interface Product {
  id: string;
  category_id?: string;
  slug: string;
  name_tr: string;
  name_en: string;
  description_tr?: string;
  description_en?: string;
  size?: string;
  weight_grams?: number;
  weight_label?: string;
  color_options: string[];
  image_url?: string;
  image_alt_tr?: string;
  image_alt_en?: string;
  sale_unit?: string;
  is_stock_available: boolean;
  is_custom_order: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // JOIN
  category?: ProductCategory;
}

// --- Site Ayarı ---
export interface SiteSetting {
  key: string;
  value: string;
  label: string;
  group_name: string;
  updated_at: string;
}

// Site ayarları düz obje olarak
export type SiteSettings = Record<string, string>;

// --- Teklif Formu ---
export interface QuoteRequest {
  id?: string;
  full_name: string;
  company_name?: string;
  phone: string;
  email?: string;
  country_city?: string;
  product_group?: string;
  size?: string;
  quantity?: string;
  message?: string;
  status?: "new" | "read" | "replied";
  ip_address?: string;
  created_at?: string;
}

// --- Admin ---
export interface AdminUser {
  id: string;
  username: string;
  is_active: boolean;
  last_login?: string;
  created_at: string;
}

// --- Admin session (JWT payload) ---
export interface AdminSession {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

// --- Ürün form state ---
export interface ProductFormData {
  category_id: string;
  slug: string;
  name_tr: string;
  name_en: string;
  description_tr: string;
  description_en: string;
  size: string;
  weight_grams: string;
  weight_label: string;
  color_options: string; // virgülle ayrılmış string
  image_url: string;
  image_alt_tr: string;
  image_alt_en: string;
  sale_unit: string;
  is_stock_available: boolean;
  is_custom_order: boolean;
  display_order: string;
  is_active: boolean;
}

// --- API Response ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
