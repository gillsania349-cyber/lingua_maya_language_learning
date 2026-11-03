"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import {
  deleteBooking,
  listBookings,
  updateBookingStatus,
  type AdminBooking,
} from "@/lib/admin"

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([])

  function refresh() {
    setBookings(listBookings())
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <AdminShell>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Bookings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Lesson booking requests from the website.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-border bg-background p-8 text-sm text-muted-foreground">
            No bookings yet. When someone books a lesson, it will show here.
          </div>
        ) : (
          bookings.map((b) => (
            <article
              key={b.id}
              className="rounded-3xl border border-border bg-background p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm text-muted-foreground">{b.email}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                  {b.status}
                </span>
              </div>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Lesson</dt>
                  <dd className="font-medium">{b.lesson}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Language</dt>
                  <dd className="font-medium">{b.language}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Time</dt>
                  <dd className="font-medium">{b.time}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Format</dt>
                  <dd className="font-medium">{b.format}</dd>
                </div>
              </dl>
              {b.notes ? (
                <p className="mt-3 rounded-2xl bg-muted px-4 py-3 text-sm">{b.notes}</p>
              ) : null}
              <p className="mt-3 text-xs text-muted-foreground">
                {new Date(b.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["new", "confirmed", "done"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      updateBookingStatus(b.id, status)
                      refresh()
                    }}
                    className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold capitalize hover:bg-muted"
                  >
                    {status}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    deleteBooking(b.id)
                    refresh()
                  }}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </AdminShell>
  )
}
