import type { Metadata } from "next";

import Footer from "../../components/landing/Footer";
import BlogList from "../../components/blog/BlogList";

export const metadata: Metadata = {
  title: "Novidades | CoffeeCafe",
  description:
    "Receitas, novidades e conteúdos especiais sobre café. Descubra novos sabores e dicas de preparo.",
  openGraph: {
    title: "Novidades | CoffeeCafe",
    description:
      "Receitas, novidades e conteúdos especiais sobre café. Descubra novos sabores e dicas de preparo.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="paper-noise">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-xl focus:bg-[#3a271a] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#efe6dc]"
      >
        Pular para o conteúdo
      </a>

      <main
        id="conteudo"
        className="mx-auto max-w-[1100px] px-6 pb-16 pt-6"
      >
        <BlogList />
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
