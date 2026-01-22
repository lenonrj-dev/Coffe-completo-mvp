"use client";

import { motion } from "framer-motion";
import { servicesData } from "./services-data";

function Pill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-[#3a271a]/10 bg-white/60 px-3 py-1 text-[11px] font-semibold text-[#3a271a]/70">
      {text}
    </span>
  );
}

export default function ServicesTemplates() {
  return (
    <section className="mt-10" aria-labelledby="services-templates-title">
      <div className="flex flex-col gap-2">
        <h2
          id="services-templates-title"
          className="font-script text-4xl leading-[1.05]"
        >
          {servicesData.templates.title}
        </h2>
        <p className="max-w-[80ch] text-sm leading-7 text-[#3a271a]/75">
          {servicesData.templates.desc}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {servicesData.templates.items.map((t, idx) => (
          <motion.article
            key={t.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.03 }}
            className="rounded-[24px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-[#3a271a]">
                {t.title}
              </h3>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#efe6dc] px-3 py-1 text-[11px] font-semibold text-[#3a271a]">
                  {t.level}
                </span>
                <span className="rounded-full border border-[#3a271a]/10 bg-white/60 px-3 py-1 text-[11px] font-semibold text-[#3a271a]/70">
                  {t.time}
                </span>
              </div>
            </div>

            <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
              {t.excerpt}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {t.tags.map((tg) => (
                <Pill key={tg} text={tg} />
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
