import type { Localized } from "@/i18n/config";

const en = {
  meta: {
    title: "AI Communication Coach (In Development)",
    description:
      "An AI English coach for executives, in development: realistic professional role-play, feedback on clarity and structure, and insights shared with your human coach. Join the early-access list.",
    keywords: ["AI English coach for executives", "AI communication coach", "business English practice"],
  },
  hero: {
    eyebrow: "AI Communication Coach",
    title: "Practice the conversations before they happen.",
    lead: "Our AI-powered communication platform is currently being developed. It will let you rehearse realistic professional conversations at any time — and give your coach the evidence to make every session count.",
    join: "Join the Early Access List",
  },
  status: {
    badge: "Development status",
    available: "Available",
    inDevelopment: "In development",
    items: [
      { label: "Human coaching programs", live: true },
      { label: "Online self-assessment", live: true },
      { label: "Scenario library (preview)", live: true },
      { label: "AI role-play simulations", live: false },
      { label: "Speech analysis and pronunciation feedback", live: false },
      { label: "Coach insight summaries", live: false },
    ],
  },
  examples: {
    eyebrow: "Example scenarios",
    title: "Rehearse the moments that matter.",
    lead: "The platform will use scenarios like these for AI role-play. Companies can add scenarios built from their own business.",
    counterpart: "Counterpart:",
  },
  pipeline: {
    badge: "Planned capabilities — not yet live",
    title: "How the platform is designed to work.",
    steps: [
      { title: "Generate the scenario", body: "Build a realistic situation from your role, industry and upcoming events." },
      { title: "Conduct the conversation", body: "Role-play with a counterpart who pushes back, interrupts and asks follow-ups." },
      { title: "Analyze your responses", body: "Look at structure, clarity, language and delivery." },
      { title: "Identify patterns", body: "Spot recurring habits across sessions — not just single mistakes." },
      { title: "Provide feedback", body: "Specific, actionable notes with examples from your own answers." },
      { title: "Recommend practice", body: "Suggest the next scenario or drill that targets your patterns." },
      { title: "Update your profile", body: "Keep your communication profile current as you practice." },
      { title: "Brief your coach", body: "Summarize insights so coaching sessions start from evidence." },
    ],
  },
  earlyAccess: {
    eyebrow: "Early access",
    title: "Be among the first to practice with it.",
    lead: "Early-access members will be invited as functionality becomes available, starting with clients in coaching programs. Join the list and we’ll keep you informed.",
  },
  cta: {
    title: "Don’t wait for the software to start improving.",
    lead: "Human coaching is available now. Start with an executive assessment — early-access invitations go to coaching clients first.",
  },
};

const es: typeof en = {
  meta: {
    title: "Coach de comunicación con IA (en desarrollo)",
    description:
      "Un coach de inglés con IA para ejecutivos, en desarrollo: juegos de rol profesionales realistas, retroalimentación sobre claridad y estructura, y conclusiones compartidas con su coach humano. Únase a la lista de acceso anticipado.",
    keywords: ["coach de inglés con IA para ejecutivos", "coach de comunicación con IA", "práctica de inglés de negocios"],
  },
  hero: {
    eyebrow: "Coach de Comunicación con IA",
    title: "Practique las conversaciones antes de que ocurran.",
    lead: "Nuestra plataforma de comunicación con IA está en desarrollo. Le permitirá ensayar conversaciones profesionales realistas en cualquier momento y le dará a su coach la evidencia para que cada sesión cuente.",
    join: "Unirme a la lista de acceso anticipado",
  },
  status: {
    badge: "Estado del desarrollo",
    available: "Disponible",
    inDevelopment: "En desarrollo",
    items: [
      { label: "Programas de coaching humano", live: true },
      { label: "Autoevaluación en línea", live: true },
      { label: "Biblioteca de escenarios (vista previa)", live: true },
      { label: "Simulaciones de juego de rol con IA", live: false },
      { label: "Análisis del habla y retroalimentación de pronunciación", live: false },
      { label: "Resúmenes de conclusiones para el coach", live: false },
    ],
  },
  examples: {
    eyebrow: "Escenarios de ejemplo",
    title: "Ensaye los momentos que importan.",
    lead: "La plataforma usará escenarios como estos para los juegos de rol con IA. Las empresas podrán agregar escenarios construidos a partir de su propio negocio.",
    counterpart: "Interlocutor:",
  },
  pipeline: {
    badge: "Funciones previstas — aún no disponibles",
    title: "Cómo está diseñada la plataforma.",
    steps: [
      { title: "Generar el escenario", body: "Construir una situación realista a partir de su rol, su industria y sus próximos eventos." },
      { title: "Conducir la conversación", body: "Juego de rol con un interlocutor que objeta, interrumpe y hace preguntas de seguimiento." },
      { title: "Analizar sus respuestas", body: "Revisar la estructura, la claridad, el lenguaje y la forma de expresarse." },
      { title: "Identificar patrones", body: "Detectar hábitos recurrentes entre sesiones, no solo errores aislados." },
      { title: "Dar retroalimentación", body: "Notas concretas y accionables, con ejemplos de sus propias respuestas." },
      { title: "Recomendar práctica", body: "Sugerir el siguiente escenario o ejercicio que trabaje sus patrones." },
      { title: "Actualizar su perfil", body: "Mantener al día su perfil de comunicación a medida que practica." },
      { title: "Informar a su coach", body: "Resumir conclusiones para que las sesiones de coaching partan de evidencia." },
    ],
  },
  earlyAccess: {
    eyebrow: "Acceso anticipado",
    title: "Sea de los primeros en practicar con ella.",
    lead: "Invitaremos a los miembros con acceso anticipado a medida que las funciones estén disponibles, empezando por los clientes de los programas de coaching. Únase a la lista y le mantendremos informado.",
  },
  cta: {
    title: "No espere al software para empezar a mejorar.",
    lead: "El coaching humano ya está disponible. Empiece con una evaluación ejecutiva: las invitaciones de acceso anticipado van primero a los clientes de coaching.",
  },
};

export const aiCoachCopy: Localized<typeof en> = { en, es };
