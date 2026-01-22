"use client";

import { motion } from "framer-motion";
import { contactData } from "./contact-data";

export default function MapSection() {
  return (
    <section className="mt-10" aria-labelledby="map-title">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="overflow-hidden rounded-[28px] border border-[#3a271a]/10 bg-white/35 shadow-sm backdrop-blur-sm"
      >
        <div className="p-6 md:p-8">
          <h2 id="map-title" className="font-script text-4xl leading-[1.05]">
            {contactData.map.title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
            {contactData.map.desc}
          </p>
          <p className="mt-3 text-sm font-semibold text-[#3a271a]">
            {contactData.map.address}
          </p>
        </div>

        <div className="relative h-[320px] w-full border-t border-[#3a271a]/10 bg-white/30 md:h-[420px]">
          <iframe
            title="Mapa CoffeeCafe"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Volta%20Redonda%20RJ&output=embed"
          />
        </div>
      </motion.div>
    </section>
  );
}
