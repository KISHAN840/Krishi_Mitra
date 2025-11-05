// API Configuration for KrishiMitra
// Centralized configuration for API endpoints and refresh intervals

export const API_CONFIG = {
  // Weather API Configuration
  weather: {
    refreshInterval: 10 * 60 * 1000, // 10 minutes
    endpoints: {
      openWeatherMap: 'https://api.openweathermap.org/data/2.5',
      // Add other weather API endpoints here
    },
    apiKeys: {
      openWeatherMap: import.meta.env.VITE_WEATHER_API_KEY || ''
    }
  },

  // Market Data API Configuration
  market: {
    refreshInterval: 5 * 60 * 1000, // 5 minutes
    endpoints: {
      // Add agricultural market API endpoints here
      agmarknet: 'https://www.data.gov.in/resource/variety-wise-daily-market-prices-data-commodity?utm_source=chatgpt.com',
      // Other market data sources
    },
    apiKeys: {
      dataGovIn: import.meta.env.VITE_MARKET_API_KEY || ''
    }
  },

  // General configuration
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  timeout: 10000, // 10 seconds
};

export const FARMING_LOCATIONS = [
  { name: 'Zone A - Wheat Fields', lat: 28.4595, lon: 77.0266 },
  { name: 'Zone B - Rice Fields', lat: 28.4618, lon: 77.0194 },
  { name: 'Zone C - Corn Fields', lat: 28.4567, lon: 77.0289 },
  { name: 'Zone D - Vegetable Garden', lat: 28.4623, lon: 77.0245 }
];

// Utility function to check if we're in development mode (Vite)
export const isDevelopment = () => {
  return import.meta.env.MODE === 'development';
};

// Function to get appropriate API endpoint based on environment
export const getApiEndpoint = (service: 'weather' | 'market') => {
  if (isDevelopment()) {
    // In development, use mock data or local endpoints
    return '/api/mock/' + service;
  }
  return API_CONFIG[service].endpoints;
};

// Error handling for API calls
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic retry function for API calls
export const withRetry = async <T>(
  fn: () => Promise<T>,
  attempts: number = API_CONFIG.retryAttempts,
  delay: number = API_CONFIG.retryDelay
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (attempts > 1) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, attempts - 1, delay * 2);
    }
    throw error;
  }
};

// Function to validate API response
export const validateApiResponse = (response: any, requiredFields: string[]) => {
  for (const field of requiredFields) {
    if (!(field in response)) {
      throw new ApiError(`Missing required field: ${field}`);
    }
  }
  return true;
};