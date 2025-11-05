// Market API Service for KrishiMitra
// Note: This integrates with agricultural market data APIs
const MARKET_API_KEY = import.meta.env.VITE_MARKET_API_KEY || '';
const BASE_URL ="https://www.data.gov.in/resource/variety-wise-daily-market-prices-data-commodity?utm_source=chatgpt.com";

export interface GrainPrice {
  grain: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: string;
  volume: number;
  marketName: string;
  grade: string;
  unit: string;
  lastUpdated: string;
}

export interface MarketTrend {
  grain: string;
  trend: "bullish" | "bearish" | "stable";
  confidence: number;
  prediction: string;
  factors: string[];
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  impact: "positive" | "negative" | "neutral";
  source: string;
  publishedAt: string;
  grains: string[];
  importance: "high" | "medium" | "low";
}

export interface RegionalPrice {
  location: string;
  state: string;
  market: string;
  prices: {
    [grain: string]: {
      price: number;
      quality: string;
      trend: "up" | "down" | "stable";
    };
  };
  lastUpdated: string;
}

// Mock data for development
const mockGrainPrices: GrainPrice[] = [
  {
    grain: "Wheat",
    currentPrice: 2780,
    previousPrice: 2650,
    change: 130,
    changePercent: "+4.9%",
    volume: 3800,
    marketName: "Delhi Mandi",
    grade: "A",
    unit: "per quintal",
    lastUpdated: new Date().toISOString(),
  },
  {
    grain: "Rice",
    currentPrice: 3350,
    previousPrice: 3200,
    change: 150,
    changePercent: "+4.7%",
    volume: 2900,
    marketName: "Mumbai APMC",
    grade: "A+",
    unit: "per quintal",
    lastUpdated: new Date().toISOString(),
  },
  {
    grain: "Corn",
    currentPrice: 2190,
    previousPrice: 2100,
    change: 90,
    changePercent: "+4.3%",
    volume: 4200,
    marketName: "Chennai Market",
    grade: "A",
    unit: "per quintal",
    lastUpdated: new Date().toISOString(),
  },
  {
    grain: "Barley",
    currentPrice: 2450,
    previousPrice: 2400,
    change: 50,
    changePercent: "+2.1%",
    volume: 1500,
    marketName: "Kolkata Hub",
    grade: "B+",
    unit: "per quintal",
    lastUpdated: new Date().toISOString(),
  },
  {
    grain: "Millet",
    currentPrice: 4200,
    previousPrice: 4100,
    change: 100,
    changePercent: "+2.4%",
    volume: 800,
    marketName: "Bangalore Center",
    grade: "A",
    unit: "per quintal",
    lastUpdated: new Date().toISOString(),
  },
];

const mockMarketTrends: MarketTrend[] = [
  {
    grain: "Wheat",
    trend: "bullish",
    confidence: 85,
    prediction: "Expected to reach ₹2,850 within 2 weeks",
    factors: [
      "Strong export demand",
      "Lower production estimates",
      "International price surge",
    ],
  },
  {
    grain: "Rice",
    trend: "stable",
    confidence: 70,
    prediction:
      "Prices likely to remain stable with seasonal variations",
    factors: [
      "Adequate storage",
      "Normal monsoon forecast",
      "Government price support",
    ],
  },
  {
    grain: "Corn",
    trend: "bullish",
    confidence: 80,
    prediction:
      "Rising demand from ethanol industry driving prices up",
    factors: [
      "Ethanol blending mandate",
      "Animal feed demand",
      "Export opportunities",
    ],
  },
];

const mockMarketNews: MarketNews[] = [
  {
    id: "1",
    title: "Wheat Exports Surge 15% This Quarter",
    summary:
      "Strong international demand driving wheat prices higher across major markets. Export bookings for April-June quarter show significant increase.",
    impact: "positive",
    source: "AgriTrade News",
    publishedAt: new Date(
      Date.now() - 2 * 60 * 60 * 1000,
    ).toISOString(),
    grains: ["Wheat"],
    importance: "high",
  },
  {
    id: "2",
    title: "Monsoon Forecast Affects Rice Pricing",
    summary:
      "Early monsoon predictions suggest favorable conditions for rice cultivation, leading to stable price expectations.",
    impact: "neutral",
    source: "Weather Agricultural",
    publishedAt: new Date(
      Date.now() - 5 * 60 * 60 * 1000,
    ).toISOString(),
    grains: ["Rice"],
    importance: "medium",
  },
  {
    id: "3",
    title: "Corn Demand Increases from Ethanol Industry",
    summary:
      "Rising ethanol production targets are driving up corn prices in domestic markets as industries compete for supply.",
    impact: "positive",
    source: "Industry Report",
    publishedAt: new Date(
      Date.now() - 24 * 60 * 60 * 1000,
    ).toISOString(),
    grains: ["Corn"],
    importance: "high",
  },
  {
    id: "4",
    title: "Storage Facility Expansion Announced",
    summary:
      "Government announces new storage facilities to reduce post-harvest losses, potentially stabilizing grain prices.",
    impact: "positive",
    source: "Government Portal",
    publishedAt: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000,
    ).toISOString(),
    grains: ["Wheat", "Rice", "Corn"],
    importance: "medium",
  },
];

