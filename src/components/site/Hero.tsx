import { Phone, Clock, ShieldCheck, BadgeEuro, Truck, ArrowRight } from "lucide-react";
import { COMPANY, STATS } from "@/lib/constants";

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
    {children}
  </span>
);

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink text-white"
    >
      {/* Background gradient + decoration */}
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(204 70% 50%) 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-200px] left-[-10%] h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(209 64% 35%) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="container-page relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 animate-float-up">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-brand-light">
              Desentupimentos 24h · Todo Portugal
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold leading-[1.05]">
              Entupimento resolvido <span className="text-gradient-brand">hoje</span>.
              <br className="hidden sm:block" /> Equipa no local em minutos.
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed">
              Doméstico e empresarial. Orçamento gratuito, preço fechado antes de
              começar e sem custos ocultos. Do Minho ao Algarve e em toda a fronteira
              com Espanha — 24 horas por dia, 365 dias por ano.
            </p>

            {/* Trust badges */}
            <div className="mt-7 flex flex-wrap gap-2">
              <Badge>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success/70 animate-pulse-dot" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                Equipa disponível agora
              </Badge>
              <Badge><Clock className="h-3.5 w-3.5 text-brand-light" /> Resposta em 30 min</Badge>
              <Badge><BadgeEuro className="h-3.5 w-3.5 text-brand-light" /> Orçamento grátis</Badge>
              <Badge><ShieldCheck className="h-3.5 w-3.5 text-brand-light" /> Preço fechado</Badge>
              <Badge><Truck className="h-3.5 w-3.5 text-brand-light" /> Frota própria</Badge>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${COMPANY.phone}`}
                className="group relative inline-flex flex-col items-center sm:items-start"
              >
                <span className="relative inline-flex items-center justify-center gap-3 rounded-xl bg-brand px-7 py-4 text-base font-extrabold uppercase tracking-wide text-brand-foreground shadow-brand transition-all hover:brightness-110 hover:scale-[1.02] animate-pulse-ring">
                  <Phone className="h-5 w-5" />
                  Ligar agora — 24h
                </span>
                <span className="mt-2 text-xs text-white/60">Atendemos em segundos</span>
              </a>

              <a
                href="#orcamento"
                className="group inline-flex flex-col items-center sm:items-start"
              >
                <span className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-transparent px-7 py-4 text-base font-extrabold uppercase tracking-wide text-white transition-all hover:bg-white hover:text-ink hover:scale-[1.02]">
                  Pedir orçamento grátis
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-2 text-xs text-white/60">Resposta em menos de 30 min</span>
              </a>
            </div>

            <p className="mt-5 text-xs text-white/55">
              🔒 Sem compromisso · Sem custos ocultos · Sem subcontratação
            </p>
          </div>

          {/* Visual / stats panel */}
          <div className="lg:col-span-5 animate-float-up [animation-delay:120ms]">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-dark-card p-6 sm:p-8 shadow-elevated">
              <div className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-brand-foreground shadow-brand">
                Em direto
              </div>
              <div className="grid grid-cols-2 gap-5">
                <Stat value={STATS.intervencoes} label="Intervenções realizadas" />
                <Stat value={STATS.anos} label="Anos de experiência" />
                <Stat value={STATS.taxaResolucao} label="Resolução à primeira" />
                <Stat value="24/7" label="Sempre disponível" />
              </div>
              <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-brand-light shrink-0" />
                <p className="text-sm text-white/85">
                  Tempo médio de chegada hoje:{" "}
                  <span className="font-bold text-white">{STATS.tempoChegadaMin} min</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider para sec. clara */}
      <svg
        className="block w-full h-12 sm:h-16 text-background"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,32 C240,80 480,80 720,48 C960,16 1200,16 1440,48 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="text-3xl sm:text-4xl font-extrabold text-gradient-brand leading-none">
      {value}
    </div>
    <div className="mt-1.5 text-xs text-white/65 leading-tight">{label}</div>
  </div>
);