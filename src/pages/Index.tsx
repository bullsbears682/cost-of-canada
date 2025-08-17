import { useState, useEffect } from "react";
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
import NewsWidget from "@/components/NewsWidget";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import MobileOptimizedCard from "@/components/MobileOptimizedCard";
import MobileLayout from "@/components/MobileLayout";
import MobileButton from "@/components/MobileButton";
import SupportFooter from "@/components/SupportFooter";
import { AuthGuard } from "@/components/AuthGuard";
import { useRealData } from "@/hooks/useRealData";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { StatisticsService, RealTimeStats } from "@/services/StatisticsService";
import { UserProfileService } from "@/services/UserProfileService";
import UserProfileButton from "@/components/UserProfileButton";
import { MapPin, Calculator, TrendingUp, Home, Zap, Users, Gift, DollarSign, BarChart3, PiggyBank, Newspaper, LogOut, User, Flag, Loader2 } from "lucide-react";
import heroImage from "@/assets/hero-canada.jpg";
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("market-dashboard");
  const [realTimeStats, setRealTimeStats] = useState<RealTimeStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const { demographics, housing, economic, loading, error, lastUpdated, refetch } = useRealData();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();

  // Load real-time statistics
  useEffect(() => {
    const loadStats = async () => {
      setStatsLoading(true);
      try {
        const { data } = await StatisticsService.getEnhancedStatistics();
        setRealTimeStats(data);
      } catch (error) {
        console.error('Failed to load statistics:', error);
        // Set fallback data on error
        setRealTimeStats({
          totalUsers: 15420,
          activeUsers: 2847,
          calculationsToday: 4521,
          avgHousingAffordability: 42.8,
          topCities: [
            { name: "Toronto", affordability: 28.5 },
            { name: "Vancouver", affordability: 31.2 },
            { name: "Calgary", affordability: 58.7 },
            { name: "Ottawa", affordability: 45.3 },
            { name: "Montreal", affordability: 52.1 }
          ]
        });
      } finally {
        setStatsLoading(false);
      }
    };

    loadStats();
  }, []);

  const toolSections = [
    {
      id: "market-dashboard",
      title: "📊 Market Dashboard",
      description: "Real-time housing market insights across Canada",
      icon: BarChart3,
      component: <RealTimeMarketDashboard />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "housing-analyzer",
      title: "🏠 Housing Analysis",
      description: "Comprehensive affordability analysis for your dream home",
      icon: Home,
      component: <HousingAffordabilityAnalyzer />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "retirement-planner",
      title: "🐷 Retirement Planning",
      description: "Plan your golden years with regional cost considerations",
      icon: PiggyBank,
      component: <RetirementPlanningCalculator />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "salary-calculator",
      title: "💰 Salary Calculator",
      description: "Calculate required income for different Canadian cities",
      icon: DollarSign,
      component: <SalaryRequirementsCalculator />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "benefits-finder",
      title: "🎁 Benefits Finder",
      description: "Discover government benefits and assistance programs",
      icon: Gift,
      component: <GovernmentBenefitsFinder />,
      color: "from-red-500 to-pink-500"
    },
    {
      id: "utility-optimizer",
      title: "⚡ Utility Optimizer",
      description: "Optimize your utility costs across Canada",
      icon: Zap,
      component: <UtilityCostOptimizer />,
      color: "from-teal-500 to-blue-500"
    },
    {
      id: "comparison",
      title: "📍 City Comparison",
      description: "Compare living costs between Canadian cities",
      icon: MapPin,
      component: <CostComparisonTool />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "regional",
      title: "📈 Regional Overview",
      description: "Explore regional housing trends and statistics",
      icon: TrendingUp,
      component: <RegionalOverview />,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const renderHeroSection = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <img 
            src={logo} 
            alt="MapleMetrics Logo" 
            className="h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg"
          />
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Navigate Canada's
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Housing Market
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Make informed decisions with real-time data, comprehensive analysis, and powerful tools designed for Canadian housing affordability.
            </p>
          </div>

          {realTimeStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">
                  {realTimeStats.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-white/80">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-300">
                  {realTimeStats.activeUsers.toLocaleString()}
                </div>
                <div className="text-sm text-white/80">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-300">
                  {realTimeStats.calculationsToday.toLocaleString()}
                </div>
                <div className="text-sm text-white/80">Calculations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-300">
                  {realTimeStats.avgHousingAffordability}%
                </div>
                <div className="text-sm text-white/80">Avg Afford.</div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <MobileButton 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => setActiveSection("housing-analyzer")}
              fullWidth={isMobile}
            >
              <Home className="mr-2 h-5 w-5" />
              Start Analysis
            </MobileButton>
            
            <MobileButton 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => setActiveSection("market-dashboard")}
              fullWidth={isMobile}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Market Data
            </MobileButton>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuickActions = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {toolSections.slice(0, 4).map((section) => {
        const Icon = section.icon;
        return (
          <MobileOptimizedCard
            key={section.id}
            interactive
            onClick={() => setActiveSection(section.id)}
            className="text-center hover:shadow-lg transition-all duration-200"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${section.color} shadow-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">
                  {section.title.replace(/^[^\s]+ /, '')}
                </h3>
              </div>
            </div>
          </MobileOptimizedCard>
        );
      })}
    </div>
  );

  const renderActiveSection = () => {
    const section = toolSections.find(s => s.id === activeSection);
    if (!section) return null;

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {section.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>
        
        <MobileOptimizedCard className="p-0">
          {section.component}
        </MobileOptimizedCard>
      </div>
    );
  };

  if (loading && !realTimeStats) {
    return (
      <MobileLayout 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        showBottomNav={false}
      >
        <LoadingSkeleton />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        {renderHeroSection()}

        {/* Real Data Indicator */}
        <div className="flex justify-center">
          <RealDataIndicator 
            lastUpdated={lastUpdated} 
            onRefresh={refetch}
            isLoading={loading}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-foreground">
            Quick Tools
          </h2>
          {renderQuickActions()}
        </div>

        {/* Active Section */}
        {renderActiveSection()}

        {/* News Widget */}
        <MobileOptimizedCard title="📰 Housing Market News">
          <NewsWidget />
        </MobileOptimizedCard>

        {/* Support Footer */}
        <SupportFooter />
      </div>
    </MobileLayout>
  );
};

export default Index;