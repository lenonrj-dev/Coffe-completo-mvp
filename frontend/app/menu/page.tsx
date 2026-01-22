import type { Metadata } from "next";
import MenuFullPage from "@/components/menu/MenuFullPage";

export const metadata: Metadata = {
  title: "Cardápio completo — CoffeeCafe",
  description:
    "Explore nosso cardápio completo com cafés quentes, gelados, grãos especiais e doces artesanais. Monte seu pedido e finalize com praticidade.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Cardápio completo — CoffeeCafe",
    description:
      "Cafés, grãos e acompanhamentos feitos para transformar sua pausa em experiência premium.",
    type: "website",
  },
};

export default function Page() {
  return <MenuFullPage />;
}
