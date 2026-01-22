"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData } from "./services-data";

export default function ServicesCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mt-10 overflow-hidden rounded-[28px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-8"
      aria-labelledby="services-cta-title"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2
            id="services-cta-title"
            className="font-script text-4xl leading-[1.05]"
          >
            {servicesData.cta.title}
          </h2>
          <p className="mt-2 max-w-[70ch] text-sm leading-7 text-[#3a271a]/75">
            {servicesData.cta.desc}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/menu"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
          >
            {servicesData.cta.buttonPrimary}
          </Link>

          <Link
            href="/contato"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#3a271a]/15 bg-white/55 px-6 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/25"
          >
            {servicesData.cta.buttonSecondary}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
