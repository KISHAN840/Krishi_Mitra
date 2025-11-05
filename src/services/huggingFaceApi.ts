// Hugging Face API Service for KrishiMitra Agricultural Assistant
const HF_TOKEN = import.meta.env.VITE_HF_TOKEN || '';
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: 'en' | 'hi';
}

export interface ChatResponse {
  message: string;
  error?: string;
}

// Agricultural context and system prompt
const AGRICULTURAL_CONTEXT = `You are KrishiMitra AI, an expert agricultural assistant for Indian farmers. You provide practical, actionable advice about:

🌾 CROP MANAGEMENT: Planting, growth stages, harvesting, crop rotation, yield optimization
🌦️ WEATHER & IRRIGATION: Weather analysis, irrigation scheduling, drought/flood management  
🐛 PEST & DISEASE: Identification, prevention, organic/chemical treatments, integrated pest management
🌱 SOIL HEALTH: Soil testing, fertilization, organic farming, composting, soil improvement
📈 MARKET INTELLIGENCE: Price trends, market analysis, selling strategies, storage techniques
🚜 FARM TECHNOLOGY: Modern farming equipment, precision agriculture, digital tools

COMMUNICATION STYLE:
- Use simple, practical language that farmers can understand
- Provide specific, actionable advice with step-by-step instructions
- Include seasonal considerations and regional variations for India
- Use emojis appropriately to make responses engaging
- Support both English and Hindi languages
- Focus on cost-effective, sustainable farming practices
- Include safety warnings when discussing chemicals or equipment

RESPONSE FORMAT:
- Keep responses concise but comprehensive (2-4 sentences)
- Use bullet points for multiple recommendations
- Mention specific timeframes when relevant
- Include approximate costs when discussing inputs/equipment
- Suggest alternatives for different budget levels

Always prioritize farmer safety, environmental sustainability, and economic viability in your advice.`;

// Function to enhance user queries with agricultural context
function enhanceQuery(userMessage: string): string {
  const agriculturalKeywords = [
    'crop', 'farming', 'agriculture', 'harvest', 'plant', 'soil', 'fertilizer',
    'pest', 'disease', 'irrigation', 'weather', 'seeds', 'organic', 'yield',
    'market', 'price', 'storage', 'tractor', 'farming equipment'
  ];
  
  const isAgriculturalQuery = agriculturalKeywords.some(keyword => 
    userMessage.toLowerCase().includes(keyword)
  );
  
  if (isAgriculturalQuery) {
    return `${AGRICULTURAL_CONTEXT}\n\nFarmer's Question: ${userMessage}\n\nProvide a helpful, practical response as KrishiMitra AI:`;
  }
  
  return `${AGRICULTURAL_CONTEXT}\n\nUser Message: ${userMessage}\n\nAs KrishiMitra AI, provide relevant agricultural guidance or ask how you can help with farming-related questions:`;
}

// Function to call Hugging Face API
export async function generateChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    // Create conversation context from history
    let conversationContext = '';
    if (conversationHistory.length > 0) {
      const lastFewMessages = conversationHistory.slice(-4); // Keep last 4 messages for context
      conversationContext = lastFewMessages
        .map(msg => `${msg.isUser ? 'Farmer' : 'KrishiMitra'}: ${msg.text}`)
        .join('\n');
    }
    
    const enhancedQuery = enhanceQuery(userMessage);
    const fullPrompt = conversationContext 
      ? `${enhancedQuery}\n\nRecent conversation:\n${conversationContext}\n\nNew question: ${userMessage}`
      : enhancedQuery;

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.7,
          do_sample: true,
          top_p: 0.9,
          repetition_penalty: 1.1,
          return_full_text: false
        },
        options: {
          wait_for_model: true,
          use_cache: false
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HF API Error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      let aiResponse = data[0].generated_text || data[0].text || '';
      
      // Clean up the response
      aiResponse = aiResponse.trim();
      
      // Remove any repetitive or incomplete sentences
      const sentences = aiResponse.split('.').filter((s: { trim: () => { (): any; new(): any; length: number; }; }) => s.trim().length > 10);
      if (sentences.length > 3) {
        aiResponse = sentences.slice(0, 3).join('.') + '.';
      }
      
      // Add agricultural context if the response seems too generic
      if (aiResponse.length < 50 || !containsAgriculturalTerms(aiResponse)) {
        aiResponse = generateFallbackResponse(userMessage);
      }
      
      return {
        message: aiResponse || generateFallbackResponse(userMessage)
      };
    } else {
      return {
        message: generateFallbackResponse(userMessage)
      };
    }
  } catch (error) {
    console.error('Hugging Face API error:', error);
    
    // Return contextual fallback response
    return {
      message: generateFallbackResponse(userMessage),
      error: error instanceof Error ? error.message : 'API call failed'
    };
  }
}

