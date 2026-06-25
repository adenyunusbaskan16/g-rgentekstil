"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1c3a] to-[#1a2744] flex items-center justify-center px-4">
      <div className="text-center text-white max-w-lg">
        <p className="text-7xl font-black text-red-400/30 mb-2 leading-none">Hata</p>
        <h1 className="text-2xl font-bold mb-3">Bir şeyler ters gitti</h1>
        <p className="text-gray-400 mb-8 text-sm">
          Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-sm"
          >
            <RefreshCw size={16} />
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all text-sm"
          >
            <Home size={16} />
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}
