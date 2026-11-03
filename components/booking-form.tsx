"use client"

import { useState } from "react"
import { CheckCircle2, Clock, Gift, Send, Video } from "lucide-react"
import { DateTimePicker } from "@/components/datetime-picker"
import { useI18n } from "@/components/i18n-provider"
import { saveBooking } from "@/lib/admin"
import { whatsappLink } from "@/lib/site"
import type { PublicUser } from "@/lib/auth"

const languageIds = ["maya", "english", "spanish"] as const

const fieldClass =
  "box-border h-12 w-full appearance-none rounded-xl border border-input bg-muted px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-primary/25"

const areaClass =
  "box-border w-full resize-none appearance-none rounded-xl border border-input bg-muted px-4 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-primary/25"

export function BookingForm({
  user,
  onDone,
  onSuccessChange,
}: {
  user: PublicUser | null
  onDone?: () => void
  onSuccessChange?: (success: boolean) => void
}) {
  const { t } = useI18n()
  const copy = t.booking
  const trial = copy.lessonTypes.trial
  const [submitted, setSubmitted] = useState(false)
  const [bookedTime, setBookedTime] = useState("")
  const [waUrl, setWaUrl] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const language =
      copy.languageOptions[
        data.get("language") as (typeof languageIds)[number]
      ]
    const time = String(data.get("time") || copy.message.flexible)
    const m = copy.message
    const lines = [
      m.intro,
      `${m.name}: ${data.get("name")}`,
      `Email: ${user?.email ?? ""}`,
      `${m.language}: ${language}`,
      `${m.lesson}: ${trial.name}`,
      `${m.format}: Online`,
      `${m.time}: ${time}`,
    ]
    const notes = String(data.get("notes") ?? "").trim()
    if (notes) lines.push(`${m.notes}: ${notes}`)

    saveBooking({
      name: String(data.get("name") || "").trim(),
      email: user?.email ?? "",
      language: String(language),
      lesson: trial.name,
      format: "Online",
      time,
      notes,
    })

    setBookedTime(time)
    setWaUrl(whatsappLink(lines.join("\n")))
    setSubmitted(true)
    onSuccessChange?.(true)
  }

  if (submitted) {
    const s = copy.success
    return (
      <div className="flex flex-col items-center gap-5 py-4 text-center sm:py-6">
        <div className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <div className="max-w-md space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {s.eyebrow}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
          <p className="rounded-2xl bg-primary/8 px-4 py-3 text-sm font-semibold text-foreground sm:text-base">
            {s.bookedAt.replace("{time}", bookedTime)}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {s.body}
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-4 font-semibold text-white transition hover:opacity-90"
          >
            {s.whatsapp}
          </a>
          <button
            type="button"
            onClick={() => onDone?.()}
            className="inline-flex w-full items-center justify-center rounded-full border border-input bg-muted px-7 py-3.5 text-sm font-semibold transition hover:border-primary/40 hover:bg-background"
          >
            {s.close}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">{copy.lessonTypeLegend}</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
            <Gift className="size-3.5" aria-hidden="true" />
            {copy.freeBadge}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            <Video className="size-3.5" aria-hidden="true" />
            {copy.onlineBadge}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-4 rounded-2xl border border-primary/25 bg-primary/8 p-4 sm:p-5">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Clock className="size-5" aria-hidden />
        </div>
        <div>
          <p className="text-base font-semibold">{trial.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{trial.detail}</p>
          <p className="mt-2 text-sm text-foreground/80">{copy.trialOnlyHint}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="book-name" className="text-sm font-semibold">
            {copy.nameLabel}
          </label>
          <input
            id="book-name"
            name="name"
            required
            defaultValue={user?.name ?? ""}
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="book-language" className="text-sm font-semibold">
            {copy.languageLabel}
          </label>
          <select
            id="book-language"
            name="language"
            className={fieldClass}
            defaultValue="maya"
          >
            {languageIds.map((id) => (
              <option key={id} value={id}>
                {copy.languageOptions[id]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="book-time" className="text-sm font-semibold">
          {copy.timeLabel}
        </label>
        <DateTimePicker id="book-time" name="time" required />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="book-notes" className="text-sm font-semibold">
          {copy.notesLabel}{" "}
          <span className="font-normal text-muted-foreground">{copy.optional}</span>
        </label>
        <textarea
          id="book-notes"
          name="notes"
          rows={3}
          placeholder={copy.notesPlaceholder}
          className={areaClass}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 font-semibold text-background transition hover:opacity-90"
      >
        <Send className="size-5" aria-hidden="true" />
        {copy.submit}
      </button>
    </form>
  )
}
