"use client"

import Image from "next/image"
import { Video } from "lucide-react"
import { BookLessonButton } from "@/components/auth-provider"
import { SectionHeading } from "@/components/languages"
import { useI18n } from "@/components/i18n-provider"

export function Booking() {
  const { t } = useI18n()
  const copy = t.booking

  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-8">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-muted/40">
        <div className="grid items-stretch lg:grid-cols-2">
          {/* Left: content */}
          <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
            <SectionHeading
              eyebrow={copy.eyebrow}
              id="book-title"
              title={copy.title}
              description={copy.description}
            />

            <ol className="mt-8 space-y-4">
              {copy.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold text-secondary-foreground">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 font-medium leading-snug">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col items-start gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                <Video className="size-4" aria-hidden="true" />
                {copy.onlineBadge}
              </span>
              <BookLessonButton className="rounded-full bg-foreground px-8 py-4 text-base font-semibold text-background transition hover:opacity-90">
                {t.hero.ctaBook}
              </BookLessonButton>
              <p className="max-w-sm text-sm text-muted-foreground">
                {t.auth.bookGateHint}
              </p>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative min-h-[280px] bg-muted lg:min-h-full">
            <Image
              src="/images/martha.png"
              alt={copy.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent lg:bg-gradient-to-l"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-background/90 px-4 py-3 backdrop-blur-sm md:bottom-8 md:left-8 md:right-auto md:max-w-xs">
              <p className="text-sm font-semibold text-foreground">{copy.onlineBadge}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t.auth.bookGateHint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
