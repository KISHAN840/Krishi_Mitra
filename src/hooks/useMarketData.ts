import { useState, useEffect } from 'react';
import { 
  getCurrentGrainPrices, 
  getMarketTrends, 
  getMarketNews, 
  getRegionalPrices,
  generatePriceAlerts,
  GrainPrice, 
  MarketTrend, 
  MarketNews, 
  RegionalPrice 
} from '../services/marketApi';

interface UseMarketDataReturn {
  grainPrices: GrainPrice[];
  marketTrends: MarketTrend[];
  marketNews: MarketNews[];
  regionalPrices: RegionalPrice[];
  priceAlerts: Array<{grain: string, type: string, message: string, action: string}>;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

export function useMarketData(refreshInterval?: number): UseMarketDataReturn {
  const [grainPrices, setGrainPrices] = useState<GrainPrice[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [marketNews, setMarketNews] = useState<MarketNews[]>([]);
  const [regionalPrices, setRegionalPrices] = useState<RegionalPrice[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<Array<{grain: string, type: string, message: string, action: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [prices, trends, news, regional] = await Promise.all([
        getCurrentGrainPrices(),
        getMarketTrends(),
        getMarketNews(10),
        getRegionalPrices()
      ]);

      setGrainPrices(prices);
      setMarketTrends(trends);
      setMarketNews(news);
      setRegionalPrices(regional);

      // Generate price alerts based on current prices
      const alerts = generatePriceAlerts(prices);
      setPriceAlerts(alerts);

      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchMarketData();
  };

  // Initial fetch
  useEffect(() => {
    fetchMarketData();
  }, []);

  // Auto-refresh data at specified interval
  useEffect(() => {
    if (!refreshInterval) return;

    const interval = setInterval(fetchMarketData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return {
    grainPrices,
    marketTrends,
    marketNews,
    regionalPrices,
    priceAlerts,
    loading,
    error,
    lastUpdated,
    refetch
  };
}