import { useState, useEffect } from 'react';
import { getCurrentWeather, getWeatherForecast, getWeatherAlerts, getAgriculturalInsights, WeatherData, ForecastData, WeatherAlert } from '../services/weatherApi';
import { useGeolocation } from './useGeolocation';

interface UseWeatherDataReturn {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  alerts: WeatherAlert[];
  insights: string[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
  locationInfo: {
    isUsingUserLocation: boolean;
    locationError: string | null;
    canRequestLocation: boolean;
    requestLocation: () => void;
  };
}

export function useWeatherData(manualLat?: number, manualLon?: number, refreshInterval?: number): UseWeatherDataReturn {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  // Use geolocation hook for automatic location detection
  const geolocation = useGeolocation();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Determine which coordinates to use
      let lat: number | undefined;
      let lon: number | undefined;
      
      if (manualLat !== undefined && manualLon !== undefined) {
        // Use manually provided coordinates
        lat = manualLat;
        lon = manualLon;
        console.log('🌍 Using manual coordinates:', lat, lon);
      } else if (geolocation.coords) {
        // Use user's location
        lat = geolocation.coords.latitude;
        lon = geolocation.coords.longitude;
        console.log('📍 Using user location:', lat, lon);
      } else {
        // Fall back to default location (Delhi) if no coordinates available
        console.log('🏙️ Using default location (Delhi, India)');
      }

      const [weatherData, forecastData, alertsData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getWeatherForecast(lat, lon),
        getWeatherAlerts(lat, lon)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setAlerts(alertsData);
      
      // Generate agricultural insights
      if (weatherData && forecastData.length > 0) {
        const agriculturalInsights = getAgriculturalInsights(weatherData, forecastData);
        setInsights(agriculturalInsights);
      }

      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchWeatherData();
  };

  // Initial fetch when coordinates change or become available
  useEffect(() => {
    // Fetch weather data when:
    // 1. Manual coordinates are provided, OR
    // 2. User location becomes available, OR  
    // 3. Geolocation loading is complete (even if failed - will use fallback)
    if (
      (manualLat !== undefined && manualLon !== undefined) ||
      geolocation.coords ||
      (!geolocation.loading && geolocation.error)
    ) {
      fetchWeatherData();
    }
  }, [manualLat, manualLon, geolocation.coords, geolocation.loading, geolocation.error]);

  // Auto-refresh data at specified interval
  useEffect(() => {
    if (!refreshInterval) return;

    // Only start auto-refresh if we have some location data or geolocation is complete
    if (
      (manualLat !== undefined && manualLon !== undefined) ||
      geolocation.coords ||
      (!geolocation.loading && geolocation.error)
    ) {
      const interval = setInterval(fetchWeatherData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval, manualLat, manualLon, geolocation.coords, geolocation.loading, geolocation.error]);

  return {
    currentWeather,
    forecast,
    alerts,
    insights,
    loading: loading || geolocation.loading,
    error: error || geolocation.error,
    lastUpdated,
    refetch,
    locationInfo: {
      isUsingUserLocation: !!(geolocation.coords && !manualLat && !manualLon),
      locationError: geolocation.error,
      canRequestLocation: geolocation.isSupported && geolocation.permissionState !== 'denied',
      requestLocation: geolocation.requestLocation
    }
  };
}