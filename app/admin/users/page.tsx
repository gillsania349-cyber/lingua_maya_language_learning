"use client"

import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"
import { AdminShell } from "@/components/admin/admin-shell"
import { deleteUserById, listUsers, type PublicUser } from "@/lib/auth"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<PublicUser[]>([])

  function refresh() {
    setUsers(listUsers())
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <AdminShell>
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          People who signed up on the website ({users.length}).
        </p>
      </div>

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
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-muted-foreground">{u.email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete user ${u.name}?`)) {
                      deleteUserById(u.id)
                      refresh()
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="size-3.5" />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  )
}
