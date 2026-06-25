---
inclusion: always
---

# Structure Steering - Gürgentekstil

## TR Sayfalar
- `/` → Ana Sayfa
- `/kurumsal` → Hakkımızda
- `/uretim-kapasitesi` → Üretim Kapasitesi
- `/makine-parkuru` → Makine Parkuru
- `/urunler` → Ürünler (Supabase'den dinamik)
- `/iletisim` → Teklif Al / İletişim
- `/kvkk` → KVKK / Gizlilik

## EN Sayfalar
- `/en` → Home
- `/en/about` → About
- `/en/production-capacity` → Production Capacity
- `/en/machinery` → Machinery
- `/en/products` → Products
- `/en/contact` → Contact
- `/en/privacy` → Privacy Policy

## Admin Sayfalar
- `/admin/login` → Giriş
- `/admin/dashboard` → Dashboard
- `/admin/products` → Ürün listesi
- `/admin/products/new` → Yeni ürün
- `/admin/products/[id]` → Ürün düzenleme
- `/admin/quotes` → Teklif talepleri
- `/admin/settings` → Site ayarları

## Supabase Tabloları
- products → ürünler (image_url, color_options JSONB, size, weight_grams, weight_label, sale_unit)
- product_categories → kategoriler
- site_settings → key-value ayarlar
- quote_requests → form gönderileri
- admin_users → bcrypt hash'li şifreler

## Dışlananlar (ekleme)
- E-ticaret sepet/ödeme
- Fiyat listesi
- Galeri sayfası
- Kalite/Sertifika sayfası
- Kapasite raporu PDF indirme