// Helper function to check if response contains agricultural terms
function containsAgriculturalTerms(text: string): boolean {
  const agriTerms = [
    'crop', 'farm', 'soil', 'plant', 'harvest', 'irrigation', 'fertilizer',
    'pest', 'seed', 'agriculture', 'yield', 'farming', 'organic', 'weather'
  ];
  return agriTerms.some(term => text.toLowerCase().includes(term));
}

// Generate contextual fallback responses
function generateFallbackResponse(userMessage: string): string {
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Crop-related queries
  if (lowercaseMessage.includes('crop') || lowercaseMessage.includes('harvest')) {
    return "🌾 For crop management, I recommend checking soil moisture, weather conditions, and growth stage. Monitor for pests daily and ensure proper irrigation. Would you like specific advice for a particular crop?";
  }
  
  // Weather-related queries
  if (lowercaseMessage.includes('weather') || lowercaseMessage.includes('rain')) {
    return "🌦️ Weather planning is crucial for farming success. Check our Weather Intelligence page for detailed forecasts. Generally, plan irrigation during dry spells and ensure drainage during heavy rains. What specific weather challenge are you facing?";
  }
  
  // Pest/disease queries
  if (lowercaseMessage.includes('pest') || lowercaseMessage.includes('disease')) {
    return "🐛 For pest management, early detection is key. Inspect crops regularly, use integrated pest management (IPM), and consider organic solutions first. Can you describe the symptoms you're seeing?";
  }
  
  // Soil queries
  if (lowercaseMessage.includes('soil') || lowercaseMessage.includes('fertilizer')) {
    return "🌱 Soil health is fundamental for good yields. Consider soil testing, add organic matter regularly, and rotate crops. Use balanced fertilizers based on soil test results. What soil issue are you facing?";
  }
  
  // Market/price queries
  if (lowercaseMessage.includes('price') || lowercaseMessage.includes('market')) {
    return "📈 Check our Market Intelligence page for current grain prices and trends. Consider storage options if prices are low, and plan harvesting timing based on market conditions. Which crop prices are you interested in?";
  }
  
  // Default agricultural response
  return "🎯 I'm here to help with your farming questions! I can provide advice on crops, weather, irrigation, pest management, soil health, and market trends. What specific farming challenge can I help you with today?";
}

// Function to detect language (basic detection)
export function detectLanguage(text: string): 'en' | 'hi' {
  // Simple Devanagari script detection for Hindi
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text) ? 'hi' : 'en';
}

// Get welcome message based on language
export function getWelcomeMessage(language: 'en' | 'hi' = 'en'): ChatMessage {
  const welcomeMessages = {
    en: "🌱 Hello! I'm KrishiMitra AI, your farming assistant. Ask me about crops, weather, pest control, soil health, market prices, or any agricultural guidance you need!",
    hi: "🌱 नमस्ते! मैं KrishiMitra AI हूं, आपका कृषि सहायक। मुझसे फसल, मौसम, कीट नियंत्रण, मिट्टी की सेहत, बाजार की कीमतों या किसी भी कृषि सलाह के बारे में पूछें!"
  };
  
  return {
    id: `welcome-${Date.now()}`,
    text: welcomeMessages[language],
    isUser: false,
    timestamp: new Date(),
    language
  };
}

// Pre-defined helpful farming tips
export const FARMING_QUICK_TIPS = [
  {
    title: "🌾 Crop Health Check",
    message: "How do I check if my crops are healthy?",
    response: "Monitor leaf color, check for pest damage, ensure proper spacing, and inspect root development. Healthy crops show vibrant green leaves, steady growth, and no signs of wilting or disease."
  },
  {
    title: "💧 Irrigation Timing",
    message: "When should I irrigate my fields?",
    response: "Best irrigation times are early morning (5-8 AM) or evening (6-8 PM) to minimize water loss. Check soil moisture 4-6 inches deep - irrigate when soil feels dry but not powdery."
  },
  {
    title: "🐛 Pest Prevention",
    message: "How to prevent pest attacks naturally?",
    response: "Use neem oil spray, maintain crop diversity, attract beneficial insects with flowering plants, and regular field monitoring. Clean farming tools and remove infected plant debris promptly."
  },
  {
    title: "📈 Market Strategy",
    message: "When to sell my harvest for best prices?",
    response: "Monitor market trends, avoid selling immediately after harvest when supply is high. Consider storage facilities, check mandi prices regularly, and sell during festival seasons for better rates."
  }
];