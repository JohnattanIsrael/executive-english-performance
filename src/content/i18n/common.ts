/**
 * Site-wide copy: brand messages, navigation, CTAs, footer, form chrome and
 * small UI strings. Hrefs are language-neutral; links localize themselves.
 */
import type { Localized } from "@/i18n/config";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

const en = {
  meta: {
    defaultTitle: "Executive English Performance — Executive English Coaching",
    description:
      "Executive English coaching for professionals who need to perform, not simply practice. Human expertise, executive coaching and AI-assisted practice for high-stakes business communication.",
    keywords: [
      "executive English coaching",
      "executive English training",
      "business English for executives",
      "English communication coaching",
      "corporate English training",
      "executive communication training",
      "English coaching for professionals",
      "AI English coach for executives",
      "business communication coaching",
    ],
  },
  site: {
    tagline: "Turn strong English into executive-level communication.",
    primaryMessage: "You don’t need more English lessons. You need to communicate better when it matters.",
    supportingMessage:
      "Executive English Performance combines experienced human coaching with AI-assisted practice to help professionals prepare for the meetings, presentations, negotiations and conversations that actually matter.",
    location: "[City, Country] · Working with clients internationally",
    responseTime: "We aim to respond within two business days.",
  },
  ctas: {
    assessment: { label: "Book an Executive Assessment", href: "/book" },
    proposal: { label: "Request a Corporate Proposal", href: "/proposal" },
    earlyAccess: { label: "Join AI Early Access", href: "/ai-coach#early-access" },
  },
  mainNav: [
    { label: "Executives", href: "/executives", description: "Private coaching for leaders" },
    { label: "Companies", href: "/companies", description: "Programs for leadership teams" },
    { label: "Beginners", href: "/beginners", description: "8-week Fast Track" },
    { label: "Free Lessons", href: "/learn", description: "Interactive, for beginners" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "AI Coach", href: "/ai-coach" },
    { label: "Programs", href: "/programs" },
    { label: "Pricing", href: "/pricing" },
  ] as NavItem[],
  secondaryNav: [
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  footerNav: [
    {
      title: "Programs",
      items: [
        { label: "For Executives", href: "/executives" },
        { label: "For Companies", href: "/companies" },
        { label: "For Beginners", href: "/beginners" },
        { label: "Free English Lessons", href: "/learn" },
        { label: "Programs", href: "/programs" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Approach",
      items: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "AI Communication Coach", href: "/ai-coach" },
        { label: "Self-Assessment", href: "/assessment" },
        { label: "Results", href: "/results" },
      ],
    },
    {
      title: "Company",
      items: [
        { label: "About", href: "/about" },
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
        { label: "Client Sign In", href: "/sign-in" },
      ],
    },
  ] as { title: string; items: NavItem[] }[],
  header: {
    mainNavLabel: "Main",
    mobileNavLabel: "Mobile",
    signIn: "Sign in",
    clientSignIn: "Client sign in",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    /** Header button; the full CTA label is used everywhere else. */
    cta: "Book an Executive Assessment",
  },
  footer: {
    rights: "All rights reserved.",
    platformNote: "The AI communication platform is in development.",
    privacy: "Privacy",
    credits: "Photo credits",
    proposals: "Corporate proposals",
  },
  skipLink: "Skip to content",
  logoLabel: "Executive English Performance — home",
  forms: {
    optional: "(optional)",
    sending: "Sending…",
    honeypot: "Leave this field empty",
    selectOne: "Select one",
    selectRange: "Select a range",
    consent: { before: "I agree to be contacted about my request. Details are handled as described in the", link: "privacy notice", after: "." },
    submitError: "We couldn’t send your request. Please try again, or email us directly.",
  },
  program: {
    inDevelopment: "In development",
    flagship: "Flagship",
    moreIncluded: (n: number) => `+ ${n} more included`,
    included: "What’s included",
    idealFor: "Ideal for",
  },
  bandOf: (label: string, band: number) => `${label}: ${band} of 5`,
};

const es: typeof en = {
  meta: {
    defaultTitle: "Executive English Performance — Coaching de inglés ejecutivo",
    description:
      "Coaching de inglés ejecutivo para profesionales que necesitan desempeñarse, no solo practicar. Experiencia humana, coaching ejecutivo y práctica asistida por IA para la comunicación de negocios de alto impacto.",
    keywords: [
      "coaching de inglés ejecutivo",
      "inglés para ejecutivos",
      "inglés de negocios para ejecutivos",
      "coaching de comunicación en inglés",
      "capacitación corporativa de inglés",
      "comunicación ejecutiva en inglés",
      "inglés para profesionales",
      "coach de inglés con IA para ejecutivos",
      "curso intensivo de inglés para ejecutivos principiantes",
    ],
  },
  site: {
    tagline: "Convierta un buen inglés en comunicación de nivel ejecutivo.",
    primaryMessage: "No necesita más clases de inglés. Necesita comunicarse mejor cuando más importa.",
    supportingMessage:
      "Executive English Performance combina coaching humano con experiencia y práctica asistida por IA para ayudar a los profesionales a prepararse para las reuniones, presentaciones, negociaciones y conversaciones que realmente importan.",
    location: "[Ciudad, País] · Trabajamos con clientes de todo el mundo",
    responseTime: "Respondemos en un plazo de dos días hábiles.",
  },
  ctas: {
    assessment: { label: "Reserve una Evaluación Ejecutiva", href: "/book" },
    proposal: { label: "Solicite una propuesta corporativa", href: "/proposal" },
    earlyAccess: { label: "Únase al acceso anticipado de IA", href: "/ai-coach#early-access" },
  },
  mainNav: [
    { label: "Ejecutivos", href: "/executives", description: "Coaching privado para líderes" },
    { label: "Empresas", href: "/companies", description: "Programas para equipos directivos" },
    { label: "Principiantes", href: "/beginners", description: "Fast Track de 8 semanas" },
    { label: "Lecciones gratis", href: "/learn", description: "Interactivas, para principiantes" },
    { label: "Método", href: "/how-it-works" },
    { label: "Coach IA", href: "/ai-coach" },
    { label: "Programas", href: "/programs" },
    { label: "Precios", href: "/pricing" },
  ],
  secondaryNav: [
    { label: "Nosotros", href: "/about" },
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Contacto", href: "/contact" },
  ],
  footerNav: [
    {
      title: "Programas",
      items: [
        { label: "Para ejecutivos", href: "/executives" },
        { label: "Para empresas", href: "/companies" },
        { label: "Para principiantes", href: "/beginners" },
        { label: "Lecciones de inglés gratis", href: "/learn" },
        { label: "Programas", href: "/programs" },
        { label: "Precios", href: "/pricing" },
      ],
    },
    {
      title: "Enfoque",
      items: [
        { label: "Cómo funciona", href: "/how-it-works" },
        { label: "Coach de comunicación con IA", href: "/ai-coach" },
        { label: "Autoevaluación", href: "/assessment" },
        { label: "Resultados", href: "/results" },
      ],
    },
    {
      title: "Empresa",
      items: [
        { label: "Nosotros", href: "/about" },
        { label: "Preguntas frecuentes", href: "/faq" },
        { label: "Contacto", href: "/contact" },
        { label: "Acceso para clientes", href: "/sign-in" },
      ],
    },
  ],
  header: {
    mainNavLabel: "Principal",
    mobileNavLabel: "Móvil",
    signIn: "Iniciar sesión",
    clientSignIn: "Acceso para clientes",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Idioma",
    cta: "Reserve su evaluación",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    platformNote: "La plataforma de comunicación con IA está en desarrollo.",
    privacy: "Privacidad",
    credits: "Créditos fotográficos",
    proposals: "Propuestas corporativas",
  },
  skipLink: "Ir al contenido",
  logoLabel: "Executive English Performance — inicio",
  forms: {
    optional: "(opcional)",
    sending: "Enviando…",
    honeypot: "Deje este campo vacío",
    selectOne: "Seleccione una opción",
    selectRange: "Seleccione un rango",
    consent: { before: "Acepto que me contacten sobre mi solicitud. Mis datos se tratan según el", link: "aviso de privacidad", after: "." },
    submitError: "No pudimos enviar su solicitud. Inténtelo de nuevo o escríbanos directamente.",
  },
  program: {
    inDevelopment: "En desarrollo",
    flagship: "Programa insignia",
    moreIncluded: (n: number) => `+ ${n} elementos más incluidos`,
    included: "Qué incluye",
    idealFor: "Ideal para",
  },
  bandOf: (label: string, band: number) => `${label}: ${band} de 5`,
};

export type CommonCopy = typeof en;

export const commonCopy: Localized<CommonCopy> = { en, es };
