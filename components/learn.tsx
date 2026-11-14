"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  ClipboardList,
  FileText,
  Lock,
  MessagesSquare,
  Layers,
  ListTodo,
  Sparkles,
} from "lucide-react"
import { SectionHeading } from "@/components/languages"
import { useI18n } from "@/components/i18n-provider"
import { useAuth } from "@/components/auth-provider"
import { isPremiumMaterial } from "@/lib/materials"

const practiceCards = [
  {
    id: "quizzes" as const,
    slug: "quizzes",
    icon: Sparkles,
    accent: "from-primary/18 via-secondary/40 to-background",
  },
  {
    id: "tasks" as const,
    slug: "tasks",
    icon: ListTodo,
    accent: "from-secondary/60 via-accent to-background",
  },
  {
    id: "assignments" as const,
    slug: "assignments",
    icon: ClipboardList,
    accent: "from-accent via-primary/10 to-background",
  },
]

const materialCards = [
  { id: "mayaWorkbook" as const, slug: "maya-workbook", icon: BookOpen },
  { id: "chapinPhrasebook" as const, slug: "chapin-phrasebook", icon: FileText },
  { id: "flashcards" as const, slug: "flashcards", icon: Layers },
  { id: "englishPack" as const, slug: "speaking-club", icon: MessagesSquare },
]

export function Learn() {
  const { t } = useI18n()
  const { plan } = useAuth()
  const learn = t.learn
  const practice = t.practice
  const materials = t.materials

  return (
    <section id="learn" aria-labelledby="learn-title" className="scroll-mt-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={learn.eyebrow}
          id="learn-title"
          title={learn.title}
          description={learn.description}
        />
      </div>

      <div className="mt-12 space-y-16">
        {/* Practice */}
        <div>
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {practice.eyebrow}
              </p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                {practice.title}
              </h3>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground sm:text-right">
              {practice.description}
            </p>
          </div>

          <ul className="grid gap-4 md:grid-cols-3">
            {practiceCards.map(({ id, slug, icon: Icon, accent }, index) => {
              const item = practice.items[id]
              return (
                <li key={id}>
                  <Link
                    href={`/practice/${slug}`}
                    className="group relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-[1.75rem] border border-primary/20 bg-muted transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-background hover:shadow-[0_20px_48px_-28px_rgba(80,40,140,0.35)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-90 ${accent}`}
                      aria-hidden
                    />
                    <div className="relative flex h-full flex-col p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-11 place-items-center rounded-2xl bg-background/95 text-primary shadow-sm">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-sm font-semibold text-primary/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {item.tag}
                      </p>
                      <h4 className="mt-2 text-2xl font-semibold tracking-tight">
                        {item.title}
                      </h4>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                      <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition group-hover:opacity-90">
                        {item.cta}
                        <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Materials */}
        <div className="overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-secondary/50 via-muted to-background p-5 sm:p-7 md:p-8">
          <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {materials.eyebrow}
              </p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
                {materials.title}
              </h3>
              <p className="mt-2 text-muted-foreground">{materials.description}</p>
            </div>
            <div className="relative hidden h-28 w-44 shrink-0 overflow-hidden rounded-2xl lg:block">
              <Image
                src="/images/materials.png"
                alt={materials.imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[16rem] overflow-hidden rounded-[1.5rem] lg:hidden">
              <Image
                src="/images/materials.png"
                alt={materials.imageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative hidden min-h-[22rem] overflow-hidden rounded-[1.5rem] lg:block">
              <Image
                src="/images/materials.png"
                alt={materials.imageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 to-transparent" />
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {materialCards.map(({ id, slug, icon: Icon }, index) => {
                const item = materials.items[id]
                return (
                  <li key={id}>
                    <Link
                      href={`/materials/${slug}`}
                      className="group flex h-full flex-col rounded-[1.35rem] border border-border/80 bg-background/80 p-5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_16px_40px_-28px_rgba(80,40,140,0.35)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/25"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="flex items-center gap-2">
                        {isPremiumMaterial(id) && (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold ${
                              plan === "premium"
                                ? "bg-primary text-primary-foreground"
                                : "bg-foreground text-background"
                            }`}
                          >
                            <Lock className="size-3" aria-hidden="true" />
                            {plan === "premium" ? materials.premium.unlocked : materials.premium.badge}
                          </span>
                        )}
                        <span className="font-mono text-xs font-semibold text-primary/60">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        </span>
                      </div>
                      <h4 className="mt-5 text-lg font-semibold leading-snug">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.format}
                      </p>
                      <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/80 px-4 py-2 text-sm font-semibold transition group-hover:bg-foreground group-hover:text-background">
                        {materials.order}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
