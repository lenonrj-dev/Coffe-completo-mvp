export type CatalogProduct = {
  id: string;
  title: string;
  description: string;
  image: string;
  unit_price: number;
  currency_id: "BRL";
  category: "Bebidas" | "Grãos" | "Doces";
};

export const products: CatalogProduct[] = [
  {
    id: "espresso-tradicional",
    title: "Espresso Tradicional",
    description: "Café curto, intenso e aromático.",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80",
    unit_price: 9.9,
    currency_id: "BRL",
    category: "Bebidas",
  },
  {
    id: "cappuccino-cremoso",
    title: "Cappuccino Cremoso",
    description: "Creme suave com toque de canela.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    unit_price: 14.9,
    currency_id: "BRL",
    category: "Bebidas",
  },
  {
    id: "latte-vanilla",
    title: "Latte Vanilla",
    description: "Latte aveludado com baunilha.",
    image:
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=900&q=80",
    unit_price: 16.9,
    currency_id: "BRL",
    category: "Bebidas",
  },
  {
    id: "iced-coffee",
    title: "Iced Coffee",
    description: "Gelado, refrescante e equilibrado.",
    image:
      "https://images.unsplash.com/photo-1523942839745-7848d68bd971?auto=format&fit=crop&w=900&q=80",
    unit_price: 15.9,
    currency_id: "BRL",
    category: "Bebidas",
  },
  {
    id: "graos-premium-250g",
    title: "Grãos Premium 250g",
    description: "Blend especial para espresso e coado.",
    image:
      "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=900&q=80",
    unit_price: 29.9,
    currency_id: "BRL",
    category: "Grãos",
  },
];

export function getProductById(productId: string) {
  return products.find((p) => p.id === productId) || null;
}
