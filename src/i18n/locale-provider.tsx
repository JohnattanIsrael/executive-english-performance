"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./config";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Rendered by each root layout so client components can read the page language. */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
