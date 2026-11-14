import { NextResponse } from "next/server"
import { ADMIN_PASSWORD } from "@/lib/admin"
import { getSupabaseAdmin } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  const expected = process.env.ADMIN_PASSWORD || ADMIN_PASSWORD
  if (req.headers.get("x-admin-key") !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as {
    userId?: string
    plan?: string
  }
  const userId = String(body.userId || "")
  const plan = body.plan === "premium" ? "premium" : body.plan === "free" ? "free" : null
  if (!userId || !plan) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 })
  }

  const { error } = await supabase.from("profiles").update({ plan }).eq("id", userId)
  if (error) {
    console.error("Plan update failed:", error)
    return NextResponse.json(
      { ok: false, error: error.message.includes("plan") ? "no_column" : "failed" },
      { status: 500 },
    )
  }
  return NextResponse.json({ ok: true })
}
