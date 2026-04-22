import { ArrowRight } from "lucide-react";

export const B2B = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 md:p-14 text-white shadow-elevated reveal">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-10 -bottom-20 h-72 w-72 rounded-full bg-ink/20 blur-3xl"
            aria-hidden
          />

          <div className="relative">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                Soluções para empresas
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
                Parceiros das maiores empresas e indústrias do país
              </h2>
              <p className="mt-5 text-white/85 text-base md:text-lg leading-relaxed max-w-xl">
                Desenvolvemos contratos personalizados de manutenção e resposta rápida para indústria, construção civil, condomínios, hotelaria, restauração e entidades públicas. Acordo de Nível de Serviço garantido e equipa dedicada.
              </p>
              <a
                href="#orcamento"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-primary hover:bg-white/95 hover:scale-[1.02] transition-all shadow-elevated"
              >
                Falar com um comercial
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};