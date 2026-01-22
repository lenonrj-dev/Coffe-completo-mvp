"use client";

import { motion } from "framer-motion";
import { contactData } from "./contact-data";

export default function ContactHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="overflow-hidden rounded-[28px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-10"
      aria-labelledby="contact-hero-title"
    >
      <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/55">
        Atendimento profissional • Feedbacks • Vagas • Parcerias
      </p>

      <h1
        id="contact-hero-title"
        className="mt-3 font-script text-5xl leading-[1.02] tracking-wide md:text-6xl"
      >
        {contactData.hero.title}
      </h1>

      <p className="mt-3 max-w-[70ch] text-sm leading-7 text-[#3a271a]/75">
        {contactData.hero.subtitle}
      </p>
    </motion.section>
  );
}
