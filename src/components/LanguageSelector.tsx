import { useState } from 'react';
import { useLanguage, supportedLanguages } from '../contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

export function LanguageSelector() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLangOption = supportedLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode as any);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 text-white hover:text-blue-200 group"
        aria-label={t('common.selectLanguage')}
      >
        <span className="text-lg">{currentLangOption?.flag}</span>
        <span className="hidden sm:block text-sm">
          {currentLangOption?.nativeName}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl z-20 overflow-hidden">
            <div className="py-2">
              <div className="px-4 py-2 text-xs text-white/60 uppercase tracking-wider border-b border-white/10">
                {t('common.selectLanguage')}
              </div>
              
              {supportedLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 ${
                    currentLanguage === language.code 
                      ? 'bg-blue-500/20 text-blue-200' 
                      : 'text-white hover:text-blue-200'
                  }`}
                  aria-label={`Switch to ${language.name}`}
                >
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{language.nativeName}</div>
                    <div className="text-xs text-white/60">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Language info footer */}
            <div className="px-4 py-2 text-xs text-white/50 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Multi-language support
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}