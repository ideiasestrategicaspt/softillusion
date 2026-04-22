import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { COMPANY } from "@/lib/constants";
import { Loader2, Mail, LogOut, Phone } from "lucide-react";
import logo from "@/assets/softillusion-logo.png";

type Pedido = {
  id: string;
  criado_em: string;
  tipo_servico: string;
  estado: string;
  localidade: string;
  urgencia: string;
};

const ESTADO_LABEL: Record<string, { label: string; color: string }> = {
  novo: { label: "Novo", color: "bg-brand/10 text-brand" },
  em_contacto: { label: "Em contacto", color: "bg-accent/20 text-primary" },
  orcamento_enviado: { label: "Orçamento enviado", color: "bg-success/10 text-success" },
  adjudicado: { label: "Adjudicado", color: "bg-success/20 text-success" },
  concluido: { label: "Concluído", color: "bg-muted text-muted-foreground" },
  perdido: { label: "Perdido", color: "bg-destructive/10 text-destructive" },
};

const AreaCliente = () => {
  const [session, setSession] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [sendingLink, setSendingLink] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("pedidos_orcamento")
      .select("id, criado_em, tipo_servico, estado, localidade, urgencia")
      .order("criado_em", { ascending: false })
      .then(({ data }) => setPedidos((data ?? []) as Pedido[]));
  }, [session]);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingLink(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/area-cliente` },
    });
    setSendingLink(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-brand" /></div>;

  if (!session) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl bg-card border border-border p-8 md:p-10 shadow-elevated">
          <a href="/"><img src={logo} alt="Softillusion" className="h-12 mb-6" /></a>
          <h1 className="text-2xl font-extrabold text-foreground">Área de cliente</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Receba um link mágico no seu email para entrar. Sem passwords.
          </p>

          {sent ? (
            <div className="mt-6 rounded-xl bg-success/10 border border-success/30 p-5 text-sm text-foreground">
              <Mail className="h-5 w-5 text-success mb-2" />
              <p className="font-semibold">Link enviado!</p>
              <p className="text-muted-foreground mt-1">Verifique a sua caixa de entrada e clique no link para entrar.</p>
            </div>
          ) : (
            <form onSubmit={sendMagicLink} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                  placeholder="o.seu@email.com"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button
                type="submit"
                disabled={sendingLink}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-brand-foreground shadow-brand hover:brightness-110 disabled:opacity-60"
              >
                {sendingLink ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
                Enviar link de acesso
              </button>
            </form>
          )}

          <a href="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground">← Voltar à página principal</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-ink text-white">
        <div className="container-page flex items-center justify-between h-16">
          <a href="/"><img src={logo} alt="Softillusion" className="h-9" /></a>
          <button
            onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </header>

      <main className="container-page py-10">
        <h1 className="text-3xl font-extrabold text-foreground">Os meus pedidos</h1>
        <p className="mt-1 text-muted-foreground">Acompanhe o estado dos seus pedidos de orçamento e intervenções.</p>

        <div className="mt-8 grid gap-4">
          {pedidos.length === 0 ? (
            <div className="rounded-2xl bg-card border border-border p-10 text-center">
              <p className="text-muted-foreground">Ainda não tem pedidos.</p>
              <a href="/#orcamento" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground">
                Pedir orçamento
              </a>
            </div>
          ) : (
            pedidos.map((p) => {
              const e = ESTADO_LABEL[p.estado] ?? { label: p.estado, color: "bg-muted text-foreground" };
              return (
                <article key={p.id} className="rounded-2xl bg-card border border-border p-5 shadow-soft flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      #{p.id.slice(0, 8).toUpperCase()} · {new Date(p.criado_em).toLocaleDateString("pt-PT")}
                    </div>
                    <div className="mt-1 font-bold text-foreground">{p.tipo_servico}</div>
                    <div className="text-sm text-muted-foreground">{p.localidade} · Urgência: {p.urgencia.replace("_", " ")}</div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${e.color}`}>{e.label}</span>
                </article>
              );
            })
          )}
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-brand p-6 text-white flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="font-bold">Precisa de ajuda imediata?</div>
            <div className="text-sm text-white/85">Estamos disponíveis 24h.</div>
          </div>
          <a href={`tel:${COMPANY.phone}`} className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-5 py-3 font-extrabold uppercase text-sm">
            <Phone className="h-4 w-4" /> {COMPANY.phoneDisplay}
          </a>
        </div>
      </main>
    </div>
  );
};

export default AreaCliente;