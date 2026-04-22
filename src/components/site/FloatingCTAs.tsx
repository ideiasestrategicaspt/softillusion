import { MessageCircle, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

export const FloatingCTAs = () => {
  return (
    <>
      {/* WhatsApp - sempre visível */}
      <a
        href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(
          "Olá! Gostaria de pedir um orçamento de desentupimento."
        )}`}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 group flex h-14 w-14 items-center justify-center rounded-full text-white shadow-elevated hover:scale-110 transition-transform"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-elevated">
          Falar no WhatsApp
        </span>
        <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ boxShadow: "0 0 0 0 rgba(37,211,102,0.55)" }} />
      </a>

      {/* Ligar 24h - mobile only */}
      <a
        href={`tel:${COMPANY.phone}`}
        aria-label="Ligar 24 horas"
        className="fixed bottom-5 left-5 z-50 sm:hidden flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-brand animate-pulse-ring"
      >
        <Phone className="h-6 w-6" />
      </a>
    </>
  );
};