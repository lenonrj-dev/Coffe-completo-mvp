"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { contactData } from "./contact-data";

export default function CareersSection() {
  return (
    <section aria-labelledby="careers-title">
      <div className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-7">
        <h2 id="careers-title" className="font-script text-4xl leading-[1.05]">
          {contactData.careers.title}
        </h2>

        <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
          {contactData.careers.desc}
        </p>

        <div className="mt-5 space-y-3">
          {contactData.careers.openings.map((o, idx) => (
            <motion.div
              key={o.role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-[#3a271a]">
                    {o.role}
                  </p>
                  <p className="mt-1 text-sm text-[#3a271a]/70">{o.type}</p>
                  <p className="text-sm text-[#3a271a]/70">{o.location}</p>
                </div>

                <Link
                  href="/trabalhe-conosco"
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-2xl bg-[#3a271a] px-5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
                >
                  Candidatar-se
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5">
          <p className="text-sm font-semibold text-[#3a271a]">
            Quer entrar pro time CoffeeCafe?
          </p>
          <p className="mt-1 text-sm leading-7 text-[#3a271a]/75">
            Preencha o portal de candidatura e a nossa equipe avalia seu perfil
            com prioridade.
          </p>

          <Link
            href="/trabalhe-conosco"
            className="mt-3 inline-flex h-11 items-center justify-center rounded-2xl border border-[#3a271a]/15 bg-white/70 px-5 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/25"
          >
            Abrir portal de vagas
          </Link>
        </div>
      </div>
    </section>
  );
}
