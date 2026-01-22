"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData } from "./services-data";

export default function ServicesHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[28px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-10"
      aria-labelledby="services-hero-title"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.6] bg-[radial-gradient(circle_at_20%_0%,rgba(58,39,26,0.12),transparent_45%),radial-gradient(circle_at_100%_40%,rgba(58,39,26,0.10),transparent_40%)]" />

      <div className="relative">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/55">
          {servicesData.hero.note}
        </p>

        <h1
          id="services-hero-title"
          className="mt-3 font-script text-5xl leading-[1.02] tracking-wide md:text-6xl"
        >
          {servicesData.hero.title}
        </h1>

        <p className="mt-3 max-w-[58ch] text-sm leading-7 text-[#3a271a]/75">
          {servicesData.hero.subtitle}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/menu"
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
          >
            {servicesData.hero.ctaPrimary}
          </Link>

          <Link
            href="/contato"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#3a271a]/15 bg-white/55 px-6 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/25"
          >
            {servicesData.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
