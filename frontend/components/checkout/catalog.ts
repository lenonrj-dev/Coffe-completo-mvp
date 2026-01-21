export type CatalogProduct = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: "Bebidas" | "Grãos" | "Doces";
};
