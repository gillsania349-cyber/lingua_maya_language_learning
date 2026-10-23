export const materialSlugs = [
  'maya-workbook',
  'chapin-phrasebook',
  'flashcards',
  'english-pack',
] as const

export type MaterialSlug = (typeof materialSlugs)[number]

export const materialIdBySlug = {
  'maya-workbook': 'mayaWorkbook',
  'chapin-phrasebook': 'chapinPhrasebook',
  flashcards: 'flashcards',
  'english-pack': 'englishPack',
} as const

export type MaterialId = (typeof materialIdBySlug)[MaterialSlug]

export function isMaterialSlug(value: string): value is MaterialSlug {
  return (materialSlugs as readonly string[]).includes(value)
}
