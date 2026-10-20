"use client";

import { BrandIcon } from "@/components/brand-icon";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/components/i18n-provider";
import { site, whatsappLink } from "@/lib/site";

const navItems = [
  { key: "languages", href: "/#languages" },
  { key: "book", href: "/#book" },
  { key: "materials", href: "/#materials" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="flex items-center justify-between gap-3">
      <a
        href="/"
        className="flex items-center gap-2 text-xl font-bold tracking-tight"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
          LM
        </span>
        <span className="hidden sm:inline">{site.name}</span>
      </a>

      <nav
        aria-label={t.header.mainNavLabel}
        className="hidden rounded-full bg-muted px-2 py-1.5 md:block"
      >
        <ul className="flex items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-background"
              >
                {t.header.nav[item.key]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <a
          href={whatsappLink(t.header.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background sm:px-5"
        >
          <BrandIcon name="whatsapp" className="size-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
