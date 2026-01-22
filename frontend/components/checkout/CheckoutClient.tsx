"use client";

import { useMemo, useState } from "react";
import { useCart } from "../checkout/cart-store";
import { brl } from "../menu/format";

export default function CheckoutClient() {
  const { items, subtotal, setQty, removeItem, clear } = useCart();

  const total = useMemo(() => subtotal, [subtotal]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateLabel, setDateLabel] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [coupon, setCoupon] = useState("");
  const [payMethod, setPayMethod] = useState<"pix" | "card">("pix");
  const [loading, setLoading] = useState(false);

  async function submit() {
    try {
      setLoading(true);

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
    } catch (e) {
      console.log(e);
      alert("Erro ao enviar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="rounded-3xl border border-[#3a271a]/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <h1 className="font-script text-4xl leading-tight">Finalizar pedido</h1>
        <p className="mt-2 text-sm text-[#3a271a]/70">
          Preencha seus dados e confirme seu pagamento com segurança.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-[#3a271a]/70">
              Seu nome
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
              placeholder="Ex: Lenon"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#3a271a]/70">
              Telefone/WhatsApp
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
              placeholder="(DD) 9xxxx-xxxx"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#3a271a]/70">
              Dia do pedido
            </label>
            <input
              value={dateLabel}
              onChange={(e) => setDateLabel(e.target.value)}
              className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
              placeholder="Ex: quinta, 22 de jan"
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
              placeholder="Ex: 14:00 - 14:30"
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
          <p className="text-sm font-semibold text-[#3a271a]">Cupom</p>
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="mt-2 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
            placeholder="Ex: CAFE10"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
          <p className="text-sm font-semibold text-[#3a271a]">Pagamento</p>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setPayMethod("pix")}
              className={`h-12 rounded-2xl border px-4 text-sm font-semibold transition ${
                payMethod === "pix"
                  ? "border-[#3a271a] bg-[#efe6dc]/40 text-[#3a271a]"
                  : "border-[#3a271a]/10 bg-white/60 text-[#3a271a]/75 hover:bg-white"
              }`}
            >
              Pix
            </button>

            <button
              onClick={() => setPayMethod("card")}
              className={`h-12 rounded-2xl border px-4 text-sm font-semibold transition ${
                payMethod === "card"
                  ? "border-[#3a271a] bg-[#efe6dc]/40 text-[#3a271a]"
                  : "border-[#3a271a]/10 bg-white/60 text-[#3a271a]/75 hover:bg-white"
              }`}
            >
              Cartão
            </button>
          </div>
        </div>
      </div>

      <aside className="rounded-3xl border border-[#3a271a]/10 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#3a271a]">Resumo</h2>

          <button
            onClick={clear}
            className="text-xs font-semibold text-[#3a271a]/70 transition hover:text-[#3a271a]"
          >
            Limpar
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-[#3a271a]/65">
              Seu carrinho está vazio.
            </p>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                className="flex items-start justify-between gap-3 rounded-2xl border border-[#3a271a]/10 bg-white/50 p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#3a271a]">
                    {it.title}
                  </p>
                  <p className="mt-1 text-xs text-[#3a271a]/60">
                    {brl(it.price)}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQty(it.id, it.quantity - 1)}
                      className="h-9 w-9 rounded-xl border border-[#3a271a]/10 bg-white/60 text-sm font-semibold text-[#3a271a]"
                    >
                      –
                    </button>
                    <div className="grid h-9 min-w-[44px] place-items-center rounded-xl bg-[#efe6dc] text-sm font-semibold text-[#3a271a]">
                      {it.quantity}
                    </div>
                    <button
                      onClick={() => setQty(it.id, it.quantity + 1)}
                      className="h-9 w-9 rounded-xl border border-[#3a271a]/10 bg-white/60 text-sm font-semibold text-[#3a271a]"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(it.id)}
                      className="ml-2 text-xs font-semibold text-[#3a271a]/60 hover:text-[#3a271a]"
                    >
                      Remover
                    </button>
                  </div>
                </div>

                <p className="text-sm font-semibold text-[#3a271a]">
                  {brl(it.price * it.quantity)}
                </p>
              </div>
            ))
          )}
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

          <button
            onClick={submit}
            disabled={items.length === 0 || loading}
            className="mt-4 h-12 w-full rounded-2xl bg-[#3a271a] text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Processando..." : "Ir para pagamento"}
          </button>
        </div>
      </aside>
    </section>
  );
}
