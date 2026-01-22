export type MenuProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category:
    | "Cafés Quentes"
    | "Cafés Gelados"
    | "Especiais da Casa"
    | "Chás & Alternativas"
    | "Grãos & Pacotes"
    | "Doces & Bolos"
    | "Salgados";
};

export const menuFallbackProducts: MenuProduct[] = [
  // Cafés Quentes
  {
    id: "demo-espresso-duplo",
    title: "Espresso Duplo",
    description:
      "Extração intensa, crema aveludada e finalização limpa. Ideal pra quem gosta de café com personalidade.",
    price: 9.9,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    category: "Cafés Quentes",
  },
  {
    id: "demo-capuccino-classico",
    title: "Cappuccino Clássico",
    description:
      "Equilíbrio perfeito entre café e leite texturizado, com espuma cremosa e aroma reconfortante.",
    price: 14.9,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80",
    category: "Cafés Quentes",
  },
  {
    id: "demo-latte-baunilha",
    title: "Latte de Baunilha",
    description:
      "Cremoso, aromático e levemente adocicado. Uma escolha suave pra qualquer hora do dia.",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    category: "Cafés Quentes",
  },
  {
    id: "demo-macchiato",
    title: "Macchiato",
    description:
      "Espresso com toque de leite — pequeno no tamanho, gigante no sabor. Perfeito pra um boost rápido.",
    price: 11.9,
    image:
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1200&q=80",
    category: "Cafés Quentes",
  },

  // Cafés Gelados
  {
    id: "demo-cold-brew",
    title: "Cold Brew",
    description:
      "Infusão lenta e gelada por horas. Suave, menos amargo e extremamente refrescante.",
    price: 17.9,
    image:
      "https://images.unsplash.com/photo-1523942839745-7848d68bd971?auto=format&fit=crop&w=1200&q=80",
    category: "Cafés Gelados",
  },
  {
    id: "demo-iced-latte-caramelo",
    title: "Iced Latte Caramelo",
    description:
      "Leve doçura, café marcante e gelo na medida. O preferido de quem ama um toque gourmet.",
    price: 18.9,
    image:
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=1200&q=80",
    category: "Cafés Gelados",
  },
  {
    id: "demo-frappe-chocolate",
    title: "Frappé de Chocolate",
    description:
      "Cremosidade gelada com chocolate intenso e finalização premium. Sobremesa em forma de café.",
    price: 22.9,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    category: "Cafés Gelados",
  },

  // Especiais
  {
    id: "demo-mocha-supremo",
    title: "Mocha Supremo",
    description:
      "Café + chocolate de verdade + leite cremoso. Finalize com chantilly pra ficar cinematográfico.",
    price: 21.9,
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    category: "Especiais da Casa",
  },
  {
    id: "demo-affogato",
    title: "Affogato CoffeeCafe",
    description:
      "Espresso quente sobre sorvete de creme. Contraste perfeito entre intensidade e doçura.",
    price: 24.9,
    image:
      "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=1200&q=80",
    category: "Especiais da Casa",
  },
  {
    id: "demo-cafe-especiarias",
    title: "Café com Especiarias",
    description:
      "Blend aromático com canela, toque cítrico e final quente. Ideal pra dias frios e conversas longas.",
    price: 18.5,
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80",
    category: "Especiais da Casa",
  },

  // Chás
  {
    id: "demo-cha-matcha",
    title: "Matcha Latte",
    description:
      "Alternativa elegante ao café: energia mais suave, sabor herbal e textura cremosa.",
    price: 19.9,
    image:
      "https://images.unsplash.com/photo-1458819714733-e5ab3d536722?auto=format&fit=crop&w=1200&q=80",
    category: "Chás & Alternativas",
  },
  {
    id: "demo-cha-frutas-vermelhas",
    title: "Chá Gelado de Frutas Vermelhas",
    description:
      "Refrescante, levemente doce e perfeito pra acompanhar doces. Vai bem com tudo.",
    price: 13.9,
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    category: "Chás & Alternativas",
  },

  // Grãos
  {
    id: "demo-grao-espresso-250",
    title: "Blend Espresso Premium — 250g",
    description:
      "Notas de chocolate e castanhas, corpo médio e doçura equilibrada. Perfeito pra espresso e moka.",
    price: 39.9,
    image:
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=80",
    category: "Grãos & Pacotes",
  },
  {
    id: "demo-grao-frutado-250",
    title: "Grão Frutado — 250g",
    description:
      "Torra clara com notas cítricas e florais. Ideal pra V60 e coado mais delicado.",
    price: 44.9,
    image:
      "https://images.unsplash.com/photo-1504630083234-14187a9c8213?auto=format&fit=crop&w=1200&q=80",
    category: "Grãos & Pacotes",
  },
  {
    id: "demo-kit-metodos",
    title: "Kit Métodos (V60 + filtros)",
    description:
      "Monte seu ritual em casa com um setup simples e elegante. Ótimo pra começar sem complicação.",
    price: 79.9,
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
    category: "Grãos & Pacotes",
  },

  // Doces
  {
    id: "demo-cookie-choco",
    title: "Cookie Triplo Chocolate",
    description:
      "Casquinha crocante, centro macio e chocolate generoso. Combina demais com cappuccino.",
    price: 10.9,
    image:
      "https://images.unsplash.com/photo-1548940740-204726a19be3?auto=format&fit=crop&w=1200&q=80",
    category: "Doces & Bolos",
  },
  {
    id: "demo-brownie-nutella",
    title: "Brownie Premium",
    description:
      "Textura úmida, sabor intenso e final cremoso. Seu café fica melhor com isso do lado.",
    price: 12.9,
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
    category: "Doces & Bolos",
  },
  {
    id: "demo-cheesecake-frutas",
    title: "Cheesecake de Frutas",
    description:
      "Doce na medida, cremosidade elegante e cobertura com frutas. Sobremesa perfeita pra fechar o momento.",
    price: 16.9,
    image:
      "https://images.unsplash.com/photo-1514516345957-556ca7b47460?auto=format&fit=crop&w=1200&q=80",
    category: "Doces & Bolos",
  },

  // Salgados
  {
    id: "demo-croissant-manteiga",
    title: "Croissant de Manteiga",
    description:
      "Folhado leve e amanteigado, com casquinha crocante. O clássico que nunca falha.",
    price: 13.9,
    image:
      "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=1200&q=80",
    category: "Salgados",
  },
  {
    id: "demo-pao-queijo",
    title: "Pão de Queijo Artesanal",
    description:
      "Casca dourada, miolo elástico e queijo de verdade. Melhor combo com espresso.",
    price: 9.5,
    image:
      "https://images.unsplash.com/photo-1619511091631-15b0d6d0b06a?auto=format&fit=crop&w=1200&q=80",
    category: "Salgados",
  },
];

export type PromoCard = {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  cta: string;
};

export const menuPromoCards: PromoCard[] = [
  {
    badge: "COMBO DO DIA",
    title: "Cappuccino + Cookie",
    subtitle: "Um duo perfeito pra sua pausa. Oferta limitada do dia.",
    cta: "Ver combinações",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1400&q=80",
  },
  {
    badge: "NOVIDADE",
    title: "Cold Brew Cremoso",
    subtitle: "Refrescante, suave e com finalização premium.",
    cta: "Experimentar agora",
    image:
      "https://images.unsplash.com/photo-1523942839745-7848d68bd971?auto=format&fit=crop&w=1400&q=80",
  },
  {
    badge: "GRÃOS ESPECIAIS",
    title: "Torra do mês",
    subtitle: "Notas doces, corpo equilibrado e aroma marcante.",
    cta: "Conhecer grãos",
    image:
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1400&q=80",
  },
];
