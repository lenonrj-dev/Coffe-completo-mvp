"use client";

import { motion } from "framer-motion";
import { landingData } from "../../data/landing";

function SocialIcon({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="/"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-full border border-[#3a271a]/10 bg-white/35 text-[#3a271a] shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/40"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between py-6"
      aria-label="Navegação principal"
    >
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-xl bg-white/45 shadow-sm">
          <span className="font-script text-lg leading-none">{landingData.nav.brand[0]}</span>
        </div>
        <span className="font-script text-xl tracking-wide">
          {landingData.nav.brand}
        </span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {landingData.nav.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-[12px] font-medium tracking-[0.24em] text-[#3a271a]/80 transition hover:text-[#3a271a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <SocialIcon label="Instagram">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="M17.35 6.85h.01"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </SocialIcon>

        <SocialIcon label="Facebook">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M14 8.5V7.2c0-.9.3-1.5 1.6-1.5H17V3h-2.1C12.8 3 11 4.3 11 7v1.5H9V11h2v10h3V11h2.2l.8-2.5H14Z"
              fill="currentColor"
            />
          </svg>
        </SocialIcon>

        <SocialIcon label="Twitter">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M19.7 7.3c.01.17.01.34.01.5 0 5.2-4 11.2-11.2 11.2-2.22 0-4.3-.65-6.05-1.77.31.04.62.05.95.05 1.84 0 3.54-.63 4.9-1.7a3.95 3.95 0 0 1-3.69-2.73c.25.04.5.07.78.07.36 0 .73-.05 1.07-.14A3.94 3.94 0 0 1 3.3 8.96v-.05c.54.3 1.16.5 1.82.52a3.94 3.94 0 0 1-1.75-3.29c0-.74.2-1.42.55-2.01a11.2 11.2 0 0 0 8.12 4.12 3.95 3.95 0 0 1 6.73-3.6 7.7 7.7 0 0 0 2.5-.95 3.93 3.93 0 0 1-1.73 2.17 7.9 7.9 0 0 0 2.26-.6 8.2 8.2 0 0 1-1.96 2.03Z"
              fill="currentColor"
            />
          </svg>
        </SocialIcon>
      </div>
    </motion.nav>
  );
}
