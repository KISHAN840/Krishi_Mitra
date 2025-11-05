"use client";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useMarketData } from "../../hooks/useMarketData";
import { Page } from "../Router";
import { useState } from "react";
import {
  useInventory,
  InventoryData,
  InventoryFormData,
} from "../../contexts/InventoryContext"; // Import your new hook
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"; // Import Dialog components
import { Input } from "../ui/input"; // Import Input
import { Label } from "../ui/label"; // Import Label
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; // Import Select
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react"; // Import icons

interface MarketPageProps {
  onPageChange?: (page: Page) => void;
}

// Helper function to format the number as Indian Rupees
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

export function MarketPage({ onPageChange }: MarketPageProps) {
  const {
    grainPrices,
    marketNews,
    priceAlerts,
    loading,
    error,
    lastUpdated,
    refetch,
  } = useMarketData(5 * 60 * 1000); // Refresh every 5 minutes

  // --- Start of Inventory Logic ---
  const {
    inventory,
    loading: inventoryLoading,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  } = useInventory();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryData | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState<InventoryFormData>({
    crop: "",
    quantity: 0,
    readyToSell: 0,
    estimatedValue: 0,
    storage: "",
    condition: "Good",
  });

  const resetForm = () => {
    setFormData({
      crop: "",
      quantity: 0,
      readyToSell: 0,
      estimatedValue: 0,
      storage: "",
      condition: "Good",
    });
    setEditingItem(null);
  };

  const handleEdit = (item: InventoryData) => {
    setFormData(item);
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteInventoryItem(id);
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingItem) {
        await updateInventoryItem(editingItem.id, formData);
      } else {
        await addInventoryItem(formData);
      }
      resetForm();
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error saving item:", err);
    } finally {
      setFormLoading(false);
    }
  };
  // --- End of Inventory Logic ---

  // (Your hardcoded data for opportunities, concerns, etc. is unchanged)
  const marketOpportunities = [
    {
      type: "Bulk Order",
      buyer: "Future Foods Ltd.",
      crop: "Wheat",
      quantity: "50 tons",
      price: "₹2,200/quintal",
      deadline: "Jan 15, 2025",
      rating: 4.8,
    },
    {
      type: "Contract Farming",
      buyer: "Agri Solutions",
      crop: "Basmati Rice",
      quantity: "100 tons",
      price: "₹4,650/quintal",
      deadline: "Mar 2025",
      rating: 4.9,
    },
    {
      type: "Export Order",
      buyer: "Global Grains",
      crop: "Organic Millet",
      quantity: "25 tons",
      price: "₹3,450/quintal",
      deadline: "Feb 2025",
      rating: 4.7,
    },
  ];

  const farmerConcerns = [
    {
      concern: "When is the best time to sell wheat to get maximum profit?",
      solution:
        "Market analysis shows wheat prices typically peak in April-May. Current trend suggests waiting 2-3 weeks for ₹200-300/quintal increase.",
      urgency: "Medium",
      potentialGain: "₹2,55,000",
    },
    {
      concern: "Should I accept the bulk order offer or wait for better prices?",
      solution:
        "Current offer (₹2,200/quintal) is 2.3% above market rate. Risk of price drop exists due to upcoming harvest season.",
      urgency: "High",
      potentialGain: "₹1,12,000",
    },
    {
      concern: "Quality grading is affecting my crop prices - how to improve?",
      solution:
        "Invest in proper storage (moisture <14%), cleaning equipment, and get quality certification. Premium grade brings 15-20% higher prices.",
      urgency: "Low",
      potentialGain: "₹4,50,000 annually",
    },
  ];

  const marketTrends = [
    {
      factor: "Festival Season Demand",
      impact: "Prices increase 8-12%",
      timeline: "Next 2 weeks",
      crops: "Rice, Wheat",
    },
    {
      factor: "Export Opportunities",
      impact: "Premium prices for quality crops",
      timeline: "Ongoing",
      crops: "Basmati Rice, Organic Millet",
    },
    {
      factor: "Government Procurement",
      impact: "MSP support available",
      timeline: "Jan-Mar",
      crops: "Wheat, Rice",
    },
    {
      factor: "Weather Impact",
      impact: "Supply shortage may increase prices",
      timeline: "Feb-Apr",
      crops: "Corn, Barley",
    },
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566701802598-b3e76bc465ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXQlMjBhZ3JpY3VsdHVyZSUyMGZhcm1lciUyMHNlbGxpbmclMjBwcm9kdWNlfGVufDF8fHx8MTc1NzA4MTU3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 via-slate-800/70 to-green-900/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl text-yellow-300 mb-4 drop-shadow-lg">
            Market Intelligence
          </h1>
          <p className="text-white/90 text-lg drop-shadow-md">
            Real-time grain prices and trading opportunities
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Market Prices Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-2xl">Live Grain Prices</h2>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <p className="text-white/60 text-sm">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
              <Button onClick={refetch} size="sm" disabled={loading}>
                {loading ? "Updating..." : "Refresh"}
              </Button>
            </div>
          </div>

          {loading && !grainPrices.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#f1c40f]/30 animate-pulse"
                >
                  <div className="h-6 bg-white/20 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/20 rounded"></div>
                    <div className="h-4 bg-white/20 rounded"></div>
                    <div className="h-4 bg-white/20 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error && !grainPrices.length ? (
            <div className="text-center py-8">
              <p className="text-red-400 mb-4">
                Failed to load market data: {error}
              </p>
              <Button onClick={refetch}>Retry</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grainPrices.map((grain) => (
                <div
                  key={grain.grain}
                  className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#f1c40f]/30 hover:border-[#f1c40f]/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">
                        {grain.grain === "Wheat"
                          ? "🌾"
                          : grain.grain === "Rice"
                          ? "🍚"
                          : grain.grain === "Corn"
                          ? "🌽"
                          : grain.grain === "Barley"
                          ? "🌾"
                          : "🌾"}
                      </span>
                      <h3 className="text-white text-xl">{grain.grain}</h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${
                        grain.change > 0
                          ? "bg-[#2ecc71]/20 text-[#2ecc71]"
                          : "bg-[#e74c3c]/20 text-[#e74c3c]"
                      }`}
                    >
                      {grain.change > 0 ? "↗️" : "↘️"} {grain.changePercent}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Price/Quintal:</span>
                      <span className="text-[#f1c40f] text-lg">
                        ₹{grain.currentPrice.toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Volume:</span>
                      <span className="text-white">{grain.volume} tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Quality:</span>
                      <span className="text-[#2ecc71]">Grade {grain.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Market:</span>
                      <span className="text-white/90 text-sm">
                        {grain.marketName}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onPageChange?.("grain-trends")}
                    className="w-full mt-4 bg-gradient-to-r from-[#f1c40f]/20 to-[#e67e22]/20 hover:from-[#f1c40f]/30 hover:to-[#e67e22]/30 rounded-lg py-2 text-[#f1c40f] transition-all"
                  >
                    View Trends
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Price Alerts */}
        {priceAlerts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-white text-2xl mb-6">
              Price Alerts & Recommendations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {priceAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#f1c40f]/30"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">
                      {alert.grain === "Wheat"
                        ? "🌾"
                        : alert.grain === "Rice"
                        ? "🍚"
                        : alert.grain === "Corn"
                        ? "🌽"
                        : alert.grain === "Barley"
                        ? "🌾"
                        : "🌾"}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-white text-lg">{alert.grain} Alert</h3>
                        <Badge
                          className={
                            alert.type === "High"
                              ? "bg-[#2ecc71]/20 text-[#2ecc71]"
                              : alert.type === "Opportunity"
                              ? "bg-[#3498db]/20 text-[#3498db]"
                              : "bg-[#f1c40f]/20 text-[#f1c40f]"
                          }
                        >
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-white/80 mb-3">{alert.message}</p>
                      <Button
                        size="sm"
                        className="bg-[#f1c40f] hover:bg-[#e67e22] text-black"
                      >
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Market News */}
        {marketNews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-white text-2xl mb-6">Latest Market News</h2>
            <div className="space-y-4">
              {marketNews.slice(0, 3).map((news) => (
                <div
                  key={news.id}
                  className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#f39c12]/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-white text-lg">{news.title}</h3>
                        <Badge
                          className={
                            news.impact === "positive"
                              ? "bg-[#2ecc71]/20 text-[#2ecc71]"
                              : news.impact === "negative"
                              ? "bg-[#e74c3c]/20 text-[#e74c3c]"
                              : "bg-[#3498db]/20 text-[#3498db]"
                          }
                        >
                          {news.impact}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {news.importance}
                        </Badge>
                      </div>
                      <p className="text-white/80 mb-3">{news.summary}</p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>Source: {news.source}</span>
                        <span>Affects: {news.grains.join(", ")}</span>
                        <span>{new Date(news.publishedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Farmer Market Concerns & Solutions */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">
            Common Farmer Market Concerns & Expert Advice
          </h2>
          <div className="space-y-6">
            {farmerConcerns.map((concern, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#f39c12]/30"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">❓</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-white text-lg">{concern.concern}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          concern.urgency === "High"
                            ? "bg-[#e74c3c]/20 text-[#e74c3c]"
                            : concern.urgency === "Medium"
                            ? "bg-[#f1c40f]/20 text-[#f1c40f]"
                            : "bg-[#2ecc71]/20 text-[#2ecc71]"
                        }`}
                      >
                        {concern.urgency} Priority
                      </span>
                    </div>
                    <p className="text-[#3498db] mb-3">
                      💡 <strong>Expert Advice:</strong> {concern.solution}
                    </p>
                    <p className="text-[#2ecc71]">
                      💰 <strong>Potential Gain:</strong> {concern.potentialGain}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Trends & Factors */}
        <section className="mb-12">
          <h2 className="text-white text-2xl mb-6">
            Market Trends & Influencing Factors
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {marketTrends.map((trend, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-[#f1c40f]/20"
              >
                <h3 className="text-[#f1c40f] text-lg mb-3">{trend.factor}</h3>
                <p className="text-white mb-2">
                  <strong>Impact:</strong> {trend.impact}
                </p>
                <p className="text-[#3498db] mb-2">
                  <strong>Timeline:</strong> {trend.timeline}
                </p>
                <p className="text-[#2ecc71]">
                  <strong>Affects:</strong> {trend.crops}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- MODIFIED "Your Inventory" Section --- */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl">Your Inventory</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={resetForm}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Edit Inventory" : "Add to Inventory"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="crop">Crop Name</Label>
                    <Input
                      id="crop"
                      value={formData.crop}
                      onChange={(e) =>
                        setFormData({ ...formData, crop: e.target.value })
                      }
                      placeholder="e.g., Wheat"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Total Stock (tons)</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantity: parseFloat(e.target.value) || 0,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="readyToSell">Ready to Sell (tons)</Label>
                      <Input
                        id="readyToSell"
                        type="number"
                        value={formData.readyToSell}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            readyToSell: parseFloat(e.target.value) || 0,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="storage">Storage Location</Label>
                    <Input
                      id="storage"
                      value={formData.storage}
                      onChange={(e) =>
                        setFormData({ ...formData, storage: e.target.value })
                      }
                      placeholder="e.g., Warehouse A"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="condition">Condition</Label>
                      <Select
                        value={formData.condition}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, condition: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Excellent">Excellent</SelectItem>
                          <SelectItem value="Premium">Premium</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="estimatedValue">Estimated Value (₹)</Label>
                      <Input
                        id="estimatedValue"
                        type="number"
                        value={formData.estimatedValue}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            estimatedValue: parseInt(e.target.value) || 0,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={formLoading}
                    >
                      {formLoading && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {editingItem ? "Update Item" : "Add Item"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setIsDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {inventoryLoading ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              <Loader2 className="w-6 h-6 mx-auto animate-spin" />
              <p>Loading your inventory...</p>
            </div>
          ) : inventory.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              You haven't added any items to your inventory yet.
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="relative backdrop-blur-lg bg-gradient-to-br from-[#2ecc71]/20 to-[#27ae60]/20 rounded-xl p-6 border border-[#2ecc71]/30"
                >
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="p-2 h-7 w-7 bg-white/10"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id)}
                      className="p-2 h-7 w-7 text-red-600 hover:text-red-700 bg-white/10"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <h4 className="text-[#2ecc71] text-xl mb-4">{item.crop}</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-white/70 text-sm">Total Stock:</span>
                      <p className="text-white text-lg">{item.quantity} tons</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">Ready to Sell:</span>
                      <p className="text-[#f1c40f]">{item.readyToSell} tons</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">Storage:</span>
                      <p className="text-white">{item.storage}</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">Condition:</span>
                      <p className="text-[#2ecc71]">{item.condition}</p>
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">
                        Estimated Value:
                      </span>
                      <p className="text-[#2ecc71] text-lg">
                        {formatCurrency(item.estimatedValue)}
                      </p>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-[#2ecc71] hover:bg-[#27ae60] rounded-lg py-2 text-black transition-all">
                    Sell Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Market Opportunities */}
        <section>
          <h2 className="text-white text-2xl mb-6">Trading Opportunities</h2>
          <div className="space-y-4">
            {marketOpportunities.map((opportunity, index) => (
              <div
                key={index}
                className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-[#f1c40f]/20 hover:border-[#f1c40f]/40 transition-all"
              >
                <div className="grid md:grid-cols-6 gap-4 items-center">
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        opportunity.type === "Bulk Order"
                          ? "bg-[#3498db]/20 text-[#3498db]"
                          : opportunity.type === "Contract Farming"
                          ? "bg-[#2ecc71]/20 text-[#2ecc71]"
                          : "bg-[#9b59b6]/20 text-[#9b59b6]"
                      }`}
                    >
                      {opportunity.type}
                    </span>
                    <p className="text-white mt-2">{opportunity.buyer}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-[#f1c40f]">★ {opportunity.rating}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-white/70 text-sm">Crop</p>
                    <p className="text-white">{opportunity.crop}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-white/70 text-sm">Quantity</p>
                    <p className="text-[#2ecc71]">{opportunity.quantity}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-white/70 text-sm">Price Offered</p>
                    <p className="text-[#f1c40f]">{opportunity.price}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-white/70 text-sm">Deadline</p>
                    <p className="text-white">{opportunity.deadline}</p>
                  </div>

                  <div className="text-right">
                    <button className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] hover:from-[#27ae60] hover:to-[#229954] px-6 py-2 rounded-lg text-black transition-all">
                      Accept Deal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Activity Showcase */}
        <section className="mt-12 mb-8">
          <h2 className="text-white text-2xl mb-6">Live Market Activity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden h-48">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1678274324663-afc2c68eeeec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdldGFibGUlMjBtYXJrZXQlMjBmYXJtaW5nJTIwdHJhZGV8ZW58MXx8fHwxNzU3MDE2NjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Market trading activity"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#f1c40f] text-black px-3 py-1 rounded text-sm">
                    🔴 LIVE TRADING
                  </span>
                  <p className="text-white mt-2">Mandi Ghaziabad - Active Now</p>
                  <p className="text-white/80 text-sm">
                    250+ buyers, 180+ sellers online
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-48">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1695150601855-f545034a070a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmFybWluZyUyMGhhcnZlc3Rpbmd8ZW58MXx8fHwxNzU3MDE2NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Rice harvest ready for market"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#2ecc71] text-white px-3 py-1 rounded text-sm">
                    📦 READY TO SHIP
                  </span>
                  <p className="text-white mt-2">Premium Basmati Rice</p>
                  <p className="text-white/80 text-sm">
                    Fresh harvest from Zone B
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Insights */}
        <section className="mt-12">
          <h2 className="text-white text-2xl mb-6">Market Insights</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="backdrop-blur-lg bg-gradient-to-br from-[#3498db]/20 to-[#2980b9]/20 rounded-xl p-6 border border-[#3498db]/30">
              <h4 className="text-[#3498db] mb-3">Best Selling Crop</h4>
              <div className="text-white text-2xl mb-1">🌾 Wheat</div>
              <p className="text-white/70 text-sm">Highest demand this week</p>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#f1c40f]/20 to-[#f39c12]/20 rounded-xl p-6 border border-[#f1c40f]/30">
              <h4 className="text-[#f1c40f] mb-3">Price Trend</h4>
              <div className="text-white text-2xl mb-1">📈 Rising</div>
              <p className="text-white/70 text-sm">Overall 8% increase</p>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#2ecc71]/20 to-[#27ae60]/20 rounded-xl p-6 border border-[#2ecc71]/30">
              <h4 className="text-[#2ecc71] mb-3">Your Earnings</h4>
              <div className="text-white text-2xl mb-1">₹62,85,000</div>
              <p className="text-white/70 text-sm">Total inventory value</p>
            </div>

            <div className="backdrop-blur-lg bg-gradient-to-br from-[#9b59b6]/20 to-[#8e44ad]/20 rounded-xl p-6 border border-[#9b59b6]/30">
              <h4 className="text-[#9b59b6] mb-3">Active Deals</h4>
              <div className="text-white text-2xl mb-1">5</div>
              <p className="text-white/70 text-sm">Pending negotiations</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}