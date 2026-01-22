"use client";

import { motion } from "framer-motion";
import { careersData } from "./careers-data";

function Pill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-[#3a271a]/10 bg-white/60 px-3 py-1 text-[11px] font-semibold text-[#3a271a]/70">
      {text}
    </span>
  );
}

export default function CareersOpenings() {
  return (
    <section aria-labelledby="openings-title">
      <div className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-7">
        <h2 id="openings-title" className="font-script text-4xl leading-[1.05]">
          {careersData.openingsTitle}
        </h2>

        <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
          {careersData.openingsDesc}
        </p>

        <div className="mt-5 space-y-3">
          {careersData.openings.map((o, idx) => (
            <motion.article
              key={o.role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-[#3a271a]">
                    {o.role}
                  </p>
                  <p className="mt-1 text-sm text-[#3a271a]/70">
                    {o.type} • {o.remote ? "Remoto" : "Presencial"} • {o.city}{" "}
                    {o.state}
                  </p>
                </div>

                <span className="rounded-full bg-[#efe6dc] px-3 py-1 text-[11px] font-semibold text-[#3a271a]">
                  {o.remote ? "Remote friendly" : "No local"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {o.highlights.map((h) => (
                  <Pill key={h} text={h} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
