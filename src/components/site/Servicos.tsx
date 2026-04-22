import { useEffect, useRef } from "react";
import {
  Droplet, Truck, Container, Wind, ChefHat, Waves, Fuel, ArrowRight, type LucideIcon,
} from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { SERVICOS } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ICONS: Record<string, LucideIcon> = {
  Droplet, Truck, Container, Wind, ChefHat, Waves, Fuel,
};

export const Servicos = () => {
  const autoScroll = useRef(
    AutoScroll({
      speed: 0.6,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
　  })
  );
  const resumeTimer = useRef<number | null>(null);

  const pauseFor8s = () => {
    autoScroll.current.stop();
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      autoScroll.current.play();
    }, 8000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

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

        <div
          className="mt-14 reveal"
          onClickCapture={pauseFor8s}
          onTouchStartCapture={pauseFor8s}
        >
          <Carousel
            opts={{ align: "start", loop: true, dragFree: true, watchDrag: false }}
            plugins={[autoScroll.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {SERVICOS.map((s) => {
                const Icon = ICONS[s.icon] ?? Droplet;
                return (
                  <CarouselItem
                    key={s.id}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <article className="group h-full relative rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated hover:border-brand/40">
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};