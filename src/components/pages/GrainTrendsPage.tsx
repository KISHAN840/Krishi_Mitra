import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Page } from "../Router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface GrainTrendsPageProps {
  onPageChange?: (page: Page) => void;
}

export function GrainTrendsPage({ onPageChange }: GrainTrendsPageProps) {
  const [selectedGrain, setSelectedGrain] = useState("wheat");
  const [timeframe, setTimeframe] = useState("1month");

  const grainPrices = {
    wheat: [
      { date: "Mar 1", price: 2650, volume: 2500, change: 0 },
      { date: "Mar 5", price: 2680, volume: 2800, change: 1.1 },
      { date: "Mar 10", price: 2720, volume: 3200, change: 2.6 },
      { date: "Mar 15", price: 2695, volume: 2900, change: -0.9 },
      { date: "Mar 20", price: 2745, volume: 3500, change: 3.6 },
      { date: "Today", price: 2780, volume: 3800, change: 4.9 }
    ],
    rice: [
      { date: "Mar 1", price: 3200, volume: 1800, change: 0 },
      { date: "Mar 5", price: 3180, volume: 2100, change: -0.6 },
      { date: "Mar 10", price: 3250, volume: 2300, change: 1.6 },
      { date: "Mar 15", price: 3290, volume: 2500, change: 2.8 },
      { date: "Mar 20", price: 3320, volume: 2700, change: 3.8 },
      { date: "Today", price: 3350, volume: 2900, change: 4.7 }
    ],
    corn: [
      { date: "Mar 1", price: 2100, volume: 3200, change: 0 },
      { date: "Mar 5", price: 2120, volume: 3500, change: 0.95 },
      { date: "Mar 10", price: 2085, volume: 3100, change: -0.7 },
      { date: "Mar 15", price: 2140, volume: 3800, change: 1.9 },
      { date: "Mar 20", price: 2165, volume: 4000, change: 3.1 },
      { date: "Today", price: 2190, volume: 4200, change: 4.3 }
    ]
  };

  const marketOverview = [
    { 
      grain: "Wheat", 
      currentPrice: 2780, 
      change: "+4.9%", 
      volume: "3.8K tons", 
      demand: "High",
      prediction: "Bullish",
      icon: "🌾"
    },
    { 
      grain: "Rice", 
      currentPrice: 3350, 
      change: "+4.7%", 
      volume: "2.9K tons", 
      demand: "Moderate",
      prediction: "Stable",
      icon: "🍚"
    },
    { 
      grain: "Corn", 
      currentPrice: 2190, 
      change: "+4.3%", 
      volume: "4.2K tons", 
      demand: "High",
      prediction: "Bullish",
      icon: "🌽"
    },
    { 
      grain: "Barley", 
      currentPrice: 2450, 
      change: "+2.1%", 
      volume: "1.5K tons", 
      demand: "Low",
      prediction: "Bearish",
      icon: "🌾"
    }
  ];

  const marketNews = [
    {
      title: "Wheat Exports Surge 15% This Quarter",
      summary: "Strong international demand driving wheat prices higher across major markets.",
      impact: "Positive",
      time: "2 hours ago",
      source: "AgriTrade News"
    },
    {
      title: "Monsoon Forecast Affects Rice Pricing",
      summary: "Early monsoon predictions suggest favorable conditions for rice cultivation.",
      impact: "Neutral",
      time: "5 hours ago",
      source: "Weather Agricultural"
    },
    {
      title: "Corn Demand Increases from Ethanol Industry",
      summary: "Rising ethanol production driving up corn prices in domestic markets.",
      impact: "Positive",
      time: "1 day ago",
      source: "Industry Report"
    },
    {
      title: "Storage Facility Expansion Announced",
      summary: "Government announces new storage facilities to reduce post-harvest losses.",
      impact: "Positive",
      time: "2 days ago",
      source: "Government Portal"
    }
  ];

  const priceAlerts = [
    {
      grain: "Wheat",
      type: "High",
      message: "Price crossed ₹2,750 threshold. Good time to sell stored grain.",
      action: "Consider Selling"
    },
    {
      grain: "Rice",
      type: "Opportunity",
      message: "Stable demand with good margins. Maintain inventory levels.",
      action: "Hold Position"
    },
    {
      grain: "Corn",
      type: "Watch",
      message: "Price increasing steadily. Monitor for selling opportunity.",
      action: "Monitor Closely"
    }
  ];

  const regionalPrices = [
    { location: "Delhi Mandi", wheat: 2785, rice: 3360, corn: 2195 },
    { location: "Mumbai APMC", wheat: 2795, rice: 3380, corn: 2210 },
    { location: "Chennai Market", wheat: 2770, rice: 3340, corn: 2180 },
    { location: "Kolkata Hub", wheat: 2760, rice: 3355, corn: 2185 },
    { location: "Bangalore Center", wheat: 2775, rice: 3365, corn: 2200 }
  ];

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'Bullish': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Bearish': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Positive': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'Negative': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjBncmFpbiUyMHRyYWRpbmclMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTcwODE1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-800/70 to-pink-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-indigo-300 mb-4 drop-shadow-lg">Live Grain Price Trends</h1>
              <p className="text-white/90 text-lg drop-shadow-md">Real-time market data and price predictions</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => onPageChange?.("market")}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              >
                ← Back to Market
              </Button>
              <Button
                onClick={() => onPageChange?.("home")}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {marketOverview.map((item, index) => (
            <Card key={index} className="modern-card p-6 text-center hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-xl text-purple-600 dark:text-purple-400 mb-1">₹{item.currentPrice}</div>
              <div className={`text-sm mb-2 ${getChangeColor(item.change)}`}>{item.change}</div>
              <div className="text-slate-600 dark:text-slate-300 text-xs mb-2">{item.grain}</div>
              <Badge className={getPredictionColor(item.prediction)}>
                {item.prediction}
              </Badge>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="regional">Regional Prices</TabsTrigger>
            <TabsTrigger value="news">Market News</TabsTrigger>
            <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <Card className="modern-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground text-xl">Price Trend Analysis</h3>
                <div className="flex gap-4">
                  <Select value={selectedGrain} onValueChange={setSelectedGrain}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1week">1 Week</SelectItem>
                      <SelectItem value="1month">1 Month</SelectItem>
                      <SelectItem value="3months">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={grainPrices[selectedGrain as keyof typeof grainPrices]}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [`₹${value}`, 'Price per quintal']} />
                    <Line type="monotone" dataKey="price" stroke="#8b5cf6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200/50 dark:border-green-600/30">
                  <h4 className="text-green-700 dark:text-green-300 mb-2">📈 Current Trend</h4>
                  <p className="text-green-600 dark:text-green-400 text-sm">Prices are trending upward with strong demand</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200/50 dark:border-blue-600/30">
                  <h4 className="text-blue-700 dark:text-blue-300 mb-2">🎯 Price Target</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">Expected to reach ₹2,850 within 2 weeks</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200/50 dark:border-purple-600/30">
                  <h4 className="text-purple-700 dark:text-purple-300 mb-2">💡 Recommendation</h4>
                  <p className="text-purple-600 dark:text-purple-400 text-sm">Hold inventory for better selling opportunity</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-6">Regional Price Comparison (₹ per quintal)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-3 text-muted-foreground">Market</th>
                      <th className="text-left p-3 text-muted-foreground">Wheat</th>
                      <th className="text-left p-3 text-muted-foreground">Rice</th>
                      <th className="text-left p-3 text-muted-foreground">Corn</th>
                      <th className="text-left p-3 text-muted-foreground">Best Deal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalPrices.map((location, index) => {
                      const bestPrice = Math.max(location.wheat, location.rice, location.corn);
                      const bestCrop = bestPrice === location.wheat ? 'Wheat' : bestPrice === location.rice ? 'Rice' : 'Corn';
                      
                      return (
                        <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                          <td className="p-3 text-foreground">{location.location}</td>
                          <td className="p-3 text-foreground">₹{location.wheat}</td>
                          <td className="p-3 text-foreground">₹{location.rice}</td>
                          <td className="p-3 text-foreground">₹{location.corn}</td>
                          <td className="p-3">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              {bestCrop}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="space-y-4">
              {marketNews.map((news, index) => (
                <Card key={index} className="modern-card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-foreground text-lg">{news.title}</h3>
                    <Badge className={getImpactColor(news.impact)}>
                      {news.impact}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{news.summary}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Source: {news.source}</span>
                    <span className="text-muted-foreground">{news.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              {priceAlerts.map((alert, index) => (
                <Card key={index} className="modern-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {alert.grain === 'Wheat' ? '🌾' : alert.grain === 'Rice' ? '🍚' : '🌽'}
                      </span>
                      <div>
                        <h3 className="text-foreground">{alert.grain} Price Alert</h3>
                        <Badge className={
                          alert.type === 'High' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          alert.type === 'Opportunity' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }>
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      {alert.action}
                    </Button>
                  </div>
                  <p className="text-muted-foreground">{alert.message}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}