'use client'

import { locales, localeMeta } from '@/lib/i18n/config'
import { useI18n } from '@/components/i18n-provider'

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.header.languageSwitcherLabel}
      className="flex items-center rounded-full bg-muted p-1"
    >
      {locales.map((code) => {
        const meta = localeMeta[code]
        const active = code === locale
        return (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              active ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span aria-hidden="true">{meta.flag}</span>
            <span className="hidden lg:inline">{meta.label}</span>
            <span className="lg:hidden" aria-hidden="true">
              {meta.short}
            </span>
            <span className="sr-only lg:hidden">{meta.label}</span>
          </button>
        )
      })}
    </div>
  )
}
