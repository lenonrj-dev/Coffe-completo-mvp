"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { landingData } from "../../data/landing";

function Tile({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-[16px] border border-[#3a271a]/10 bg-white/35 shadow-sm ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
        loading="lazy"
        decoding="async"
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition group-hover:ring-[#3a271a]/15" />
    </motion.div>
  );
}

export default function SpecialtyGallery() {
  const imgs = landingData.specialty.images;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pb-14 mt-20"
      aria-labelledby="specialty-title"
    >
      <div className="relative">
        <div className="pointer-events-none absolute -right-8 -top-8 hidden h-44 w-44 opacity-35 md:block">
          <Image
            src={landingData.specialty.decor}
            alt=""
            fill
            className="object-contain"
            sizes="200px"
          />
        </div>

        <h2
          id="specialty-title"
          className="font-script text-4xl tracking-wide md:text-5xl"
        >
          {landingData.specialty.title}
        </h2>
        <p className="mt-3 max-w-[560px] text-sm leading-7 text-[#3a271a]/75">
          {landingData.specialty.desc}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {/* Coluna esquerda: 2 empilhadas */}
          <div className="grid gap-4">
            <Tile
              src={imgs[0]}
              alt="Galeria de café 1"
              className="relative h-[170px]"
            />
            <Tile
              src={imgs[1]}
              alt="Galeria de café 2"
              className="relative h-[170px]"
            />
          </div>

          {/* Meio: uma grande vertical (span 2 linhas) */}
          <Tile
            src={imgs[2]}
            alt="Galeria de café destaque"
            className="relative h-[354px]"
          />

          {/* Coluna direita: 2 empilhadas */}
          <div className="grid gap-4">
            <Tile
              src={imgs[3]}
              alt="Galeria de café 3"
              className="relative h-[170px]"
            />
            <Tile
              src={imgs[4]}
              alt="Galeria de café 4"
              className="relative h-[170px]"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
