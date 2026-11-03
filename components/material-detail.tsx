"use client"

import Link from "next/link"
import { ArrowLeft, BookOpen, FileText, Headphones, Layers, Mail } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { site } from "@/lib/site"
import type { MaterialId } from "@/lib/materials"

const icons = {
  mayaWorkbook: BookOpen,
  chapinPhrasebook: FileText,
  flashcards: Layers,
  englishPack: Headphones,
} as const

export function MaterialDetail({ id }: { id: MaterialId }) {
  const { t } = useI18n()
  const copy = t.materials
  const item = copy.items[id]
  const detail = copy.details[id]
  const Icon = icons[id]
  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    copy.orderMessage(item.name, item.format),
  )}&body=${encodeURIComponent(copy.orderMessage(item.name, item.format))}`

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href="/#learn"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {copy.back}
      </Link>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_20px_50px_-28px_rgba(80,40,140,0.3)]">
        <div className="bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-background/15">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-widest opacity-80">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
            {item.name}
          </h1>
          <p className="mt-2 text-sm opacity-85">{item.format}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed opacity-95">
            {detail.intro}
          </p>
        </div>

        <div className="space-y-8 px-6 py-8 md:px-10 md:py-10">
          <section>
            <h2 className="text-lg font-semibold">{copy.includes}</h2>
            <ul className="mt-4 space-y-3">
              {detail.includes.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">{copy.idealFor}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {detail.idealFor.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">{copy.howItWorks}</h2>
            <ol className="mt-4 space-y-4">
              {detail.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-relaxed md:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <a
            href={mailHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 font-semibold text-background transition hover:opacity-90 sm:w-auto"
          >
            <Mail className="size-5" aria-hidden="true" />
            {copy.orderCta}
          </a>
        </div>
      </div>
    </article>
  )
}
