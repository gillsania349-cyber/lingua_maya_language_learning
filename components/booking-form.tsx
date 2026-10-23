"use client"

import { useState } from "react"
import { Clock, Send, Users, User, Video } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { whatsappLink } from "@/lib/site"
import type { PublicUser } from "@/lib/auth"

const lessonTypes = [
  { id: "trial", icon: Clock },
  { id: "private", icon: User },
  { id: "group", icon: Users },
] as const

type LessonTypeId = (typeof lessonTypes)[number]["id"]
const languageIds = ["maya", "english", "spanish"] as const

const fieldClass =
  "box-border h-12 w-full appearance-none rounded-xl border border-input bg-muted px-4 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-primary/25"

const areaClass =
  "box-border w-full resize-none appearance-none rounded-xl border border-input bg-muted px-4 py-3 text-base text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:border-primary focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-primary/25"

export function BookingForm({
  user,
  onDone,
}: {
  user: PublicUser | null
  onDone?: () => void
}) {
  const { t } = useI18n()
  const copy = t.booking
  const [lessonType, setLessonType] = useState<LessonTypeId>("trial")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const language =
      copy.languageOptions[
        data.get("language") as (typeof languageIds)[number]
      ]
    const m = copy.message
    const lines = [
      m.intro,
      `${m.name}: ${data.get("name")}`,
      `Email: ${user?.email ?? ""}`,
      `${m.language}: ${language}`,
      `${m.lesson}: ${copy.lessonTypes[lessonType].name}`,
      `${m.format}: Online`,
      `${m.time}: ${data.get("time") || m.flexible}`,
    ]
    const notes = String(data.get("notes") ?? "").trim()
    if (notes) lines.push(`${m.notes}: ${notes}`)
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer")
    onDone?.()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold">{copy.lessonTypeLegend}</p>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          <Video className="size-3.5" aria-hidden="true" />
          {copy.onlineBadge}
        </span>
      </div>

      <fieldset>
        <legend className="sr-only">{copy.lessonTypeLegend}</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {lessonTypes.map((type) => {
            const Icon = type.icon
            const checked = lessonType === type.id
            return (
              <label
                key={type.id}
                className={`flex min-h-[7rem] cursor-pointer flex-col gap-2 rounded-2xl border p-4 transition has-focus-visible:ring-3 has-focus-visible:ring-primary/25 ${
                  checked
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-muted hover:border-primary/40"
                }`}
              >
                <input
                  type="radio"
                  name="lessonType"
                  value={type.id}
                  checked={checked}
                  onChange={() => setLessonType(type.id)}
                  className="sr-only"
                />
                <Icon className="size-5" aria-hidden="true" />
                <span className="text-sm font-semibold leading-tight">
                  {copy.lessonTypes[type.id].name}
                </span>
                <span
                  className={`mt-auto text-xs ${
                    checked ? "opacity-85" : "text-muted-foreground"
                  }`}
                >
                  {copy.lessonTypes[type.id].detail}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

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
        <input
          id="book-time"
          name="time"
          type="datetime-local"
          required
          className={`${fieldClass} [color-scheme:light]`}
        />
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
