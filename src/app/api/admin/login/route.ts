import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { verifyPassword, createToken, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

// Brute-force koruması: aynı IP'den 15 dakikada en fazla 5 giriş denemesi
const LOGIN_RATE_LIMIT = 5;
const LOGIN_RATE_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`login:${ip}`, LOGIN_RATE_LIMIT, LOGIN_RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: "Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Kullanıcı adı ve şifre gereklidir." },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data: user, error } = await supabase
      .from("admin_users")
      .select("id, username, password_hash, is_active")
      .eq("username", username.trim())
      .eq("is_active", true)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { success: false, error: "Kullanıcı adı veya şifre hatalı." },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "Kullanıcı adı veya şifre hatalı." },
        { status: 401 }
      );
    }

    // Son giriş zamanını güncelle
    await supabase
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    const token = createToken(user.id, user.username);

    const response = NextResponse.json({
      success: true,
      data: { username: user.username },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
