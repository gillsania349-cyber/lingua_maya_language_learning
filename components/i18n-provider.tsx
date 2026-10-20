'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LOCALE_STORAGE_KEY, isLocale, matchLocale, type Locale } from '@/lib/i18n/config'
import { dictionaries, type Dictionary } from '@/lib/i18n/dictionaries'

type I18nContextValue = {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readSavedLocale(): Locale | null {
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    return isLocale(saved) ? saved : null
  } catch {
    return null
  }
}

function saveLocale(locale: Locale) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // Storage can be unavailable (private mode, blocked iframe storage); the cookie still works.
  }
  document.cookie = `${LOCALE_STORAGE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`
}

function detectBrowserLocale(): Locale {
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language]
  return matchLocale(tags)
}

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  // A saved manual choice always wins; browser detection only applies when nothing was chosen.
  useEffect(() => {
    const resolved = readSavedLocale() ?? detectBrowserLocale()
    setLocaleState(resolved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = dictionaries[locale].meta.title
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    saveLocale(next)
  }, [])

  const value = useMemo(() => ({ locale, t: dictionaries[locale], setLocale }), [locale, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
