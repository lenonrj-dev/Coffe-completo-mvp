"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { careersData } from "./careers-data";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

type OpeningRole = (typeof careersData.openings)[number]["role"];
type RoleValue = OpeningRole | "Banco de Talentos";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-[0.18em] text-[#3a271a]/55">
      {children}
    </span>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/65 px-4 text-sm text-[#3a271a] shadow-sm outline-none transition",
        "placeholder:text-[#3a271a]/45 focus:border-[#3a271a]/20 focus:ring-2 focus:ring-[#3a271a]/15",
        props.className || "",
      ].join(" ")}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "h-11 w-full rounded-2xl border border-[#3a271a]/10 bg-white/65 px-4 text-sm text-[#3a271a] shadow-sm outline-none transition",
        "focus:border-[#3a271a]/20 focus:ring-2 focus:ring-[#3a271a]/15",
        props.className || "",
      ].join(" ")}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "w-full resize-none rounded-2xl border border-[#3a271a]/10 bg-white/65 px-4 py-3 text-sm text-[#3a271a] shadow-sm outline-none transition",
        "placeholder:text-[#3a271a]/45 focus:border-[#3a271a]/20 focus:ring-2 focus:ring-[#3a271a]/15",
        props.className || "",
      ].join(" ")}
    />
  );
}

export default function CareersApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");

  const defaultRole = (careersData.openings?.[0]?.role ?? "Banco de Talentos") as RoleValue;

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<RoleValue>(defaultRole);
  const [linkedin, setLinkedin] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);
  const [consent, setConsent] = useState<boolean>(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};

    if (name.trim().length < 2) e.name = "Informe seu nome.";
    if (!email.includes("@")) e.email = "Digite um e-mail válido.";

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) e.phone = "Informe um telefone com DDD.";

    if (!role.trim()) e.role = "Selecione uma vaga.";

    if (message.trim().length < 20)
      e.message = "Conte um pouco mais sobre você (mín. 20 caracteres).";

    if (!resume) e.resume = "Anexe seu currículo (PDF ou DOC).";
    if (!consent) e.consent = "Você precisa autorizar o envio.";

    return e;
  }, [name, email, phone, role, message, resume, consent]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "loading";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setStatus("loading");

      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("phone", phone);
      form.append("role", role);
      form.append("linkedin", linkedin);
      form.append("message", message);
      if (resume) form.append("resume", resume);

      const res = await fetch("/api/candidaturas", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Falha");

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setRole(defaultRole);
      setLinkedin("");
      setMessage("");
      setResume(null);
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="apply-title">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-7"
      >
        <h2 id="apply-title" className="font-script text-4xl leading-[1.05]">
          {careersData.form.title}
        </h2>

        <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
          {careersData.form.desc}
        </p>

        {status === "success" && (
          <div
            role="status"
            className="mt-4 flex items-start gap-3 rounded-[22px] border border-[#3a271a]/10 bg-white/60 p-4"
          >
            <CheckCircle2 className="mt-0.5 size-5 text-[#3a271a]" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#3a271a]">
                {careersData.form.successTitle}
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3a271a]/75">
                {careersData.form.successDesc}
              </p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="mt-4 rounded-[22px] border border-[#3a271a]/10 bg-white/60 p-4"
          >
            <p className="text-sm font-semibold text-[#3a271a]">
              Não foi possível enviar agora.
            </p>
            <p className="mt-1 text-sm leading-6 text-[#3a271a]/75">
              Tente novamente em alguns instantes.
            </p>
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <Label>Nome</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                aria-invalid={!!errors.name}
              />
              {errors.name ? (
                <p className="text-xs text-[#3a271a]/70">{errors.name}</p>
              ) : null}
            </label>

            <label className="space-y-1">
              <Label>E-mail</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                type="email"
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className="text-xs text-[#3a271a]/70">{errors.email}</p>
              ) : null}
            </label>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <Label>Telefone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(24) 99999-9999"
                aria-invalid={!!errors.phone}
              />
              {errors.phone ? (
                <p className="text-xs text-[#3a271a]/70">{errors.phone}</p>
              ) : null}
            </label>

            <label className="space-y-1">
              <Label>Vaga desejada</Label>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value as RoleValue)}
                aria-invalid={!!errors.role}
              >
                {careersData.openings.map((o) => (
                  <option key={o.role} value={o.role}>
                    {o.role}
                  </option>
                ))}
                <option value="Banco de Talentos">
                  Banco de Talentos (sem vaga)
                </option>
              </Select>
              {errors.role ? (
                <p className="text-xs text-[#3a271a]/70">{errors.role}</p>
              ) : null}
            </label>
          </div>

          <label className="space-y-1">
            <Label>LinkedIn / Portfólio (opcional)</Label>
            <Input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/seu-perfil"
            />
          </label>

          <label className="space-y-1">
            <Label>Por que você combina com a CoffeeCafe?</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Fale sobre sua experiência, disponibilidade e o que você faria muito bem no dia a dia."
              rows={6}
              maxLength={900}
              aria-invalid={!!errors.message}
            />
            <div className="flex items-center justify-between gap-4">
              {errors.message ? (
                <p className="text-xs text-[#3a271a]/70">{errors.message}</p>
              ) : (
                <p className="text-xs text-[#3a271a]/55">
                  Isso aumenta muito sua chance de aprovação.
                </p>
              )}
              <p className="text-xs text-[#3a271a]/45">
                {message.trim().length}/900
              </p>
            </div>
          </label>

          <div className="rounded-[22px] border border-[#3a271a]/10 bg-white/55 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#3a271a]">
                  Currículo (obrigatório)
                </p>
                <p className="mt-1 text-xs leading-6 text-[#3a271a]/65">
                  Aceitamos PDF, DOC e DOCX. Envie seu currículo atualizado.
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-2xl bg-[#3a271a] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#efe6dc]">
                <UploadCloud className="size-4" />
                Anexar
              </span>
            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              className="mt-3 block w-full text-sm text-[#3a271a]/80 file:mr-4 file:rounded-2xl file:border-0 file:bg-white/80 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#3a271a] hover:file:bg-white"
            />

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xs text-[#3a271a]/55">
                {resume ? `Arquivo: ${resume.name}` : "Nenhum arquivo anexado"}
              </p>
              {errors.resume ? (
                <p className="text-xs text-[#3a271a]/70">{errors.resume}</p>
              ) : null}
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-[22px] border border-[#3a271a]/10 bg-white/55 p-4">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 size-4 rounded border-[#3a271a]/30"
            />
            <span className="text-xs leading-6 text-[#3a271a]/70">
              Concordo em enviar meus dados para avaliação e ser contatado pela
              CoffeeCafe sobre esta candidatura.
              {errors.consent ? (
                <span className="block text-[#3a271a]/80">{errors.consent}</span>
              ) : null}
            </span>
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#3a271a] px-6 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Enviando...
              </>
            ) : (
              careersData.form.submit
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
