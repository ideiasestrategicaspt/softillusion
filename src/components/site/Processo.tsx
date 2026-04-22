import { PhoneCall, ClipboardCheck, Wrench, ShieldCheck } from "lucide-react";

const passos = [
  { icon: PhoneCall, n: "01", titulo: "Contacto", desc: "Liga, envia WhatsApp ou preenche o formulário." },
  { icon: ClipboardCheck, n: "02", titulo: "Diagnóstico", desc: "Avaliamos a situação e damos orçamento imediato." },
  { icon: Wrench, n: "03", titulo: "Intervenção", desc: "Equipa no local, muitas vezes no próprio dia." },
  { icon: ShieldCheck, n: "04", titulo: "Garantia", desc: "Trabalho garantido e acompanhamento pós-serviço." },
];

export const Processo = () => {
  return (
    <section className="relative py-20 md:py-28 bg-secondary">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Como funciona
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
            Quatro passos. Problema resolvido.
          </h2>
        </div>

        <div className="mt-14 relative">
          {/* Linha decorativa */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand/0 via-brand to-brand/0" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {passos.map((p, idx) => (
              <div
                key={p.n}
                className="reveal relative text-center"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="relative mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-card border-4 border-brand shadow-elevated">
                  <p.icon className="h-10 w-10 text-brand" />
                  <span className="absolute -top-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-white text-xs font-extrabold shadow-brand">
                    {p.n}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">{p.titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};