"use client"

import { useEffect, useState } from "react"
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
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!open) setSuccess(false)
  }, [open])

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
        className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-2xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-6 py-5 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {success ? copy.success.eyebrow : copy.eyebrow}
            </p>
            <h2
              id="booking-modal-title"
              className="mt-1 text-2xl font-semibold tracking-tight"
            >
              {success ? copy.success.title : copy.title}
            </h2>
            {!success && user ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {t.auth.loggedInAs}{" "}
                <span className="font-medium text-foreground">{user.name}</span>
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

        <div className="soft-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-8 md:pb-8">
          <BookingForm
            user={user}
            onDone={onClose}
            onSuccessChange={setSuccess}
          />
        </div>
      </div>
    </div>
  )
}
