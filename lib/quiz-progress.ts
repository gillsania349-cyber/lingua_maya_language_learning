import type { LevelCode, PlacementLanguage, PlacementTopic } from "@/lib/placement"

const PROGRESS_KEY = "lingua-maya-quiz-progress"

export type QuizAttempt = {
  id: string
  email: string
  language: PlacementLanguage
  score: number
  total: number
  level: LevelCode
  /** Topics of the questions answered wrong, one entry per wrong answer */
  missedTopics: PlacementTopic[]
  /** Indexes into the "What would you like to improve?" list */
  goals: number[]
  takenAt: string
}

function readAll(): QuizAttempt[] {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(attempts: QuizAttempt[]) {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(attempts))
  } catch {
    // Storage full or blocked — progress just isn't kept.
  }
}

const normalize = (email: string) => email.trim().toLowerCase()

/** All attempts for this email, oldest first. */
export function listAttempts(email: string): QuizAttempt[] {
  const target = normalize(email)
  return readAll()
    .filter((a) => normalize(a.email) === target)
    .sort((a, b) => a.takenAt.localeCompare(b.takenAt))
}

/** The one attempt this email made at this quiz, if any. */
export function getAttempt(email: string, language: PlacementLanguage): QuizAttempt | null {
  return listAttempts(email).find((a) => a.language === language) ?? null
}

/** Saves the attempt — unless this email already took this quiz (one try each). */
export function saveAttempt(input: Omit<QuizAttempt, "id" | "takenAt" | "goals">) {
  const existing = getAttempt(input.email, input.language)
  if (existing) return existing
  const attempt: QuizAttempt = {
    ...input,
    id: crypto.randomUUID(),
    takenAt: new Date().toISOString(),
    goals: [],
  }
  writeAll([...readAll(), attempt])
  return attempt
}

export function saveAttemptGoals(id: string, goals: number[]) {
  writeAll(readAll().map((a) => (a.id === id ? { ...a, goals } : a)))
}
