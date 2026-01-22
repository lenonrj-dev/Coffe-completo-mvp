export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  dateISO: string;
  author: string;
  category: "Receitas" | "Café & Dicas" | "Bastidores";
  content: string;
};

export const posts: Post[] = [
  {
    slug: "rituais-do-cafe",
    title: "Rituais do café: como deixar o sabor mais consistente",
    excerpt:
      "Pequenos hábitos que elevam sua rotina — do moer ao servir, com mais aroma e equilíbrio.",
    coverImage:
      "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&w=1400&q=80",
    dateISO: "2026-01-21",
    author: "CoffeeCafe",
    category: "Café & Dicas",
    content:
      `Um café perfeito não depende de sorte — depende de consistência.\n\n` +
      `Comece ajustando a moagem, respeitando a proporção e controlando o tempo de extração. A cada tentativa, você chega mais perto do seu ponto ideal.\n\n` +
      `Aqui no CoffeeCafe, a gente acredita que café bom é aquele que vira hábito — com aroma marcante e finalização limpa.`,
  },
  {
    slug: "como-fazer-cappuccino-cremoso",
    title: "Cappuccino cremoso: o segredo da textura perfeita",
    excerpt:
      "Aprenda o passo a passo para um cappuccino equilibrado, com espuma bonita e sabor marcante.",
    coverImage:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1400&q=80",
    dateISO: "2026-01-20",
    author: "CoffeeCafe",
    category: "Receitas",
    content:
      `O cappuccino perfeito é uma combinação de café bem extraído e leite texturizado.\n\n` +
      `A dica é: aqueça o leite sem ferver e busque uma espuma fina, brilhante e estável.\n\n` +
      `Finalize com canela, chocolate ou a sua assinatura favorita — e transforme um momento simples em experiência premium.`,
  },
  {
    slug: "bastidores-da-torra",
    title: "Bastidores da torra: como o sabor nasce no grão",
    excerpt:
      "Entenda como a torra influencia aroma, acidez e doçura — e por que isso muda tudo na sua xícara.",
    coverImage:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1400&q=80",
    dateISO: "2026-01-18",
    author: "CoffeeCafe",
    category: "Bastidores",
    content:
      `Torra é precisão. Um pequeno ajuste muda tudo no resultado final.\n\n` +
      `Torras mais claras destacam acidez e notas florais. Torras médias equilibram doçura e corpo. Torras mais escuras trazem intensidade e amargor controlado.\n\n` +
      `A melhor torra é aquela que combina com seu paladar — e a gente te ajuda a escolher.`,
  },
];
