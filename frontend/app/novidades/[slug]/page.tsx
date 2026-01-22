import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

type Params = {
  slug: string;
};

type PageProps = {
  params: Params | Promise<Params>;
};

function toDateLabel(dateISO: string) {
  try {
    return new Date(dateISO).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateISO;
  }
}

function readTimeFromText(text: string) {
  const words = text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;

  const minutes = Math.max(3, Math.round(words / 180));
  return `${minutes} min`;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Artigo não encontrado — CoffeeCafe",
      description: "O conteúdo que você tentou acessar não está disponível.",
    };
  }

  return {
    title: `${post.title} — CoffeeCafe`,
    description: post.excerpt,
    alternates: {
      canonical: `/novidades/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} — CoffeeCafe`,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) return notFound();

  const dateLabel = toDateLabel(post.dateISO);
  const readTime = readTimeFromText(post.content);
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    author: {
      "@type": "Organization",
      name: post.author || "CoffeeCafe",
    },
    publisher: {
      "@type": "Organization",
      name: "CoffeeCafe",
    },
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/novidades/${post.slug}`,
    },
  };

  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 pb-14 pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-[0.28em] text-[#3a271a]/55">
            NOVIDADES • RECEITAS • DICAS
          </p>

          <h1 className="font-script text-5xl leading-[1.02] text-[#3a271a] md:text-6xl">
            {post.title}
          </h1>

          <p className="mt-1 max-w-[70ch] text-sm leading-7 text-[#3a271a]/75">
            {post.excerpt}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#3a271a]/65">
            <span className="rounded-full border border-[#3a271a]/10 bg-white/50 px-3 py-1">
              {post.category}
            </span>
            <span>•</span>
            <span>{dateLabel}</span>
            <span>•</span>
            <span>{readTime}</span>
          </div>
        </div>

        <Link
          href="/novidades"
          className="hidden rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 py-2 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35 md:inline-flex"
        >
          ← Voltar
        </Link>
      </div>

      <article className="grid gap-7 md:grid-cols-[1fr_320px]">
        <section className="overflow-hidden rounded-[22px] border border-[#3a271a]/10 bg-white/45 shadow-sm">
          <div className="relative h-[260px] w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 760px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3a271a]/30 via-transparent to-transparent" />
          </div>

          <div className="space-y-5 p-6 md:p-7">
            {paragraphs.map((text, idx) => (
              <p key={idx} className="text-sm leading-7 text-[#3a271a]/80">
                {text}
              </p>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              PRÓXIMO PASSO
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[#3a271a]">
              Quer pedir agora?
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
              Abra o cardápio completo e escolha suas bebidas favoritas em poucos
              cliques.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/menu"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3a271a] px-4 py-3 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
              >
                Ver menu completo
              </Link>

              <Link
                href="/carrinho"
                className="inline-flex w-full items-center justify-center rounded-2xl border border-[#3a271a]/12 bg-white/55 px-4 py-3 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/30"
              >
                Ir para o carrinho
              </Link>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              DICA RÁPIDA
            </p>
            <p className="mt-2 text-sm leading-7 text-[#3a271a]/80">
              Salve este artigo e volte quando quiser — todo conteúdo aqui é
              pensado para melhorar sua experiência com café, do básico ao
              avançado.
            </p>
          </div>
        </aside>
      </article>

      <div className="mt-10 md:hidden">
        <Link
          href="/novidades"
          className="inline-flex rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 py-2 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          ← Voltar para novidades
        </Link>
      </div>
    </main>
  );
}
