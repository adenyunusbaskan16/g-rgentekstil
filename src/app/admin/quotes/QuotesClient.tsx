"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Phone, Mail, MapPin, Package, Calendar } from "lucide-react";
import type { QuoteRequest } from "@/types";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/data";
import { COMPANY } from "@/lib/data";

interface Props { quotes: QuoteRequest[]; }

const statusLabels: Record<string, { label: string; cls: string }> = {
  new: { label: "Yeni", cls: "bg-green-100 text-green-700" },
  read: { label: "Okundu", cls: "bg-blue-100 text-blue-700" },
  replied: { label: "Yanıtlandı", cls: "bg-gray-100 text-gray-600" },
};

export default function QuotesClient({ quotes }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<QuoteRequest | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    router.refresh();
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, status: status as QuoteRequest["status"] } : null);
    }
  }

  const waMessage = (q: QuoteRequest) => {
    const msg = `Merhaba ${q.full_name}, talebiniz için geri dönüyorum.`;
    return `https://wa.me/${q.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      {/* Liste */}
      <div className="lg:col-span-2">
        {/* Filtre */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {[["all", "Tümü"], ["new", "Yeni"], ["read", "Okundu"], ["replied", "Yanıtlandı"]].map(([val, lbl]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={cn(
                "px-3 py-1.5 text-xs font-semibold rounded-full border transition-all",
                filter === val ? "bg-[#1a2744] text-white border-[#1a2744]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              )}
            >
              {lbl} ({val === "all" ? quotes.length : quotes.filter((q) => q.status === val).length})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <MessageSquare size={28} className="text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Teklif talebi yok</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((q) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelected(q);
                  if (q.status === "new") updateStatus(q.id!, "read");
                }}
                className={cn(
                  "w-full text-left p-4 bg-white border rounded-xl transition-all hover:shadow-sm",
                  selected?.id === q.id ? "border-blue-400 shadow-sm" : "border-gray-200"
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-gray-800 truncate">{q.full_name}</p>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full shrink-0", statusLabels[q.status ?? "new"].cls)}>
                    {statusLabels[q.status ?? "new"].label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">{q.phone}</p>
                {q.product_group && <p className="text-xs text-blue-600 mt-1 truncate">{q.product_group}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  {q.created_at ? new Date(q.created_at).toLocaleDateString("tr-TR") : ""}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detay */}
      <div className="lg:col-span-3">
        {!selected ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center h-full flex items-center justify-center">
            <div>
              <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Detayları görmek için sol taraftan bir talep seçin</p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 sticky top-20">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-[#1a2744] text-lg">{selected.full_name}</h2>
                {selected.company_name && <p className="text-sm text-gray-500">{selected.company_name}</p>}
              </div>
              <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", statusLabels[selected.status ?? "new"].cls)}>
                {statusLabels[selected.status ?? "new"].label}
              </span>
            </div>

            {/* İletişim */}
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: Phone, label: selected.phone, href: `tel:${selected.phone}` },
                selected.email ? { icon: Mail, label: selected.email, href: `mailto:${selected.email}` } : null,
                selected.country_city ? { icon: MapPin, label: selected.country_city, href: null } : null,
              ].filter(Boolean).map((item) => item && (
                <div key={item.label} className="flex items-center gap-2.5 text-sm">
                  <item.icon size={15} className="text-gray-400 shrink-0" />
                  {item.href ? (
                    <a href={item.href} className="text-blue-600 hover:underline">{item.label}</a>
                  ) : (
                    <span className="text-gray-700">{item.label}</span>
                  )}
                </div>
              ))}
              {selected.created_at && (
                <div className="flex items-center gap-2.5 text-sm">
                  <Calendar size={15} className="text-gray-400 shrink-0" />
                  <span className="text-gray-500">{new Date(selected.created_at).toLocaleString("tr-TR")}</span>
                </div>
              )}
            </div>

            {/* Talep detayları */}
            {(selected.product_group || selected.size || selected.quantity) && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Talep Detayları</p>
                {[
                  { label: "Ürün Grubu", value: selected.product_group },
                  { label: "Ebat", value: selected.size },
                  { label: "Miktar", value: selected.quantity },
                ].filter((x) => x.value).map((x) => (
                  <div key={x.label} className="flex gap-2 text-sm">
                    <span className="w-24 text-gray-500 shrink-0">{x.label}:</span>
                    <span className="font-medium text-gray-800">{x.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Mesaj */}
            {selected.message && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Mesaj</p>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-4 leading-relaxed">{selected.message}</p>
              </div>
            )}

            {/* Aksiyonlar */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
              <a
                href={waMessage(selected)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-lg transition-all"
              >
                WhatsApp ile Yanıtla
              </a>
              {selected.status !== "replied" && (
                <button
                  onClick={() => updateStatus(selected.id!, "replied")}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Yanıtlandı İşaretle
                </button>
              )}
              {selected.status !== "new" && (
                <button
                  onClick={() => updateStatus(selected.id!, "new")}
                  className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Yeni Olarak İşaretle
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
