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
      "Cozinha inundada num domingo à noite. Em 25 minutos estavam cá e resolveram em menos de uma hora. Preço igual ao combinado ao telefone.",
  },
  {
    nome: "João P.",
    localidade: "Porto",
    servico: "Manutenção B2B — Restauração",
    rating: 5,
    texto:
      "Temos contrato anual para manutenção dos separadores de gordura nos restaurantes. Pontuais, profissionais e com relatórios detalhados sempre.",
  },
  {
    nome: "Ana R.",
    localidade: "Braga",
    servico: "Limpeza de fossa",
    rating: 5,
    texto:
      "Marquei para a manhã seguinte e foi tudo rápido e limpo. Trouxeram guia de resíduos e deixaram o terreno como estava. Excelente.",
  },
  {
    nome: "Ricardo M.",
    localidade: "Évora",
    servico: "Camião hidroaspirador",
    rating: 5,
    texto:
      "Coletor da fábrica totalmente entupido. Vieram no próprio dia com o camião hidroaspirador e em poucas horas estava resolvido.",
  },
  {
    nome: "Sofia L.",
    localidade: "Lisboa",
    servico: "Desentupimento doméstico",
    rating: 5,
    texto:
      "Atendimento ao telefone simpático e tranquilizador. Técnico fardado, identificado e muito profissional. Preço justo — já guardei o contacto.",
  },
  {
    nome: "Pedro G.",
    localidade: "Faro",
    servico: "Estação elevatória — Condomínio",
    rating: 5,
    texto:
      "Como administrador de condomínio é difícil achar fornecedores fiáveis. Entregam relatório por escrito e fatura mensal — exatamente o que precisamos.",
  },
] as const;

/* PLACEHOLDER: Substituir por testemunhos reais com nomes e localidades verificadas. */