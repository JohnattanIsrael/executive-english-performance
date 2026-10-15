/** Copy for the smaller pages: FAQ, contact, privacy, credits, book, proposal, self-assessment. */
import { site } from "@/config/site";
import type { Localized } from "@/i18n/config";

const en = {
  faq: {
    meta: {
      title: "FAQ",
      description:
        "Answers about executive English coaching: how it differs from an English course, the role of AI, program structure and corporate enrollment.",
    },
    eyebrow: "FAQ",
    title: "Questions, answered plainly.",
    groups: { approach: "The approach", ai: "AI and the platform", programs: "Programs", companies: "For companies" },
  },
  contact: {
    meta: {
      title: "Contact",
      description: "Contact Executive English Performance about executive coaching, corporate programs or AI early access.",
    },
    eyebrow: "Contact",
    title: "Let’s talk about what’s at stake.",
    individuals: "For individuals",
    companies: "For companies",
  },
  privacy: {
    meta: {
      title: "Privacy Notice",
      description: `How ${site.name} handles personal information submitted through this website.`,
    },
    eyebrow: "Legal",
    title: "Privacy notice",
    draft:
      "Draft for review. Have this notice reviewed by qualified counsel and completed with your providers and jurisdiction before launch.",
    sections: [
      {
        title: "Information you provide",
        body: "When you request an assessment, a corporate proposal, early access or contact us, we collect the details you enter in the form — such as your name, email, company, role, country and a description of your communication needs.",
      },
      {
        title: "How we use it",
        body: "We use this information to respond to your request, prepare for consultations, send proposals and, if you join the early-access list, to tell you about the AI communication platform. We do not sell personal information.",
      },
      {
        title: "Service providers",
        body: "Form submissions may be processed by service providers we use for email, scheduling and customer relationship management. [List providers once selected.]",
      },
      {
        title: "Analytics",
        body: "We may use privacy-conscious analytics to understand how the website is used, such as which pages are visited. [Name the analytics provider and cookie usage once configured.]",
      },
      {
        title: "Retention and your rights",
        body: "You can ask us to access, correct or delete your information at any time by contacting us. [Add retention periods and jurisdiction-specific rights, e.g. GDPR/CCPA, as applicable.]",
      },
      { title: "Contact", body: `Questions about privacy can be sent to ${site.contact.email}.` },
    ],
  },
  credits: {
    meta: { title: "Photo Credits", description: "Credits for the photography used on this website." },
    eyebrow: "Credits",
    title: "Photo credits",
    lead: {
      before: "Photography on this site is from",
      unsplash: "Unsplash",
      middle: ", used under the",
      license: "Unsplash License",
      after: ". People pictured are not clients, coaches or staff.",
    },
    photoBy: "Photo by",
    on: "on Unsplash",
  },
  book: {
    meta: {
      title: "Book an Executive Assessment",
      description:
        "Book an executive assessment: a focused conversation about your role, your high-stakes communication situations and how to improve your performance in English.",
    },
    eyebrow: "Book a consultation",
    title: "Book an Executive Assessment.",
    lead: "Start with a clear picture of how you communicate today, and what would make the biggest difference.",
    nextTitle: "What happens next",
    steps: [
      { title: "You tell us what’s at stake", body: "Your role, your stakeholders and the situations that matter most." },
      { title: "We assess how you communicate", body: "A focused conversation, with real work situations as the material." },
      { title: "You receive clear recommendations", body: "Priorities, a suggested program and a fixed proposal — no obligation." },
    ],
    privacy: "Your information is used only to prepare for and follow up on your assessment. It is never sold.",
  },
  proposal: {
    meta: {
      title: "Request a Corporate Proposal",
      description:
        "Request a proposal for a corporate executive communication pilot or annual program for your leadership team.",
    },
    eyebrow: "For companies",
    title: "Request a Corporate Proposal.",
    lead: "Tell us about your team and where English communication affects results. We’ll follow up to scope the right program.",
    coversTitle: "Your proposal will cover",
    covers: [
      "Recommended format: pilot or annual program",
      "Participant assessment approach",
      "Business-specific scenarios to develop",
      "Coaching structure and cadence",
      "Reporting for HR and leadership",
      "Timeline and investment",
    ],
    nextStep: "Typical next step: a short discovery call with HR or the business leader sponsoring the program.",
  },
  assessment: {
    meta: {
      title: "Executive Communication Self-Assessment",
      description:
        "A free, 3-minute self-assessment that builds an initial Executive Communication Profile across presentations, meetings, spontaneous speaking, vocabulary, clarity, precision and presence.",
    },
    eyebrow: "Self-assessment",
    title: "Where does your English communication stand?",
    lead: "A short, structured reflection on how you use English at work — and where focused practice would make the biggest difference.",
  },
};

