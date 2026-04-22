
-- Pedidos de orçamento submetidos pela landing
CREATE TABLE public.pedidos_orcamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  tipo_cliente TEXT NOT NULL CHECK (tipo_cliente IN ('particular','empresa')),
  empresa_nome TEXT,
  empresa_nif TEXT,
  tipo_servico TEXT NOT NULL,
  urgencia TEXT NOT NULL CHECK (urgencia IN ('imediato','hoje_amanha','semana')),
  distrito TEXT NOT NULL,
  localidade TEXT NOT NULL,
  descricao TEXT,
  aceita_marketing BOOLEAN NOT NULL DEFAULT false,
  estado TEXT NOT NULL DEFAULT 'novo' CHECK (estado IN ('novo','em_contacto','orcamento_enviado','adjudicado','perdido','concluido')),
  notas_internas TEXT,
  origem TEXT DEFAULT 'landing'
);

CREATE INDEX idx_pedidos_email ON public.pedidos_orcamento (lower(email));
CREATE INDEX idx_pedidos_criado_em ON public.pedidos_orcamento (criado_em DESC);

ALTER TABLE public.pedidos_orcamento ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode submeter (formulário público)
CREATE POLICY "Public can insert quote requests"
  ON public.pedidos_orcamento FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Cliente autenticado só vê os seus próprios pedidos (match por email)
CREATE POLICY "Users see own quote requests"
  ON public.pedidos_orcamento FOR SELECT
  TO authenticated
  USING (lower(email) = lower(auth.jwt() ->> 'email'));

-- Histórico de intervenções
CREATE TABLE public.intervencoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  cliente_email TEXT NOT NULL,
  pedido_id UUID REFERENCES public.pedidos_orcamento(id) ON DELETE SET NULL,
  tipo_servico TEXT NOT NULL,
  data_intervencao DATE NOT NULL,
  localidade TEXT,
  descricao TEXT,
  estado TEXT NOT NULL DEFAULT 'agendada' CHECK (estado IN ('agendada','em_curso','concluida','cancelada')),
  valor_total NUMERIC(10,2),
  documento_url TEXT
);

CREATE INDEX idx_intervencoes_cliente ON public.intervencoes (lower(cliente_email));

ALTER TABLE public.intervencoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own interventions"
  ON public.intervencoes FOR SELECT
  TO authenticated
  USING (lower(cliente_email) = lower(auth.jwt() ->> 'email'));
