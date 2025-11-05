import { useWeatherData } from '../hooks/useWeatherData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function WeatherCard() {
  const { 
    currentWeather, 
    loading, 
    error, 
    lastUpdated, 
    refetch, 
    locationInfo 
  } = useWeatherData(undefined, undefined, 10 * 60 * 1000); // Refresh every 10 minutes

  const getWeatherIcon = (condition: string) => {
    const icons: Record<string, string> = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Partly Cloudy': '🌤️',
      'Rain': '🌧️',
      'Light Rain': '🌦️',
      'Heavy Rain': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️'
    };
    return icons[condition] || '🌤️';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return 'text-red-600 dark:text-red-400';
    if (temp >= 25) return 'text-amber-600 dark:text-amber-400';
    if (temp >= 15) return 'text-green-600 dark:text-green-400';
    return 'text-blue-600 dark:text-blue-400';
  };

  if (loading && !currentWeather) {
    return (
      <div className="modern-card rounded-2xl p-6 glow-effect">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-32 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
            </div>
            <div className="text-right">
              <div className="h-10 bg-slate-300 dark:bg-slate-600 rounded w-16 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-600">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 mx-auto mb-1"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-12 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && !currentWeather) {
    return (
      <div className="modern-card rounded-2xl p-6 glow-effect">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-2">⚠️ Weather data unavailable</div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{error}</p>
          <Button onClick={refetch} size="sm">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const weather = currentWeather!;

  return (
    <div className="modern-card rounded-2xl p-6 glow-effect">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-slate-800 dark:text-white">{weather.location}</h3>
            {loading && (
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
          <div className="flex items-center gap-1 mb-1">
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              {locationInfo.isUsingUserLocation ? '📍 Your Location' : '🏙️ Default Location'}
            </p>
            {locationInfo.isUsingUserLocation && (
              <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-1 py-0">
                Live
              </Badge>
            )}
          </div>
          {lastUpdated && (
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="text-right">
          <div className={`text-4xl mb-1 transition-colors duration-300 ${getTemperatureColor(weather.temperature)}`}>
            {weather.temperature}°
          </div>
          <div className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 justify-end transition-colors duration-300">
            <span className="text-xl transition-transform duration-300 hover:scale-110">
              {getWeatherIcon(weather.condition)}
            </span>
            {weather.description}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-600">
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Humidity</p>
          <p className="text-slate-800 dark:text-white">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Wind</p>
          <p className="text-slate-800 dark:text-white">{weather.windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">Pressure</p>
          <p className="text-slate-800 dark:text-white">{weather.pressure} mb</p>
        </div>
      </div>

      {/* Temperature-based alerts */}
      {weather.temperature > 35 && (
        <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-300 text-sm">
            🌡️ High temperature alert: Consider increased irrigation
          </p>
        </div>
      )}
      
      {weather.humidity > 80 && (
        <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            💧 High humidity: Monitor crops for fungal diseases
          </p>
        </div>
      )}

      {weather.windSpeed > 25 && (
        <div className="mt-4 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            💨 Strong winds: Secure equipment and check crop supports
          </p>
        </div>
      )}

      {/* Location permission request */}
      {!locationInfo.isUsingUserLocation && locationInfo.canRequestLocation && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-1">
                📍 Enable Location for Local Weather
              </p>
              <p className="text-blue-600 dark:text-blue-400 text-xs">
                Get weather data specific to your farming location
              </p>
            </div>
            <Button 
              onClick={locationInfo.requestLocation}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1"
            >
              Enable
            </Button>
          </div>
        </div>
      )}

      {/* Location error message */}
      {locationInfo.locationError && !locationInfo.isUsingUserLocation && (
        <div className="mt-4 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            🌍 Using default location. {locationInfo.locationError}
          </p>
        </div>
      )}
    </div>
  );
}