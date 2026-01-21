"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { landingData } from "../../data/landing";

export default function DelightDrinks() {
  return (
    <motion.section
      id="menu"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pb-16"
      aria-labelledby="delight-drinks-title"
    >
      <div className="grid gap-10 md:grid-cols-[1fr_460px] md:items-start">
        <div>
          <h2
            id="delight-drinks-title"
            className="font-script text-4xl tracking-wide md:text-5xl"
          >
            {landingData.drinks.title}
          </h2>
          <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#3a271a]/75">
            {landingData.drinks.desc}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {landingData.drinks.items.map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-[16px] border border-[#3a271a]/10 bg-white/35 shadow-sm"
                aria-label={item.title.replace("\\n", " ")}
              >
                <div className="relative h-[120px] w-full">
                  <Image
                    src={item.image}
                    alt={item.title.replace("\\n", " ")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3a271a]/20 via-transparent to-transparent" />
                </div>

                <div className="px-3 pb-3 pt-2">
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#3a271a]/80">
                    {item.title.split("\\n").map((line, idx) => (
                      <span key={idx} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-[#3a271a]/15" />
              </motion.article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-[18px] border border-[#3a271a]/10 bg-white/35 shadow-sm">
            <div className="relative h-[290px] w-full md:h-[320px]">
              <Image
                src={landingData.drinks.bigImage}
                alt="Café quente em destaque"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 460px"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#3a271a]/25 via-transparent to-transparent" />
            </div>
          </div>

          <div className="pointer-events-none absolute -left-6 -top-6 hidden size-24 rounded-full bg-[#3a271a]/6 blur-xl md:block" />
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-8 left-0 hidden md:block">
        <div className="h-[2px] w-56 bg-[#3a271a]/12" />
      </div>
    </motion.section>
  );
}
