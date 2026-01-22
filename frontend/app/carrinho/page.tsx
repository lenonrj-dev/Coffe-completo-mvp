import type { Metadata } from "next";
import Footer from "../../components/landing/Footer";
import CartClient from "../../components/cart/CartClient";

export const metadata: Metadata = {
  title: "Carrinho — CoffeeCafe",
  description:
    "Revise seus itens, ajuste quantidades e avance para o checkout com segurança.",
};

export default function Page() {
  return (
    <div className="paper-noise">

      <main className="mx-auto max-w-[1100px] px-6 pb-12 pt-6">
        <CartClient />
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
