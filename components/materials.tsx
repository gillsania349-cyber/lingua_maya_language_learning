'use client'

import Image from 'next/image'
import { BookOpen, FileText, Layers, Headphones } from 'lucide-react'
import { BrandIcon } from '@/components/brand-icon'
import { SectionHeading } from '@/components/languages'
import { useI18n } from '@/components/i18n-provider'
import { whatsappLink } from '@/lib/site'

const materials = [
  { id: 'mayaWorkbook', icon: BookOpen },
  { id: 'chapinPhrasebook', icon: FileText },
  { id: 'flashcards', icon: Layers },
  { id: 'englishPack', icon: Headphones },
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
          {materials.map(({ id, icon: Icon }) => {
            const item = copy.items[id]
            return (
              <li key={id} className="flex flex-col rounded-3xl bg-muted p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-background text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.format}</p>
                <a
                  href={whatsappLink(copy.orderMessage(item.name, item.format))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-foreground px-4 py-2 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
                >
                  <BrandIcon name="whatsapp" className="size-4" />
                  {copy.order}
                  <span className="sr-only"> {item.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
