"use client";

import { useEffect } from "react";

/**
 * <html lang> etiketini istemci tarafında düzeltir.
 * Root layout tek ve paylaşılan olduğu için (ISR/statik render'ı korumak
 * amacıyla) sunucu tarafında route'a göre dinamik lang set edilmiyor —
 * bunun yerine her locale layout'u kendi doğru dilini burada bildiriyor.
 * Hem ilk yüklemede hem TR/EN arası client-side gezinmede (Next Link)
 * doğru "lang" değerini garanti eder.
 */
export default function HtmlLangSync({ lang }: { lang: "tr" | "en" }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
