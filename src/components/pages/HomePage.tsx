import { HeroSection } from "../HeroSection";
import { WeatherCard } from "../WeatherCard";
import { WeatherForecast } from "../WeatherForecast";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { FarmingActivitiesShowcase } from "../FarmingActivitiesShowcase";
import { CropManagement } from "../CropManagement";
import { LiveFarmSection } from "../LiveFarmSection";
import { Page } from "../Router";
import { useLanguage } from "../../contexts/LanguageContext";
import { useFarmData } from "../../contexts/FarmDataContext";

interface HomePageProps {
  onPageChange?: (page: Page) => void;
}

export function HomePage({ onPageChange }: HomePageProps) {
  const { t } = useLanguage();
  const { farmStats } = useFarmData();

  const recentActivities = [
    { time: "2 hours ago", activity: "Started drip irrigation for wheat fields in Zone A", icon: "💧", zone: "Zone A", status: "active" },
    { time: "5 hours ago", activity: "Applied NPK fertilizer to rice crops - 50kg/acre", icon: "🌾", zone: "Zone B", status: "completed" },
    { time: "Yesterday", activity: "Harvested 2.3 tons of premium basmati rice", icon: "🍅", zone: "Zone B", status: "completed" },
    { time: "2 days ago", activity: "Sowed 250kg corn seeds using tractor drill", icon: "🌽", zone: "Zone C", status: "completed" },
    { time: "3 days ago", activity: "Soil testing completed - pH levels optimal", icon: "🧪", zone: "All Zones", status: "completed" },
    { time: "4 days ago", activity: "Pesticide spray for aphid control on wheat", icon: "🚁", zone: "Zone A", status: "completed" },
  ];

  const farmerChallenges = [
    { 
      challenge: "When to apply urea fertilizer to wheat?", 
      solution: "Apply 2nd dose after 21-25 days of sowing when plants are 4-5 inches tall", 
      urgency: "medium",
      icon: "❓" 
    },
    { 
      challenge: "Brown spots on rice leaves - disease or nutrient deficiency?", 
      solution: "Likely bacterial leaf blight. Apply copper fungicide and reduce irrigation", 
      urgency: "high",
      icon: "🦠" 
    },
    { 
      challenge: "Should I harvest corn now or wait for market prices to improve?", 
      solution: "Current moisture 18%. Harvest now to avoid weather damage, store properly", 
      urgency: "high",
      icon: "💰" 
    }
  ];

  const fieldOperations = [
    { operation: "Land Preparation", status: "Completed", crops: "Wheat, Barley", nextAction: "Seed bed preparation" },
    { operation: "Sowing", status: "In Progress", crops: "Corn", nextAction: "Complete by next week" },
    { operation: "Weed Control", status: "Pending", crops: "Rice", nextAction: "Manual weeding scheduled" },
    { operation: "Harvesting", status: "Active", crops: "Millet", nextAction: "Weather dependent" },
  ];

  return (
    <div>
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Farming Activities Showcase */}
        <FarmingActivitiesShowcase />

        {/* Crop Management Section */}
        <div className="mb-12">
          <CropManagement />
        </div>

        {/* Live Farm Section */}
        <div className="mb-12">
          <LiveFarmSection />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weather Section */}
          <div className="lg:col-span-1">
            <WeatherCard />
            <WeatherForecast />
            
            {/* Quick Actions */}
            <div className="mt-6 modern-card rounded-2xl p-6">
              <h3 className="text-slate-800 dark:text-white mb-4">{t("home.quickActions")}</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onPageChange?.("irrigation")}
                  className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-3 text-left hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 transition-all border border-blue-200/50 dark:border-blue-600/30"
                >
                  <span className="text-slate-700 dark:text-slate-300">🚰 {t("home.irrigationSystem")}</span>
                </button>
                <button 
                  onClick={() => onPageChange?.("soil-moisture")}
                  className="w-full bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg p-3 text-left hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-800/30 dark:hover:to-green-800/30 transition-all border border-emerald-200/50 dark:border-emerald-600/30"
                >
                  <span className="text-slate-700 dark:text-slate-300">📊 {t("home.soilMoisture")}</span>
                </button>
                <button 
                  onClick={() => onPageChange?.("alerts")}
                  className="w-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg p-3 text-left hover:from-amber-100 hover:to-orange-100 dark:hover:from-amber-800/30 dark:hover:to-orange-800/30 transition-all border border-amber-200/50 dark:border-amber-600/30"
                >
                  <span className="text-slate-700 dark:text-slate-300">🔔 View All Alerts</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="modern-card rounded-2xl p-6 mb-6">
              <h3 className="text-slate-800 dark:text-white mb-6">Recent Farm Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-600/50 transition-all">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-slate-800 dark:text-white">{activity.activity}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">{activity.time}</p>
                        <span className="text-blue-600 dark:text-blue-400 text-sm">{activity.zone}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          activity.status === 'active' 
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300' 
                            : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmer Challenges & Solutions */}
            <div className="modern-card rounded-2xl p-6 mb-6">
              <h3 className="text-slate-800 dark:text-white mb-6">Common Farming Challenges & AI Solutions</h3>
              <div className="space-y-4">
                {farmerChallenges.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 border-l-4 border-orange-400 dark:border-orange-500">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-slate-800 dark:text-white">Q: {item.challenge}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.urgency === 'high' 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                          }`}>
                            {item.urgency} priority
                          </span>
                        </div>
                        <p className="text-emerald-700 dark:text-emerald-300 text-sm">💡 <strong>KrishiMitra AI:</strong> {item.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Operations Status */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#2ecc71]/30 mb-6">
              <h3 className="text-white mb-6">Current Field Operations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fieldOperations.map((op, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-white">{op.operation}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        op.status === 'Completed' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' :
                        op.status === 'In Progress' ? 'bg-[#f1c40f]/20 text-[#f1c40f]' :
                        op.status === 'Active' ? 'bg-[#3498db]/20 text-[#3498db]' :
                        'bg-[#e67e22]/20 text-[#e67e22]'
                      }`}>
                        {op.status}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-1">Crops: {op.crops}</p>
                    <p className="text-[#f1c40f] text-sm">Next: {op.nextAction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Farm Overview */}
            <div className="modern-card rounded-2xl p-6 mb-6">
              <h3 className="text-slate-800 dark:text-white mb-6">Today's Farm Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-600/30">
                  <div className="text-emerald-600 dark:text-emerald-400 text-sm mb-1">Crops Health</div>
                  <div className="text-slate-800 dark:text-white text-2xl">Excellent</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">95% healthy crops</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg p-4 border border-blue-200/50 dark:border-blue-600/30">
                  <div className="text-blue-600 dark:text-blue-400 text-sm mb-1">Irrigation Status</div>
                  <div className="text-slate-800 dark:text-white text-2xl">Active</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">Zone A & C watering</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 rounded-lg p-4 border border-amber-200/50 dark:border-amber-600/30">
                  <div className="text-amber-600 dark:text-amber-400 text-sm mb-1">Market Prices</div>
                  <div className="text-slate-800 dark:text-white text-2xl">Rising</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">Wheat +12% today</div>
                </div>
                <div className="bg-gradient-to-br from-stone-50 to-neutral-50 dark:from-stone-900/30 dark:to-neutral-900/30 rounded-lg p-4 border border-stone-200/50 dark:border-stone-600/30">
                  <div className="text-stone-600 dark:text-stone-400 text-sm mb-1">Soil Condition</div>
                  <div className="text-slate-800 dark:text-white text-2xl">Good</div>
                  <div className="text-slate-600 dark:text-slate-400 text-sm">Optimal moisture</div>
                </div>
              </div>
            </div>

            {/* Live Farm Activities */}
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl p-6 border border-[#2ecc71]/30">
              <h3 className="text-white mb-6">Live from Your Farm</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative rounded-lg overflow-hidden h-48">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1629288465751-07e42186084f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXJzJTIwd29ya2luZyUyMGZpZWxkfGVufDF8fHx8MTc1NzAxNjQwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Farmers working in field"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#2ecc71] text-black px-2 py-1 rounded text-sm">🔴 LIVE</span>
                      <p className="text-white mt-2">Field Work in Progress - Zone A</p>
                      <p className="text-white/80 text-sm">Wheat field maintenance</p>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-lg overflow-hidden h-48">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1689349483530-bb7a0734d9fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwZmFybWluZyUyMHdhdGVyfGVufDF8fHx8MTc1NzAxNjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Irrigation system working"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#3498db] text-white px-2 py-1 rounded text-sm">💧 ACTIVE</span>
                      <p className="text-white mt-2">Irrigation System Running</p>
                      <p className="text-white/80 text-sm">Zone B rice fields - 45% complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}