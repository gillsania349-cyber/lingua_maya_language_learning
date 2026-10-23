'use client'

import { Mail, MapPin } from 'lucide-react'
import { BrandIcon } from '@/components/brand-icon'
import { useAuth } from '@/components/auth-provider'
import { useI18n } from '@/components/i18n-provider'
import { site, whatsappLink } from '@/lib/site'

const footerLinks = [
  { key: 'home', href: '/' },
  { key: 'languages', href: '/#languages' },
  { key: 'book', href: 'book' },
  { key: 'practice', href: '/#practice' },
  { key: 'materials', href: '/#materials' },
  { key: 'about', href: '/about' },
  { key: 'contact', href: '/contact' },
] as const

export function SiteFooter() {
  const { t } = useI18n()
  const { openBookFlow } = useAuth()
  const f = t.footer

  return (
    <footer className="mt-4 text-sm">
      {/* CTA band */}
      <div className="mb-8 overflow-hidden rounded-[1.75rem] bg-primary px-6 py-8 text-primary-foreground md:px-10 md:py-9">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              {f.ctaTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed opacity-90 md:text-base">
              {f.ctaText}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openBookFlow}
              className="rounded-full bg-background px-6 py-3 font-semibold text-foreground transition hover:opacity-90"
            >
              {f.ctaBook}
            </button>
            <a
              href="/contact"
              className="rounded-full border border-primary-foreground/40 px-6 py-3 font-semibold transition hover:bg-primary-foreground/10"
            >
              {f.ctaContact}
            </a>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="grid gap-8 rounded-[1.75rem] border border-border bg-muted/40 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm shadow-primary/30">
              LM
            </span>
            {site.name}
          </a>
          <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
            {f.tagline}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5 text-primary" aria-hidden="true" />
            {f.location}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
            {f.explore}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.map((item) => (
              <li key={item.key}>
                {item.key === 'book' ? (
                  <button
                    type="button"
                    onClick={openBookFlow}
                    className="font-medium text-foreground/80 transition-colors hover:text-primary"
                  >
                    {f.links[item.key]}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="font-medium text-foreground/80 transition-colors hover:text-primary"
                  >
                    {f.links[item.key]}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
            {f.contactTitle}
          </h3>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 flex items-center gap-3 rounded-2xl bg-background p-4 transition hover:shadow-sm"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">{t.contact.email}</span>
              <span className="font-semibold text-foreground">{site.email}</span>
            </span>
          </a>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-primary">
            {f.follow}
          </h3>
          <p className="mt-4 text-muted-foreground">{f.followText}</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {site.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid size-11 place-items-center rounded-2xl bg-background text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  <BrandIcon name={s.icon} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-2 px-1 text-muted-foreground md:flex-row md:items-center">
        <p>
          © {new Date().getFullYear()} {site.name} · {f.madeBy}{' '}
          <span className="font-medium text-foreground">{site.teacher}</span>
        </p>
        <p className="text-xs md:text-sm">{f.rights}</p>
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
