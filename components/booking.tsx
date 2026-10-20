'use client'

import { useState } from 'react'
import { Clock, Users, User } from 'lucide-react'
import { BrandIcon } from '@/components/brand-icon'
import { SectionHeading } from '@/components/languages'
import { useI18n } from '@/components/i18n-provider'
import { whatsappLink } from '@/lib/site'

const lessonTypes = [
  { id: 'trial', icon: Clock },
  { id: 'private', icon: User },
  { id: 'group', icon: Users },
] as const

type LessonTypeId = (typeof lessonTypes)[number]['id']

const languageIds = ['maya', 'english', 'spanish'] as const
const formatIds = ['online', 'inPerson'] as const

const fieldClass =
  'w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/25'

export function Booking() {
  const { t } = useI18n()
  const copy = t.booking
  const [lessonType, setLessonType] = useState<LessonTypeId>('trial')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const language = copy.languageOptions[data.get('language') as (typeof languageIds)[number]]
    const format = copy.formatOptions[data.get('format') as (typeof formatIds)[number]]
    const m = copy.message
    const lines = [
      m.intro,
      `${m.name}: ${data.get('name')}`,
      `${m.language}: ${language}`,
      `${m.lesson}: ${copy.lessonTypes[lessonType].name}`,
      `${m.format}: ${format}`,
      `${m.time}: ${data.get('time') || m.flexible}`,
    ]
    const notes = String(data.get('notes') ?? '').trim()
    if (notes) lines.push(`${m.notes}: ${notes}`)
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="book" aria-labelledby="book-title" className="scroll-mt-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow={copy.eyebrow} id="book-title" title={copy.title} description={copy.description} />
          <ol className="mt-8 flex flex-col gap-4">
            {copy.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary font-semibold text-secondary-foreground">
                  {i + 1}
                </span>
                <span className="font-medium">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-secondary p-4 md:p-5">
          <div className="flex flex-col gap-5 rounded-2xl bg-background p-5 md:p-7">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold">{copy.lessonTypeLegend}</legend>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {lessonTypes.map((type) => {
                  const Icon = type.icon
                  const checked = lessonType === type.id
                  return (
                    <label
                      key={type.id}
                      className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition has-focus-visible:ring-3 has-focus-visible:ring-primary/25 ${
                        checked ? 'border-primary bg-primary text-primary-foreground' : 'hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="lessonType"
                        value={type.id}
                        checked={checked}
                        onChange={() => setLessonType(type.id)}
                        className="sr-only"
                      />
                      <Icon className="size-5" aria-hidden="true" />
                      <span className="font-semibold">{copy.lessonTypes[type.id].name}</span>
                      <span className={`text-xs ${checked ? 'opacity-85' : 'text-muted-foreground'}`}>
                        {copy.lessonTypes[type.id].detail}
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  {copy.nameLabel}
                </label>
                <input id="name" name="name" required autoComplete="name" className={fieldClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="language" className="text-sm font-semibold">
                  {copy.languageLabel}
                </label>
                <select id="language" name="language" className={fieldClass} defaultValue="maya">
                  {languageIds.map((id) => (
                    <option key={id} value={id}>
                      {copy.languageOptions[id]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="format" className="text-sm font-semibold">
                  {copy.formatLabel}
                </label>
                <select id="format" name="format" className={fieldClass} defaultValue="online">
                  {formatIds.map((id) => (
                    <option key={id} value={id}>
                      {copy.formatOptions[id]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="time" className="text-sm font-semibold">
                  {copy.timeLabel}
                </label>
                <input id="time" name="time" placeholder={copy.timePlaceholder} className={fieldClass} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="notes" className="text-sm font-semibold">
                {copy.notesLabel} <span className="font-normal text-muted-foreground">{copy.optional}</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder={copy.notesPlaceholder}
                className={fieldClass}
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 font-semibold text-background transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-primary/40 focus-visible:outline-none"
            >
              <BrandIcon name="whatsapp" className="size-5" />
              {copy.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
