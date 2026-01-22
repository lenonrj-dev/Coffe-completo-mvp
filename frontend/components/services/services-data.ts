export type ServiceItem = {
  title: string;
  desc: string;
  badge?: string;
};

export type RecipeTemplate = {
  title: string;
  level: "Fácil" | "Médio" | "Avançado";
  time: string;
  excerpt: string;
  tags: string[];
};

export const servicesData = {
  hero: {
    title: "Serviços CoffeeCafe",
    subtitle:
      "Experiências reais pra quem ama café: do pedido rápido às receitas autorais.",
    ctaPrimary: "Ver menu completo",
    ctaSecondary: "Falar com a equipe",
    note: "Atendimento profissional • Qualidade premium • Ritmo de cafeteria",
  },

  services: {
    title: "O que entregamos",
    desc: "Tudo pensado para acelerar seu pedido e elevar a experiência do primeiro ao último gole.",
    items: [
      {
        title: "Pedido rápido e seguro",
        desc: "Monte sua sacola, revise e finalize com praticidade. Ideal pra retirada no balcão.",
        badge: "Mais pedido",
      },
      {
        title: "Bebidas autorais e clássicos",
        desc: "Espresso, cappuccino, latte, gelados e receitas da casa — sempre bem equilibradas.",
      },
      {
        title: "Grãos selecionados",
        desc: "Opções de grãos com perfil aromático e torra pensada pra realçar notas de sabor.",
      },
      {
        title: "Receitas e dicas semanais",
        desc: "Conteúdo pra você preparar em casa e entender melhor métodos, moagem e extração.",
      },
      {
        title: "Experiência para eventos",
        desc: "Estrutura para ações, degustações e combos — perfeito para empresas e parceiros.",
      },
      {
        title: "Canal de vagas e equipe",
        desc: "Área de trabalhe conosco com posições abertas e candidatura rápida.",
      },
    ] as ServiceItem[],
  },

  story: {
    title: "Nossa história (de verdade)",
    desc: "Um café bom não é só bebida. É rotina, encontro e uma assinatura de sabor que vira memória.",
    blocks: [
      {
        title: "Aroma e cuidado em cada etapa",
        desc: "Selecionamos, testamos e equilibramos receitas para entregar consistência. Do primeiro contato ao último detalhe do preparo.",
      },
      {
        title: "Receitas que viram ritual",
        desc: "Nosso cardápio foi pensado pra encaixar na sua rotina — rápido quando precisa, especial quando merece.",
      },
      {
        title: "Conforto, textura e sabor",
        desc: "A gente acredita que o café perfeito é aquele que chega na temperatura certa, com cremosidade e doçura na medida.",
      },
    ],
  },

  mosaic: {
    title: "Experiência visual que dá vontade",
    desc: "Imagens bem construídas ajudam você a escolher com mais confiança — e deixam tudo mais gostoso só de olhar.",
    images: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=80",
    ],
  },

  templates: {
    title: "Templates de receitas",
    desc: "Modelos prontos pra você publicar no blog e virar referência de café na sua região.",
    items: [
      {
        title: "Latte cremoso (clássico)",
        level: "Fácil",
        time: "6 min",
        excerpt:
          "Uma receita rápida pra quem curte suavidade com aroma forte e final macio.",
        tags: ["Leite", "Espresso", "Cremoso"],
      },
      {
        title: "Cappuccino com toque doce",
        level: "Médio",
        time: "8 min",
        excerpt:
          "Textura intensa, espuma bem construída e aquele gosto de cafeteria de verdade.",
        tags: ["Espuma", "Canela", "Aconchego"],
      },
      {
        title: "Gelado com notas de caramelo",
        level: "Médio",
        time: "10 min",
        excerpt:
          "Equilíbrio perfeito entre refrescância e doçura — ideal pra dias quentes.",
        tags: ["Gelado", "Doce", "Refrescante"],
      },
      {
        title: "Americano equilibrado",
        level: "Fácil",
        time: "5 min",
        excerpt:
          "Leve, aromático e direto ao ponto. Ótimo pra manter energia sem pesar.",
        tags: ["Clássico", "Leve", "Aroma"],
      },
      {
        title: "Mocha premium (chocolate)",
        level: "Avançado",
        time: "12 min",
        excerpt:
          "Camadas de sabor, intensidade de chocolate e final marcante. Um espetáculo.",
        tags: ["Chocolate", "Intenso", "Premium"],
      },
    ] as RecipeTemplate[],
  },

  cta: {
    title: "Quer uma experiência de café de outro nível?",
    desc: "Monte sua sacola agora e finalize em poucos cliques. Rápido, bonito e do jeito certo.",
    buttonPrimary: "Ir para o menu",
    buttonSecondary: "Abrir contato",
  },
} as const;
