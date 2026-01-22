"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { contactData } from "./contact-data";
import { CheckCircle2, Loader2, Send } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-[0.18em] text-[#3a271a]/55">
      {children}
    </span>
  );
}

function InputBase(props: React.InputHTMLAttributes<HTMLInputElement>) {
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

function TextareaBase(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
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

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Informe seu nome.";
    if (!email.includes("@")) e.email = "Digite um e-mail válido.";
    if (subject.trim().length < 3) e.subject = "Informe um assunto.";
    if (message.trim().length < 12)
      e.message = "Escreva uma mensagem com mais detalhes.";
    return e;
  }, [name, email, subject, message]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "loading";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setStatus("loading");

      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          source: "contato",
        }),
      });

      if (!res.ok) throw new Error("Falha ao enviar.");

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="contact-form-title">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-7"
      >
        <h2
          id="contact-form-title"
          className="font-script text-4xl leading-[1.05]"
        >
          {contactData.form.title}
        </h2>

        <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
          {contactData.form.desc}
        </p>

        {status === "success" && (
          <div
            role="status"
            className="mt-4 flex items-start gap-3 rounded-[22px] border border-[#3a271a]/10 bg-white/60 p-4"
          >
            <CheckCircle2 className="mt-0.5 size-5 text-[#3a271a]" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#3a271a]">
                Mensagem enviada com sucesso ✅
              </p>
              <p className="mt-1 text-sm leading-6 text-[#3a271a]/75">
                A nossa equipe vai responder o mais rápido possível pelo seu
                e-mail.
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
              <FieldLabel>Nome</FieldLabel>
              <InputBase
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={contactData.form.fields.name}
                aria-invalid={!!errors.name}
              />
              {errors.name ? (
                <p className="text-xs text-[#3a271a]/70">{errors.name}</p>
              ) : null}
            </label>

            <label className="space-y-1">
              <FieldLabel>E-mail</FieldLabel>
              <InputBase
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={contactData.form.fields.email}
                type="email"
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className="text-xs text-[#3a271a]/70">{errors.email}</p>
              ) : null}
            </label>
          </div>

          <label className="space-y-1">
            <FieldLabel>Assunto</FieldLabel>
            <InputBase
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={contactData.form.fields.subject}
              aria-invalid={!!errors.subject}
            />
            {errors.subject ? (
              <p className="text-xs text-[#3a271a]/70">{errors.subject}</p>
            ) : null}
          </label>

          <label className="space-y-1">
            <FieldLabel>Mensagem</FieldLabel>
            <TextareaBase
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={contactData.form.fields.message}
              rows={6}
              aria-invalid={!!errors.message}
            />
            <div className="flex items-center justify-between gap-4">
              {errors.message ? (
                <p className="text-xs text-[#3a271a]/70">{errors.message}</p>
              ) : (
                <p className="text-xs text-[#3a271a]/55">
                  Quanto mais detalhes, mais rápido a gente resolve.
                </p>
              )}
              <p className="text-xs text-[#3a271a]/45">
                {message.trim().length}/600
              </p>
            </div>
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
              <>
                <Send className="size-4" />
                Enviar mensagem
              </>
            )}
          </button>

          <p className="text-xs leading-6 text-[#3a271a]/55">
            {contactData.form.disclaimer}
          </p>
        </form>
      </motion.div>
    </section>
  );
}
