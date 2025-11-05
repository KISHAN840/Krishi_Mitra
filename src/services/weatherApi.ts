// Weather API Service for KrishiMitra
// Note: Replace API_KEY with your actual OpenWeatherMap API key

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
  location: string;
  icon: string;
  description: string;
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface WeatherAlert {
  type: "warning" | "watch" | "advisory";
  title: string;
  description: string;
  severity: "minor" | "moderate" | "severe" | "extreme";
  startTime: string;
  endTime: string;
}

// Mock data for development - replace with real API calls
const mockCurrentWeather: WeatherData = {
  temperature: 28,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  pressure: 1013,
  visibility: 10,
  uvIndex: 6,
  location: "Delhi, India",
  icon: "02d",
  description: "Partly cloudy with gentle breeze",
};

// Generate dynamic forecast data for the next 5 days
function generateMockForecast(): ForecastData[] {
  const forecast: ForecastData[] = [];
  const today = new Date();

  const weatherConditions = [
    { condition: "Sunny", icon: "01d", precipitation: 0 },
    {
      condition: "Partly Cloudy",
      icon: "02d",
      precipitation: 10,
    },
    { condition: "Light Rain", icon: "10d", precipitation: 60 },
    { condition: "Heavy Rain", icon: "09d", precipitation: 80 },
    { condition: "Cloudy", icon: "03d", precipitation: 20 },
  ];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const weather = weatherConditions[i];
    const baseTemp = 25;
    const tempVariation = Math.sin(i * 0.5) * 5; // Creates temperature variation

    forecast.push({
      date: date.toISOString().split("T")[0],
      temperature: {
        min: Math.round(baseTemp + tempVariation - 5),
        max: Math.round(baseTemp + tempVariation + 5),
      },
      condition: weather.condition,
      icon: weather.icon,
      humidity: 60 + i * 5 + Math.random() * 10, // Varies humidity realistically
      windSpeed: 10 + Math.random() * 15,
      precipitation: weather.precipitation,
    });
  }

  return forecast;
}

const mockForecast: ForecastData[] = generateMockForecast();

const mockWeatherAlerts: WeatherAlert[] = [
  {
    type: "warning",
    title: "Heavy Rainfall Warning",
    description:
      "Heavy rainfall expected between 2 PM - 6 PM today. Expected accumulation: 45-60mm.",
    severity: "moderate",
    startTime: "2024-03-21T14:00:00Z",
    endTime: "2024-03-21T18:00:00Z",
  },
];

