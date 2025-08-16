import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CostComparisonTool } from "@/components/CostComparisonTool";
import { RegionalOverview } from "@/components/RegionalOverview";
import { AffordabilityCalculator } from "@/components/AffordabilityCalculator";
import { HousingAffordabilityAnalyzer } from "@/components/HousingAffordabilityAnalyzer";
import { UtilityCostOptimizer } from "@/components/UtilityCostOptimizer";
import { TotalCostCalculator } from "@/components/TotalCostCalculator";
import { GovernmentBenefitsFinder } from "@/components/GovernmentBenefitsFinder";
import { RealTimeMarketDashboard } from "@/components/RealTimeMarketDashboard";
import { SalaryRequirementsCalculator } from "@/components/SalaryRequirementsCalculator";
import { MapPin, Calculator, TrendingUp, Home, Flag, Zap, Users, Gift, DollarSign, BarChart3 } from "lucide-react";
import heroImage from "@/assets/hero-canada.jpg";

const Index = () => {
  const [activeSection, setActiveSection] = useState("market-dashboard");

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Flag className="h-12 w-12 text-primary-foreground mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">
                Canadian Cost of Living Analyzer
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              Navigate Canada's housing affordability crisis with comprehensive regional cost analysis. 
              Make informed decisions with government-grade data and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="shadow-button-custom" onClick={() => setActiveSection("housing-analyzer")}>
                <Calculator className="h-5 w-5 mr-2" />
                Start Housing Analysis
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" onClick={() => setActiveSection("benefits-finder")}>
                <Gift className="h-5 w-5 mr-2" />
                Find Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center shadow-card-custom border-0">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Home className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">38M+ Canadians</CardTitle>
                <CardDescription>Population served across all provinces and territories</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-card-custom border-0">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Real-time Data</CardTitle>
                <CardDescription>Updated housing and cost metrics across 13 provinces/territories</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-card-custom border-0">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-canada-red rounded-full flex items-center justify-center">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Government Integration</CardTitle>
                <CardDescription>Official data sources and benefits finder with application links</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: "market-dashboard", label: "Live Market Data", icon: BarChart3 },
              { id: "housing-analyzer", label: "Housing Affordability", icon: Home },
              { id: "salary-calculator", label: "Salary Requirements", icon: DollarSign },
              { id: "utility-optimizer", label: "Utility Optimizer", icon: Zap },
              { id: "total-calculator", label: "Total Cost Calculator", icon: Calculator },
              { id: "benefits-finder", label: "Benefits Finder", icon: Gift },
              { id: "comparison", label: "City Comparison", icon: MapPin },
              { id: "regional", label: "Regional Overview", icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "outline"}
                onClick={() => setActiveSection(id)}
                className="shadow-card-custom text-sm"
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {activeSection === "market-dashboard" && <RealTimeMarketDashboard />}
          {activeSection === "housing-analyzer" && <HousingAffordabilityAnalyzer />}
          {activeSection === "salary-calculator" && <SalaryRequirementsCalculator />}
          {activeSection === "utility-optimizer" && <UtilityCostOptimizer />}
          {activeSection === "total-calculator" && <TotalCostCalculator />}
          {activeSection === "benefits-finder" && <GovernmentBenefitsFinder />}
          {activeSection === "comparison" && <CostComparisonTool />}
          {activeSection === "regional" && <RegionalOverview />}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Flag className="h-8 w-8 mr-2" />
            <span className="text-lg font-semibold">Canadian Cost of Living Analyzer</span>
          </div>
          <p className="text-primary-foreground/80 mb-4">
            Empowering Canadians with data-driven cost analysis and housing insights
          </p>
          <p className="text-sm text-primary-foreground/60">
            Government-partnership ready • Privacy-focused • Canadian-made
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;