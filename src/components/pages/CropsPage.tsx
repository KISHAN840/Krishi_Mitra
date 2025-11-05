"use client";

import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Page } from "../Router";
import { Button } from "../ui/button";
import { useMemo } from "react"; // 1. Import useMemo for calculations
import { useFarmData } from "../../contexts/FarmDataContext"; // 2. Import your farm data hook
import { Loader2 } from "lucide-react"; // 3. Import a loading icon

interface CropsPageProps {
  onPageChange?: (page: Page) => void;
}

// 4. Helper function to get an icon
const getCropIcon = (cropName: string) => {
  const name = cropName.toLowerCase();
  if (name.includes("wheat")) return "🌾";
  if (name.includes("rice")) return "🍚";
  if (name.includes("corn")) return "🌽";
  if (name.includes("barley")) return "🌾";
  if (name.includes("millet")) return "🌾";
  return "🌱";
};

// 5. Helper function to get a default image
const getCropImage = (cropName: string) => {
  const name = cropName.toLowerCase();
  if (name.includes("wheat"))
    return "https://images.unsplash.com/photo-1721594489316-14f1cfff9566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGdyYWluJTIwaGFydmVzdCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzA4MTU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  if (name.includes("rice"))
    return "https://images.unsplash.com/photo-1722108499258-bbd299116c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmllbGQlMjBmYXJtaW5nJTIwYXNpYW4lMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTcwODE1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  if (name.includes("corn"))
    return "https://images.unsplash.com/photo-1595012255680-0a044900356a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwZmllbGQlMjBnb2xkZW4lMjBoYXJ2ZXN0fGVufDF8fHx8MTc1NzA4MTU3NXww&ixlib.rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  if (name.includes("barley"))
    return "https://images.unsplash.com/photo-1629972988999-7e3a61d099df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJsZXklMjBncmFpbiUyMGZpZWxkJTIwZmFybWluZ3xlbnwxfHx8fDE3NTcwODE2Mzl8MA&ixlib.rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  if (name.includes("millet"))
    return "https://images.unsplash.com/photo-1738640920336-26aae3e5db67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxsZXQlMjBncmFpbiUyMGhhcnZlc3QlMjBmYXJtaW5nfGVufDF8fHx8MTc1NzA4MTY0MHww&ixlib.rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  return "https://images.unsplash.com/photo-1754976645304-b27b44ddb9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwbGFuZHNjYXBlJTIwZ3JlZW4lMjBmaWVsZHN8ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib.rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
};

// 6. Helper to format the harvest date
const formatHarvestDate = (dateString: string) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    // Formats "2025-04-15" into "Apr 2025"
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC", // Ensure consistent parsing
    });
  } catch (e) {
    return dateString; // Fallback if date is invalid
  }
};

