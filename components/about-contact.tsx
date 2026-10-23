"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { BookLessonButton } from "@/components/auth-provider";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/languages";
import { useI18n } from "@/components/i18n-provider";
import { site } from "@/lib/site";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-8 pt-8 md:pt-12">
      <div className="relative overflow-hidden rounded-[2rem] bg-muted">
        <div className="relative aspect-[16/10] w-full sm:aspect-[21/9] md:aspect-[2.4/1]">
          <Image
            src="/images/about_section.jpg"
            alt={t.about.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent"
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl text-center md:mt-14">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {t.about.eyebrow}
        </p>
        <h1
          id="about-title"
          className="mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl"
        >
          {t.about.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {t.about.body}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BookLessonButton className="rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85">
            {t.hero.ctaBook}
          </BookLessonButton>
          <a
            href="/contact"
            className="rounded-full border border-foreground px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
          >
            {t.header.nav.contact}
          </a>
        </div>
      </div>

      <dl className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-16">
        {t.about.stats.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-3xl px-6 py-8 text-center ${
              i === 0 ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            <dt
              className={`text-sm font-medium ${
                i === 0 ? "opacity-80" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </dt>
            <dd className="mt-2 text-3xl font-semibold tracking-tight">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Contact() {
  const { t } = useI18n();
  const copy = t.contact;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-8"
    >
      <div className="mb-10 max-w-2xl md:mb-12">
        <SectionHeading
          eyebrow={copy.eyebrow}
          id="contact-title"
          title={copy.title}
          description={copy.description}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-10">
        <ContactForm />

        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${site.email}`}
            className="flex items-center justify-between gap-4 rounded-[1.75rem] bg-primary p-6 text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-4">
              <Mail className="size-8" aria-hidden="true" />
              <span>
                <span className="block text-xl font-semibold">{copy.emailTitle}</span>
                <span className="text-sm opacity-85">{site.email}</span>
              </span>
            </span>
            <span aria-hidden="true" className="text-2xl">
              →
            </span>
          </a>
          <div className="rounded-[1.75rem] bg-muted p-5">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              {copy.socialLabel}
            </p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid grid-cols-4 gap-3 ${className}`}>
      {site.socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl bg-muted px-2 py-4 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <BrandIcon name={s.icon} className="size-6" />
            {s.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
