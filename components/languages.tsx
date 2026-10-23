'use client'

import { ArrowUpRight } from 'lucide-react'
import { BookLessonButton } from '@/components/auth-provider'
import { useI18n } from '@/components/i18n-provider'

export function Languages() {
  const { t } = useI18n()

  return (
    <section id="languages" aria-labelledby="languages-title" className="scroll-mt-8">
      <SectionHeading eyebrow={t.languages.eyebrow} id="languages-title" title={t.languages.title} />
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {t.languages.items.map((lang) => (
          <li
            key={lang.name}
            className="flex flex-col rounded-3xl border border-primary/25 bg-muted p-7 transition duration-200 hover:-translate-y-1 hover:border-primary/50 hover:bg-background hover:shadow-[0_16px_40px_-24px_rgba(80,40,140,0.25)]"
          >
            <span className="w-fit rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground">
              {lang.tag}
            </span>
            <h3 className="mt-10 text-2xl font-semibold">{lang.name}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{lang.text}</p>
            <BookLessonButton className="mt-6 inline-flex w-fit items-center gap-1 font-semibold underline-offset-4 hover:underline">
              {lang.cta} <ArrowUpRight className="size-4" aria-hidden="true" />
            </BookLessonButton>
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
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-balance text-4xl font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-pretty text-lg text-muted-foreground">{description}</p>}
    </div>
  )
}
