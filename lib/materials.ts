export const materialSlugs = [
  'maya-workbook',
  'chapin-phrasebook',
  'flashcards',
  'speaking-club',
] as const

export type MaterialSlug = (typeof materialSlugs)[number]

export const materialIdBySlug = {
  'maya-workbook': 'mayaWorkbook',
  'chapin-phrasebook': 'chapinPhrasebook',
  flashcards: 'flashcards',
  'speaking-club': 'englishPack',
} as const

export type MaterialId = (typeof materialIdBySlug)[MaterialSlug]

export function isMaterialSlug(value: string): value is MaterialSlug {
  return (materialSlugs as readonly string[]).includes(value)
}

/** Materials only premium members can open. */
export const premiumMaterials: readonly MaterialId[] = ['englishPack']

export function isPremiumMaterial(id: MaterialId) {
  return premiumMaterials.includes(id)
}
