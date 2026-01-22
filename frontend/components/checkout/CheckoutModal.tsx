"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "./cart-store";
import { brl } from "./format";

type Step = 1 | 2 | 3 | 4;

export default function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, subtotal } = useCart();

  const [step, setStep] = useState<Step>(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [dateLabel, setDateLabel] = useState("");
  const [timeRange, setTimeRange] = useState("");

  const [coupon, setCoupon] = useState("");
  const [payMethod, setPayMethod] = useState<"pix" | "card">("pix");

  const total = useMemo(() => subtotal, [subtotal]);

  // ✅ Reset completo quando abrir (UX certinha)
  useEffect(() => {
    if (!open) return;

    setStep(1);
    setName("");
    setPhone("");
    setDateLabel("");
    setTimeRange("");
    setCoupon("");
    setPayMethod("pix");
  }, [open]);

  // ✅ trava scroll do body enquanto modal estiver aberto
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const canContinueStep1 =
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    dateLabel.trim().length > 0 &&
    timeRange.trim().length > 0;

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-[81] w-full max-w-[520px] rounded-3xl border border-[#3a271a]/10 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#3a271a]/10 px-5 py-4">
          <button
            onClick={() => {
              if (step === 1) onClose();
              else setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
            }}
            className="rounded-xl px-2 py-1 text-sm font-semibold text-[#3a271a]/70 transition hover:text-[#3a271a]"
          >
            ←
          </button>

          <div className="text-sm font-semibold text-[#3a271a]">Checkout</div>

          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl border border-[#3a271a]/10 bg-white/60 text-[#3a271a]/70 transition hover:text-[#3a271a]"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between text-xs text-[#3a271a]/60">
            <span className={step >= 1 ? "font-semibold text-[#3a271a]" : ""}>
              1 Entrega
            </span>
            <span className={step >= 2 ? "font-semibold text-[#3a271a]" : ""}>
              2 Fidelidade
            </span>
            <span className={step >= 3 ? "font-semibold text-[#3a271a]" : ""}>
              3 Pagamento
            </span>
            <span className={step >= 4 ? "font-semibold text-[#3a271a]" : ""}>
              4 Confirmação
            </span>
          </div>

          <div className="mt-3 h-1 w-full rounded-full bg-[#3a271a]/10">
            <div
              className="h-1 rounded-full bg-[#3a271a]"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {step === 1 && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-[#3a271a]/10 bg-[#efe6dc]/35 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Retirar no estabelecimento
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/70">
                  Rua 42, 15 — Vila Santa Cecília, Volta Redonda
                </p>
              </div>

              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Agendar pedido
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
              </div>

              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Seus dados
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/65">
                  Preencha para contato caso necessário.
                </p>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-[#3a271a]/70">
                      Nome
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
                      placeholder="Digite seu nome"
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
            </div>
          )}

          {step === 2 && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Fidelidade
                </p>
                <p className="mt-1 text-sm text-[#3a271a]/70">
                  Quer ganhar pontos e trocar por prêmios e descontos?
                </p>
                <p className="mt-2 text-xs text-[#3a271a]/55">
                  (Demo) — pode virar uma regra real depois.
                </p>
              </div>

              <div className="space-y-3 opacity-70">
                {[
                  "Desconto de R$ 10,00 — 500 pontos",
                  "Desconto de R$ 20,00 — 700 pontos",
                  "Desconto de R$ 30,00 — 1500 pontos",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center justify-between rounded-2xl border border-[#3a271a]/10 bg-white/50 p-4"
                  >
                    <span className="text-sm text-[#3a271a]/75">{t}</span>
                    <button className="text-xs font-semibold text-[#3a271a]/40">
                      RESGATAR
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">Cupom</p>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="mt-2 h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/70 px-3 text-sm outline-none focus:ring-2 focus:ring-[#3a271a]/15"
                  placeholder="Digite um cupom (opcional)"
                />
              </div>

              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Pagar online
                </p>

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
                    Mais usado
                  </span>
                </button>

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
            </div>
          )}

          {step === 4 && (
            <div className="mt-5 space-y-4">
              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Pedido agendado para
                </p>
                <p className="mt-2 text-center text-lg font-semibold text-[#3a271a]">
                  {dateLabel}
                </p>
                <p className="text-center text-base text-[#3a271a]/70">
                  {timeRange}
                </p>
              </div>

              <div className="rounded-2xl border border-[#3a271a]/10 bg-white/60 p-4">
                <p className="text-sm font-semibold text-[#3a271a]">
                  Retirar no estabelecimento
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/70">
                  CoffeeCafe • {phone}
                </p>
                <p className="mt-1 text-xs text-[#3a271a]/70">
                  Rua 42, 15 — Vila Santa Cecília, Volta Redonda
                </p>

                <div className="mt-4 space-y-2">
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
            </div>
          )}
        </div>

        <div className="border-t border-[#3a271a]/10 px-5 py-4">
          <button
            onClick={() => {
              if (step < 4) setStep((s) => ((s + 1) as Step));
              else submit();
            }}
            disabled={
              items.length === 0 || (step === 1 && !canContinueStep1)
            }
            className="h-12 w-full rounded-2xl bg-[#3a271a] text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step < 4 ? "CONTINUAR" : "ENVIAR PEDIDO"}
          </button>
        </div>
      </div>
    </div>
  );
}
