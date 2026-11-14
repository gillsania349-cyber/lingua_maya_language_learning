"use client"

import { useEffect, useState } from "react"
import { Crown, Loader2, Trash2 } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import { deleteUserById, listUsers, type AdminUser, type Plan } from "@/lib/auth"
import { getAdminKey } from "@/lib/admin"

const planErrors: Record<string, string> = {
  unauthorized:
    "Your admin session expired or the password doesn't match ADMIN_PASSWORD on the server. Log out and log in again.",
  not_configured:
    "Add SUPABASE_SERVICE_ROLE_KEY to .env.local and restart the server.",
  no_column: "Run supabase/plans.sql in the Supabase SQL Editor first.",
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [error, setError] = useState("")

  async function changePlan(user: AdminUser, plan: Plan) {
    setSaving(user.id)
    setError("")
    try {
      const res = await fetch("/api/admin/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify({ userId: user.id, plan }),
      })
      const result = (await res.json()) as { ok: boolean; error?: string }
      if (!result.ok) {
        setError(planErrors[result.error || ""] || "Could not update the plan.")
        return
      }
      setUsers((list) => list.map((u) => (u.id === user.id ? { ...u, plan } : u)))
    } catch {
      setError("Could not update the plan.")
    } finally {
      setSaving(null)
    }
  }

  async function refresh() {
    setUsers(await listUsers())
  }

  useEffect(() => {
    void refresh()
  }, [])

  return (
    <AdminShell>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          People who signed up on the website ({users.length}) —{" "}
          {users.filter((u) => u.plan === "premium").length} Premium. Premium members
          can open the Speaking Club.
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-2xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-background">
        {users.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">No users yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="flex items-center gap-2 font-semibold">
                    {u.name}
                    {u.plan === "premium" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-semibold text-primary-foreground">
                        <Crown className="size-3" aria-hidden="true" />
                        Premium
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold">
                  {saving === u.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Crown className={`size-3.5 ${u.plan === "premium" ? "text-primary" : "text-muted-foreground"}`} />
                  )}
                  Premium
                  <input
                    type="checkbox"
                    role="switch"
                    checked={u.plan === "premium"}
                    disabled={saving === u.id}
                    onChange={(e) => void changePlan(u, e.target.checked ? "premium" : "free")}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className="relative h-5 w-9 rounded-full bg-muted transition after:absolute after:left-0.5 after:top-0.5 after:size-4 after:rounded-full after:bg-background after:shadow after:transition peer-checked:bg-primary peer-checked:after:translate-x-4 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete user ${u.name}?`)) {
                      void (async () => {
                        await deleteUserById(u.id)
                        await refresh()
                      })()
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  )
}
