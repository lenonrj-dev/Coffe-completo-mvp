"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { servicesData } from "./services-data";

export default function ServicesMosaic() {
  const imgs = servicesData.mosaic.images;

  return (
    <section className="mt-10" aria-labelledby="services-mosaic-title">
      <div className="flex flex-col gap-2">
        <h2
          id="services-mosaic-title"
          className="font-script text-4xl leading-[1.05]"
        >
          {servicesData.mosaic.title}
        </h2>
        <p className="max-w-[80ch] text-sm leading-7 text-[#3a271a]/75">
          {servicesData.mosaic.desc}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative col-span-1 h-[260px] overflow-hidden rounded-[26px] border border-[#3a271a]/10 bg-white/30 shadow-sm md:col-span-7 md:h-[420px]"
        >
          <Image
            src={imgs[0]}
            alt="Café artesanal em destaque"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3a271a]/25 via-transparent to-transparent" />
        </motion.div>

        <div className="col-span-1 grid gap-4 md:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            {[imgs[1], imgs[2]].map((src) => (
              <div
                key={src}
                className="relative h-[200px] overflow-hidden rounded-[24px] border border-[#3a271a]/10 bg-white/30 shadow-sm"
              >
                <Image
                  src={src}
                  alt="Imagem de café"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 420px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[imgs[3], imgs[4], imgs[5]].map((src) => (
              <div
                key={src}
                className="relative h-[170px] overflow-hidden rounded-[24px] border border-[#3a271a]/10 bg-white/30 shadow-sm"
              >
                <Image
                  src={src}
                  alt="Detalhe de bebida"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 320px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
