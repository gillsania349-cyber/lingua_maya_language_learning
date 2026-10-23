'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, FileText, Layers, Headphones } from 'lucide-react'
import { SectionHeading } from '@/components/languages'
import { useI18n } from '@/components/i18n-provider'

const materials = [
  { id: 'mayaWorkbook', slug: 'maya-workbook', icon: BookOpen },
  { id: 'chapinPhrasebook', slug: 'chapin-phrasebook', icon: FileText },
  { id: 'flashcards', slug: 'flashcards', icon: Layers },
  { id: 'englishPack', slug: 'english-pack', icon: Headphones },
] as const

export function Materials() {
  const { t } = useI18n()
  const copy = t.materials

  return (
    <section id="materials" aria-labelledby="materials-title" className="scroll-mt-8">
      <SectionHeading
        eyebrow={copy.eyebrow}
        id="materials-title"
        title={copy.title}
        description={copy.description}
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="overflow-hidden rounded-3xl bg-secondary">
          <Image
            src="/images/materials.png"
            alt={copy.imageAlt}
            width={1024}
            height={1024}
            className="aspect-square size-full object-cover lg:aspect-auto"
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {materials.map(({ id, slug, icon: Icon }) => {
            const item = copy.items[id]
            return (
              <li key={id}>
                <Link
                  href={`/materials/${slug}`}
                  className="flex h-full flex-col rounded-3xl bg-muted p-6 transition hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/30"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-background text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.format}</p>
                  <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm font-semibold">
                    {copy.order}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
