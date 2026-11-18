import type { Metadata, Viewport } from 'next'
import { Urbanist } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'
import { I18nProvider } from '@/components/i18n-provider'
import { dictionaries } from '@/lib/i18n/dictionaries'
import { getServerLocale } from '@/lib/i18n/server'
import './globals.css'

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
})

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = dictionaries[await getServerLocale()]
  return {
    title: meta.title,
    description: meta.description,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/parrot-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/parrot-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: '/parrot-apple.png',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#6d3ef0',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getServerLocale()

  return (
    <html lang={locale} className={urbanist.variable}>
      <body className="antialiased">
        <I18nProvider initialLocale={locale}>
          <AuthProvider>{children}</AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
