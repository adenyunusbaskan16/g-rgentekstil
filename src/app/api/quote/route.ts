import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import type { QuoteRequest } from "@/types";

// Spam koruması: aynı IP'den 10 dakikada en fazla 3 teklif talebi
const QUOTE_RATE_LIMIT = 3;
const QUOTE_RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`quote:${ip}`, QUOTE_RATE_LIMIT, QUOTE_RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: "Çok fazla istek gönderildi. Lütfen birkaç dakika sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

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
