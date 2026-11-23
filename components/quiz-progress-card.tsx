"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, GraduationCap, Target, Trophy } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import type { PlacementLanguage, PlacementTopic } from "@/lib/placement"
import { listAttempts, type QuizAttempt } from "@/lib/quiz-progress"

const quizLanguages: PlacementLanguage[] = ["english", "spanish"]

export function QuizProgressCard({ email }: { email: string }) {
  const { t, locale } = useI18n()
  const p = t.auth.profile
  const placement = t.practice.placement
  const [attempts, setAttempts] = useState<QuizAttempt[]>([])

  useEffect(() => {
    setAttempts(listAttempts(email))
  }, [email])

  const dateLocale = locale === "es" ? "es-GT" : "en-US"
  const taken = quizLanguages.filter((lang) => attempts.some((a) => a.language === lang))
  const notTaken = quizLanguages.filter((lang) => !taken.includes(lang))

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center gap-2">
        <GraduationCap className="size-4 text-primary" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {p.quizTitle}
        </p>
      </div>

      {taken.length === 0 ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.quizEmpty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {taken.map((lang) => {
            // One attempt per quiz — the first one is the result that counts.
            const latest = attempts.find((a) => a.language === lang)!
            const withGoals = latest.goals.length > 0 ? latest : null
            const focus = countTopics(latest.missedTopics)
            const percent = Math.round((latest.score / latest.total) * 100)

            return (
              <li key={lang} className="rounded-2xl border border-border bg-background p-4">
                <div>
                  <p className="text-xs text-muted-foreground">{p.quizLanguage[lang]}</p>
                  <p className="mt-0.5 text-xl font-semibold tracking-tight">
                    {latest.level}{" "}
                    <span className="text-base font-medium text-muted-foreground">
                      – {placement.levels[latest.level]}
                    </span>
                  </p>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-muted-foreground">
                    {p.quizScore(latest.score, latest.total)}
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-muted/60 p-3">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                    <Target className="size-3.5" aria-hidden="true" />
                    {p.focusTitle}
                  </p>
                  {focus.length === 0 ? (
                    <p className="mt-2 flex items-center gap-1.5 text-sm font-medium">
                      <Trophy className="size-4 text-primary" aria-hidden="true" />
                      {p.focusPerfect}
                    </p>
                  ) : (
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {focus.map(([topic, count]) => (
                        <li
                          key={topic}
                          className="rounded-full border border-destructive/25 bg-destructive/5 px-2.5 py-1 text-xs font-semibold text-destructive"
                        >
                          {placement.topics[topic]}
                          {count > 1 ? ` ×${count}` : ""}
                        </li>
                      ))}
                    </ul>
                  )}

                  {withGoals ? (
                    <>
                      <p className="mt-3 text-xs font-semibold text-muted-foreground">
                        {p.goalsTitle}
                      </p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {[...withGoals.goals]
                          .sort((a, b) => a - b)
                          .map((g) => (
                            <li
                              key={g}
                              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                            >
                              {placement.goals[lang][g]?.title}
                            </li>
                          ))}
                      </ul>
                    </>
                  ) : null}
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  {p.quizLast}{" "}
                  {new Date(latest.takenAt).toLocaleString(dateLocale, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </li>
            )
          })}
        </ul>
      )}

      {notTaken.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {notTaken.map((lang) => (
            <Link
              key={lang}
              href={`/practice/${lang}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:opacity-90"
            >
              {p.quizTake[lang]}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

/** Missed topics with how often each was missed, most-missed first. */
function countTopics(topics: PlacementTopic[]): [PlacementTopic, number][] {
  const counts = new Map<PlacementTopic, number>()
  for (const topic of topics) counts.set(topic, (counts.get(topic) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1])
}
