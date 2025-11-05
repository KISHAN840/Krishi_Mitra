import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1754976645304-b27b44ddb9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwbGFuZHNjYXBlJTIwZ3JlZW4lMjBmaWVsZHN8ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-800/60 to-indigo-900/70 dark:from-slate-900/80 dark:via-slate-800/70 dark:to-blue-900/80" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Theme-aware elements */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-yellow-400/20 dark:bg-blue-400/20 rounded-full blur-lg animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-orange-400/20 dark:bg-purple-400/20 rounded-full blur-lg animate-pulse delay-700"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
          <span className="text-3xl">🌾</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-white drop-shadow-lg">
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">{t("home.title")}</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
          {t("home.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/80">
            <span className="text-sm">🚜 Smart Farm Management</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/80">
            <span className="text-sm">🌱 AI-Powered Insights</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-white/80">
            <span className="text-sm">📈 Market Intelligence</span>
          </div>
        </div>
      </div>
    </section>
  );
}