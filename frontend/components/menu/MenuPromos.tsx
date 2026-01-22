import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { menuPromoCards } from "./menu-full-data";

export default function MenuPromos() {
  return (
    <section aria-label="Promoções e destaques" className="mt-7">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#3a271a]/60">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            DESTAQUES DO DIA
          </p>
          <h2 className="mt-2 font-script text-3xl leading-none md:text-4xl">
            Promoções que combinam com você
          </h2>
          <p className="mt-2 max-w-[70ch] text-sm leading-7 text-[#3a271a]/70">
            Cards prontos pra divulgar novidades e combos — e também pra deixar o
            cardápio mais chamativo no dia a dia.
          </p>
        </div>

        <Link
          href="/novidades"
          className="hidden items-center gap-2 rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 py-2 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35 md:inline-flex"
        >
          Ver novidades
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {menuPromoCards.map((card) => (
          <article
            key={card.title}
            className="group relative overflow-hidden rounded-[22px] border border-[#3a271a]/10 bg-white/35 shadow-sm"
          >
            <div className="absolute inset-0">
              <img
                src={card.image}
                alt=""
                className="h-full w-full object-cover opacity-55 transition duration-300 group-hover:opacity-70"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#efe6dc] via-[#efe6dc]/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a271a]/15 via-transparent to-transparent" />
            </div>

            <div className="relative p-5 md:p-6">
              <span className="inline-flex rounded-full border border-[#3a271a]/10 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-[#3a271a]/80">
                {card.badge}
              </span>

              <h3 className="mt-4 text-lg font-semibold tracking-wide text-[#3a271a]">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
                {card.subtitle}
              </p>

              <Link
                href="/menu"
                className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] text-[#3a271a]/80 transition hover:text-[#3a271a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
              >
                {card.cta}
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

      <div className="mt-4 md:hidden">
        <Link
          href="/novidades"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 py-3 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          Ver novidades
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