export function CropsPage({ onPageChange }: CropsPageProps) {
  // 7. Get live data from your context
  const { crops, farmStats, loading: farmLoading } = useFarmData();

  // 9. Calculate average health dynamically
  const avgHealth = useMemo(() => {
    if (!crops || crops.length === 0) return 0;
    const totalHealth = crops.reduce((sum, crop) => sum + crop.healthScore, 0);
    return Math.round(totalHealth / crops.length);
  }, [crops]);

  // (All other hardcoded arrays for zones, challenges, etc. remain the same)
  const farmingAreas = [
    { name: "Zone A", crops: ["Wheat", "Barley"], size: "12 acres", soilType: "Clay Loam", irrigation: "Drip System" },
    { name: "Zone B", crops: ["Rice", "Corn"], size: "11 acres", soilType: "Sandy Loam", irrigation: "Flood Irrigation" },
    { name: "Zone C", crops: ["Millet"], size: "2.5 acres", soilType: "Black Soil", irrigation: "Sprinkler System" },
  ];
  const cropCalendar = [
    { month: "Jan", activities: ["Corn Harvest", "Soil Preparation", "Winter Wheat Care"] },
    { month: "Feb", activities: ["Millet Harvest", "Wheat Fertilization", "Land Plowing"] },
    { month: "Mar", activities: ["Rice Harvest", "Spring Plowing", "Seed Selection"] },
    { month: "Apr", activities: ["Wheat Harvest", "Summer Crop Planning", "Irrigation Setup"] },
  ];
  const farmingChallenges = [
    { problem: "Yellow leaves in wheat field - Zone A", diagnosis: "Nitrogen deficiency detected", solution: "Apply 46kg urea per acre immediately", urgency: "High", cost: "₹2,300/acre", timeline: "2-3 days" },
    { problem: "Irregular germination in corn field", diagnosis: "Seed quality and moisture issues", solution: "Replant gaps, adjust irrigation frequency", urgency: "Medium", cost: "₹1,800/acre", timeline: "1 week" },
    { problem: "Pest attack on rice crop", diagnosis: "Brown planthopper infestation", solution: "Spray Imidacloprid + proper drainage", urgency: "Critical", cost: "₹950/acre", timeline: "Immediate" }
  ];
  const dailyFarmActivities = [
    { time: "5:00 AM", activity: "Check irrigation systems", zone: "All Zones", farmer: "Raj Kumar" },
    { time: "7:00 AM", activity: "Manual weeding in rice fields", zone: "Zone B", farmer: "Suresh" },
    { time: "9:00 AM", activity: "Fertilizer application - wheat", zone: "Zone A", farmer: "Ramesh" },
    { time: "11:00 AM", activity: "Pest monitoring and treatment", zone: "Zone C", farmer: "Mukesh" },
    { time: "2:00 PM", activity: "Soil moisture testing", zone: "All Zones", farmer: "Raj Kumar" },
    { time: "4:00 PM", activity: "Harvest preparation - corn", zone: "Zone C", farmer: "Team" },
  ];

  // *** START OF FIX ***
  // Helper function for Status Badge classes
  const getStatusBadgeClasses = (status: string) => {
    const lowerStatus = status.toLowerCase(); // Ensure comparison is case-insensitive
    if (lowerStatus === "growing") {
      return "bg-emerald-500/30 text-emerald-200 border-emerald-400/40";
    } else if (lowerStatus === "flowering") { // Added 'flowering' based on your code
      return "bg-yellow-500/30 text-yellow-200 border-yellow-400/40";
    } else if (lowerStatus === "harvesting") {
      return "bg-orange-500/30 text-orange-200 border-orange-400/40";
    } else if (lowerStatus === "planted") {
      return "bg-blue-500/30 text-blue-200 border-blue-400/40";
    } else {
      // Default for harvested or unknown status
      return "bg-gray-500/30 text-gray-200 border-gray-400/40";
    }
  };
  // *** END OF FIX ***

  return (
    <div className="pt-16 min-h-screen">
      {/* Enhanced Header with Hero Image */}
      <div className="relative py-20 overflow-hidden">
        {/* ... (Background, Floating Elements, Header text are unchanged) ... */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1754976645304-b27b44ddb9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmYXJtaW5nJTIwbGFuZHNjYXBlJTIwZ3JlZW4lMjBmaWVsZHN8ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib.rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-teal-800/80 to-green-900/90" />

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 backdrop-blur-sm rounded-3xl mb-8 border border-emerald-400/30">
            <span className="text-5xl">🌾</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white dark:text-white drop-shadow-2xl">
            Crop <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Intelligence</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 dark:text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md">
            Advanced crop monitoring and farm management system
          </p>

          {/* 10. --- MODIFIED Stats Row --- */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90 dark:text-white/90">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <span className="text-2xl block">{farmStats.totalFarmArea}</span>
              <span className="text-sm opacity-80">Total Acres</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <span className="text-2xl block">{farmStats.totalCrops}</span>
              <span className="text-sm opacity-80">Crop Varieties</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
              <span className="text-2xl block">{avgHealth}%</span>
              <span className="text-sm opacity-80">Avg Health</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Action Cards (Unchanged) */}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-300/20 hover:border-emerald-400/40 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="text-foreground dark:text-white mb-2">Wheat Harvesting</h3>
                <p className="text-muted-foreground dark:text-white/70 text-sm">Monitor harvest progress</p>
                <div className="mt-4 flex items-center text-emerald-400 text-sm">
                  <span>View Details</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-300/20 hover:border-blue-400/40 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">💧</span>
                </div>
                <h3 className="text-foreground dark:text-white mb-2">Smart Irrigation</h3>
                <p className="text-muted-foreground dark:text-white/70 text-sm">Optimize water usage</p>
                <div className="mt-4 flex items-center text-blue-400 text-sm">
                  <span>View Details</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-orange-300/20 hover:border-orange-400/40 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🌽</span>
                </div>
                <h3 className="text-foreground dark:text-white mb-2">Corn Fields</h3>
                <p className="text-muted-foreground dark:text-white/70 text-sm">Track growth stages</p>
                <div className="mt-4 flex items-center text-orange-400 text-sm">
                  <span>View Details</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>

            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-75 group-hover:opacity-100 transition-opacity blur-sm"></div>
              <div className="relative bg-white/10 dark:bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-foreground dark:text-white mb-2">Analytics</h3>
                <p className="text-muted-foreground dark:text-white/70 text-sm">Performance insights</p>
                <div className="mt-4 flex items-center text-purple-400 text-sm">
                  <span>View Details</span>
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. --- MODIFIED Enhanced Grain Types Grid --- */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground dark:text-white mb-4 drop-shadow-lg">
              Your{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Crop Portfolio
              </span>
            </h2>
            <p className="text-muted-foreground dark:text-white/70 text-lg max-w-2xl mx-auto">
              Monitor real-time health, growth stages, and harvest predictions for all
              your crops
            </p>
          </div>

          {/* 12. Add Loading and Empty States */}
          {farmLoading ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400">
              <Loader2 className="w-8 h-8 mx-auto animate-spin" />
              <p className="mt-4">Loading your crop portfolio...</p>
            </div>
          ) : crops.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400">
              <h3 className="text-2xl text-white">No Crops Found</h3>
              <p className="mt-2">
                Go to the "Crops" page to add your first crop.
              </p>
              <Button
                onClick={() => onPageChange?.("crops")}
                className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-500"
              >
                Add Crop
              </Button>
            </div>
          ) : (
            // 13. Map over `crops` array instead of `grainTypes`
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {crops.map((crop) => (
                <div
                  key={crop.id} // Use database ID
                  className="group relative overflow-hidden rounded-3xl crop-card-glow transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                  onClick={() => onPageChange?.("crops")} // Go to crops page on click
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <ImageWithFallback
                      src={getCropImage(crop.name)} // Use helper
                      alt={crop.name}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  
                  {/* Status Badge - Uses helper function now */}
                  <div className="absolute top-4 right-4 z-20">
                    <div
                      className={`px-4 py-2 rounded-full backdrop-blur-md border text-sm transition-all duration-300 group-hover:scale-110 ${getStatusBadgeClasses(crop.status)}`} 
                    >
                      <span className="flex items-center gap-2 capitalize">
                        <div
                          className={`w-2 h-2 rounded-full animate-pulse ${
                            crop.status.toLowerCase() === "growing" ? "bg-emerald-400" :
                            crop.status.toLowerCase() === "flowering" ? "bg-yellow-400" :
                            crop.status.toLowerCase() === "harvesting" ? "bg-orange-400" :
                            crop.status.toLowerCase() === "planted" ? "bg-blue-400" :
                            "bg-gray-400"
                          }`}
                        />
                        {crop.status}
                      </span>
                    </div>
                  </div>
                  {/* *** END OF FIX *** */}


                  {/* Health Indicator */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 bg-black/40 dark:bg-black/40 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 border border-white/20 dark:border-white/20">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          crop.healthScore >= 90 ? "bg-emerald-400" :
                          crop.healthScore >= 75 ? "bg-yellow-400" :
                          "bg-red-400"
                        }`}
                      />
                      <span className="text-white dark:text-white text-sm">
                        {crop.healthScore}%
                      </span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10 p-8 h-80 flex flex-col justify-end">
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl drop-shadow-lg">
                            {getCropIcon(crop.name)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl text-white dark:text-white drop-shadow-lg group-hover:text-emerald-300 transition-colors">
                            {crop.name}
                          </h3>
                          <p className="text-white/60 dark:text-white/60 text-sm">
                            {crop.variety}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 dark:bg-white/5 bg-black/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 dark:border-white/10 border-black/20 group-hover:bg-white/10 dark:group-hover:bg-white/10 group-hover:bg-black/20 transition-colors">
                        <p className="text-white/60 dark:text-white/60 text-black/60 text-xs mb-1">
                          Area
                        </p>
                        <p className="text-white dark:text-white text-foreground drop-shadow-sm">
                          {crop.farmingArea} acres
                        </p>
                      </div>
                      <div className="bg-white/5 dark:bg-white/5 bg-black/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 dark:border-white/10 border-black/20 group-hover:bg-white/10 dark:group-hover:bg-white/10 group-hover:bg-black/20 transition-colors">
                        <p className="text-white/60 dark:text-white/60 text-black/60 text-xs mb-1">
                          Harvest
                        </p>
                        <p className="text-emerald-300 drop-shadow-sm">
                          {formatHarvestDate(crop.expectedHarvest)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <button
                        onClick={() => onPageChange?.("crops")}
                        className="w-full bg-gradient-to-r from-emerald-500/80 to-teal-500/80 hover:from-emerald-500 hover:to-teal-500 backdrop-blur-sm text-white dark:text-white py-3 rounded-xl border border-emerald-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
                      >
                        View Detailed Analytics
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Enhanced Farming Areas (Unchanged) */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground dark:text-white mb-4 drop-shadow-lg">
              Farm{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Zones
              </span>
            </h2>
            <p className="text-muted-foreground dark:text-white/70 text-lg">
              Manage different areas of your farm with optimized growing conditions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {farmingAreas.map((area, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-red-500/20 opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="relative backdrop-blur-lg bg-white/5 dark:bg-slate-800/20 rounded-2xl p-8 border border-amber-300/20 hover:border-amber-400/40 transition-all duration-300 group-hover:transform group-hover:-translate-y-2 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-400/30">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <h3 className="text-2xl text-foreground dark:text-white group-hover:text-amber-300 transition-colors">{area.name}</h3>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-400/30">
                      Active
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="bg-white/5 dark:bg-white/5 bg-black/10 rounded-xl p-4 border border-white/10 dark:border-white/10 border-black/20">
                      <span className="text-white/60 dark:text-white/60 text-muted-foreground text-sm block mb-2">Crops Grown</span>
                      <div className="flex flex-wrap gap-2">
                        {area.crops.map((crop, cropIndex) => (
                          <span key={cropIndex} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm border border-amber-400/30">
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 dark:bg-white/5 bg-black/10 rounded-xl p-4 border border-white/10 dark:border-white/10 border-black/20">
                        <span className="text-white/60 dark:text-white/60 text-muted-foreground text-sm block mb-1">Area Size</span>
                        <p className="text-white dark:text-white text-foreground text-lg">{area.size}</p>
                      </div>
                      <div className="bg-white/5 dark:bg-white/5 bg-black/10 rounded-xl p-4 border border-white/10 dark:border-white/10 border-black/20">
                        <span className="text-white/60 dark:text-white/60 text-muted-foreground text-sm block mb-1">Soil Type</span>
                        <p className="text-white dark:text-white text-foreground text-lg">{area.soilType}</p>
                      </div>
                    </div>
                    <div className="bg-white/5 dark:bg-white/5 bg-black/10 rounded-xl p-4 border border-white/10 dark:border-white/10 border-black/20">
                      <span className="text-white/60 dark:text-white/60 text-muted-foreground text-sm block mb-2">Irrigation System</span>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <span className="text-blue-400">💧</span>
                        </div>
                        <span className="text-blue-300">{area.irrigation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button className="w-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/40 hover:to-orange-500/40 text-amber-300 py-3 rounded-xl border border-amber-400/30 transition-all duration-300">
                      Manage Zone
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Farming Challenges */}
        <section className="mb-12">
          <h2 className="text-foreground dark:text-white text-2xl mb-6">
            Current Farming Challenges & Solutions
          </h2>
          <div className="space-y-6">
            {farmingChallenges.map((challenge, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#e74c3c]/30">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">⚠️</span>
                      <h3 className="text-[#e74c3c]">{challenge.problem}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        challenge.urgency === 'Critical' ? 'bg-[#e74c3c]/20 text-[#e74c3c]' :
                        challenge.urgency === 'High' ? 'bg-[#f1c40f]/20 text-[#f1c40f]' :
                        'bg-[#3498db]/20 text-[#3498db]'
                      }`}>
                        {challenge.urgency}
                      </span>
                    </div>
                    <p className="text-muted-foreground dark:text-white/80 mb-2">🔍 <strong>Diagnosis:</strong> {challenge.diagnosis}</p>
                    <p className="text-[#2ecc71] mb-3">💡 <strong>Solution:</strong> {challenge.solution}</p>
                    <div className="flex gap-6 text-sm">
                      <span className="text-muted-foreground dark:text-white/70">💰 Cost: <span className="text-[#f1c40f]">{challenge.cost}</span></span>
                      <span className="text-muted-foreground dark:text-white/70">⏱️ Timeline: <span className="text-foreground dark:text-white">{challenge.timeline}</span></span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white dark:text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                    Take Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Farm Activity Schedule */}
        <section className="mb-12">
          <h2 className="text-foreground dark:text-white text-2xl mb-6">
            Today's Farm Activity Schedule
          </h2>
          <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#2ecc71]/30">
            <div className="space-y-4">
              {dailyFarmActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <div className="text-[#f1c40f] font-mono text-sm min-w-[70px]">{activity.time}</div>
                  <div className="flex-1">
                    <p className="text-foreground dark:text-white">{activity.activity}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground dark:text-white/70 mt-1">
                      <span>📍 {activity.zone}</span>
                      <span>👤 {activity.farmer}</span>
                    </div>
                  </div>
                  <span className="text-[#2ecc71] text-sm px-3 py-1 bg-[#2ecc71]/20 rounded-full">Scheduled</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Crop Calendar */}
        <section>
          <h2 className="text-foreground dark:text-white text-2xl mb-6">
            Upcoming Crop Calendar
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {cropCalendar.map((month, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/5 rounded-xl p-4 border border-[#2ecc71]/20">
                <h4 className="text-[#f1c40f] mb-3">{month.month} 2025</h4>
                <ul className="space-y-2">
                  {month.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="text-muted-foreground dark:text-white/80 text-sm flex items-center">
                      <span className="w-2 h-2 bg-[#2ecc71] rounded-full mr-2"></span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}