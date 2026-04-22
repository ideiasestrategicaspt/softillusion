import { MapPin } from "lucide-react";
import { DISTRITOS } from "@/lib/constants";
import portugalMap from "@/assets/portugal-map.png";

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
                {/* Mapa real de Portugal Continental como base, com overlay azul brand */}
                <div className="relative h-full w-full">
                  <img
                    src={portugalMap}
                    alt="Mapa de Portugal Continental"
                    className="absolute inset-0 h-full w-full object-contain opacity-90"
                    style={{
                      filter:
                        "invert(1) sepia(1) saturate(6) hue-rotate(175deg) brightness(1.05) drop-shadow(0 0 8px hsl(204 70% 63% / 0.6))",
                    }}
                  />
                  {/* Pontos das cidades principais sobrepostos (coordenadas em % relativas ao mapa) */}
                  <svg
                    viewBox="0 0 200 380"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden
                  >
                    {[
                      { x: 78, y: 48, label: "Braga" },
                      { x: 70, y: 72, label: "Porto" },
                      { x: 130, y: 100, label: "Guarda" },
                      { x: 84, y: 138, label: "Coimbra" },
                      { x: 62, y: 232, label: "Lisboa" },
                      { x: 116, y: 252, label: "Évora" },
                      { x: 96, y: 332, label: "Faro" },
                    ].map((p) => (
                      <g key={p.label}>
                        <circle cx={p.x} cy={p.y} r="6" fill="hsl(204, 60%, 47%)" opacity="0.4">
                          <animate attributeName="r" values="6;12;6" dur="2.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={p.x} cy={p.y} r="3.2" fill="hsl(204, 70%, 73%)" />
                        <text x={p.x + 7} y={p.y + 3} fill="white" fontSize="7" fontWeight="600">
                          {p.label}
                        </text>
                      </g>
                    ))}
                    <line x1="140" y1="70" x2="172" y2="70" stroke="hsl(204, 70%, 63%)" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="144" y="64" fill="hsl(204, 70%, 73%)" fontSize="6" fontWeight="600">
                      Fronteira ES
                    </text>
                  </svg>
                </div>
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