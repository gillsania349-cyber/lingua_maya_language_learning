import { createHash, createHmac, timingSafeEqual } from "crypto"

const OTP_TTL_MS = 10 * 60 * 1000

function secret() {
  return (
    process.env.OTP_SECRET ||
    process.env.GMAIL_APP_PASSWORD ||
    "lingua-maya-dev-otp-secret"
  )
}

function hashCode(code: string) {
  return createHash("sha256").update(`${code}:${secret()}`).digest("hex")
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url")
}

export function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

/** Opaque challenge token the client must send back with the code. */
export function createOtpChallenge(email: string, code: string) {
  const body = {
    email: email.trim().toLowerCase(),
    exp: Date.now() + OTP_TTL_MS,
    h: hashCode(code),
  }
  const payload = Buffer.from(JSON.stringify(body)).toString("base64url")
  return `${payload}.${sign(payload)}`
}

export function verifyOtpChallenge(input: {
  email: string
  code: string
  challenge: string
}): { ok: true } | { ok: false; error: string } {
  const [payload, sig] = input.challenge.split(".")
  if (!payload || !sig) return { ok: false, error: "invalid" }

  const expectedSig = sign(payload)
  try {
    const a = Buffer.from(sig)
    const b = Buffer.from(expectedSig)
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return { ok: false, error: "invalid" }
    }
  } catch {
    return { ok: false, error: "invalid" }
  }

  try {
    const body = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { email: string; exp: number; h: string }

    if (Date.now() > body.exp) return { ok: false, error: "expired" }
    if (body.email !== input.email.trim().toLowerCase()) {
      return { ok: false, error: "invalid" }
    }

    const got = hashCode(input.code.trim())
    const ha = Buffer.from(got)
    const hb = Buffer.from(body.h)
    if (ha.length !== hb.length || !timingSafeEqual(ha, hb)) {
      return { ok: false, error: "code" }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: "invalid" }
  }
}
