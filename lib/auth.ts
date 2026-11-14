import { getSupabase } from "@/lib/supabase/client"

export type PublicUser = {
  id: string
  name: string
  email: string
}

const SESSION_KEY = "lingua-maya-session"

function toPublicUser(input: {
  id: string
  email?: string | null
  user_metadata?: Record<string, unknown>
}): PublicUser {
  const metaName = input.user_metadata?.name
  const name =
    typeof metaName === "string" && metaName.trim()
      ? metaName.trim()
      : (input.email || "Student").split("@")[0]
  return {
    id: input.id,
    name,
    email: (input.email || "").toLowerCase(),
  }
}

export function getSessionUser(): PublicUser | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PublicUser
  } catch {
    return null
  }
}

export function setSessionUser(user: PublicUser) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY)
}

async function upsertProfile(user: PublicUser) {
  const supabase = getSupabase()
  await supabase.from("profiles").upsert(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    { onConflict: "id" },
  )
}

export async function signupUser(input: {
  name: string
  email: string
  password: string
}): Promise<
  | { ok: true; user: PublicUser }
  | { ok: false; error: string; message?: string }
> {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (!name || !email || password.length < 6) {
    return { ok: false, error: "invalid" }
  }

  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes("already") || msg.includes("registered")) {
        return { ok: false, error: "exists" }
      }
      if (msg.includes("rate limit")) {
        return {
          ok: false,
          error: "rate_limit",
          message:
            "Supabase email limit hit. Turn OFF Auth → Providers → Email → Confirm email, wait 1 minute, then try again.",
        }
      }
      return { ok: false, error: "supabase", message: error.message }
    }

    if (!data.user) return { ok: false, error: "invalid" }

    const user = toPublicUser({
      id: data.user.id,
      email: data.user.email ?? email,
      user_metadata: { ...data.user.user_metadata, name },
    })

    if (data.session) {
      await upsertProfile(user)
    }

    // Keep pending until OTP; app session is set in completeLogin()
    return { ok: true, user }
  } catch (err) {
    return {
      ok: false,
      error: "supabase",
      message: err instanceof Error ? err.message : "Signup failed",
    }
  }
}

export async function verifyLoginCredentials(input: {
  email: string
  password: string
}): Promise<{ ok: true; user: PublicUser } | { ok: false; error: string }> {
  const email = input.email.trim().toLowerCase()
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: input.password,
    })

    if (error || !data.user) return { ok: false, error: "credentials" }

    const user = toPublicUser(data.user)
    await upsertProfile(user)
    return { ok: true, user }
  } catch {
    return { ok: false, error: "credentials" }
  }
}

export async function completeLogin(user: PublicUser) {
  setSessionUser(user)
  try {
    await upsertProfile(user)
  } catch {
    // Profile write can fail if SQL table is not created yet
  }
}

export async function logoutUser() {
  clearSession()
  try {
    await getSupabase().auth.signOut()
  } catch {
    // ignore
  }
}

export async function cancelPendingAuth() {
  try {
    await getSupabase().auth.signOut()
  } catch {
    // ignore
  }
}

export async function findUserByEmail(
  email: string,
): Promise<{ ok: true; user: PublicUser } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase()
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email")
      .eq("email", normalized)
      .maybeSingle()

    if (error || !data) return { ok: false, error: "notfound" }
    return {
      ok: true,
      user: { id: data.id, name: data.name, email: data.email },
    }
  } catch {
    return { ok: false, error: "notfound" }
  }
}

export async function resetUserPassword(input: {
  email: string
  password: string
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = input.email.trim().toLowerCase()
  const password = input.password
  if (!email || password.length < 6) return { ok: false, error: "invalid" }

  // Requires the user to already have a Supabase session from login+OTP,
  // or a future service-role API. For now update if a session exists.
  try {
    const supabase = getSupabase()
    const { data: sessionData } = await supabase.auth.getSession()
    const sessionEmail = sessionData.session?.user.email?.toLowerCase()
    if (!sessionEmail || sessionEmail !== email) {
      return { ok: false, error: "invalid" }
    }

    const { error } = await supabase.auth.updateUser({ password })
    if (error) return { ok: false, error: "invalid" }
    return { ok: true }
  } catch {
    return { ok: false, error: "invalid" }
  }
}

export type Plan = "free" | "premium"
export type AdminUser = PublicUser & { plan: Plan }

export async function listUsers(): Promise<AdminUser[]> {
  try {
    const supabase = getSupabase()
    const withPlan = await supabase
      .from("profiles")
      .select("id, name, email, plan")
      .order("created_at", { ascending: false })

    // Before supabase/plans.sql is run there's no plan column yet.
    const { data, error } = withPlan.error
      ? await supabase
          .from("profiles")
          .select("id, name, email")
          .order("created_at", { ascending: false })
      : withPlan

    if (error || !data) return []
    return data.map((row: Record<string, unknown>) => ({
      id: String(row.id),
      name: String(row.name),
      email: String(row.email),
      plan: row.plan === "premium" ? "premium" : "free",
    }))
  } catch {
    return []
  }
}

export async function getUserPlan(id: string): Promise<Plan> {
  try {
    const supabase = getSupabase()
    const { data } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", id)
      .maybeSingle()
    return data?.plan === "premium" ? "premium" : "free"
  } catch {
    return "free"
  }
}

export async function deleteUserById(id: string) {
  // Soft-delete from profiles only (auth user needs service role to remove)
  try {
    const supabase = getSupabase()
    await supabase.from("profiles").delete().eq("id", id)
  } catch {
    // ignore
  }
  const session = getSessionUser()
  if (session?.id === id) {
    await logoutUser()
  }
}

export function generateAuthCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}
