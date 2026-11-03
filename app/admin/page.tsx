"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Mail, Users } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import { listBookings, listMessages } from "@/lib/admin"
import { listUsers } from "@/lib/auth"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    newBookings: 0,
    messages: 0,
    newMessages: 0,
  })

  useEffect(() => {
    const bookings = listBookings()
    const messages = listMessages()
    setStats({
      users: listUsers().length,
      bookings: bookings.length,
      newBookings: bookings.filter((b) => b.status === "new").length,
      messages: messages.length,
      newMessages: messages.filter((m) => m.status === "new").length,
    })
  }, [])

  const cards = [
    {
      label: "Users",
      value: stats.users,
      href: "/admin/users",
      icon: Users,
      note: "Registered accounts",
    },
    {
      label: "Bookings",
      value: stats.bookings,
      href: "/admin/bookings",
      icon: BookOpen,
      note: `${stats.newBookings} new`,
    },
    {
      label: "Messages",
      value: stats.messages,
      href: "/admin/messages",
      icon: Mail,
      note: `${stats.newMessages} unread`,
    },
  ]

  return (
    <AdminShell>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of Lingua Maya website activity.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, href, icon: Icon, note }) => (
          <Link
            key={label}
            href={href}
            className="rounded-3xl border border-primary/20 bg-background p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <p className="mt-5 text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-1 text-3xl font-semibold">{value}</p>
            <p className="mt-2 text-xs text-muted-foreground">{note}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-background p-6">
        <h3 className="font-semibold">Quick tips</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• New lesson bookings appear under Bookings.</li>
          <li>• Contact form submissions appear under Messages.</li>
          <li>• You can delete users or mark bookings as confirmed/done.</li>
        </ul>
      </div>
    </AdminShell>
  )
}
