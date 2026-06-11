"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Locale, Dictionary } from "./types";
import { pt } from "./dictionaries/pt";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";

const DICTIONARIES: Record<Locale, Dictionary> = { pt, en, es };
const STORAGE_KEY = "yc-locale";
const DEFAULT_LOCALE: Locale = "pt";

type LanguageContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  d: Dictionary;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  d: pt,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && stored in DICTIONARIES) setLocaleState(stored);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, d: DICTIONARIES[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
