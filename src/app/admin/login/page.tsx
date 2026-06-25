"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const data = await res.json();
      if (data.success) { router.push("/admin/dashboard"); router.refresh(); }
      else setError(data.error ?? "Giriş başarısız.");
    } catch { setError("Bağlantı hatası."); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100svh", background: "linear-gradient(155deg,#06111f 0%,#0c1f3f 50%,#142a52 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Arka plan desen */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8a84b'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
      <div style={{ position: "absolute", top: "30%", right: "10%", width: 400, height: 400, background: "radial-gradient(circle,rgba(200,168,75,0.07) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 400, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <Lock size={24} color="var(--gold)" />
          </div>
          <p style={{ fontWeight: 800, color: "#fff", fontSize: "1.125rem", letterSpacing: "-0.01em" }}>GürgenTekstil</p>
          <p style={{ fontSize: "0.75rem", color: "rgba(200,168,75,0.5)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "0.2rem" }}>Yönetim Paneli</p>
        </div>

        {/* Kart */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "2rem", boxShadow: "0 24px 80px rgba(6,17,31,0.4)" }}>
          <h1 style={{ fontWeight: 700, color: "var(--navy)", fontSize: "1.125rem", marginBottom: "1.5rem", textAlign: "center" }}>Giriş Yap</h1>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.875rem 1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, fontSize: "0.875rem", color: "#dc2626", marginBottom: "1.25rem" }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label className="gt-label">Kullanıcı Adı</label>
              <div style={{ position: "relative" }}>
                <User size={15} color="#94a3b8" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete="username"
                  className="gt-input" style={{ paddingLeft: "2.5rem" }} placeholder="Kullanıcı adınız" />
              </div>
            </div>

            <div>
              <label className="gt-label">Şifre</label>
              <div style={{ position: "relative" }}>
                <Lock size={15} color="#94a3b8" style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
                  className="gt-input" style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }} placeholder="Şifreniz" />
                <button type="button" onClick={() => setShowPass(!showPass)} tabIndex={-1}
                  style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", background: "none", border: "none", cursor: "pointer", lineHeight: 0 }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="gt-btn gt-btn-navy gt-btn-lg gt-btn-full"
              style={{ marginTop: "0.5rem", opacity: loading ? 0.6 : 1 }}>
              {loading
                ? <><svg className="animate-spin" style={{ width: 16, height: 16 }} viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg> Giriş yapılıyor…</>
                : "Giriş Yap"
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", marginTop: "1.5rem" }}>
          © {new Date().getFullYear()} GürgenTekstil — Admin
        </p>
      </div>
    </div>
  );
}
