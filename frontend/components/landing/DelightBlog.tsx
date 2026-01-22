"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { landingData } from "../../data/landing";
import { ArrowLeft, ArrowRight, BookOpenText } from "lucide-react";

function ArrowButton({
  label,
  dir,
}: {
  label: string;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-xl border border-[#3a271a]/10 bg-white/35 text-[#3a271a] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
    >
      {dir === "left" ? (
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      ) : (
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}

export default function DelightBlog() {
  return (
    <motion.section
      id="blog"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pb-16"
      aria-labelledby="delight-blog-title"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2
            id="delight-blog-title"
            className="font-script text-4xl tracking-wide md:text-5xl"
          >
            {landingData.blog.title}
          </h2>
          <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#3a271a]/75">
            {landingData.blog.desc}
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ArrowButton label="Voltar" dir="left" />
          <ArrowButton label="Avançar" dir="right" />
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {landingData.blog.items.map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="group overflow-hidden rounded-[18px] border border-[#3a271a]/10 bg-white/35 shadow-sm"
          >
            <div className="relative h-[200px] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 360px"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a271a]/20 via-transparent to-transparent" />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3a271a]/70">
                <BookOpenText className="h-4 w-4" aria-hidden="true" />
                <span>Receitas & Conteúdos</span>
              </div>

              <h3 className="mt-2 text-base font-semibold tracking-wide text-[#3a271a]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
                {item.excerpt}
              </p>

              <Link
                href={item.href}
                className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] text-[#3a271a]/80 transition hover:text-[#3a271a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
              >
                Ver receita completa
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          Explorar todas as novidades
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </motion.section>
  );
}
