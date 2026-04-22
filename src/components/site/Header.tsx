import { useEffect, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/softillusion-logo.png";
import { COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Serviços", href: "#servicos" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Testemunhos", href: "#testemunhos" },
  { label: "Contactos", href: "#contactos" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-ink/95 backdrop-blur-md border-brand/30 shadow-elevated"
          : "bg-ink border-brand/10"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 md:h-20">
        <a href="#top" className="flex items-center gap-2 shrink-0" aria-label="Softillusion - Início">
          <img src={logo} alt="Logótipo Softillusion" className="h-10 md:h-12 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${COMPANY.phone}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-brand hover:brightness-110 transition-all"
            aria-label="Ligar agora"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-success/80 animate-pulse-dot" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <Phone className="h-4 w-4" />
            LIGAR 24H
          </a>
          <a
            href="#orcamento"
            className="hidden md:inline-flex items-center rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-ink transition-all"
          >
            Orçamento grátis
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-ink animate-float-up">
          <nav className="container-page py-4 flex flex-col gap-1" aria-label="Navegação móvel">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-white/85 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#orcamento"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-3 text-sm font-semibold text-white"
            >
              Pedir orçamento grátis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};