const es: typeof en = {
  faq: {
    meta: {
      title: "Preguntas frecuentes",
      description:
        "Respuestas sobre el coaching de inglés ejecutivo: en qué se diferencia de un curso de inglés, el papel de la IA, la estructura de los programas y la inscripción corporativa.",
    },
    eyebrow: "Preguntas frecuentes",
    title: "Preguntas, respondidas con claridad.",
    groups: { approach: "El enfoque", ai: "La IA y la plataforma", programs: "Programas", companies: "Para empresas" },
  },
  contact: {
    meta: {
      title: "Contacto",
      description: "Contacte a Executive English Performance sobre coaching ejecutivo, programas corporativos o el acceso anticipado a la IA.",
    },
    eyebrow: "Contacto",
    title: "Hablemos de lo que está en juego.",
    individuals: "Para particulares",
    companies: "Para empresas",
  },
  privacy: {
    meta: {
      title: "Aviso de privacidad",
      description: `Cómo trata ${site.name} la información personal enviada a través de este sitio web.`,
    },
    eyebrow: "Legal",
    title: "Aviso de privacidad",
    draft:
      "Borrador para revisión. Este aviso debe ser revisado por un abogado calificado y completado con sus proveedores y su jurisdicción antes del lanzamiento.",
    sections: [
      {
        title: "Información que usted proporciona",
        body: "Cuando solicita una evaluación, una propuesta corporativa, acceso anticipado o nos contacta, recopilamos los datos que introduce en el formulario, como su nombre, correo electrónico, empresa, cargo, país y una descripción de sus necesidades de comunicación.",
      },
      {
        title: "Cómo la usamos",
        body: "Usamos esta información para responder a su solicitud, preparar consultas, enviar propuestas y, si se une a la lista de acceso anticipado, informarle sobre la plataforma de comunicación con IA. No vendemos información personal.",
      },
      {
        title: "Proveedores de servicios",
        body: "Los envíos de formularios pueden ser procesados por proveedores de servicios que usamos para correo electrónico, agenda y gestión de relaciones con clientes. [Enumere los proveedores cuando estén seleccionados.]",
      },
      {
        title: "Analítica",
        body: "Podemos usar herramientas de analítica respetuosas con la privacidad para entender cómo se usa el sitio web, por ejemplo qué páginas se visitan. [Indique el proveedor de analítica y el uso de cookies cuando esté configurado.]",
      },
      {
        title: "Conservación y sus derechos",
        body: "Puede pedirnos en cualquier momento que accedamos a su información, la corrijamos o la eliminemos, contactándonos. [Agregue los plazos de conservación y los derechos específicos de cada jurisdicción, p. ej., RGPD/CCPA o la normativa local de protección de datos, según corresponda.]",
      },
      { title: "Contacto", body: `Puede enviar sus preguntas sobre privacidad a ${site.contact.email}.` },
    ],
  },
  credits: {
    meta: { title: "Créditos fotográficos", description: "Créditos de las fotografías usadas en este sitio web." },
    eyebrow: "Créditos",
    title: "Créditos fotográficos",
    lead: {
      before: "Las fotografías de este sitio provienen de",
      unsplash: "Unsplash",
      middle: " y se usan bajo la",
      license: "Licencia de Unsplash",
      after: ". Las personas que aparecen no son clientes, coaches ni personal de la empresa.",
    },
    photoBy: "Foto de",
    on: "en Unsplash",
  },
  book: {
    meta: {
      title: "Reserve una Evaluación Ejecutiva",
      description:
        "Reserve una evaluación ejecutiva: una conversación enfocada en su rol, sus situaciones de comunicación decisivas y cómo mejorar su desempeño en inglés.",
    },
    eyebrow: "Reserve una consulta",
    title: "Reserve una Evaluación Ejecutiva.",
    lead: "Empiece con una imagen clara de cómo se comunica hoy y de qué marcaría la mayor diferencia.",
    nextTitle: "Qué sucede después",
    steps: [
      { title: "Usted nos cuenta lo que está en juego", body: "Su rol, sus interlocutores y las situaciones que más importan." },
      { title: "Evaluamos cómo se comunica", body: "Una conversación enfocada, con situaciones reales de trabajo como material." },
      { title: "Recibe recomendaciones claras", body: "Prioridades, un programa sugerido y una propuesta cerrada, sin compromiso." },
    ],
    privacy: "Su información se usa solo para preparar su evaluación y darle seguimiento. Nunca se vende.",
  },
  proposal: {
    meta: {
      title: "Solicite una propuesta corporativa",
      description:
        "Solicite una propuesta para un piloto corporativo de comunicación ejecutiva o un programa anual para su equipo directivo.",
    },
    eyebrow: "Para empresas",
    title: "Solicite una propuesta corporativa.",
    lead: "Cuéntenos sobre su equipo y dónde la comunicación en inglés afecta los resultados. Le contactaremos para definir el programa adecuado.",
    coversTitle: "Su propuesta incluirá",
    covers: [
      "Formato recomendado: piloto o programa anual",
      "Enfoque de evaluación de los participantes",
      "Escenarios propios del negocio a desarrollar",
      "Estructura y frecuencia del coaching",
      "Informes para RR. HH. y la dirección",
      "Calendario e inversión",
    ],
    nextStep: "Siguiente paso habitual: una breve llamada de diagnóstico con RR. HH. o con el líder de negocio que patrocina el programa.",
  },
  assessment: {
    meta: {
      title: "Autoevaluación de comunicación ejecutiva",
      description:
        "Una autoevaluación gratuita de 3 minutos que construye un Perfil de Comunicación Ejecutiva inicial en presentaciones, reuniones, expresión espontánea, vocabulario, claridad, precisión y presencia.",
    },
    eyebrow: "Autoevaluación",
    title: "¿En qué punto está su comunicación en inglés?",
    lead: "Una reflexión breve y estructurada sobre cómo usa el inglés en el trabajo, y dónde una práctica enfocada marcaría la mayor diferencia.",
  },
};

export const miscCopy: Localized<typeof en> = { en, es };
