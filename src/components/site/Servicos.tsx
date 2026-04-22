import {
  Droplet, Truck, Container, Wind, ChefHat, Waves, Fuel, ArrowRight, type LucideIcon,
} from "lucide-react";
import { SERVICOS } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Droplet, Truck, Container, Wind, ChefHat, Waves, Fuel,
};

export const Servicos = () => {
  return (
    <section id="servicos" className="relative bg-background py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Serviços
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
            Soluções completas para todos os tipos de obstrução e aspiração
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Do desentupimento doméstico à intervenção industrial com camião
            hidroaspirador. Tecnologia de ponta, equipa certificada e resposta
            imediata.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.map((s, idx) => {
            const Icon = ICONS[s.icon] ?? Droplet;
            return (
              <article
                key={s.id}
                className="group reveal relative rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-brand/40"
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-brand transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{s.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.descricao}
                </p>
                <a
                  href={`#orcamento?servico=${s.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:gap-2.5 transition-all"
                  data-servico={s.id}
                >
                  Pedir orçamento
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};