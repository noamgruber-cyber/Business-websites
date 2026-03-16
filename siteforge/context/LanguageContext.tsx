'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'he' | 'en' | 'ar' | 'ru' | 'am' | 'fr';

const RTL_LANGS: Lang[] = ['he', 'ar'];

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** @deprecated use setLang — kept for backward compat */
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'he',
  setLang: () => {},
  toggleLang: () => {},
});

function detectBrowserLang(): Lang {
  if (typeof navigator === 'undefined') return 'he';
  const nav = navigator.language || '';
  const base = nav.split('-')[0].toLowerCase();
  if (base === 'he') return 'he';
  if (base === 'ar') return 'ar';
  if (base === 'ru') return 'ru';
  if (base === 'am') return 'am';
  if (base === 'fr') return 'fr';
  if (base === 'en') return 'en';
  return 'he'; // default for Israel
}

const VALID_LANGS: Lang[] = ['he', 'en', 'ar', 'ru', 'am', 'fr'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('he');

  // On mount: read from localStorage or detect from browser
  useEffect(() => {
    const stored = localStorage.getItem('siteforge-lang') as Lang | null;
    const initial: Lang =
      stored && VALID_LANGS.includes(stored) ? stored : detectBrowserLang();
    applyLang(initial);
    setLangState(initial);
  }, []);

  const setLang = (next: Lang) => {
    if (!VALID_LANGS.includes(next)) return;
    localStorage.setItem('siteforge-lang', next);
    applyLang(next);
    setLangState(next);
  };

  // Backward-compat toggle: cycles he ↔ en
  const toggleLang = () => setLang(lang === 'he' ? 'en' : 'he');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

function applyLang(lang: Lang) {
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
