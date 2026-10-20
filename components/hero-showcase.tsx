'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, CalendarCheck, PlayCircle, Video } from 'lucide-react'
import { useI18n } from '@/components/i18n-provider'
import { site } from '@/lib/site'

type LanguageId = 'maya' | 'english' | 'spanish'

type Language = {
  id: LanguageId
  levelCodes: string[]
  intro: {
    poster: string
    // Add the URL of Martha's intro video for this language (e.g. /videos/intro-maya.mp4).
    videoSrc: string
  }
}

const cefrCodes = ['A1–A2', 'B1–B2', 'C1–C2']

const languages: Language[] = [
  { id: 'maya', levelCodes: ['L1', 'L2'], intro: { poster: '/images/martha.png', videoSrc: '' } },
  { id: 'english', levelCodes: cefrCodes, intro: { poster: '/images/martha-english.png', videoSrc: '' } },
  { id: 'spanish', levelCodes: cefrCodes, intro: { poster: '/images/martha-spanish.png', videoSrc: '' } },
]

const openDays = [true, true, false, true, true, true, false]

export function HeroShowcase() {
  const { t } = useI18n()
  const copy = t.showcase
  const [activeId, setActiveId] = useState<LanguageId>('maya')
  const active = languages.find((l) => l.id === activeId) ?? languages[0]
  const activeCopy = copy.languages[active.id]

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-[1fr_1.6fr_1fr] md:items-end">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {languages.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setActiveId(l.id)}
                aria-label={copy.show(copy.languages[l.id].label)}
                className={`grid size-11 place-items-center rounded-full border-2 border-background text-sm font-bold transition-colors ${
                  l.id === activeId
                    ? 'relative z-10 bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/30'
                }`}
              >
                {copy.languages[l.id].initial}
              </button>
            ))}
          </div>
          <p className="leading-tight">
            <span className="block text-2xl font-semibold">{copy.countTitle}</span>
            <span className="text-sm text-muted-foreground">{copy.countSubtitle}</span>
          </p>
        </div>

        <div className="rounded-3xl bg-secondary p-4" aria-live="polite">
          <p className="mb-3 px-1 text-sm font-semibold text-secondary-foreground">
            {copy.levelsTitle(activeCopy.label)}
          </p>
          <ul className="flex flex-col gap-2.5">
            {active.levelCodes.map((code, i) => (
              <li key={code} className="flex items-center gap-3 rounded-xl bg-background px-4 py-3 text-sm">
                <span className="min-w-14 rounded bg-primary px-2 py-0.5 text-center text-xs font-bold text-primary-foreground">
                  {code}
                </span>
                {activeCopy.levels[i]}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl bg-muted">
        {active.intro.videoSrc ? (
          <video
            key={active.id}
            src={active.intro.videoSrc}
            poster={active.intro.poster}
            controls
            playsInline
            preload="metadata"
            className="aspect-[4/3] size-full object-cover"
          >
            <track kind="captions" />
          </video>
        ) : (
          <Image
            key={active.id}
            src={active.intro.poster}
            alt={activeCopy.alt}
            width={1024}
            height={768}
            priority={active.id === 'maya'}
            className="aspect-[4/3] size-full object-cover"
          />
        )}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-foreground/50 px-3 py-1 text-sm text-background backdrop-blur">
          <Video className="size-4" aria-hidden="true" />
          {copy.formatBadge}
        </span>
        {!active.intro.videoSrc && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            <PlayCircle className="size-4 text-primary" aria-hidden="true" />
            {copy.introSoon(activeCopy.label)}
          </span>
        )}
        <div
          role="tablist"
          aria-label={copy.tablistLabel}
          className="absolute inset-x-0 bottom-4 flex justify-center gap-2"
        >
          {languages.map((l) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              aria-selected={l.id === activeId}
              onClick={() => setActiveId(l.id)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold backdrop-blur transition-colors ${
                l.id === activeId
                  ? 'bg-background text-foreground'
                  : 'bg-foreground/50 text-background hover:bg-foreground/70'
              }`}
            >
              {copy.languages[l.id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-pretty text-center text-muted-foreground md:text-left">{copy.tagline}</p>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-3xl bg-primary p-4 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="rounded-2xl bg-background p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{copy.availability}</p>
              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                <CalendarCheck className="size-3" aria-hidden="true" />
                {copy.thisWeek}
              </span>
            </div>
            <p className="mt-3 text-3xl font-semibold">
              {copy.daysOpen} <span className="text-sm font-normal text-muted-foreground">{copy.open}</span>
            </p>
            <ul className="mt-4 flex items-end justify-between gap-1.5" aria-label={copy.weeklyAvailability}>
              {copy.days.map((day, i) => {
                const open = openDays[i]
                return (
                  <li key={day} className="flex flex-1 flex-col items-center gap-1.5">
                    <span
                      className={`w-full rounded-md ${
                        open ? (i === 4 ? 'bg-primary' : 'bg-secondary') : 'bg-muted'
                      }`}
                      style={{ height: open ? `${40 + ((i * 17) % 40)}px` : '16px' }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {day}
                      <span className="sr-only">{open ? copy.dayOpen : copy.dayClosed}</span>
                    </span>
                  </li>
                )
              })}
            </ul>
            <span className="mt-4 flex items-center justify-center gap-1.5 rounded-full bg-foreground py-2 text-sm font-semibold text-background">
              {copy.bookAppointment}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">{copy.opensNewTab}</span>
            </span>
          </div>
        </a>
      </div>
    </div>
  )
}
