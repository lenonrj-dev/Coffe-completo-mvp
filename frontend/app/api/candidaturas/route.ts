import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const role = String(form.get("role") || "");
    const message = String(form.get("message") || "");
    const resume = form.get("resume");

    if (!name || !email || !phone || !role || !message || !resume) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // 🔥 Futuro (quando quiser evoluir):
    // - salvar no banco
    // - enviar email
    // - enviar pra webhook/CRM
    // - subir currículo pra storage
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erro ao processar candidatura." },
      { status: 500 }
    );
  }
}
