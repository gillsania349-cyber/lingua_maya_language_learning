"use client"

import { useEffect, useState, type FormEvent } from "react"
import { KeyRound, Loader2, X } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { PasswordInput } from "@/components/password-input"
import { useRouter } from "next/navigation"
import { adminLogin } from "@/lib/admin"
import {
  cancelPendingAuth,
  completeLogin,
  findUserByEmail,
  resetUserPassword,
  type PublicUser,
} from "@/lib/auth"

const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-input bg-muted px-4 text-sm outline-none transition focus:border-primary focus:bg-background focus:ring-3 focus:ring-primary/25"

type AuthResult =
  | { ok: true; user: PublicUser }
  | { ok: false; error: string; message?: string }

type AuthMode = "login" | "signup" | "otp" | "forgot" | "reset-otp" | "reset"

type Props = {
  open: boolean
  initialMode?: "login" | "signup"
  onClose: () => void
  onSuccess: (user: PublicUser) => void
  verifyLogin: (
    input: { email: string; password: string },
  ) => Promise<AuthResult>
  signup: (input: {
    name: string
    email: string
    password: string
  }) => Promise<AuthResult>
}

async function requestOtp(input: {
  email: string
  name?: string
  purpose: "signup" | "login" | "reset"
}) {
  const res = await fetch("/api/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  const data = (await res.json()) as {
    ok: boolean
    challenge?: string
    message?: string
    error?: string
  }
  return { status: res.status, ...data }
}

