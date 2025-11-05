import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Page } from "../Router";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface AlertsPageProps {
  onPageChange?: (page: Page) => void;
}

export function AlertsPage({ onPageChange }: AlertsPageProps) {
  const [alerts] = useState([
    {
      id: 1,
      type: "critical",
      category: "Irrigation",
      title: "Zone D Moisture Critical",
      message: "Soil moisture in Zone D (Vegetable Garden) has dropped to 35%. Immediate irrigation required.",
      time: "5 minutes ago",
      location: "Zone D - Vegetable Garden",
      action: "Start Irrigation",
      icon: "💧",
      resolved: false
    },
    {
      id: 2,
      type: "warning",
      category: "Weather",
      title: "Heavy Rain Alert",
      message: "Heavy rainfall expected between 2 PM - 6 PM today. Consider postponing field operations.",
      time: "1 hour ago",
      location: "All Zones",
      action: "Adjust Schedule",
      icon: "🌧️",
      resolved: false
    },
    {
      id: 3,
      type: "info",
      category: "Market",
      title: "Wheat Price Surge",
      message: "Wheat prices increased by 12% in local markets. Good time to sell stored wheat.",
      time: "2 hours ago",
      location: "Local Markets",
      action: "View Prices",
      icon: "📈",
      resolved: false
    },
    {
      id: 4,
      type: "warning",
      category: "Equipment",
      title: "Sensor Battery Low",
      message: "Soil moisture sensor in Zone D has low battery (15% remaining).",
      time: "3 hours ago",
      location: "Zone D",
      action: "Replace Battery",
      icon: "🔋",
      resolved: false
    },
    {
      id: 5,
      type: "critical",
      category: "Pest",
      title: "Pest Activity Detected",
      message: "Unusual pest activity detected in corn fields. Immediate inspection recommended.",
      time: "6 hours ago",
      location: "Zone C - Corn Fields",
      action: "Inspect Field",
      icon: "🐛",
      resolved: true
    }
  ]);

  const [weatherAlerts] = useState([
    {
      id: 1,
      type: "severe",
      title: "Heavy Rainfall Warning",
      description: "Expected rainfall: 45-60mm between 2 PM - 6 PM",
      validUntil: "Today 6:00 PM",
      impact: "Field flooding possible in low-lying areas",
      recommendations: ["Move equipment to higher ground", "Ensure proper drainage", "Postpone harvesting"]
    },
    {
      id: 2,
      type: "moderate",
      title: "Temperature Drop",
      description: "Night temperature may drop to 12°C",
      validUntil: "Tomorrow 6:00 AM",
      impact: "Risk of frost damage to sensitive crops",
      recommendations: ["Cover young plants", "Monitor greenhouse temperature", "Prepare heating if needed"]
    }
  ]);

  const [systemAlerts] = useState([
    {
      id: 1,
      system: "Irrigation Controller",
      status: "Normal",
      lastUpdate: "2 minutes ago",
      issues: 0
    },
    {
      id: 2,
      system: "Weather Station",
      status: "Normal",
      lastUpdate: "1 minute ago",
      issues: 0
    },
    {
      id: 3,
      system: "Soil Sensors (4/4)",
      status: "Warning",
      lastUpdate: "3 hours ago",
      issues: 1
    },
    {
      id: 4,
      system: "Security Cameras",
      status: "Normal",
      lastUpdate: "30 seconds ago",
      issues: 0
    }
  ]);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getWeatherAlertColor = (type: string) => {
    switch (type) {
      case 'severe': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'moderate': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.resolved).length;

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <div className="relative py-12 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYWxlcnQlMjBub3RpZmljYXRpb24lMjBzeXN0ZW18ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-orange-800/70 to-yellow-900/80" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl text-red-300 mb-4 drop-shadow-lg">Farm Alerts & Notifications</h1>
              <p className="text-white/90 text-lg drop-shadow-md">Stay informed about critical farm conditions and events</p>
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
        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">🚨</div>
            <div className="text-2xl text-red-600 dark:text-red-400 mb-1">{alerts.filter(a => a.type === 'critical' && !a.resolved).length}</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Critical Alerts</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">⚠️</div>
            <div className="text-2xl text-yellow-600 dark:text-yellow-400 mb-1">{alerts.filter(a => a.type === 'warning' && !a.resolved).length}</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Warnings</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">📄</div>
            <div className="text-2xl text-blue-600 dark:text-blue-400 mb-1">{unreadCount}</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Unread Alerts</div>
          </Card>
          
          <Card className="modern-card p-6 text-center">
            <div className="text-3xl mb-3">✅</div>
            <div className="text-2xl text-green-600 dark:text-green-400 mb-1">{alerts.filter(a => a.resolved).length}</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">Resolved Today</div>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="space-y-4">
              {alerts.filter(alert => !alert.resolved).map((alert) => (
                <Card key={alert.id} className="modern-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{alert.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-foreground text-lg">{alert.title}</h3>
                          <Badge className={getAlertColor(alert.type)}>
                            {alert.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{alert.message}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>📍 {alert.location}</span>
                          <span>🕒 {alert.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        {alert.action}
                      </Button>
                      <Button size="sm" variant="outline">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="weather" className="space-y-4">
            <div className="space-y-4">
              {weatherAlerts.map((alert) => (
                <Card key={alert.id} className={`p-6 border-l-4 ${getWeatherAlertColor(alert.type)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-foreground text-lg mb-2">{alert.title}</h3>
                      <p className="text-muted-foreground mb-2">{alert.description}</p>
                      <p className="text-sm text-muted-foreground">Valid until: {alert.validUntil}</p>
                    </div>
                    <Badge className={alert.type === 'severe' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}>
                      {alert.type}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-foreground mb-2">Impact:</h4>
                    <p className="text-muted-foreground text-sm">{alert.impact}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-foreground mb-2">Recommendations:</h4>
                    <ul className="space-y-1">
                      {alert.recommendations.map((rec, index) => (
                        <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <div className="grid gap-4">
              {systemAlerts.map((system) => (
                <Card key={system.id} className="modern-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground mb-1">{system.system}</h3>
                      <p className="text-muted-foreground text-sm">Last update: {system.lastUpdate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {system.issues > 0 && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          {system.issues} issue{system.issues > 1 ? 's' : ''}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          system.status === 'Normal' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-foreground">{system.status}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            <div className="space-y-4">
              {alerts.filter(alert => alert.resolved).map((alert) => (
                <Card key={alert.id} className="modern-card p-6 opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl grayscale">{alert.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-foreground text-lg">{alert.title}</h3>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            Resolved
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{alert.message}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>📍 {alert.location}</span>
                          <span>🕒 {alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}