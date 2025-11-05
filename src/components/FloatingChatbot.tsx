import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";
import { 
  generateChatResponse, 
  ChatMessage, 
  getWelcomeMessage, 
  detectLanguage,
  FARMING_QUICK_TIPS 
} from "../services/huggingFaceApi";

export function FloatingChatbot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickTips, setShowQuickTips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize welcome messages when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeEn = getWelcomeMessage('en');
      const welcomeHi = getWelcomeMessage('hi');
      setMessages([welcomeEn, welcomeHi]);
    }
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
      language: detectLanguage(inputMessage)
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);
    setShowQuickTips(false);

    try {
      const response = await generateChatResponse(userMessage.text, messages);
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: response.message,
        isUser: false,
        timestamp: new Date(),
        language: userMessage.language
      };

      setMessages([...newMessages, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "🔄 Sorry, I'm having trouble connecting right now. Please try asking your question again, or check our other farming resources in the app.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickTip = async (tip: typeof FARMING_QUICK_TIPS[0]) => {
    setShowQuickTips(false);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: tip.message,
      isUser: true,
      timestamp: new Date()
    };

    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      text: tip.response,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-4 w-80 h-[500px] modern-card rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1710170909047-135c7a010e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhZ3JpY3VsdHVyZSUyMGV4cGVydCUyMG1hbGV8ZW58MXx8fHwxNzU3MDE2NDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Agricultural Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white">{t("chatbot.title")}</h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white/90 text-xs">Live Assistant</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-white/90 text-sm mt-1">🇮🇳 Hindi & English Support • Powered by AI</p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 dark:bg-slate-800 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Tips */}
            {showQuickTips && messages.length <= 2 && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                  💡 Quick farming tips:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {FARMING_QUICK_TIPS.map((tip, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickTip(tip)}
                      className="text-xs p-2 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg border border-emerald-200 dark:border-emerald-600/30 text-emerald-700 dark:text-emerald-300 transition-colors"
                    >
                      {tip.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 shrink-0">
            <div className="flex gap-2">
              <input 
                ref={inputRef}
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t("chatbot.placeholder")}
                disabled={isLoading}
                className="flex-1 bg-slate-100 dark:bg-slate-600 rounded-lg px-3 py-2 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 border border-slate-200 dark:border-slate-500 focus:border-blue-500 focus:outline-none disabled:opacity-50"
              />
              <Button 
                size="sm" 
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {isLoading ? t("chatbot.thinking") : t("chatbot.send")}
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative"
      >
        <div className="flex items-center justify-center">
          {isOpen ? (
            <span className="text-2xl">✕</span>
          ) : (
            <>
              <span className="text-xl">🤖</span>
              <span className="text-lg ml-1">💬</span>
            </>
          )}
        </div>
        {/* Live indicator */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </Button>
    </div>
  );
}