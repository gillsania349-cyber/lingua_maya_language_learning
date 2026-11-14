"use client"

import { useEffect, useState, type FormEvent } from "react"
import { CheckCircle2, Clock, Loader2, X } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { saveMessage } from "@/lib/admin"
import { isMaterialSlug, materialIdBySlug } from "@/lib/materials"

const fieldClass =
  "mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"

export function ContactForm() {
  const { locale, t } = useI18n()
  const form = t.contact.form
  const [interest, setInterest] = useState(form.interestOptions[0])
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  )

  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    setInterest(form.interestOptions[0])
  }, [locale, form.interestOptions])

  useEffect(() => {
    if (!showPopup) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPopup(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showPopup])

  // Opened from a material's "Order" button: /contact?material=<slug>
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("material")
    if (!slug || !isMaterialSlug(slug)) return
    const item = t.materials.items[materialIdBySlug[slug]]
    setMessage(t.materials.orderMessage(item.name, item.format))
  }, [t])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formEl = e.currentTarget
    const data = new FormData(formEl)
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: message.trim(),
      interest,
      website: String(data.get("website") || ""),
    }

    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = (await res.json()) as { ok: boolean }
      if (!result.ok) throw new Error("send failed")

      saveMessage({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        interest: payload.interest,
        message: payload.message,
      })
      setStatus("sent")
      setShowPopup(true)
      formEl.reset()
      setMessage("")
      setInterest(form.interestOptions[0])
    } catch {
      setStatus("error")
    }
  }

  return (
    <>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder={form.messagePlaceholder}
            className={`${fieldClass} resize-y`}
          />
        </label>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          {/* honeypot for bots — hidden from people and screen readers */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-60"
          >
            {status === "sending" && <Loader2 className="size-4 animate-spin" />}
            {status === "sending" ? form.sending : form.submit}
          </button>
          {status === "sent" ? (
            <p role="status" className="max-w-xs text-sm font-medium text-primary">
              {form.success}
            </p>
          ) : status === "error" ? (
            <p role="alert" className="max-w-xs text-sm font-medium text-destructive">
              {form.error}
            </p>
          ) : (
            <p className="max-w-xs text-sm text-muted-foreground">{form.hint}</p>
          )}
        </div>
      </div>
    </form>

    {showPopup && (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-sent-title"
        className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      >
        <button
          type="button"
          aria-label={form.popupClose}
          onClick={() => setShowPopup(false)}
          className="absolute inset-0 animate-in fade-in bg-black/50 backdrop-blur-sm duration-200"
        />
        <div className="relative w-full max-w-sm animate-in fade-in zoom-in-95 overflow-hidden rounded-[2rem] bg-background text-center shadow-2xl duration-200">
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            aria-label={form.popupClose}
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-primary-foreground/80 transition hover:bg-white/15 hover:text-primary-foreground"
          >
            <X className="size-5" />
          </button>

          <div className="bg-primary px-6 pb-10 pt-10 text-primary-foreground">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-background/15 ring-8 ring-background/10">
              <CheckCircle2 className="size-9" aria-hidden="true" />
            </span>
          </div>

          <div className="px-6 pb-7 pt-6">
            <h3 id="contact-sent-title" className="text-2xl font-medium tracking-tight">
              {form.popupTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {form.popupText}
            </p>
            <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Clock className="size-4" aria-hidden="true" />
              {form.popupBadge}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setShowPopup(false)}
              className="mt-6 w-full rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85"
            >
              {form.popupClose}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
