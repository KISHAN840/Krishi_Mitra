import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useFarmData } from '../contexts/FarmDataContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Camera, MapPin, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FarmLink {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'camera' | 'sensor' | 'weather' | 'irrigation' | 'analytics';
  status: 'active' | 'offline' | 'maintenance';
  lastUpdate: string;
  data?: string;
}

export function LiveFarmSection() {
  const { t } = useLanguage();
  const { farmStats } = useFarmData();
  
  // Demo farm links - in real app, these would come from user's connected devices
  const [farmLinks] = useState<FarmLink[]>([
    {
      id: '1',
      title: 'Field Camera - Zone A',
      description: 'Live feed from wheat field monitoring camera',
      url: 'https://www.earthcam.com/cams/common/watchlive.php?id=5',
      type: 'camera',
      status: 'active',
      lastUpdate: '2 min ago',
      data: 'HD Live Stream'
    },
    {
      id: '2',
      title: 'Soil Moisture Sensors',
      description: 'Real-time soil moisture levels across all zones',
      url: 'https://www.agriculture.gov.in/soilhealth',
      type: 'sensor',
      status: 'active',
      lastUpdate: '5 min ago',
      data: '68% avg moisture'
    },
    {
      id: '3',
      title: 'Weather Station',
      description: 'Hyperlocal weather data from your farm',
      url: 'https://weather.com',
      type: 'weather',
      status: 'active',
      lastUpdate: '1 min ago',
      data: '24°C, Clear'
    },
    {
      id: '4',
      title: 'Smart Irrigation System',
      description: 'Control and monitor irrigation scheduling',
      url: 'https://www.netafim.com/digital-farming/',
      type: 'irrigation',
      status: 'maintenance',
      lastUpdate: '1 hour ago',
      data: 'Next: 6:00 AM'
    },
    {
      id: '5',
      title: 'Crop Analytics Dashboard',
      description: 'AI-powered growth analysis and predictions',
      url: 'https://www.cropin.com/',
      type: 'analytics',
      status: 'active',
      lastUpdate: '10 min ago',
      data: '94% Health Score'
    },
    {
      id: '6',
      title: 'Drone Survey Data',
      description: 'Latest aerial imagery and field mapping',
      url: 'https://www.dronedeploy.com/',
      type: 'camera',
      status: 'offline',
      lastUpdate: '2 days ago',
      data: 'Last flight: Jan 8'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'camera': return <Camera className="w-4 h-4" />;
      case 'sensor': return <TrendingUp className="w-4 h-4" />;
      case 'weather': return '🌤️';
      case 'irrigation': return '💧';
      case 'analytics': return '📊';
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-slate-800 dark:text-white text-xl mb-2">🔴 Live from Your Farm</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Real-time monitoring and control systems across {farmStats.totalFarmArea} acres
          </p>
        </div>
        <Badge className="bg-green-500 text-white animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
          {farmLinks.filter(link => link.status === 'active').length} Active
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="text-2xl mb-1">📹</div>
          <div className="text-lg text-green-600 dark:text-green-400">
            {farmLinks.filter(l => l.type === 'camera').length}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Cameras</div>
        </Card>
        
        <Card className="p-4 text-center bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="text-2xl mb-1">📡</div>
          <div className="text-lg text-blue-600 dark:text-blue-400">
            {farmLinks.filter(l => l.type === 'sensor').length}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Sensors</div>
        </Card>
        
        <Card className="p-4 text-center bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
          <div className="text-2xl mb-1">💧</div>
          <div className="text-lg text-cyan-600 dark:text-cyan-400">
            {farmLinks.filter(l => l.type === 'irrigation').length}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">Irrigation</div>
        </Card>
        
        <Card className="p-4 text-center bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <div className="text-2xl mb-1">🤖</div>
          <div className="text-lg text-purple-600 dark:text-purple-400">
            {farmLinks.filter(l => l.type === 'analytics').length}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">AI Systems</div>
        </Card>
      </div>

      {/* Live Links Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {farmLinks.map((link) => (
          <Card key={link.id} className="p-4 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getTypeIcon(link.type)}
                <Badge className={`text-white text-xs ${getStatusColor(link.status)}`}>
                  {link.status}
                </Badge>
              </div>
              {link.status === 'offline' && (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
            </div>
            
            <h4 className="text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {link.title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
              {link.description}
            </p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3" />
                {link.lastUpdate}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                {link.data}
              </div>
            </div>
            
            <Button
              size="sm"
              className={`w-full ${link.status === 'active' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={link.status !== 'active'}
              onClick={() => window.open(link.url, '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              {link.status === 'active' ? 'View Live' : 'Offline'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Add New Device Button */}
      <Card className="p-6 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer group">
        <div className="text-center">
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">➕</div>
          <h4 className="text-slate-600 dark:text-slate-400 mb-2">Connect New Device</h4>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Add cameras, sensors, or IoT devices to monitor your farm
          </p>
          <Button variant="outline" className="mt-3">
            Add Device
          </Button>
        </div>
      </Card>

      {/* Farm Overview Image */}
      <Card className="p-0 overflow-hidden">
        <div className="relative">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NTcwODE1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Farm Aerial View"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
            <div className="absolute bottom-4 left-4 text-white">
              <h4 className="text-lg">Farm Overview</h4>
              <p className="text-sm opacity-90">Latest satellite imagery • Updated today</p>
            </div>
            <Button 
              size="sm" 
              className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
              onClick={() => window.open('https://earth.google.com/', '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-2" />
              View Full Map
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}