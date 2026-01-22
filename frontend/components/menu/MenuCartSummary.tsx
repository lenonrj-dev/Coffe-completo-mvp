"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useCart } from "../checkout/cart-store";

function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function MenuCartSummary() {
  const { items, subtotal, clear } = useCart();

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const raw = (item as any)?.qty ?? (item as any)?.quantity ?? (item as any)?.qtd;
      const qty = typeof raw === "number" && Number.isFinite(raw) ? raw : 1;
      return acc + Math.max(1, Math.floor(qty));
    }, 0);
  }, [items]);

  return (
    <aside
      aria-label="Resumo da sacola"
      className="sticky top-6 hidden h-fit rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm lg:block"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
            SACOLA
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[#3a271a]">
            Seu pedido
          </h3>
          <p className="mt-1 text-sm text-[#3a271a]/70">
            {totalItems === 0
              ? "Nenhum item adicionado ainda."
              : `${totalItems} item(s) na sacola.`}
          </p>
        </div>

        <button
          type="button"
          onClick={clear}
          disabled={items.length === 0}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#3a271a]/10 bg-white/55 px-3 py-2 text-xs font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Limpar sacola"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Limpar
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-[#3a271a]/10 bg-white/55 p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-[#3a271a]">Subtotal</span>
            <span className="text-sm font-semibold text-[#3a271a]">
              {brl(subtotal)}
            </span>
          </div>
          <p className="mt-2 text-xs leading-5 text-[#3a271a]/65">
            O checkout é feito na sequência: sacola → revisão → finalizar pedido.
          </p>
        </div>

        <Link
          href="/carrinho"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#3a271a] px-4 py-3 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Ir para o carrinho
        </Link>

        <Link
          href="/contato"
          className="inline-flex w-full items-center justify-center rounded-2xl border border-[#3a271a]/12 bg-white/55 px-4 py-3 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/30"
        >
          Precisa de ajuda? Fale com a gente
        </Link>
      </div>

      <div className="mt-5 rounded-2xl border border-[#3a271a]/10 bg-white/45 p-4">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
          DICA
        </p>
        <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
          Quer um pedido mais "certeiro"? Comece pelo espresso e finalize com um
          doce — é a combinação mais rápida pra acertar no sabor.
        </p>
      </div>
    </aside>
  );
}
