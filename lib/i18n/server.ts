import { cookies, headers } from 'next/headers'
import { LOCALE_STORAGE_KEY, isLocale, matchLocale, type Locale } from './config'

/**
 * Best server-side guess so the first paint is already in the right language:
 * a saved preference cookie wins, otherwise the Accept-Language header.
 * The client then confirms against localStorage and navigator.languages.
 */
export async function getServerLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_STORAGE_KEY)?.value
  if (isLocale(saved)) return saved

  const acceptLanguage = (await headers()).get('accept-language') ?? ''
  const tags = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0])
    .filter(Boolean)
  return matchLocale(tags)
}
