import Link from "next/link";

export default function ArticleShell({
  title,
  coverImage,
  category,
  dateLabel,
  content,
}: {
  title: string;
  coverImage: string;
  category: string;
  dateLabel: string;
  content: string;
}) {
  const blocks = content.split("\n\n").filter(Boolean);

  return (
    <article className="paper-noise">
      <header className="mx-auto max-w-[1100px] px-6 pt-10">
        <Link
          href="/novidades"
          className="inline-flex items-center gap-2 rounded-2xl border border-[#3a271a]/10 bg-white/60 px-4 py-2 text-sm font-semibold text-[#3a271a]/80 shadow-sm transition hover:bg-white hover:text-[#3a271a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
        >
          ← Voltar para novidades
        </Link>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-[#3a271a]/60">
            <span className="rounded-full border border-[#3a271a]/10 bg-white/70 px-3 py-1 font-semibold tracking-[0.18em]">
              {category.toUpperCase()}
            </span>
            <span className="font-medium">{dateLabel}</span>
          </div>

          <h1 className="text-3xl font-semibold leading-tight text-[#3a271a] md:text-4xl">
            {title}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-6 pb-12 pt-8">
        <div className="overflow-hidden rounded-3xl border border-[#3a271a]/10 bg-white/60 shadow-sm">
          <img
            src={coverImage}
            alt={title}
            className="h-[320px] w-full object-cover md:h-[420px]"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="mt-8 rounded-3xl border border-[#3a271a]/10 bg-white/55 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <div className="prose prose-sm max-w-none text-[#3a271a]">
            {blocks.map((p, idx) => (
              <p
                key={idx}
                className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-[#3a271a]/80"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#3a271a]/10 bg-[#efe6dc]/35 p-5">
            <p className="text-sm font-semibold text-[#3a271a]">
              Quer pedir agora?
            </p>
            <p className="mt-1 text-sm text-[#3a271a]/70">
              Vá para o cardápio completo e finalize seu pedido em poucos cliques.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/menu"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#3a271a] px-5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110"
              >
                Ver cardápio completo
              </Link>
              <Link
                href="/carrinho"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-[#3a271a]/15 bg-white/70 px-5 text-sm font-semibold text-[#3a271a] shadow-sm transition hover:bg-white"
              >
                Abrir sacola
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