// Real API functions using OpenWeatherMap
export async function getCurrentWeather(
  lat?: number,
  lon?: number,
): Promise<WeatherData> {
  try {
    // Use real OpenWeatherMap API
    const url = lat && lon 
      ? `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      : `${BASE_URL}/weather?q=Delhi,IN&appid=${WEATHER_API_KEY}&units=metric`;
    
    console.log('🌤️ Fetching live weather data from OpenWeatherMap...');
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenWeatherMap API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log('✅ Live weather data received:', data.name);
    
    // Get UV Index from separate API call
    let uvIndex = 0;
    try {
      if (data.coord) {
        const uvResponse = await fetch(
          `${BASE_URL}/uvi?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${WEATHER_API_KEY}`
        );
        if (uvResponse.ok) {
          const uvData = await uvResponse.json();
          uvIndex = Math.round(uvData.value || 0);
        }
      }
    } catch (uvError) {
      console.warn('UV Index fetch failed, using default:', uvError);
    }
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: data.main.pressure,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 10, // Convert to km
      uvIndex: uvIndex,
      location: `${data.name}, ${data.sys.country}`,
      icon: data.weather[0].icon,
      description: data.weather[0].description
    };
  } catch (error) {
    console.error("❌ Error fetching live weather data:", error);
    console.log('🔄 Falling back to mock data...');
    // Return mock data as fallback
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockCurrentWeather), 500);
    });
  }
}

export async function getWeatherForecast(
  lat?: number,
  lon?: number,
): Promise<ForecastData[]> {
  try {
    // Use real OpenWeatherMap forecast API
    const url = lat && lon 
      ? `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      : `${BASE_URL}/forecast?q=Delhi,IN&appid=${WEATHER_API_KEY}&units=metric`;
    
    console.log('📅 Fetching live 5-day forecast from OpenWeatherMap...');
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`OpenWeatherMap Forecast API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    console.log('✅ Live forecast data received');
    
    // Process 5-day forecast data - group by date and get daily min/max
    const dailyData = new Map<string, {
      temps: number[];
      conditions: string[];
      icons: string[];
      humidity: number[];
      windSpeed: number[];
      precipitation: number[];
    }>();
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          temps: [],
          conditions: [],
          icons: [],
          humidity: [],
          windSpeed: [],
          precipitation: []
        });
      }
      
      const dayData = dailyData.get(date)!;
      dayData.temps.push(item.main.temp);
      dayData.conditions.push(item.weather[0].main);
      dayData.icons.push(item.weather[0].icon);
      dayData.humidity.push(item.main.humidity);
      dayData.windSpeed.push(item.wind.speed * 3.6); // Convert to km/h
      
      // Calculate precipitation (rain + snow)
      let precip = 0;
      if (item.rain) precip += item.rain['3h'] || 0;
      if (item.snow) precip += item.snow['3h'] || 0;
      dayData.precipitation.push(precip);
    });
    
    // Convert to daily forecasts (limit to 5 days)
    const dailyForecasts: ForecastData[] = [];
    for (const [date, dayData] of Array.from(dailyData.entries()).slice(0, 5)) {
      // Get most common condition for the day
      const conditionCounts = dayData.conditions.reduce((acc, condition) => {
        acc[condition] = (acc[condition] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const mostCommonCondition = Object.entries(conditionCounts)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      // Get corresponding icon
      const conditionIndex = dayData.conditions.findIndex(c => c === mostCommonCondition);
      const icon = dayData.icons[conditionIndex] || dayData.icons[0];
      
      dailyForecasts.push({
        date,
        temperature: {
          min: Math.round(Math.min(...dayData.temps)),
          max: Math.round(Math.max(...dayData.temps))
        },
        condition: mostCommonCondition,
        icon: icon,
        humidity: Math.round(dayData.humidity.reduce((a, b) => a + b, 0) / dayData.humidity.length),
        windSpeed: Math.round(dayData.windSpeed.reduce((a, b) => a + b, 0) / dayData.windSpeed.length),
        precipitation: Math.round(Math.max(...dayData.precipitation))
      });
    }
    
    return dailyForecasts;
  } catch (error) {
    console.error("❌ Error fetching live forecast data:", error);
    console.log('🔄 Falling back to mock forecast...');
    // Generate fresh mock data for each request to ensure current dates
    const freshMockForecast = generateMockForecast();
    return new Promise((resolve) => {
      setTimeout(() => resolve(freshMockForecast), 600);
    });
  }
}

export async function getWeatherAlerts(
  lat?: number,
  lon?: number,
): Promise<WeatherAlert[]> {
  try {
    // OpenWeatherMap One Call API has weather alerts, but requires subscription
    // For basic plan, we'll generate smart alerts based on current weather conditions
    
    console.log('⚠️ Generating weather alerts based on current conditions...');
    
    // Get current weather to generate contextual alerts
    const currentWeather = await getCurrentWeather(lat, lon);
    const alerts: WeatherAlert[] = [];
    
    // Generate alerts based on weather conditions
    if (currentWeather.temperature > 35) {
      alerts.push({
        type: 'warning',
        title: 'High Temperature Alert',
        description: `Extreme heat detected (${currentWeather.temperature}°C). Heat stress risk for crops and livestock. Increase irrigation frequency and provide shade.`,
        severity: 'moderate',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 hours
      });
    }
    
    if (currentWeather.temperature < 5) {
      alerts.push({
        type: 'warning',
        title: 'Frost Risk Alert',
        description: `Very low temperature (${currentWeather.temperature}°C). Frost damage risk for sensitive crops. Cover plants and use frost protection methods.`,
        severity: 'severe',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString() // 12 hours
      });
    }
    
    if (currentWeather.windSpeed > 30) {
      alerts.push({
        type: 'advisory',
        title: 'Strong Wind Advisory',
        description: `High winds detected (${currentWeather.windSpeed} km/h). Secure farming equipment and check crop support structures.`,
        severity: 'moderate',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // 6 hours
      });
    }
    
    if (currentWeather.humidity > 85 && currentWeather.temperature > 25) {
      alerts.push({
        type: 'watch',
        title: 'High Humidity Warning',
        description: `Very high humidity (${currentWeather.humidity}%) with warm temperature. Increased risk of fungal diseases in crops. Monitor closely and ensure good ventilation.`,
        severity: 'minor',
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      });
    }
    
    // If no specific alerts, return a positive message
    if (alerts.length === 0) {
      console.log('✅ No weather alerts - conditions are favorable');
    } else {
      console.log(`⚠️ Generated ${alerts.length} weather alert(s)`);
    }
    
    return alerts;
    
  } catch (error) {
    console.error("❌ Error generating weather alerts:", error);
    console.log('🔄 Falling back to mock alerts...');
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWeatherAlerts), 400);
    });
  }
}

// Agricultural weather insights
export function getAgriculturalInsights(
  weather: WeatherData,
  forecast: ForecastData[],
): string[] {
  const insights: string[] = [];

  // Temperature insights
  if (weather.temperature > 35) {
    insights.push(
      "🌡️ High temperature alert: Consider increased irrigation for heat-sensitive crops",
    );
  } else if (weather.temperature < 10) {
    insights.push(
      "❄️ Cold temperature warning: Protect sensitive crops from frost damage",
    );
  }

  // Humidity insights
  if (weather.humidity > 80) {
    insights.push(
      "💧 High humidity detected: Monitor crops for fungal diseases",
    );
  } else if (weather.humidity < 40) {
    insights.push(
      "🏜️ Low humidity: Increase irrigation frequency to prevent crop stress",
    );
  }

  // Wind insights
  if (weather.windSpeed > 25) {
    insights.push(
      "💨 Strong winds: Secure loose equipment and check crop support structures",
    );
  }

  // Forecast insights
  const rainDays = forecast.filter(
    (day) => day.precipitation > 30,
  ).length;
  if (rainDays >= 2) {
    insights.push(
      "🌧️ Heavy rain expected: Ensure proper field drainage and postpone harvesting",
    );
  }

  const hotDays = forecast.filter(
    (day) => day.temperature.max > 35,
  ).length;
  if (hotDays >= 3) {
    insights.push(
      "🔥 Heat wave approaching: Plan additional irrigation and crop protection measures",
    );
  }

  return insights;
}

// Location-based weather (for different farm zones)
export async function getMultiLocationWeather(
  locations: Array<{ name: string; lat: number; lon: number }>,
): Promise<Array<WeatherData & { location: string }>> {
  const weatherPromises = locations.map(async (location) => {
    const weather = await getCurrentWeather(
      location.lat,
      location.lon,
    );
    return { ...weather, location: location.name };
  });

  return Promise.all(weatherPromises);
}