import type { Metadata } from "next";

import Footer from "../../components/landing/Footer";
import PostCard from "../../components/blog/PostCard";
import { posts } from "../../data/posts";

export const metadata: Metadata = {
  title: "Novidades — CoffeeCafe",
  description:
    "Receitas, dicas e novidades do CoffeeCafe. Conteúdo rápido e prático para deixar seu café ainda melhor.",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Page() {
  return (
    <div className="paper-noise">
      <main className="mx-auto max-w-[1100px] px-6 pb-12 pt-6">
        <div className="rounded-3xl border border-[#3a271a]/10 bg-white/55 p-6 shadow-sm backdrop-blur-sm">
          <h1 className="font-script text-4xl leading-[1.05]">Novidades</h1>
          <p className="mt-2 text-sm text-[#3a271a]/70">
            Dicas, receitas e bastidores — conteúdos rápidos para elevar sua experiência.
          </p>
        </div>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <PostCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              excerpt={p.excerpt}
              image={p.coverImage}
              category={p.category}
              dateLabel={formatDate(p.dateISO)}
            />
          ))}
        </section>
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
