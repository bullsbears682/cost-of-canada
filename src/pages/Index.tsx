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
import RetirementPlanningCalculator from "@/components/RetirementPlanningCalculator";
import RealDataIndicator from "@/components/RealDataIndicator";
import { useRealData } from "@/hooks/useRealData";
import { MapPin, Calculator, TrendingUp, Home, Flag, Zap, Users, Gift, DollarSign, BarChart3, PiggyBank } from "lucide-react";
import heroImage from "@/assets/hero-canada.jpg";
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";

const Index = () => {
  const [activeSection, setActiveSection] = useState("market-dashboard");
  const { demographics, housing, economic, loading, error, lastUpdated, refetch } = useRealData();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 container mx-auto px-4 py-24 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <img 
                src={logo} 
                alt="Canadian Cost of Living Analyzer" 
                className="h-20 w-20 mr-6 object-contain floating drop-shadow-2xl" 
              />
              <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground text-balance leading-tight">
                Canadian Cost of Living
                <span className="block gradient-text text-6xl md:text-8xl">Analyzer</span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10 leading-relaxed max-w-4xl mx-auto animate-slide-up">
              Navigate Canada's housing affordability with comprehensive regional analysis. 
              Make informed decisions with <span className="font-semibold text-primary-foreground">real-time government data</span> and expert insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
              <Button 
                size="lg" 
                variant="secondary" 
                className="shadow-glow hover-lift text-lg px-8 py-4 h-auto" 
                onClick={() => setActiveSection("housing-analyzer")}
              >
                <Calculator className="h-6 w-6 mr-3" />
                Start Housing Analysis
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary hover-lift text-lg px-8 py-4 h-auto backdrop-blur-sm bg-white/10" 
                onClick={() => setActiveSection("benefits-finder")}
              >
                <Gift className="h-6 w-6 mr-3" />
                Find Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Key Statistics */}
      <section className="py-20 bg-gradient-subtle relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 gradient-text">Trusted by Millions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive coverage across Canada with real-time data integration
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center shadow-elegant border-0 hover-lift group animate-fade-in">
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-500">
                  <Home className="h-10 w-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-3xl mb-3 gradient-text">38M+ Canadians</CardTitle>
                <CardDescription className="text-lg">Population served across all provinces and territories</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-elegant border-0 hover-lift group animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-secondary rounded-2xl flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-500">
                  <TrendingUp className="h-10 w-10 text-secondary-foreground" />
                </div>
                <CardTitle className="text-3xl mb-3 gradient-text">Real-time Data</CardTitle>
                <CardDescription className="text-lg">Updated housing and cost metrics across 13 provinces/territories</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center shadow-elegant border-0 hover-lift group animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-8">
                <div className="mx-auto mb-6 w-20 h-20 bg-canada-red rounded-2xl flex items-center justify-center group-hover:animate-pulse-glow transition-all duration-500">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl mb-3 gradient-text">Government Integration</CardTitle>
                <CardDescription className="text-lg">Official data sources and benefits finder with application links</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Navigation Tabs */}
      <section className="py-12 bg-muted/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-semibold text-foreground mb-3">Explore Our Tools</h3>
            <p className="text-muted-foreground">Choose from our comprehensive suite of financial analysis tools</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: "market-dashboard", label: "Live Market Data", icon: BarChart3, color: "bg-gradient-primary" },
              { id: "retirement-planner", label: "Retirement Planner", icon: PiggyBank, color: "bg-gradient-secondary" },
              { id: "housing-analyzer", label: "Housing Affordability", icon: Home, color: "bg-gradient-secondary" },
              { id: "salary-calculator", label: "Salary Requirements", icon: DollarSign, color: "bg-gradient-primary" },
              { id: "utility-optimizer", label: "Utility Optimizer", icon: Zap, color: "bg-gradient-secondary" },
              { id: "total-calculator", label: "Total Cost Calculator", icon: Calculator, color: "bg-gradient-primary" },
              { id: "benefits-finder", label: "Benefits Finder", icon: Gift, color: "bg-canada-red" },
              { id: "comparison", label: "City Comparison", icon: MapPin, color: "bg-gradient-secondary" },
              { id: "regional", label: "Regional Overview", icon: TrendingUp, color: "bg-gradient-primary" }
            ].map(({ id, label, icon: Icon, color }, index) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "outline"}
                onClick={() => setActiveSection(id)}
                className={`shadow-card-custom text-sm hover-lift transition-all duration-300 ${
                  activeSection === id 
                    ? `${color} text-white shadow-glow animate-pulse-glow` 
                    : 'hover:shadow-elegant'
                } animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Dynamic Content Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4 space-y-6">
          {/* Real Data Indicator */}
          <div className="max-w-4xl mx-auto">
            <RealDataIndicator
              lastUpdated={lastUpdated}
              isLoading={loading}
              onRefresh={refetch}
              sources={['Statistics Canada', 'Bank of Canada', 'CMHC']}
              error={error}
            />
          </div>
          
          <div className="animate-fade-in">
            {activeSection === "market-dashboard" && <RealTimeMarketDashboard />}
            {activeSection === "retirement-planner" && <RetirementPlanningCalculator />}
            {activeSection === "housing-analyzer" && <HousingAffordabilityAnalyzer />}
            {activeSection === "salary-calculator" && <SalaryRequirementsCalculator />}
            {activeSection === "utility-optimizer" && <UtilityCostOptimizer />}
            {activeSection === "total-calculator" && <TotalCostCalculator />}
            {activeSection === "benefits-finder" && <GovernmentBenefitsFinder />}
            {activeSection === "comparison" && <CostComparisonTool />}
            {activeSection === "regional" && <RegionalOverview />}
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <img 
              src={logo} 
              alt="Canadian Cost of Living Analyzer" 
              className="h-12 w-12 mr-4 object-contain floating" 
            />
            <span className="text-2xl font-bold">Canadian Cost of Living Analyzer</span>
          </div>
          <p className="text-primary-foreground/90 mb-6 text-lg max-w-2xl mx-auto animate-slide-up">
            Empowering Canadians with data-driven cost analysis and housing insights
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8 animate-scale-in">
            <span className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300">
              <Home className="h-5 w-5" />
              Government-partnership ready
            </span>
            <span className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300">
              <TrendingUp className="h-5 w-5" />
              Privacy-focused
            </span>
            <span className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300">
              <Flag className="h-5 w-5" />
              Canadian-made
            </span>
          </div>
          <div className="border-t border-primary-foreground/20 pt-6">
            <p className="text-sm text-primary-foreground/60">
              © 2024 Canadian Cost of Living Analyzer. Built with ❤️ for Canadians.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;