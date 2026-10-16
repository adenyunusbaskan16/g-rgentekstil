// =============================================
// GÜRGENTEKSTIL - Ürün kodları
// Kural: ölçüye göre önek + eklenme sırasına göre numara.
//   30x50 → 301, 302…   50x70 → 571…   50x90 → 501…   90x150 → 901…
// Listede olmayan ölçüler aynı mantıkla: 50x85 → 581…, 40x70 → 471…, 30x30 → 331…
// Kodlar tüm ürünler (aktif/pasif) eklenme tarihine göre sıralanarak verilir;
// böylece yeni ürün eklemek mevcut kodları değiştirmez.
// =============================================

import { cache } from "react";
import { createServerClient } from "./supabase";

const PREFIX: Record<string, string> = {
  "30x50": "30",
  "50x70": "57",
  "50x90": "50",
  "90x150": "90",
  "50x85": "58",
  "40x70": "47",
  "30x30": "33",
};

export function normalizeSize(size?: string | null): string {
  return (size ?? "").toLowerCase().replace(/cm/g, "").replace(/[×*]/g, "x").replace(/\s+/g, "");
}

/** Bilinmeyen ölçü için önek: ilk iki boyutun ilk rakamları (örn. 60x120 → 61). */
function prefixFor(size: string): string | null {
  if (PREFIX[size]) return PREFIX[size];
  const m = size.match(/^(\d+)x(\d+)$/);
  return m ? m[1][0] + m[2][0] : null;
}

/** id → kod eşlemesi (istek başına bir kez sorgulanır). */
export const getProductCodes = cache(async (): Promise<Record<string, string>> => {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, size, created_at")
    .order("created_at", { ascending: true })
    .order("id", { ascending: true });
  if (error || !data) return {};

  const counters: Record<string, number> = {};
  const codes: Record<string, string> = {};
  for (const p of data) {
    const prefix = prefixFor(normalizeSize(p.size));
    if (!prefix) continue;
    counters[prefix] = (counters[prefix] ?? 0) + 1;
    codes[p.id] = `${prefix}${counters[prefix]}`;
  }
  return codes;
});
