import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getDatabase, ref, onValue, push, set, update, remove } from 'firebase/database';
import { useAuth } from './AuthContext';

// Initialize the Realtime Database
const rtdb = getDatabase();

// --- Define your data types ---
export interface CropFormData {
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
export interface CropData extends CropFormData {
  id: string;
}
interface FarmStats {
  totalCrops: number;
  totalFarmArea: number;
  totalWaterUsage: number;
  avgYieldIncrease: number;
}
interface FarmDataContextType {
  crops: CropData[];
  farmStats: FarmStats;
  loading: boolean;
  addCrop: (formData: CropFormData) => Promise<void>;
  updateCrop: (id: string, formData: CropFormData) => Promise<void>;
  deleteCrop: (id: string) => Promise<void>;
}
// --- End of data types ---

const FarmDataContext = createContext<FarmDataContextType | undefined>(undefined);

export const FarmDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [crops, setCrops] = useState<CropData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!currentUser) {
      setCrops([]);
      setLoading(false);
      return;
    }

    const cropsRef = ref(rtdb, `users/${currentUser.uid}/crops`);
    
    const unsubscribe = onValue(cropsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cropsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setCrops(cropsArray);
      } else {
        setCrops([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching crops from RTDB: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const farmStats = useMemo<FarmStats>(() => {
    const totalCrops = crops.length;
    const totalFarmArea = crops.reduce((sum, crop) => sum + crop.farmingArea, 0);
    const totalWaterUsage = crops.reduce((sum, crop) => sum + crop.waterUsage, 0);
    const totalYieldIncrease = crops.reduce((sum, crop) => sum + crop.yieldIncrease, 0);
    const avgYieldIncrease = totalCrops > 0 ? (totalYieldIncrease / totalCrops) : 0;

    return {
      totalCrops,
      totalFarmArea: parseFloat(totalFarmArea.toFixed(1)),
      totalWaterUsage,
      avgYieldIncrease: parseFloat(avgYieldIncrease.toFixed(1))
    };
  }, [crops]);

  // --- CRUD Functions ---
  const addCrop = async (formData: CropFormData) => {
    if (!currentUser) throw new Error("User is not logged in");
    const cropsListRef = ref(rtdb, `users/${currentUser.uid}/crops`);
    const newCropRef = push(cropsListRef);
    await set(newCropRef, formData);
  };

  const updateCrop = async (id: string, formData: CropFormData) => {
    if (!currentUser) throw new Error("User is not logged in");
    const cropRef = ref(rtdb, `users/${currentUser.uid}/crops/${id}`);
    await update(cropRef, formData);
  };

  const deleteCrop = async (id: string) => {
    if (!currentUser) throw new Error("User is not logged in");
    const cropRef = ref(rtdb, `users/${currentUser.uid}/crops/${id}`);
    await remove(cropRef);
  };
  // --- End of CRUD Functions ---

  const value = {
    crops,
    farmStats,
    loading,
    addCrop,
    updateCrop,
    deleteCrop
  };

  return (
    <FarmDataContext.Provider value={value}>
      {children}
    </FarmDataContext.Provider>
  );
};

// The custom hook
export const useFarmData = () => {
  const context = useContext(FarmDataContext);
  if (context === undefined) {
    throw new Error('useFarmData must be used within a FarmDataProvider');
  }
  return context;
};