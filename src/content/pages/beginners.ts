/** Executive Fast Track page — spec 002. */
import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "Executive Fast Track — English for Beginner Executives",
    description:
      "An 8-week, fast-paced English program for executives and senior professionals at a beginner level: private coaching three times a week, daily guided practice and only the English your role needs.",
    keywords: [
      "English for beginner executives",
      "intensive business English for beginners",
      "fast track English course for executives",
      "executive English coaching",
    ],
    serviceName: "Executive Fast Track — English foundations for leaders",
  },
  hero: {
    eyebrow: "Executive Fast Track · For beginners",
    title: ["Starting out in English?", "Get working in it — fast."],
    lead: "An 8-week intensive for executives and senior professionals whose English is still basic. No general syllabus and no textbook levels: we build only the English your role needs, with private coaching three times a week and daily guided practice.",
    apply: "Apply for the Fast Track",
    secondary: "See the 8-week plan",
    facts: [
      { label: "Length", value: "8 weeks" },
      { label: "Coaching", value: "3 × 45 min a week" },
      { label: "Practice", value: "20 min a day" },
      { label: "Starting level", value: "Beginner–elementary" },
    ],
  },
  free: {
    eyebrow: "Not an executive? Start free",
    title: "Every beginner is welcome — whatever the reason.",
    body: "English for travel, a new job, studies or everyday life? Start with our free interactive lessons: five short, playable lessons with pictures, audio and instant feedback. No sign-up, at your own pace.",
    cta: "Start the free lessons",
  },
  fit: {
    eyebrow: "Is this for you?",
    title: "Built for capable leaders at the start of their English.",
    lead: "You are senior in your field. Your English isn’t yet. The Fast Track respects the first and works deliberately on the second.",
    yesTitle: "A good fit if you",
    yes: [
      "Lead a team, a function or a company — and English is new or rusty",
      "Have just started reporting to a US or European parent company",
      "Are stepping into an international role, region or client portfolio",
      "Understand some English but freeze when you have to speak it",
      "Need practical results in weeks, not a year of general classes",
    ],
    noTitle: "Probably not for you if you",
    no: [
      "Already run meetings in English — the Executive Performance Program fits better",
      "Want a general-English or exam-preparation course",
      "Can’t commit about four hours a week for eight weeks",
    ],
    levelNote:
      "Levels as a reference only: most participants start around CEFR A1–A2 and work towards B1. Your assessment, not a label, decides where we begin.",
  },
  outcomes: {
    eyebrow: "What you work towards",
    title: "Functional English for your own work situations.",
    lead: "By the end of the eight weeks, the aim is that you can handle the core situations of your role in English — simply, clearly and with more confidence. Progress depends on your starting point and practice; we measure it honestly.",
    items: [
      { title: "Introduce yourself and your business", body: "Your role, your company, your numbers — in a clear, prepared way." },
      { title: "Follow meetings and calls", body: "Catch the main points, and ask people to repeat, slow down or clarify." },
      { title: "Give short updates", body: "Report status, dates and figures using simple, reliable structures." },
      { title: "Write clear emails and messages", body: "Short, correct, professional — using templates built for your role." },
      { title: "Handle small talk", body: "The first five minutes of a call or a visit, without panic." },
      { title: "Prepare for a real moment", body: "Rehearse one upcoming situation from your calendar until it feels manageable." },
    ],
  },
  plan: {
    eyebrow: "The 8-week plan",
    title: "Fast, structured and built around your calendar.",
    phases: [
      {
        weeks: "Weeks 1–2",
        title: "Foundations for your role",
        summary: "Assessment, your work vocabulary, introductions, numbers and dates.",
        details: [
          "Level and needs assessment with your coach",
          "Your personal bank of work vocabulary and phrases",
          "Introducing yourself, your company and your role",
          "Numbers, dates, times and scheduling",
        ],
      },
      {
        weeks: "Weeks 3–5",
        title: "Meetings and calls",
        summary: "Following discussions, asking for clarity and giving simple updates.",
        details: [
          "Listening strategies for fast speakers and accents",
          "Phrases to ask for repetition and clarification",
          "Giving a short status update",
          "Agreeing, disagreeing and asking questions politely",
        ],
      },
      {
        weeks: "Weeks 6–7",
        title: "Email and short presentations",
        summary: "Clear written messages and a two-minute update you can deliver.",
        details: [
          "Email templates for your recurring situations",
          "Short messages for chat and quick replies",
          "A two-minute presentation of your area",
          "Handling one or two simple questions",
        ],
      },
      {
        weeks: "Week 8",
        title: "Real-situation rehearsal",
        summary: "Rehearse a real upcoming moment, reassess and plan what’s next.",
        details: [
          "Full rehearsal of a real situation from your calendar",
          "Final reassessment against your starting point",
          "A practice plan for the following months",
          "Recommendation: continue independently or move into the Executive Performance Program",
        ],
      },
    ],
  },
  rhythm: {
    eyebrow: "Your week",
    title: "About four hours a week, designed for a busy calendar.",
    items: [
      { value: "3 ×", label: "45-minute private coaching sessions", body: "Live, one-to-one, scheduled around your agenda." },
      { value: "20 min", label: "guided practice a day", body: "Short drills and phrase work you can do between meetings." },
      { value: "1 ×", label: "weekly progress check-in", body: "What improved, what to focus on next week." },
    ],
  },
  program: {
    eyebrow: "Program and investment",
    title: "One program, clearly scoped.",
    next: {
      title: "After the Fast Track",
      body: "Many leaders continue into the 12-week Executive Performance Program to work on meetings, presentations and negotiations at a higher level.",
      link: "About the Executive Performance Program",
    },
  },
  faq: {
    eyebrow: "Questions from beginners",
    title: "What people ask before they start.",
    items: [
      {
        question: "I’m a beginner, but I don’t need English for work. Can I still learn with you?",
        answer:
          "Yes. Start with the free interactive lessons on this site — they cover greetings, numbers and time, the verb “to be”, colors and everyday things, and ordering at a café. If you’d like a coach, book an assessment and tell us your goals; we’ll recommend an honest next step.",
      },
      {
        question: "My English is very basic. Can I really start?",
        answer:
          "Yes. The Fast Track is designed for beginners and elementary speakers. Sessions use simple, clear English adapted to your level, and nothing assumes you already know the basics.",
      },
      {
        question: "Will I be fluent after eight weeks?",
        answer:
          "No honest program can promise that. The goal is functional English for your core work situations — introductions, meetings, calls, emails and short updates — and a clear plan for what comes next.",
      },
      {
        question: "Why not take a regular English course?",
        answer:
          "General courses move through levels and textbook topics for everyone. The Fast Track starts from your role and your calendar, so every hour goes into English you will use at work this month.",
      },
      {
        question: "How much time do I need each week?",
        answer:
          "About four hours: three 45-minute coaching sessions and around 20 minutes of guided practice a day. Sessions are scheduled around your agenda.",
      },
      {
        question: "Can my company pay for it, or enroll several people?",
        answer:
          "Yes. We can address a proposal to your company, and teams with several beginners can join through a corporate pilot.",
      },
    ],
  },
  cta: {
    title: "Start where your work is.",
    lead: "Tell us about your role and the English situations ahead of you. We’ll assess your starting point and confirm whether the Fast Track is the right program.",
    apply: "Apply for the Fast Track",
    proposal: "Enroll a team",
  },
};

