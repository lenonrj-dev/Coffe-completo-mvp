export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  dateISO: string;
  category: string;
  readTime: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "rituais-do-cafe",
    title: "Rituais do Café",
    excerpt:
      "Pequenos hábitos que transformam seu café do dia a dia — do preparo ao primeiro gole.",
    image:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1400&q=80",
    dateISO: "2026-01-21",
    category: "Estilo de vida",
    readTime: "4 min",
    content: [
      "Um bom café não é só sobre cafeína. É sobre pausa, presença e conforto.",
      "Comece ajustando o básico: água de qualidade, moagem correta e um tempo de extração consistente.",
      "Se você curte intensidade, experimente um espresso curto. Se prefere suavidade, vá de coado com moagem média.",
      "Aqui na CoffeeCafe, cada preparo é pensado para ser uma experiência — e não apenas uma bebida.",
    ],
  },
  {
    slug: "como-preparar-cafe-como-um-pro",
    title: "Prepare Café Como um Pro",
    excerpt:
      "Um guia simples para equilibrar aroma, intensidade e textura em cada xícara.",
    image:
      "https://images.unsplash.com/photo-1504630083234-14187a9c8213?auto=format&fit=crop&w=1400&q=80",
    dateISO: "2026-01-20",
    category: "Receitas",
    readTime: "6 min",
    content: [
      "Se tem uma regra que muda tudo, é: consistência vence improviso.",
      "Ajuste a proporção: 10g de café para 100ml de água é um ótimo ponto de partida.",
      "O segredo do sabor limpo é não deixar o café “passar do ponto” — tempo e moagem precisam conversar.",
      "Quer evoluir rápido? Escolha um método e repita ele por alguns dias, ajustando só um detalhe por vez.",
    ],
  },
  {
    slug: "notas-do-grao-e-torra",
    title: "Notas do Grão & Torra",
    excerpt:
      "Entenda como a torra muda o sabor final — do chocolate ao frutado.",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=80",
    dateISO: "2026-01-18",
    category: "Conhecimento",
    readTime: "5 min",
    content: [
      "O grão carrega notas naturais que mudam conforme a torra e o método de preparo.",
      "Torras claras tendem a evidenciar acidez e aromas florais/frutados.",
      "Torras médias equilibram doçura, corpo e conforto no sabor.",
      "Torras escuras puxam mais para intensidade, caramelo e amargor controlado.",
    ],
  },
];
