import { useEffect, useRef } from "react";
import { Clock, Tag, Users, Truck } from "lucide-react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const pilares = [
  {
    icon: Clock,
    titulo: "Sempre disponível, sempre rápido",
    desc: "24 horas por dia, 7 dias por semana, 365 dias por ano. Incluindo feriados e noites. Quando outros fecham, nós atendemos.",
  },
  {
    icon: Tag,
    titulo: "Preço fechado antes de começar",
    desc: "Nunca terá uma surpresa no final. Dizemos o valor antes de tirar a primeira ferramenta — por escrito, se quiser.",
  },
  {
    icon: Users,
    titulo: "Equipa própria — zero subcontratação",
    desc: "Todos os técnicos são colaboradores diretos. Formados, certificados e fardados. Sabe sempre quem entra em sua casa ou empresa.",
  },
  {
    icon: Truck,
    titulo: "Frota própria de hidroaspiradores",
    desc: "Equipamento industrial de última geração para resolver qualquer dimensão de problema. Sem limites de caudal nem de acesso.",
  },
];

export const Porque = () => {
  const autoScroll = useRef(
    AutoScroll({
      speed: 1.2,
      startDelay: 0,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );
  const resumeTimer = useRef<number | null>(null);

  const pauseFor5s = () => {
    autoScroll.current.stop();
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      autoScroll.current.play();
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, []);

  return (
    <section className="relative bg-ink text-white py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-light">
            Porquê Softillusion
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold">
            Porque é que milhares de clientes nos escolhem
          </h2>
          <p className="mt-5 text-white/70 text-base md:text-lg">
            Não somos os únicos. Mas somos os que resolvem. Veja o que nos diferencia.
          </p>
        </div>

        <div
          className="mt-14 reveal relative px-12"
          onClickCapture={pauseFor5s}
          onTouchStartCapture={pauseFor5s}
        >
          <Carousel
            opts={{ align: "start", loop: true, dragFree: true, watchDrag: false }}
            plugins={[autoScroll.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {pilares.map((p) => (
                <CarouselItem
                  key={p.titulo}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full rounded-2xl border border-white/10 bg-gradient-dark-card p-7 hover:border-brand/50 hover:shadow-brand transition-all duration-300">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand/15 text-brand-light border border-brand/30">
                      <p.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{p.titulo}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{p.desc}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-0 h-10 w-10 bg-white/10 border-white/20 text-white hover:bg-brand hover:text-white hover:border-brand" />
            <CarouselNext className="right-0 translate-x-0 h-10 w-10 bg-white/10 border-white/20 text-white hover:bg-brand hover:text-white hover:border-brand" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};