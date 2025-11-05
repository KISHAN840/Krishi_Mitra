import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Page } from "../Router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SoilMoisturePageProps {
  onPageChange?: (page: Page) => void;
}

export function SoilMoisturePage({ onPageChange }: SoilMoisturePageProps) {
  const zones = [
    { 
      id: 1, 
      name: "Zone A - Wheat Fields", 
      moisture: 68, 
      temperature: 22, 
      ph: 6.8, 
      nutrients: "High",
      lastWatered: "2 hours ago",
      sensorStatus: "Active",
      area: "8.5 acres",
      crop: "Wheat"
    },
    { 
      id: 2, 
      name: "Zone B - Rice Fields", 
      moisture: 82, 
      temperature: 24, 
      ph: 7.2, 
      nutrients: "Medium",
      lastWatered: "6 hours ago",
      sensorStatus: "Active",
      area: "6.2 acres",
      crop: "Rice"
    },
    { 
      id: 3, 
      name: "Zone C - Corn Fields", 
      moisture: 45, 
      temperature: 26, 
      ph: 6.5, 
      nutrients: "Low",
      lastWatered: "4 hours ago",
      sensorStatus: "Active",
      area: "10.8 acres",
      crop: "Corn"
    },
    { 
      id: 4, 
      name: "Zone D - Vegetable Garden", 
      moisture: 35, 
      temperature: 25, 
      ph: 6.9, 
      nutrients: "Medium",
      lastWatered: "12 hours ago",
      sensorStatus: "Low Battery",
      area: "2.1 acres",
      crop: "Mixed Vegetables"
    }
  ];

  const moistureHistory = [
    { time: '6 AM', zoneA: 72, zoneB: 85, zoneC: 50, zoneD: 45 },
    { time: '9 AM', zoneA: 70, zoneB: 83, zoneC: 48, zoneD: 42 },
    { time: '12 PM', zoneA: 68, zoneB: 82, zoneC: 45, zoneD: 35 },
    { time: '3 PM', zoneA: 68, zoneB: 82, zoneC: 45, zoneD: 35 },
    { time: '6 PM', zoneA: 69, zoneB: 83, zoneC: 46, zoneD: 37 },
    { time: 'Now', zoneA: 68, zoneB: 82, zoneC: 45, zoneD: 35 }
  ];

  const soilHealthData = [
    { parameter: 'Nitrogen', value: 75, status: 'Good' },
    { parameter: 'Phosphorus', value: 60, status: 'Medium' },
    { parameter: 'Potassium', value: 85, status: 'Excellent' },
    { parameter: 'Organic Matter', value: 45, status: 'Low' }
  ];

  const getMoistureStatus = (moisture: number) => {
    if (moisture >= 70) return { label: "Optimal", color: "bg-green-500/20 text-green-400 border-green-500/30" };
    if (moisture >= 50) return { label: "Good", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
    if (moisture >= 30) return { label: "Low", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
    return { label: "Critical", color: "bg-red-500/20 text-red-400 border-red-500/30" };
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-500';
      case 'Good': return 'bg-blue-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwZmFybSUyMGFncmljdWx0dXJlJTIwZmllbGR8ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-orange-800/70 to-red-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-amber-300 mb-4 drop-shadow-lg">Soil Moisture Monitoring</h1>
              <p className="text-white/90 text-lg drop-shadow-md">Real-time soil health and moisture analytics</p>
            </div>
            <Button
              onClick={() => onPageChange?.("home")}
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">💧</div>
            <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">58%</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Average Moisture</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">🌡️</div>
            <div className="text-2xl text-orange-600 dark:text-orange-400 mb-1">24°C</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Soil Temperature</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">⚗️</div>
            <div className="text-2xl text-green-600 dark:text-green-400 mb-1">6.9</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Average pH</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">🔋</div>
            <div className="text-2xl text-purple-600 dark:text-purple-400 mb-1">3/4</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Sensors Active</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Zone Details */}
          <div className="lg:col-span-2">
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-6">Zone-wise Soil Analysis</h3>
              <div className="space-y-4">
                {zones.map((zone) => {
                  const moistureStatus = getMoistureStatus(zone.moisture);
                  return (
                    <div key={zone.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200/50 dark:border-slate-600/30">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-foreground text-lg">{zone.name}</h4>
                          <p className="text-muted-foreground text-sm">{zone.crop} • {zone.area}</p>
                        </div>
                        <Badge className={moistureStatus.color}>
                          {moistureStatus.label}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Moisture</div>
                          <div className="text-foreground text-xl">{zone.moisture}%</div>
                          <Progress value={zone.moisture} className="mt-1 h-2" />
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Temperature</div>
                          <div className="text-foreground">{zone.temperature}°C</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">pH Level</div>
                          <div className="text-foreground">{zone.ph}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-1">Nutrients</div>
                          <div className="text-foreground">{zone.nutrients}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-muted-foreground">
                          Last watered: {zone.lastWatered}
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          zone.sensorStatus === 'Active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          Sensor: {zone.sensorStatus}
                        </div>
                      </div>
                      
                      {zone.moisture < 40 && (
                        <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200/50 dark:border-amber-600/30">
                          <p className="text-amber-700 dark:text-amber-300 text-sm">
                            ⚠️ Low moisture detected. Consider immediate irrigation.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Moisture Trends Chart */}
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-6">24-Hour Moisture Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moistureHistory}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="zoneA" stroke="#10b981" strokeWidth={2} name="Zone A" />
                    <Line type="monotone" dataKey="zoneB" stroke="#3b82f6" strokeWidth={2} name="Zone B" />
                    <Line type="monotone" dataKey="zoneC" stroke="#f59e0b" strokeWidth={2} name="Zone C" />
                    <Line type="monotone" dataKey="zoneD" stroke="#ef4444" strokeWidth={2} name="Zone D" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Soil Health & Recommendations */}
          <div className="lg:col-span-1">
            {/* Soil Health */}
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-4">Soil Health Overview</h3>
              <div className="space-y-4">
                {soilHealthData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground text-sm">{item.parameter}</span>
                      <span className="text-foreground text-sm">{item.value}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={item.value} className="flex-1 h-2" />
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.status === 'Excellent' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                        item.status === 'Good' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                        item.status === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                        'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Irrigation Recommendations */}
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-4">Smart Recommendations</h3>
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border border-red-200/50 dark:border-red-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-red-600">🚨</span>
                    <span className="text-red-700 dark:text-red-300 font-medium text-sm">Critical Alert</span>
                  </div>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    Zone D moisture below 40%. Start irrigation immediately.
                  </p>
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-200/50 dark:border-yellow-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-yellow-600">⚠️</span>
                    <span className="text-yellow-700 dark:text-yellow-300 font-medium text-sm">Warning</span>
                  </div>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Zone C requires nutrient supplementation.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-200/50 dark:border-green-600/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-green-600">✅</span>
                    <span className="text-green-700 dark:text-green-300 font-medium text-sm">Optimal</span>
                  </div>
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Zones A & B are in perfect condition.
                  </p>
                </div>
              </div>
            </Card>

            {/* Sensor Status */}
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-4">Sensor Network</h3>
              <div className="space-y-3">
                {zones.map((zone) => (
                  <div key={zone.id} className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Zone {String.fromCharCode(64 + zone.id)}</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        zone.sensorStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-foreground text-sm">{zone.sensorStatus}</span>
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-3" variant="outline" size="sm">
                  Calibrate All Sensors
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}