"use client";

import { useEffect, useMemo, useState } from "react";
import type { CatalogProduct } from "./catalog";
import { useCart } from "./cart-store";
import { brl } from "./format";
import CartSidebar from "./CartSidebar";
import CheckoutModal from "./CheckoutModal";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#3a271a]/10 bg-white/55 shadow-sm backdrop-blur-sm">
      {children}
    </div>
  );
}

export default function MenuOrderSection() {
  const { addItem } = useCart();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"Todos" | "Bebidas" | "Grãos" | "Doces">(
    "Todos"
  );

  const [openCheckout, setOpenCheckout] = useState(false);

  useEffect(() => {
    async function load() {
      const base = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${base}/api/products`, { cache: "no-store" });
      const data = await res.json();
      setProducts(data.products || []);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const hitQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const hitCat = cat === "Todos" ? true : p.category === cat;
      return hitQuery && hitCat;
    });
  }, [products, query, cat]);

  return (
    <section id="menu" className="mt-10 scroll-mt-28">
      <CheckoutModal open={openCheckout} onClose={() => setOpenCheckout(false)} />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-script text-4xl leading-[1.05]">Menu</h2>
          <p className="mt-1 text-sm text-[#3a271a]/70">
            Escolha seus itens e finalize em poucos cliques.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="relative">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 text-sm text-[#3a271a] shadow-sm outline-none transition focus:border-[#3a271a]/25 focus:ring-2 focus:ring-[#3a271a]/15 md:w-[220px]"
              aria-label="Filtrar por categoria"
            >
              <option value="Todos">Lista de categorias</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Grãos">Grãos</option>
              <option value="Doces">Doces</option>
            </select>
          </div>

          <div className="relative w-full md:w-[280px]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busque por um produto"
              className="h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 text-sm text-[#3a271a] shadow-sm outline-none transition placeholder:text-[#3a271a]/45 focus:border-[#3a271a]/25 focus:ring-2 focus:ring-[#3a271a]/15"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_340px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <Card key={p.id}>
              <div className="flex gap-4 p-4">
                <div className="relative h-[92px] w-[92px] overflow-hidden rounded-2xl bg-white/40">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-medium tracking-[0.18em] text-[#3a271a]/55">
                        {p.category.toUpperCase()}
                      </p>
                      <h3 className="mt-1 truncate text-base font-semibold text-[#3a271a]">
                        {p.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-[#3a271a]/70">
                        {p.description}
                      </p>
                    </div>

                    <button
                      onClick={() => addItem(p)}
                      className="h-10 shrink-0 rounded-2xl bg-[#3a271a] px-4 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
                    >
                      Adicionar
                    </button>
                  </div>

                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-sm text-[#3a271a]/65">A partir de</p>
                    <p className="text-lg font-semibold text-[#3a271a]">
                      {brl(p.price)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <CartSidebar onContinue={() => setOpenCheckout(true)} />
      </div>
    </section>
  );
}
