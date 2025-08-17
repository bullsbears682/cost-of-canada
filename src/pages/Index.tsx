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
import SwipeableToolCard from "@/components/SwipeableToolCard";
import SupportFooter from "@/components/SupportFooter";
import { AuthGuard } from "@/components/AuthGuard";
import { useRealData } from "@/hooks/useRealData";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStaggeredAnimation, usePageTransition } from "@/hooks/useAnimations";
import { useNavigationSwipe, usePullToRefresh } from "@/hooks/useSwipeGestures";
import { UserProfileService } from "@/services/UserProfileService";
import UserProfileButton from "@/components/UserProfileButton";
import { MapPin, Calculator, TrendingUp, Home, Zap, Users, Gift, DollarSign, BarChart3, PiggyBank, Newspaper, LogOut, User, Flag, Loader2, RefreshCw } from "lucide-react";
import heroImage from "@/assets/hero-canada.jpg";
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeSection, setActiveSection] = useState("market-dashboard");
  const [favoriteTools, setFavoriteTools] = useState<string[]>([]);
  const [bookmarkedTools, setBookmarkedTools] = useState<string[]>([]);
  const { demographics, housing, economic, loading, error, lastUpdated, refetch } = useRealData();
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Animation hooks
  const { getItemStyle, startStagger } = useStaggeredAnimation(8, 100);
  const { startTransition } = usePageTransition();

  // Navigation swipe for going back
  const { ref: navSwipeRef } = useNavigationSwipe(() => {
    if (window.history.length > 1) {
      navigate(-1);
    }
  });

  // Pull to refresh functionality
  const handleRefresh = async () => {
    await refetch();
  };

  const { ref: pullRef, pullToRefreshStyle, canRefresh, isRefreshing, pullProgress } = usePullToRefresh(handleRefresh);

  // Load real-time statistics
  useEffect(() => {
    startStagger(); // Start staggered animations
  }, [startStagger]);

  const toolSections = [
    {
      id: "market-dashboard",
      title: "Market Dashboard",
      description: "Real-time housing market insights across Canada with live data updates",
      icon: BarChart3,
      component: <RealTimeMarketDashboard />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "housing-analyzer",
      title: "Housing Analysis",
      description: "Comprehensive affordability analysis for your dream home with smart recommendations",
      icon: Home,
      component: <HousingAffordabilityAnalyzer />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "retirement-planner",
      title: "Retirement Planning",
      description: "Plan your golden years with regional cost considerations and investment advice",
      icon: PiggyBank,
      component: <RetirementPlanningCalculator />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      id: "salary-calculator",
      title: "Salary Calculator",
      description: "Calculate required income for different Canadian cities with tax considerations",
      icon: DollarSign,
      component: <SalaryRequirementsCalculator />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "benefits-finder",
      title: "Benefits Finder",
      description: "Discover government benefits and assistance programs you may qualify for",
      icon: Gift,
      component: <GovernmentBenefitsFinder />,
      color: "from-red-500 to-pink-500"
    },
    {
      id: "utility-optimizer",
      title: "Utility Optimizer",
      description: "Optimize your utility costs across Canada with smart recommendations",
      icon: Zap,
      component: <UtilityCostOptimizer />,
      color: "from-teal-500 to-blue-500"
    },
    {
      id: "comparison",
      title: "City Comparison",
      description: "Compare living costs between Canadian cities with detailed breakdowns",
      icon: MapPin,
      component: <CostComparisonTool />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "regional",
      title: "Regional Overview",
      description: "Explore regional housing trends and statistics with interactive maps",
      icon: TrendingUp,
      component: <RegionalOverview />,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const handleToolClick = (toolId: string) => {
    startTransition('slideLeft');
    setActiveSection(toolId);
  };

  const handleFavorite = (toolId: string) => {
    setFavoriteTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const handleBookmark = (toolId: string) => {
    setBookmarkedTools(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const renderHeroSection = () => (
    <div 
      ref={pullRef}
      style={pullToRefreshStyle}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent text-white"
    >
      {/* Pull to refresh indicator */}
      {(canRefresh || isRefreshing) && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm",
            isRefreshing ? "animate-spin" : "pull-indicator"
          )}>
            <RefreshCw className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-black/20" />
      <div className="relative px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-col items-center text-center space-y-6">
          <img 
            src={logo} 
            alt="MapleMetrics Logo" 
            className="h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg micro-bounce"
          />
          
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight page-fade-in">
              Navigate Canada's
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Housing Market
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed page-fade-in">
              Make informed decisions with real-time data, comprehensive analysis, and powerful tools designed for Canadian housing affordability.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <MobileButton 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => handleToolClick("housing-analyzer")}
              fullWidth={isMobile}
              microInteraction="bounce"
            >
              <Home className="mr-2 h-5 w-5" />
              Start Analysis
            </MobileButton>
            
            <MobileButton 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
              onClick={() => handleToolClick("market-dashboard")}
              fullWidth={isMobile}
              microInteraction="glow"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Market Data
            </MobileButton>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSwipeableTools = () => (
    <div className="space-y-4">
      {toolSections.map((section, index) => (
        <SwipeableToolCard
          key={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          color={section.color}
          onClick={() => handleToolClick(section.id)}
          onFavorite={() => handleFavorite(section.id)}
          onBookmark={() => handleBookmark(section.id)}
          isFavorited={favoriteTools.includes(section.id)}
          isBookmarked={bookmarkedTools.includes(section.id)}
          className="stagger-item"
        />
      ))}
    </div>
  );

  const renderQuickActions = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {toolSections.slice(0, 4).map((section, index) => {
        const Icon = section.icon;
        return (
          <MobileOptimizedCard
            key={section.id}
            interactive
            onClick={() => handleToolClick(section.id)}
            className="text-center hover:shadow-lg transition-all duration-200"
            microInteraction="press"
            staggerIndex={index}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={cn(
                "p-3 rounded-xl shadow-lg transition-all duration-300 micro-bounce",
                `bg-gradient-to-br ${section.color}`
              )}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">
                  {section.title}
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
      <div className="space-y-6 page-fade-in">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {section.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>
        
        <MobileOptimizedCard className="p-0" microInteraction="glow">
          {section.component}
        </MobileOptimizedCard>
      </div>
    );
  };

  if (loading) {
    return (
      <MobileLayout 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        showBottomNav={false}
      >
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl skeleton-shimmer" />
          ))}
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection}
      className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background"
    >
      <div ref={navSwipeRef} className="space-y-8">
        {/* Hero Section with Pull-to-Refresh */}
        {renderHeroSection()}

        {/* Real Data Indicator */}
        <div className="flex justify-center">
          <div className="stagger-item">
            <RealDataIndicator 
              lastUpdated={lastUpdated} 
              onRefresh={handleRefresh}
              isLoading={loading}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-foreground stagger-item">
            Quick Tools
          </h2>
          {renderQuickActions()}
        </div>

        {/* All Tools with Swipe Actions */}
        {isMobile && (
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-center text-foreground">
              All Tools
              <span className="block text-sm font-normal text-muted-foreground mt-1">
                Swipe cards to favorite or bookmark
              </span>
            </h2>
            {renderSwipeableTools()}
          </div>
        )}

        {/* Active Section */}
        {renderActiveSection()}

        {/* News Widget with micro-interactions */}
        <MobileOptimizedCard 
          title="📰 Housing Market News" 
          microInteraction="hover"
          staggerIndex={5}
        >
          <NewsWidget />
        </MobileOptimizedCard>

        {/* Support Footer */}
        <div className="stagger-item">
          <SupportFooter />
        </div>
      </div>
    </MobileLayout>
  );
};

export default Index;