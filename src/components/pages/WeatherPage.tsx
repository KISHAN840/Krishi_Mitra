import { useWeatherData } from "../../hooks/useWeatherData";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Page } from "../Router";

interface WeatherPageProps {
  onPageChange?: (page: Page) => void;
}

export function WeatherPage({ onPageChange }: WeatherPageProps) {
  const { 
    currentWeather, 
    forecast, 
    alerts, 
    insights, 
    loading, 
    error, 
    lastUpdated, 
    refetch, 
    locationInfo 
  } = useWeatherData(undefined, undefined, 5 * 60 * 1000); // Refresh every 5 minutes
  const weeklyForecast = [
    { day: "Today", date: "Jan 4", icon: "☀️", high: "28°", low: "16°", rain: "5%", humidity: "65%" },
    { day: "Tomorrow", date: "Jan 5", icon: "⛅", high: "26°", low: "14°", rain: "15%", humidity: "70%" },
    { day: "Sunday", date: "Jan 6", icon: "🌧️", high: "24°", low: "12°", rain: "80%", humidity: "85%" },
    { day: "Monday", date: "Jan 7", icon: "🌤️", high: "27°", low: "15°", rain: "25%", humidity: "68%" },
    { day: "Tuesday", date: "Jan 8", icon: "☀️", high: "29°", low: "17°", rain: "10%", humidity: "60%" },
    { day: "Wednesday", date: "Jan 9", icon: "⛅", high: "25°", low: "13°", rain: "30%", humidity: "75%" },
    { day: "Thursday", date: "Jan 10", icon: "🌤️", high: "28°", low: "16°", rain: "20%", humidity: "62%" },
  ];

  const farmingAlerts = [
    { type: "irrigation", message: "Perfect conditions for irrigation in Zone A", priority: "medium", icon: "💧" },
    { type: "pest", message: "Watch for aphids in wheat crops - humidity rising", priority: "high", icon: "🐛" },
    { type: "harvest", message: "Ideal harvesting weather for corn crops", priority: "low", icon: "🌽" },
    { type: "planting", message: "Good soil moisture for sowing barley seeds", priority: "medium", icon: "🌱" },
    { type: "disease", message: "High humidity may cause fungal diseases in rice", priority: "high", icon: "🦠" },
    { type: "frost", message: "Night temperature drop - protect sensitive crops", priority: "critical", icon: "❄️" },
  ];

  const weatherChallenges = [
    {
      challenge: "Unexpected rain during wheat harvest",
      impact: "Grain moisture increase, quality degradation risk",
      solution: "Use tarpaulins, delay harvest 2-3 days, ensure proper drying",
      precaution: "Check grain moisture before storage, use mechanical dryers if needed"
    },
    {
      challenge: "Extended dry spell affecting rice crops", 
      impact: "Reduced tillering, poor grain filling, yield loss",
      solution: "Implement deficit irrigation, mulching, drought-tolerant varieties",
      precaution: "Monitor soil moisture daily, prepare alternate water sources"
    },
    {
      challenge: "Hailstorm damage to standing crops",
      impact: "Physical crop damage, lodging, disease entry points",
      solution: "Assess damage, remove damaged parts, apply protective fungicide",
      precaution: "Insurance claim, replant if damage >70%, market early if possible"
    }
  ];

  const farmingActivitiesByWeather = [
    { weather: "Sunny (26-30°C)", activities: ["Irrigation scheduling", "Pesticide application", "Harvesting", "Field preparation"], bestTime: "6 AM - 10 AM, 4 PM - 6 PM" },
    { weather: "Partly Cloudy (22-28°C)", activities: ["Sowing operations", "Fertilizer application", "Weeding", "Spraying"], bestTime: "All day suitable" },  
    { weather: "Light Rain (15-25°C)", activities: ["Indoor planning", "Equipment maintenance", "Seed treatment", "Storage management"], bestTime: "Avoid field work" },
    { weather: "Heavy Rain (12-20°C)", activities: ["Drainage management", "Crop protection", "Emergency measures", "Planning next season"], bestTime: "Emergency only" },
  ];

  const weatherMetrics = [
    { label: "Soil Temperature", value: "18°C", ideal: "15-20°C", status: "optimal" },
    { label: "UV Index", value: "6", ideal: "5-8", status: "optimal" },
    { label: "Wind Speed", value: "12 km/h", ideal: "<20 km/h", status: "good" },
    { label: "Atmospheric Pressure", value: "1013 hPa", ideal: "1000-1020", status: "optimal" },
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1755245291656-34f9a96bee38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwbW9uaXRvcmluZyUyMGFncmljdWx0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTcwODE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-slate-800/70 to-green-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-blue-300 mb-4 drop-shadow-lg">Weather Intelligence</h1>
          <p className="text-white/90 text-lg drop-shadow-md">Advanced weather monitoring for smart farming decisions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Weather & Alerts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-8 border border-[#3498db]/30 glow-effect">
              {loading && !currentWeather ? (
                <div className="animate-pulse">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="h-8 bg-white/20 rounded w-48 mb-2"></div>
                      <div className="h-5 bg-white/20 rounded w-32"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-16 bg-white/20 rounded w-24 mb-2"></div>
                      <div className="h-6 bg-white/20 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="text-center">
                        <div className="h-4 bg-white/20 rounded mb-1"></div>
                        <div className="h-5 bg-white/20 rounded mb-1"></div>
                        <div className="h-3 bg-white/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : error && !currentWeather ? (
                <div className="text-center py-8">
                  <p className="text-red-400 mb-4">Failed to load weather data: {error}</p>
                  <Button onClick={refetch}>Retry</Button>
                </div>
              ) : currentWeather ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-white text-2xl">{currentWeather.location}</h2>
                        {loading && (
                          <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <Button onClick={refetch} size="sm" variant="outline">
                          Refresh
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[#3498db]">
                          {locationInfo.isUsingUserLocation ? '📍 Your Location Weather' : '🏙️ Default Location Weather'}
                        </p>
                        {locationInfo.isUsingUserLocation && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs px-2 py-0">
                            Live Location
                          </Badge>
                        )}
                        {!locationInfo.isUsingUserLocation && locationInfo.canRequestLocation && (
                          <Button 
                            onClick={locationInfo.requestLocation}
                            size="sm"
                            variant="outline"
                            className="text-xs px-2 py-1 h-6 border-blue-400 text-blue-400 hover:bg-blue-400/10"
                          >
                            📍 Use My Location
                          </Button>
                        )}
                      </div>
                      {lastUpdated && (
                        <p className="text-white/60 text-sm mt-1">
                          Last updated: {lastUpdated.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-6xl text-[#f1c40f] mb-2">{currentWeather.temperature}°</div>
                      <div className="text-[#3498db] flex items-center gap-2 justify-end">
                        <span className="text-2xl">
                          {currentWeather.condition === 'Clear' ? '☀️' : 
                           currentWeather.condition === 'Partly Cloudy' ? '🌤️' : 
                           currentWeather.condition === 'Clouds' ? '☁️' : 
                           currentWeather.condition === 'Rain' ? '🌧️' : '🌤️'}
                        </span>
                        {currentWeather.description}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-1">Humidity</p>
                      <p className="text-white text-lg mb-1">{currentWeather.humidity}%</p>
                      <p className="text-[#2ecc71] text-xs">40-70%</p>
                      <span className={`inline-block w-2 h-2 rounded-full mt-1 ${
                        currentWeather.humidity >= 40 && currentWeather.humidity <= 70 ? 'bg-[#2ecc71]' : 'bg-[#f1c40f]'
                      }`}></span>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-1">Wind Speed</p>
                      <p className="text-white text-lg mb-1">{currentWeather.windSpeed} km/h</p>
                      <p className="text-[#2ecc71] text-xs">&lt;20 km/h</p>
                      <span className={`inline-block w-2 h-2 rounded-full mt-1 ${
                        currentWeather.windSpeed < 20 ? 'bg-[#2ecc71]' : 'bg-[#f1c40f]'
                      }`}></span>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-1">Pressure</p>
                      <p className="text-white text-lg mb-1">{currentWeather.pressure} mb</p>
                      <p className="text-[#2ecc71] text-xs">1000-1020</p>
                      <span className={`inline-block w-2 h-2 rounded-full mt-1 ${
                        currentWeather.pressure >= 1000 && currentWeather.pressure <= 1020 ? 'bg-[#2ecc71]' : 'bg-[#f1c40f]'
                      }`}></span>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-1">UV Index</p>
                      <p className="text-white text-lg mb-1">{currentWeather.uvIndex}</p>
                      <p className="text-[#2ecc71] text-xs">5-8</p>
                      <span className={`inline-block w-2 h-2 rounded-full mt-1 ${
                        currentWeather.uvIndex >= 5 && currentWeather.uvIndex <= 8 ? 'bg-[#2ecc71]' : 'bg-[#f1c40f]'
                      }`}></span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Weather Alerts & Agricultural Insights */}
          <div>
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#f1c40f]/30">
              <h3 className="text-white text-xl mb-4">Weather Alerts & Agricultural Insights</h3>
              
              {/* Weather Alerts */}
              {alerts.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white/80 text-sm mb-3">Active Weather Alerts</h4>
                  <div className="space-y-3">
                    {alerts.map((alert, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${
                          alert.severity === 'severe' || alert.severity === 'extreme' ? 'bg-red-500/10 border-red-500' :
                          alert.severity === 'moderate' ? 'bg-yellow-500/10 border-yellow-500' :
                          'bg-blue-500/10 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">⚠️</span>
                          <div>
                            <p className="text-white text-sm font-medium">{alert.title}</p>
                            <p className="text-white/70 text-xs mt-1">{alert.description}</p>
                            <p className={`text-xs mt-2 ${
                              alert.severity === 'severe' || alert.severity === 'extreme' ? 'text-red-400' :
                              alert.severity === 'moderate' ? 'text-yellow-400' :
                              'text-blue-400'
                            }`}>
                              {alert.severity.toUpperCase()} • {alert.type.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agricultural Insights */}
              {insights.length > 0 && (
                <div>
                  <h4 className="text-white/80 text-sm mb-3">Smart Farming Recommendations</h4>
                  <div className="space-y-3">
                    {insights.map((insight, index) => (
                      <div 
                        key={index}
                        className="p-3 rounded-lg bg-green-500/10 border-l-4 border-green-500"
                      >
                        <p className="text-white text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!alerts.length && !insights.length && !loading && (
                <div className="text-center py-4">
                  <p className="text-white/60 text-sm">No active alerts or recommendations</p>
                  <p className="text-green-400 text-sm mt-1">✅ All weather conditions are optimal for farming</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">5-Day Detailed Forecast</h2>
          {loading && !forecast.length ? (
            <div className="grid gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="backdrop-blur-lg bg-gradient-to-r from-[#3498db]/10 to-[#2ecc71]/10 rounded-xl p-4 border border-white/10 animate-pulse">
                  <div className="grid grid-cols-6 items-center gap-4">
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-12 bg-white/20 rounded"></div>
                    <div className="h-8 bg-white/20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {forecast.map((day, index) => {
                const date = new Date(day.date);
                const formatDate = (date: Date) => {
                  const today = new Date();
                  const tomorrow = new Date(today);
                  tomorrow.setDate(today.getDate() + 1);
                  
                  if (date.toDateString() === today.toDateString()) {
                    return { day: 'Today', date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
                  } else if (date.toDateString() === tomorrow.toDateString()) {
                    return { day: 'Tomorrow', date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) };
                  } else {
                    return { 
                      day: date.toLocaleDateString('en-US', { weekday: 'long' }), 
                      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
                    };
                  }
                };
                
                const formattedDate = formatDate(date);
                
                return (
                  <div
                    key={index}
                    className="backdrop-blur-lg bg-gradient-to-r from-[#3498db]/10 to-[#2ecc71]/10 rounded-xl p-4 border border-white/10 hover:border-[#3498db]/30 transition-all"
                  >
                    <div className="grid grid-cols-6 items-center gap-4">
                      <div>
                        <p className="text-white">{formattedDate.day}</p>
                        <p className="text-white/60 text-sm">{formattedDate.date}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-3xl">
                          {day.condition === 'Clear' || day.condition === 'Sunny' ? '☀️' : 
                           day.condition === 'Partly Cloudy' ? '🌤️' : 
                           day.condition === 'Clouds' || day.condition === 'Cloudy' ? '☁️' : 
                           day.condition === 'Light Rain' ? '🌦️' :
                           day.condition === 'Heavy Rain' ? '⛈️' :
                           day.condition === 'Rain' ? '🌧️' : '🌤️'}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-[#f1c40f] text-lg">{day.temperature.max}°</p>
                        <p className="text-white/70 text-sm">{day.temperature.min}°</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[#3498db]">{day.precipitation}%</p>
                        <p className="text-white/60 text-sm">Rain</p>
                      </div>
                      <div className="text-center">
                        <p className="text-white">{day.humidity}%</p>
                        <p className="text-white/60 text-sm">Humidity</p>
                      </div>
                      <div className="text-right flex flex-col gap-1 items-end">
                        {day.precipitation > 70 && (
                          <Badge className="bg-red-500/20 text-red-400 text-xs">Heavy Rain</Badge>
                        )}
                        {day.temperature.max > 35 && (
                          <Badge className="bg-orange-500/20 text-orange-400 text-xs">Heat Alert</Badge>
                        )}
                        {day.temperature.min < 10 && (
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">Frost Risk</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Weather-based Farming Challenges */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">Weather-Related Farming Challenges & Solutions</h2>
          <div className="space-y-6">
            {weatherChallenges.map((challenge, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#e67e22]/30">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-[#e67e22] text-lg mb-3 flex items-center gap-2">
                      <span>⚠️</span>
                      {challenge.challenge}
                    </h3>
                    <p className="text-white/80 mb-4">
                      <strong className="text-[#e74c3c]">Impact:</strong> {challenge.impact}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#2ecc71] mb-3">
                      <strong>Solution:</strong> {challenge.solution}
                    </p>
                    <p className="text-[#f1c40f] text-sm">
                      <strong>Precaution:</strong> {challenge.precaution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Weather-based Activity Recommendations */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">Recommended Activities by Weather Conditions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {farmingActivitiesByWeather.map((item, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-[#3498db]/20">
                <h3 className="text-[#3498db] text-lg mb-4">{item.weather}</h3>
                <div className="mb-4">
                  <h4 className="text-white text-sm mb-2">Recommended Activities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.activities.map((activity, idx) => (
                      <span key={idx} className="bg-[#2ecc71]/20 text-[#2ecc71] px-3 py-1 rounded-full text-sm">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[#f1c40f] text-sm">
                  <strong>Best Time:</strong> {item.bestTime}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Historical Weather Data */}
        <section>
          <h2 className="text-white text-2xl mb-6">Weather Insights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#3498db]/20 to-[#2980b9]/20 rounded-xl p-6 border border-[#3498db]/30">
              <h4 className="text-[#3498db] mb-3">Rainfall This Month</h4>
              <div className="text-white text-3xl mb-2">45mm</div>
              <p className="text-white/70 text-sm">15% above average</p>
              <div className="mt-4 bg-white/10 rounded-full h-2">
                <div className="bg-[#3498db] h-2 rounded-full w-3/5"></div>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#f1c40f]/20 to-[#f39c12]/20 rounded-xl p-6 border border-[#f1c40f]/30">
              <h4 className="text-[#f1c40f] mb-3">Sunshine Hours</h4>
              <div className="text-white text-3xl mb-2">8.5 hrs</div>
              <p className="text-white/70 text-sm">Perfect for photosynthesis</p>
              <div className="mt-4 bg-white/10 rounded-full h-2">
                <div className="bg-[#f1c40f] h-2 rounded-full w-4/5"></div>
              </div>
            </div>
            
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#2ecc71]/20 to-[#27ae60]/20 rounded-xl p-6 border border-[#2ecc71]/30">
              <h4 className="text-[#2ecc71] mb-3">Growing Degree Days</h4>
              <div className="text-white text-3xl mb-2">1,240</div>
              <p className="text-white/70 text-sm">Optimal crop development</p>
              <div className="mt-4 bg-white/10 rounded-full h-2">
                <div className="bg-[#2ecc71] h-2 rounded-full w-5/6"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}