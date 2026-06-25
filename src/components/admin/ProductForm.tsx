"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  X, Save, Trash2, AlertCircle, CheckCircle, ChevronDown, Camera,
} from "lucide-react";
import { slugify } from "@/lib/utils";
import type { Product, ProductCategory } from "@/types";

/* ═══════════════════════════════════════════════════════════
   KART ve ALAN bileşenleri — ProductForm DIŞINDA tanımlı!
   İçeride tanımlanırsa her render'da unmount/remount olur
   ve input focus kaybolur. Bu kritik bir React kuralı.
═══════════════════════════════════════════════════════════ */

function FormCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: 12, overflow: "hidden",
    }}>
      <div style={{
        padding: "0.875rem 1.25rem", borderBottom: "1px solid #f3f4f6",
        background: "#fafafa",
      }}>
        <p style={{
          fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#374151", margin: 0,
        }}>
          {title}
        </p>
      </div>
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {children}
      </div>
    </div>
  );
}

function FormField({
  label, required, hint, children,
}: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{
        fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "#374151",
      }}>
        {label}
        {required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
        {hint && (
          <span style={{ fontWeight: 400, textTransform: "none", color: "#9ca3af", marginLeft: 6, fontSize: "0.7rem" }}>
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ─── Toggle switch — dışarıda tanımlı ─── */
function ToggleSwitch({
  name, label, checked, onChange,
}: {
  name: string; label: string; checked: boolean;
  onChange: (name: string, val: boolean) => void;
}) {
  return (
    <label style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0.875rem 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer",
    }}>
      <span style={{ fontSize: "0.9375rem", color: "#111827", fontWeight: 500, paddingRight: "1rem" }}>
        {label}
      </span>
      <div
        onClick={() => onChange(name, !checked)}
        style={{
          width: 48, height: 28, flexShrink: 0,
          background: checked ? "#1a2332" : "#d1d5db",
          borderRadius: 99, position: "relative", cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        <div style={{
          position: "absolute", top: 3,
          left: checked ? 23 : 3,
          width: 22, height: 22,
          background: "#fff", borderRadius: "50%",
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
          transition: "left 0.2s",
        }} />
      </div>
    </label>
  );
}

/* ─── Renk pill ─── */
function ColorPills({ value }: { value: string }) {
  const colors = value.split(",").map((c) => c.trim()).filter(Boolean);
  if (!colors.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
      {colors.map((c) => (
        <span key={c} style={{
          padding: "0.2rem 0.625rem", background: "#f3f4f6",
          borderRadius: 99, fontSize: "0.75rem", color: "#374151",
        }}>
          {c}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Props
═══════════════════════════════════════════════════════════ */
interface ProductFormProps {
  product?: Product;
  categories: ProductCategory[];
  isEdit?: boolean;
}

type SaveState = "idle" | "saving" | "success" | "error";

/* ═══════════════════════════════════════════════════════════
   ANA FORM BİLEŞENİ
═══════════════════════════════════════════════════════════ */
export default function ProductForm({ product, categories, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    category_id:        product?.category_id        ?? "",
    slug:               product?.slug               ?? "",
    name_tr:            product?.name_tr             ?? "",
    name_en:            product?.name_en             ?? "",
    description_tr:     product?.description_tr      ?? "",
    description_en:     product?.description_en      ?? "",
    size:               product?.size                ?? "",
    weight_grams:       product?.weight_grams?.toString() ?? "",
    weight_label:       product?.weight_label        ?? "",
    color_options:      (product?.color_options ?? []).join(", "),
    image_url:          product?.image_url           ?? "",
    image_alt_tr:       product?.image_alt_tr        ?? "",
    image_alt_en:       product?.image_alt_en        ?? "",
    sale_unit:          product?.sale_unit           ?? "",
    is_stock_available: product?.is_stock_available  ?? true,
    is_custom_order:    product?.is_custom_order     ?? false,
    display_order:      product?.display_order?.toString() ?? "0",
    is_active:          product?.is_active           ?? true,
  });

  const [saveState,     setSaveState]     = useState<SaveState>("idle");
  const [errorMsg,      setErrorMsg]      = useState("");
  const [uploading,     setUploading]     = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [dragOver,      setDragOver]      = useState(false);

  /* ─── Generic input handler ─── */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  /* ─── İsim değişince slug da otomatik üret (sadece yeni üründe) ─── */
  function handleNameTr(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setForm((prev) => ({
      ...prev,
      name_tr: v,
      slug: isEdit ? prev.slug : slugify(v),
    }));
  }

  /* ─── Toggle handler — referans sabit kalacak şekilde ─── */
  const handleToggle = useCallback((name: string, val: boolean) => {
    setForm((prev) => ({ ...prev, [name]: val }));
  }, []);

  /* ─── Görsel yükleme ─── */
  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    setErrorMsg("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, image_url: data.data.url }));
      } else {
        setErrorMsg(data.error ?? "Yükleme başarısız.");
      }
    } catch {
      setErrorMsg("Görsel yüklenemedi. Bağlantıyı kontrol edin.");
    } finally {
      setUploading(false);
    }
  }, []);

  /* ─── Kaydet ─── */
  async function handleSave() {
    if (!form.name_tr.trim()) { setErrorMsg("Ürün adı zorunludur."); return; }
    if (!form.slug.trim())    { setErrorMsg("Slug zorunludur."); return; }
    setSaveState("saving");
    setErrorMsg("");
    try {
      const url    = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";
      const res    = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSaveState("success");
        setTimeout(() => { router.push("/admin/products"); router.refresh(); }, 900);
      } else {
        setSaveState("error");
        setErrorMsg(data.error ?? "Kayıt başarısız.");
      }
    } catch {
      setSaveState("error");
      setErrorMsg("Bağlantı hatası. Tekrar deneyin.");
    }
  }

  /* ─── Sil ─── */
  async function handleDelete() {
    if (!product) return;
    try {
      const res  = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) { router.push("/admin/products"); router.refresh(); }
      else setErrorMsg(data.error ?? "Silme başarısız.");
    } catch {
      setErrorMsg("Silme sırasında hata oluştu.");
    }
  }

  /* ─── Ortak input stili ─── */
  const inp: React.CSSProperties = {
    width: "100%", padding: "0.875rem 1rem",
    border: "1.5px solid #e5e7eb", borderRadius: 8,
    fontSize: "0.9375rem", color: "#111827",
    background: "#fff", fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
    WebkitAppearance: "none", appearance: "none",
  };

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", boxSizing: "border-box" }}>

      {/* Hata mesajı */}
      {errorMsg && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", padding: "0.875rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, fontSize: "0.875rem", color: "#dc2626" }}>
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 2 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Başarı mesajı */}
      {saveState === "success" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, fontSize: "0.875rem", color: "#16a34a" }}>
          <CheckCircle size={16} /> Kaydedildi! Yönlendiriliyor...
        </div>
      )}

      {/* ── GÖRSEL ── */}
      <FormCard title="Ürün Görseli">
        {/* Mevcut görsel önizleme */}
        {form.image_url ? (
          <div style={{ position: "relative" }}>
            <img
              src={form.image_url}
              alt="Ürün görseli"
              style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb", display: "block" }}
            />
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, image_url: "" }))}
              aria-label="Görseli kaldır"
              style={{ position: "absolute", top: 8, right: 8, width: 32, height: 32, background: "rgba(0,0,0,0.65)", color: "#fff", border: "none", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div style={{ width: "100%", aspectRatio: "4/3", background: "#f9fafb", border: "2px dashed #e5e7eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "0.8125rem", color: "#9ca3af" }}>Görsel yok</span>
          </div>
        )}

        {/* Yükle butonu */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadFile(f); }}
          style={{
            width: "100%", padding: "1.25rem 1rem",
            border: `2px dashed ${dragOver ? "#1a2332" : "#d1d5db"}`,
            borderRadius: 10, background: dragOver ? "#f0f4ff" : "#fafafa",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
            cursor: "pointer", transition: "border-color 0.18s, background 0.18s",
            boxSizing: "border-box",
          }}
        >
          {uploading ? (
            <>
              <svg style={{ width: 24, height: 24, animation: "spin 1s linear infinite" }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="4" opacity={0.25} />
                <path fill="#1a2332" d="M4 12a8 8 0 018-8v8H4z" opacity={0.75} />
              </svg>
              <span style={{ fontSize: "0.8125rem", color: "#6b7280" }}>Yükleniyor...</span>
            </>
          ) : (
            <>
              <div style={{ width: 40, height: 40, background: "#e5e7eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Camera size={18} color="#374151" />
              </div>
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#374151" }}>
                {form.image_url ? "Görseli Değiştir" : "Görsel Ekle"}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>Dokunun veya sürükleyin · JPEG, PNG, WebP</span>
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
          style={{ display: "none" }}
          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }}
        />
      </FormCard>

      {/* ── TEMEL BİLGİLER ── */}
      <FormCard title="Temel Bilgiler">
        <FormField label="Ürün Adı (Türkçe)" required>
          <input
            style={inp} type="text" name="name_tr"
            value={form.name_tr} onChange={handleNameTr}
            placeholder="Örn: Banyo Havlusu 90x150"
          />
        </FormField>

        <FormField label="Ürün Adı (İngilizce)">
          <input
            style={inp} type="text" name="name_en"
            value={form.name_en} onChange={handleChange}
            placeholder="Örn: Bath Towel 90x150"
          />
        </FormField>

        <FormField label="Kategori">
          <div style={{ position: "relative" }}>
            <select
              style={{ ...inp, paddingRight: "2.5rem" }}
              name="category_id" value={form.category_id} onChange={handleChange}
            >
              <option value="">— Kategori seçin —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name_tr}</option>
              ))}
            </select>
            <ChevronDown size={16} color="#9ca3af" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          </div>
        </FormField>

        <FormField label="URL (Slug)" hint="— otomatik üretilir">
          <input
            style={{ ...inp, fontFamily: "monospace", fontSize: "0.875rem", background: "#f9fafb" }}
            type="text" name="slug"
            value={form.slug} onChange={handleChange}
            placeholder="banyo-havlusu-90x150"
          />
        </FormField>
      </FormCard>

      {/* ── AÇIKLAMA ── */}
      <FormCard title="Açıklama">
        <FormField label="Açıklama (Türkçe)" hint="— boş bırakırsanız otomatik oluşturulur">
          <textarea
            style={{ ...inp, minHeight: 96, resize: "vertical" }}
            name="description_tr" value={form.description_tr} onChange={handleChange}
            placeholder="Ürün hakkında kısa bir açıklama yazın..."
          />
        </FormField>
        <FormField label="Açıklama (İngilizce)">
          <textarea
            style={{ ...inp, minHeight: 80, resize: "vertical" }}
            name="description_en" value={form.description_en} onChange={handleChange}
            placeholder="Short product description..."
          />
        </FormField>
      </FormCard>

      {/* ── ÜRÜN ÖZELLİKLERİ ── */}
      <FormCard title="Ürün Özellikleri">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <FormField label="Ebat">
            <input style={inp} type="text" name="size" value={form.size} onChange={handleChange} placeholder="50x90 cm" />
          </FormField>
          <FormField label="Gramaj (gr)">
            <input style={inp} type="text" name="weight_grams" value={form.weight_grams} onChange={handleChange} placeholder="450" />
          </FormField>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <FormField label="Gramaj Etiketi">
            <input style={inp} type="text" name="weight_label" value={form.weight_label} onChange={handleChange} placeholder="450 gr/m²" />
          </FormField>
          <FormField label="Satış Birimi">
            <input style={inp} type="text" name="sale_unit" value={form.sale_unit} onChange={handleChange} placeholder="Düzine / Çuval" />
          </FormField>
        </div>
        <FormField label="Renkler" hint="— virgülle ayırın">
          <input
            style={inp} type="text" name="color_options"
            value={form.color_options} onChange={handleChange}
            placeholder="Beyaz, Krem, Lacivert, Gri"
          />
          <ColorPills value={form.color_options} />
        </FormField>
      </FormCard>

      {/* ── DURUM ── */}
      <FormCard title="Durum">
        <ToggleSwitch
          name="is_active"
          label="Aktif — sitede görünsün"
          checked={form.is_active}
          onChange={handleToggle}
        />
        <ToggleSwitch
          name="is_stock_available"
          label="Stokta mevcut"
          checked={form.is_stock_available}
          onChange={handleToggle}
        />
        <ToggleSwitch
          name="is_custom_order"
          label="Özel sipariş mevcut"
          checked={form.is_custom_order}
          onChange={handleToggle}
        />
        <FormField label="Sıralama" hint="— küçük sayı önde">
          <input
            style={{ ...inp, maxWidth: 120 }}
            type="number" name="display_order"
            value={form.display_order} onChange={handleChange}
            min="0"
          />
        </FormField>
      </FormCard>

      {/* ── SEO ── */}
      <FormCard title="SEO — Görsel Alt Text">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
          <FormField label="Alt Text TR">
            <input style={inp} type="text" name="image_alt_tr" value={form.image_alt_tr} onChange={handleChange} placeholder="Türkçe açıklama" />
          </FormField>
          <FormField label="Alt Text EN">
            <input style={inp} type="text" name="image_alt_en" value={form.image_alt_en} onChange={handleChange} placeholder="English description" />
          </FormField>
        </div>
      </FormCard>

      {/* ── KAYDET ── */}
      <button
        type="button"
        onClick={handleSave}
        disabled={saveState === "saving" || saveState === "success"}
        style={{
          width: "100%", padding: "1rem 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
          background: saveState === "success" ? "#16a34a" : "#1a2332",
          color: "#fff", border: "none", borderRadius: 10,
          fontSize: "1rem", fontWeight: 700,
          cursor: saveState === "saving" ? "wait" : "pointer",
          opacity: saveState === "saving" ? 0.7 : 1,
          transition: "background 0.2s, opacity 0.2s",
          fontFamily: "inherit", boxSizing: "border-box",
        }}
      >
        {saveState === "saving" ? (
          <>
            <svg style={{ width: 18, height: 18, animation: "spin 1s linear infinite", flexShrink: 0 }} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity={0.25} />
              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" opacity={0.75} />
            </svg>
            Kaydediliyor...
          </>
        ) : saveState === "success" ? (
          <><CheckCircle size={18} /> Kaydedildi!</>
        ) : (
          <><Save size={18} /> {isEdit ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}</>
        )}
      </button>

      {/* ── SİL ── */}
      {isEdit && (
        <div style={{ background: "#fff", border: "1px solid #fee2e2", borderRadius: 12, padding: "1.25rem" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#dc2626", marginBottom: "0.875rem" }}>
            Tehlikeli Alan
          </p>
          {!deleteConfirm ? (
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              style={{ width: "100%", padding: "0.875rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "#fff", border: "1.5px solid #fca5a5", borderRadius: 8, fontSize: "0.9375rem", fontWeight: 600, color: "#dc2626", cursor: "pointer", fontFamily: "inherit" }}
            >
              <Trash2 size={16} /> Ürünü Sil
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ fontSize: "0.8125rem", color: "#dc2626", fontWeight: 500 }}>
                Bu işlem geri alınamaz. Ürün kalıcı olarak silinecek.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <button
                  type="button" onClick={handleDelete}
                  style={{ padding: "0.875rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.9375rem", cursor: "pointer", fontFamily: "inherit" }}
                >
                  Evet, Sil
                </button>
                <button
                  type="button" onClick={() => setDeleteConfirm(false)}
                  style={{ padding: "0.875rem", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 8, fontWeight: 600, fontSize: "0.9375rem", cursor: "pointer", fontFamily: "inherit" }}
                >
                  Vazgeç
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
