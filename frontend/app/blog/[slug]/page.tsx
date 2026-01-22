import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "../../../components/landing/Footer";
import { blogPosts } from "../../../components/blog/posts";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Artigo não encontrado | CoffeeCafe" };

  return {
    title: `${post.title} | CoffeeCafe`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | CoffeeCafe`,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image }],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.dateISO,
    author: {
      "@type": "Organization",
      name: "CoffeeCafe",
    },
    publisher: {
      "@type": "Organization",
      name: "CoffeeCafe",
    },
  };

  return (
    <div className="paper-noise">

      <main className="mx-auto max-w-[1100px] px-6 pb-16 pt-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="mx-auto max-w-[820px]">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#3a271a]/60">
            {post.category.toUpperCase()}
          </p>

          <h1 className="mt-2 font-script text-4xl leading-[1.05] md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#3a271a]/70">
            {post.excerpt}
          </p>

          <div className="mt-8 overflow-hidden rounded-3xl border border-[#3a271a]/10 bg-white/35 shadow-sm">
            {/* imagem */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="h-[320px] w-full object-cover md:h-[420px]"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-8 space-y-5 rounded-3xl border border-[#3a271a]/10 bg-white/40 p-6 shadow-sm">
            {post.content.map((p, idx) => (
              <p
                key={idx}
                className="text-sm leading-7 text-[#3a271a]/80 md:text-[15px]"
              >
                {p}
              </p>
            ))}
          </div>
        </article>
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
