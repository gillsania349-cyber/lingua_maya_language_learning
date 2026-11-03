"use client"

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CalendarDays, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"

const WEEKDAYS_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const WEEKDAYS_ES = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"]

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDisplay(date: Date, locale: string) {
  const datePart = date.toLocaleDateString(locale === "es" ? "es-GT" : "en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const timePart = date.toLocaleTimeString(locale === "es" ? "es-GT" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
  return `${datePart} · ${timePart}`
}

function toStorageValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

type Props = {
  id?: string
  name: string
  required?: boolean
  className?: string
}

type PanelPos = { top: number; left: number; width: number }

export function DateTimePicker({ id, name, required, className = "" }: Props) {
  const { locale, t } = useI18n()
  const copy = t.booking.picker
  const weekdays = locale === "es" ? WEEKDAYS_ES : WEEKDAYS_EN

  const today = useMemo(() => startOfDay(new Date()), [])
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [panelPos, setPanelPos] = useState<PanelPos | null>(null)
  const [selected, setSelected] = useState<Date | null>(null)
  const [view, setView] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })
  const [hour12, setHour12] = useState(9)
  const [minute, setMinute] = useState(0)
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM")
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  function updatePosition() {
    const trigger = triggerRef.current
    const panel = panelRef.current
    if (!trigger) return

    const rect = trigger.getBoundingClientRect()
    const panelWidth = Math.min(352, Math.max(rect.width, 280))
    const gap = 8
    const margin = 12
    const panelHeight = panel?.offsetHeight ?? 440

    let left = rect.right - panelWidth
    left = Math.max(margin, Math.min(left, window.innerWidth - panelWidth - margin))

    const spaceBelow = window.innerHeight - rect.bottom - gap - margin
    const spaceAbove = rect.top - gap - margin
    const placeAbove =
      spaceBelow < Math.min(panelHeight, 360) && spaceAbove > spaceBelow

    let top = placeAbove
      ? rect.top - gap - Math.min(panelHeight, spaceAbove)
      : rect.bottom + gap

    const maxTop = window.innerHeight - margin - Math.min(panelHeight, window.innerHeight - margin * 2)
    top = Math.max(margin, Math.min(top, maxTop))

    setPanelPos({ top, left, width: panelWidth })
  }

  function openPicker() {
    const trigger = triggerRef.current
    if (trigger) {
      const rect = trigger.getBoundingClientRect()
      const panelWidth = Math.min(352, Math.max(rect.width, 280))
      const left = Math.max(
        12,
        Math.min(rect.right - panelWidth, window.innerWidth - panelWidth - 12),
      )
      setPanelPos({ top: rect.bottom + 8, left, width: panelWidth })
    }
    setOpen(true)
  }

  useLayoutEffect(() => {
    if (!open) return
    updatePosition()
    const onReposition = () => updatePosition()
    window.addEventListener("resize", onReposition)
    window.addEventListener("scroll", onReposition, true)
    return () => {
      window.removeEventListener("resize", onReposition)
      window.removeEventListener("scroll", onReposition, true)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node
      if (rootRef.current?.contains(target)) return
      if (panelRef.current?.contains(target)) return
      setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const days = useMemo(() => {
    const year = view.getFullYear()
    const month = view.getMonth()
    const first = new Date(year, month, 1)
    const startPad = first.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: Array<Date | null> = []
    for (let i = 0; i < startPad; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [view])

  const monthLabel = view.toLocaleDateString(
    locale === "es" ? "es-GT" : "en-US",
    { month: "long", year: "numeric" },
  )

  function applyTime(base: Date) {
    const next = new Date(base)
    let h = hour12 % 12
    if (ampm === "PM") h += 12
    next.setHours(h, minute, 0, 0)
    return next
  }

  function pickDay(day: Date) {
    setSelected(applyTime(day))
  }

  function syncFromControls(nextHour = hour12, nextMinute = minute, nextAmPm = ampm) {
    const base = selected ? new Date(selected) : new Date()
    let h = nextHour % 12
    if (nextAmPm === "PM") h += 12
    base.setHours(h, nextMinute, 0, 0)
    setSelected(new Date(base))
  }

  function setToday() {
    const now = new Date()
    const h24 = now.getHours()
    const h12 = h24 % 12 || 12
    const ap = h24 >= 12 ? "PM" : "AM"
    const mins = Math.floor(now.getMinutes() / 5) * 5
    setHour12(h12)
    setMinute(mins)
    setAmpm(ap)
    const day = startOfDay(now)
    let h = h12 % 12
    if (ap === "PM") h += 12
    day.setHours(h, mins, 0, 0)
    setSelected(day)
    setView(new Date(now.getFullYear(), now.getMonth(), 1))
  }

  function clear() {
    setSelected(null)
  }

  const display = selected ? formatDisplay(selected, locale) : ""
  const value = selected ? toStorageValue(selected) : ""

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5)

  const panel =
    open && mounted && panelPos
      ? createPortal(
          <div
            ref={panelRef}
            role="dialog"
            aria-label={copy.title}
            style={{
              position: "fixed",
              top: panelPos.top,
              left: panelPos.left,
              width: panelPos.width,
              maxHeight: "min(28rem, calc(100vh - 24px))",
            }}
            className="soft-scroll z-[200] overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-background shadow-[0_24px_60px_-20px_rgba(80,40,140,0.4)]"
          >
            <div className="border-b border-border bg-gradient-to-br from-primary/12 via-secondary/40 to-background px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {copy.title}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {display || copy.placeholder}
              </p>
            </div>

            <div className="p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
                  }
                  className="grid size-9 place-items-center rounded-full text-foreground transition hover:bg-primary/10"
                  aria-label={copy.prevMonth}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <p className="text-sm font-semibold capitalize">{monthLabel}</p>
                <button
                  type="button"
                  onClick={() =>
                    setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
                  }
                  className="grid size-9 place-items-center rounded-full text-foreground transition hover:bg-primary/10"
                  aria-label={copy.nextMonth}
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>

              <div className="mb-1 grid grid-cols-7 gap-1">
                {weekdays.map((d) => (
                  <div
                    key={d}
                    className="py-1 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => {
                  if (!day) return <div key={`e-${i}`} />
                  const isToday = sameDay(day, today)
                  const isSelected = selected ? sameDay(day, selected) : false
                  const isPast = day < today
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      disabled={isPast}
                      onClick={() => pickDay(day)}
                      className={`grid aspect-square place-items-center rounded-xl text-sm font-medium transition ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                          : isToday
                            ? "bg-secondary text-secondary-foreground ring-2 ring-primary/30"
                            : isPast
                              ? "cursor-not-allowed text-muted-foreground/40"
                              : "text-foreground hover:bg-primary/10"
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-muted/60 p-3">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  <Clock className="size-3.5" />
                  {copy.time}
                </div>
                <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <label className="block text-[11px] font-medium text-muted-foreground">
                    {copy.hour}
                    <select
                      value={hour12}
                      onChange={(e) => {
                        const v = Number(e.target.value)
                        setHour12(v)
                        syncFromControls(v, minute, ampm)
                      }}
                      className="mt-1 h-10 w-full rounded-xl border border-input bg-background px-2 text-sm font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                    >
                      {hours.map((h) => (
                        <option key={h} value={h}>
                          {pad(h)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-[11px] font-medium text-muted-foreground">
                    {copy.minute}
                    <select
                      value={minute}
                      onChange={(e) => {
                        const v = Number(e.target.value)
                        setMinute(v)
                        syncFromControls(hour12, v, ampm)
                      }}
                      className="mt-1 h-10 w-full rounded-xl border border-input bg-background px-2 text-sm font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                    >
                      {minutes.map((m) => (
                        <option key={m} value={m}>
                          {pad(m)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="flex h-10 flex-col justify-end overflow-hidden rounded-xl border border-input bg-background">
                    {(["AM", "PM"] as const).map((ap) => (
                      <button
                        key={ap}
                        type="button"
                        onClick={() => {
                          setAmpm(ap)
                          syncFromControls(hour12, minute, ap)
                        }}
                        className={`flex-1 px-2.5 text-[10px] font-bold leading-none transition ${
                          ampm === ap
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-primary/10"
                        }`}
                      >
                        {ap}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={clear}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  {copy.clear}
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={setToday}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                  >
                    {copy.today}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!selected) setToday()
                      setOpen(false)
                    }}
                    className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
                  >
                    {copy.done}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <input
        type="text"
        name={name}
        value={value}
        required={required}
        readOnly
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute h-px w-px opacity-0"
        onFocus={() => openPicker()}
      />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => {
          if (open) setOpen(false)
          else openPicker()
        }}
        className="box-border flex h-12 w-full items-center gap-3 rounded-xl border border-input bg-muted px-4 text-left text-base outline-none transition hover:border-primary/40 focus-visible:border-primary focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-primary/25"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <CalendarDays className="size-5 shrink-0 text-primary" aria-hidden />
        <span
          className={
            display ? "truncate font-medium text-foreground" : "text-muted-foreground"
          }
        >
          {display || copy.placeholder}
        </span>
        <Clock className="ml-auto size-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>
      {panel}
    </div>
  )
}
