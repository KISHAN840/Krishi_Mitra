import { useState } from 'react';
import { useFarmData, CropData } from '../contexts/FarmDataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Plus, Edit2, Trash2, TrendingUp, Droplets, MapPin } from 'lucide-react';

interface CropFormData {
  name: string;
  variety: string;
  farmingArea: number;
  waterUsage: number;
  yieldIncrease: number;
  plantingDate: string;
  expectedHarvest: string;
  status: 'planted' | 'growing' | 'harvesting' | 'harvested';
  healthScore: number;
}

export function CropManagement() {
  const { t } = useLanguage();
  const { crops, farmStats, addCrop, updateCrop, deleteCrop } = useFarmData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<CropData | null>(null);
  const [formData, setFormData] = useState<CropFormData>({
    name: '',
    variety: '',
    farmingArea: 0,
    waterUsage: 0,
    yieldIncrease: 0,
    plantingDate: '',
    expectedHarvest: '',
    status: 'planted',
    healthScore: 100
  });

  const cropOptions = [
    'Wheat', 'Rice', 'Corn', 'Sugarcane', 'Cotton', 'Soybean', 
    'Potato', 'Tomato', 'Onion', 'Barley', 'Millet', 'Pulses'
  ];

  const statusColors = {
    planted: 'bg-blue-500',
    growing: 'bg-green-500', 
    harvesting: 'bg-orange-500',
    harvested: 'bg-gray-500'
  };

  const resetForm = () => {
    setFormData({
      name: '',
      variety: '',
      farmingArea: 0,
      waterUsage: 0,
      yieldIncrease: 0,
      plantingDate: '',
      expectedHarvest: '',
      status: 'planted',
      healthScore: 100
    });
    setEditingCrop(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCrop) {
      updateCrop(editingCrop.id, formData);
    } else {
      addCrop(formData);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (crop: CropData) => {
    setFormData({
      name: crop.name,
      variety: crop.variety,
      farmingArea: crop.farmingArea,
      waterUsage: crop.waterUsage,
      yieldIncrease: crop.yieldIncrease,
      plantingDate: crop.plantingDate,
      expectedHarvest: crop.expectedHarvest,
      status: crop.status,
      healthScore: crop.healthScore
    });
    setEditingCrop(crop);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('common.confirm') + ' delete this crop?')) {
      deleteCrop(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Farm Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="modern-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🌾</div>
          <div className="text-lg text-blue-600 dark:text-blue-400 mb-1">{farmStats.totalCrops}</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">Total Crops</div>
        </div>
        
        <div className="modern-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🚜</div>
          <div className="text-lg text-green-600 dark:text-green-400 mb-1">{farmStats.totalFarmArea}</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">Acres</div>
        </div>
        
        <div className="modern-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">💧</div>
          <div className="text-lg text-cyan-600 dark:text-cyan-400 mb-1">{farmStats.totalWaterUsage}</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">Liters/day</div>
        </div>
        
        <div className="modern-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">📈</div>
          <div className="text-lg text-orange-600 dark:text-orange-400 mb-1">+{farmStats.avgYieldIncrease}%</div>
          <div className="text-sm text-slate-600 dark:text-slate-300">Avg Yield</div>
        </div>
      </div>

      {/* Add Crop Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-slate-800 dark:text-white">My Crops</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Crop
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCrop ? 'Edit Crop' : 'Add New Crop'}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Crop Name</Label>
                  <Select value={formData.name} onValueChange={(value) => setFormData({...formData, name: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="variety">Variety</Label>
                  <Input
                    id="variety"
                    value={formData.variety}
                    onChange={(e) => setFormData({...formData, variety: e.target.value})}
                    placeholder="e.g., HD-2967"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="farmingArea">Area (acres)</Label>
                  <Input
                    id="farmingArea"
                    type="number"
                    step="0.1"
                    value={formData.farmingArea}
                    onChange={(e) => setFormData({...formData, farmingArea: parseFloat(e.target.value) || 0})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="waterUsage">Water (L/day)</Label>
                  <Input
                    id="waterUsage"
                    type="number"
                    value={formData.waterUsage}
                    onChange={(e) => setFormData({...formData, waterUsage: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yieldIncrease">Yield Increase (%)</Label>
                  <Input
                    id="yieldIncrease"
                    type="number"
                    value={formData.yieldIncrease}
                    onChange={(e) => setFormData({...formData, yieldIncrease: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planted">Planted</SelectItem>
                      <SelectItem value="growing">Growing</SelectItem>
                      <SelectItem value="harvesting">Harvesting</SelectItem>
                      <SelectItem value="harvested">Harvested</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plantingDate">Planting Date</Label>
                  <Input
                    id="plantingDate"
                    type="date"
                    value={formData.plantingDate}
                    onChange={(e) => setFormData({...formData, plantingDate: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="expectedHarvest">Expected Harvest</Label>
                  <Input
                    id="expectedHarvest"
                    type="date"
                    value={formData.expectedHarvest}
                    onChange={(e) => setFormData({...formData, expectedHarvest: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  {editingCrop ? 'Update Crop' : 'Add Crop'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {resetForm(); setIsDialogOpen(false);}}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Crops List */}
      <div className="grid gap-4">
        {crops.map((crop) => (
          <Card key={crop.id} className="p-4 crop-card-glow hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-slate-800 dark:text-white">{crop.name}</h4>
                  <Badge className={`text-white ${statusColors[crop.status]}`}>
                    {crop.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {crop.variety}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    <span className="text-slate-600 dark:text-slate-400">{crop.farmingArea} acres</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-cyan-500" />
                    <span className="text-slate-600 dark:text-slate-400">{crop.waterUsage} L/day</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-slate-600 dark:text-slate-400">+{crop.yieldIncrease}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 text-orange-500">❤️</span>
                    <span className="text-slate-600 dark:text-slate-400">{crop.healthScore}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(crop)}
                  className="p-2"
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(crop.id)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {crops.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            No crops added yet. Click "Add Crop" to get started!
          </div>
        )}
      </div>
    </div>
  );
}