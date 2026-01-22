"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CatalogProduct } from "../checkout/catalog";
import { useCart } from "../checkout/cart-store";
import { brl } from "../checkout/format";
import CartSidebar from "../checkout/CartSidebar";

function Panel({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#3a271a]/10 bg-white/55 shadow-sm backdrop-blur-sm">
      <div className="flex items-start justify-between gap-4 border-b border-[#3a271a]/10 px-5 py-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#3a271a]">{title}</p>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-[#3a271a]/65">{subtitle}</p>
          ) : null}
        </div>

        {right ? <div className="shrink-0">{right}</div> : null}
      </div>

      {children}
    </div>
  );
}

export default function MenuOrderSection() {
  const router = useRouter();
  const { addItem } = useCart();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<"Todos" | "Bebidas" | "Grãos" | "Doces">(
    "Todos"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const base = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${base}/api/products`, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(
            `Falha ao carregar produtos (HTTP ${res.status}). Verifique o backend.`
          );
        }

        const data = await res.json();
        if (!active) return;

        setProducts(data.products || []);
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || "Não foi possível carregar os produtos agora.");
        setProducts([]);
      } finally {
        if (!active) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-script text-4xl leading-[1.05]">Cardápio</h2>
          <p className="mt-1 text-sm text-[#3a271a]/70">
            Adicione itens à sacola e revise no carrinho quando quiser.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="relative">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value as any)}
              className="h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 text-sm text-[#3a271a] shadow-sm outline-none transition focus:border-[#3a271a]/25 focus:ring-2 focus:ring-[#3a271a]/15 md:w-[240px]"
              aria-label="Filtrar por categoria"
            >
              <option value="Todos">Lista de categorias</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Grãos">Grãos</option>
              <option value="Doces">Doces</option>
            </select>
          </div>

          <div className="relative w-full md:w-[320px]">
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
        <Panel
          title="Produtos disponíveis"
          subtitle={
            loading
              ? "Carregando cardápio…"
              : `${filtered.length} item(ns) — clique em Adicionar para colocar na sacola.`
          }
        >
          <div className="px-5 py-4">
            {error ? (
              <div className="rounded-2xl border border-[#3a271a]/10 bg-[#efe6dc]/35 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Não foi possível carregar o cardápio
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/70">{error}</p>
              </div>
            ) : null}

            <div className="mt-2 max-h-[620px] overflow-y-auto rounded-2xl border border-[#3a271a]/10 bg-white/40 p-4">
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[92px] rounded-2xl border border-[#3a271a]/10 bg-white/60"
                    />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-[#3a271a]/10 bg-white/55 p-4">
                  <p className="text-sm font-semibold text-[#3a271a]">
                    Nenhum item encontrado
                  </p>
                  <p className="mt-1 text-xs text-[#3a271a]/65">
                    Ajuste o filtro de categoria ou tente outra busca.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {filtered.map((p) => (
                    <li
                      key={p.id}
                      className="flex flex-col gap-3 rounded-2xl border border-[#3a271a]/10 bg-white/55 p-4 shadow-sm transition hover:bg-white"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl bg-white/55">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#3a271a]/55">
                                {p.category.toUpperCase()}
                              </p>
                              <h3 className="mt-1 text-base font-semibold leading-snug text-[#3a271a]">
                                {p.title}
                              </h3>
                            </div>

                            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                              <p className="text-sm font-semibold text-[#3a271a]">
                                {brl(p.price)}
                              </p>

                              <button
                                onClick={() => addItem(p)}
                                className="h-10 rounded-2xl bg-[#3a271a] px-4 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
                              >
                                Adicionar
                              </button>
                            </div>
                          </div>

                          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-[#3a271a]/70">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Panel>

        <CartSidebar onContinue={() => router.push("/carrinho")} />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 md:hidden">
        <div className="pointer-events-auto mx-auto max-w-[1100px]">
          <button
            onClick={() => router.push("/carrinho")}
            className="h-12 w-full rounded-2xl bg-[#3a271a] text-sm font-semibold text-[#efe6dc] shadow-lg transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
          >
            Ver carrinho
          </button>
        </div>
      </div>
    </section>
  );
}
