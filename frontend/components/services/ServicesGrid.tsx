"use client";

import { motion } from "framer-motion";
import { servicesData } from "./services-data";

function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#efe6dc] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#3a271a]">
      {text}
    </span>
  );
}

export default function ServicesGrid() {
  return (
    <section className="mt-10" aria-labelledby="services-grid-title">
      <div className="flex flex-col gap-2">
        <h2
          id="services-grid-title"
          className="font-script text-4xl leading-[1.05]"
        >
          {servicesData.services.title}
        </h2>
        <p className="max-w-[70ch] text-sm leading-7 text-[#3a271a]/75">
          {servicesData.services.desc}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {servicesData.services.items.map((it, idx) => (
          <motion.article
            key={it.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
            className="relative overflow-hidden rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm backdrop-blur-sm"
          >
            <div className="absolute inset-0 pointer-events-none opacity-[0.45] bg-[radial-gradient(circle_at_10%_0%,rgba(58,39,26,0.10),transparent_55%)]" />

            <div className="relative">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-[#3a271a]">
                  {it.title}
                </h3>
                {it.badge ? <Badge text={it.badge} /> : null}
              </div>

              <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
                {it.desc}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
