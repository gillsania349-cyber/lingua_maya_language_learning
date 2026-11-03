"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Mail,
  Users,
} from "lucide-react"
import { adminLogout, isAdminLoggedIn } from "@/lib/admin"

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/messages", label: "Messages", icon: Mail },
] as const

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.replace("/admin/login")
      return
    }
    setOk(true)
  }, [router])

  if (!ok) {
    return (
      <div className="grid min-h-screen place-items-center bg-muted text-sm text-muted-foreground">
        Checking admin access…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <aside className="border-b border-border bg-background md:w-64 md:border-b-0 md:border-r">
          <div className="flex items-center justify-between gap-3 px-5 py-5 md:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Lingua Maya
              </p>
              <h1 className="mt-1 text-lg font-semibold">Admin Panel</h1>
            </div>
            <button
              type="button"
              onClick={() => {
                adminLogout()
                router.replace("/admin/login")
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-semibold md:mt-6"
            >
              <LogOut className="size-3.5" />
              Log out
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col md:pb-6">
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="hidden px-5 pb-6 md:block">
            <Link href="/" className="text-xs font-medium text-muted-foreground hover:text-foreground">
              ← Back to website
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  )
}
