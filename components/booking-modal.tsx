"use client"

import { X } from "lucide-react"
import { BookingForm } from "@/components/booking-form"
import { useI18n } from "@/components/i18n-provider"
import type { PublicUser } from "@/lib/auth"

export function BookingModal({
  open,
  onClose,
  user,
}: {
  open: boolean
  onClose: () => void
  user: PublicUser | null
}) {
  const { t } = useI18n()
  const copy = t.booking

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={t.auth.close}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-border bg-background shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-background/95 px-6 py-5 backdrop-blur md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {copy.eyebrow}
            </p>
            <h2
              id="booking-modal-title"
              className="mt-1 text-2xl font-semibold tracking-tight"
            >
              {copy.title}
            </h2>
            {user ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {t.auth.loggedInAs} <span className="font-medium text-foreground">{user.name}</span>
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-muted"
            aria-label={t.auth.close}
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-6 py-6 md:px-8 md:pb-8">
          <BookingForm user={user} onDone={onClose} />
        </div>
      </div>
    </div>
  )
}