const es: typeof en = {
  meta: {
    title: "Fast Track Ejecutivo — Inglés para ejecutivos principiantes",
    description:
      "Un programa de inglés intensivo de 8 semanas para ejecutivos y profesionales sénior con nivel principiante: coaching privado tres veces por semana, práctica guiada diaria y solo el inglés que necesita su rol.",
    keywords: [
      "inglés para ejecutivos principiantes",
      "curso intensivo de inglés de negocios para principiantes",
      "curso rápido de inglés para ejecutivos",
      "coaching de inglés ejecutivo",
    ],
    serviceName: "Fast Track Ejecutivo — Inglés esencial para líderes",
  },
  hero: {
    eyebrow: "Fast Track Ejecutivo · Para principiantes",
    title: ["¿Está empezando con el inglés?", "Empiece a trabajar en inglés, rápido."],
    lead: "Un intensivo de 8 semanas para ejecutivos y profesionales sénior cuyo inglés todavía es básico. Sin temario general ni niveles de libro de texto: construimos solo el inglés que necesita su rol, con coaching privado tres veces por semana y práctica guiada diaria.",
    apply: "Postularme al Fast Track",
    secondary: "Ver el plan de 8 semanas",
    facts: [
      { label: "Duración", value: "8 semanas" },
      { label: "Coaching", value: "3 × 45 min por semana" },
      { label: "Práctica", value: "20 min al día" },
      { label: "Nivel inicial", value: "Principiante–elemental" },
    ],
  },
  free: {
    eyebrow: "¿No es ejecutivo? Empiece gratis",
    title: "Todos los principiantes son bienvenidos, sea cual sea el motivo.",
    body: "¿Inglés para viajar, un trabajo nuevo, estudiar o la vida diaria? Empiece con nuestras lecciones interactivas gratis: cinco lecciones cortas y jugables, con imágenes, audio y corrección al instante. Sin registro y a su ritmo.",
    cta: "Empezar las lecciones gratis",
  },
  fit: {
    eyebrow: "¿Es para usted?",
    title: "Pensado para líderes capaces que están empezando con el inglés.",
    lead: "Usted tiene experiencia y jerarquía en su campo. Su inglés, todavía no. El Fast Track respeta lo primero y trabaja de forma deliberada en lo segundo.",
    yesTitle: "Le encaja si usted",
    yes: [
      "Dirige un equipo, un área o una empresa, y el inglés es nuevo u olvidado para usted",
      "Acaba de empezar a reportar a una casa matriz en EE. UU. o Europa",
      "Asume un rol, una región o una cartera de clientes internacionales",
      "Entiende algo de inglés, pero se bloquea cuando tiene que hablarlo",
      "Necesita resultados prácticos en semanas, no un año de clases generales",
    ],
    noTitle: "Probablemente no sea para usted si",
    no: [
      "Ya dirige reuniones en inglés: el Programa de Desempeño Ejecutivo le encaja mejor",
      "Busca un curso de inglés general o de preparación de exámenes",
      "No puede dedicar unas cuatro horas por semana durante ocho semanas",
    ],
    levelNote:
      "Niveles solo como referencia: la mayoría de los participantes empieza en torno al A1–A2 del MCER y avanza hacia el B1. Su evaluación, no una etiqueta, decide por dónde empezamos.",
  },
  outcomes: {
    eyebrow: "Hacia dónde trabaja",
    title: "Inglés funcional para sus propias situaciones de trabajo.",
    lead: "Al terminar las ocho semanas, el objetivo es que pueda manejar en inglés las situaciones centrales de su rol: de forma sencilla, clara y con más seguridad. El progreso depende de su punto de partida y de su práctica; lo medimos con honestidad.",
    items: [
      { title: "Presentarse y presentar su negocio", body: "Su rol, su empresa, sus cifras: de forma clara y preparada." },
      { title: "Seguir reuniones y llamadas", body: "Captar las ideas principales y pedir que repitan, hablen más despacio o aclaren." },
      { title: "Dar actualizaciones breves", body: "Informar estados, fechas y cifras con estructuras sencillas y confiables." },
      { title: "Escribir correos y mensajes claros", body: "Breves, correctos y profesionales, con plantillas creadas para su rol." },
      { title: "Manejar la conversación informal", body: "Los primeros cinco minutos de una llamada o una visita, sin pánico." },
      { title: "Prepararse para un momento real", body: "Ensayar una situación próxima de su agenda hasta que le resulte manejable." },
    ],
  },
  plan: {
    eyebrow: "El plan de 8 semanas",
    title: "Rápido, estructurado y construido en torno a su agenda.",
    phases: [
      {
        weeks: "Semanas 1–2",
        title: "Bases para su rol",
        summary: "Evaluación, su vocabulario de trabajo, presentaciones, números y fechas.",
        details: [
          "Evaluación de nivel y necesidades con su coach",
          "Su banco personal de vocabulario y frases de trabajo",
          "Presentarse, presentar su empresa y su rol",
          "Números, fechas, horarios y agenda",
        ],
      },
      {
        weeks: "Semanas 3–5",
        title: "Reuniones y llamadas",
        summary: "Seguir conversaciones, pedir aclaraciones y dar actualizaciones sencillas.",
        details: [
          "Estrategias para entender a quien habla rápido y distintos acentos",
          "Frases para pedir que repitan y aclaren",
          "Dar una breve actualización de estado",
          "Estar de acuerdo, discrepar y preguntar con cortesía",
        ],
      },
      {
        weeks: "Semanas 6–7",
        title: "Correos y presentaciones breves",
        summary: "Mensajes escritos claros y una actualización de dos minutos que pueda presentar.",
        details: [
          "Plantillas de correo para sus situaciones habituales",
          "Mensajes breves para chat y respuestas rápidas",
          "Una presentación de dos minutos sobre su área",
          "Responder una o dos preguntas sencillas",
        ],
      },
      {
        weeks: "Semana 8",
        title: "Ensayo de una situación real",
        summary: "Ensayar un momento real próximo, reevaluar y planificar lo que sigue.",
        details: [
          "Ensayo completo de una situación real de su agenda",
          "Evaluación final frente a su punto de partida",
          "Un plan de práctica para los meses siguientes",
          "Recomendación: seguir por su cuenta o pasar al Programa de Desempeño Ejecutivo",
        ],
      },
    ],
  },
  rhythm: {
    eyebrow: "Su semana",
    title: "Unas cuatro horas por semana, pensadas para una agenda exigente.",
    items: [
      { value: "3 ×", label: "sesiones privadas de coaching de 45 minutos", body: "En vivo, uno a uno, programadas según su agenda." },
      { value: "20 min", label: "de práctica guiada al día", body: "Ejercicios breves y trabajo con frases que puede hacer entre reuniones." },
      { value: "1 ×", label: "revisión semanal de progreso", body: "Qué mejoró y en qué enfocarse la semana siguiente." },
    ],
  },
  program: {
    eyebrow: "Programa e inversión",
    title: "Un programa con un alcance claro.",
    next: {
      title: "Después del Fast Track",
      body: "Muchos líderes continúan con el Programa de Desempeño Ejecutivo de 12 semanas para trabajar reuniones, presentaciones y negociaciones a un nivel más alto.",
      link: "Sobre el Programa de Desempeño Ejecutivo",
    },
  },
  faq: {
    eyebrow: "Preguntas de principiantes",
    title: "Lo que se pregunta antes de empezar.",
    items: [
      {
        question: "Soy principiante, pero no necesito el inglés para el trabajo. ¿Puedo aprender con ustedes?",
        answer:
          "Sí. Empiece con las lecciones interactivas gratis de este sitio: saludos, números y la hora, el verbo “to be”, colores y objetos cotidianos, y pedir en una cafetería. Si quiere un coach, reserve una evaluación y cuéntenos sus objetivos; le recomendaremos un siguiente paso honesto.",
      },
      {
        question: "Mi inglés es muy básico. ¿De verdad puedo empezar?",
        answer:
          "Sí. El Fast Track está diseñado para principiantes y personas con nivel elemental. Las sesiones usan un inglés sencillo y claro, adaptado a su nivel, y nada da por hecho que ya domina lo básico.",
      },
      {
        question: "¿Hablaré con fluidez después de ocho semanas?",
        answer:
          "Ningún programa honesto puede prometerlo. El objetivo es un inglés funcional para las situaciones centrales de su trabajo —presentaciones personales, reuniones, llamadas, correos y actualizaciones breves— y un plan claro para lo que sigue.",
      },
      {
        question: "¿Por qué no tomar un curso de inglés normal?",
        answer:
          "Los cursos generales avanzan por niveles y temas de libro iguales para todos. El Fast Track parte de su rol y de su agenda, así que cada hora se invierte en inglés que usará en el trabajo este mismo mes.",
      },
      {
        question: "¿Cuánto tiempo necesito cada semana?",
        answer:
          "Unas cuatro horas: tres sesiones de coaching de 45 minutos y unos 20 minutos de práctica guiada al día. Las sesiones se programan según su agenda.",
      },
      {
        question: "¿Puede pagarlo mi empresa o inscribir a varias personas?",
        answer:
          "Sí. Podemos dirigir una propuesta a su empresa, y los equipos con varios principiantes pueden participar a través de un piloto corporativo.",
      },
    ],
  },
  cta: {
    title: "Empiece por su trabajo.",
    lead: "Cuéntenos sobre su rol y las situaciones en inglés que tiene por delante. Evaluaremos su punto de partida y le confirmaremos si el Fast Track es el programa adecuado.",
    apply: "Postularme al Fast Track",
    proposal: "Inscribir a un equipo",
  },
};

export const beginnersCopy: Localized<typeof en> = { en, es };
