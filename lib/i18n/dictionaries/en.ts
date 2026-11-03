export const en = {
  meta: {
    title: "Lingua Maya — Maya, English & Guatemalan Spanish lessons",
    description:
      "Learn Maya, English, or Guatemalan Spanish with Martha A. Zelada. Book lessons, order learning materials, and get in touch on WhatsApp.",
  },
  header: {
    nav: {
      languages: "Languages",
      book: "Book",
      learn: "Learn",
      practice: "Practice",
      materials: "Materials",
      about: "About",
      contact: "Contact us",
    },
    mainNavLabel: "Main",
    whatsappMessage:
      "Hi Martha! I would like more information about Lingua Maya.",
    languageSwitcherLabel: "Website language",
  },
  hero: {
    badge: "Lessons by Martha A. Zelada",
    titleBefore: "Speak ",
    titleHighlight: "Maya",
    titleAfter: ", English & Guatemalan Spanish",
    description:
      "Friendly one-on-one and group lessons, plus learning materials made with care in Guatemala. Book in minutes, learn at your own pace.",
    ctaBook: "Book a free trial",
    ctaMaterials: "Order materials",
  },
  showcase: {
    languages: {
      maya: {
        label: "Maya",
        initial: "M",
        levels: ["Foundations", "Conversation"],
        alt: "Martha A. Zelada introducing her Maya lessons at her desk",
      },
      english: {
        label: "English",
        initial: "E",
        levels: ["Beginner", "Intermediate", "Advanced"],
        alt: "Martha A. Zelada introducing her English lessons next to a whiteboard",
      },
      spanish: {
        label: "Spanish",
        initial: "S",
        levels: ["Beginner", "Intermediate", "Advanced"],
        alt: "Martha A. Zelada introducing her Spanish lessons in a Guatemalan courtyard",
      },
    },
    show: (language: string) => `Show ${language}`,
    countTitle: "3 languages",
    countSubtitle: "one teacher",
    levelsTitle: (language: string) => `${language} levels`,
    formatBadge: "Online & in person",
    introSoon: (language: string) => `${language} intro video soon`,
    tablistLabel: "Choose a language",
    tagline:
      "Learn the language of your roots, your travels, or your next job — with lessons shaped around you.",
    availability: "Availability",
    thisWeek: "This week",
    daysOpen: "5 days",
    open: "open",
    weeklyAvailability: "Weekly availability",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dayOpen: " open",
    dayClosed: " closed",
    bookAppointment: "Book an appointment",
    opensNewTab: "(opens in a new tab)",
  },
  languages: {
    eyebrow: "What I teach",
    title: "Three languages, one warm classroom",
    description:
      "Start with a free trial in the language you want — then continue on WhatsApp for paid lessons.",
    aside: "Free trial first. Deeper plans on WhatsApp.",
    items: [
      {
        name: "Maya language",
        tag: "Heritage",
        text: "Connect with Guatemala’s living Maya heritage. Pronunciation, everyday conversation, and the cultural meaning behind the words.",
        cta: "Free trial · Maya",
      },
      {
        name: "English",
        tag: "Career & travel",
        text: "Practical English for work, study, and travel — conversation practice, grammar that sticks, and interview preparation.",
        cta: "Free trial · English",
      },
      {
        name: "Guatemalan Spanish",
        tag: "Local voice",
        text: "Real Spanish as it’s spoken in Guatemala: chapín expressions, local vocabulary, and confidence for daily life.",
        cta: "Free trial · Spanish",
      },
    ],
  },
  auth: {
    eyebrow: "Account",
    signupTitle: "Create your account",
    loginTitle: "Welcome back",
    description: "Sign up or log in to book your lesson.",
    signupTab: "Sign up",
    loginTab: "Log in",
    accountButton: "Login / Sign up",
    profile: {
      eyebrow: "My profile",
      nameLabel: "Name",
      emailLabel: "Email",
      hint: "This is your Lingua Maya account. You can book a free trial anytime from here.",
      guestTitle: "You’re not signed in",
      guestText: "Log in or create an account to see your profile.",
      lessonsTitle: "My trial lessons",
      lessonsEmpty: "No trial lesson booked yet. Book a free trial to see it here.",
      lessonLabel: "Lesson",
      languageLabel: "Language",
      timeLabel: "Date & time",
      formatLabel: "Format",
      notesLabel: "Notes",
      statusLabel: "Status",
      status: {
        new: "Pending confirmation",
        confirmed: "Confirmed",
        done: "Completed",
      },
      bookedOn: "Requested",
    },
    name: "Full name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    password: "Password",
    passwordPlaceholder: "At least 6 characters",
    confirmPassword: "Confirm password",
    confirmPasswordPlaceholder: "Re-enter your password",
    forgotPassword: "Forgot password?",
    forgotTitle: "Reset your password",
    forgotDescription:
      "Enter the email for your account. We’ll show a verification code so you can set a new password.",
    forgotSubmit: "Send reset code",
    resetTitle: "Choose a new password",
    resetDescription: "Enter a new password for your account.",
    resetSubmit: "Update password",
    backToLogin: "Back to log in",
    resetSuccess: "Password updated. You can log in now.",
    signupSubmit: "Continue",
    loginSubmit: "Continue",
    close: "Close",
    loggedInAs: "Booking as",
    bookGateHint: "You’ll sign up or log in first, then fill the booking form.",
    logout: "Log out",
    codeTitle: "Enter verification code",
    codeSent: "Verification code required",
    codeHint: "Enter the 6-digit code. Demo code:",
    codeLabel: "Authentication code",
    codeSubmit: "Verify & continue",
    errors: {
      invalid: "Please fill all fields (password min. 6 characters).",
      exists: "An account with this email already exists. Try logging in.",
      credentials: "Incorrect email or password.",
      code: "Incorrect code. Please try again.",
      notfound: "No account found with that email.",
      mismatch: "Passwords do not match.",
    },
  },
  booking: {
    eyebrow: "Free trial lesson",
    title: "Book your free trial",
    description:
      "On the website you can only book a free trial lesson. After that, paid lessons and all other details are arranged on WhatsApp.",
    steps: [
      "Sign up or log in",
      "Choose your language and preferred time",
      "Connect on WhatsApp for everything after the free trial",
    ],
    onlineBadge: "Online session",
    freeBadge: "Free",
    lessonTypeLegend: "What you can book",
    trialOnlyHint:
      "Private and group lessons are not booked on the site — message on WhatsApp after your free trial.",
    lessonTypes: {
      trial: { name: "Free trial lesson", detail: "30 min · meet & plan · free" },
      private: { name: "Private lesson", detail: "50 min · one-on-one" },
      group: { name: "Small group", detail: "50 min · up to 5 people" },
    },
    nameLabel: "Your name",
    languageLabel: "Language",
    languageOptions: {
      maya: "Maya",
      english: "English",
      spanish: "Guatemalan Spanish",
    },
    formatLabel: "Format",
    formatOptions: { online: "Online", inPerson: "In person" },
    timeLabel: "Preferred date & time",
    timePlaceholder: "",
    picker: {
      title: "Pick a slot",
      placeholder: "Choose date & time",
      time: "Time",
      hour: "Hour",
      minute: "Min",
      today: "Today",
      clear: "Clear",
      done: "Done",
      prevMonth: "Previous month",
      nextMonth: "Next month",
    },
    notesLabel: "Anything I should know?",
    optional: "(optional)",
    notesPlaceholder: "Your level, goals, time zone…",
    submit: "Book free trial",
    success: {
      eyebrow: "Trial booked",
      title: "Connect with us on WhatsApp",
      bookedAt: "Your free trial lesson is booked for {time}.",
      body: "Please connect on WhatsApp to confirm details. Paid lessons, schedules, and everything else after the free trial are handled on WhatsApp.",
      whatsapp: "Connect on WhatsApp",
      close: "Close",
    },
    message: {
      intro: "Hi Martha! I would like to book a free trial lesson.",
      name: "Name",
      language: "Language",
      lesson: "Lesson",
      format: "Format",
      time: "Preferred time",
      flexible: "Flexible",
      notes: "Notes",
    },
  },
  learn: {
    eyebrow: "Practice & materials",
    title: "Learn between lessons",
    description:
      "Quizzes, tasks, assignments, and learning materials in one place — practice what you study, then order resources when you need them.",
  },
  practice: {
    eyebrow: "Practice hub",
    title: "Quizzes, tasks & assignments",
    description:
      "Practice between lessons with short quizzes, weekly tasks, and guided assignments made for Maya, English, and Guatemalan Spanish learners.",
    back: "Back to learn",
    taskLabel: "Task",
    assignmentLabel: "Assignment",
    items: {
      quizzes: {
        tag: "Check yourself",
        title: "Quizzes",
        text: "Quick questions to review vocabulary, phrases, and culture after each lesson.",
        cta: "Take a quiz",
      },
      tasks: {
        tag: "Daily practice",
        title: "Tasks",
        text: "Small speaking and writing tasks you can finish in 10–15 minutes at home.",
        cta: "See tasks",
      },
      assignments: {
        tag: "Go deeper",
        title: "Assignments",
        text: "Longer practice for conversation, listening, and cultural understanding.",
        cta: "Open assignments",
      },
    },
    pages: {
      quizzes: {
        title: "Language quizzes",
        intro:
          "Try this sample quiz. In class, Martha can assign new quizzes for Maya, English, or Spanish based on your level.",
        items: [],
        note: "Tip: retake the quiz after your next lesson to see how much you improved.",
      },
      tasks: {
        title: "Weekly practice tasks",
        intro:
          "These short tasks help you use the language every day — even when you only have a few minutes.",
        items: [
          {
            title: "Record a 60-second greeting",
            text: "Say hello, introduce yourself, and share one thing you like — in Maya, English, or Spanish.",
            meta: "Speaking · 10 min",
          },
          {
            title: "Write 5 new words",
            text: "Pick five words from your last lesson. Write each one in a short sentence.",
            meta: "Writing · 15 min",
          },
          {
            title: "Listen and shadow",
            text: "Play a short audio or class recording twice, then repeat out loud with the same rhythm.",
            meta: "Listening · 10 min",
          },
          {
            title: "Culture note",
            text: "Write 3 sentences about a Guatemalan tradition, food, or place you want to talk about in class.",
            meta: "Culture · 15 min",
          },
        ],
        note: "Bring your completed task notes to your next lesson so Martha can give feedback.",
      },
      assignments: {
        title: "Guided assignments",
        intro:
          "Assignments are a little longer. Use them to prepare for conversation practice and real-life situations.",
        items: [
          {
            title: "Market conversation role-play",
            text: "Prepare a short dialogue: greeting, asking prices, buying two items, and saying thank you.",
            meta: "Due: this week",
          },
          {
            title: "Family tree vocabulary",
            text: "Draw or list your family members and label each person with the target language words.",
            meta: "Due: next lesson",
          },
          {
            title: "Listening summary",
            text: "Listen to a short clip twice, then write 5 bullet points about what you understood.",
            meta: "Due: weekend",
          },
          {
            title: "Mini presentation",
            text: "Prepare a 1–2 minute talk about your hometown, favorite food, or a travel dream.",
            meta: "Due: next class",
          },
        ],
        note: "Need a custom assignment for your level? Message Martha from Contact us.",
      },
    },
    quiz: {
      title: "Sample learner quiz",
      subtitle: "Answer all questions, then check your score.",
      submit: "Check answers",
      retry: "Try again",
      result: (score: number, total: number) =>
        `You scored ${score}/${total}. ${
          score === total
            ? "Perfect — great work!"
            : score >= total / 2
              ? "Nice progress — keep practicing."
              : "Keep going — review and try once more."
        }`,
      questions: [
        {
          prompt: "Which language is Maya?",
          options: [
            "An Indigenous language of Guatemala and Mexico",
            "Only a writing system",
            "A type of food",
            "A Spanish dialect from Spain",
          ],
          correct: 0,
        },
        {
          prompt: "What does “chapín” refer to in Guatemalan Spanish?",
          options: [
            "A formal grammar rule",
            "Local Guatemalan identity and expressions",
            "A Maya alphabet letter",
            "An English accent",
          ],
          correct: 1,
        },
        {
          prompt: "A good daily language task is:",
          options: [
            "Waiting until the next class only",
            "Practicing a short speaking or writing activity",
            "Memorizing 200 words in one night",
            "Skipping review completely",
          ],
          correct: 1,
        },
      ],
    },
  },
  materials: {
    eyebrow: "Learning materials",
    title: "Materials to keep learning between lessons",
    description:
      "Workbooks, phrasebooks, and flashcards I create for my students. Open each card to see what’s inside, then order by email.",
    imageAlt:
      "Workbooks, flashcards and a Guatemalan woven textile laid out on a table",
    items: {
      mayaWorkbook: { name: "Maya starter workbook", format: "Printed or PDF" },
      chapinPhrasebook: { name: "Chapín Spanish phrasebook", format: "PDF" },
      flashcards: { name: "Vocabulary flashcard sets", format: "Printed" },
      englishPack: { name: "English conversation pack", format: "PDF + audio" },
    },
    order: "View details",
    orderMessage: (name: string, format: string) =>
      `Hi Martha! I'd like to order: ${name} (${format}).`,
    back: "Back to learn",
    includes: "What’s inside",
    idealFor: "Ideal for",
    howItWorks: "How ordering works",
    orderCta: "Order by email",
    details: {
      mayaWorkbook: {
        intro:
          "A gentle first workbook for learners starting Maya — clear lessons, practice pages, and cultural notes you can use between classes.",
        includes: [
          "Alphabet and sound practice",
          "Everyday greetings and introductions",
          "Family, food, and nature vocabulary",
          "Short reading and writing exercises",
          "Answer key for self-study",
        ],
        idealFor: [
          "Absolute beginners",
          "Students who want structure between lessons",
          "Families learning Maya together",
        ],
        steps: [
          "Email me which format you prefer (printed or PDF)",
          "I send payment and delivery details",
          "You receive your workbook and start practicing",
        ],
      },
      chapinPhrasebook: {
        intro:
          "A practical PDF of Guatemalan Spanish — chapín expressions, local vocabulary, and phrases people really use in daily life.",
        includes: [
          "Common chapín greetings and slang",
          "Market, travel, and home phrases",
          "Polite forms for school and work",
          "Mini dialogues with natural responses",
          "Pronunciation tips for learners",
        ],
        idealFor: [
          "Travelers visiting Guatemala",
          "Learners who already know some Spanish",
          "Anyone who wants to sound more local",
        ],
        steps: [
          "Email me to request the Chapín phrasebook",
          "I send the PDF payment link",
          "Download and practice the phrases right away",
        ],
      },
      flashcards: {
        intro:
          "Printed vocabulary flashcard sets to build memory with short, daily practice — perfect for kids and adults.",
        includes: [
          "Themed packs (colors, animals, food, verbs)",
          "Word on one side, meaning on the other",
          "Simple icons for visual learners",
          "Ideas for games and quick drills",
          "Durable printed cards ready to use",
        ],
        idealFor: [
          "Visual and hands-on learners",
          "Classroom or home practice",
          "Short daily study sessions",
        ],
        steps: [
          "Email me which theme pack you want",
          "I confirm stock, price, and shipping",
          "Cards arrive ready for practice games",
        ],
      },
      englishPack: {
        intro:
          "A conversation pack with PDF lessons and audio so you can practice real English speaking and listening at home.",
        includes: [
          "Guided conversation scripts",
          "Listening audio for each unit",
          "Useful phrases for work and travel",
          "Pronunciation notes and shadowing tips",
          "Self-check questions after each lesson",
        ],
        idealFor: [
          "Guatemalan learners building spoken English",
          "Students preparing for interviews or travel",
          "Anyone who wants listening + speaking practice",
        ],
        steps: [
          "Email me to order the English conversation pack",
          "I send payment details and download links",
          "Practice with PDF + audio between lessons",
        ],
      },
    },
  },
  about: {
    eyebrow: "About your teacher",
    title: "Hi, I'm Martha A. Zelada",
    body: "I created Lingua Maya to share the languages of Guatemala with the world — and to help Guatemalans open doors with English. My lessons are patient, practical, and full of culture, so you learn not just how to speak, but how people really talk.",
    stats: [
      { label: "Languages", value: "3" },
      { label: "Levels", value: "A1–C2" },
      { label: "Formats", value: "Online + in person" },
    ],
  },
  contact: {
    eyebrow: "Contact us",
    title: "Questions? Message me anytime",
    description:
      "Fill out the form and your message will open in your email app, ready to send. You can also email me directly or follow along on social media.",
    whatsappTitle: "Chat on WhatsApp",
    whatsappSubtitle: "Usually replies the same day",
    whatsappMessage: "Hi Martha! I have a question about Lingua Maya.",
    email: "Email",
    emailTitle: "Email me",
    socialLabel: "Follow along",
    form: {
      cardEyebrow: "Contact us",
      cardTitle: "Send a message",
      cardDescription:
        "Share a few details and your question. I will reply by email as soon as I can.",
      name: "Name",
      namePlaceholder: "Your full name",
      email: "Email",
      emailPlaceholder: "you@example.com",
      phone: "Phone (optional)",
      phonePlaceholder: "+502 0000 0000",
      interest: "Language",
      interestPlaceholder: "Choose a language",
      interestOptions: ["English", "Spanish"],
      message: "Message",
      messagePlaceholder: "Tell me what you would like to learn or ask…",
      submit: "Send by email",
      hint: "Opens your email app with the message ready to send.",
      success: "Email app opened — send the message to finish.",
      emailIntro: "Hi Martha! New contact form message from the website:",
    },
  },
  footer: {
    madeBy: "Made by",
    whatsappFloatLabel: "Chat with Martha on WhatsApp",
    tagline:
      "Friendly lessons in Maya, English, and Guatemalan Spanish — with materials made with care in Guatemala.",
    explore: "Explore",
    contactTitle: "Contact us",
    follow: "Follow",
    followText: "Tips, culture, and new materials on social media.",
    location: "Guatemala",
    rights: "Learning languages with culture.",
    ctaTitle: "Ready to start learning?",
    ctaText: "Create an account, book a free trial, or write me — I’m here to help.",
    ctaBook: "Book a free trial",
    ctaContact: "Contact us",
    links: {
      home: "Home",
      languages: "Languages",
      book: "Book a free trial",
      learn: "Learn",
      practice: "Practice",
      materials: "Materials",
      about: "About",
      contact: "Contact us",
    },
  },
};

export type Dictionary = typeof en;
