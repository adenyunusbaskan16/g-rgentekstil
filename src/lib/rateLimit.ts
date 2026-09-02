// =============================================
// GÜRGENTEKSTIL - Basit IP Bazlı Rate Limiting
// =============================================
// Not: Bellek-içi (in-memory) bir sayaçtır. Vercel serverless ortamında her
// fonksiyon örneği kendi belleğini tutar; bu nedenle limit tüm bölgeler/örnekler
// için mutlak değil, "best-effort" bir korumadır. Spam/brute-force'u önemli
// ölçüde azaltır ama dağıtık, kesin bir rate limit garantisi vermez.
// Daha güçlü bir garanti gerekirse Upstash/Vercel KV gibi paylaşılan bir
// depoya geçilmesi önerilir — bu, mevcut mimariye ek bir bağımlılık ekler.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Bellek sızıntısını önlemek için eski kayıtları periyodik temizle
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(now: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Sabit pencereli (fixed-window) basit rate limiter.
 * @param key  Benzersiz anahtar — genelde `${scope}:${ip}`
 * @param limit  Pencere başına izin verilen istek sayısı
 * @param windowMs  Pencere süresi (ms)
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  cleanup(now);

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

export function getClientIp(req: Request): string {
  const headers = req.headers;
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
