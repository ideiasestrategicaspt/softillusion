import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BodySchema = z.object({
  nome: z.string().trim().min(2).max(120),
  telefone: z.string().trim().regex(/^(\+?351\s?)?\d{9}$/),
  email: z.string().trim().email().max(255),
  tipo_cliente: z.enum(["particular", "empresa"]),
  empresa_nome: z.string().trim().max(120).optional().nullable(),
  empresa_nif: z.string().trim().max(20).optional().nullable(),
  tipo_servico: z.string().min(1).max(60),
  urgencia: z.enum(["imediato", "hoje_amanha", "semana"]),
  distrito: z.string().min(1).max(60),
  localidade: z.string().trim().min(2).max(100),
  descricao: z.string().trim().max(1000).optional().nullable(),
  aceita_marketing: z.boolean().optional(),
});

// Rate limiting in-memory (best-effort, sandbox-safe)
const RATE: Map<string, { count: number; reset: number }> = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function checkRate(key: string): boolean {
  const now = Date.now();
  const entry = RATE.get(key);
  if (!entry || entry.reset < now) {
    RATE.set(key, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!checkRate(ip)) {
      return json({ error: "Demasiadas submissões. Tente novamente em alguns minutos." }, 429);
    }

    const raw = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return json({ error: "Dados inválidos", details: parsed.error.flatten().fieldErrors }, 400);
    }
    const data = parsed.data;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: inserted, error } = await supabase
      .from("pedidos_orcamento")
      .insert({
        nome: data.nome,
        telefone: data.telefone,
        email: data.email,
        tipo_cliente: data.tipo_cliente,
        empresa_nome: data.empresa_nome ?? null,
        empresa_nif: data.empresa_nif ?? null,
        tipo_servico: data.tipo_servico,
        urgencia: data.urgencia,
        distrito: data.distrito,
        localidade: data.localidade,
        descricao: data.descricao ?? null,
        aceita_marketing: data.aceita_marketing ?? false,
      })
      .select("id")
      .single();

    if (error) {
      console.error("DB insert error:", error);
      return json({ error: "Erro ao guardar o pedido." }, 500);
    }

    // Notificar internamente — best effort, não bloqueia a resposta ao cliente
    notifyInternal(data, inserted.id).catch((e) => console.error("Notification failed:", e));

    return json({ ok: true, id: inserted.id }, 200);
  } catch (e) {
    console.error("Unexpected error:", e);
    return json({ error: "Erro inesperado." }, 500);
  }
});

async function notifyInternal(data: z.infer<typeof BodySchema>, id: string) {
  // Opcional: enviar para webhook/Sheets se configurado.
  const sheetsWebhook = Deno.env.get("SHEETS_WEBHOOK_URL");
  if (sheetsWebhook) {
    await fetch(sheetsWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, criado_em: new Date().toISOString(), ...data }),
    });
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}