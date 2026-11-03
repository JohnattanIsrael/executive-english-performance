/**
 * Free interactive lessons for beginners — spec 003.
 *
 * The English being taught is the same in every locale. Instructions are
 * localized ({ en, es }); `gloss` is a Spanish translation shown only on the
 * Spanish site.
 */
import type { Localized } from "@/i18n/config";

export type Text = Localized<string>;

/** What a card, prompt or option shows besides its words. */
export interface Visual {
  emoji?: string;
  /** A CSS color, rendered as a swatch. */
  swatch?: string;
  /** An analog clock at this time. */
  clock?: { h: number; m: number };
}

export interface LessonCard extends Visual {
  term: string;
  /** Spanish translation (Spanish site only). */
  gloss: string;
  example: string;
  exampleGloss: string;
}

export interface Option extends Visual {
  label: string;
  /** Show only the visual (the label is still read by screen readers). */
  hideLabel?: boolean;
}

export type Exercise =
  | {
      kind: "choice";
      prompt: Text;
      /** An English line the learner reacts to (e.g. what someone says). */
      line?: string;
      visual?: Visual;
      options: Option[];
      answer: number;
    }
  | { kind: "listen"; prompt?: Text; say: string; options: Option[]; answer: number }
  | { kind: "order"; prompt?: Text; gloss: string; words: string[]; extra?: string[] }
  | { kind: "match"; prompt?: Text; pairs: { term: string; match: Option }[] }
  | { kind: "type"; prompt?: Text; visual?: Visual; before: string; after: string; answers: string[]; hint: Text }
  | { kind: "clock"; prompt?: Text; say: string; h: number; m: number };

export interface Lesson {
  id: string;
  emoji: string;
  /** Orbiting emoji on the lesson card. */
  orbit: [string, string, string];
  accent: { base: string; soft: string; deep: string };
  minutes: number;
  title: Text;
  summary: Text;
  skills: Localized<string[]>;
  tip: Text;
  cards: LessonCard[];
  exercises: Exercise[];
}

const ask = {
  reply: { en: "Choose the best reply.", es: "Elija la mejor respuesta." },
  complete: { en: "Complete the sentence.", es: "Complete la frase." },
  correct: { en: "Which one is correct?", es: "¿Cuál es correcta?" },
};

