"use client";

import { motion } from "framer-motion";
import { careersData } from "./careers-data";

export default function CareersHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[28px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-10"
      aria-labelledby="careers-hero-title"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.6] bg-[radial-gradient(circle_at_20%_0%,rgba(58,39,26,0.12),transparent_45%),radial-gradient(circle_at_100%_40%,rgba(58,39,26,0.10),transparent_40%)]" />

      <div className="relative">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/55">
          {careersData.hero.note}
        </p>

        <h1
          id="careers-hero-title"
          className="mt-3 font-script text-5xl leading-[1.02] tracking-wide md:text-6xl"
        >
          {careersData.hero.title}
        </h1>

        <p className="mt-3 max-w-[70ch] text-sm leading-7 text-[#3a271a]/75">
          {careersData.hero.subtitle}
        </p>
      </div>
    </motion.section>
  );
}
