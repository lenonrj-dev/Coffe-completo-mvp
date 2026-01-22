"use client";

import { motion } from "framer-motion";
import { contactData } from "./contact-data";

export default function ContactChannels() {
  return (
    <section aria-labelledby="contact-channels-title">
      <div className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-7">
        <h2
          id="contact-channels-title"
          className="font-script text-4xl leading-[1.05]"
        >
          {contactData.channels.title}
        </h2>

        <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
          {contactData.channels.desc}
        </p>

        <div className="mt-5 space-y-3">
          {contactData.channels.items.map((it, idx) => (
            <motion.a
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/25"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-[#3a271a]">
                    {it.title}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-[#3a271a]/75">
                    {it.desc}
                  </p>
                </div>

                <span className="shrink-0 rounded-2xl bg-[#3a271a] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#efe6dc] transition group-hover:brightness-110">
                  {it.actionLabel}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
