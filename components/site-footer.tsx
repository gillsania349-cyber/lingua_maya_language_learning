'use client'

import { Mail } from 'lucide-react'
import { BrandIcon } from '@/components/brand-icon'
import { useI18n } from '@/components/i18n-provider'
import { site, whatsappLink } from '@/lib/site'

const footerLinks = [
  { key: 'home', href: '/' },
  { key: 'languages', href: '/#languages' },
  { key: 'book', href: '/#book' },
  { key: 'materials', href: '/#materials' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const

export function SiteFooter() {
  const { t } = useI18n()
  const f = t.footer

  return (
    <footer className="border-t pt-10 text-sm">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <a href="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              LM
            </span>
            {site.name}
          </a>
          <p className="mt-4 max-w-xs text-pretty leading-relaxed text-muted-foreground">{f.tagline}</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground">{f.explore}</h3>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {f.links[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground">{f.contactTitle}</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4 text-primary" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(t.header.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <BrandIcon name="whatsapp" className="size-4" />
                WhatsApp
              </a>
            </li>
            <li className="pt-1 text-muted-foreground">{f.location}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground">{f.follow}</h3>
          <p className="mt-4 text-muted-foreground">{f.followText}</p>
          <ul className="mt-4 flex flex-wrap items-center gap-2">
            {site.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid size-10 place-items-center rounded-full bg-muted text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <BrandIcon name={s.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-muted-foreground md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {site.name} · {f.madeBy} {site.teacher}
        </p>
        <p>{f.rights}</p>
      </div>
    </footer>
  )
}

export function WhatsAppFloat() {
  const { t } = useI18n()

  return (
    <a
      href={whatsappLink(t.header.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.footer.whatsappFloatLabel}
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-foreground shadow-lg shadow-foreground/20 transition-transform hover:scale-105"
    >
      <BrandIcon name="whatsapp" className="size-7" />
    </a>
  )
}
