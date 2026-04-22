import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Phone, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2,
  Home, Building2, Droplet, Truck, Container, Wind, ChefHat, Waves, Fuel, type LucideIcon,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY, SERVICOS, DISTRITOS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Droplet, Truck, Container, Wind, ChefHat, Waves, Fuel,
};

const URGENCIAS = [
  { id: "imediato" as const, emoji: "🔴", titulo: "Imediato", desc: "Nas próximas horas" },
  { id: "hoje_amanha" as const, emoji: "🟡", titulo: "Hoje ou amanhã", desc: "Com alguma urgência" },
  { id: "semana" as const, emoji: "🟢", titulo: "Esta semana", desc: "Sem pressa" },
];

const schema = z.object({
  tipo_servico: z.string().min(1, "Selecione o serviço"),
  urgencia: z.enum(["imediato", "hoje_amanha", "semana"], { message: "Selecione a urgência" }),
  distrito: z.string().min(1, "Distrito obrigatório"),
  localidade: z.string().trim().min(2, "Localidade obrigatória").max(100),
  tipo_cliente: z.enum(["particular", "empresa"], { message: "Selecione o tipo" }),
  empresa_nome: z.string().trim().max(120).optional(),
  empresa_nif: z.string().trim().max(20).optional(),
  nome: z.string().trim().min(2, "Nome obrigatório").max(120),
  telefone: z.string().trim().regex(/^(\+?351\s?)?\d{9}$/, "Telemóvel inválido (9 dígitos)"),
  email: z.string().trim().email("Email inválido").max(255),
  descricao: z.string().trim().max(1000).optional(),
  aceita_marketing: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export const QuoteForm = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      tipo_servico: "",
      distrito: "",
      localidade: "",
      nome: "",
      telefone: "",
      email: "",
      descricao: "",
      aceita_marketing: false,
    },
  });

  const { register, watch, setValue, handleSubmit, formState: { errors }, trigger, reset } = form;
  const v = watch();

  // Auto-preenche serviço quando o utilizador clica num cartão de serviço
  useEffect(() => {
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest("[data-servico]") as HTMLElement | null;
      if (target?.dataset.servico) {
        setValue("tipo_servico", target.dataset.servico, { shouldValidate: true });
        document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [setValue]);

  const next = async () => {
    const fields: (keyof FormData)[] =
      step === 1 ? ["tipo_servico", "urgencia"]
      : ["distrito", "localidade", "tipo_cliente"];
    const ok = await trigger(fields);
    if (ok) setStep((s) => (s + 1) as 1 | 2 | 3);
  };

  const prev = () => setStep((s) => (s - 1) as 1 | 2 | 3);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const { data: invokeData, error: invokeError } = await supabase.functions.invoke("submit-quote", {
        body: data,
      });
      if (invokeError) throw invokeError;
      const refId = (invokeData as { id?: string })?.id?.slice(0, 8).toUpperCase() ?? "—";
      setSuccess(refId);
      reset();
      setStep(1);
    } catch (e) {
      console.error("Erro ao submeter:", e);
      setError("Não foi possível enviar o pedido. Tente novamente ou ligue diretamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section id="orcamento" className="py-20 md:py-28 bg-secondary">
        <div className="container-page">
          <div className="mx-auto max-w-2xl rounded-3xl bg-card border border-border p-10 md:p-14 text-center shadow-elevated animate-float-up">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-foreground">
              Pedido recebido! 🎯
            </h2>
            <p className="mt-4 text-base text-muted-foreground">
              A nossa equipa está já a analisar o seu caso e liga-lhe em menos de
              30 minutos. O seu número de referência é{" "}
              <span className="font-mono font-bold text-foreground">#{success}</span>.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Entretanto, guarde já o nosso contacto direto:
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${COMPANY.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-brand-foreground shadow-brand hover:brightness-110"
              >
                <Phone className="h-4 w-4" /> {COMPANY.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-foreground/20 px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-foreground hover:bg-foreground hover:text-background"
              >
                Adicionar ao WhatsApp
              </a>
            </div>
            <button
              type="button"
              onClick={() => setSuccess(null)}
              className="mt-8 text-sm text-muted-foreground hover:text-foreground underline"
            >
              Submeter outro pedido
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="orcamento" className="py-20 md:py-28 bg-secondary">
      <div className="container-page">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Pedido de orçamento
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-foreground">
            Peça o seu orçamento gratuito em 60 segundos
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            Resposta em menos de 30 minutos em horário comercial. Sem compromisso,
            sem custos ocultos. Para emergências 24h, ligue diretamente.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12 mx-auto max-w-3xl rounded-3xl bg-card border border-border p-6 md:p-10 shadow-elevated reveal"
        >
          {/* Barra de progresso (Efeito Zeigarnik) */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
              <span>Passo {step} de 3</span>
              <span>{Math.round((step / 3) * 100)}% concluído</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-gradient-brand transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Passo 1 */}
          {step === 1 && (
            <div className="space-y-7 animate-float-up">
              <div>
                <label className="block text-sm font-bold text-foreground mb-3">
                  Que tipo de serviço precisa? <span className="text-destructive">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {SERVICOS.map((s) => {
                    const Icon = ICONS[s.icon] ?? Droplet;
                    const selected = v.tipo_servico === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setValue("tipo_servico", s.id, { shouldValidate: true })}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-3 text-center transition-all hover:scale-[1.03]",
                          selected
                            ? "border-brand bg-brand/5 shadow-brand"
                            : "border-border bg-background hover:border-brand/40"
                        )}
                      >
                        <Icon className={cn("h-6 w-6", selected ? "text-brand" : "text-muted-foreground")} />
                        <span className="text-xs font-semibold text-foreground leading-tight">{s.titulo}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.tipo_servico && <FieldError msg={errors.tipo_servico.message} />}
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-3">
                  Qual o grau de urgência? <span className="text-destructive">*</span>
                </label>
                <div className="grid sm:grid-cols-3 gap-2.5">
                  {URGENCIAS.map((u) => {
                    const selected = v.urgencia === u.id;
                    return (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setValue("urgencia", u.id, { shouldValidate: true })}
                        className={cn(
                          "rounded-xl border-2 p-4 text-left transition-all",
                          selected
                            ? "border-brand bg-brand/5 shadow-brand"
                            : "border-border bg-background hover:border-brand/40"
                        )}
                      >
                        <div className="text-2xl">{u.emoji}</div>
                        <div className="mt-1 font-bold text-foreground text-sm">{u.titulo}</div>
                        <div className="text-xs text-muted-foreground">{u.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {errors.urgencia && <FieldError msg={errors.urgencia.message} />}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-brand-foreground shadow-brand hover:brightness-110 hover:scale-[1.02] transition-all"
                >
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Passo 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-float-up">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Distrito *" error={errors.distrito?.message}>
                  <select
                    {...register("distrito")}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="">Selecione o distrito</option>
                    {DISTRITOS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Localidade / Concelho *" error={errors.localidade?.message}>
                  <input
                    {...register("localidade")}
                    placeholder="Ex: Cascais, Vila Nova de Gaia"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </Field>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground mb-3">
                  Tipo de cliente <span className="text-destructive">*</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "particular", icon: Home, titulo: "Particular / Doméstico" },
                    { id: "empresa", icon: Building2, titulo: "Empresa / Industrial" },
                  ].map((opt) => {
                    const selected = v.tipo_cliente === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setValue("tipo_cliente", opt.id as "particular" | "empresa", { shouldValidate: true })}
                        className={cn(
                          "flex items-center gap-3 rounded-xl border-2 p-4 transition-all",
                          selected
                            ? "border-brand bg-brand/5 shadow-brand"
                            : "border-border bg-background hover:border-brand/40"
                        )}
                      >
                        <Icon className={cn("h-7 w-7", selected ? "text-brand" : "text-muted-foreground")} />
                        <span className="font-bold text-foreground">{opt.titulo}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.tipo_cliente && <FieldError msg={errors.tipo_cliente.message} />}
              </div>

              {v.tipo_cliente === "empresa" && (
                <div className="grid sm:grid-cols-2 gap-4 animate-float-up">
                  <Field label="Nome da empresa">
                    <input
                      {...register("empresa_nome")}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </Field>
                  <Field label="NIF (opcional)">
                    <input
                      {...register("empresa_nif")}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                    />
                  </Field>
                </div>
              )}

              <div className="flex justify-between">
                <button type="button" onClick={prev} className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted">
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
                <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-sm font-extrabold uppercase tracking-wide text-brand-foreground shadow-brand hover:brightness-110 hover:scale-[1.02] transition-all">
                  Continuar <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Passo 3 */}
          {step === 3 && (
            <div className="space-y-5 animate-float-up">
              <Field label="Nome completo *" error={errors.nome?.message}>
                <input
                  {...register("nome")}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Telemóvel *" error={errors.telefone?.message}>
                  <input
                    {...register("telefone")}
                    inputMode="tel"
                    placeholder="+351 912 345 678"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </Field>
                <Field label="Email *" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    inputMode="email"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                </Field>
              </div>
              <Field label="Breve descrição da situação (opcional)">
                <textarea
                  {...register("descricao")}
                  rows={3}
                  placeholder="Ex: autoclismo entupido desde ontem, água não escoa..."
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-none"
                />
              </Field>

              {error && (
                <div className="flex items-start gap-2 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <p className="text-xs text-muted-foreground text-center">
                🔒 Os seus dados estão seguros · Nunca partilhamos informação
              </p>

              <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                <button type="button" onClick={prev} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted">
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-brand-foreground shadow-brand hover:brightness-110 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> A enviar...</>
                  ) : (
                    <>Pedir orçamento gratuito <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Resposta em menos de 30 min em horário comercial.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-bold text-foreground mb-1.5">{label}</label>
    {children}
    {error && <FieldError msg={error} />}
  </div>
);

const FieldError = ({ msg }: { msg?: string }) => (
  <p className="mt-1.5 text-xs text-destructive font-medium flex items-center gap-1">
    <AlertCircle className="h-3 w-3" /> {msg}
  </p>
);