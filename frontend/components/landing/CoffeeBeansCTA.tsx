"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { landingData } from "../../data/landing";

export default function CoffeeBeansCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pb-16"
      aria-label="Banner de café"
    >
      <div className="relative overflow-hidden rounded-[20px] border border-[#3a271a]/10 bg-[#f4ede6] shadow-sm">
        <div className="relative h-[200px] w-full">
          <Image
            src={landingData.cta.texture}
            alt="Textura de café"
            fill
            className="object-cover opacity-70"
            sizes="(max-width: 768px) 100vw, 1100px"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#efe6dc]/85 via-[#efe6dc]/55 to-[#efe6dc]/25" />

          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-[520px]">
              <p className="text-xs font-semibold tracking-[0.32em] text-[#3a271a]/65">
                {landingData.cta.kicker}
              </p>
              <h3 className="mt-2 font-script text-5xl tracking-wide md:text-6xl">
                {landingData.cta.title}
              </h3>

              <motion.a
                href="/"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#3a271a] px-6 text-[12px] font-semibold tracking-[0.22em] text-[#efe6dc] shadow-sm outline-none transition hover:bg-[#2f2016] focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
              >
                {landingData.cta.button}
              </motion.a>
            </div>
          </div>

          {/* Decorativos (splash/grãos) */}
          <div className="pointer-events-none absolute -left-10 bottom-[-24px] hidden h-28 w-28 rotate-[-8deg] opacity-40 md:block">
            <Image
              src={landingData.cta.decorLeft}
              alt=""
              fill
              className="object-contain"
              sizes="140px"
            />
          </div>

          <div className="pointer-events-none absolute -right-8 bottom-[-20px] hidden h-36 w-36 opacity-55 md:block">
            <Image
              src={landingData.cta.decorRight}
              alt=""
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
