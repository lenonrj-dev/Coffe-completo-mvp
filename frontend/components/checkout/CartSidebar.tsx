"use client";

import { useMemo } from "react";
import { useCart } from "./cart-store";
import { brl } from "./format";

export default function CartSidebar({
  onContinue,
}: {
  onContinue: () => void;
}) {
  const { items, removeItem, setQty, clear, subtotal } = useCart();

  const total = useMemo(() => subtotal, [subtotal]);

  return (
    <aside className="sticky top-6 hidden h-fit w-full max-w-[340px] md:block">
      <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 shadow-sm backdrop-blur-sm">
        <div className="border-b border-[#3a271a]/10 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#3a271a]">Sua sacola</h3>
            <button
              onClick={clear}
              className="text-xs font-semibold text-[#3a271a]/70 transition hover:text-[#3a271a]"
            >
              LIMPAR
            </button>
          </div>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <p className="text-sm text-[#3a271a]/65">
              Sua sacola está vazia. Adicione itens do menu.
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-3 rounded-2xl border border-[#3a271a]/10 bg-white/40 p-3"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#efe6dc] text-sm font-semibold text-[#3a271a]">
                    {it.quantity}x
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#3a271a]">
                      {it.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#3a271a]/60">
                      {brl(it.price)}
                    </p>

                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <button
                        onClick={() => setQty(it.id, it.quantity + 1)}
                        className="rounded-xl border border-[#3a271a]/10 bg-white/50 px-2 py-1 font-semibold text-[#3a271a] transition hover:bg-white"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setQty(it.id, it.quantity - 1)}
                        className="rounded-xl border border-[#3a271a]/10 bg-white/50 px-2 py-1 font-semibold text-[#3a271a] transition hover:bg-white"
                      >
                        –
                      </button>

                      <button
                        onClick={() => removeItem(it.id)}
                        className="ml-auto font-semibold text-[#3a271a]/60 transition hover:text-[#3a271a]"
                      >
                        Remover
                      </button>
                    </div>
                  </div>

                  <div className="h-12 w-12 overflow-hidden rounded-xl bg-white/50">
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 border-t border-[#3a271a]/10 pt-4">
            <div className="flex items-center justify-between text-sm text-[#3a271a]/65">
              <span>Subtotal</span>
              <span>{brl(subtotal)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-base font-semibold text-[#3a271a]">
              <span>Total</span>
              <span>{brl(total)}</span>
            </div>

            <button
              onClick={onContinue}
              disabled={items.length === 0}
              className="mt-4 h-12 w-full rounded-2xl bg-[#3a271a] text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuar pedido
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
