// Configuração central da landing — fácil de atualizar sem caçar pelo código

export const COMPANY = {
  name: "Softillusion",
  tagline: "Desentupimentos & Aspirações",
  phone: "+351967097617",
  phoneDisplay: "967 097 617",
  whatsapp: "351967097617",
  email: "softillusiondesentupimentos@gmail.com",
  emailB2B: "softillusiondesentupimentos@gmail.com",
  serviceArea: "Portugal Continental e zona fronteiriça com Espanha",
} as const;

export const STATS = {
  intervencoes: "+1000",
  anos: "+10",
  rating: "4.8/5",
  taxaResolucao: "98%",
  tempoChegadaMin: "50",
} as const;

export const DISTRITOS = [
  "Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro",
  "Guarda","Leiria","Lisboa","Portalegre","Porto","Santarém","Setúbal","Viana do Castelo",
  "Vila Real","Viseu","Zona fronteiriça Espanha"
] as const;

export const SERVICOS = [
  {
    id: "domestico",
    titulo: "Desentupimento doméstico geral",
    descricao:
      "Desobstrução rápida de pias, lavatórios, sanitários, bidés, ralos, bacias de retrete e tubos de queda. Intervenção no próprio dia, sem danificar materiais nem fazer obras desnecessárias.",
    icon: "Droplet",
  },
  {
    id: "hidroaspirador",
    titulo: "Camião hidroaspirador",
    descricao:
      "Frota própria de camiões de alta pressão para intervenções de grande dimensão em canalizações, coletores, redes prediais e industriais. Jato de água + aspiração simultânea.",
    icon: "Truck",
  },
  {
    id: "fossas",
    titulo: "Limpeza de fossas",
    descricao:
      "Aspiração, limpeza e transporte de resíduos de fossas sépticas, estanques e de grande volume. Destino legal certificado e documentação entregue ao cliente.",
    icon: "Container",
  },
  {
    id: "aspiracao",
    titulo: "Aspiração industrial",
    descricao:
      "Aspiração industrial e comercial para estaleiros, fábricas, armazéns, garagens, parques e espaços de grande dimensão. Lamas, líquidos, sólidos e materiais contaminados.",
    icon: "Wind",
  },
  {
    id: "gordura",
    titulo: "Separador de gordura",
    descricao:
      "Manutenção e limpeza periódica de separadores em restaurantes, cantinas, hotéis e unidades industriais de confeção. Intervenção discreta, sem paragem do serviço.",
    icon: "ChefHat",
  },
  {
    id: "elevatoria",
    titulo: "Limpeza de estação elevatória",
    descricao:
      "Aspiração, desobstrução de bombas, limpeza de poços e remoção de depósitos em estações elevatórias de águas residuais e pluviais. Autarquias, gestão de águas e condomínios.",
    icon: "Waves",
  },
  {
    id: "hidrocarbonetos",
    titulo: "Caixa de hidrocarbonetos",
    descricao:
      "Limpeza especializada de caixas e separadores de hidrocarbonetos em estações de serviço, oficinas e unidades industriais. Tratamento legal de resíduos.",
    icon: "Fuel",
  },
] as const;

export type ServicoId = typeof SERVICOS[number]["id"];

export const TESTEMUNHOS = [
  {
    nome: "Maria S.",
    localidade: "Cascais",
    servico: "Desentupimento doméstico",
    rating: 5,
    texto:
      "Tive a cozinha inundada às 22h de um domingo. Liguei para a Softillusion e em 25 minutos estavam cá. Resolveram tudo em menos de uma hora, sem sujar nada. Preço igual ao combinado ao telefone. Recomendo a olhos fechados.",
  },
  {
    nome: "João P.",
    localidade: "Porto",
    servico: "Manutenção B2B — Restauração",
    rating: 5,
    texto:
      "Gerimos uma cadeia de restaurantes e temos contrato anual com a Softillusion para manutenção dos separadores de gordura. Profissionais, pontuais, com relatórios detalhados. Nunca tivemos um problema grave desde que começámos com eles.",
  },
  {
    nome: "Ana R.",
    localidade: "Braga",
    servico: "Limpeza de fossa",
    rating: 5,
    texto:
      "Marquei para a manhã seguinte e foi tudo rápido e limpo. Trouxeram a guia de transporte de resíduos, explicaram tudo e deixaram o terreno como estava. Excelente serviço.",
  },
  {
    nome: "Ricardo M.",
    localidade: "Évora",
    servico: "Camião hidroaspirador",
    rating: 5,
    texto:
      "Coletor de uma fábrica completamente entupido. A equipa chegou no próprio dia com o camião hidroaspirador e em poucas horas estava resolvido. Recomendo a empresas que precisem de resposta industrial séria.",
  },
  {
    nome: "Sofia L.",
    localidade: "Lisboa",
    servico: "Desentupimento doméstico",
    rating: 5,
    texto:
      "Atendimento incrível ao telefone, a Sra. foi simpática e tranquilizou-me. Veio um técnico fardado, identificado, super profissional. Preço justo. Já guardei o contacto.",
  },
  {
    nome: "Pedro G.",
    localidade: "Faro",
    servico: "Estação elevatória — Condomínio",
    rating: 5,
    texto:
      "Como administrador de condomínio é difícil encontrar fornecedores fiáveis. A Softillusion entrega relatório por escrito e factura mensal — exactamente o que precisamos para a contabilidade.",
  },
] as const;

/* PLACEHOLDER: Substituir por testemunhos reais com nomes e localidades verificadas. */