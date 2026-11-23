import type { Dictionary } from "./en";

export const es: Dictionary = {
  meta: {
    title: "Lingua Maya — Clases de español guatemalteco, inglés y maya",
    description:
      "Aprende español guatemalteco, inglés o maya con Martha A. Zelada. Reserva clases, pide materiales de aprendizaje y escríbeme por WhatsApp.",
  },
  header: {
    nav: {
      languages: "Idiomas",
      book: "Reservar",
      learn: "Aprender",
      practice: "Práctica",
      materials: "Materiales",
      about: "Sobre mí",
      contact: "Contáctanos",
    },
    mainNavLabel: "Principal",
    whatsappMessage:
      "¡Hola, Martha! Me gustaría recibir más información sobre Lingua Maya.",
    languageSwitcherLabel: "Idioma del sitio",
  },
  hero: {
    badge: "Clases con Martha A. Zelada",
    titleBefore: "Habla ",
    titleHighlight: "español",
    titleAfter: " guatemalteco, inglés y maya",
    description:
      "Clases individuales y en grupo, con materiales hechos con cariño en Guatemala. Reserva en minutos y aprende a tu propio ritmo.",
    ctaBook: "Reservar clase gratis",
    ctaMaterials: "Pedir materiales",
  },
  showcase: {
    languages: {
      maya: {
        label: "Maya",
        initial: "M",
        levels: ["Fundamentos", "Conversación"],
        alt: "Martha A. Zelada presentando sus clases de maya en su escritorio",
      },
      english: {
        label: "Inglés",
        initial: "I",
        levels: ["Principiante", "Intermedio", "Avanzado"],
        alt: "Martha A. Zelada presentando sus clases de inglés junto a una pizarra",
      },
      spanish: {
        label: "Español",
        initial: "E",
        levels: ["Principiante", "Intermedio", "Avanzado"],
        alt: "Martha A. Zelada presentando sus clases de español en un patio guatemalteco",
      },
    },
    show: (language: string) => `Ver ${language}`,
    countTitle: "3 idiomas",
    countSubtitle: "una maestra",
    levelsTitle: (language: string) => `Niveles de ${language.toLowerCase()}`,
    formatBadge: "En línea y presencial",
    introSoon: (language: string) =>
      `Video de ${language.toLowerCase()} muy pronto`,
    tablistLabel: "Elige un idioma",
    tagline:
      "Aprende el idioma de tus raíces, de tus viajes o de tu próximo trabajo — con clases hechas a tu medida.",
    availability: "Disponibilidad",
    thisWeek: "Esta semana",
    daysOpen: "5 días",
    open: "disponibles",
    weeklyAvailability: "Disponibilidad semanal",
    days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    dayOpen: " disponible",
    dayClosed: " cerrado",
    bookAppointment: "Reservar una cita",
    opensNewTab: "(se abre en una pestaña nueva)",
  },
  languages: {
    eyebrow: "Lo que enseño",
    title: "Tres idiomas, un aula cálida",
    description:
      "Empieza con una clase de prueba gratis en el idioma que quieras — después continúa por WhatsApp para las clases de pago.",
    aside: "Primero la clase gratis. Los planes más amplios, por WhatsApp.",
    items: [
      {
        name: "Español guatemalteco",
        tag: "Voz local",
        text: "El español real que se habla en Guatemala: expresiones chapinas, vocabulario local y confianza para el día a día.",
        cta: "Prueba gratis · Español",
      },
      {
        name: "Inglés",
        tag: "Trabajo y viajes",
        text: "Inglés práctico para el trabajo, el estudio y los viajes — práctica de conversación, gramática que se queda y preparación para entrevistas.",
        cta: "Prueba gratis · Inglés",
      },
      {
        name: "Idioma maya",
        tag: "Herencia",
        text: "Conecta con la herencia maya viva de Guatemala. Pronunciación, conversación cotidiana y el significado cultural detrás de las palabras.",
        cta: "Prueba gratis · Maya",
      },
    ],
  },
  auth: {
    eyebrow: "Cuenta",
    signupTitle: "Crea tu cuenta",
    loginTitle: "Bienvenida de nuevo",
    description: "Regístrate o inicia sesión para reservar tu clase.",
    signupTab: "Registrarse",
    loginTab: "Iniciar sesión",
    accountButton: "Entrar / Registrarse",
    profile: {
      eyebrow: "Mi perfil",
      nameLabel: "Nombre",
      emailLabel: "Correo",
      hint: "Esta es tu cuenta de Lingua Maya. Puedes reservar una clase de prueba gratis desde aquí.",
      guestTitle: "No has iniciado sesión",
      guestText: "Inicia sesión o crea una cuenta para ver tu perfil.",
      lessonsTitle: "Mi clase de prueba",
      lessonsEmpty:
        "Aún no tienes una clase de prueba reservada. Reserva una gratis para verla aquí.",
      lessonLabel: "Clase",
      languageLabel: "Idioma",
      timeLabel: "Fecha y hora",
      formatLabel: "Modalidad",
      notesLabel: "Notas",
      statusLabel: "Estado",
      status: {
        new: "Pendiente de confirmación",
        confirmed: "Confirmada",
        done: "Completada",
      },
      bookedOn: "Solicitada",
      quizTitle: "Mis quizzes de nivel",
      quizEmpty: "Aún no has hecho un quiz de nivel. Haz uno para conocer tu nivel y qué practicar.",
      quizTake: { english: "Quiz de nivel de inglés", spanish: "Quiz de nivel de español" },
      quizLanguage: { english: "Inglés", spanish: "Español" },
      quizScore: (score: number, total: number) => `${score}/${total} correctas`,
      quizLast: "Realizado el",
      focusTitle: "Dónde enfocarte",
      focusPerfect: "¡Excelente! Respondiste todas las preguntas correctamente.",
      goalsTitle: "Tus objetivos",
    },
    name: "Nombre completo",
    namePlaceholder: "Tu nombre",
    email: "Correo",
    emailPlaceholder: "tu@correo.com",
    password: "Contraseña",
    passwordPlaceholder: "Mínimo 6 caracteres",
    confirmPassword: "Confirmar contraseña",
    confirmPasswordPlaceholder: "Vuelve a escribir tu contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    forgotTitle: "Restablece tu contraseña",
    forgotDescription:
      "Escribe el correo de tu cuenta. Te enviaremos un código de verificación para crear una nueva contraseña.",
    forgotSubmit: "Enviar código",
    resetTitle: "Elige una nueva contraseña",
    resetDescription: "Escribe una nueva contraseña para tu cuenta.",
    resetSubmit: "Actualizar contraseña",
    backToLogin: "Volver a iniciar sesión",
    resetSuccess: "Contraseña actualizada. Ya puedes iniciar sesión.",
    signupSubmit: "Continuar",
    loginSubmit: "Continuar",
    close: "Cerrar",
    loggedInAs: "Reservando como",
    bookGateHint: "Primero te registras o inicias sesión, luego llenas el formulario.",
    logout: "Cerrar sesión",
    codeTitle: "Ingresa el código de verificación",
    codeSent: "Revisa tu correo",
    codeHint: "Enviamos un código de 6 dígitos a",
    codeLabel: "Código de autenticación",
    codeSubmit: "Verificar y continuar",
    errors: {
      invalid: "Completa todos los campos (contraseña mín. 6 caracteres).",
      exists: "Ya existe una cuenta con este correo. Prueba iniciar sesión.",
      credentials: "Correo o contraseña incorrectos.",
      code: "Código incorrecto. Inténtalo de nuevo.",
      codeExpired: "Ese código expiró. Solicita uno nuevo.",
      emailSend: "No se pudo enviar el correo de verificación. Inténtalo de nuevo.",
      notfound: "No hay una cuenta con ese correo.",
      mismatch: "Las contraseñas no coinciden.",
    },
  },
  booking: {
    eyebrow: "Clase de prueba gratis",
    title: "Reserva tu clase gratis",
    description:
      "En el sitio solo puedes reservar una clase de prueba gratuita. Después, las clases de pago y todos los detalles se arreglan por WhatsApp.",
    steps: [
      "Regístrate o inicia sesión",
      "Elige idioma y horario preferido",
      "Conéctate por WhatsApp para todo lo que sigue después de la clase gratis",
    ],
    onlineBadge: "Sesión en línea",
    freeBadge: "Gratis",
    lessonTypeLegend: "Lo que puedes reservar",
    trialOnlyHint:
      "Las clases privadas y grupales no se reservan en el sitio — escribe por WhatsApp después de tu clase gratis.",
    alreadyBooked: {
      title: "Ya reservaste tu clase de prueba gratis",
      body: "Cada cuenta puede reservar una sola clase de prueba gratis. Para agendar más clases o cambiar tu clase de prueba, escríbele a Martha por WhatsApp.",
      whatsapp: "Escribir a Martha por WhatsApp",
      whatsappMessage: "¡Hola Martha! Ya reservé mi clase de prueba gratis y me gustaría agendar más clases.",
      profile: "Ver mi perfil",
    },
    lessonTypes: {
      trial: {
        name: "Clase de prueba gratis",
        detail: "30 min · conocernos y planear · gratis",
      },
      private: { name: "Clase privada", detail: "50 min · individual" },
      group: { name: "Grupo pequeño", detail: "50 min · hasta 5 personas" },
    },
    nameLabel: "Tu nombre",
    languageLabel: "Idioma",
    languageOptions: {
      maya: "Maya",
      english: "Inglés",
      spanish: "Español guatemalteco",
    },
    formatLabel: "Modalidad",
    formatOptions: { online: "En línea", inPerson: "Presencial" },
    timeLabel: "Fecha y hora preferidas",
    timePlaceholder: "",
    picker: {
      title: "Elige un horario",
      placeholder: "Elige fecha y hora",
      time: "Hora",
      hour: "Hora",
      minute: "Min",
      today: "Hoy",
      clear: "Borrar",
      done: "Listo",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
    },
    notesLabel: "¿Algo que deba saber?",
    optional: "(opcional)",
    notesPlaceholder: "Tu nivel, metas, zona horaria…",
    submit: "Reservar clase gratis",
    success: {
      eyebrow: "Prueba reservada",
      title: "Conéctate con nosotros por WhatsApp",
      bookedAt: "Tu clase de prueba gratis está reservada para {time}.",
      body: "Por favor conéctate por WhatsApp para confirmar los detalles. Las clases de pago, horarios y todo lo demás después de la clase gratis se manejan por WhatsApp.",
      whatsapp: "Conectar por WhatsApp",
      close: "Cerrar",
    },
    message: {
      intro: "¡Hola, Martha! Me gustaría reservar una clase de prueba gratis.",
      name: "Nombre",
      language: "Idioma",
      lesson: "Clase",
      format: "Modalidad",
      time: "Horario preferido",
      flexible: "Flexible",
      notes: "Notas",
    },
  },
  learn: {
    eyebrow: "Práctica y materiales",
    title: "Aprende entre clases",
    description:
      "Quizzes, tareas, asignaciones y materiales de aprendizaje en un solo lugar — practica lo que estudias y pide recursos cuando los necesites.",
  },
  practice: {
    eyebrow: "Prueba de nivel",
    title: "Descubre tu nivel actual",
    description:
      "Haz un quiz corto de nivel en inglés o español para que Martha adapte tus clases al nivel correcto desde el primer día.",
    back: "Volver a aprender",
    taskLabel: "Tarea",
    assignmentLabel: "Trabajo",
    comingSoon:
      "El quiz de nivel se está preparando y pronto estará disponible aquí. Mientras tanto, reserva una clase de prueba gratis y Martha revisará tu nivel contigo.",
    placement: {
      instructions: "Elige la respuesta correcta para cada pregunta. Selecciona solo una opción.",
      progress: (current: number, total: number) => `Pregunta ${current} de ${total}`,
      submit: "Enviar",
      next: "Siguiente pregunta",
      finish: "Ver mi nivel",
      correct: "¡Correcto!",
      wrong: "No exactamente — la respuesta correcta está marcada en verde.",
      resultEyebrow: "Tu resultado",
      score: (score: number, total: number) => `Respondiste ${score} de ${total} correctamente.`,
      levelLabel: "Tu nivel actual",
      bookTrial: "Reservar una clase de prueba gratis",
      savedToProfile: "Tu resultado se guardó en tu perfil.",
      viewProfile: "Ver mi progreso",
      loginRequiredTitle: "Inicia sesión para hacer el quiz",
      loginRequiredText: "Cada estudiante puede hacer este quiz de nivel una sola vez. Inicia sesión o crea una cuenta para guardar tu resultado en tu perfil.",
      loginRequiredCta: "Iniciar sesión / Registrarse",
      alreadyTaken: "Ya hiciste este quiz — cada estudiante puede hacerlo una sola vez. Este es tu resultado.",
      topics: {
        present: "Presente",
        questions: "Preguntas",
        quantifiers: "Cuantificadores (mucho, some, any…)",
        perfectTenses: "Presente perfecto",
        pastTenses: "Tiempos pasados",
        conditionals: "Condicionales",
        verbPatterns: "Patrones verbales (-ing / infinitivo)",
        passive: "Voz pasiva",
        inversion: "Inversión",
        vocabulary: "Vocabulario y significado",
        collocations: "Colocaciones",
        serEstar: "Ser vs. estar",
        subjunctive: "Subjuntivo",
        relatives: "Pronombres relativos",
        idioms: "Expresiones idiomáticas",
      },
      levels: {
        A1: "Principiante",
        A2: "Elemental",
        B1: "Intermedio",
        B2: "Intermedio alto",
        C1: "Avanzado",
        C2: "Competente",
      },
      goalsTitle: "¿Qué te gustaría mejorar?",
      goalsIntro:
        "Elige todas las áreas que quieras trabajar. Usaremos tus respuestas para recomendarte las clases adecuadas.",
      goalsHint: "Selecciona todas las que apliquen",
      goalsSubmit: "Guardar mis respuestas",
      goalsThanks:
        "¡Gracias! Reserva una clase de prueba gratis y Martha planificará tus clases según estos objetivos:",
      goals: {
        english: [
          { title: "Conversación", text: "Habla inglés con más naturalidad y confianza." },
          { title: "Inglés de negocios", text: "Comunícate de forma profesional en el trabajo." },
          { title: "Preparación TOEFL", text: "Prepárate para el examen TOEFL." },
          { title: "Preparación IELTS", text: "Prepárate para el IELTS académico o general." },
          { title: "Exámenes escolares y universitarios", text: "Mejora tus notas y prepárate para exámenes." },
          { title: "Gramática y vocabulario", text: "Construye una base más sólida en inglés." },
          { title: "Comprensión auditiva y pronunciación", text: "Entiende el inglés hablado y mejora tu pronunciación." },
          { title: "Escritura", text: "Escribe mejores correos, ensayos e informes." },
          { title: "Inglés para viajar", text: "Comunícate con comodidad en el extranjero." },
          { title: "Inglés cotidiano", text: "Usa el inglés en la vida diaria y en situaciones sociales." },
        ],
        spanish: [
          { title: "Conversación", text: "Habla español con más naturalidad y confianza." },
          { title: "Español de negocios", text: "Comunícate de forma profesional en el trabajo." },
          { title: "Preparación DELE", text: "Prepárate para el examen DELE." },
          { title: "Preparación SIELE", text: "Prepárate para el certificado SIELE." },
          { title: "Exámenes escolares y universitarios", text: "Mejora tus notas y prepárate para exámenes." },
          { title: "Gramática y vocabulario", text: "Construye una base más sólida en español." },
          { title: "Comprensión auditiva y pronunciación", text: "Entiende el español hablado y mejora tu pronunciación." },
          { title: "Escritura", text: "Escribe mejores correos, ensayos e informes." },
          { title: "Español para viajar", text: "Comunícate con comodidad en el extranjero." },
          { title: "Español cotidiano", text: "Usa el español en la vida diaria y en situaciones sociales." },
        ],
      },
    },
    items: {
      english: {
        tag: "English",
        title: "Quiz de nivel de inglés",
        text: "Responde algunas preguntas de gramática, vocabulario y lectura para conocer tu nivel actual de inglés.",
        cta: "Hacer el quiz de inglés",
      },
      spanish: {
        tag: "Español",
        title: "Quiz de nivel de español",
        text: "Pon a prueba tu español con preguntas de gramática, vocabulario y expresiones guatemaltecas cotidianas.",
        cta: "Hacer el quiz de español",
      },
      quizzes: {
        tag: "Comprueba",
        title: "Cuestionarios",
        text: "Preguntas rápidas para repasar vocabulario, frases y cultura después de cada clase.",
        cta: "Hacer un quiz",
      },
      tasks: {
        tag: "Práctica diaria",
        title: "Tareas",
        text: "Actividades cortas de habla y escritura que puedes terminar en 10–15 minutos.",
        cta: "Ver tareas",
      },
      assignments: {
        tag: "Profundiza",
        title: "Trabajos",
        text: "Práctica más larga de conversación, escucha y comprensión cultural.",
        cta: "Abrir trabajos",
      },
    },
    pages: {
      english: {
        title: "Quiz de nivel de inglés",
        intro:
          "Descubre dónde estás hoy — de principiante a avanzado — para que tus clases empiecen en el nivel correcto.",
        items: [],
        note: "Consejo: responde por tu cuenta y sin diccionario para que el resultado refleje tu nivel real.",
      },
      spanish: {
        title: "Quiz de nivel de español",
        intro:
          "Descubre tu nivel actual de español — de principiante a avanzado — para que tus clases empiecen en el nivel correcto.",
        items: [],
        note: "Consejo: responde por tu cuenta y sin diccionario para que el resultado refleje tu nivel real.",
      },
      quizzes: {
        title: "Cuestionarios de idioma",
        intro:
          "Prueba este quiz de ejemplo. En clase, Martha puede asignar nuevos quizzes de español, inglés o maya según tu nivel.",
        items: [],
        note: "Consejo: vuelve a hacer el quiz después de tu próxima clase para ver tu progreso.",
      },
      tasks: {
        title: "Tareas de práctica semanal",
        intro:
          "Estas tareas cortas te ayudan a usar el idioma cada día — aunque solo tengas unos minutos.",
        items: [
          {
            title: "Graba un saludo de 60 segundos",
            text: "Saluda, preséntate y comparte una cosa que te gusta — en español, inglés o maya.",
            meta: "Habla · 10 min",
          },
          {
            title: "Escribe 5 palabras nuevas",
            text: "Elige cinco palabras de tu última clase. Escribe cada una en una frase corta.",
            meta: "Escritura · 15 min",
          },
          {
            title: "Escucha y repite",
            text: "Reproduce un audio corto dos veces y luego repítelo en voz alta con el mismo ritmo.",
            meta: "Escucha · 10 min",
          },
          {
            title: "Nota cultural",
            text: "Escribe 3 frases sobre una tradición, comida o lugar de Guatemala para hablar en clase.",
            meta: "Cultura · 15 min",
          },
        ],
        note: "Lleva tus notas a la próxima clase para que Martha te dé retroalimentación.",
      },
      assignments: {
        title: "Trabajos guiados",
        intro:
          "Los trabajos son un poco más largos. Úsalos para prepararte para conversación y situaciones reales.",
        items: [
          {
            title: "Diálogo del mercado",
            text: "Prepara un diálogo corto: saludo, preguntar precios, comprar dos cosas y dar las gracias.",
            meta: "Entrega: esta semana",
          },
          {
            title: "Vocabulario del árbol familiar",
            text: "Dibuja o lista a tu familia y etiqueta a cada persona con palabras del idioma.",
            meta: "Entrega: próxima clase",
          },
          {
            title: "Resumen de escucha",
            text: "Escucha un clip corto dos veces y escribe 5 puntos sobre lo que entendiste.",
            meta: "Entrega: fin de semana",
          },
          {
            title: "Mini presentación",
            text: "Prepara una charla de 1–2 minutos sobre tu pueblo, tu comida favorita o un viaje soñado.",
            meta: "Entrega: próxima clase",
          },
        ],
        note: "¿Necesitas un trabajo a tu nivel? Escríbele a Martha desde Contáctanos.",
      },
    },
    quiz: {
      title: "Quiz de ejemplo",
      subtitle: "Responde todas las preguntas y luego revisa tu puntaje.",
      submit: "Revisar respuestas",
      retry: "Intentar de nuevo",
      result: (score: number, total: number) =>
        `Obtuviste ${score}/${total}. ${
          score === total
            ? "¡Perfecto — excelente trabajo!"
            : score >= total / 2
              ? "Buen progreso — sigue practicando."
              : "Sigue adelante — repasa e inténtalo otra vez."
        }`,
      questions: [
        {
          prompt: "¿Qué es el maya?",
          options: [
            "Una lengua indígena de Guatemala y México",
            "Solo un sistema de escritura",
            "Un tipo de comida",
            "Un dialecto del español de España",
          ],
          correct: 0,
        },
        {
          prompt: "¿A qué se refiere “chapín” en el español guatemalteco?",
          options: [
            "Una regla gramatical formal",
            "La identidad y expresiones locales de Guatemala",
            "Una letra del alfabeto maya",
            "Un acento del inglés",
          ],
          correct: 1,
        },
        {
          prompt: "Una buena tarea diaria de idioma es:",
          options: [
            "Esperar solo hasta la próxima clase",
            "Practicar una actividad corta de habla o escritura",
            "Memorizar 200 palabras en una noche",
            "Saltar el repaso por completo",
          ],
          correct: 1,
        },
      ],
    },
  },
  materials: {
    eyebrow: "Materiales de aprendizaje",
    title: "Materiales para seguir aprendiendo entre clases",
    description:
      "Cuadernos, guías de frases y tarjetas que creo para mis estudiantes. Abre cada tarjeta para ver el contenido y pídelos por correo.",
    imageAlt:
      "Cuadernos de trabajo, tarjetas de vocabulario y un tejido guatemalteco sobre una mesa",
    items: {
      mayaWorkbook: {
        name: "Cuaderno de maya para principiantes",
        format: "Impreso o PDF",
      },
      chapinPhrasebook: {
        name: "Cuadernos de trabajo",
        format: "PDF",
      },
      flashcards: {
        name: "Juegos de tarjetas de vocabulario",
        format: "Impreso",
      },
      englishPack: {
        name: "Speaking Club",
        format: "Premium · Conversación en vivo",
      },
    },
    order: "Ver detalles",
    premium: {
      badge: "Premium",
      unlocked: "Desbloqueado",
      lockedTitle: "El Speaking Club es para miembros Premium",
      lockedGuest:
        "Escríbele a Martha para unirte — ella te enviará todo lo que necesitas. ¿Ya eres miembro? Inicia sesión para desbloquearlo.",
      lockedFree:
        "Tienes el plan gratuito. Escríbele a Martha para unirte al Speaking Club — ella te enviará todo lo que necesitas.",
      perks: ["Sesiones en vivo cada semana", "Grupos pequeños", "Retroalimentación de Martha"],
      contactCta: "Contáctanos",
      loginCta: "Iniciar sesión",
      joinCta: "Unirme a la próxima sesión",
    },
    orderMessage: (name: string, format: string) =>
      `¡Hola, Martha! Me gustaría pedir: ${name} (${format}).`,
    back: "Volver a aprender",
    includes: "Qué incluye",
    idealFor: "Ideal para",
    howItWorks: "Cómo pedir",
    orderCta: "Pedir por correo",
    cards: {
      eyebrow: "Tarjetas de muestra",
      title: "Mira lo que incluye",
      decks: {
        tzutujilAlphabet: {
          name: "Abecedario en tz'utujil",
          description:
            "30 tarjetas ilustradas del abecedario tz'utujil — de a (ajq) a y (yak'aqan), con letras como ch', q' y tz'. Toca una tarjeta para verla de cerca.",
        },
        englishAlphabet: {
          name: "Abecedario en inglés",
          description:
            "26 tarjetas ilustradas, de apple a zebra. Toca una tarjeta para verla de cerca.",
        },
        alphabet: {
          name: "Abecedario en español",
          description:
            "27 tarjetas ilustradas, de abeja a zarigüeya — incluida la Ñ. Toca una tarjeta para verla de cerca.",
        },
        body: {
          name: "Partes del cuerpo en maya tz'utujil",
          description:
            "24 tarjetas con imágenes de las partes del cuerpo. Elige un idioma y toca una tarjeta para darle la vuelta y ver los otros dos.",
        },
        glyphs: {
          name: "Glifos mayas",
          description:
            "Nombres de idiomas mayas escritos en jeroglíficos, sílaba por sílaba — y el nombre de Martha. Las letras entre paréntesis no se escriben con un glifo.",
        },
      },
      mayanLanguage: "Idioma maya",
      teacherName: "El nombre de tu maestra",
      tapToFlip: "Toca para girar",
      showWordsIn: "Ver palabras en",
      meaning: "Significado",
      close: "Cerrar",
      previous: "Tarjeta anterior",
      next: "Tarjeta siguiente",
      cardOf: (n: number, total: number) => `Tarjeta ${n} de ${total}`,
    },
    details: {
      mayaWorkbook: {
        intro:
          "Un cuaderno suave para empezar el maya: lecciones claras, páginas de práctica y notas culturales para usar entre clases.",
        includes: [
          "Práctica del alfabeto y los sonidos",
          "Saludos y presentaciones cotidianas",
          "Vocabulario de familia, comida y naturaleza",
          "Ejercicios cortos de lectura y escritura",
          "Clave de respuestas para autoestudio",
        ],
        idealFor: [
          "Principiantes absolutos",
          "Estudiantes que quieren estructura entre clases",
          "Familias que aprenden maya juntas",
        ],
        steps: [
          "Escríbeme qué formato prefieres (impreso o PDF)",
          "Te envío los detalles de pago y entrega",
          "Recibes el cuaderno y empiezas a practicar",
        ],
      },
      chapinPhrasebook: {
        intro:
          "Un PDF práctico de español guatemalteco: expresiones chapinas, vocabulario local y frases de la vida diaria.",
        includes: [
          "Saludos y expresiones chapinas comunes",
          "Frases de mercado, viaje y casa",
          "Formas corteses para escuela y trabajo",
          "Minidiálogos con respuestas naturales",
          "Consejos de pronunciación",
        ],
        idealFor: [
          "Viajeros que visitan Guatemala",
          "Personas que ya saben algo de español",
          "Quienes quieren sonar más locales",
        ],
        steps: [
          "Escríbeme para pedir la guía chapina",
          "Te envío el enlace de pago del PDF",
          "Descarga y practica las frases de inmediato",
        ],
      },
      flashcards: {
        intro:
          "Juegos impresos de tarjetas de vocabulario para memorizar con práctica corta y diaria — ideal para niños y adultos.",
        includes: [
          "Paquetes por temas (colores, animales, comida, verbos)",
          "Palabra de un lado, significado del otro",
          "Íconos simples para aprendizaje visual",
          "Ideas de juegos y ejercicios rápidos",
          "Tarjetas impresas listas para usar",
        ],
        idealFor: [
          "Aprendices visuales y prácticos",
          "Práctica en clase o en casa",
          "Sesiones diarias cortas",
        ],
        steps: [
          "Escríbeme qué paquete temático quieres",
          "Confirmo disponibilidad, precio y envío",
          "Las tarjetas llegan listas para practicar",
        ],
      },
      englishPack: {
        intro:
          "Un club de conversación en vivo y amigable donde practicas hablar con otros estudiantes — guiado por Martha, con temas reales y retroalimentación al momento.",
        includes: [
          "Sesiones semanales de conversación en vivo en línea",
          "Grupos pequeños para que todos hablen",
          "Temas y frases útiles antes de cada sesión",
          "Consejos de pronunciación y retroalimentación personal",
          "Grabaciones y notas de cada sesión para repasar",
        ],
        idealFor: [
          "Quienes quieren hablar con confianza",
          "Estudiantes que se preparan para entrevistas o viajes",
          "Quien busca práctica de conversación constante",
        ],
        steps: [
          "Envía un mensaje para unirte a la próxima sesión",
          "Martha te envía el horario y el enlace de la reunión",
          "Únete en vivo, habla y recibe retroalimentación cada semana",
        ],
      },
    },
  },
  about: {
    eyebrow: "Sobre tu maestra",
    title: "Hola, soy Martha A. Zelada",
    body: "Creé Lingua Maya para compartir los idiomas de Guatemala con el mundo — y para ayudar a los guatemaltecos a abrir puertas con el inglés. Mis clases son pacientes, prácticas y llenas de cultura, para que aprendas no solo a hablar, sino cómo habla realmente la gente.",
    stats: [
      { label: "Idiomas", value: "3" },
      { label: "Niveles", value: "A1–C2" },
      { label: "Modalidades", value: "En línea + presencial" },
    ],
  },
  contact: {
    eyebrow: "Contáctanos",
    title: "¿Preguntas? Escríbeme cuando quieras",
    description:
      "Completa el formulario y tu mensaje se abrirá en tu correo, listo para enviar. También puedes escribirme directamente o seguirme en redes sociales.",
    whatsappTitle: "Escríbeme por WhatsApp",
    whatsappSubtitle: "Normalmente respondo el mismo día",
    whatsappMessage: "¡Hola, Martha! Tengo una pregunta sobre Lingua Maya.",
    email: "Correo",
    emailTitle: "Envíame un correo",
    socialLabel: "Sígueme",
    form: {
      cardEyebrow: "Contáctanos",
      cardTitle: "Envía un mensaje",
      cardDescription:
        "Comparte algunos datos y tu pregunta. Te responderé por correo lo antes posible.",
      name: "Nombre",
      namePlaceholder: "Tu nombre completo",
      email: "Correo",
      emailPlaceholder: "tu@correo.com",
      phone: "Teléfono (opcional)",
      phonePlaceholder: "+502 0000 0000",
      interest: "Idioma",
      interestPlaceholder: "Elige un idioma",
      interestOptions: ["Español", "Inglés"],
      message: "Mensaje",
      messagePlaceholder: "Cuéntame qué quieres aprender o preguntar…",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      hint: "Tu mensaje le llega directo a Martha. Ella te responderá por correo.",
      success: "¡Gracias! Tu mensaje fue enviado — Martha te responderá pronto por correo.",
      error: "Lo sentimos, no se pudo enviar el mensaje. Inténtalo de nuevo o escribe por WhatsApp.",
      popupTitle: "¡Mensaje enviado!",
      popupText:
        "Gracias por escribir. Tu mensaje fue entregado — Martha se pondrá en contacto contigo por correo.",
      popupBadge: "Respuesta en menos de 24 horas",
      popupClose: "Entendido",
      emailIntro: "¡Hola, Martha! Nuevo mensaje del formulario del sitio:",
    },
  },
  footer: {
    madeBy: "Hecho por",
    whatsappFloatLabel: "Escríbele a Martha por WhatsApp",
    tagline:
      "Clases amables de español guatemalteco, inglés y maya — con materiales hechos con cariño en Guatemala.",
    explore: "Explorar",
    contactTitle: "Contáctanos",
    follow: "Sígueme",
    followText: "Consejos, cultura y materiales nuevos en redes sociales.",
    location: "Guatemala",
    rights: "Aprender idiomas con cultura.",
    ctaTitle: "¿Lista para empezar a aprender?",
    ctaText: "Crea una cuenta, reserva una clase gratis o escríbeme — estoy aquí para ayudarte.",
    ctaBook: "Reservar clase gratis",
    ctaContact: "Contáctanos",
    links: {
      home: "Inicio",
      languages: "Idiomas",
      book: "Reservar clase gratis",
      learn: "Aprender",
      practice: "Práctica",
      materials: "Materiales",
      about: "Sobre mí",
      contact: "Contáctanos",
    },
  },
};
