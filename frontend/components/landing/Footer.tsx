"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { landingData } from "../../data/landing";

function SocialIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="/"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-[#3a271a]/10 bg-white/35 text-[#3a271a] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
    >
      {children}
    </a>
  );
}

const NAV_LINK_CLASS =
  "text-[12px] font-medium tracking-[0.24em] text-[#3a271a]/80 transition hover:text-[#3a271a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35";

const FOOTER_LINKS_PRIMARY = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Cardápio", href: "/menu" },
];

const FOOTER_LINKS_CONTENT = [
  { label: "Novidades", href: "/novidades" },
  { label: "Contato", href: "/contato" },
  { label: "Carrinho", href: "/carrinho" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative bg-[#efe6dc]"
      aria-label="Rodapé"
    >
      <div className="relative overflow-hidden border-t border-[#3a271a]/10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.25]">
          <div className="paper-noise h-full w-full" />
        </div>

        <div className="mx-auto max-w-[1100px] px-6 py-14">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-white/45 shadow-sm">
                  <span className="font-script text-lg leading-none">
                    {landingData.footer.brand[0]}
                  </span>
                </div>
                <span className="font-script text-2xl tracking-wide">
                  {landingData.footer.brand}
                </span>
              </div>

              <p className="mt-3 max-w-[34ch] text-sm leading-6 text-[#3a271a]/70">
                Artesanal • Fresco • Premium — café e bebidas especiais para o seu
                momento.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <SocialIcon label="Instagram">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M17.35 6.85h.01"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </SocialIcon>

                <SocialIcon label="Facebook">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M14 8.5V7.2c0-.9.3-1.5 1.6-1.5H17V3h-2.1C12.8 3 11 4.3 11 7v1.5H9V11h2v10h3V11h2.2l.8-2.5H14Z"
                      fill="currentColor"
                    />
                  </svg>
                </SocialIcon>

                <SocialIcon label="Twitter">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M19.7 7.3c.01.17.01.34.01.5 0 5.2-4 11.2-11.2 11.2-2.22 0-4.3-.65-6.05-1.77.31.04.62.05.95.05 1.84 0 3.54-.63 4.9-1.7a3.95 3.95 0 0 1-3.69-2.73c.25.04.5.07.78.07.36 0 .73-.05 1.07-.14A3.94 3.94 0 0 1 3.3 8.96v-.05c.54.3 1.16.5 1.82.52a3.94 3.94 0 0 1-1.75-3.29c0-.74.2-1.42.55-2.01a11.2 11.2 0 0 0 8.12 4.12 3.95 3.95 0 0 1 6.73-3.6 7.7 7.7 0 0 0 2.5-.95 3.93 3.93 0 0 1-1.73 2.17 7.9 7.9 0 0 0 2.26-.6 8.2 8.2 0 0 1-1.96 2.03Z"
                      fill="currentColor"
                    />
                  </svg>
                </SocialIcon>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-[#3a271a]">
                Atalhos
              </p>
              <ul className="mt-4 space-y-3">
                {FOOTER_LINKS_PRIMARY.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={NAV_LINK_CLASS}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-[#3a271a]">
                Conteúdos
              </p>
              <ul className="mt-4 space-y-3">
                {FOOTER_LINKS_CONTENT.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={NAV_LINK_CLASS}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide text-[#3a271a]">
                Newsletter
              </p>
              <p className="mt-3 text-sm leading-6 text-[#3a271a]/75">
                Receba novidades, promoções e dicas para evoluir no café.
              </p>

              <form className="mt-5 flex items-center gap-2">
                <label className="sr-only" htmlFor="newsletter-email">
                  Seu e-mail
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Seu e-mail"
                  className="h-11 w-full rounded-xl border border-[#3a271a]/10 bg-white/55 px-4 text-sm text-[#3a271a] outline-none placeholder:text-[#3a271a]/45 focus:ring-2 focus:ring-[#3a271a]/35"
                />
                <button
                  type="button"
                  className="h-11 shrink-0 rounded-xl bg-[#3a271a] px-4 text-[12px] font-semibold tracking-[0.22em] text-[#efe6dc] shadow-sm transition hover:bg-[#2f2016] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
                >
                  ASSINAR
                </button>
              </form>

              <p className="mt-3 text-xs leading-5 text-[#3a271a]/55">
                Sem spam. Você pode cancelar quando quiser.
              </p>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-[#3a271a]/10" />

          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-[#3a271a]/60 md:flex-row">
            <p>© {new Date().getFullYear()} CoffeeCafe. Todos os direitos reservados.</p>
            <p className="tracking-[0.18em]">COFFEE • CAFFEINE • CRAFT</p>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-10 right-0 hidden h-40 w-40 opacity-55 md:block">
          <Image
            src="https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80"
            alt=""
            fill
            className="object-contain"
            sizes="220px"
          />
        </div>
      </div>
    </motion.footer>
  );
}
