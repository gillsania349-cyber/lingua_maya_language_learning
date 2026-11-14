import nodemailer from "nodemailer"

export function mailConfigured() {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Sends a contact-form message to the admin inbox. Reply-To is the visitor,
 * so pressing "Reply" in Gmail answers them directly.
 */
export async function sendContactEmail(input: {
  to: string
  name: string
  email: string
  phone?: string
  interest?: string
  message: string
}) {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables.",
    )
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  })

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ...(input.phone ? [["Phone", input.phone] as [string, string]] : []),
    ...(input.interest ? [["Language", input.interest] as [string, string]] : []),
  ]

  await transporter.sendMail({
    from: `"Lingua Maya website" <${user}>`,
    to: input.to,
    replyTo: { name: input.name, address: input.email },
    subject: `New message from ${input.name} — Lingua Maya`,
    text: [
      "New contact form message from the website:",
      "",
      ...rows.map(([k, v]) => `${k}: ${v}`),
      "",
      "Message:",
      input.message,
      "",
      `Press Reply to answer ${input.name} directly.`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1a1a1a;max-width:560px">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b21a8;font-weight:700">New website message</p>
        <h2 style="margin:0 0 16px;font-weight:600">${escapeHtml(input.name)} wrote to you</h2>
        <table style="border-collapse:collapse;font-size:14px;margin-bottom:16px">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0;font-weight:600">${escapeHtml(v)}</td></tr>`,
            )
            .join("")}
        </table>
        <div style="white-space:pre-wrap;background:#f5f0fb;border-radius:12px;padding:14px 16px;font-size:15px">${escapeHtml(input.message)}</div>
        <p style="margin-top:20px">
          <a href="mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent("Re: your message to Lingua Maya")}"
             style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600">
            Reply to ${escapeHtml(input.name)}
          </a>
        </p>
        <p style="color:#888;font-size:12px">Or just press Reply — it goes straight to ${escapeHtml(input.email)}.</p>
      </div>
    `,
  })
}

export async function sendVerificationEmail(input: {
  to: string
  name?: string
  code: string
  purpose: "signup" | "login" | "reset"
}) {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD in environment variables.",
    )
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  })

  const purposeLabel =
    input.purpose === "signup"
      ? "sign up"
      : input.purpose === "login"
        ? "log in"
        : "reset your password"

  const greeting = input.name ? `Hi ${input.name},` : "Hi,"

  await transporter.sendMail({
    from: `"Lingua Maya" <${user}>`,
    to: input.to,
    subject: `Your Lingua Maya verification code: ${input.code}`,
    text: [
      greeting,
      "",
      `Your verification code to ${purposeLabel} is: ${input.code}`,
      "",
      "This code expires in 10 minutes.",
      "If you did not request this, you can ignore this email.",
      "",
      "— Lingua Maya",
    ].join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1a1a1a">
        <p>${greeting}</p>
        <p>Your verification code to <strong>${purposeLabel}</strong> is:</p>
        <p style="font-size:28px;letter-spacing:0.25em;font-weight:700;color:#6b21a8">${input.code}</p>
        <p>This code expires in 10 minutes.</p>
        <p style="color:#666">If you did not request this, you can ignore this email.</p>
        <p>— Lingua Maya</p>
      </div>
    `,
  })
}
