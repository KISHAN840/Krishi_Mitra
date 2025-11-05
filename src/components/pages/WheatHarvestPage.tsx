import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Page } from "../Router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface WheatHarvestPageProps {
  onPageChange?: (page: Page) => void;
}

export function WheatHarvestPage({ onPageChange }: WheatHarvestPageProps) {
  const harvestData = {
    totalArea: 25.5,
    harvestedArea: 18.2,
    remainingArea: 7.3,
    expectedYield: 3200,
    actualYield: 2380,
    completionPercentage: 71,
    qualityGrade: "A",
    moistureContent: 12.5,
    startDate: "March 15, 2024",
    estimatedCompletion: "March 28, 2024"
  };

  const fieldProgress = [
    { field: "Field A-1", area: 8.5, harvested: 8.5, progress: 100, quality: "A", yield: 950 },
    { field: "Field A-2", area: 6.2, harvested: 5.8, progress: 94, quality: "A+", yield: 720 },
    { field: "Field B-1", area: 5.3, harvested: 3.9, progress: 74, quality: "A", yield: 485 },
    { field: "Field B-2", area: 5.5, harvested: 0, progress: 0, quality: "-", yield: 0 }
  ];

  const dailyHarvest = [
    { date: "Mar 15", harvested: 2.1, yield: 280 },
    { date: "Mar 16", harvested: 3.2, yield: 420 },
    { date: "Mar 17", harvested: 2.8, yield: 365 },
    { date: "Mar 18", harvested: 3.5, yield: 455 },
    { date: "Mar 19", harvested: 2.9, yield: 380 },
    { date: "Mar 20", harvested: 3.7, yield: 480 },
    { date: "Today", harvested: 0, yield: 0 }
  ];

  const marketPrices = [
    { grade: "A+", price: 2850, change: "+12%" },
    { grade: "A", price: 2720, change: "+8%" },
    { grade: "B+", price: 2580, change: "+5%" },
    { grade: "B", price: 2420, change: "+3%" }
  ];

  const equipmentStatus = [
    { name: "Harvester JD-9600", status: "Active", efficiency: 92, hoursUsed: 45, maintenanceDue: "In 15 hours" },
    { name: "Truck Transport-1", status: "Loading", efficiency: 88, hoursUsed: 32, maintenanceDue: "In 25 hours" },
    { name: "Grain Cleaner", status: "Processing", efficiency: 95, hoursUsed: 28, maintenanceDue: "In 40 hours" }
  ];

  const getQualityColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'A': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'B+': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'B': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGhhcnZlc3QlMjBmYXJtaW5nfGVufDF8fHx8MTc1NzA4MTU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 via-amber-800/70 to-orange-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-yellow-300 mb-4 drop-shadow-lg">Wheat Harvest Details</h1>
              <p className="text-white/90 text-lg drop-shadow-md">Monitor harvest progress and quality metrics</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => onPageChange?.("crops")}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              >
                ← Back to Crops
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
        {/* Harvest Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">🌾</div>
            <div className="text-2xl text-yellow-600 dark:text-yellow-400 mb-1">{harvestData.completionPercentage}%</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Harvest Complete</div>
            <Progress value={harvestData.completionPercentage} className="mt-2 h-2" />
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">⚖️</div>
            <div className="text-2xl text-green-600 dark:text-green-400 mb-1">{harvestData.actualYield} kg</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Total Yield</div>
            <div className="text-slate-500 dark:text-slate-400 text-xs">Est: {harvestData.expectedYield} kg</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">🏆</div>
            <div className="text-2xl text-emerald-600 dark:text-emerald-400 mb-1">Grade {harvestData.qualityGrade}</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Quality Grade</div>
            <div className="text-slate-500 dark:text-slate-400 text-xs">{harvestData.moistureContent}% moisture</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">📅</div>
            <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">7 days</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Remaining</div>
            <div className="text-slate-500 dark:text-slate-400 text-xs">Est completion: Mar 28</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Field-wise Progress */}
          <div className="lg:col-span-2">
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-6">Field-wise Harvest Progress</h3>
              <div className="space-y-4">
                {fieldProgress.map((field, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200/50 dark:border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-foreground text-lg">{field.field}</h4>
                        <p className="text-muted-foreground text-sm">Total area: {field.area} acres</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getQualityColor(field.quality)}>
                          Grade {field.quality}
                        </Badge>
                        <span className="text-foreground">{field.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Progress</div>
                        <Progress value={field.progress} className="h-2" />
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Harvested</div>
                        <div className="text-foreground">{field.harvested} acres</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Yield</div>
                        <div className="text-foreground">{field.yield} kg</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Remaining</div>
                        <div className="text-foreground">{(field.area - field.harvested).toFixed(1)} acres</div>
                      </div>
                    </div>
                    
                    {field.progress === 100 ? (
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        ✅ Completed
                      </Badge>
                    ) : field.progress > 0 ? (
                      <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        🚜 In Progress
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300">
                        ⏳ Pending
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Daily Harvest Chart */}
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-6">Daily Harvest Progress</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyHarvest}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="harvested" fill="#f59e0b" name="Acres Harvested" />
                    <Bar dataKey="yield" fill="#10b981" name="Yield (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Market Prices & Equipment */}
          <div className="lg:col-span-1">
            {/* Current Market Prices */}
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-4">Market Prices (per quintal)</h3>
              <div className="space-y-3">
                {marketPrices.map((price, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div>
                      <span className="text-foreground">Grade {price.grade}</span>
                      <span className={`ml-2 text-xs px-2 py-1 rounded ${
                        price.change.startsWith('+') 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                        {price.change}
                      </span>
                    </div>
                    <span className="text-foreground font-medium">₹{price.price}</span>
                  </div>
                ))}
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  View Detailed Prices
                </Button>
              </div>
            </Card>

            {/* Equipment Status */}
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-4">Equipment Status</h3>
              <div className="space-y-4">
                {equipmentStatus.map((equipment, index) => (
                  <div key={index} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-foreground text-sm font-medium">{equipment.name}</span>
                      <Badge className={
                        equipment.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                      }>
                        {equipment.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      Efficiency: {equipment.efficiency}% • Hours: {equipment.hoursUsed}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Maintenance: {equipment.maintenanceDue}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weather Impact */}
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-4">Weather Forecast</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Today</span>
                  <span className="text-foreground">☀️ 28°C, Clear</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tomorrow</span>
                  <span className="text-foreground">⛅ 26°C, Partly Cloudy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Day 3</span>
                  <span className="text-foreground">🌧️ 24°C, Light Rain</span>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-200/50 dark:border-yellow-600/30 mt-4">
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    ⚠️ Rain expected on Day 3. Plan to complete harvest in remaining fields by then.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}