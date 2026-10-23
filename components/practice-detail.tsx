"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  ListTodo,
  Sparkles,
  XCircle,
} from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import type { PracticeSlug } from "@/lib/practice"

const icons = {
  quizzes: Sparkles,
  tasks: ListTodo,
  assignments: ClipboardList,
} as const

export function PracticeDetail({ slug }: { slug: PracticeSlug }) {
  const { t } = useI18n()
  const copy = t.practice
  const page = copy.pages[slug]
  const Icon = icons[slug]

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href="/#practice"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {copy.back}
      </Link>

      <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_20px_50px_-28px_rgba(80,40,140,0.3)]">
        <div className="bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-10">
          <span className="grid size-12 place-items-center rounded-2xl bg-background/15">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-5 text-sm font-semibold uppercase tracking-widest opacity-80">
            {copy.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight md:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed opacity-95">
            {page.intro}
          </p>
        </div>

        <div className="space-y-8 px-6 py-8 md:px-10 md:py-10">
          {slug === "quizzes" ? <QuizPanel /> : null}

          {slug === "tasks" ? (
            <ul className="space-y-3">
              {page.items.map((item, i) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-border bg-muted/50 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {copy.taskLabel} {i + 1}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {item.meta}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {slug === "assignments" ? (
            <ul className="space-y-3">
              {page.items.map((item, i) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-border bg-muted/50 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {copy.assignmentLabel} {i + 1}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                      {item.meta}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="rounded-2xl bg-accent px-5 py-4 text-sm leading-relaxed text-accent-foreground">
            {page.note}
          </p>
        </div>
      </div>
    </article>
  )
}

function QuizPanel() {
  const { t } = useI18n()
  const quiz = t.practice.quiz
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return quiz.questions.reduce((total, q, i) => {
      return total + (answers[i] === q.correct ? 1 : 0)
    }, 0)
  }, [answers, quiz.questions])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">{quiz.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{quiz.subtitle}</p>
      </div>

      {quiz.questions.map((q, qi) => (
        <fieldset key={q.prompt} className="rounded-2xl border border-border p-5">
          <legend className="px-1 text-sm font-semibold">
            {qi + 1}. {q.prompt}
          </legend>
          <div className="mt-3 space-y-2">
            {q.options.map((option, oi) => {
              const selected = answers[qi] === oi
              const isCorrect = submitted && oi === q.correct
              const isWrong = submitted && selected && oi !== q.correct
              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                    isCorrect
                      ? "border-primary bg-primary/10"
                      : isWrong
                        ? "border-destructive/40 bg-destructive/5"
                        : selected
                          ? "border-primary bg-muted"
                          : "border-border hover:bg-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    className="sr-only"
                    checked={selected}
                    disabled={submitted}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [qi]: oi }))
                    }
                  />
                  <span className="flex-1">{option}</span>
                  {isCorrect ? (
                    <CheckCircle2 className="size-4 text-primary" />
                  ) : null}
                  {isWrong ? (
                    <XCircle className="size-4 text-destructive" />
                  ) : null}
                </label>
              )
            })}
          </div>
        </fieldset>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < quiz.questions.length}
          className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {quiz.submit}
        </button>
      ) : (
        <div className="rounded-2xl bg-primary px-5 py-4 text-primary-foreground">
          <p className="font-semibold">
            {quiz.result(score, quiz.questions.length)}
          </p>
          <button
            type="button"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
            }}
            className="mt-3 rounded-full bg-background px-5 py-2 text-sm font-semibold text-foreground"
          >
            {quiz.retry}
          </button>
        </div>
      )}
    </div>
  )
}
