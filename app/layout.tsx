import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Urbanist } from 'next/font/google'
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
    generator: 'v0.app',
    icons: {
      icon: [
        {
          url: '/icon-light-32x32.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: '/icon-dark-32x32.png',
          media: '(prefers-color-scheme: dark)',
        },
        {
          url: '/icon.svg',
          type: 'image/svg+xml',
        },
      ],
      apple: '/apple-icon.png',
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
        <I18nProvider initialLocale={locale}>{children}</I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
