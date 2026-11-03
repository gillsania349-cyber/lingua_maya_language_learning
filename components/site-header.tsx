"use client";

import Link from "next/link";
import { UserRound } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useI18n } from "@/components/i18n-provider";
import { site } from "@/lib/site";

const navItems = [
  { key: "languages", href: "/#languages" },
  { key: "learn", href: "/#learn" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const { t } = useI18n();
  const { user, openLogin } = useAuth();
  const initial = user?.name?.trim().charAt(0).toUpperCase() || "";

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
            <li key={item.key}>
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
        {user ? (
          <Link
            href="/profile"
            aria-label={t.auth.profile.eyebrow}
            className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {initial || <UserRound className="size-5" aria-hidden="true" />}
          </Link>
        ) : (
          <button
            type="button"
            onClick={openLogin}
            aria-label={t.auth.accountButton}
            className="grid size-10 place-items-center rounded-full border border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <UserRound className="size-5" aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  );
}
