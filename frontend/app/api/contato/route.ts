import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Aqui você pode futuramente enviar para:
    // - banco
    // - e-mail
    // - webhook
    // - CRM
    // Por enquanto: resposta OK e pronta pra evoluir.

    if (!body?.name || !body?.email || !body?.subject || !body?.message) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro ao processar solicitação." },
      { status: 500 }
    );
  }
}
