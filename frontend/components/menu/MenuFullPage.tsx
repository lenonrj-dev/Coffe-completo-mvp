"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import MenuPromos from "./MenuPromos";
import MenuCatalogList from "./MenuCatalogList";
import MenuCartSummary from "./MenuCartSummary";
import type { MenuProduct } from "./menu-full-data";
import { menuFallbackProducts } from "./menu-full-data";

type BackendProduct = {
  id?: string;
  _id?: string;
  title?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
};

function normalizeBackendProduct(p: BackendProduct): MenuProduct | null {
  const id = p.id ?? p._id;
  const title = p.title ?? p.name;

  if (!id || !title || typeof p.price !== "number") return null;

  const category =
    (p.category as MenuProduct["category"]) ?? "Especiais da Casa";

  return {
    id: String(id),
    title,
    description:
      p.description?.trim() ||
      "Uma escolha perfeita pra transformar sua pausa em experiência premium.",
    price: p.price,
    image:
      p.image?.trim() ||
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    category,
  };
}

export default function MenuFullPage() {
  const [backendItems, setBackendItems] = useState<MenuProduct[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Todos");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!base) return;

        const res = await fetch(`${base}/api/products`, {
          cache: "no-store",
        });

        if (!res.ok) return;
        const data = await res.json();

        const rawList: BackendProduct[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : [];

        const normalized = rawList
          .map((p) => normalizeBackendProduct(p))
          .filter(Boolean) as MenuProduct[];

        if (!cancelled) setBackendItems(normalized);
      } catch {
        // silêncio proposital: fallback local garante o cardápio bonito
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const allItems = useMemo(() => {
    const map = new Map<string, MenuProduct>();

    // primeiro o backend (se existir)
    for (const item of backendItems) map.set(item.id, item);

    // depois o fallback (pra completar o cardápio)
    for (const item of menuFallbackProducts) {
      if (!map.has(item.id)) map.set(item.id, item);
    }

    return Array.from(map.values());
  }, [backendItems]);

  const categories = useMemo(() => {
    const unique = new Set(allItems.map((i) => i.category));
    return ["Todos", ...Array.from(unique)];
  }, [allItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return allItems.filter((item) => {
      const matchCategory = category === "Todos" || item.category === category;

      const matchQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [allItems, category, query]);

  return (
    <main className="mx-auto w-full max-w-[1320px] px-6 pb-14 pt-8">
      <header className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              CARDÁPIO COMPLETO • CAFÉS • DOCES • GRÃOS
            </p>
            <h1 className="mt-2 font-script text-4xl leading-[1.02] text-[#3a271a] md:text-5xl">
              Cardápio CoffeeCafe
            </h1>
            <p className="mt-3 max-w-[72ch] text-sm leading-7 text-[#3a271a]/70">
              Explore variedades, descubra sabores e monte seu pedido do seu jeito.
              Aqui você encontra cafés quentes, gelados, grãos especiais e
              acompanhamentos perfeitos.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/carrinho"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#3a271a] px-5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
            >
              Revisar sacola
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/novidades"
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#3a271a]/12 bg-white/55 px-5 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/30"
            >
              Dicas & receitas
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_240px]">
          <label className="relative">
            <span className="sr-only">Buscar no cardápio</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3a271a]/55"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por café, doce, grão, método..."
              className="h-11 w-full rounded-2xl border border-[#3a271a]/12 bg-white/60 pl-11 pr-4 text-sm text-[#3a271a] placeholder:text-[#3a271a]/45 shadow-sm outline-none transition focus:border-[#3a271a]/25 focus:bg-white focus:ring-2 focus:ring-[#3a271a]/25"
            />
          </label>

          <label className="relative">
            <span className="sr-only">Filtrar por categoria</span>
            <SlidersHorizontal
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#3a271a]/55"
              aria-hidden="true"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full appearance-none rounded-2xl border border-[#3a271a]/12 bg-white/60 pl-11 pr-10 text-sm font-semibold text-[#3a271a] shadow-sm outline-none transition focus:border-[#3a271a]/25 focus:bg-white focus:ring-2 focus:ring-[#3a271a]/25"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <MenuPromos />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          {filtered.length === 0 ? (
            <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-6 text-sm leading-7 text-[#3a271a]/75 shadow-sm">
              Nada encontrado para sua busca.
              <span className="ml-2 font-semibold text-[#3a271a]">
                Tente outro termo
              </span>
              , ou selecione "Todos" para ver o cardápio completo.
            </div>
          ) : (
            <MenuCatalogList items={filtered} />
          )}
        </div>

        <MenuCartSummary />
      </div>

      <div className="mt-10 lg:hidden">
        <Link
          href="/carrinho"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-[#3a271a] px-4 py-3 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          Revisar sacola e finalizar
        </Link>
      </div>
    </main>
  );
}
