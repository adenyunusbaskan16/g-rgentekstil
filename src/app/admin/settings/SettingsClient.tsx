"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, CheckCircle, AlertCircle } from "lucide-react";
import type { SiteSetting } from "@/types";
import { cn } from "@/lib/utils";

interface Props { settings: SiteSetting[]; }

const groupLabels: Record<string, string> = {
  company: "Firma Bilgileri",
  contact: "İletişim",
  seo: "SEO Meta Bilgileri",
};

type SaveState = "idle" | "saving" | "success" | "error";

export default function SettingsClient({ settings }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value ?? ""]))
  );
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Gruplara ayır
  const groups = Object.entries(
    settings.reduce((acc, s) => {
      const g = s.group_name ?? "general";
      if (!acc[g]) acc[g] = [];
      acc[g].push(s);
      return acc;
    }, {} as Record<string, SiteSetting[]>)
  );

  async function handleSave() {
    setSaveState("saving");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success) {
        setSaveState("success");
        router.refresh();
        setTimeout(() => setSaveState("idle"), 2000);
      } else {
        setSaveState("error");
        setErrorMsg(data.error ?? "Kayıt başarısız.");
      }
    } catch {
      setSaveState("error");
      setErrorMsg("Bağlantı hatası.");
    }
  }

  return (
    <div className="space-y-6">
      {(saveState === "success" || saveState === "error") && (
        <div className={cn(
          "flex items-center gap-2.5 p-3.5 rounded-xl text-sm border",
          saveState === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
        )}>
          {saveState === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {saveState === "success" ? "Ayarlar kaydedildi!" : errorMsg}
        </div>
      )}

      {groups.map(([group, items]) => (
        <div key={group} className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-gray-800 mb-5 text-sm uppercase tracking-wide pb-3 border-b border-gray-100">
            {groupLabels[group] ?? group}
          </h3>
          <div className="space-y-4">
            {items.map((setting) => {
              const isLong = (setting.value?.length ?? 0) > 100 ||
                setting.key.includes("desc") || setting.key.includes("template");
              return (
                <div key={setting.key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    {setting.label}
                    <span className="ml-1.5 text-gray-400 font-normal font-mono text-[10px]">
                      ({setting.key})
                    </span>
                  </label>
                  {isLong ? (
                    <textarea
                      value={values[setting.key] ?? ""}
                      onChange={(e) => setValues((p) => ({ ...p, [setting.key]: e.target.value }))}
                      rows={3}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <input
                      type="text"
                      value={values[setting.key] ?? ""}
                      onChange={(e) => setValues((p) => ({ ...p, [setting.key]: e.target.value }))}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saveState === "saving" || saveState === "success"}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1a2744] hover:bg-[#243460] disabled:opacity-60 text-white font-bold rounded-xl transition-all text-sm"
      >
        {saveState === "saving" ? (
          <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg> Kaydediliyor...</>
        ) : saveState === "success" ? (
          <><CheckCircle size={16} /> Kaydedildi!</>
        ) : (
          <><Save size={16} /> Ayarları Kaydet</>
        )}
      </button>
    </div>
  );
}
