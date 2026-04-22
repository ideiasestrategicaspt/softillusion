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
                <svg viewBox="0 0 200 320" className="h-full w-full" aria-label="Mapa de Portugal Continental">
                  <defs>
                    <linearGradient id="ptGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="hsl(204, 70%, 63%)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="hsl(209, 64%, 29%)" stopOpacity="0.7" />
                    </linearGradient>
                    <filter id="ptGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  {/* Silhueta de Portugal Continental — desenhada à mão, fiel ao contorno real */}
                  <path
                    d="M62,18 L78,14 L92,18 L104,14 L118,20 L128,30 L132,44 L130,58 L138,68 L140,82 L134,92 L138,104 L144,116 L142,130 L148,142 L150,156 L146,170 L150,184 L148,198 L142,210 L138,224 L142,238 L138,252 L130,264 L122,274 L110,282 L96,286 L82,282 L74,272 L70,258 L66,244 L62,230 L60,214 L58,198 L56,182 L54,166 L56,150 L52,136 L50,120 L52,104 L48,90 L52,76 L56,62 L58,46 L60,30 Z"
                    fill="url(#ptGrad)"
                    stroke="hsl(204, 70%, 73%)"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    filter="url(#ptGlow)"
                  />
                  {/* Rios principais — Douro e Tejo, traços leves */}
                  <path d="M58,80 Q80,84 100,82 Q118,80 132,86" fill="none" stroke="hsl(204, 70%, 73%)" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
                  <path d="M56,176 Q78,180 96,178 Q116,176 132,182" fill="none" stroke="hsl(204, 70%, 73%)" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.55" />
                  {/* Pontos das cidades principais */}
                  {[
                    { x: 92, y: 48, label: "Braga" },
                    { x: 80, y: 72, label: "Porto" },
                    { x: 118, y: 92, label: "Guarda" },
                    { x: 88, y: 122, label: "Coimbra" },
                    { x: 64, y: 188, label: "Lisboa" },
                    { x: 108, y: 212, label: "Évora" },
                    { x: 92, y: 268, label: "Faro" },
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
                  <line x1="140" y1="70" x2="172" y2="70" stroke="hsl(204, 70%, 63%)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="146" y="64" fill="hsl(204, 70%, 73%)" fontSize="6" fontWeight="600">
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