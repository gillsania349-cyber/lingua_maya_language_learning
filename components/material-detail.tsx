"use client"

import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  Crown,
  FileText,
  Layers,
  Loader2,
  Lock,
  Mail,
  MessagesSquare,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useI18n } from "@/components/i18n-provider"
import { MaterialCards } from "@/components/material-cards"
import { isPremiumMaterial, materialIdBySlug, type MaterialId } from "@/lib/materials"

const icons = {
  mayaWorkbook: BookOpen,
  chapinPhrasebook: FileText,
  flashcards: Layers,
  englishPack: MessagesSquare,
} as const

export function MaterialDetail({ id }: { id: MaterialId }) {
  const { t } = useI18n()
  const copy = t.materials
  const item = copy.items[id]
  const detail = copy.details[id]
  const Icon = icons[id]
  const slug = Object.entries(materialIdBySlug).find(([, v]) => v === id)?.[0]
  const contactHref = `/contact?material=${slug ?? ""}#contact`
  const { user, plan, ready, openLogin } = useAuth()
  const premiumOnly = isPremiumMaterial(id)
  const checking = premiumOnly && (!ready || (user !== null && plan === null))
  const locked = premiumOnly && !checking && plan !== "premium"

  return (
    <article className="mx-auto max-w-4xl">
      <Link
        href="/#learn"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {copy.back}
      </Link>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_20px_50px_-28px_rgba(80,40,140,0.3)]">
        <div className="bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-10">
          <div className="flex items-center justify-between gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-background/15">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            {premiumOnly && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/15 px-3 py-1.5 text-xs font-semibold">
                {locked ? (
                  <Lock className="size-3.5" aria-hidden="true" />
                ) : (
                  <Crown className="size-3.5" aria-hidden="true" />
                )}
                {locked ? copy.premium.badge : copy.premium.unlocked}
              </span>
            )}
          </div>
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

          {checking ? (
            <div className="grid place-items-center py-10 text-muted-foreground">
              <Loader2 className="size-6 animate-spin" aria-label="Loading" />
            </div>
          ) : locked ? (
            <section className="relative overflow-hidden rounded-[1.75rem] border border-primary/25 bg-gradient-to-br from-primary/10 via-secondary/40 to-background p-6 text-center md:p-10">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-foreground text-background shadow-lg">
                <Lock className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-2xl font-medium tracking-tight">
                {copy.premium.lockedTitle}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {user ? copy.premium.lockedFree : copy.premium.lockedGuest}
              </p>
              <ul className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-2">
                {copy.premium.perks.map((perk) => (
                  <li
                    key={perk}
                    className="inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-border"
                  >
                    <Crown className="size-3.5 text-primary" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={contactHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {copy.premium.contactCta}
                </Link>
                {!user && (
                  <button
                    type="button"
                    onClick={openLogin}
                    className="inline-flex items-center justify-center rounded-full border border-foreground px-7 py-3.5 text-sm font-semibold transition hover:bg-foreground hover:text-background"
                  >
                    {copy.premium.loginCta}
                  </button>
                )}
              </div>
            </section>
          ) : (
          <>
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

          <MaterialCards id={id} />

          <Link
            href={contactHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 font-semibold text-background transition hover:opacity-90 sm:w-auto"
          >
            <Mail className="size-5" aria-hidden="true" />
            {premiumOnly ? copy.premium.joinCta : copy.orderCta}
          </Link>
          </>
          )}
        </div>
      </div>
    </article>
  )
}
