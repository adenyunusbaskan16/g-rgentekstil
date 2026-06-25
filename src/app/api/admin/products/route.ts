import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAdminSession } from "@/lib/auth";

// GET: Tüm ürünleri listele (admin - aktif/pasif hepsi)
export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, category:product_categories(*)")
    .order("display_order", { ascending: true });

  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}

// POST: Yeni ürün ekle
export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    // Renk seçenekleri string ise array'e çevir
    let colorOptions: string[] = [];
    if (typeof body.color_options === "string") {
      colorOptions = body.color_options
        .split(",")
        .map((c: string) => c.trim())
        .filter(Boolean);
    } else if (Array.isArray(body.color_options)) {
      colorOptions = body.color_options;
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("products")
      .insert({
        category_id: body.category_id || null,
        slug: body.slug,
        name_tr: body.name_tr,
        name_en: body.name_en,
        description_tr: body.description_tr || null,
        description_en: body.description_en || null,
        size: body.size || null,
        weight_grams: body.weight_grams ? parseInt(body.weight_grams) : null,
        weight_label: body.weight_label || null,
        color_options: colorOptions,
        image_url: body.image_url || null,
        image_alt_tr: body.image_alt_tr || null,
        image_alt_en: body.image_alt_en || null,
        sale_unit: body.sale_unit || null,
        is_stock_available: body.is_stock_available ?? true,
        is_custom_order: body.is_custom_order ?? false,
        display_order: parseInt(body.display_order ?? "0"),
        is_active: body.is_active ?? true,
      })
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
  }
}
