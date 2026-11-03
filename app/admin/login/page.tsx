"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { KeyRound, Shield } from "lucide-react"
import { PasswordInput } from "@/components/password-input"
import {
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  adminLogin,
  getAdminPassword,
  isAdminLoggedIn,
  setAdminPassword,
} from "@/lib/admin"
import { generateAuthCode } from "@/lib/auth"

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-input bg-muted px-4 outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"

type Mode = "login" | "forgot" | "otp" | "reset"

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [mode, setMode] = useState<Mode>("login")
  const [authCode, setAuthCode] = useState("")
  const [demoPassword, setDemoPassword] = useState(ADMIN_PASSWORD)

  useEffect(() => {
    if (isAdminLoggedIn()) router.replace("/admin")
    setDemoPassword(getAdminPassword())
  }, [router])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setSuccess("")
    const data = new FormData(e.currentTarget)

    if (mode === "forgot") {
      const email = String(data.get("email") || "")
        .trim()
        .toLowerCase()
      if (email !== ADMIN_EMAIL) {
        setError("No admin account found with that email.")
        return
      }
      const code = generateAuthCode()
      setAuthCode(code)
      setMode("otp")
      return
    }

    if (mode === "otp") {
      const code = String(data.get("code") || "").trim()
      if (code !== authCode) {
        setError("Incorrect code. Please try again.")
        return
      }
      setMode("reset")
      return
    }

    if (mode === "reset") {
      const password = String(data.get("password") || "")
      const confirm = String(data.get("confirmPassword") || "")
      if (password.length < 6) {
        setError("Password must be at least 6 characters.")
        return
      }
      if (password !== confirm) {
        setError("Passwords do not match.")
        return
      }
      setAdminPassword(password)
      setDemoPassword(password)
      setMode("login")
      setSuccess("Password updated. You can log in now.")
      setAuthCode("")
      return
    }

    const email = String(data.get("email") || "")
    const password = String(data.get("password") || "")
    if (!adminLogin(email, password)) {
      setError("Incorrect admin email or password.")
      return
    }
    router.replace("/admin")
  }

  const title =
    mode === "otp"
      ? "Enter verification code"
      : mode === "forgot"
        ? "Reset admin password"
        : mode === "reset"
          ? "Choose a new password"
          : "Admin login"

  return (
    <div className="grid min-h-screen place-items-center bg-muted/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-xl"
      >
        <div className="bg-primary px-6 py-7 text-primary-foreground">
          <Shield className="size-8 opacity-90" />
          <h1 className="mt-4 text-2xl font-semibold">{title}</h1>
          <p className="mt-1 text-sm opacity-85">
            {mode === "login"
              ? "Manage users, bookings, and contact messages."
              : mode === "forgot"
                ? "Enter the admin email to receive a reset code."
                : mode === "otp"
                  ? "Enter the 6-digit verification code."
                  : "Set a new password for the admin panel."}
          </p>
        </div>
        <div className="space-y-4 p-6">
          {mode === "otp" ? (
            <>
              <div className="flex items-start gap-3 rounded-2xl bg-primary/10 p-4 text-sm text-primary">
                <KeyRound className="mt-0.5 size-5 shrink-0" />
                <div>
                  <p className="font-semibold">Verification code required</p>
                  <p className="mt-1 opacity-90">
                    Demo code:{" "}
                    <span className="font-mono text-base font-bold tracking-[0.2em]">
                      {authCode}
                    </span>
                  </p>
                </div>
              </div>
              <label className="block text-sm font-medium">
                Authentication code
                <input
                  name="code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="000000"
                  className={`${fieldClass} tracking-[0.35em]`}
                />
              </label>
            </>
          ) : mode === "forgot" ? (
            <label className="block text-sm font-medium">
              Email
              <input
                name="email"
                type="email"
                required
                defaultValue={ADMIN_EMAIL}
                className={fieldClass}
              />
            </label>
          ) : mode === "reset" ? (
            <>
              <label className="block text-sm font-medium">
                New password
                <PasswordInput
                  name="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  inputClassName={fieldClass}
                />
              </label>
              <label className="block text-sm font-medium">
                Confirm password
                <PasswordInput
                  name="confirmPassword"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder="Re-enter password"
                  inputClassName={fieldClass}
                />
              </label>
            </>
          ) : (
            <>
              <label className="block text-sm font-medium">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={ADMIN_EMAIL}
                  className={fieldClass}
                />
              </label>
              <label className="block text-sm font-medium">
                Password
                <PasswordInput
                  name="password"
                  required
                  defaultValue={demoPassword}
                  autoComplete="current-password"
                  inputClassName={fieldClass}
                />
              </label>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot")
                    setError("")
                    setSuccess("")
                  }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </>
          )}

          {error ? (
            <p className="text-sm font-medium text-destructive">{error}</p>
          ) : success ? (
            <p className="text-sm font-medium text-primary">{success}</p>
          ) : mode === "login" ? (
            <p className="rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
              Demo: {ADMIN_EMAIL} / {demoPassword}
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90"
          >
            {mode === "otp"
              ? "Verify & continue"
              : mode === "forgot"
                ? "Send reset code"
                : mode === "reset"
                  ? "Update password"
                  : "Enter admin panel"}
          </button>

          {mode !== "login" && (
            <button
              type="button"
              onClick={() => {
                setMode("login")
                setError("")
                setSuccess("")
                setAuthCode("")
              }}
              className="w-full text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Back to log in
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
