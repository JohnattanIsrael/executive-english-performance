/**
 * Public-facing scenario text in other languages (titles and briefs shown on
 * the AI coach page and in self-assessment results). Scripts, objectives and
 * skills stay with the scenario data in src/mocks/scenarios.ts.
 */
import type { Locale } from "@/i18n/config";
import type { Scenario } from "@/lib/types";

type ScenarioText = Pick<Scenario, "title" | "situation" | "counterpart">;

const es: Record<string, ScenarioText> = {
  "present-q4-results": {
    title: "Presentar los resultados del cuarto trimestre",
    situation: "Su casa matriz en EE. UU. cuestiona por qué su departamento no alcanzó el objetivo.",
    counterpart: "VP regional, casa matriz en EE. UU.",
  },
  "negotiate-contract": {
    title: "Negociar un contrato",
    situation: "Un cliente quiere una reducción del 15 % en el precio.",
    counterpart: "Director de compras de una cuenta clave",
  },
  "challenge-proposal": {
    title: "Cuestionar una propuesta",
    situation: "Usted no está de acuerdo con la recomendación de un alto ejecutivo.",
    counterpart: "Director de operaciones (COO)",
  },
  "explain-technical-incident": {
    title: "Explicar un incidente técnico",
    situation: "Explique una caída del sistema en producción a una dirección no técnica.",
    counterpart: "CEO y director comercial",
  },
  "lead-weekly-meeting": {
    title: "Dirigir una reunión de un equipo internacional",
    situation: "Dos miembros sénior del equipo se interrumpen constantemente y la reunión se está alargando.",
    counterpart: "Gerente de proyecto sénior",
  },
  "interrupt-diplomatically": {
    title: "Intervenir en una reunión de dirección con mucho ritmo",
    situation: "La conversación avanza rápido y su perspectiva no está en la decisión.",
    counterpart: "Equipo directivo (EE. UU. y EMEA)",
  },
  "board-qa": {
    title: "Responder preguntas difíciles tras un informe al consejo",
    situation: "Un consejero cuestiona los supuestos de su proyección de crecimiento.",
    counterpart: "Consejero independiente",
  },
  "discovery-call": {
    title: "Dirigir una llamada comercial de descubrimiento",
    situation: "Un prospecto aceptó una llamada de 20 minutos, pero es escéptico y tiene poco tiempo.",
    counterpart: "Director de operaciones de un posible cliente",
  },
  "client-escalation": {
    title: "Responder a la queja escalada de un cliente",
    situation: "Un cliente importante está molesto por una fecha de entrega incumplida.",
    counterpart: "Director de cuenta del cliente",
  },
  "senior-interview": {
    title: "Entrevista para un puesto directivo internacional",
    situation: "Entrevista final con el ejecutivo que contrata un puesto de director regional.",
    counterpart: "Director global de operaciones",
  },
  "conference-networking": {
    title: "Hacer networking en una conferencia del sector",
    situation: "Conoce a un posible socio durante una pausa para el café y tiene cinco minutos.",
    counterpart: "Alto ejecutivo de una posible empresa socia",
  },
  "vision-to-team": {
    title: "Comunicar un cambio de estrategia a su equipo",
    situation: "La dirección cambió las prioridades y su equipo perderá un proyecto que le importa.",
    counterpart: "Su equipo (internacional, remoto)",
  },
  "architecture-tradeoff": {
    title: "Defender una decisión de arquitectura",
    situation: "Un líder de producto quiere saltarse una inversión en la plataforma para lanzar una función más rápido.",
    counterpart: "VP de Producto",
  },
  "quarterly-business-review": {
    title: "Dirigir una revisión trimestral de negocio",
    situation: "Presente resultados a un cliente que está considerando ampliar el contrato.",
    counterpart: "VP del cliente y responsable de compras",
  },
};

const translations: Record<Exclude<Locale, "en">, Record<string, ScenarioText>> = { es };

export function localizeScenario(scenario: Scenario, locale: Locale): Scenario {
  if (locale === "en") return scenario;
  return { ...scenario, ...translations[locale][scenario.id] };
}
