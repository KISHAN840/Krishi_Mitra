import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Page } from "../Router";
// Firebase imports
import { auth, db } from "../../firebaseConfig"; // Import db
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions

interface LoginPageProps {
  onPageChange?: (page: Page) => void;
}

export function LoginPage({ onPageChange }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    farmName: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Updated handleSubmit Function ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password, name, farmName, phoneNumber } = formData;

    try {
      if (isLogin) {
        // Handle Login
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully!");
        // --- Redirect to home ONLY after successful LOGIN ---
        if (onPageChange) {
          onPageChange("home");
        }
      } else {
        // Handle Registration
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("User created in Auth successfully!");

        await setDoc(doc(db, "users", user.uid), {
          name: name,
          farmName: farmName,
          phoneNumber: phoneNumber,
          email: email,
          uid: user.uid,
        });
        console.log("User data saved to Firestore!");

        // --- CHANGE: Switch to login view instead of redirecting ---
        console.log("Registration successful! Switching to login view.");
        setIsLogin(true); // Set the state to show the login form
        // --- REMOVED: onPageChange("home"); ---

      }
      // Note: The onPageChange("home") call is now ONLY inside the if (isLogin) block.

    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setError("No account found with this email. Please register.");
      } else {
        setError("An error occurred: " + err.message); // Show more specific error
      }
      console.error("Firebase Auth Error:", err);
    } finally {
      setLoading(false);
    }
  };
  // --- End of Updated handleSubmit Function ---

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtJTIwZmllbGRzJTIwZ3JlZW58ZW58MXx8fHwxNzU3MDgxNTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-slate-800/70 to-blue-900/80" />

      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="modern-card border-emerald-200/30 dark:border-emerald-600/30 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-4">
              <span className="text-white text-2xl">🌾</span>
            </div>
            <h1 className="text-emerald-600 dark:text-emerald-400 text-2xl mb-2">
              Welcome to KrishiMitra
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Your Smart Farming Companion
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-all ${
                isLogin
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-emerald-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-md text-sm transition-all ${
                !isLogin
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-emerald-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="farmName" className="text-slate-700 dark:text-slate-300">
                    Farm Name (Optional)
                  </Label>
                  <Input
                    id="farmName"
                    type="text"
                    placeholder="e.g., Green Valley Farms"
                    value={formData.farmName}
                    onChange={(e) => handleInputChange("farmName", e.target.value)}
                    className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  />
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-slate-700 dark:text-slate-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Must be at least 6 characters"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="mt-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                required
              />
            </div>

            {/* Error Message Display */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Login to KrishiMitra"
                : "Create Account"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}