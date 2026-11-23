"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, CheckCircle2, Lock, XCircle } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { useAuth } from "@/components/auth-provider"
import {
  getAttempt,
  saveAttempt,
  saveAttemptGoals,
  type QuizAttempt,
} from "@/lib/quiz-progress"
import {
  advancedLevels,
  levelForScore,
  placementQuizzes,
  type LevelCode,
  type PlacementLanguage,
} from "@/lib/placement"

export function PlacementQuiz({ language }: { language: PlacementLanguage }) {
  const { t } = useI18n()
  const copy = t.practice.placement
  const questions = placementQuizzes[language]
  const total = questions.length
  const { user, ready, openLogin } = useAuth()
  // undefined = still checking; null = not taken yet
  const [previous, setPrevious] = useState<QuizAttempt | null | undefined>(undefined)
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const savedRef = useRef(false)

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [results, setResults] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setPrevious(user ? getAttempt(user.email, language) : null)
  }, [user, language])

  // Saves the finished quiz to the profile (each person gets one attempt).
  useEffect(() => {
    if (!finished || !user || savedRef.current) return
    savedRef.current = true
    const score = results.filter(Boolean).length
    const attempt = saveAttempt({
      email: user.email,
      language,
      score,
      total,
      level: levelForScore(score),
      missedTopics: questions.filter((_, i) => !results[i]).map((q) => q.topic),
    })
    setAttemptId(attempt.id)
  }, [finished, user, results, language, total, questions])

  if (finished) {
    const score = results.filter(Boolean).length
    return (
      <Result
        language={language}
        level={levelForScore(score)}
        score={score}
        total={results.length}
        results={results}
        attemptId={attemptId}
        goalsDone={false}
      />
    )
  }

  if (!ready || (user && previous === undefined)) return null

  if (!user) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-primary/25 bg-muted/50 p-6">
        <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Lock className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">{copy.loginRequiredTitle}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {copy.loginRequiredText}
          </p>
        </div>
        <button
          type="button"
          onClick={openLogin}
          className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
        >
          {copy.loginRequiredCta}
        </button>
      </div>
    )
  }

  if (previous) {
    return (
      <div className="space-y-6">
        <p className="rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground">
          {copy.alreadyTaken}
        </p>
        <Result
          language={language}
          level={previous.level}
          score={previous.score}
          total={previous.total}
          attemptId={previous.id}
          goalsDone={previous.goals.length > 0}
        />
      </div>
    )
  }

  const question = questions[index]
  const isLast = index === total - 1
  const isCorrect = checked && selected === question.correct

  const submit = () => {
    if (selected === null) return
    setChecked(true)
    setResults((prev) => [...prev, selected === question.correct])
  }

  const next = () => {
    if (isLast) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setChecked(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
          <span className="font-semibold text-primary">{copy.progress(index + 1, total)}</span>
          <span className="text-muted-foreground">{copy.instructions}</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      <fieldset className="rounded-2xl border border-border p-5 md:p-6">
        <legend className="px-1 text-lg font-semibold leading-snug">
          {index + 1}. {question.prompt}
        </legend>
        <div className="mt-4 space-y-2">
          {question.options.map((option, oi) => {
            const isSelected = selected === oi
            const showCorrect = checked && oi === question.correct
            const showWrong = checked && isSelected && oi !== question.correct
            return (
              <label
                key={option}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  checked ? "cursor-default" : "cursor-pointer"
                } ${
                  showCorrect
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200"
                    : showWrong
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted"
                }`}
              >
                <input
                  type="radio"
                  name={`placement-${index}`}
                  className="sr-only"
                  checked={isSelected}
                  disabled={checked}
                  onChange={() => setSelected(oi)}
                />
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-full border text-xs font-semibold ${
                    showCorrect
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : showWrong
                        ? "border-destructive bg-destructive text-white"
                        : isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                <span className="flex-1">{option}</span>
                {showCorrect ? <CheckCircle2 className="size-5 text-emerald-600" /> : null}
                {showWrong ? <XCircle className="size-5 text-destructive" /> : null}
              </label>
            )
          })}
        </div>
      </fieldset>

      {checked ? (
        <p
          role="status"
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            isCorrect
              ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {isCorrect ? copy.correct : copy.wrong}
        </p>
      ) : null}

      {!checked ? (
        <button
          type="button"
          onClick={submit}
          disabled={selected === null}
          className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copy.submit}
        </button>
      ) : (
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
        >
          {isLast ? copy.finish : copy.next}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

function Result({
  language,
  level,
  score,
  total,
  results,
  attemptId,
  goalsDone,
}: {
  language: PlacementLanguage
  level: LevelCode
  score: number
  total: number
  /** Per-question right/wrong, only known right after taking the quiz */
  results?: boolean[]
  attemptId: string | null
  goalsDone: boolean
}) {
  const { t } = useI18n()
  const copy = t.practice.placement
  const askGoals = advancedLevels.includes(level) && !goalsDone

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-primary px-6 py-7 text-primary-foreground">
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
          {copy.resultEyebrow}
        </p>
        <p className="mt-3 text-sm opacity-90">{copy.levelLabel}</p>
        <p className="mt-1 text-4xl font-semibold tracking-tight">
          {level} – {copy.levels[level]}
        </p>
        <p className="mt-3 opacity-95">{copy.score(score, total)}</p>

        {results ? (
        <ol className="mt-5 flex flex-wrap gap-1.5" aria-label={copy.score(score, total)}>
          {results.map((ok, i) => (
            <li
              key={i}
              className={`grid size-7 place-items-center rounded-full text-xs font-semibold ${
                ok ? "bg-emerald-400 text-emerald-950" : "bg-red-400 text-red-950"
              }`}
            >
              {i + 1}
            </li>
          ))}
        </ol>
        ) : null}
      </div>

      <p className="text-sm text-muted-foreground">
        {copy.savedToProfile}{" "}
        <Link href="/profile" className="font-semibold text-primary underline-offset-4 hover:underline">
          {copy.viewProfile}
        </Link>
      </p>

      {askGoals ? <Goals language={language} attemptId={attemptId} /> : null}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/#book"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
        >
          {copy.bookTrial}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

function Goals({
  language,
  attemptId,
}: {
  language: PlacementLanguage
  attemptId: string | null
}) {
  const { t } = useI18n()
  const copy = t.practice.placement
  const goals = copy.goals[language]
  const [chosen, setChosen] = useState<number[]>([])
  const [saved, setSaved] = useState(false)

  const toggle = (i: number) =>
    setChosen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  if (saved) {
    return (
      <div className="rounded-2xl border border-primary/25 bg-muted/50 p-6">
        <p className="text-sm font-medium">{copy.goalsThanks}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {chosen
            .slice()
            .sort((a, b) => a - b)
            .map((i) => (
              <li
                key={i}
                className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
              >
                {goals[i].title}
              </li>
            ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border p-5 md:p-6">
      <h2 className="text-2xl font-semibold tracking-tight">{copy.goalsTitle}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.goalsIntro}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
        {copy.goalsHint}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {goals.map((goal, i) => {
          const on = chosen.includes(i)
          return (
            <label
              key={goal.title}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                on ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={on}
                onChange={() => toggle(i)}
              />
              <span
                className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border ${
                  on ? "border-primary bg-primary text-primary-foreground" : "border-border"
                }`}
              >
                {on ? <Check className="size-3.5" aria-hidden="true" /> : null}
              </span>
              <span>
                <span className="block text-sm font-semibold">{goal.title}</span>
                <span className="block text-sm text-muted-foreground">{goal.text}</span>
              </span>
            </label>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => {
          if (attemptId) saveAttemptGoals(attemptId, chosen)
          setSaved(true)
        }}
        disabled={chosen.length === 0}
        className="mt-5 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copy.goalsSubmit}
      </button>
    </div>
  )
}
