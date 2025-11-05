import { useWeatherData } from '../hooks/useWeatherData';
import { Badge } from './ui/badge';

export function WeatherForecast() {
  const { forecast, loading, locationInfo } = useWeatherData();

  const getWeatherIcon = (condition: string) => {
    const icons: Record<string, string> = {
      'Clear': '☀️',
      'Sunny': '☀️',
      'Clouds': '☁️',
      'Partly Cloudy': '🌤️',
      'Rain': '🌧️',
      'Light Rain': '🌦️',
      'Heavy Rain': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Cloudy': '☁️'
    };
    return icons[condition] || '🌤️';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  if (loading) {
    return (
      <div className="mt-6">
        <h3 className="text-white mb-4">Upcoming Weather</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="min-w-[100px] backdrop-blur-lg bg-gradient-to-b from-[#2ecc71]/20 to-[#3498db]/20 rounded-xl p-3 border border-white/10 text-center animate-pulse"
            >
              <div className="h-4 bg-white/20 rounded mb-2"></div>
              <div className="h-8 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/20 rounded mb-1"></div>
              <div className="h-3 bg-white/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">5-Day Forecast</h3>
        {locationInfo.isUsingUserLocation && (
          <Badge className="bg-green-500/20 text-green-400 text-xs px-2 py-1">
            📍 Your Location
          </Badge>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {forecast.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="min-w-[110px] backdrop-blur-lg bg-gradient-to-b from-[#2ecc71]/20 to-[#3498db]/20 rounded-xl p-3 border border-white/10 text-center hover:scale-105 transition-transform duration-300"
          >
            <p className="text-white/80 text-sm mb-2">{formatDate(item.date)}</p>
            <div className="text-2xl mb-2">{getWeatherIcon(item.condition)}</div>
            <div className="mb-1">
              <p className="text-[#f1c40f] text-sm">{item.temperature.max}°</p>
              <p className="text-white/60 text-xs">{item.temperature.min}°</p>
            </div>
            <p className="text-[#3498db] text-xs">{item.precipitation}%</p>
            
            {/* Agricultural warnings for forecast */}
            {item.precipitation > 70 && (
              <div className="mt-2 w-2 h-2 bg-red-400 rounded-full mx-auto" title="Heavy rain expected"></div>
            )}
            {item.temperature.max > 35 && (
              <div className="mt-2 w-2 h-2 bg-orange-400 rounded-full mx-auto" title="High temperature"></div>
            )}
          </div>
        ))}
      </div>
      
      {/* Agricultural insights */}
      {forecast.length > 0 && (
        <div className="mt-4 space-y-2">
          {forecast.filter(day => day.precipitation > 60).length >= 2 && (
            <div className="bg-blue-900/30 backdrop-blur-sm rounded-lg p-3 border border-blue-400/30">
              <p className="text-blue-300 text-sm">
                🌧️ Heavy rain expected in coming days. Plan drainage and postpone field operations.
              </p>
            </div>
          )}
          
          {forecast.filter(day => day.temperature.max > 35).length >= 3 && (
            <div className="bg-red-900/30 backdrop-blur-sm rounded-lg p-3 border border-red-400/30">
              <p className="text-red-300 text-sm">
                🔥 Heat wave approaching. Increase irrigation and provide crop shade.
              </p>
            </div>
          )}
          
          {forecast.filter(day => day.temperature.min < 10).length >= 2 && (
            <div className="bg-purple-900/30 backdrop-blur-sm rounded-lg p-3 border border-purple-400/30">
              <p className="text-purple-300 text-sm">
                ❄️ Cold temperatures ahead. Protect sensitive crops from frost.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}