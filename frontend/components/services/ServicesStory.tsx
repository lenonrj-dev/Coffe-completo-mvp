"use client";

import { motion } from "framer-motion";
import { servicesData } from "./services-data";

export default function ServicesStory() {
  return (
    <section className="mt-10" aria-labelledby="services-story-title">
      <div className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-2">
          <h2
            id="services-story-title"
            className="font-script text-4xl leading-[1.05]"
          >
            {servicesData.story.title}
          </h2>
          <p className="max-w-[80ch] text-sm leading-7 text-[#3a271a]/75">
            {servicesData.story.desc}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {servicesData.story.blocks.map((b, idx) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              className="rounded-[22px] border border-[#3a271a]/10 bg-white/50 p-5"
            >
              <h3 className="text-base font-semibold text-[#3a271a]">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
