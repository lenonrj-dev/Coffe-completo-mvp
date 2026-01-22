"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "../checkout/cart-store";
import { brl } from "../menu/format";

export default function CartClient() {
  const { items, removeItem, setQty, clear, subtotal } = useCart();
  const total = useMemo(() => subtotal, [subtotal]);

  return (
    <section>
      <div className="rounded-3xl border border-[#3a271a]/10 bg-white/55 p-6 shadow-sm backdrop-blur-sm">
        <h1 className="font-script text-4xl leading-[1.05]">Sua sacola</h1>
        <p className="mt-2 text-sm text-[#3a271a]/70">
          Revise seus itens e avance para finalizar o pedido.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-[#3a271a]/10 bg-white/55 p-5 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3 border-b border-[#3a271a]/10 pb-4">
            <p className="text-sm font-semibold text-[#3a271a]">
              Itens ({items.length})
            </p>
            <button
              onClick={clear}
              className="text-xs font-semibold text-[#3a271a]/70 transition hover:text-[#3a271a]"
            >
              Limpar sacola
            </button>
          </div>

          {items.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm font-semibold text-[#3a271a]">
                Sua sacola está vazia
              </p>
              <p className="mt-2 text-sm text-[#3a271a]/65">
                Volte ao cardápio e adicione seus itens favoritos.
              </p>

              <Link
                href="/menu"
                className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110"
              >
                Ir para o cardápio
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-4 rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-white/70">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#3a271a]">
                      {it.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#3a271a]/60">
                      {brl(it.price)}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setQty(it.id, it.quantity + 1)}
                        className="h-9 rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm font-semibold text-[#3a271a] transition hover:bg-white"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setQty(it.id, it.quantity - 1)}
                        className="h-9 rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm font-semibold text-[#3a271a] transition hover:bg-white"
                      >
                        –
                      </button>

                      <span className="text-sm text-[#3a271a]/70">
                        Qtd: <b className="text-[#3a271a]">{it.quantity}</b>
                      </span>

                      <button
                        onClick={() => removeItem(it.id)}
                        className="ml-auto text-xs font-semibold text-[#3a271a]/60 transition hover:text-[#3a271a]"
                      >
                        Remover
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#3a271a]">
                      {brl(it.price * it.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="sticky top-6 h-fit rounded-3xl border border-[#3a271a]/10 bg-white/55 p-5 shadow-sm backdrop-blur-sm">
          <p className="text-sm font-semibold text-[#3a271a]">Resumo</p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-[#3a271a]/70">
              <span>Subtotal</span>
              <span>{brl(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold text-[#3a271a]">
              <span>Total</span>
              <span>{brl(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className={`mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#3a271a] px-5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 ${
              items.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Ir para checkout
          </Link>

          <Link
            href="/menu"
            className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[#3a271a]/15 bg-white/70 px-5 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white"
          >
            Continuar escolhendo
          </Link>
        </aside>
      </div>
    </section>
  );
}
