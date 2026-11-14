import { NextResponse } from "next/server"
import { mailConfigured, sendContactEmail } from "@/lib/mail"
import { site } from "@/lib/site"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max)
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const phone = clean(body.phone, 40)
  const interest = clean(body.interest, 60)
  const message = clean(body.message, 5000)

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 })
  }

  if (!mailConfigured()) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 500 },
    )
  }

  try {
    await sendContactEmail({
      to: process.env.CONTACT_INBOX || site.email,
      name,
      email,
      phone,
      interest,
      message,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("Contact email failed:", err)
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 })
  }
}
