export const practiceSlugs = ['english', 'spanish', 'quizzes', 'tasks', 'assignments'] as const

export type PracticeSlug = (typeof practiceSlugs)[number]

export function isPracticeSlug(value: string): value is PracticeSlug {
  return (practiceSlugs as readonly string[]).includes(value)
}
