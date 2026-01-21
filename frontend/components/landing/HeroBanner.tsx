"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { landingData } from "../../data/landing";

export default function HeroBanner() {
  return (
    <motion.section
      id="service"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mt-2 overflow-hidden rounded-[20px] border border-[#3a271a]/10 bg-[#f4ede6] shadow-sm"
      aria-label="Hero"
    >
      <div className="relative h-[280px] w-full md:h-[310px]">
        <Image
          src={landingData.hero.bannerImage}
          alt="Banner de café"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1100px"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#efe6dc]/85 via-[#efe6dc]/55 to-transparent" />

        <div className="absolute left-6 top-1/2 w-[72%] -translate-y-1/2 md:left-10 md:w-[56%]">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="font-script text-[46px] leading-[0.95] tracking-wide text-[#3a271a] md:text-[56px]"
          >
            {landingData.hero.title.split("\\n").map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6, ease: "easeOut" }}
            className="mt-4 text-sm tracking-[0.35em] text-[#3a271a]/70"
          >
            {landingData.hero.subtitle}
          </motion.p>
        </div>

        <div className="pointer-events-none absolute -right-8 -top-10 size-40 rounded-full bg-[#3a271a]/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 left-10 size-44 rounded-full bg-[#3a271a]/6 blur-2xl" />
      </div>
    </motion.section>
  );
}
