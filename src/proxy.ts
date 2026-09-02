import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";

// Not: Bu proxy sadece "defense in depth" (savunma derinliği) katmanıdır.
// Gerçek yetkilendirme her admin sayfası ve /api/admin/* route'unda
// getAdminSession() ile ayrıca yapılır — proxy burada devre dışı kalsa bile
// admin verisine/işlemine erişim reddedilir.

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin sayfaları için auth kontrolü (/admin/login hariç)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !verifyToken(token)) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin API route'ları için de kontrol
  if (
    pathname.startsWith("/api/admin") &&
    !pathname.startsWith("/api/admin/login")
  ) {
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
