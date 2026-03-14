'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'he' | 'en';

type LanguageContextValue = {
  lang: Lang;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'he',
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he');

  // On mount: read from localStorage and apply to document
  useEffect(() => {
    const stored = localStorage.getItem('siteforge-lang') as Lang | null;
    const initial: Lang = stored === 'en' ? 'en' : 'he';
    applyLang(initial);
    setLang(initial);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next: Lang = prev === 'he' ? 'en' : 'he';
      localStorage.setItem('siteforge-lang', next);
      applyLang(next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

function applyLang(lang: Lang) {
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
