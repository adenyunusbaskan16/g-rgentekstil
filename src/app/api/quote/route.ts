import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import type { QuoteRequest } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as QuoteRequest;

    // Zorunlu alanlar
    if (!body.full_name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { success: false, error: "Ad soyad ve telefon zorunludur." },
        { status: 400 }
      );
    }

    // Basit spam koruması: telefon formatı kontrolü
    const phoneDigits = body.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      return NextResponse.json(
        { success: false, error: "Geçerli bir telefon numarası girin." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    const supabase = createServerClient();
    const { error } = await supabase.from("quote_requests").insert({
      full_name: body.full_name.trim(),
      company_name: body.company_name?.trim() ?? null,
      phone: body.phone.trim(),
      email: body.email?.trim() ?? null,
      country_city: body.country_city?.trim() ?? null,
      product_group: body.product_group?.trim() ?? null,
      size: body.size?.trim() ?? null,
      quantity: body.quantity?.trim() ?? null,
      message: body.message?.trim() ?? null,
      ip_address: ip,
      status: "new",
    });

    if (error) {
      console.error("Quote insert error:", error);
      return NextResponse.json(
        { success: false, error: "Kayıt sırasında hata oluştu." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quote route error:", err);
    return NextResponse.json(
      { success: false, error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
