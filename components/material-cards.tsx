"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw, X } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import {
  alphabetCards,
  bodyCards,
  decksByMaterial,
  glyphCards,
  type BodyCard,
  type DeckId,
} from "@/lib/flashcards"
import type { MaterialId } from "@/lib/materials"

export function MaterialCards({ id }: { id: MaterialId }) {
  const { t } = useI18n()
  const copy = t.materials.cards
  const decks = decksByMaterial[id]
  const [active, setActive] = useState<DeckId | undefined>(decks[0])

  if (!active) return null
  const deck = copy.decks[active]

  return (
    <section className="border-t border-border pt-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        {copy.eyebrow}
      </p>
      <h2 className="mt-1 text-2xl font-medium tracking-tight">{copy.title}</h2>

      {decks.length > 1 && (
        <div
          role="tablist"
          className="mt-5 inline-flex flex-wrap gap-1 rounded-full bg-muted p-1"
        >
          {decks.map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={d === active}
              onClick={() => setActive(d)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                d === active
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {copy.decks[d].name}
            </button>
          ))}
        </div>
      )}

      <div className="mt-5">
        {decks.length === 1 && (
          <h3 className="text-lg font-semibold">{deck.name}</h3>
        )}
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {deck.description}
        </p>
      </div>

      <div className="mt-6">
        {active === "alphabet" ? (
          <AlphabetDeck />
        ) : active === "body" ? (
          <BodyDeck />
        ) : (
          <GlyphDeck />
        )}
      </div>
    </section>
  )
}

/* ---------- Spanish alphabet: tilted card grid + lightbox ---------- */

