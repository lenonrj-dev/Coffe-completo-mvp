export type DrinkItem = {
  title: string;
  subtitle?: string;
  image: string;
};

export type BlogItem = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export const landingData = {
  nav: {
    brand: "CoffeeCafe",
    links: [
      { label: "Início", href: "#home" },
      { label: "Serviços", href: "#service" },
      { label: "Cardápio", href: "#menu" },
      { label: "Novidades", href: "#blog" },
      { label: "Contato", href: "#contact" },
    ],
  },

  hero: {
    title: "CoffeeCaffe",
    subtitle: "Seu momento de pausa começa aqui",
    bannerImage:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
  },

  story: {
    title: "Nossa história",
    body: "Aqui, café é mais do que bebida — é experiência. A gente torra com precisão, prepara com cuidado e finaliza com aquele aroma marcante que transforma cada gole em um momento especial. Do espresso clássico aos blends criativos, tudo é feito para entregar sabor premium, conforto e aquela sensação de ‘quero mais’.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    decor:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80",
  },

  drinks: {
    title: "Bebidas que dão vontade de voltar",
    desc: "Explore nossas bebidas assinatura — equilíbrio perfeito entre sabor, conforto e a dose ideal de energia.",
    bigImage:
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1000&q=80",
    items: [
      {
        title: "Café\nQuente",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
      },
      {
        title: "Cappuccino\nCremoso",
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
      },
      {
        title: "Café\nGelado",
        image:
          "https://images.unsplash.com/photo-1523942839745-7848d68bd971?auto=format&fit=crop&w=700&q=80",
      },
      {
        title: "Americano\nClássico",
        image:
          "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=700&q=80",
      },
    ] as DrinkItem[],
  },

  specialty: {
    title: "Nossa especialidade",
    desc: "Uma curadoria de sabores, texturas e momentos — café do jeito certo.",
    images: [
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?auto=format&fit=crop&w=800&q=80",
    ],
    decor:
      "https://images.unsplash.com/photo-1528740096961-379f4c7b1cda?auto=format&fit=crop&w=700&q=80",
  },

  cta: {
    kicker: "Os queridinhos da casa",
    title: "Grãos selecionados",
    button: "Quero escolher meus grãos",
    texture:
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1400&q=80",
    decorLeft:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80",
    decorRight:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
  },

  blog: {
    title: "Novidades & dicas do CoffeeCafe",
    desc: "Conteúdos rápidos, dicas de preparo e curiosidades — para deixar seu café ainda melhor.",
    items: [
      {
        title: "Rituais do café",
        excerpt:
          "Pequenos hábitos que elevam sua rotina — do moer ao servir, com mais sabor e constância.",
        image:
          "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=900&q=80",
        href: "/",
      },
      {
        title: "Prepare como um barista",
        excerpt:
          "Um guia simples para acertar a extração, realçar aroma e alcançar aquela crema perfeita.",
        image:
          "https://images.unsplash.com/photo-1504630083234-14187a9c8213?auto=format&fit=crop&w=900&q=80",
        href: "/",
      },
      {
        title: "Notas & torra",
        excerpt:
          "Entenda as notas sensoriais e como a torra muda o sabor final na sua xícara.",
        image:
          "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80",
        href: "/",
      },
    ] as BlogItem[],
  },

  footer: {
    brand: "CoffeeCafe",
    cols: [
      {
        title: "Atalhos",
        links: [
          { label: "Início", href: "#home" },
          { label: "Serviços", href: "#service" },
          { label: "Cardápio", href: "#menu" },
        ],
      },
      {
        title: "Conteúdos",
        links: [
          { label: "Novidades", href: "#blog" },
          { label: "Fale com a gente", href: "#contact" },
          { label: "Ver o cardápio agora", href: "#menu" },
        ],
      },
    ],
  },
} as const;
