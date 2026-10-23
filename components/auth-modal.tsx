"use client"

import { useEffect, useState, type FormEvent } from "react"
import { KeyRound, X } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import {
  completeLogin,
  generateAuthCode,
  type PublicUser,
} from "@/lib/auth"

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-input bg-muted px-4 text-sm outline-none transition focus:border-primary focus:bg-background focus:ring-3 focus:ring-primary/25"

type AuthResult =
  | { ok: true; user: PublicUser }
  | { ok: false; error: string }

type Props = {
  open: boolean
  initialMode?: "login" | "signup"
  onClose: () => void
  onSuccess: (user: PublicUser) => void
  verifyLogin: (input: { email: string; password: string }) => AuthResult
  signup: (input: {
    name: string
    email: string
    password: string
  }) => AuthResult
}

export function AuthModal({
  open,
  initialMode = "signup",
  onClose,
  onSuccess,
  verifyLogin,
  signup,
}: Props) {
  const { t } = useI18n()
  const a = t.auth
  const [mode, setMode] = useState<"login" | "signup" | "otp">(
    initialMode === "login" ? "login" : "signup",
  )
  const [error, setError] = useState("")
  const [pendingUser, setPendingUser] = useState<PublicUser | null>(null)
  const [authCode, setAuthCode] = useState("")

  useEffect(() => {
    if (!open) return
    setMode(initialMode)
    setError("")
    setPendingUser(null)
    setAuthCode("")
  }, [open, initialMode])

  if (!open) return null

  function startOtp(user: PublicUser) {
    const code = generateAuthCode()
    setAuthCode(code)
    setPendingUser(user)
    setMode("otp")
    setError("")
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    const data = new FormData(e.currentTarget)

    if (mode === "otp") {
      const code = String(data.get("code") || "").trim()
      if (!pendingUser || code !== authCode) {
        setError(a.errors.code)
        return
      }
      completeLogin(pendingUser)
      onSuccess(pendingUser)
      return
    }

    const email = String(data.get("email") || "")
    const password = String(data.get("password") || "")

    if (mode === "signup") {
      const name = String(data.get("name") || "")
      const result = signup({ name, email, password })
      if (!result.ok) {
        setError(
          result.error === "exists" ? a.errors.exists : a.errors.invalid,
        )
        return
      }
      startOtp(result.user)
      return
    }

    const result = verifyLogin({ email, password })
    if (!result.ok) {
      setError(a.errors.credentials)
      return
    }
    startOtp(result.user)
  }

  const title =
    mode === "otp"
      ? a.codeTitle
      : mode === "signup"
        ? a.signupTitle
        : a.loginTitle

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={a.close}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {a.eyebrow}
            </p>
            <h2 id="auth-title" className="mt-1 text-xl font-semibold">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full hover:bg-muted"
            aria-label={a.close}
          >
            <X className="size-5" />
          </button>
        </div>

        {mode !== "otp" && (
          <div className="px-6 pt-5">
            <div className="grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("signup")
                  setError("")
                }}
                className={`rounded-full py-2 text-sm font-semibold transition ${
                  mode === "signup"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {a.signupTab}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("login")
                  setError("")
                }}
                className={`rounded-full py-2 text-sm font-semibold transition ${
                  mode === "login"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {a.loginTab}
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
          {mode === "otp" ? (
            <>
              <div className="flex items-start gap-3 rounded-2xl bg-primary/10 p-4 text-sm text-primary">
                <KeyRound className="mt-0.5 size-5 shrink-0" />
                <div>
                  <p className="font-semibold">{a.codeSent}</p>
                  <p className="mt-1 opacity-90">
                    {a.codeHint}{" "}
                    <span className="font-mono text-base font-bold tracking-[0.2em]">
                      {authCode}
                    </span>
                  </p>
                </div>
              </div>
              <label className="block text-sm font-medium">
                {a.codeLabel}
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
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{a.description}</p>

              {mode === "signup" && (
                <label className="block text-sm font-medium">
                  {a.name}
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={a.namePlaceholder}
                    className={fieldClass}
                  />
                </label>
              )}

              <label className="block text-sm font-medium">
                {a.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={a.emailPlaceholder}
                  className={fieldClass}
                />
              </label>

              <label className="block text-sm font-medium">
                {a.password}
                <input
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  placeholder={a.passwordPlaceholder}
                  className={fieldClass}
                />
              </label>
            </>
          )}

          {error ? (
            <p className="text-sm font-medium text-destructive">{error}</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition hover:opacity-90"
          >
            {mode === "otp"
              ? a.codeSubmit
              : mode === "signup"
                ? a.signupSubmit
                : a.loginSubmit}
          </button>
        </form>
      </div>
    </div>
  )
}
