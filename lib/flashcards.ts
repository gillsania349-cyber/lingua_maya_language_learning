import type { MaterialId } from "@/lib/materials"

export type AlphabetCard = {
  letter: string
  word: string
  /** translation shown next to the word */
  meaning: string
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
  meaning: string,
  color: string,
  folder = "alphabet",
): AlphabetCard => ({
  letter,
  word,
  meaning,
  color,
  image: `/cards/${folder}/${file}.jpg`,
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

const eng = (letter: string, word: string, es: string, color: string) =>
  alpha(letter, letter.charAt(1), word, es, color, "english")

// English alphabet; the translation is Spanish. Words are as printed on the cards.
export const englishAlphabetCards: AlphabetCard[] = [
  eng("Aa", "apple", "manzana", "#e91c24"),
  eng("Bb", "bear", "oso", "#b97047"),
  eng("Cc", "cat", "gato", "#fdb874"),
  eng("Dd", "dinosaur", "dinosaurio", "#68d3e1"),
  eng("Ee", "elefante", "elefante", "#f8aed1"),
  eng("Ff", "fish", "pez", "#0640e8"),
  eng("Gg", "grapes", "uvas", "#7c4b97"),
  eng("Hh", "honeydew", "melón", "#b8c78b"),
  eng("Ii", "ice cream", "helado", "#d5a25b"),
  eng("Jj", "juice", "jugo", "#dc3530"),
  eng("Kk", "kite", "barrilete", "#b0c843"),
  eng("Ll", "lion", "león", "#f6ac0d"),
  eng("Mm", "meerkat", "suricata", "#f2c393"),
  eng("Nn", "nest", "nido", "#d1ad7f"),
  eng("Oo", "otter", "nutria", "#d8b07c"),
  eng("Pp", "pato", "lápiz", "#f72c82"),
  eng("Qq", "quil", "pluma", "#f2dfc6"),
  eng("Rr", "rainbow", "arcoíris", "#5c7db5"),
  eng("Ss", "strawberry", "fresa", "#c62416"),
  eng("Tt", "turtle", "tortuga", "#7f853b"),
  eng("Uu", "umbrella", "paraguas", "#b591c3"),
  eng("Vv", "vehicle", "vehículo", "#5bc0bc"),
  eng("Ww", "watermelon", "sandía", "#64992f"),
  eng("Xx", "xylophone", "xilófono", "#7079c7"),
  eng("Yy", "yegua", "yoyo", "#33a10a"),
  eng("Zz", "zebra", "cebra", "#2b2b2b"),
]

const tz = (letter: string, n: number, word: string, es: string, color: string) =>
  alpha(letter, String(n).padStart(2, "0"), word, es, color, "tzutujil")

// Tz'utujil alphabet; the translation is Spanish. Words are as printed on the cards.
export const tzutujilAlphabetCards: AlphabetCard[] = [
  tz("a", 1, "ajq", "cerdo", "#f5a5a1"),
  tz("aa", 2, "aak'", "gallo", "#c43618"),
  tz("b'", 3, "b'ajlam", "jaguar", "#e79920"),
  tz("ch", 4, "cho'm", "camarón", "#f03b1d"),
  tz("ch'", 5, "ch'iiw", "pollito", "#f0be37"),
  tz("e", 6, "ejq'aal", "canguro", "#c88152"),
  tz("ee", 7, "keej", "caballo", "#beb5a8"),
  tz("i", 8, "ixputzin", "rana", "#99ab38"),
  tz("ii", 9, "kaqiix", "guacamaya", "#4066a6"),
  tz("j", 10, "juutz'uuy", "tucán", "#eb4e12"),
  tz("k", 11, "kaab'", "abeja", "#bdd9d9"),
  tz("k'", 12, "k'ooy", "mono", "#f6b633"),
  tz("l", 13, "le'm", "mariquita", "#e10d04"),
  tz("m", 14, "mama'", "gallo", "#44616a"),
  tz("o", 15, "oxox", "oso", "#95663a"),
  tz("oo", 16, "ch'ooy", "ratón", "#d57b73"),
  tz("p", 17, "paar", "zorrillo", "#6d6e73"),
  tz("q", 18, "quluq", "chompipe", "#d43a4a"),
  tz("q'", 19, "q'osq'ol", "ganso", "#c9b48f"),
  tz("r", 20, "rutz'i' ya'", "nutria", "#8f603f"),
  tz("s", 21, "sanik", "hormiga", "#731b0f"),
  tz("t", 22, "top", "cangrejo", "#e32408"),
  tz("t'", 23, "t'oot'", "caracol", "#8f8b6a"),
  tz("tz", 24, "tukur", "tecolote", "#9e6a4a"),
  tz("tz'", 25, "tz'unun", "colibrí", "#426e8a"),
  tz("u", 26, "utiiw", "zorro", "#f2a348"),
  tz("uu", 27, "wuuch'", "tacuazín", "#735c61"),
  tz("w", 28, "waan", "escarabajo", "#1c611a"),
  tz("x", 29, "xaar", "clarinero", "#342950"),
  tz("y", 30, "yak'aqan", "cigüeña", "#c64a33"),
]

export type DeckId = "alphabet" | "englishAlphabet" | "tzutujilAlphabet" | "body" | "glyphs"

/** Which sample decks appear on each material's detail page. */
export const decksByMaterial: Record<MaterialId, DeckId[]> = {
  mayaWorkbook: ["body"],
  chapinPhrasebook: ["alphabet", "englishAlphabet", "tzutujilAlphabet"],
  flashcards: ["glyphs", "alphabet", "body"],
  englishPack: [],
}
