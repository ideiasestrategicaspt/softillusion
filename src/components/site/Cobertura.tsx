import { MapPin } from "lucide-react";
import { DISTRITOS } from "@/lib/constants";

const principais = ["Lisboa","Porto","Coimbra","Braga","Faro","Évora","Viseu","Guarda","Bragança"];

export const Cobertura = () => {
  return (
    <section id="cobertura" className="relative py-20 md:py-28 bg-secondary">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Cobertura nacional
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
            Intervimos em todo Portugal Continental
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Com equipas distribuídas estrategicamente e presença reforçada na zona
            fronteiriça com Espanha, garantimos tempos de resposta reduzidos de norte
            a sul do país.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
          {/* Mapa estilizado */}
          <div className="relative reveal">
            <div className="relative aspect-[4/5] mx-auto max-w-md rounded-3xl bg-gradient-brand p-1 shadow-elevated">
              <div className="relative h-full w-full rounded-[22px] bg-ink p-6 overflow-hidden">
                <svg viewBox="0 0 200 280" className="h-full w-full" aria-label="Mapa de Portugal Continental">
                  {/* Forma estilizada de Portugal */}
                  <defs>
                    <linearGradient id="ptGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="hsl(204, 70%, 63%)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="hsl(209, 64%, 29%)" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M70,15 Q60,30 65,55 Q55,75 60,95 Q50,115 55,140 Q45,165 50,195 Q55,225 70,255 Q90,268 110,260 Q125,245 130,220 Q140,195 135,170 Q145,145 140,120 Q150,95 145,70 Q140,40 120,25 Q95,10 70,15 Z"
                    fill="url(#ptGrad)"
                    stroke="hsl(204, 70%, 63%)"
                    strokeWidth="1.5"
                  />
                  {/* Pontos das cidades principais */}
                  {[
                    { x: 95, y: 50, label: "Braga" },
                    { x: 90, y: 75, label: "Porto" },
                    { x: 95, y: 130, label: "Coimbra" },
                    { x: 80, y: 175, label: "Lisboa" },
                    { x: 110, y: 200, label: "Évora" },
                    { x: 105, y: 245, label: "Faro" },
                    { x: 130, y: 100, label: "Guarda" },
                  ].map((p) => (
                    <g key={p.label}>
                      <circle cx={p.x} cy={p.y} r="6" fill="hsl(204, 60%, 47%)" opacity="0.4">
                        <animate attributeName="r" values="6;12;6" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={p.x} cy={p.y} r="3.5" fill="hsl(204, 70%, 63%)" />
                      <text x={p.x + 8} y={p.y + 3} fill="white" fontSize="7" fontWeight="600">
                        {p.label}
                      </text>
                    </g>
                  ))}
                  {/* Indicação fronteira */}
                  <line x1="135" y1="60" x2="160" y2="60" stroke="hsl(204, 70%, 63%)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="142" y="55" fill="hsl(204, 70%, 73%)" fontSize="6" fontWeight="600">
                    Fronteira ES
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Lista de distritos */}
          <div className="reveal">
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-brand" />
              Onde atendemos
            </h3>
            <p className="text-muted-foreground mb-6">
              Atendemos também a <strong className="text-foreground">zona fronteiriça Portugal-Espanha</strong>.
              Cidades com tempo médio de resposta ≤ 35 min:
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {principais.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-card border border-brand/20 px-4 py-1.5 text-sm font-semibold text-primary shadow-soft"
                >
                  {c}
                </span>
              ))}
            </div>
            <details className="rounded-xl border border-border bg-card p-5">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Ver todos os distritos cobertos
              </summary>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-muted-foreground">
                {DISTRITOS.map((d) => (
                  <span key={d}>· {d}</span>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};