import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { CropsPage } from "./pages/CropsPage";
import { WeatherPage } from "./pages/WeatherPage";
import { MarketPage } from "./pages/MarketPage";
import { SupportPage } from "./pages/SupportPage";
import { LoginPage } from "./pages/LoginPage";
import { IrrigationSystemPage } from "./pages/IrrigationSystemPage";
import { SoilMoisturePage } from "./pages/SoilMoisturePage";
import { AlertsPage } from "./pages/AlertsPage";
import { WheatHarvestPage } from "./pages/WheatHarvestPage";
import { CornAnalyticsPage } from "./pages/CornAnalyticsPage";
import { GrainTrendsPage } from "./pages/GrainTrendsPage";

export type Page = "home" | "crops" | "weather" | "market" | "support" | "login" | "irrigation" | "soil-moisture" | "alerts" | "wheat-harvest" | "corn-analytics" | "grain-trends";

interface RouterProps {
  currentPage: Page;
  onPageChange?: (page: Page) => void;
}

export function Router({ currentPage, onPageChange }: RouterProps) {
  switch (currentPage) {
    case "home":
      return <HomePage onPageChange={onPageChange} />;
    case "crops":
      return <CropsPage onPageChange={onPageChange} />;
    case "weather":
      return <WeatherPage onPageChange={onPageChange} />;
    case "market":
      return <MarketPage onPageChange={onPageChange} />;
    case "support":
      return <SupportPage onPageChange={onPageChange} />;
    case "login":
      return <LoginPage onPageChange={onPageChange} />;
    case "irrigation":
      return <IrrigationSystemPage onPageChange={onPageChange} />;
    case "soil-moisture":
      return <SoilMoisturePage onPageChange={onPageChange} />;
    case "alerts":
      return <AlertsPage onPageChange={onPageChange} />;
    case "wheat-harvest":
      return <WheatHarvestPage onPageChange={onPageChange} />;
    case "corn-analytics":
      return <CornAnalyticsPage onPageChange={onPageChange} />;
    case "grain-trends":
      return <GrainTrendsPage onPageChange={onPageChange} />;
    default:
      return <HomePage onPageChange={onPageChange} />;
  }
}