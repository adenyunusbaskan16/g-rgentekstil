---
inclusion: always
---

# Tech Steering - Gürgentekstil

## Architecture
- Framework: Next.js 16 App Router
- Language: TypeScript (strict)
- Styling: Tailwind CSS (utility-first, no component libraries)
- Database: Supabase PostgreSQL
- Storage: Supabase Storage (bucket: product-images)
- Auth: Custom JWT (bcryptjs hash, httpOnly cookie)
- Deployment: Vercel

## Key Files
- src/lib/data.ts → firma sabitleri, SEO metinleri, nav linkleri
- src/lib/products.ts → Supabase veri erişim fonksiyonları
- src/lib/auth.ts → JWT oluştur/doğrula, bcrypt
- src/types/index.ts → tüm TypeScript tipleri
- src/proxy.ts → admin route koruması (Next.js proxy/middleware)

## Route Structure
- (site)/ → TR site sayfaları (Header + Footer + WhatsApp butonu)
- /en/ → EN site sayfaları
- /admin/ → Admin paneli (JWT korumalı)
- /api/admin/* → Admin API route'ları (401 korumalı)
- /api/quote → Public teklif formu endpoint

## Performance Rules
- Görseller Supabase Storage'dan gelir, next/image ile optimize edilir
- Server Component'lar Supabase'i doğrudan sorgular (client-side fetch yok)
- Admin paneli dışındaki sayfalar static veya ISR'dır

## Naming Conventions
- Dosya isimleri: PascalCase (bileşenler), camelCase (lib dosyaları)
- API response: { success: boolean, data?: T, error?: string }
- Tüm import'lar @/ alias ile
