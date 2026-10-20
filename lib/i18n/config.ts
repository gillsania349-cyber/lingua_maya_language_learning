export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const LOCALE_STORAGE_KEY = 'lm-locale'

/** Add an entry here (plus a dictionary file) to support another language. */
export const localeMeta: Record<Locale, { label: string; short: string; flag: string }> = {
  en: { label: 'English', short: 'EN', flag: '🇺🇸' },
  es: { label: 'Español', short: 'ES', flag: '🇪🇸' },
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Returns the first supported locale from a list of BCP 47 tags (e.g. "es-GT"), else the default. */
export function matchLocale(tags: readonly string[]): Locale {
  for (const tag of tags) {
    const base = tag.trim().toLowerCase().split('-')[0]
    if (isLocale(base)) return base
  }
  return defaultLocale
}
