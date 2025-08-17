import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/AuthPage";
import MarketDashboard from "./pages/MarketDashboard";
import HousingAnalyzer from "./pages/HousingAnalyzer";
import RetirementPlanner from "./pages/RetirementPlanner";
import SalaryCalculator from "./pages/SalaryCalculator";
import BenefitsFinder from "./pages/BenefitsFinder";


const queryClient = new QueryClient();

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Only show loading screen on initial app load
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem('app-loaded');
    if (hasLoadedBefore) {
      setIsInitialLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('app-loaded', 'true');
    setIsInitialLoading(false);
  };

  if (isInitialLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/market-dashboard" element={<MarketDashboard />} />
              <Route path="/housing-analyzer" element={<HousingAnalyzer />} />
              <Route path="/retirement-planner" element={<RetirementPlanner />} />
              <Route path="/salary-calculator" element={<SalaryCalculator />} />
              <Route path="/benefits-finder" element={<BenefitsFinder />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
