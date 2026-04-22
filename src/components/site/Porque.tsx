import { Clock, Tag, Users, Truck } from "lucide-react";

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

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pilares.map((p, idx) => (
            <div
              key={p.titulo}
              className="reveal rounded-2xl border border-white/10 bg-gradient-dark-card p-7 hover:border-brand/50 hover:shadow-brand transition-all duration-300"
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand/15 text-brand-light border border-brand/30">
                <p.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{p.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};