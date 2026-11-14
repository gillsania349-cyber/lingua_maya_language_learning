import { NextResponse } from "next/server"
import { verifyOtpChallenge } from "@/lib/otp"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string
      code?: string
      challenge?: string
    }

    const email = String(body.email || "").trim()
    const code = String(body.code || "").trim()
    const challenge = String(body.challenge || "").trim()

    if (!email || !code || !challenge) {
      return NextResponse.json(
        { ok: false, error: "invalid" },
        { status: 400 },
      )
    }

    const result = verifyOtpChallenge({ email, code, challenge })
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.error },
        { status: 400 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("verify-otp failed", error)
    return NextResponse.json(
      { ok: false, error: "invalid" },
      { status: 500 },
    )
  }
}
