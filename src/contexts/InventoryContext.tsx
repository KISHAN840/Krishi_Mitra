import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getDatabase, ref, onValue, push, set, update, remove } from 'firebase/database';
import { useAuth } from './AuthContext';

// Initialize the Realtime Database
const rtdb = getDatabase();

// 1. Define the data types for your inventory
export interface InventoryFormData {
  crop: string;
  quantity: number; // Storing as a number
  readyToSell: number; // Storing as a number
  estimatedValue: number; // Storing as a number
  storage: string;
  condition: 'Excellent' | 'Premium' | 'Good';
}

export interface InventoryData extends InventoryFormData {
  id: string;
}

// 2. Define the context shape
interface InventoryContextType {
  inventory: InventoryData[];
  loading: boolean;
  addInventoryItem: (formData: InventoryFormData) => Promise<void>;
  updateInventoryItem: (id: string, formData: InventoryFormData) => Promise<void>;
  deleteInventoryItem: (id: string) => Promise<void>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [inventory, setInventory] = useState<InventoryData[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. This effect fetches user-specific inventory
  useEffect(() => {
    setLoading(true);
    if (!currentUser) {
      setInventory([]);
      setLoading(false);
      return;
    }

    // This path is new: users/{uid}/inventory
    const inventoryRef = ref(rtdb, `users/${currentUser.uid}/inventory`);
    
    const unsubscribe = onValue(inventoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const inventoryArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setInventory(inventoryArray);
      } else {
        setInventory([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching inventory: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // 4. CRUD functions for inventory
  const addInventoryItem = async (formData: InventoryFormData) => {
    if (!currentUser) throw new Error("User is not logged in");
    const inventoryListRef = ref(rtdb, `users/${currentUser.uid}/inventory`);
    const newItemRef = push(inventoryListRef);
    await set(newItemRef, formData);
  };

  const updateInventoryItem = async (id: string, formData: InventoryFormData) => {
    if (!currentUser) throw new Error("User is not logged in");
    const itemRef = ref(rtdb, `users/${currentUser.uid}/inventory/${id}`);
    await update(itemRef, formData);
  };

  const deleteInventoryItem = async (id: string) => {
    if (!currentUser) throw new Error("User is not logged in");
    const itemRef = ref(rtdb, `users/${currentUser.uid}/inventory/${id}`);
    await remove(itemRef);
  };

  const value = {
    inventory,
    loading,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

// 5. The custom hook to use the context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};