import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale, Localized } from "@/i18n/config";
import type { PriceSpec } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

/** Prefix a public asset path with the deployment base path (next/link does this for routes). */
export function asset(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const plain = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatCurrency(value: number) {
  return usd.format(value);
}

const priceWords: Localized<{ from: string; custom: string; soon: string; periods: Record<string, string> }> = {
  en: { from: "From", custom: "Custom pricing", soon: "Coming soon", periods: {} },
  es: { from: "Desde", custom: "Precio a medida", soon: "Próximamente", periods: { year: "año", month: "mes" } },
};

/**
 * Display price for a program. English: "$2,500–$5,000"; Spanish (spec 001,
 * FR-10) keeps USD explicit: "USD 2,500–5,000", "Desde USD 5,000".
 */
export function formatPrice(price: PriceSpec, locale: Locale = "en"): { amount: string; period?: string } {
  const words = priceWords[locale];
  const plus = price.openEnded ? "+" : "";
  const period = price.period ? (words.periods[price.period] ?? price.period) : undefined;
  const money = (v: number) => (locale === "en" ? formatCurrency(v) : `USD ${plain.format(v)}`);
  switch (price.display) {
    case "range":
      return {
        amount:
          locale === "en"
            ? `${money(price.min ?? 0)}–${money(price.max ?? 0)}${plus}`
            : `USD ${plain.format(price.min ?? 0)}–${plain.format(price.max ?? 0)}${plus}`,
        period,
      };
    case "from":
      return { amount: `${words.from} ${money(price.min ?? 0)}`, period };
    case "custom":
      return { amount: price.label ?? words.custom };
    case "soon":
      return { amount: price.label ?? words.soon };
  }
}

export function uid(prefix = "id") {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now().toString(36)}${rand}`;
}

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return dateTimeFmt.format(new Date(iso));
}

/** Safe localStorage access for static export (no window during prerender). */
export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode, quota) — non-critical */
    }
  },
};
