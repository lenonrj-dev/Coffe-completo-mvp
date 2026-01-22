"use client";

import { useMemo } from "react";
import { Plus, Star } from "lucide-react";
import { useCart } from "../checkout/cart-store";
import type { MenuProduct } from "./menu-full-data";

type CartCategory = "Bebidas" | "Grãos" | "Doces";

function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function toCartCategory(category: MenuProduct["category"]): CartCategory {
  switch (category) {
    case "Grãos & Pacotes":
      return "Grãos";

    case "Doces & Bolos":
    case "Salgados":
      return "Doces";

    case "Cafés Quentes":
    case "Cafés Gelados":
    case "Especiais da Casa":
    case "Chás & Alternativas":
    default:
      return "Bebidas";
  }
}

export default function MenuCatalogList({ items }: { items: MenuProduct[] }) {
  const { addItem } = useCart();

  const grouped = useMemo(() => {
    const map = new Map<string, MenuProduct[]>();
    for (const item of items) {
      const arr = map.get(item.category) ?? [];
      arr.push(item);
      map.set(item.category, arr);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <section aria-label="Itens do cardápio" className="mt-6">
      <div className="space-y-6">
        {grouped.map(([category, list]) => (
          <div
            key={category}
            className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#3a271a]/10 px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold text-[#3a271a]">
                  {category}
                </h3>
                <p className="mt-1 text-sm text-[#3a271a]/70">
                  {list.length} opção(ões) disponíveis
                </p>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <span className="inline-flex items-center gap-2 rounded-2xl border border-[#3a271a]/10 bg-white/55 px-3 py-2 text-xs font-semibold text-[#3a271a]">
                  <Star className="h-4 w-4" aria-hidden="true" />
                  Recomendados
                </span>
              </div>
            </div>

            <ul className="divide-y divide-[#3a271a]/10" role="list">
              {list.map((item) => (
                <li key={item.id} className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="relative overflow-hidden rounded-2xl border border-[#3a271a]/10 bg-white/55 sm:h-[92px] sm:w-[124px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h4 className="text-base font-semibold tracking-wide text-[#3a271a]">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-[#3a271a]">
                            {brl(item.price)}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              addItem({
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                image: item.image,
                                price: item.price,
                                category: toCartCategory(item.category),
                              })
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#3a271a] px-4 py-2.5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
                            aria-label={`Adicionar ${item.title} na sacola`}
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                            Adicionar
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#3a271a]/70">
                        <span className="rounded-full border border-[#3a271a]/10 bg-white/55 px-3 py-1">
                          Feito na hora
                        </span>
                        <span className="rounded-full border border-[#3a271a]/10 bg-white/55 px-3 py-1">
                          Café artesanal
                        </span>
                        <span className="rounded-full border border-[#3a271a]/10 bg-white/55 px-3 py-1">
                          Experiência premium
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