export const lessons: Lesson[] = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: "greetings",
    emoji: "👋",
    orbit: ["☀️", "🤝", "🙂"],
    accent: { base: "#2f6aa8", soft: "#dbe6f3", deep: "#1a3550" },
    minutes: 6,
    title: { en: "Hello! Greetings and introductions", es: "¡Hola! Saludos y presentaciones" },
    summary: {
      en: "Say hello, introduce yourself and ask how someone is.",
      es: "Salude, preséntese y pregunte a alguien cómo está.",
    },
    skills: {
      en: ["Say hello and goodbye", "Say your name", "Ask “How are you?”"],
      es: ["Saludar y despedirse", "Decir su nombre", "Preguntar “How are you?”"],
    },
    tip: {
      en: "“How are you?” is often just a greeting. A short “I’m fine, thanks. And you?” is perfect.",
      es: "“How are you?” muchas veces es solo un saludo. Un breve “I’m fine, thanks. And you?” es perfecto.",
    },
    cards: [
      { term: "Hello!", emoji: "👋", gloss: "¡Hola!", example: "Hello! I’m Sam.", exampleGloss: "¡Hola! Soy Sam." },
      { term: "Good morning", emoji: "🌅", gloss: "Buenos días", example: "Good morning, everyone.", exampleGloss: "Buenos días a todos." },
      { term: "How are you?", emoji: "🙂", gloss: "¿Cómo está?", example: "Hi Ana, how are you?", exampleGloss: "Hola, Ana, ¿cómo estás?" },
      { term: "I’m fine, thank you.", emoji: "😊", gloss: "Estoy bien, gracias.", example: "I’m fine, thank you. And you?", exampleGloss: "Estoy bien, gracias. ¿Y tú?" },
      { term: "My name is…", emoji: "🏷️", gloss: "Me llamo…", example: "My name is Carlos.", exampleGloss: "Me llamo Carlos." },
      { term: "Nice to meet you.", emoji: "🤝", gloss: "Mucho gusto.", example: "Nice to meet you, Carlos.", exampleGloss: "Mucho gusto, Carlos." },
      { term: "Goodbye!", emoji: "🚶", gloss: "¡Adiós!", example: "Goodbye! See you tomorrow.", exampleGloss: "¡Adiós! Hasta mañana." },
    ],
    exercises: [
      {
        kind: "choice",
        prompt: ask.reply,
        line: "How are you?",
        options: [{ label: "I’m fine, thank you." }, { label: "My name is Ana." }, { label: "Good night." }, { label: "Yes, please." }],
        answer: 0,
      },
      {
        kind: "listen",
        say: "Nice to meet you.",
        options: [{ label: "Nice to meet you." }, { label: "Nice to see you." }, { label: "See you later." }, { label: "Thank you." }],
        answer: 0,
      },
      { kind: "order", gloss: "Me llamo Laura.", words: ["My", "name", "is", "Laura."], extra: ["are"] },
      {
        kind: "match",
        pairs: [
          { term: "Hello!", match: { label: "👋", emoji: "👋", hideLabel: true } },
          { term: "Good morning", match: { label: "🌅", emoji: "🌅", hideLabel: true } },
          { term: "Good night", match: { label: "🌙", emoji: "🌙", hideLabel: true } },
          { term: "Thank you", match: { label: "🙏", emoji: "🙏", hideLabel: true } },
        ],
      },
      {
        kind: "type",
        before: "Nice to",
        after: "you.",
        answers: ["meet"],
        hint: { en: "You say it the first time you meet someone.", es: "Mucho gusto = Nice to … you." },
      },
      {
        kind: "choice",
        prompt: { en: "It’s 8 a.m. at the office. What do you say?", es: "Son las 8 a. m. en la oficina. ¿Qué dice?" },
        visual: { emoji: "🏢" },
        options: [{ label: "Good morning!" }, { label: "Good night!" }, { label: "Goodbye!" }, { label: "Good evening!" }],
        answer: 0,
      },
      { kind: "order", gloss: "¿Cómo estás hoy?", words: ["How", "are", "you", "today?"], extra: ["is"] },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: "numbers-time",
    emoji: "🕒",
    orbit: ["7️⃣", "⏰", "🔢"],
    accent: { base: "#a86a1f", soft: "#f6ecd9", deep: "#5a3a10" },
    minutes: 8,
    title: { en: "Numbers and telling the time", es: "Números y la hora" },
    summary: {
      en: "Count, hear the difference between 15 and 50, and say what time it is.",
      es: "Cuente, distinga 15 de 50 y diga qué hora es.",
    },
    skills: {
      en: ["Numbers 1–100", "“-teen” or “-ty”?", "O’clock, half past, quarter past"],
      es: ["Números del 1 al 100", "¿“-teen” o “-ty”?", "En punto, y media, y cuarto"],
    },
    tip: {
      en: "Fifteen and fifty sound similar. In “fif-TEEN” the stress is at the end; in “FIF-ty” it’s at the start.",
      es: "Fifteen y fifty suenan parecido. En “fif-TEEN” el acento va al final; en “FIF-ty”, al principio.",
    },
    cards: [
      { term: "one, two, three", emoji: "🔢", gloss: "uno, dos, tres", example: "I have two brothers.", exampleGloss: "Tengo dos hermanos." },
      { term: "fifteen — 15", emoji: "1️⃣", gloss: "quince", example: "The meeting is in fifteen minutes.", exampleGloss: "La reunión es en quince minutos." },
      { term: "fifty — 50", emoji: "5️⃣", gloss: "cincuenta", example: "It costs fifty dollars.", exampleGloss: "Cuesta cincuenta dólares." },
      { term: "What time is it?", emoji: "⏰", gloss: "¿Qué hora es?", example: "Excuse me, what time is it?", exampleGloss: "Disculpe, ¿qué hora es?" },
      { term: "It’s three o’clock.", clock: { h: 3, m: 0 }, gloss: "Son las tres en punto.", example: "The class starts at three o’clock.", exampleGloss: "La clase empieza a las tres en punto." },
      { term: "It’s half past six.", clock: { h: 6, m: 30 }, gloss: "Son las seis y media.", example: "Dinner is at half past six.", exampleGloss: "La cena es a las seis y media." },
      { term: "It’s a quarter past nine.", clock: { h: 9, m: 15 }, gloss: "Son las nueve y cuarto.", example: "The bus leaves at a quarter past nine.", exampleGloss: "El autobús sale a las nueve y cuarto." },
    ],
    exercises: [
      {
        kind: "match",
        pairs: [
          { term: "seven", match: { label: "7" } },
          { term: "three", match: { label: "3" } },
          { term: "twelve", match: { label: "12" } },
          { term: "twenty", match: { label: "20" } },
        ],
      },
      { kind: "listen", say: "fifteen", options: [{ label: "15" }, { label: "50" }, { label: "5" }, { label: "13" }], answer: 0 },
      { kind: "clock", say: "It’s four o’clock.", h: 4, m: 0 },
      {
        kind: "choice",
        prompt: { en: "What time is it?", es: "¿Qué hora es?" },
        visual: { clock: { h: 6, m: 30 } },
        options: [
          { label: "It’s half past six." },
          { label: "It’s six o’clock." },
          { label: "It’s half past seven." },
          { label: "It’s a quarter past six." },
        ],
        answer: 0,
      },
      { kind: "listen", say: "thirty", options: [{ label: "30" }, { label: "13" }, { label: "3" }, { label: "33" }], answer: 0 },
      { kind: "clock", say: "It’s half past two.", h: 2, m: 30 },
      {
        kind: "type",
        visual: { emoji: "⏰" },
        before: "What",
        after: "is it?",
        answers: ["time"],
        hint: { en: "You ask this when you want to know the hour.", es: "¿Qué hora es? = What … is it?" },
      },
      { kind: "order", gloss: "Son las nueve y cuarto.", words: ["It’s", "a", "quarter", "past", "nine."], extra: ["to"] },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: "verb-to-be",
    emoji: "🙋",
    orbit: ["👩", "👫", "👥"],
    accent: { base: "#2f6f52", soft: "#e3efe8", deep: "#173a2a" },
    minutes: 7,
    title: { en: "I am, you are: the verb “to be”", es: "I am, you are: el verbo “to be”" },
    summary: {
      en: "The most useful verb in English — for who you are, how you feel and where you are.",
      es: "El verbo más útil del inglés: para decir quién es, cómo se siente y dónde está.",
    },
    skills: {
      en: ["I am, you are, he is…", "Short forms: I’m, you’re", "Short answers: Yes, I am."],
      es: ["I am, you are, he is…", "Formas cortas: I’m, you’re", "Respuestas cortas: Yes, I am."],
    },
    tip: {
      en: "One verb, many uses: “I am a nurse”, “I am tired”, “I am at home”.",
      es: "En inglés, “to be” es a la vez ser y estar: “I am a nurse” (soy), “I am tired” (estoy).",
    },
    cards: [
      { term: "I am → I’m", emoji: "🙋", gloss: "yo soy / estoy", example: "I’m a nurse.", exampleGloss: "Soy enfermera." },
      { term: "you are → you’re", emoji: "👉", gloss: "tú eres / estás", example: "You’re early!", exampleGloss: "¡Llegas temprano!" },
      { term: "he is → he’s", emoji: "👨", gloss: "él es / está", example: "He’s my brother.", exampleGloss: "Es mi hermano." },
      { term: "she is → she’s", emoji: "👩", gloss: "ella es / está", example: "She’s at work.", exampleGloss: "Ella está en el trabajo." },
      { term: "it is → it’s", emoji: "🌧️", gloss: "es / está (cosa, clima)", example: "It’s cold today.", exampleGloss: "Hace frío hoy." },
      { term: "we are → we’re", emoji: "👫", gloss: "nosotros somos / estamos", example: "We’re from Mexico.", exampleGloss: "Somos de México." },
      { term: "they are → they’re", emoji: "👥", gloss: "ellos son / están", example: "They’re very happy.", exampleGloss: "Están muy contentos." },
    ],
    exercises: [
      {
        kind: "choice",
        prompt: ask.complete,
        line: "She ___ a teacher.",
        options: [{ label: "is" }, { label: "am" }, { label: "are" }, { label: "be" }],
        answer: 0,
      },
      {
        kind: "match",
        pairs: [
          { term: "I am", match: { label: "I’m" } },
          { term: "you are", match: { label: "you’re" } },
          { term: "he is", match: { label: "he’s" } },
          { term: "they are", match: { label: "they’re" } },
        ],
      },
      {
        kind: "type",
        visual: { emoji: "🇨🇴" },
        before: "We",
        after: "from Colombia.",
        answers: ["are"],
        hint: { en: "we + ?", es: "nosotros somos = we …" },
      },
      { kind: "order", gloss: "Ellos son mis amigos.", words: ["They", "are", "my", "friends."], extra: ["is"] },
      {
        kind: "choice",
        prompt: ask.correct,
        options: [{ label: "I am happy." }, { label: "I is happy." }, { label: "I are happy." }, { label: "Me am happy." }],
        answer: 0,
      },
      {
        kind: "listen",
        say: "He’s at home.",
        options: [{ label: "He’s at home." }, { label: "She’s at home." }, { label: "He’s at work." }, { label: "We’re at home." }],
        answer: 0,
      },
      {
        kind: "choice",
        prompt: ask.reply,
        line: "Are you a student?",
        options: [{ label: "Yes, I am." }, { label: "Yes, I’m." }, { label: "Yes, I is." }, { label: "Yes, you are." }],
        answer: 0,
      },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: "colors-things",
    emoji: "🎨",
    orbit: ["🍎", "📘", "🍋"],
    accent: { base: "#b0455c", soft: "#f6e1e6", deep: "#5c1f2e" },
    minutes: 6,
    title: { en: "Colors and everyday things", es: "Colores y objetos cotidianos" },
    summary: {
      en: "Name colors and things around you — and put the color in the right place.",
      es: "Nombre colores y objetos a su alrededor, y ponga el color en el lugar correcto.",
    },
    skills: {
      en: ["Six basic colors", "Everyday objects", "a red car — color first"],
      es: ["Seis colores básicos", "Objetos cotidianos", "a red car: el color va primero"],
    },
    tip: {
      en: "In English the color comes before the thing: “a black phone”, never “a phone black”.",
      es: "En inglés el color va antes del objeto: “a black phone”, nunca “a phone black”.",
    },
    cards: [
      { term: "red", swatch: "#d64545", emoji: "🍎", gloss: "rojo", example: "The apple is red.", exampleGloss: "La manzana es roja." },
      { term: "blue", swatch: "#3567c4", emoji: "🌊", gloss: "azul", example: "The sea is blue.", exampleGloss: "El mar es azul." },
      { term: "green", swatch: "#3f9a5b", emoji: "🌿", gloss: "verde", example: "I like green tea.", exampleGloss: "Me gusta el té verde." },
      { term: "yellow", swatch: "#f2c230", emoji: "🍋", gloss: "amarillo", example: "A yellow taxi, please.", exampleGloss: "Un taxi amarillo, por favor." },
      { term: "black", swatch: "#1d1f24", emoji: "📱", gloss: "negro", example: "I have a black phone.", exampleGloss: "Tengo un teléfono negro." },
      { term: "white", swatch: "#ffffff", emoji: "☕", gloss: "blanco", example: "A white cup of coffee.", exampleGloss: "Una taza blanca de café." },
      { term: "a book", emoji: "📘", gloss: "un libro", example: "This is my English book.", exampleGloss: "Este es mi libro de inglés." },
      { term: "a key", emoji: "🔑", gloss: "una llave", example: "Where is my key?", exampleGloss: "¿Dónde está mi llave?" },
    ],
    exercises: [
      {
        kind: "choice",
        prompt: { en: "Tap the color green.", es: "Toque el color green (verde)." },
        options: [
          { label: "green", swatch: "#3f9a5b", hideLabel: true },
          { label: "red", swatch: "#d64545", hideLabel: true },
          { label: "blue", swatch: "#3567c4", hideLabel: true },
          { label: "yellow", swatch: "#f2c230", hideLabel: true },
        ],
        answer: 0,
      },
      {
        kind: "listen",
        say: "yellow",
        options: [
          { label: "yellow", swatch: "#f2c230", hideLabel: true },
          { label: "white", swatch: "#ffffff", hideLabel: true },
          { label: "green", swatch: "#3f9a5b", hideLabel: true },
          { label: "black", swatch: "#1d1f24", hideLabel: true },
        ],
        answer: 0,
      },
      {
        kind: "match",
        pairs: [
          { term: "red", match: { label: "🍓", emoji: "🍓", hideLabel: true } },
          { term: "yellow", match: { label: "🍌", emoji: "🍌", hideLabel: true } },
          { term: "green", match: { label: "🥦", emoji: "🥦", hideLabel: true } },
          { term: "blue", match: { label: "💙", emoji: "💙", hideLabel: true } },
        ],
      },
      { kind: "order", gloss: "Tengo un teléfono negro.", words: ["I", "have", "a", "black", "phone."], extra: ["the"] },
      {
        kind: "choice",
        prompt: ask.correct,
        visual: { emoji: "☕" },
        options: [{ label: "a white cup" }, { label: "a cup white" }, { label: "white a cup" }, { label: "an white cup" }],
        answer: 0,
      },
      {
        kind: "type",
        visual: { emoji: "🍌" },
        before: "The banana is",
        after: ".",
        answers: ["yellow"],
        hint: { en: "The same color as the sun in a drawing.", es: "amarillo = …" },
      },
      {
        kind: "choice",
        prompt: { en: "What is it?", es: "¿Qué es?" },
        visual: { emoji: "🔑" },
        options: [{ label: "It’s a key." }, { label: "It’s a book." }, { label: "It’s a phone." }, { label: "It’s a cup." }],
        answer: 0,
      },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id: "cafe",
    emoji: "☕",
    orbit: ["🥪", "🍵", "💵"],
    accent: { base: "#6b4fa3", soft: "#ebe5f5", deep: "#33245a" },
    minutes: 7,
    title: { en: "At the café: ordering food and drinks", es: "En la cafetería: pedir comida y bebidas" },
    summary: {
      en: "Order politely, ask the price and answer the questions a server asks.",
      es: "Pida con cortesía, pregunte el precio y responda a lo que pregunta quien le atiende.",
    },
    skills: {
      en: ["Can I have…? / I’d like…", "How much is it?", "Anything else? — No, thank you."],
      es: ["Can I have…? / I’d like…", "How much is it?", "Anything else? — No, thank you."],
    },
    tip: {
      en: "“Please” and “thank you” do a lot of work in English. Add “please” at the end of a request.",
      es: "En inglés, “please” y “thank you” se usan mucho. Añada “please” al final de lo que pide.",
    },
    cards: [
      { term: "coffee", emoji: "☕", gloss: "café", example: "A black coffee, please.", exampleGloss: "Un café solo, por favor." },
      { term: "tea", emoji: "🍵", gloss: "té", example: "Do you have green tea?", exampleGloss: "¿Tiene té verde?" },
      { term: "water", emoji: "💧", gloss: "agua", example: "A glass of water, please.", exampleGloss: "Un vaso de agua, por favor." },
      { term: "a sandwich", emoji: "🥪", gloss: "un sándwich", example: "I’d like a chicken sandwich.", exampleGloss: "Quisiera un sándwich de pollo." },
      { term: "Can I have…?", emoji: "🙋", gloss: "¿Me da…?", example: "Can I have a tea, please?", exampleGloss: "¿Me da un té, por favor?" },
      { term: "How much is it?", emoji: "💵", gloss: "¿Cuánto cuesta?", example: "Excuse me, how much is it?", exampleGloss: "Disculpe, ¿cuánto cuesta?" },
      { term: "Here you are.", emoji: "🤲", gloss: "Aquí tiene.", example: "Here you are. Enjoy!", exampleGloss: "Aquí tiene. ¡Que lo disfrute!" },
      { term: "Anything else?", emoji: "➕", gloss: "¿Algo más?", example: "Anything else? — No, thank you.", exampleGloss: "¿Algo más? — No, gracias." },
    ],
    exercises: [
      {
        kind: "choice",
        prompt: ask.reply,
        line: "Hi! What can I get you?",
        visual: { emoji: "🧑‍🍳" },
        options: [
          { label: "Can I have a coffee, please?" },
          { label: "I am a coffee, please." },
          { label: "Give coffee." },
          { label: "Where is coffee you?" },
        ],
        answer: 0,
      },
      { kind: "order", gloss: "Quisiera un té, por favor.", words: ["I’d", "like", "a", "tea,", "please."], extra: ["am"] },
      {
        kind: "listen",
        say: "How much is it?",
        options: [{ label: "How much is it?" }, { label: "How many is it?" }, { label: "How are you?" }, { label: "What time is it?" }],
        answer: 0,
      },
      {
        kind: "match",
        pairs: [
          { term: "coffee", match: { label: "☕", emoji: "☕", hideLabel: true } },
          { term: "tea", match: { label: "🍵", emoji: "🍵", hideLabel: true } },
          { term: "water", match: { label: "💧", emoji: "💧", hideLabel: true } },
          { term: "sandwich", match: { label: "🥪", emoji: "🥪", hideLabel: true } },
        ],
      },
      {
        kind: "choice",
        prompt: ask.reply,
        line: "Anything else?",
        options: [{ label: "No, thank you." }, { label: "Yes, I’m fine." }, { label: "It’s three o’clock." }, { label: "Goodbye, coffee." }],
        answer: 0,
      },
      {
        kind: "type",
        visual: { emoji: "🤲" },
        before: "",
        after: "you are. That’s $4.50.",
        answers: ["here"],
        hint: { en: "What you say when you give something to someone.", es: "Aquí tiene = … you are." },
      },
      {
        kind: "listen",
        prompt: { en: "Listen to the price. How much is it?", es: "Escuche el precio. ¿Cuánto cuesta?" },
        say: "That’s four dollars and fifty cents.",
        options: [{ label: "$4.50" }, { label: "$4.15" }, { label: "$14.50" }, { label: "$40.50" }],
        answer: 0,
      },
    ],
  },
];

export function getLesson(id: string) {
  return lessons.find((l) => l.id === id);
}
