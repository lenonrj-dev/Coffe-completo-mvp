import Link from "next/link";

type Order = {
  _id: string;
  status: "created" | "pending" | "paid" | "cancelled";
  customer: { name: string; phone: string };
  total: number;
  createdAt: string;
};

function brl(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function Badge({ status }: { status: Order["status"] }) {
  const map: Record<Order["status"], string> = {
    created: "bg-zinc-100 text-zinc-700",
    pending: "bg-amber-100 text-amber-900",
    paid: "bg-emerald-100 text-emerald-900",
    cancelled: "bg-rose-100 text-rose-900",
  };

  const label: Record<Order["status"], string> = {
    created: "Criado",
    pending: "Pendente",
    paid: "Pago",
    cancelled: "Cancelado",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${map[status]}`}>
      {label[status]}
    </span>
  );
}

export default async function Home() {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const res = await fetch(`${base}/orders`, { cache: "no-store" });
  const data = await res.json();

  const orders: Order[] = data.orders || [];

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Admin • Pedidos
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Lista em tempo real com status atualizado pelo webhook do Mercado Pago.
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href="/"
              className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-100"
            >
              Atualizar
            </a>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="grid grid-cols-12 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold text-zinc-600">
            <div className="col-span-4">Cliente</div>
            <div className="col-span-3">Telefone</div>
            <div className="col-span-2">Total</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Ações</div>
          </div>

          {orders.length === 0 ? (
            <div className="p-6 text-sm text-zinc-600">
              Nenhum pedido encontrado ainda.
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {orders.map((o) => (
                <div
                  key={o._id}
                  className="grid grid-cols-12 items-center px-4 py-4 text-sm"
                >
                  <div className="col-span-4 font-semibold text-zinc-900">
                    {o.customer?.name || "—"}
                  </div>

                  <div className="col-span-3 text-zinc-700">
                    {o.customer?.phone || "—"}
                  </div>

                  <div className="col-span-2 font-semibold">
                    {brl(o.total)}
                  </div>

                  <div className="col-span-2">
                    <Badge status={o.status} />
                  </div>

                  <div className="col-span-1 text-right">
                    <Link
                      href={`${base}/orders/${o._id}`}
                      className="text-xs font-semibold text-zinc-700 underline underline-offset-4 hover:text-zinc-900"
                    >
                      Ver JSON
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4 text-xs text-zinc-600">
          <p>
            ✅ Configure o webhook do Mercado Pago apontando para:
            <span className="ml-2 rounded-md bg-zinc-100 px-2 py-1 font-mono">
              {base}/mercadopago/webhook
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
