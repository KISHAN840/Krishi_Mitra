import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Page } from "../Router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface CornAnalyticsPageProps {
  onPageChange?: (page: Page) => void;
}

export function CornAnalyticsPage({ onPageChange }: CornAnalyticsPageProps) {
  const cornFields = [
    { 
      id: 1,
      name: "Zone C-1",
      area: 6.8,
      variety: "Sweet Corn",
      plantingDate: "Feb 15, 2024",
      stage: "Tasseling",
      health: 92,
      yield: 4200,
      irrigation: "Active",
      pestControl: "Up to date"
    },
    {
      id: 2,
      name: "Zone C-2", 
      area: 4.0,
      variety: "Dent Corn",
      plantingDate: "Feb 20, 2024", 
      stage: "Silking",
      health: 88,
      yield: 3800,
      irrigation: "Scheduled",
      pestControl: "Due in 3 days"
    }
  ];

  const growthData = [
    { week: "Week 1", height: 12, leaves: 3, health: 85 },
    { week: "Week 2", height: 28, leaves: 5, health: 88 },
    { week: "Week 3", height: 45, leaves: 7, health: 90 },
    { week: "Week 4", height: 68, leaves: 9, health: 92 },
    { week: "Week 5", height: 92, leaves: 11, health: 94 },
    { week: "Week 6", height: 118, leaves: 12, health: 93 },
    { week: "Week 7", height: 145, leaves: 14, health: 91 },
    { week: "Week 8", height: 172, leaves: 15, health: 92 }
  ];

  const yieldForecast = [
    { month: "Apr", predicted: 1200, actual: 0 },
    { month: "May", predicted: 2800, actual: 0 },
    { month: "Jun", predicted: 4200, actual: 0 },
    { month: "Jul", predicted: 5100, actual: 0 },
    { month: "Aug", predicted: 5800, actual: 0 }
  ];

  const soilNutrients = [
    { name: "Nitrogen", value: 78, optimal: 80, status: "Good" },
    { name: "Phosphorus", value: 65, optimal: 70, status: "Low" },
    { name: "Potassium", value: 85, optimal: 75, status: "High" },
    { name: "pH Level", value: 6.8, optimal: 6.5, status: "Optimal" }
  ];

  const pestData = [
    { name: "Corn Borer", level: 15, threat: "Low", color: "#10b981" },
    { name: "Aphids", level: 8, threat: "Very Low", color: "#3b82f6" },
    { name: "Armyworm", level: 25, threat: "Medium", color: "#f59e0b" },
    { name: "Other", level: 52, threat: "None", color: "#6b7280" }
  ];

  const irrigationAnalytics = [
    { date: "Mar 15", water: 120, efficiency: 92 },
    { date: "Mar 16", water: 115, efficiency: 88 },
    { date: "Mar 17", water: 125, efficiency: 95 },
    { date: "Mar 18", water: 118, efficiency: 90 },
    { date: "Mar 19", water: 122, efficiency: 93 },
    { date: "Mar 20", water: 119, efficiency: 91 },
    { date: "Today", water: 121, efficiency: 94 }
  ];

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600 dark:text-green-400';
    if (health >= 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Tasseling': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Silking': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Grain Filling': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551754655-cd27e38d2076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwZmllbGQlMjBmYXJtaW5nJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-emerald-800/70 to-lime-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-green-300 mb-4 drop-shadow-lg">Smart Corn Fields Analytics</h1>
              <p className="text-white/90 text-lg drop-shadow-md">Advanced monitoring and prediction for corn cultivation</p>
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
        {/* Field Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">🌽</div>
            <div className="text-2xl text-green-600 dark:text-green-400 mb-1">10.8</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Total Acres</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">📈</div>
            <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">90%</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Avg Health Score</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">💧</div>
            <div className="text-2xl text-cyan-600 dark:text-cyan-400 mb-1">92%</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Irrigation Efficiency</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">⏱️</div>
            <div className="text-2xl text-purple-600 dark:text-purple-400 mb-1">65</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Days to Harvest</div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {cornFields.map((field) => (
                <Card key={field.id} className="modern-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground text-xl">{field.name}</h3>
                    <Badge className={getStageColor(field.stage)}>
                      {field.stage}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Area</div>
                      <div className="text-foreground">{field.area} acres</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Variety</div>
                      <div className="text-foreground">{field.variety}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Health Score</div>
                      <div className={`${getHealthColor(field.health)}`}>{field.health}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-sm mb-1">Expected Yield</div>
                      <div className="text-foreground">{field.yield} kg</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Irrigation</span>
                      <span className={`text-sm ${field.irrigation === 'Active' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {field.irrigation}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Pest Control</span>
                      <span className={`text-sm ${field.pestControl === 'Up to date' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                        {field.pestControl}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Planted</span>
                      <span className="text-foreground text-sm">{field.plantingDate}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-6">
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-6">8-Week Growth Progress</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="height" stroke="#10b981" strokeWidth={2} name="Height (cm)" />
                    <Line type="monotone" dataKey="leaves" stroke="#3b82f6" strokeWidth={2} name="Leaves Count" />
                    <Line type="monotone" dataKey="health" stroke="#f59e0b" strokeWidth={2} name="Health Score" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="irrigation" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="modern-card p-6">
                <h3 className="text-foreground mb-6">Water Usage & Efficiency</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={irrigationAnalytics}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="water" stroke="#06b6d4" strokeWidth={2} name="Water (L)" />
                      <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Efficiency %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="modern-card p-6">
                <h3 className="text-foreground mb-6">Irrigation Zones Status</h3>
                <div className="space-y-4">
                  {cornFields.map((field, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-foreground">{field.name}</span>
                        <Badge className={field.irrigation === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                          {field.irrigation}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last watered: {index === 0 ? '2 hours ago' : '6 hours ago'}
                      </div>
                      <Progress value={index === 0 ? 85 : 60} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="modern-card p-6">
                <h3 className="text-foreground mb-6">Soil Nutrients</h3>
                <div className="space-y-4">
                  {soilNutrients.map((nutrient, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">{nutrient.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground">{nutrient.value}</span>
                          <Badge className={
                            nutrient.status === 'Optimal' ? 'bg-green-500/20 text-green-400' :
                            nutrient.status === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                            nutrient.status === 'High' ? 'bg-purple-500/20 text-purple-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }>
                            {nutrient.status}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={(nutrient.value / nutrient.optimal) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="modern-card p-6">
                <h3 className="text-foreground mb-6">Pest & Disease Monitoring</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pestData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="level"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {pestData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-6">Yield Forecast</h3>
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldForecast}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="predicted" fill="#10b981" name="Predicted Yield (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200/50 dark:border-green-600/30">
                  <h4 className="text-green-700 dark:text-green-300 mb-2">🎯 Peak Harvest</h4>
                  <p className="text-green-600 dark:text-green-400 text-sm">Expected in August with 5,800 kg total yield</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200/50 dark:border-blue-600/30">
                  <h4 className="text-blue-700 dark:text-blue-300 mb-2">📊 Current Progress</h4>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">On track for 18% above average yield</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-200/50 dark:border-amber-600/30">
                  <h4 className="text-amber-700 dark:text-amber-300 mb-2">⚠️ Risk Factors</h4>
                  <p className="text-amber-600 dark:text-amber-400 text-sm">Monitor for pest activity in Zone C-2</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}