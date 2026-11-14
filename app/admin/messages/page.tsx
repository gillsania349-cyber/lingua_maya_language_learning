"use client"

import { useEffect, useState } from "react"
import { Reply, Trash2 } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import {
  deleteMessage,
  listMessages,
  updateMessageStatus,
  type AdminMessage,
} from "@/lib/admin"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<AdminMessage[]>([])

  function refresh() {
    setMessages(listMessages())
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <AdminShell>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Messages</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Contact form submissions from the website.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-border bg-background p-8 text-sm text-muted-foreground">
            No messages yet.
          </div>
        ) : (
          messages.map((m) => (
            <article
              key={m.id}
              className="rounded-3xl border border-border bg-background p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.email}</p>
                  {m.phone ? (
                    <p className="text-sm text-muted-foreground">{m.phone}</p>
                  ) : null}
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">
                  {m.status}
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-muted-foreground">
                Interest: {m.interest}
              </p>
              <p className="mt-3 rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed">
                {m.message}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                {new Date(m.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    m.email,
                  )}&su=${encodeURIComponent(
                    "Re: your message to Lingua Maya",
                  )}&body=${encodeURIComponent(
                    `Hi ${m.name},\n\n\n\n— Martha\n\n> ${m.message.split("\n").join("\n> ")}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    updateMessageStatus(m.id, "read")
                    refresh()
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-85"
                >
                  <Reply className="size-3.5" />
                  Reply
                </a>
                <button
                  type="button"
                  onClick={() => {
                    updateMessageStatus(m.id, "read")
                    refresh()
                  }}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  Mark read
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateMessageStatus(m.id, "new")
                    refresh()
                  }}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                >
                  Mark new
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteMessage(m.id)
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
