/**
 * Case-study framework.
 *
 * These entries are SAMPLE STRUCTURES ONLY. They illustrate the format and
 * must be replaced with verified client data (with written permission) before
 * they are presented as results. `isSample` drives the on-page warning label.
 */
import type { Localized } from "@/i18n/config";

export interface CaseStudy {
  slug: string;
  isSample: boolean;
  title: string;
  clientProfile: string;
  clientSituation: string;
  communicationChallenge: string;
  intervention: string;
  aiPractice: string;
  humanCoaching: string;
  observedImprovement: string;
  clientQuote: string | null;
}

const caseStudiesEn: CaseStudy[] = [
  {
    slug: "sample-engineering-director",
    isSample: true,
    title: "Explaining technical risk to an international leadership team",
    clientProfile: "[Role, industry, region — anonymized]",
    clientSituation:
      "[Example structure] An engineering director reporting monthly to a US-based leadership team on platform reliability.",
    communicationChallenge:
      "[Example structure] Updates were accurate but long; leadership questions often derailed the conversation before the key decision was reached.",
    intervention:
      "[Example structure] Restructured updates around a decision-first format and rehearsed responses to the most likely challenging questions.",
    aiPractice: "[Describe the simulations practiced once the AI platform is available, or remove this section.]",
    humanCoaching: "[Describe the coaching focus, number of sessions and key feedback themes.]",
    observedImprovement: "[Describe verified, observable change — avoid unsupported numbers.]",
    clientQuote: null,
  },
  {
    slug: "sample-sales-leader",
    isSample: true,
    title: "Negotiating renewals with enterprise clients",
    clientProfile: "[Role, industry, region — anonymized]",
    clientSituation:
      "[Example structure] A regional sales leader responsible for renewals with North American enterprise accounts.",
    communicationChallenge:
      "[Example structure] Under pricing pressure, responses became defensive and concessions came too early.",
    intervention:
      "[Example structure] Built negotiation language for anchoring, reframing and conditional concessions; rehearsed pressure scenarios.",
    aiPractice: "[Describe the simulations practiced, or remove this section.]",
    humanCoaching: "[Describe the coaching focus and key feedback themes.]",
    observedImprovement: "[Describe verified, observable change.]",
    clientQuote: null,
  },
  {
    slug: "sample-leadership-cohort",
    isSample: true,
    title: "A leadership cohort preparing for a new US headquarters",
    clientProfile: "[Company size, industry, region — anonymized]",
    clientSituation:
      "[Example structure] Following an acquisition, a group of managers began reporting to a US-based headquarters.",
    communicationChallenge:
      "[Example structure] Managers were fluent in day-to-day work but hesitant in leadership meetings and quarterly reviews.",
    intervention:
      "[Example structure] Assessment of each manager, cohort workshops on meeting communication, and individual coaching for key presenters.",
    aiPractice: "[Describe the company-specific scenarios, or remove this section.]",
    humanCoaching: "[Describe group and individual coaching structure.]",
    observedImprovement: "[Describe verified change reported by the company.]",
    clientQuote: null,
  },
];

const caseStudiesEs: CaseStudy[] = [
  {
    slug: "sample-engineering-director",
    isSample: true,
    title: "Explicar riesgos técnicos a un equipo directivo internacional",
    clientProfile: "[Rol, industria, región — anonimizados]",
    clientSituation:
      "[Estructura de ejemplo] Una directora de ingeniería que informa cada mes a un equipo directivo en EE. UU. sobre la confiabilidad de la plataforma.",
    communicationChallenge:
      "[Estructura de ejemplo] Las actualizaciones eran precisas pero largas; las preguntas de la dirección solían desviar la conversación antes de llegar a la decisión clave.",
    intervention:
      "[Estructura de ejemplo] Se reestructuraron las actualizaciones con un formato que empieza por la decisión y se ensayaron respuestas a las preguntas difíciles más probables.",
    aiPractice: "[Describa las simulaciones practicadas cuando la plataforma de IA esté disponible, o elimine esta sección.]",
    humanCoaching: "[Describa el enfoque del coaching, el número de sesiones y los temas clave de retroalimentación.]",
    observedImprovement: "[Describa un cambio verificado y observable; evite cifras sin respaldo.]",
    clientQuote: null,
  },
  {
    slug: "sample-sales-leader",
    isSample: true,
    title: "Negociar renovaciones con clientes corporativos",
    clientProfile: "[Rol, industria, región — anonimizados]",
    clientSituation:
      "[Estructura de ejemplo] Un líder comercial regional responsable de las renovaciones con cuentas corporativas de Norteamérica.",
    communicationChallenge:
      "[Estructura de ejemplo] Bajo presión de precios, las respuestas se volvían defensivas y las concesiones llegaban demasiado pronto.",
    intervention:
      "[Estructura de ejemplo] Se construyó lenguaje de negociación para anclar, reencuadrar y condicionar concesiones; se ensayaron escenarios de presión.",
    aiPractice: "[Describa las simulaciones practicadas, o elimine esta sección.]",
    humanCoaching: "[Describa el enfoque del coaching y los temas clave de retroalimentación.]",
    observedImprovement: "[Describa un cambio verificado y observable.]",
    clientQuote: null,
  },
  {
    slug: "sample-leadership-cohort",
    isSample: true,
    title: "Un grupo directivo que se prepara para una nueva casa matriz en EE. UU.",
    clientProfile: "[Tamaño de la empresa, industria, región — anonimizados]",
    clientSituation:
      "[Estructura de ejemplo] Tras una adquisición, un grupo de gerentes empezó a reportar a una casa matriz en EE. UU.",
    communicationChallenge:
      "[Estructura de ejemplo] Los gerentes se desenvolvían con fluidez en el trabajo diario, pero dudaban en reuniones de dirección y revisiones trimestrales.",
    intervention:
      "[Estructura de ejemplo] Evaluación de cada gerente, talleres grupales sobre comunicación en reuniones y coaching individual para quienes presentan.",
    aiPractice: "[Describa los escenarios específicos de la empresa, o elimine esta sección.]",
    humanCoaching: "[Describa la estructura del coaching grupal e individual.]",
    observedImprovement: "[Describa el cambio verificado que reporta la empresa.]",
    clientQuote: null,
  },
];

export const caseStudyContent: Localized<CaseStudy[]> = { en: caseStudiesEn, es: caseStudiesEs };

/** English case studies (kept for existing imports). */
export const caseStudies = caseStudiesEn;
