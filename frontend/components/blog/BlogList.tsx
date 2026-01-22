"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "./posts";
import { CalendarDays, Clock, ArrowRight, Newspaper } from "lucide-react";

export default function BlogList() {
  return (
    <section aria-labelledby="blog-title">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#3a271a]/60">
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            NOVIDADES • RECEITAS • DICAS
          </p>
          <h1
            id="blog-title"
            className="mt-2 font-script text-4xl leading-[1.05] md:text-5xl"
          >
            Novidades da CoffeeCafe
          </h1>
          <p className="mt-3 max-w-[620px] text-sm leading-7 text-[#3a271a]/70">
            Conteúdos rápidos e práticos pra você evoluir no café — e descobrir
            receitas que combinam com cada momento.
          </p>
        </div>

        <Link
          href="/menu"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#3a271a] px-5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          Ver menu completo
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-[18px] border border-[#3a271a]/10 bg-white/35 shadow-sm transition hover:-translate-y-1 hover:bg-white/50"
          >
            <div className="relative h-[200px] w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a271a]/20 via-transparent to-transparent" />
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#3a271a]/65">
                <span className="rounded-full bg-[#efe6dc] px-3 py-1 font-semibold text-[#3a271a]">
                  {post.category}
                </span>

                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {new Date(post.dateISO).toLocaleDateString("pt-BR")}
                </span>

                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="mt-3 text-base font-semibold tracking-wide text-[#3a271a]">
                {post.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] text-[#3a271a]/80 transition hover:text-[#3a271a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
              >
                Ler artigo
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
