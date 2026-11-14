import type { MaterialId } from "@/lib/materials"

export type AlphabetCard = {
  letter: string
  word: string
  en: string
  image: string
  color: string
}

export type BodyCard = {
  word: string
  en: string
  es: string
  image: string
}

const alpha = (
  letter: string,
  file: string,
  word: string,
  en: string,
  color: string,
): AlphabetCard => ({
  letter,
  word,
  en,
  color,
  image: `/cards/alphabet/${file}.jpg`,
})

// Colors match each card's printed border.
export const alphabetCards: AlphabetCard[] = [
  alpha("Aa", "a", "abeja", "bee", "#f5ad0a"),
  alpha("Bb", "b", "ballena", "whale", "#4a87b4"),
  alpha("Cc", "c", "cocodrilo", "crocodile", "#8dc63f"),
  alpha("Dd", "d", "delfín", "dolphin", "#5db8e5"),
  alpha("Ee", "e", "elefante", "elephant", "#a3aec9"),
  alpha("Ff", "f", "foca", "seal", "#2c4a68"),
  alpha("Gg", "g", "gato", "cat", "#f7922f"),
  alpha("Hh", "h", "hormiga", "ant", "#c22f16"),
  alpha("Ii", "i", "iguana", "iguana", "#4aa046"),
  alpha("Jj", "j", "jirafa", "giraffe", "#f6bd5a"),
  alpha("Kk", "k", "koala", "koala", "#a59c94"),
  alpha("Ll", "l", "león", "lion", "#bb5317"),
  alpha("Mm", "m", "mono", "monkey", "#c3742f"),
  alpha("Nn", "n", "nutria", "otter", "#d8b07f"),
  alpha("Ññ", "enye", "ñandu", "rhea", "#d06065"),
  alpha("Oo", "o", "oso", "bear", "#b97047"),
  alpha("Pp", "p", "pato", "duck", "#e0761a"),
  alpha("Qq", "q", "quetzal", "quetzal", "#2a7e4e"),
  alpha("Rr", "r", "ratón", "mouse", "#e9a199"),
  alpha("Ss", "s", "suricata", "meerkat", "#d28847"),
  alpha("Tt", "t", "tortuga", "turtle", "#277439"),
  alpha("Uu", "u", "urraca", "magpie", "#365c86"),
  alpha("Vv", "v", "venado", "deer", "#b95d1f"),
  alpha("Ww", "w", "wómbat", "wombat", "#6f605c"),
  alpha("Xx", "x", "xoloitzcuintle", "Mexican hairless dog", "#30221d"),
  alpha("Yy", "y", "yegua", "mare", "#a65232"),
  alpha("Zz", "z", "zarigüeya", "opossum", "#a14f5d"),
]

const body = (n: number, word: string, en: string, es: string): BodyCard => ({
  word,
  en,
  es,
  image: `/cards/body/${String(n).padStart(2, "0")}.jpg`,
})

export const bodyCards: BodyCard[] = [
  body(1, "Chii'", "mouth", "boca"),
  body(2, "Xikiin", "ear", "oreja"),
  body(3, "Wachaaj", "eyes", "ojos"),
  body(4, "Tza'm", "nose", "nariz"),
  body(5, "Q'ab'aaj", "arm", "brazo"),
  body(6, "Aqanaaj", "foot", "pie"),
  body(7, "Raaq'", "tongue", "lengua"),
  body(8, "Q'a'", "hand", "mano"),
  body(9, "Wi'aaj", "head", "cabeza"),
  body(10, "K'uux", "heart", "corazón"),
  body(11, "B'aaq", "bone", "hueso"),
  body(12, "Eyaaj", "tooth", "diente"),
  body(13, "Smal Wi'aaj", "hair", "cabello"),
  body(14, "Metz'", "eyebrows", "cejas"),
  body(15, "B'aaqiil", "skeleton", "esqueleto"),
  body(16, "Plaaj", "face", "cara"),
  body(17, "Pamaaj", "stomach", "estómago"),
  body(18, "Kik'", "blood", "sangre"),
  body(19, "Ib'och'", "veins", "venas"),
  body(20, "Raa'", "legs", "piernas"),
  body(21, "Xtuxiil", "heel", "talón"),
  body(22, "Ixk'yaaq", "fingernails", "uñas"),
  body(23, "Sasee'", "liver", "hígado"),
  body(24, "Q'uul", "throat", "garganta"),
]

export type GlyphCard = {
  key: string
  name: string
  syllables: string[]
  image: string
  /** true for Martha's name; the rest are Mayan languages */
  isName?: boolean
}

const glyph = (
  key: string,
  name: string,
  syllables: string[],
  isName = false,
): GlyphCard => ({ key, name, syllables, isName, image: `/cards/glyphs/${key}.png` })

export const glyphCards: GlyphCard[] = [
  glyph("tzutujil", "Tz'utujil", ["Tz'u", "tu", "ji(l)"]),
  glyph("kaqchikel", "Kaqchikel", ["ka(q)", "chi", "kel"]),
  glyph("kiche", "K'iche'", ["K'i", "che"]),
  glyph("chorti", "Ch'orti'", ["Ch'or", "tí"]),
  glyph("itza", "Itzá", ["I", "tzá"]),
  glyph("martha", "Martha", ["Ma", "r", "t(ha)"], true),
]

export type DeckId = "alphabet" | "body" | "glyphs"

/** Which sample decks appear on each material's detail page. */
export const decksByMaterial: Record<MaterialId, DeckId[]> = {
  mayaWorkbook: ["body"],
  chapinPhrasebook: ["alphabet"],
  flashcards: ["glyphs", "alphabet", "body"],
  englishPack: [],
}
