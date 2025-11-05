import React, { createContext, useContext, useState, useEffect } from 'react';

// Import all translations statically
import enTranslations from '../translations/en';
import hiTranslations from '../translations/hi';
import paTranslations from '../translations/pa';
import taTranslations from '../translations/ta';
import guTranslations from '../translations/gu';

export type Language = 'en' | 'hi' | 'pa' | 'ta' | 'gu';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
];

// Create translations map
const translationsMap: Record<Language, Record<string, any>> = {
  en: enTranslations,
  hi: hiTranslations,
  pa: paTranslations,
  ta: taTranslations,
  gu: guTranslations,
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get saved language from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('krishimitra-language');
      if (saved && supportedLanguages.some(lang => lang.code === saved)) {
        return saved as Language;
      }
      
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (supportedLanguages.some(lang => lang.code === browserLang)) {
        return browserLang as Language;
      }
    }
    
    return 'en'; // Default fallback
  });

  const [translations, setTranslations] = useState<Record<string, any>>(() => {
    // Initialize with the default language translations
    return translationsMap[currentLanguage] || translationsMap.en;
  });

  // Load translations when language changes
  useEffect(() => {
    const newTranslations = translationsMap[currentLanguage] || translationsMap.en;
    setTranslations(newTranslations);
  }, [currentLanguage]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('krishimitra-language', language);
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${currentLanguage}"`);
        return key; // Return key as fallback
      }
    }
    
    if (typeof value !== 'string') {
      console.warn(`Translation value for "${key}" is not a string`);
      return key;
    }
    
    // Replace parameters if provided
    if (params) {
      return value.replace(/\{\{(\w+)\}\}/g, (match: string, paramKey: string) => {
        return params[paramKey]?.toString() || match;
      });
    }
    
    return value;
  };

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages: supportedLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};