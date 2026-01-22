import Link from "next/link";

export default function PostCard({
  slug,
  title,
  excerpt,
  image,
  category,
  dateLabel,
}: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  dateLabel: string;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#3a271a]/10 bg-white/55 shadow-sm backdrop-blur-sm transition hover:bg-white/70 hover:shadow-md">
      <div className="relative h-[180px] w-full overflow-hidden bg-white/60">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-[#3a271a]/60">
          <span className="rounded-full border border-[#3a271a]/10 bg-white/70 px-3 py-1 font-semibold tracking-[0.18em]">
            {category.toUpperCase()}
          </span>
          <span className="font-medium">{dateLabel}</span>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-[#3a271a]">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#3a271a]/70">
          {excerpt}
        </p>

        <div className="mt-4">
          <Link
            href={`/novidades/${slug}`}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#3a271a] px-5 text-sm font-semibold text-[#efe6dc] shadow-sm transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3a271a]/35"
          >
            Ler agora
          </Link>
        </div>
      </div>
    </article>
  );
}
