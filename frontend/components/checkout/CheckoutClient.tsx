"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "./cart-store";

type Status = "idle" | "loading" | "success" | "error";

function brl(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function getBackendBase() {
  const raw =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_BACKEND_API_URL ||
    "https://coffe-backend-mvp.vercel.app";

  return raw.replace(/\/$/, "");
}

function extractCheckoutUrl(data: any): string | null {
  if (!data) return null;
  return (
    data?.init_point ||
    data?.sandbox_init_point ||
    data?.checkoutUrl ||
    data?.checkout_url ||
    data?.url ||
    data?.redirectUrl ||
    null
  );
}

export default function CheckoutClient() {
  const { items, subtotal, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const totalItems = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.quantity ?? 1), 0);
  }, [items]);

  const canPay = subtotal > 0 && items.length > 0 && status !== "loading";

  async function handlePay() {
    if (!canPay) return;

    setStatus("loading");
    setErrorMsg("");

    const BACKEND = getBackendBase();

    // ✅ Seu backend em JS pode estar montado em diferentes caminhos.
    // Pela sua estrutura (routes + app.js + server.js), o mais comum é:
    // POST  /api/checkout/create
    // ou    /api/checkout
    const candidates = [
      `${BACKEND}/api/checkout/create`,
      `${BACKEND}/api/checkout`,
    ];

    const payload = {
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        image: i.image,
        price: i.price,
        quantity: i.quantity ?? 1,
      })),
      subtotal,
      currency: "BRL",
      source: "frontend",
    };

    let lastText = "";

    for (const endpoint of candidates) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const contentType = res.headers.get("content-type") || "";

        if (!res.ok) {
          // tenta capturar texto pra facilitar debug sem quebrar o fluxo
          lastText = await res.text().catch(() => "");
          continue;
        }

        if (!contentType.includes("application/json")) {
          lastText = await res.text().catch(() => "");
          continue;
        }

        const data = await res.json();
        const checkoutUrl = extractCheckoutUrl(data);

        if (!checkoutUrl) {
          lastText = JSON.stringify(data);
          continue;
        }

        setStatus("success");

        // ✅ Redireciona para o Checkout Pro do Mercado Pago
        window.location.href = checkoutUrl;
        return;
      } catch (err) {
        lastText = String(err);
      }
    }

    setStatus("error");
    setErrorMsg(
      lastText
        ? `Não foi possível iniciar o checkout. Detalhe: ${lastText.slice(0, 160)}...`
        : "Não foi possível iniciar o checkout agora."
    );
  }

  return (
    <section aria-label="Checkout" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-7"
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-[#3a271a]/60">
              <Lock className="h-4 w-4" aria-hidden="true" />
              CHECKOUT SEGURO
            </p>
            <h1 className="mt-2 font-script text-4xl leading-[1.05] md:text-5xl">
              Finalizar pedido
            </h1>
            <p className="mt-2 max-w-[60ch] text-sm leading-7 text-[#3a271a]/75">
              Você será redirecionado para o Checkout Pro do Mercado Pago para
              escolher Pix, cartão ou boleto.
            </p>
          </div>

          <Link
            href="/carrinho"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#3a271a]/10 bg-white/55 px-4 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Voltar à sacola
          </Link>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              RESUMO
            </p>

            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#3a271a]/70">Itens</span>
                <span className="font-semibold text-[#3a271a]">
                  {totalItems}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#3a271a]/70">Subtotal</span>
                <span className="font-semibold text-[#3a271a]">
                  {brl(subtotal)}
                </span>
              </div>

              <div className="h-px w-full bg-[#3a271a]/10" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#3a271a]/70">Total</span>
                <span className="text-base font-semibold text-[#3a271a]">
                  {brl(subtotal)}
                </span>
              </div>
            </div>

            {status === "success" ? (
              <div
                role="status"
                className="mt-4 flex items-start gap-3 rounded-[22px] border border-[#3a271a]/10 bg-white/60 p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 text-[#3a271a]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#3a271a]">
                    Redirecionando…
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#3a271a]/75">
                    Abrindo Mercado Pago para finalizar seu pedido.
                  </p>
                </div>
              </div>
            ) : null}

            {status === "error" ? (
              <div
                role="alert"
                className="mt-4 flex items-start gap-3 rounded-[22px] border border-[#3a271a]/10 bg-white/60 p-4"
              >
                <AlertTriangle className="mt-0.5 size-5 text-[#3a271a]" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#3a271a]">
                    Falha ao iniciar o checkout.
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#3a271a]/75">
                    {errorMsg ||
                      "Verifique a URL do backend e tente novamente."}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handlePay}
                disabled={!canPay}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Preparando…
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" aria-hidden="true" />
                    Pagar com Mercado Pago
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={clear}
                disabled={items.length === 0 || status === "loading"}
                className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[#3a271a]/12 bg-white/55 px-6 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/30"
              >
                Limpar sacola
              </button>
            </div>

            <p className="mt-3 text-xs leading-5 text-[#3a271a]/60">
              Ao continuar, você aceita os termos do Mercado Pago. Nós não
              armazenamos dados do cartão.
            </p>
          </div>

          <aside className="h-fit rounded-[22px] border border-[#3a271a]/10 bg-white/45 p-5 shadow-sm">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#3a271a]/60">
              DICA
            </p>
            <p className="mt-2 text-sm leading-6 text-[#3a271a]/75">
              Quer um pedido mais “certeiro”? Espresso + doce é a combinação
              mais rápida pra acertar no sabor.
            </p>

            <div className="mt-4 rounded-2xl border border-[#3a271a]/10 bg-white/55 p-4">
              <p className="text-sm font-semibold text-[#3a271a]">
                Precisa de ajuda?
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3a271a]/75">
                Fale com a equipe e finalize seu pedido com tranquilidade.
              </p>

              <Link
                href="/contato"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-[#3a271a]/12 bg-white/55 px-4 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/30"
              >
                Ir para contato
              </Link>
            </div>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
