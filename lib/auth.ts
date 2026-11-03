export type AuthUser = {
  id: string
  name: string
  email: string
  password: string
}

export type PublicUser = Omit<AuthUser, 'password'>

const USERS_KEY = 'lingua-maya-users'
const SESSION_KEY = 'lingua-maya-session'

function readUsers(): AuthUser[] {
  try {
    const raw = window.localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeUsers(users: AuthUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function listUsers(): PublicUser[] {
  return readUsers().map(({ id, name, email }) => ({ id, name, email }))
}

export function deleteUserById(id: string) {
  writeUsers(readUsers().filter((u) => u.id !== id))
  const session = getSessionUser()
  if (session?.id === id) clearSession()
}

export function getSessionUser(): PublicUser | null {
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PublicUser
  } catch {
    return null
  }
}

export function setSessionUser(user: PublicUser) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY)
}

export function signupUser(input: {
  name: string
  email: string
  password: string
}): { ok: true; user: PublicUser } | { ok: false; error: string } {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (!name || !email || password.length < 6) {
    return { ok: false, error: 'invalid' }
  }

  const users = readUsers()
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'exists' }
  }

  const user: AuthUser = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
  }
  writeUsers([...users, user])
  // Session is set only after OTP verification via completeLogin()
  return {
    ok: true,
    user: { id: user.id, name: user.name, email: user.email },
  }
}

export function verifyLoginCredentials(input: {
  email: string
  password: string
}): { ok: true; user: PublicUser } | { ok: false; error: string } {
  const email = input.email.trim().toLowerCase()
  const users = readUsers()
  const found = users.find((u) => u.email === email && u.password === input.password)
  if (!found) return { ok: false, error: 'credentials' }
  return {
    ok: true,
    user: { id: found.id, name: found.name, email: found.email },
  }
}

export function loginUser(input: {
  email: string
  password: string
}): { ok: true; user: PublicUser } | { ok: false; error: string } {
  const result = verifyLoginCredentials(input)
  if (!result.ok) return result
  setSessionUser(result.user)
  return result
}

export function generateAuthCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function completeLogin(user: PublicUser) {
  setSessionUser(user)
}

export function findUserByEmail(
  email: string,
): { ok: true; user: PublicUser } | { ok: false; error: string } {
  const normalized = email.trim().toLowerCase()
  const found = readUsers().find((u) => u.email === normalized)
  if (!found) return { ok: false, error: 'notfound' }
  return {
    ok: true,
    user: { id: found.id, name: found.name, email: found.email },
  }
}

export function resetUserPassword(input: {
  email: string
  password: string
}): { ok: true } | { ok: false; error: string } {
  const email = input.email.trim().toLowerCase()
  const password = input.password
  if (!email || password.length < 6) return { ok: false, error: 'invalid' }

  const users = readUsers()
  const index = users.findIndex((u) => u.email === email)
  if (index < 0) return { ok: false, error: 'notfound' }

  users[index] = { ...users[index], password }
  writeUsers(users)
  return { ok: true }
}
