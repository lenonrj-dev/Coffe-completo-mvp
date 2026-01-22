// app/components/home/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, User, Menu as MenuIcon, X } from "lucide-react";
import { useMemo, useState } from "react";
import { landingData } from "../../data/landing";

type NavItem = { label: string; href: string };

function IconButton({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#3a271a]/10 bg-white/55 text-[#3a271a] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
    >
      <span className="transition group-hover:scale-[1.03]">{children}</span>
    </Link>
  );
}

function NavLink({
  item,
  active,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "relative text-[12px] font-medium tracking-[0.26em] transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35",
        active ? "text-[#3a271a]" : "text-[#3a271a]/75 hover:text-[#3a271a]",
      ].join(" ")}
    >
      <span className="relative">
        {item.label}
        <span
          aria-hidden="true"
          className={[
            "absolute -bottom-2 left-0 h-[2px] w-full rounded-full transition",
            active ? "bg-[#3a271a]/70" : "bg-transparent",
          ].join(" ")}
        />
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = useMemo<NavItem[]>(
    () => [
      { label: "Início", href: "/" },
      { label: "Serviços", href: "/servicos" },
      { label: "Cardápio", href: "/menu" },
      { label: "Novidades", href: "/novidades" },
      { label: "Contato", href: "/contato" },
    ],
    []
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
      aria-label="Topo do site"
    >
      <div className="w-full border-b border-[#3a271a]/10 bg-[#efe6dc]/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-4 py-4 md:px-8">
          {/* Marca */}
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
              aria-label="Ir para a página inicial"
            >
              <div className="grid size-11 place-items-center rounded-2xl border border-[#3a271a]/10 bg-white/55 shadow-sm transition group-hover:-translate-y-0.5 group-hover:bg-white/70">
                <span className="font-script text-xl leading-none">
                  {landingData.nav.brand?.[0] ?? "C"}
                </span>
              </div>

              <div className="hidden min-w-0 sm:block">
                <p className="truncate font-script text-xl tracking-wide">
                  {landingData.nav.brand ?? "CoffeeCafe"}
                </p>
                <p className="mt-0.5 truncate text-[11px] tracking-[0.24em] text-[#3a271a]/55">
                  Artesanal • Fresco • Premium
                </p>
              </div>
            </Link>
          </div>

          {/* Links Desktop */}
          <nav
            className="hidden items-center mr-40 gap-8 md:flex"
            aria-label="Navegação principal"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isActive(item.href)}
              />
            ))}
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <IconButton label="Abrir carrinho" href="/carrinho">
                <ShoppingBag size={18} aria-hidden="true" />
              </IconButton>

              <IconButton label="Minha conta" href="/contato">
                <User size={18} aria-hidden="true" />
              </IconButton>
            </div>

            {/* Mobile */}
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#3a271a]/10 bg-white/55 text-[#3a271a] shadow-sm transition hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35 md:hidden"
            >
              {open ? <X size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {open ? (
          <div className="md:hidden">
            <div className="mx-auto w-full max-w-[1480px] px-4 pb-5 md:px-8">
              <div className="rounded-3xl border border-[#3a271a]/10 bg-white/55 p-4 shadow-sm">
                <nav
                  className="flex flex-col gap-4"
                  aria-label="Navegação mobile"
                >
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      active={isActive(item.href)}
                      onClick={() => setOpen(false)}
                    />
                  ))}
                </nav>

                <div className="mt-4 flex items-center gap-2">
                  <IconButton label="Abrir carrinho" href="/carrinho">
                    <ShoppingBag size={18} aria-hidden="true" />
                  </IconButton>
                  <IconButton label="Minha conta" href="/contato">
                    <User size={18} aria-hidden="true" />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </motion.header>
  );
}
