"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../menu/cart-store";
import { brl } from "../menu/format";

type Step = 1 | 2 | 3 | 4;

export default function CheckoutFlow() {
  const { items, subtotal } = useCart();

  const [step, setStep] = useState<Step>(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [dateLabel, setDateLabel] = useState("");
  const [timeRange, setTimeRange] = useState("");

  const [coupon, setCoupon] = useState("");
  const [payMethod, setPayMethod] = useState<"pix" | "card">("pix");

  const total = useMemo(() => subtotal, [subtotal]);

  async function submit() {
    const base = process.env.NEXT_PUBLIC_BACKEND_URL;

    const payload = {
      customer: { name, phone },
      schedule: { dateLabel, timeRange },
      pickup: {
        placeName: "CoffeeCafe",
        addressLine: "Rua 42, 15",
        cityLine: "Vila Santa Cecília, Volta Redonda",
      },
      items: items.map((it) => ({ productId: it.id, quantity: it.quantity })),
      couponCode: coupon || undefined,
      payMethod,
    };

    const res = await fetch(`${base}/checkout/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data?.initPoint) {
      window.location.href = data.initPoint;
      return;
    }

    alert("Falha ao iniciar pagamento. Verifique o backend e tente novamente.");
  }

  if (items.length === 0) {
    return (
      <section className="rounded-3xl border border-[#3a271a]/10 bg-white/55 p-6 shadow-sm backdrop-blur-sm">
        <h1 className="font-script text-4xl leading-[1.05]">Checkout</h1>
        <p className="mt-2 text-sm text-[#3a271a]/70">
          Sua sacola está vazia. Adicione itens antes de finalizar.
        </p>

        <Link
          href="/menu"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110"
        >
          Ir para o cardápio
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="rounded-3xl border border-[#3a271a]/10 bg-white/55 p-6 shadow-sm backdrop-blur-sm">
        <h1 className="font-script text-4xl leading-[1.05]">Checkout</h1>
        <p className="mt-2 text-sm text-[#3a271a]/70">
          Confirme seus dados e finalize o pedido com segurança.
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-[#3a271a]/60">
          <span className={step >= 1 ? "font-semibold text-[#3a271a]" : ""}>
            1 Dados
          </span>
          <span className={step >= 2 ? "font-semibold text-[#3a271a]" : ""}>
            2 Agendamento
          </span>
          <span className={step >= 3 ? "font-semibold text-[#3a271a]" : ""}>
            3 Pagamento
          </span>
          <span className={step >= 4 ? "font-semibold text-[#3a271a]" : ""}>
            4 Revisão
          </span>
        </div>

        <div className="mt-3 h-1 w-full rounded-full bg-[#3a271a]/10">
          <div
            className="h-1 rounded-full bg-[#3a271a]"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-[#3a271a]/10 bg-white/55 p-5 shadow-sm backdrop-blur-sm">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#3a271a]">
                  Seus dados
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/65">
                  Usaremos para confirmar o pedido, se necessário.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-[#3a271a]/70">
                    Nome
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#3a271a]/70">
                    Telefone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
                    placeholder="(DD) 9xxxx-xxxx"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-[#3a271a]">
                  Agendar retirada
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/65">
                  Escolha uma data e horário estimado.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-[#3a271a]/70">
                    Dia
                  </label>
                  <input
                    value={dateLabel}
                    onChange={(e) => setDateLabel(e.target.value)}
                    className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
                    placeholder="ex: quinta, 22 de jan"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#3a271a]/70">
                    Horário
                  </label>
                  <input
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
                    placeholder="ex: 14:00 - 14:30"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#3a271a]/10 bg-[#efe6dc]/35 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Retirar no estabelecimento
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/70">
                  Rua 42, 15 — Vila Santa Cecília, Volta Redonda
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Cupom (opcional)
                </p>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="mt-2 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
                  placeholder="Digite um cupom (ex: CAFE10)"
                />
              </div>

              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Forma de pagamento
                </p>

                <button
                  onClick={() => setPayMethod("pix")}
                  className={`mt-3 flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-sm font-semibold transition ${
                    payMethod === "pix"
                      ? "border-[#3a271a] bg-[#efe6dc]/40 text-[#3a271a]"
                      : "border-[#3a271a]/10 bg-white/60 text-[#3a271a]/75 hover:bg-white"
                  }`}
                >
                  Pix{" "}
                  <span className="rounded-xl bg-[#efe6dc] px-3 py-1 text-xs font-bold text-[#3a271a]">
                    Mais rápido
                  </span>
                </button>

                <button
                  onClick={() => setPayMethod("card")}
                  className={`mt-3 flex h-12 w-full items-center justify-between rounded-2xl border px-4 text-sm font-semibold transition ${
                    payMethod === "card"
                      ? "border-[#3a271a] bg-[#efe6dc]/40 text-[#3a271a]"
                      : "border-[#3a271a]/10 bg-white/60 text-[#3a271a]/75 hover:bg-white"
                  }`}
                >
                  Cartão de crédito <span>›</span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/70 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Revisão do pedido
                </p>

                <div className="mt-3 space-y-2">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center justify-between text-sm text-[#3a271a]/80"
                    >
                      <span>
                        {it.quantity}x {it.title}
                      </span>
                      <span>{brl(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-[#3a271a]/10 pt-4">
                  <div className="flex items-center justify-between text-sm text-[#3a271a]/65">
                    <span>Subtotal</span>
                    <span>{brl(subtotal)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-base font-semibold text-[#3a271a]">
                    <span>Total</span>
                    <span>{brl(total)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#3a271a]/10 bg-[#efe6dc]/35 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Informações
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/70">
                  Ao confirmar, você será redirecionado para o pagamento do Mercado Pago.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
              className="h-11 rounded-2xl border border-[#3a271a]/15 bg-white/70 px-5 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white"
            >
              Voltar
            </button>

            <button
              onClick={() => {
                if (step < 4) setStep((s) => ((s + 1) as Step));
                else submit();
              }}
              className="h-11 rounded-2xl bg-[#3a271a] px-5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110"
            >
              {step < 4 ? "Continuar" : "Confirmar e pagar"}
            </button>
          </div>
        </div>

        <aside className="sticky top-6 h-fit rounded-3xl border border-[#3a271a]/10 bg-white/55 p-5 shadow-sm backdrop-blur-sm">
          <p className="text-sm font-semibold text-[#3a271a]">Resumo</p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-[#3a271a]/70">
              <span>Total</span>
              <span className="font-semibold text-[#3a271a]">{brl(total)}</span>
            </div>
            <div className="text-xs text-[#3a271a]/60">
              Pagamento via Mercado Pago (Checkout Pro).
            </div>
          </div>

          <Link
            href="/carrinho"
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[#3a271a]/15 bg-white/70 px-5 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white"
          >
            Voltar ao carrinho
          </Link>
        </aside>
      </div>
    </section>
  );
}
