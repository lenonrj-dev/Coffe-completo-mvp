"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "./cart-store";

function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

type CheckoutResponse = {
  init_point?: string;
  checkoutUrl?: string;
  url?: string;
};

export default function CheckoutClient() {
  const { items, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + ("quantity" in item ? (item as any).quantity : 1), 0);
  }, [items]);

  const canCheckout = items.length > 0 && !loading;

  async function handleCheckout() {
    if (!canCheckout) return;

    try {
      setLoading(true);
      setError(null);

      // ✅ Checkout Pro: enviamos apenas os itens e valores.
      // O usuário escolhe o método de pagamento no Mercado Pago.
      const payload = {
        items: items.map((i) => ({
          id: i.id,
          title: i.title,
          description: i.description,
          picture_url: i.image,
          quantity: (i as any).quantity ?? 1,
          unit_price: i.price,
        })),
        subtotal,
      };

      // ✅ ROTA CERTA: /api/checkout (do próprio Next.js)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: CheckoutResponse | null = null;
      try {
        data = text ? (JSON.parse(text) as CheckoutResponse) : null;
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(
          (data as any)?.message ||
            "Não foi possível iniciar o checkout agora."
        );
      }

      const url = data?.init_point || data?.checkoutUrl || data?.url;
      if (!url) {
        throw new Error("Resposta inválida do checkout.");
      }

      // ✅ Redireciona para o Checkout Pro (Mercado Pago)
      window.location.href = url;
    } catch (err: any) {
      setError(err?.message || "Falha ao iniciar o checkout.");
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1100px] px-6 pb-14 pt-10">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#3a271a]/55">
              CHECKOUT • REVISÃO DO PEDIDO
            </p>
            <h1 className="mt-2 font-script text-4xl leading-[1.05] md:text-5xl">
              Finalizar pedido
            </h1>
            <p className="mt-2 max-w-[70ch] text-sm leading-7 text-[#3a271a]/75">
              Confirme sua sacola e siga para o pagamento seguro pelo Mercado Pago.
            </p>
          </div>

          <Link
            href="/carrinho"
            className="hidden rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 py-2 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35 md:inline-flex"
          >
            ← Voltar
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              ITENS
            </p>
            <p className="mt-2 text-sm font-semibold text-[#3a271a]">
              {totalItems === 0
                ? "Sua sacola está vazia"
                : `${totalItems} item(ns) selecionado(s)`}
            </p>
            <p className="mt-1 text-sm text-[#3a271a]/70">
              Revise antes de pagar.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              SUBTOTAL
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#3a271a]">
              {brl(subtotal)}
            </p>
            <p className="mt-1 text-sm text-[#3a271a]/70">
              Pagamento pelo Checkout Pro.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              SEGURANÇA
            </p>
            <div className="mt-2 flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-[#3a271a]" />
              <p className="text-sm leading-6 text-[#3a271a]/75">
                Seus dados são processados com segurança pelo Mercado Pago.
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <section className="mt-6 grid gap-6 md:grid-cols-[1fr_360px]">
        <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 shadow-sm">
          <div className="border-b border-[#3a271a]/10 px-5 py-4">
            <h2 className="text-lg font-semibold text-[#3a271a]">
              Resumo da sacola
            </h2>
            <p className="mt-1 text-sm text-[#3a271a]/70">
              Confira os itens antes de seguir.
            </p>
          </div>

          <ul className="divide-y divide-[#3a271a]/10" role="list">
            {items.length === 0 ? (
              <li className="p-5">
                <p className="text-sm text-[#3a271a]/70">
                  Nenhum item adicionado. Volte ao menu para escolher suas bebidas.
                </p>
              </li>
            ) : (
              items.map((item) => (
                <li key={item.id} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative h-[72px] w-[92px] overflow-hidden rounded-2xl border border-[#3a271a]/10 bg-white/55">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-medium tracking-[0.18em] text-[#3a271a]/55">
                            {item.category?.toUpperCase?.() || "COFFEE"}
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-[#3a271a]">
                            {item.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-[#3a271a]/70">
                            {item.description}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-sm font-semibold text-[#3a271a]">
                            {brl(item.price)}
                          </p>
                          <p className="mt-1 text-xs text-[#3a271a]/60">
                            Qtd: {(item as any).quantity ?? 1}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        <aside className="h-fit rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
            FINALIZAR
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[#3a271a]">
            Pagamento seguro
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
            Ao continuar, você será direcionado ao checkout do Mercado Pago para
            escolher a forma de pagamento.
          </p>

          {error ? (
            <div
              role="alert"
              className="mt-4 rounded-[18px] border border-[#3a271a]/10 bg-white/60 p-4"
            >
              <p className="text-sm font-semibold text-[#3a271a]">
                Não foi possível continuar.
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3a271a]/75">{error}</p>
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={!canCheckout}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Abrindo Mercado Pago...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  Continuar para pagamento
                </>
              )}
            </button>

            <button
              type="button"
              onClick={clear}
              disabled={items.length === 0 || loading}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[#3a271a]/12 bg-white/55 px-6 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Limpar sacola
            </button>

            <Link
              href="/menu"
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[#3a271a]/12 bg-white/35 px-6 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/30"
            >
              Voltar ao cardápio
            </Link>
          </div>

          <p className="mt-4 text-xs leading-6 text-[#3a271a]/60">
            * Após o pagamento, você será redirecionado automaticamente.
          </p>
        </aside>
      </section>

      <div className="mt-10 md:hidden">
        <Link
          href="/carrinho"
          className="inline-flex rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 py-2 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          ← Voltar para o carrinho
        </Link>
      </div>
    </main>
  );
}
