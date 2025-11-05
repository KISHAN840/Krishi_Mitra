import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// Define the shape of your context
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // This effect runs once and sets up the Firebase listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // This function is called by Firebase whenever
      // a user logs in or logs out
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = () => {
    signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    logout,
  };

  // Provide the auth state to children
  // We don't render children until the initial loading is done
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};