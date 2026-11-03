'use client'

import { BookLessonButton } from '@/components/auth-provider'
import { HeroShowcase } from './hero-showcase'
import { useI18n } from '@/components/i18n-provider'

export function Hero() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="hero-title" className="pt-14 md:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
          {t.hero.badge}
        </p>
        <h1
          id="hero-title"
          className="text-balance text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl"
        >
          {t.hero.titleBefore}
          <span className="rounded-md bg-secondary px-2 text-secondary-foreground">{t.hero.titleHighlight}</span>
          {t.hero.titleAfter}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted-foreground">{t.hero.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BookLessonButton className="rounded-full bg-foreground px-7 py-3.5 font-semibold text-background transition-opacity hover:opacity-85">
            {t.hero.ctaBook}
          </BookLessonButton>
          <a
            href="#learn"
            className="rounded-full border border-foreground px-7 py-3.5 font-semibold transition-colors hover:bg-foreground hover:text-background"
          >
            {t.hero.ctaMaterials}
          </a>
        </div>
      </div>

      <HeroShowcase />
    </section>
  )
}
