"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { landingData } from "../../data/landing";

export default function OurStory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative py-16"
      aria-labelledby="our-story-title"
    >
      <div className="pointer-events-none absolute -left-10 top-10 hidden h-40 w-40 rotate-[-18deg] opacity-35 md:block">
        <Image
          src={landingData.story.decor}
          alt=""
          fill
          className="object-contain"
          sizes="200px"
        />
      </div>

      <div className="grid items-center gap-10 md:grid-cols-[460px_1fr]">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[18px] border border-[#3a271a]/10 bg-white/35 shadow-sm">
            <div className="relative h-[260px] w-full md:h-[320px]">
              <Image
                src={landingData.story.image}
                alt="Café com espuma e arte"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-8 -left-8 hidden size-16 rounded-full bg-[#3a271a]/5 blur-xl md:block" />
        </div>

        <div>
          <h2
            id="our-story-title"
            className="font-script text-4xl tracking-wide md:text-5xl"
          >
            {landingData.story.title}
          </h2>

          <p className="mt-4 max-w-[560px] text-sm leading-7 text-[#3a271a]/75">
            {landingData.story.body}
          </p>

          <div className="mt-8 h-px w-28 bg-[#3a271a]/15" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-8 top-20 hidden md:block">
        <div className="h-[110px] w-[2px] bg-[#3a271a]/12" />
        <div className="mt-2 h-[2px] w-[110px] bg-[#3a271a]/12" />
      </div>
    </motion.section>
  );
}
