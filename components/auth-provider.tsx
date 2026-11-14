"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import {
  getSessionUser,
  getUserPlan,
  logoutUser,
  signupUser,
  verifyLoginCredentials,
  type Plan,
  type PublicUser,
} from "@/lib/auth"
import { AuthModal } from "@/components/auth-modal"
import { BookingModal } from "@/components/booking-modal"

type AuthMode = "login" | "signup"

type AuthContextValue = {
  user: PublicUser | null
  /** null while loading or when logged out */
  plan: Plan | null
  ready: boolean
  openBookFlow: () => void
  openLogin: () => void
  openSignup: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<PublicUser | null>(null)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("signup")
  const [continueBooking, setContinueBooking] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const [plan, setPlan] = useState<Plan | null>(null)

  useEffect(() => {
    if (!user) {
      setPlan(null)
      return
    }
    let cancelled = false
    void getUserPlan(user.id).then((p) => {
      if (!cancelled) setPlan(p)
    })
    return () => {
      cancelled = true
    }
  }, [user])

  useEffect(() => {
    setUser(getSessionUser())
    setReady(true)
  }, [])

  const openAuth = useCallback((mode: AuthMode, bookAfter: boolean) => {
    setAuthMode(mode)
    setContinueBooking(bookAfter)
    setAuthOpen(true)
  }, [])

  const openBookFlow = useCallback(() => {
    const session = getSessionUser()
    if (session) {
      setUser(session)
      setBookingOpen(true)
      return
    }
    openAuth("signup", true)
  }, [openAuth])

  const openLogin = useCallback(() => openAuth("login", false), [openAuth])
  const openSignup = useCallback(() => openAuth("signup", false), [openAuth])

  const logout = useCallback(() => {
    void logoutUser()
    setUser(null)
  }, [])

  const handleAuthSuccess = useCallback(
    (next: PublicUser) => {
      setUser(next)
      setAuthOpen(false)
      if (continueBooking) {
        setBookingOpen(true)
      } else {
        router.push("/profile")
      }
    },
    [continueBooking, router],
  )

  const value = useMemo(
    () => ({ user, plan, ready, openBookFlow, openLogin, openSignup, logout }),
    [user, plan, ready, openBookFlow, openLogin, openSignup, logout],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
      {ready && (
        <>
          <AuthModal
            open={authOpen}
            initialMode={authMode}
            onClose={() => setAuthOpen(false)}
            onSuccess={handleAuthSuccess}
            verifyLogin={verifyLoginCredentials}
            signup={signupUser}
          />
          <BookingModal
            open={bookingOpen}
            onClose={() => setBookingOpen(false)}
            user={user}
          />
        </>
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export function BookLessonButton({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { openBookFlow } = useAuth()
  return (
    <button type="button" onClick={openBookFlow} className={className}>
      {children}
    </button>
  )
}
