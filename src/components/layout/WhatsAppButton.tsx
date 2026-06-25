"use client";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/data";

export default function WhatsAppButton({ lang = "tr" }: { lang?: "tr" | "en" }) {
  return (
    <a
      href={getWhatsAppUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={lang === "en" ? "Get a quote via WhatsApp" : "WhatsApp ile teklif al"}
      className="wa-float"
    >
      <MessageCircle size={24} strokeWidth={2.2} />
    </a>
  );
}
