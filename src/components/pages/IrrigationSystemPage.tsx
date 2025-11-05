import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { Page } from "../Router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface IrrigationSystemPageProps {
  onPageChange?: (page: Page) => void;
}

export function IrrigationSystemPage({ onPageChange }: IrrigationSystemPageProps) {
  const [zones, setZones] = useState([
    { id: 1, name: "Zone A - Wheat Fields", status: "active", progress: 75, flow: "12 L/min", scheduled: "6:00 AM - 8:00 AM", soilMoisture: 68, crop: "Wheat", area: "8.5 acres" },
    { id: 2, name: "Zone B - Rice Fields", status: "scheduled", progress: 0, flow: "0 L/min", scheduled: "2:00 PM - 4:00 PM", soilMoisture: 82, crop: "Rice", area: "6.2 acres" },
    { id: 3, name: "Zone C - Corn Fields", status: "completed", progress: 100, flow: "0 L/min", scheduled: "4:00 AM - 6:00 AM", soilMoisture: 45, crop: "Corn", area: "10.8 acres" },
    { id: 4, name: "Zone D - Vegetable Garden", status: "inactive", progress: 0, flow: "0 L/min", scheduled: "Not scheduled", soilMoisture: 35, crop: "Mixed Vegetables", area: "2.1 acres" }
  ]);

  const [systemSettings, setSystemSettings] = useState({
    autoMode: true,
    weatherIntegration: true,
    moistureThreshold: 40,
    emergencyStop: false
  });

  const toggleZone = (zoneId: number) => {
    setZones(zones.map(zone => 
      zone.id === zoneId 
        ? { ...zone, status: zone.status === 'active' ? 'inactive' : 'active' }
        : zone
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const totalWaterUsage = zones.reduce((total, zone) => {
    const flow = parseInt(zone.flow.split(' ')[0]) || 0;
    return total + (zone.status === 'active' ? flow : 0);
  }, 0);

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1689349483530-bb7a0734d9fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcnJpZ2F0aW9uJTIwZmFybWluZyUyMHdhdGVyfGVufDF8fHx8MTc1NzAxNjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-emerald-800/70 to-green-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-blue-300 mb-4 drop-shadow-lg">Smart Irrigation System</h1>
              <p className="text-white/90 text-lg drop-shadow-md">Monitor and control water distribution across your farm</p>
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
        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">💧</div>
            <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">{totalWaterUsage} L/min</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Total Flow Rate</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">🌱</div>
            <div className="text-2xl text-emerald-600 dark:text-emerald-400 mb-1">{zones.filter(z => z.status === 'active').length}/4</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Active Zones</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">⏱️</div>
            <div className="text-2xl text-purple-600 dark:text-purple-400 mb-1">6.5 hrs</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Total Runtime Today</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">💰</div>
            <div className="text-2xl text-green-600 dark:text-green-400 mb-1">₹245</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Water Cost Saved</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Zone Control */}
          <div className="lg:col-span-2">
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-6">Irrigation Zones</h3>
              <div className="space-y-4">
                {zones.map((zone) => (
                  <div key={zone.id} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200/50 dark:border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-foreground text-lg">{zone.name}</h4>
                        <p className="text-muted-foreground text-sm">{zone.crop} • {zone.area}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(zone.status)}>
                          {zone.status}
                        </Badge>
                        <Switch
                          checked={zone.status === 'active'}
                          onCheckedChange={() => toggleZone(zone.id)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Progress</div>
                        <div className="text-foreground">{zone.progress}%</div>
                        <Progress value={zone.progress} className="mt-1 h-2" />
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Flow Rate</div>
                        <div className="text-foreground">{zone.flow}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Soil Moisture</div>
                        <div className="text-foreground">{zone.soilMoisture}%</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground text-xs mb-1">Schedule</div>
                        <div className="text-foreground text-sm">{zone.scheduled}</div>
                      </div>
                    </div>
                    
                    {zone.status === 'active' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Adjust Flow
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Emergency Stop
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* System Settings & Weather */}
          <div className="lg:col-span-1">
            {/* System Settings */}
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-4">System Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Auto Mode</span>
                  <Switch
                    checked={systemSettings.autoMode}
                    onCheckedChange={(checked: any) => setSystemSettings({...systemSettings, autoMode: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Weather Integration</span>
                  <Switch
                    checked={systemSettings.weatherIntegration}
                    onCheckedChange={(checked: any) => setSystemSettings({...systemSettings, weatherIntegration: checked})}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Moisture Threshold</span>
                    <span className="text-foreground">{systemSettings.moistureThreshold}%</span>
                  </div>
                  <Progress value={systemSettings.moistureThreshold} className="h-2" />
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700" disabled={!systemSettings.emergencyStop}>
                  Emergency Stop All
                </Button>
              </div>
            </Card>

            {/* Weather Info */}
            <Card className="modern-card p-6 mb-6">
              <h3 className="text-foreground mb-4">Weather Impact</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rain Forecast</span>
                  <span className="text-foreground">20% (Next 6h)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="text-foreground">28°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Humidity</span>
                  <span className="text-foreground">65%</span>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200/50 dark:border-blue-600/30">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    ☔ Light rain expected at 3 PM. Auto-irrigation will be paused for Zone B.
                  </p>
                </div>
              </div>
            </Card>

            {/* Water Conservation */}
            <Card className="modern-card p-6">
              <h3 className="text-foreground mb-4">Water Conservation</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="text-green-600 dark:text-green-400">-15% usage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="text-green-600 dark:text-green-400">-22% usage</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-200/50 dark:border-green-600/30">
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    🌱 Excellent! You've saved 2,500L of water this week using smart scheduling.
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