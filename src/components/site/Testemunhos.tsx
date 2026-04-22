import { Star, Quote } from "lucide-react";
import { TESTEMUNHOS, STATS } from "@/lib/constants";
import { CountUp } from "@/components/CountUp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Testemunhos = () => {
  return (
    <section id="testemunhos" className="relative bg-background py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Testemunhos reais
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
            Mais de 1000 clientes já confiaram em nós
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Desentupir é fácil. Resolver bem é que é raro. Veja o que dizem os nossos clientes.
          </p>
        </div>

        <div className="mt-14 reveal relative px-4 sm:px-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {TESTEMUNHOS.map((t, idx) => (
                <CarouselItem
                  key={t.nome + idx}
                  className="pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3"
                >
                  <article className="h-full relative rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-soft hover:shadow-elevated transition-all">
                    <Quote className="absolute top-5 right-5 h-8 w-8 text-brand/15" />
                    <div className="flex gap-0.5 text-brand">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.texto}"</p>
                    <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand text-white font-bold">
                        {t.nome.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-foreground text-sm">{t.nome}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.localidade} · {t.servico}
                        </div>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex left-0 -translate-x-0 h-10 w-10 bg-card border-border hover:bg-brand hover:text-white hover:border-brand" />
            <CarouselNext className="hidden sm:flex right-0 translate-x-0 h-10 w-10 bg-card border-border hover:bg-brand hover:text-white hover:border-brand" />
          </Carousel>
        </div>

        {/* Métricas animadas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 reveal">
          {[
            { v: STATS.intervencoes, l: "Intervenções em 2025" },
            { v: STATS.taxaResolucao, l: "Resolução à primeira" },
            { v: `${STATS.tempoChegadaMin}min`, l: "Tempo médio de chegada" },
            { v: "24/7", l: "Sempre disponível" },
          ].map((m) => (
            <div
              key={m.l}
              className="rounded-2xl bg-gradient-brand p-6 md:p-7 text-white text-center shadow-brand"
            >
              <div className="text-3xl md:text-4xl font-extrabold">
                <CountUp value={m.v} />
              </div>
              <div className="mt-1 text-xs md:text-sm text-white/85">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};