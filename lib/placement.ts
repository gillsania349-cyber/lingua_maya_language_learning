export type PlacementLanguage = "english" | "spanish"

export type PlacementQuestion = {
  prompt: string
  options: string[]
  /** Index of the correct option */
  correct: number
  topic: PlacementTopic
}

export type PlacementTopic =
  | "present"
  | "questions"
  | "quantifiers"
  | "perfectTenses"
  | "pastTenses"
  | "conditionals"
  | "verbPatterns"
  | "passive"
  | "inversion"
  | "vocabulary"
  | "collocations"
  | "serEstar"
  | "subjunctive"
  | "relatives"
  | "idioms"

export type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2"

/** Minimum score needed for each level, highest first. */
const levelBands: { min: number; level: LevelCode }[] = [
  { min: 14, level: "C2" },
  { min: 12, level: "C1" },
  { min: 9, level: "B2" },
  { min: 6, level: "B1" },
  { min: 4, level: "A2" },
  { min: 0, level: "A1" },
]

export function levelForScore(score: number): LevelCode {
  return levelBands.find((band) => score >= band.min)!.level
}

/** Students at these levels are asked what they want to improve. */
export const advancedLevels: LevelCode[] = ["B2", "C1", "C2"]

export const placementQuizzes: Record<PlacementLanguage, PlacementQuestion[]> = {
  english: [
    {
      prompt: "She _____ from Brazil.",
      options: ["are", "is", "am", "be"],
      correct: 1,
      topic: "present",
    },
    {
      prompt: "How often _____ to the gym?",
      options: ["you go", "do you go", "are you go", "you going"],
      correct: 1,
      topic: "questions",
    },
    {
      prompt: "There isn't _____ milk in the fridge.",
      options: ["some", "many", "any", "a"],
      correct: 2,
      topic: "quantifiers",
    },
    {
      prompt: "We _____ in Guatemala since 2020.",
      options: ["live", "lived", "have lived", "are living"],
      correct: 2,
      topic: "perfectTenses",
    },
    {
      prompt: "If it rains tomorrow, we _____ at home.",
      options: ["stay", "stayed", "will stay", "would stay"],
      correct: 2,
      topic: "conditionals",
    },
    {
      prompt: "I look forward to _____ from you.",
      options: ["hear", "hearing", "heard", "be heard"],
      correct: 1,
      topic: "verbPatterns",
    },
    {
      prompt: "Although _____ exhausted, she finished the project.",
      options: ["being", "was", "be", "been"],
      correct: 0,
      topic: "verbPatterns",
    },
    {
      prompt: "The final report _____ by the end of the week.",
      options: [
        "must submit",
        "must be submitted",
        "must have submitting",
        "must submitted",
      ],
      correct: 1,
      topic: "passive",
    },
    {
      prompt: "Had I known about the traffic, I _____ earlier.",
      options: ["would leave", "will leave", "would have left", "had left"],
      correct: 2,
      topic: "conditionals",
    },
    {
      prompt: "Hardly _____ the meeting when the fire alarm went off.",
      options: ["we had started", "had we started", "we started", "did we started"],
      correct: 1,
      topic: "inversion",
    },
    {
      prompt: "Her explanation was so _____ that everyone understood the problem immediately.",
      options: ["ambiguous", "coherent", "reluctant", "superficial"],
      correct: 1,
      topic: "vocabulary",
    },
    {
      prompt: "The new policy is unlikely to _____ a significant impact on employee satisfaction.",
      options: ["make", "do", "take", "give"],
      correct: 0,
      topic: "collocations",
    },
    {
      prompt: "Notwithstanding the initial setbacks, the team managed to _____ its objectives.",
      options: ["attain", "attend", "obtain to", "achieve to"],
      correct: 0,
      topic: "vocabulary",
    },
    {
      prompt: "Were it not for her support, the project _____ abandoned.",
      options: ["would have been", "will be", "would be having", "had been"],
      correct: 0,
      topic: "conditionals",
    },
    {
      prompt:
        "Choose the sentence with the closest meaning to: 'He is reluctant to disclose the information.'",
      options: [
        "He is eager to share the information.",
        "He is unwilling to reveal the information.",
        "He has already revealed the information.",
        "He has forgotten the information.",
      ],
      correct: 1,
      topic: "vocabulary",
    },
  ],
  spanish: [
    {
      prompt: "Yo _____ estudiante.",
      options: ["Soy", "Estoy", "Tengo", "Hago"],
      correct: 0,
      topic: "serEstar",
    },
    {
      prompt: "María _____ al supermercado todos los sábados.",
      options: ["Voy", "Va", "Vas", "Van"],
      correct: 1,
      topic: "present",
    },
    {
      prompt: "Ayer nosotros _____ una película muy interesante.",
      options: ["Vemos", "Veremos", "Vimos", "Veíamos"],
      correct: 2,
      topic: "pastTenses",
    },
    {
      prompt: "¿Cuál oración utiliza correctamente ser y estar?",
      options: [
        "Mi hermano es cansado hoy.",
        "Mi hermano está médico.",
        "Mi hermano es de México.",
        "Mi hermano está inteligente.",
      ],
      correct: 2,
      topic: "serEstar",
    },
    {
      prompt: "No tengo _____ tiempo para terminar el proyecto.",
      options: ["Muy", "Mucho", "Muchos", "Mucha"],
      correct: 1,
      topic: "quantifiers",
    },
    {
      prompt: "Cuando era niño, _____ al parque todos los domingos.",
      options: ["Iba", "Fui", "Iré", "Vaya"],
      correct: 0,
      topic: "pastTenses",
    },
    {
      prompt: "Si mañana hace buen tiempo, _____ a la playa.",
      options: ["Iríamos", "Fuimos", "Iremos", "Vayamos"],
      correct: 2,
      topic: "conditionals",
    },
    {
      prompt: "Espero que tú _____ venir a la reunión.",
      options: ["Puedes", "Podrás", "Podías", "Puedas"],
      correct: 3,
      topic: "subjunctive",
    },
    {
      prompt: "De haber sabido la verdad, te _____ ayudado.",
      options: ["Habría", "Había", "Habré", "Haya"],
      correct: 0,
      topic: "conditionals",
    },
    {
      prompt: "Elige la oración que utiliza correctamente el pronombre relativo.",
      options: [
        "La persona quien llamó es mi profesora.",
        "La persona cuyo llamó es mi profesora.",
        "La persona que llamó es mi profesora.",
        "La persona cual llamó es mi profesora.",
      ],
      correct: 2,
      topic: "relatives",
    },
    {
      prompt:
        "La decisión fue tomada de manera _____, sin considerar las posibles consecuencias.",
      options: ["Precipitada", "Mesurada", "Conciliadora", "Meticulosa"],
      correct: 0,
      topic: "vocabulary",
    },
    {
      prompt:
        "De no haber recibido las advertencias, probablemente _____ una decisión distinta.",
      options: ["Habría tomado", "Había tomado", "Tomaría", "Tomará"],
      correct: 0,
      topic: "conditionals",
    },
    {
      prompt: "¿Qué significa la expresión «estar entre la espada y la pared»?",
      options: [
        "Estar en una situación difícil sin una salida fácil.",
        "Estar en un lugar muy estrecho.",
        "Estar preparado para defenderse.",
        "Estar confundido por una noticia.",
      ],
      correct: 0,
      topic: "idioms",
    },
    {
      prompt: "No es que no _____ ayudarte; simplemente no tengo tiempo.",
      options: ["Quiero", "Quiera", "Querré", "Quiso"],
      correct: 1,
      topic: "subjunctive",
    },
    {
      prompt: "Aunque no _____ de acuerdo, tendrá que respetar la decisión.",
      options: ["Está", "Estará", "Esté", "Estuvo"],
      correct: 2,
      topic: "subjunctive",
    },
  ],
}
