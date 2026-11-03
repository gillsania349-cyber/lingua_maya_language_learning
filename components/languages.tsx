"use client"

import { ArrowUpRight } from "lucide-react"
import { BookLessonButton } from "@/components/auth-provider"
import { useI18n } from "@/components/i18n-provider"

const accents = [
  "from-primary/20 via-secondary/50 to-background",
  "from-secondary/70 via-accent to-background",
  "from-accent via-primary/10 to-background",
] as const

export function Languages() {
  const { t } = useI18n()
  const copy = t.languages

  return (
    <section id="languages" aria-labelledby="languages-title" className="scroll-mt-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={copy.eyebrow}
          id="languages-title"
          title={copy.title}
          description={copy.description}
        />
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:pb-1 md:text-right">
          {copy.aside}
        </p>
      </div>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {copy.items.map((lang, index) => (
          <li
            key={lang.name}
            className="group relative overflow-hidden rounded-[1.75rem] border border-primary/20 bg-muted transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-background hover:shadow-[0_20px_48px_-28px_rgba(80,40,140,0.35)]"
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 ${accents[index]}`}
              aria-hidden
            />
            <div className="relative flex h-full min-h-[18rem] flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                  {lang.tag}
                </span>
                <span className="font-mono text-sm font-semibold text-primary/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                {lang.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {lang.text}
              </p>

              <BookLessonButton className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90">
                {lang.cta}
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </BookLessonButton>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  id,
  description,
}: {
  eyebrow: string
  title: string
  id: string
  description?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-balance text-4xl font-medium tracking-tight md:text-5xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