const mockRegionalPrices: RegionalPrice[] = [
  {
    location: "Delhi",
    state: "Delhi",
    market: "Azadpur Mandi",
    prices: {
      Wheat: { price: 2785, quality: "A", trend: "up" },
      Rice: { price: 3360, quality: "A+", trend: "up" },
      Corn: { price: 2195, quality: "A", trend: "up" },
    },
    lastUpdated: new Date().toISOString(),
  },
  {
    location: "Mumbai",
    state: "Maharashtra",
    market: "Vashi APMC",
    prices: {
      Wheat: { price: 2795, quality: "A", trend: "up" },
      Rice: { price: 3380, quality: "A+", trend: "stable" },
      Corn: { price: 2210, quality: "A", trend: "up" },
    },
    lastUpdated: new Date().toISOString(),
  },
  {
    location: "Chennai",
    state: "Tamil Nadu",
    market: "Koyambedu Market",
    prices: {
      Wheat: { price: 2770, quality: "A", trend: "up" },
      Rice: { price: 3340, quality: "A", trend: "stable" },
      Corn: { price: 2180, quality: "A", trend: "up" },
    },
    lastUpdated: new Date().toISOString(),
  },
];

// API Functions
export async function getCurrentGrainPrices(): Promise<
  GrainPrice[]
> {
  try {
    // In production, this would call a real market data API
    /*
    const response = await fetch('/api/market/current-prices');
    if (!response.ok) throw new Error('Failed to fetch grain prices');
    return await response.json();
    */

    // Mock API call with realistic delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Add some randomness to simulate live updates
        const updatedPrices = mockGrainPrices.map((price) => ({
          ...price,
          currentPrice:
            price.currentPrice + (Math.random() - 0.5) * 20,
          volume: Math.floor(
            price.volume * (0.9 + Math.random() * 0.2),
          ),
          lastUpdated: new Date().toISOString(),
        }));
        resolve(updatedPrices);
      }, 1500);
    });
  } catch (error) {
    console.error("Error fetching grain prices:", error);
    return mockGrainPrices;
  }
}

export async function getMarketTrends(): Promise<
  MarketTrend[]
> {
  try {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMarketTrends), 800);
    });
  } catch (error) {
    console.error("Error fetching market trends:", error);
    return mockMarketTrends;
  }
}

export async function getMarketNews(
  limit: number = 10,
): Promise<MarketNews[]> {
  try {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(mockMarketNews.slice(0, limit)),
        1000,
      );
    });
  } catch (error) {
    console.error("Error fetching market news:", error);
    return mockMarketNews.slice(0, limit);
  }
}

export async function getRegionalPrices(): Promise<
  RegionalPrice[]
> {
  try {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRegionalPrices), 1200);
    });
  } catch (error) {
    console.error("Error fetching regional prices:", error);
    return mockRegionalPrices;
  }
}

export async function getGrainPriceHistory(
  grain: string,
  days: number = 30,
): Promise<
  Array<{ date: string; price: number; volume: number }>
> {
  try {
    // Generate mock historical data
    const history: { date: string; price: number; volume: number; }[] | PromiseLike<{ date: string; price: number; volume: number; }[]> = [];
    const currentPrice =
      mockGrainPrices.find((p) => p.grain === grain)
        ?.currentPrice || 2500;

    for (let i = days; i >= 0; i--) {
      const date = new Date(
        Date.now() - i * 24 * 60 * 60 * 1000,
      );
      const randomVariation = (Math.random() - 0.5) * 100;
      const trendFactor = i / days; // Simulate upward trend

      history.push({
        date: date.toISOString().split("T")[0],
        price: Math.round(
          currentPrice - trendFactor * 150 + randomVariation,
        ),
        volume: Math.floor(2000 + Math.random() * 2000),
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(history), 1000);
    });
  } catch (error) {
    console.error("Error fetching price history:", error);
    return [];
  }
}

// Price alerts and recommendations
export function generatePriceAlerts(
  prices: GrainPrice[],
): Array<{
  grain: string;
  type: string;
  message: string;
  action: string;
}> {
  const alerts = [];

  for (const price of prices) {
    const changePercent = parseFloat(
      price.changePercent.replace("%", "").replace("+", ""),
    );

    if (changePercent > 5) {
      alerts.push({
        grain: price.grain,
        type: "High",
        message: `${price.grain} price crossed ₹${price.currentPrice} threshold. Good time to sell stored grain.`,
        action: "Consider Selling",
      });
    } else if (changePercent > 2) {
      alerts.push({
        grain: price.grain,
        type: "Opportunity",
        message: `${price.grain} showing positive trend with ${price.changePercent} increase.`,
        action: "Monitor Closely",
      });
    } else if (changePercent < -2) {
      alerts.push({
        grain: price.grain,
        type: "Watch",
        message: `${price.grain} price declining. Consider holding for better rates.`,
        action: "Hold Position",
      });
    }
  }

  return alerts;
}

// Market comparison
export function getBestMarketPrices(
  regionalPrices: RegionalPrice[],
  grain: string,
): Array<{ location: string; price: number; quality: string }> {
  return regionalPrices
    .filter((region) => region.prices[grain])
    .map((region) => ({
      location: region.location,
      price: region.prices[grain].price,
      quality: region.prices[grain].quality,
    }))
    .sort((a, b) => b.price - a.price);
}