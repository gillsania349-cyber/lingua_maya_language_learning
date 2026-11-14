export const ADMIN_EMAIL = 'admin@linguamaya.com'
export const ADMIN_PASSWORD = 'admin123'

const ADMIN_SESSION_KEY = 'lingua-maya-admin'
const ADMIN_PASSWORD_KEY = 'lingua-maya-admin-password'
const ADMIN_KEY_STORAGE = 'lingua-maya-admin-key'
const BOOKINGS_KEY = 'lingua-maya-bookings'

/** The password the admin logged in with (this tab only), for server checks. */
export function getAdminKey() {
  try {
    return window.sessionStorage.getItem(ADMIN_KEY_STORAGE) || ''
  } catch {
    return ''
  }
}
const MESSAGES_KEY = 'lingua-maya-messages'

export function getAdminPassword() {
  try {
    return window.localStorage.getItem(ADMIN_PASSWORD_KEY) || ADMIN_PASSWORD
  } catch {
    return ADMIN_PASSWORD
  }
}

export function setAdminPassword(password: string) {
  if (password.length < 6) return false
  window.localStorage.setItem(ADMIN_PASSWORD_KEY, password)
  return true
}

export type AdminBooking = {
  id: string
  createdAt: string
  name: string
  email: string
  language: string
  lesson: string
  format: string
  time: string
  notes: string
  status: 'new' | 'confirmed' | 'done'
}

export type AdminMessage = {
  id: string
  createdAt: string
  name: string
  email: string
  phone: string
  interest: string
  message: string
  status: 'new' | 'read'
}

export function isAdminLoggedIn() {
  try {
    return window.localStorage.getItem(ADMIN_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function adminLogin(email: string, password: string) {
  const ok =
    email.trim().toLowerCase() === ADMIN_EMAIL &&
    password === getAdminPassword()
  if (ok) {
    window.localStorage.setItem(ADMIN_SESSION_KEY, '1')
    // Kept for this tab only; the server checks it before admin-only actions.
    try {
      window.sessionStorage.setItem(ADMIN_KEY_STORAGE, password)
    } catch {
      // ignore
    }
  }
  return ok
}

export function adminLogout() {
  window.localStorage.removeItem(ADMIN_SESSION_KEY)
}

function readList<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeList<T>(key: string, items: T[]) {
  window.localStorage.setItem(key, JSON.stringify(items))
}

export function listBookings(): AdminBooking[] {
  return readList<AdminBooking>(BOOKINGS_KEY).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
}

export function listBookingsByEmail(email: string): AdminBooking[] {
  const normalized = email.trim().toLowerCase()
  return listBookings().filter((b) => b.email.trim().toLowerCase() === normalized)
}

export function saveBooking(
  input: Omit<AdminBooking, 'id' | 'createdAt' | 'status'>,
) {
  const booking: AdminBooking = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  }
  writeList(BOOKINGS_KEY, [booking, ...listBookings()])
  return booking
}

export function updateBookingStatus(id: string, status: AdminBooking['status']) {
  writeList(
    BOOKINGS_KEY,
    listBookings().map((b) => (b.id === id ? { ...b, status } : b)),
  )
}

export function deleteBooking(id: string) {
  writeList(
    BOOKINGS_KEY,
    listBookings().filter((b) => b.id !== id),
  )
}

export function listMessages(): AdminMessage[] {
  return readList<AdminMessage>(MESSAGES_KEY).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
}

export function saveMessage(
  input: Omit<AdminMessage, 'id' | 'createdAt' | 'status'>,
) {
  const message: AdminMessage = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  }
  writeList(MESSAGES_KEY, [message, ...listMessages()])
  return message
}

export function updateMessageStatus(id: string, status: AdminMessage['status']) {
  writeList(
    MESSAGES_KEY,
    listMessages().map((m) => (m.id === id ? { ...m, status } : m)),
  )
}

export function deleteMessage(id: string) {
  writeList(
    MESSAGES_KEY,
    listMessages().filter((m) => m.id !== id),
  )
}