function AlphabetDeck() {
  const { t } = useI18n()
  const copy = t.materials.cards
  const [open, setOpen] = useState<number | null>(null)
  const total = alphabetCards.length

  const go = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + total) % total)),
    [total],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, go])

  const current = open === null ? null : alphabetCards[open]

  return (
    <>
      {/* quick letter jump */}
      <div className="-mx-1 flex flex-wrap gap-1.5 px-1">
        {alphabetCards.map((card, i) => (
          <button
            key={card.letter}
            type="button"
            onClick={() => setOpen(i)}
            className="grid size-9 place-items-center rounded-xl border border-border text-sm font-semibold transition hover:-translate-y-0.5 hover:border-transparent hover:bg-(--c) hover:text-white focus-visible:bg-(--c) focus-visible:text-white"
            style={{ ["--c" as string]: card.color }}
            aria-label={`${card.letter} — ${card.word}`}
          >
            {card.letter.charAt(0)}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {alphabetCards.map((card, i) => (
          <li key={card.letter}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={`group block w-full text-left transition duration-300 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 focus-visible:rotate-0 ${
                i % 3 === 0 ? "-rotate-1" : i % 3 === 1 ? "rotate-1" : "rotate-0"
              }`}
            >
              <div
                className="overflow-hidden rounded-2xl shadow-[0_14px_30px_-18px_rgba(0,0,0,0.45)] transition-shadow duration-300 group-hover:shadow-[0_22px_40px_-18px_rgba(0,0,0,0.5)]"
                style={{ background: card.color }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={`${card.letter} — ${card.word}`}
                  loading="lazy"
                  width={600}
                  height={849}
                  className="aspect-[600/849] w-full object-cover"
                />
              </div>
              <div className="mt-2.5 flex items-baseline justify-between gap-2 px-1">
                <span className="truncate text-sm font-semibold">{card.word}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {card.en}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.letter} — ${current.word}`}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
        >
          <button
            type="button"
            aria-label={copy.close}
            onClick={() => setOpen(null)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative flex w-full max-w-md flex-col items-center">
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={copy.close}
              className="absolute -top-2 right-0 z-10 grid size-10 -translate-y-full place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            >
              <X className="size-5" />
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.image}
              src={current.image}
              alt={`${current.letter} — ${current.word}`}
              className="max-h-[72vh] w-auto animate-in fade-in zoom-in-95 rounded-2xl shadow-2xl duration-200"
            />

            <div className="mt-4 flex w-full items-center justify-between gap-3 text-white">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={copy.previous}
                className="grid size-11 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="text-center">
                <p className="text-lg font-semibold">
                  {current.word}{" "}
                  <span className="font-normal opacity-75">· {current.en}</span>
                </p>
                <p className="text-xs opacity-60">
                  {copy.cardOf(open + 1, total)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={copy.next}
                className="grid size-11 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ---------- Maya glyphs: name tablets with syllable breakdown ---------- */

function GlyphDeck() {
  const { t } = useI18n()
  const copy = t.materials.cards

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {glyphCards.map((card) => (
        <li
          key={card.key}
          className={`group overflow-hidden rounded-2xl border transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(80,40,140,0.5)] ${
            card.isName
              ? "border-primary/40 bg-primary/5 sm:col-span-2"
              : "border-border bg-[#fbf7ef]"
          }`}
        >
          <div className="grid place-items-center px-6 pb-2 pt-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={`${card.name} — ${card.syllables.join(" · ")}`}
              loading="lazy"
              className={`h-24 w-auto max-w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-[1.04] md:h-28 ${
                card.isName ? "md:h-32" : ""
              }`}
            />
          </div>
          <div className="flex flex-wrap items-end justify-between gap-3 px-5 pb-5 pt-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
                {card.isName ? copy.teacherName : copy.mayanLanguage}
              </p>
              <p className="mt-0.5 text-xl font-medium tracking-tight">{card.name}</p>
            </div>
            <ol className="flex items-center gap-1">
              {card.syllables.map((s, i) => (
                <li key={`${s}-${i}`} className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="text-muted-foreground" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span className="rounded-lg bg-background px-2 py-1 text-sm font-semibold shadow-sm ring-1 ring-border">
                    {s}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Body parts: 3D flip cards with a language switch ---------- */

type BodyLang = "myn" | "en" | "es"

const bodyLangs: { id: BodyLang; label: string; short: string }[] = [
  { id: "myn", label: "Tz'utujil", short: "MAYA" },
  { id: "en", label: "English", short: "EN" },
  { id: "es", label: "Español", short: "ES" },
]

function wordIn(card: BodyCard, lang: BodyLang) {
  return lang === "myn" ? card.word : card[lang]
}

function BodyDeck() {
  const { t } = useI18n()
  const copy = t.materials.cards
  const [lang, setLang] = useState<BodyLang>("myn")

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">
          {copy.showWordsIn}
        </span>
        <div
          role="radiogroup"
          aria-label={copy.showWordsIn}
          className="inline-flex gap-1 rounded-full bg-muted p-1"
        >
          {bodyLangs.map((l) => (
            <button
              key={l.id}
              type="button"
              role="radio"
              aria-checked={lang === l.id}
              onClick={() => setLang(l.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                lang === l.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {bodyCards.map((card) => (
          <li key={card.image}>
            <FlipCard card={card} lang={lang} />
          </li>
        ))}
      </ul>
    </>
  )
}

function FlipCard({ card, lang }: { card: BodyCard; lang: BodyLang }) {
  const { t } = useI18n()
  const copy = t.materials.cards
  const [flipped, setFlipped] = useState(false)
  const front = wordIn(card, lang)
  const others = bodyLangs.filter((l) => l.id !== lang)

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${front} — ${others.map((l) => wordIn(card, l.id)).join(", ")}`}
      className="group block aspect-[3/4] w-full [perspective:1000px]"
    >
      <div
        className={`relative size-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(8deg)]"
        }`}
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-border bg-[#fbf1e6] shadow-[0_14px_30px_-20px_rgba(80,40,140,0.45)] [backface-visibility:hidden]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image}
            alt=""
            loading="lazy"
            className="min-h-0 w-full flex-1 object-cover"
          />
          <div className="flex items-center justify-between gap-2 bg-background px-3 py-2.5">
            <span
              key={`${lang}-${front}`}
              className={`truncate text-base font-semibold tracking-tight animate-in fade-in slide-in-from-bottom-1 duration-300 ${
                lang === "myn" ? "" : "capitalize"
              }`}
            >
              {front}
            </span>
            <RotateCw
              className="size-3.5 shrink-0 text-muted-foreground transition group-hover:rotate-90 group-hover:text-primary"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* back: the other two languages */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-primary p-4 text-center text-primary-foreground shadow-[0_14px_30px_-20px_rgba(80,40,140,0.6)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-[0.65rem] font-semibold uppercase tracking-widest opacity-70">
            {copy.meaning}
          </span>
          {others.map((l) => (
            <span key={l.id} className="flex flex-col items-center">
              <span className="text-[0.6rem] font-semibold tracking-widest opacity-60">
                {l.short}
              </span>
              <span
                className={`text-xl font-medium tracking-tight ${
                  l.id === "myn" ? "" : "capitalize"
                }`}
              >
                {wordIn(card, l.id)}
              </span>
            </span>
          ))}
          <span className="rounded-full bg-background/15 px-3 py-1 text-sm font-semibold">
            {front}
          </span>
        </div>
      </div>
      <span className="sr-only">{copy.tapToFlip}</span>
    </button>
  )
}
