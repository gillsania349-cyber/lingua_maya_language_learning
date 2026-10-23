"use client"

import Link from "next/link"
import { ArrowUpRight, ClipboardList, ListTodo, Sparkles } from "lucide-react"
import { SectionHeading } from "@/components/languages"
import { useI18n } from "@/components/i18n-provider"

const cards = [
  { id: "quizzes" as const, slug: "quizzes", icon: Sparkles },
  { id: "tasks" as const, slug: "tasks", icon: ListTodo },
  { id: "assignments" as const, slug: "assignments", icon: ClipboardList },
]

export function Practice() {
  const { t } = useI18n()
  const copy = t.practice

  return (
    <section id="practice" aria-labelledby="practice-title" className="scroll-mt-8">
      <SectionHeading
        eyebrow={copy.eyebrow}
        id="practice-title"
        title={copy.title}
        description={copy.description}
      />

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map(({ id, slug, icon: Icon }) => {
          const item = copy.items[id]
          return (
            <li key={id}>
              <Link
                href={`/practice/${slug}`}
                className="flex h-full flex-col rounded-[1.75rem] border border-primary/25 bg-muted p-7 transition duration-200 hover:-translate-y-1 hover:border-primary/50 hover:bg-background hover:shadow-[0_16px_40px_-24px_rgba(80,40,140,0.25)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-background text-foreground">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.tag}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 font-semibold underline-offset-4 group-hover:underline">
                  {item.cta} <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
