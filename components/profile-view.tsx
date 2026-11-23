"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  CalendarDays,
  Clock3,
  Languages,
  LogOut,
  Mail,
  StickyNote,
  UserRound,
  Video,
} from "lucide-react"
import { BookLessonButton, useAuth } from "@/components/auth-provider"
import { useI18n } from "@/components/i18n-provider"
import { QuizProgressCard } from "@/components/quiz-progress-card"
import {
  removeExtraTrials,
  type AdminBooking,
} from "@/lib/admin"

export function ProfileView() {
  const { t, locale } = useI18n()
  const { user, logout, openLogin, ready } = useAuth()
  const router = useRouter()
  const p = t.auth.profile
  const [lessons, setLessons] = useState<AdminBooking[]>([])

  useEffect(() => {
    if (!user) {
      setLessons([])
      return
    }
    const trial = removeExtraTrials(user.email)
    setLessons(trial ? [trial] : [])
  }, [user])

  if (!ready) {
    return (
      <div className="mx-auto max-w-lg rounded-[2rem] border border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
        Loading…
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg rounded-[2rem] border border-border bg-muted/40 p-8 text-center md:p-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-border bg-background">
          <UserRound className="size-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">
          {p.guestTitle}
        </h1>
        <p className="mt-2 text-muted-foreground">{p.guestText}</p>
        <button
          type="button"
          onClick={openLogin}
          className="mt-6 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
        >
          {t.auth.accountButton}
        </button>
      </div>
    )
  }

  const initial = user.name.trim().charAt(0).toUpperCase() || "U"
  const dateLocale = locale === "es" ? "es-GT" : "en-US"

  return (
    <div className="mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_20px_50px_-28px_rgba(80,40,140,0.3)]">
      <div className="bg-primary px-6 py-8 text-primary-foreground md:px-8">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-full bg-background/15 text-2xl font-semibold">
            {initial}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
              {p.eyebrow}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl">
              {user.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6 md:p-8">
        <div className="rounded-2xl bg-muted px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {p.nameLabel}
          </p>
          <p className="mt-1 flex items-center gap-2 font-medium">
            <UserRound className="size-4 text-primary" aria-hidden="true" />
            {user.name}
          </p>
        </div>

        <div className="rounded-2xl bg-muted px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {p.emailLabel}
          </p>
          <p className="mt-1 flex items-center gap-2 break-all font-medium">
            <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
            {user.email}
          </p>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {p.lessonsTitle}
            </p>
          </div>

          {lessons.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {p.lessonsEmpty}
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{lesson.lesson}</p>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                      {p.status[lesson.status]}
                    </span>
                  </div>

                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Languages className="mt-0.5 size-4 shrink-0 text-primary" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          {p.languageLabel}
                        </dt>
                        <dd className="font-medium">{lesson.language}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          {p.timeLabel}
                        </dt>
                        <dd className="font-medium">{lesson.time}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Video className="mt-0.5 size-4 shrink-0 text-primary" />
                      <div>
                        <dt className="text-xs text-muted-foreground">
                          {p.formatLabel}
                        </dt>
                        <dd className="font-medium">{lesson.format}</dd>
                      </div>
                    </div>
                    {lesson.notes ? (
                      <div className="flex items-start gap-2">
                        <StickyNote className="mt-0.5 size-4 shrink-0 text-primary" />
                        <div>
                          <dt className="text-xs text-muted-foreground">
                            {p.notesLabel}
                          </dt>
                          <dd className="font-medium">{lesson.notes}</dd>
                        </div>
                      </div>
                    ) : null}
                  </dl>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {p.bookedOn}{" "}
                    {new Date(lesson.createdAt).toLocaleString(dateLocale, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <QuizProgressCard email={user.email} />

        <p className="text-sm text-muted-foreground">{p.hint}</p>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <BookLessonButton className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90">
            <BookOpen className="size-4" aria-hidden="true" />
            {t.hero.ctaBook}
          </BookLessonButton>
          <button
            type="button"
            onClick={() => {
              logout()
              router.push("/")
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground px-6 py-3.5 text-sm font-semibold transition hover:bg-foreground hover:text-background"
          >
            <LogOut className="size-4" aria-hidden="true" />
            {t.auth.logout}
          </button>
        </div>
      </div>
    </div>
  )
}
