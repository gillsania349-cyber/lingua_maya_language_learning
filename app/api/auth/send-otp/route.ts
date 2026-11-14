import { NextResponse } from "next/server"
import { createOtpChallenge, generateOtpCode } from "@/lib/otp"
import { mailConfigured, sendVerificationEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string
      name?: string
      purpose?: "signup" | "login" | "reset"
    }

    const email = String(body.email || "")
      .trim()
      .toLowerCase()
    const name = String(body.name || "").trim()
    const purpose = body.purpose || "signup"

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "invalid_email" },
        { status: 400 },
      )
    }

    if (!mailConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          error: "mail_not_configured",
          message:
            "Add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local, then restart the server.",
        },
        { status: 500 },
      )
    }

    const code = generateOtpCode()
    const challenge = createOtpChallenge(email, code)

    await sendVerificationEmail({ to: email, name, code, purpose })

    return NextResponse.json({ ok: true, challenge })
  } catch (error) {
    console.error("send-otp failed", error)
    return NextResponse.json(
      {
        ok: false,
        error: "send_failed",
        message:
          "Could not send email. Check that the Gmail App Password is correct.",
      },
      { status: 500 },
    )
  }
}
