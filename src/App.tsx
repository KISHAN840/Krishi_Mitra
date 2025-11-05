import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Router, Page } from "./components/Router";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { LanguageProvider } from "./contexts/LanguageContext";
import { FarmDataProvider } from "./contexts/FarmDataContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Set dark mode as default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Log API status on app load
  useEffect(() => {
    console.log('🌾 KrishiMitra - Smart Farming Dashboard');
    console.log('📡 API Status:');
    console.log('  ✅ Weather API: Live OpenWeatherMap data (99fdd4cb...)');
    console.log('  ✅ Chatbot AI: Live Hugging Face DialoGPT');
    console.log('  🔄 Market API: Mock data (replace with real endpoints)');
    console.log('  ⚡ Auto-refresh: Enabled (5 min intervals)');
    console.log('🌐 Live Features:');
    console.log('  - Real-time weather & forecasts');
    console.log('  - AI-powered agricultural chatbot');
    console.log('  - Smart weather alerts');
    console.log('  - UV index monitoring');
  }, []);

  return (
    <LanguageProvider>
      <FarmDataProvider>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-100 dark:from-slate-900 dark:via-emerald-950 dark:to-blue-950 relative">
      {/* Custom Styles */}
      <style>{`
        .modern-gradient {
          background: linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #dbeafe 100%);
        }
        
        .dark .modern-gradient {
          background: linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #1e40af 100%);
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .dark .glass-effect {
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.1);
        }
        
        .glow-effect {
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15), 0 0 40px rgba(59, 130, 246, 0.05);
        }
        
        .glow-effect:hover {
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.25), 0 0 60px rgba(59, 130, 246, 0.1);
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        .modern-card {
          background: rgba(240, 253, 250, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(20, 184, 166, 0.2);
          box-shadow: 0 4px 16px rgba(6, 182, 212, 0.08);
        }
        
        .dark .modern-card {
          background: rgba(6, 78, 59, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(20, 184, 166, 0.3);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }
        
        .crop-card-glow {
          box-shadow: 
            0 4px 20px rgba(16, 185, 129, 0.15),
            0 0 40px rgba(34, 197, 94, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .crop-card-glow:hover {
          box-shadow: 
            0 8px 30px rgba(16, 185, 129, 0.25),
            0 0 60px rgba(34, 197, 94, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
      `}</style>
      
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
      
      <main>
        <Router currentPage={currentPage} onPageChange={setCurrentPage} />
      </main>
          
          <FloatingChatbot />
        </div>
      </FarmDataProvider>
    </LanguageProvider>
  );
}