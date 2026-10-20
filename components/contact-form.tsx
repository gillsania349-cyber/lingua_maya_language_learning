"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useI18n } from "@/components/i18n-provider"
import { whatsappLink } from "@/lib/site"

const fieldClass =
  "mt-2 w-full rounded-2xl border border-transparent bg-background px-4 py-3.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"

export function ContactForm() {
  const { locale, t } = useI18n()
  const form = t.contact.form
  const [interest, setInterest] = useState(form.interestOptions[0])
  const [status, setStatus] = useState<"idle" | "sent">("idle")

  useEffect(() => {
    setInterest(form.interestOptions[0])
  }, [locale, form.interestOptions])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const phone = String(data.get("phone") || "").trim()
    const message = String(data.get("message") || "").trim()

    const lines = [
      form.whatsappIntro,
      "",
      `${form.name}: ${name}`,
      `${form.email}: ${email}`,
      phone ? `${form.phone}: ${phone}` : null,
      `${form.interest}: ${interest}`,
      "",
      `${form.message}:`,
      message,
    ].filter(Boolean)

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer")
    setStatus("sent")
    e.currentTarget.reset()
    setInterest(form.interestOptions[0])
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_20px_50px_-28px_rgba(80,40,140,0.35)]"
    >
      <div className="bg-primary px-6 py-6 text-primary-foreground md:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
          {form.cardEyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-medium tracking-tight">{form.cardTitle}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed opacity-85">{form.cardDescription}</p>
      </div>

      <div className="space-y-5 bg-muted/60 p-6 md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            {form.name}
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder={form.namePlaceholder}
              className={fieldClass}
            />
          </label>

          <label className="block text-sm font-medium">
            {form.email}
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={form.emailPlaceholder}
              className={fieldClass}
            />
          </label>
        </div>

        <label className="block text-sm font-medium">
          {form.phone}
          <input
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder={form.phonePlaceholder}
            pattern="^\+?[0-9\s\-()]{8,20}$"
            title={form.phone}
            className={fieldClass}
          />
        </label>

        <fieldset>
          <legend className="text-sm font-medium">{form.interest}</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {form.interestOptions.map((option) => {
              const selected = interest === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setInterest(option)}
                  aria-pressed={selected}
                  className={`rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all ${
                    selected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  {option}
                </button>
              )
            })}
          </div>
        </fieldset>

        <label className="block text-sm font-medium">
          {form.message}
          <textarea
            name="message"
            required
            rows={5}
            placeholder={form.messagePlaceholder}
            className={`${fieldClass} resize-y`}
          />
        </label>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            className="rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
          >
            {form.submit}
          </button>
          {status === "sent" ? (
            <p className="text-sm font-medium text-primary">{form.success}</p>
          ) : (
            <p className="max-w-xs text-sm text-muted-foreground">{form.hint}</p>
          )}
        </div>
      </div>
    </form>
  )
}