async function confirmOtp(input: {
  email: string
  code: string
  challenge: string
}) {
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  const data = (await res.json()) as { ok: boolean; error?: string }
  return { status: res.status, ...data }
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
  const router = useRouter()
  const a = t.auth
  const [mode, setMode] = useState<AuthMode>(
    initialMode === "login" ? "login" : "signup",
  )
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [pendingUser, setPendingUser] = useState<PublicUser | null>(null)
  const [resetEmail, setResetEmail] = useState("")
  const [challenge, setChallenge] = useState("")
  const [otpEmail, setOtpEmail] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!open) return
    setMode(initialMode)
    setError("")
    setSuccess("")
    setPendingUser(null)
    setResetEmail("")
    setChallenge("")
    setOtpEmail("")
    setBusy(false)
  }, [open, initialMode])

  if (!open) return null

  async function startOtp(
    user: PublicUser,
    purpose: "signup" | "login",
  ) {
    setBusy(true)
    setError("")
    setSuccess("")
    try {
      const result = await requestOtp({
        email: user.email,
        name: user.name,
        purpose,
      })
      if (!result.ok || !result.challenge) {
        setError(result.message || a.errors.emailSend)
        return
      }
      setChallenge(result.challenge)
      setOtpEmail(user.email)
      setPendingUser(user)
      setMode("otp")
    } catch {
      setError(a.errors.emailSend)
    } finally {
      setBusy(false)
    }
  }

  async function startResetOtp(email: string) {
    setBusy(true)
    setError("")
    setSuccess("")
    try {
      const result = await requestOtp({ email, purpose: "reset" })
      if (!result.ok || !result.challenge) {
        setError(result.message || a.errors.emailSend)
        return
      }
      setChallenge(result.challenge)
      setOtpEmail(email)
      setResetEmail(email)
      setMode("reset-otp")
    } catch {
      setError(a.errors.emailSend)
    } finally {
      setBusy(false)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setSuccess("")
    const data = new FormData(e.currentTarget)

    if (mode === "otp") {
      const code = String(data.get("code") || "").trim()
      if (!pendingUser || !challenge) {
        setError(a.errors.code)
        return
      }
      setBusy(true)
      try {
        const result = await confirmOtp({
          email: pendingUser.email,
          code,
          challenge,
        })
        if (!result.ok) {
          setError(
            result.error === "expired" ? a.errors.codeExpired : a.errors.code,
          )
          return
        }
        await completeLogin(pendingUser)
        onSuccess(pendingUser)
      } catch {
        setError(a.errors.code)
      } finally {
        setBusy(false)
      }
      return
    }

    if (mode === "forgot") {
      const email = String(data.get("email") || "")
      const result = await findUserByEmail(email)
      if (!result.ok) {
        setError(a.errors.notfound)
        return
      }
      await startResetOtp(result.user.email)
      return
    }

    if (mode === "reset-otp") {
      const code = String(data.get("code") || "").trim()
      if (!challenge || !otpEmail) {
        setError(a.errors.code)
        return
      }
      setBusy(true)
      try {
        const result = await confirmOtp({
          email: otpEmail,
          code,
          challenge,
        })
        if (!result.ok) {
          setError(
            result.error === "expired" ? a.errors.codeExpired : a.errors.code,
          )
          return
        }
        setMode("reset")
        setError("")
      } catch {
        setError(a.errors.code)
      } finally {
        setBusy(false)
      }
      return
    }

    if (mode === "reset") {
      const password = String(data.get("password") || "")
      const confirm = String(data.get("confirmPassword") || "")
      if (password.length < 6) {
        setError(a.errors.invalid)
        return
      }
      if (password !== confirm) {
        setError(a.errors.mismatch)
        return
      }
      const result = await resetUserPassword({
        email: resetEmail,
        password,
      })
      if (!result.ok) {
        setError(
          result.error === "notfound" ? a.errors.notfound : a.errors.invalid,
        )
        return
      }
      setMode("login")
      setSuccess(a.resetSuccess)
      setChallenge("")
      setResetEmail("")
      return
    }

    const email = String(data.get("email") || "")
    const password = String(data.get("password") || "")

    if (mode === "signup") {
      const name = String(data.get("name") || "")
      setBusy(true)
      try {
        const result = await signup({ name, email, password })
        if (!result.ok) {
          setError(
            result.error === "exists"
              ? a.errors.exists
              : result.message || a.errors.invalid,
          )
          return
        }
        await startOtp(result.user, "signup")
      } finally {
        setBusy(false)
      }
      return
    }

    if (adminLogin(email, password)) {
      onClose()
      router.push("/admin")
      return
    }

    setBusy(true)
    try {
      const result = await verifyLogin({ email, password })
      if (!result.ok) {
        setError(a.errors.credentials)
        return
      }
      await startOtp(result.user, "login")
    } finally {
      setBusy(false)
    }
  }

  const title =
    mode === "otp" || mode === "reset-otp"
      ? a.codeTitle
      : mode === "forgot"
        ? a.forgotTitle
        : mode === "reset"
          ? a.resetTitle
          : mode === "signup"
            ? a.signupTitle
            : a.loginTitle

  const showTabs = mode === "login" || mode === "signup"

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label={a.close}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={() => {
          void cancelPendingAuth()
          onClose()
        }}
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
            onClick={() => {
              void cancelPendingAuth()
              onClose()
            }}
            className="grid size-9 place-items-center rounded-full hover:bg-muted"
            aria-label={a.close}
          >
            <X className="size-5" />
          </button>
        </div>

        {showTabs && (
          <div className="px-6 pt-5">
            <div className="grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("signup")
                  setError("")
                  setSuccess("")
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
                  setSuccess("")
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
          {mode === "otp" || mode === "reset-otp" ? (
            <>
              <div className="flex items-start gap-3 rounded-2xl bg-primary/10 p-4 text-sm text-primary">
                <KeyRound className="mt-0.5 size-5 shrink-0" />
                <div>
                  <p className="font-semibold">{a.codeSent}</p>
                  <p className="mt-1 opacity-90">
                    {a.codeHint}{" "}
                    <span className="font-medium">{otpEmail}</span>
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
          ) : mode === "forgot" ? (
            <>
              <p className="text-sm text-muted-foreground">
                {a.forgotDescription}
              </p>
              <label className="block text-sm font-medium">
                {a.email}
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  defaultValue={resetEmail}
                  placeholder={a.emailPlaceholder}
                  className={fieldClass}
                />
              </label>
            </>
          ) : mode === "reset" ? (
            <>
              <p className="text-sm text-muted-foreground">
                {a.resetDescription}
              </p>
              <label className="block text-sm font-medium">
                {a.password}
                <PasswordInput
                  name="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder={a.passwordPlaceholder}
                  inputClassName={fieldClass}
                />
              </label>
              <label className="block text-sm font-medium">
                {a.confirmPassword}
                <PasswordInput
                  name="confirmPassword"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  placeholder={a.confirmPasswordPlaceholder}
                  inputClassName={fieldClass}
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
                <PasswordInput
                  name="password"
                  required
                  minLength={6}
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                  placeholder={a.passwordPlaceholder}
                  inputClassName={fieldClass}
                />
              </label>

              {mode === "login" && (
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
                    {a.forgotPassword}
                  </button>
                </div>
              )}
            </>
          )}

          {error ? (
            <p className="text-sm font-medium text-destructive">{error}</p>
          ) : null}
          {success ? (
            <p className="text-sm font-medium text-primary">{success}</p>
          ) : null}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            {mode === "otp"
              ? a.codeSubmit
              : mode === "reset-otp"
                ? a.codeSubmit
                : mode === "forgot"
                  ? a.forgotSubmit
                  : mode === "reset"
                    ? a.resetSubmit
                    : mode === "signup"
                      ? a.signupSubmit
                      : a.loginSubmit}
          </button>

          {(mode === "forgot" || mode === "reset" || mode === "reset-otp") && (
            <button
              type="button"
              onClick={() => {
                setMode("login")
                setError("")
                setSuccess("")
                setChallenge("")
              }}
              className="w-full text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {a.backToLogin}
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
