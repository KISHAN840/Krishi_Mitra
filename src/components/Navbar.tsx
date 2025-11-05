import { useState } from "react";
import { Button } from "./ui/button";
import { Page } from "./Router";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const { t } = useLanguage();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home" as Page, label: t("navbar.home") },
    { id: "crops" as Page, label: t("navbar.crops") },
    { id: "weather" as Page, label: t("navbar.weather") },
    { id: "market" as Page, label: t("navbar.market") },
    { id: "support" as Page, label: t("navbar.support") },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onPageChange("home");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleMobileLinkClick = (page: Page) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleMobileLoginClick = () => {
    onPageChange("login");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              onPageChange("home");
              setIsMobileMenuOpen(false);
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">🌾</span>
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold text-xl">
              KrishiMitra
            </span>
          </div>

          {/* Desktop Navigation Menu (Hides on mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`transition-all duration-300 relative group px-3 py-2 rounded-lg ${
                  currentPage === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                    : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* --- DESKTOP ACTION BUTTONS (Hides on mobile) --- */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSelector />
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-full p-0.5 border-2 border-transparent hover:border-emerald-500 transition-all focus:outline-none focus:border-emerald-500"
                title="Logout"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="Your Profile"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                    {currentUser.email ? currentUser.email[0].toUpperCase() : "U"}
                  </div>
                )}
              </button>
            ) : (
              <Button
                onClick={() => onPageChange("login")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {t("navbar.login")}
              </Button>
            )}
            <Button
              onClick={() => onPageChange("support")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {t("navbar.support")}
            </Button>
          </div>

          {/* --- MOBILE MENU (Hides on desktop) --- */}
          <div className="flex items-center md:hidden">
            <DropdownMenu
              open={isMobileMenuOpen}
              onOpenChange={setIsMobileMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-screen max-w-xs md:hidden p-2"
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {/* Language Selector is MOVED inside here */}
                <div className="px-2 py-1.5">
                  <LanguageSelector />
                </div>
                <DropdownMenuSeparator />
                
                {/* Mobile Nav Links */}
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => handleMobileLinkClick(item.id)}
                    className={
                      currentPage === item.id
                        ? "bg-accent"
                        : ""
                    }
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                
                {/* Mobile Login/Profile & Support Buttons */}
                <div className="flex flex-col space-y-2 pt-1">
                  {currentUser ? (
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-3"
                    >
                      {currentUser.photoURL ? (
                        <img
                          src={currentUser.photoURL}
                          alt="Your Profile"
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                          {currentUser.email ? currentUser.email[0].toUpperCase() : "U"}
                        </div>
                      )}
                      <span>{t("navbar.logout")}</span>
                    </DropdownMenuItem>
                  ) : (
                    <Button
                      onClick={handleMobileLoginClick}
                      className="w-full justify-center bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    >
                      {t("navbar.login")}
                    </Button>
                  )}
                  <Button
                    onClick={() => handleMobileLinkClick("support")}
                    className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  >
                    {t("navbar.support")}
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}