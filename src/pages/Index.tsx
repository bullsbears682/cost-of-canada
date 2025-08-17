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
import SubscriptionPlans from "@/components/SubscriptionPlans";
import MobileHeader from "@/components/MobileHeader";
import { AuthGuard } from "@/components/AuthGuard";
import { FeatureGate } from "@/components/FeatureGate";
import { useRealData } from "@/hooks/useRealData";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { MapPin, Calculator, TrendingUp, Home, Zap, Users, Gift, DollarSign, BarChart3, PiggyBank, Newspaper, LogOut, User, Crown, Flag } from "lucide-react";
import heroImage from "@/assets/hero-canada.jpg";
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("market-dashboard");
  const { demographics, housing, economic, loading, error, lastUpdated, refetch } = useRealData();
  const { user, signOut, subscription, refreshSubscription } = useAuth();
  const isMobile = useIsMobile();

  // Handle subscription status from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subscriptionStatus = urlParams.get('subscription');
    
    if (subscriptionStatus === 'success') {
      setTimeout(() => {
        refreshSubscription();
      }, 2000);
    }
  }, [refreshSubscription]);

  return (
    <div className="min-h-screen bg-gradient-subtle safe-top safe-bottom">
      {/* Mobile or Desktop Header */}
      {isMobile ? (
        <MobileHeader activeSection={activeSection} setActiveSection={setActiveSection} />
      ) : (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo} alt="MapleMetrics" className="h-8 w-8 object-contain" />
                <span className="font-bold text-xl text-foreground">MapleMetrics</span>
              </div>
              <div className="flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    {subscription.subscribed && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-gradient-primary rounded-full text-white text-sm">
                        <Crown className="h-4 w-4" />
                        <span>{subscription.subscription_tier}</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">{user.email}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={signOut}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/auth">
                      <Button variant="ghost" size="sm">Sign In</Button>
                    </Link>
                    <Link to="/auth">
                      <Button size="sm">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-hero ${isMobile ? 'min-h-[70vh] pt-16' : 'min-h-[90vh]'} flex items-center`}>
        <div className="absolute inset-0 bg-gradient-glow" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08]"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-8 md:mb-12 animate-fade-in">
              <div className="relative group mb-6">
                <div className="absolute -inset-4 bg-gradient-primary rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-xl"></div>
                <img 
                  src={logo} 
                  alt="MapleMetrics - Canadian Cost of Living Analysis" 
                  className="relative h-20 w-20 md:h-24 md:w-24 object-contain floating drop-shadow-2xl" 
                />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-primary-foreground text-balance leading-[0.9] tracking-tight">
                <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  MapleMetrics
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-primary rounded-full mt-4 animate-scale-in"></div>
            </div>
            <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/95 mb-10 md:mb-12 leading-relaxed max-w-5xl mx-auto animate-slide-up font-light">
              Navigate Canada's housing affordability with 
              <span className="font-semibold text-white"> comprehensive regional analysis</span>. 
              Make informed decisions with 
              <span className="font-semibold bg-gradient-to-r from-maple-gold to-yellow-300 bg-clip-text text-transparent"> real-time government data</span> 
              and expert insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in max-w-lg mx-auto">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-2xl hover-lift text-lg px-8 py-6 h-auto mobile-button font-semibold tracking-wide group w-full sm:w-auto" 
                onClick={() => window.location.href = "/housing-analyzer"}
              >
                <Calculator className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
                Start Housing Analysis
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/80 text-white hover:bg-white hover:text-primary hover-lift text-lg px-8 py-6 h-auto backdrop-blur-sm bg-white/10 mobile-button font-semibold tracking-wide group w-full sm:w-auto" 
                onClick={() => window.location.href = "/benefits-finder"}
              >
                <Gift className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
                Find Benefits
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Statistics Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block p-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Trusted by 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Millions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive coverage across Canada with real-time data integration from official government sources
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <Card className="text-center border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group animate-fade-in overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-8 pt-8 relative z-10">
                <div className="mx-auto mb-8 relative">
                  <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                    <Home className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-maple-gold rounded-full animate-pulse"></div>
                </div>
                <CardTitle className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  38M+
                </CardTitle>
                <CardTitle className="text-xl mb-4 text-foreground font-semibold">Canadians Served</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Population coverage across all provinces and territories with localized insights
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group animate-fade-in overflow-hidden relative" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-8 pt-8 relative z-10">
                <div className="mx-auto mb-8 relative">
                  <div className="w-24 h-24 bg-gradient-secondary rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                    <TrendingUp className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <CardTitle className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
                  Live
                </CardTitle>
                <CardTitle className="text-xl mb-4 text-foreground font-semibold">Real-Time Data</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Updated housing and cost metrics across 13 provinces with hourly refreshes
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="text-center border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group animate-fade-in overflow-hidden relative" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-canada-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-8 pt-8 relative z-10">
                <div className="mx-auto mb-8 relative">
                  <div className="w-24 h-24 bg-canada-red rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-500 group-hover:scale-110">
                    <Flag className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-canada-red rounded-full animate-pulse"></div>
                </div>
                <CardTitle className="text-4xl font-bold mb-4 text-canada-red">
                  Official
                </CardTitle>
                <CardTitle className="text-xl mb-4 text-foreground font-semibold">Government Data</CardTitle>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Direct integration with Statistics Canada, CMHC, and provincial databases
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Tools Navigation */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-muted/20 to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-block p-3 bg-gradient-primary rounded-2xl mb-6 animate-fade-in shadow-lg">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Comprehensive 
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Financial Tools</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our suite of advanced calculators and analyzers designed specifically for Canadian markets
            </p>
          </div>
          
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-2 px-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8'}`}>
            {[
              { id: "market-dashboard", label: "Live Market Data", icon: BarChart3, color: "from-blue-500 to-blue-600", desc: "Real-time housing & economic metrics", path: "/market-dashboard" },
              { id: "retirement-planner", label: "Retirement Planner", icon: PiggyBank, color: "from-green-500 to-green-600", desc: "Plan your financial future", path: "/retirement-planner" },
              { id: "housing-analyzer", label: "Housing Affordability", icon: Home, color: "from-primary to-primary-dark", desc: "Analyze buying vs renting", path: "/housing-analyzer" },
              { id: "salary-calculator", label: "Salary Requirements", icon: DollarSign, color: "from-yellow-500 to-orange-500", desc: "Income needed by city", path: "/salary-calculator" },
              { id: "utility-optimizer", label: "Utility Optimizer", icon: Zap, color: "from-purple-500 to-purple-600", desc: "Reduce monthly expenses", path: "#" },
              { id: "total-calculator", label: "Total Cost Calculator", icon: Calculator, color: "from-cyan-500 to-cyan-600", desc: "Complete living cost breakdown", path: "#" },
              { id: "benefits-finder", label: "Benefits Finder", icon: Gift, color: "from-canada-red to-red-600", desc: "Discover government programs", path: "/benefits-finder" },
              { id: "comparison", label: "City Comparison", icon: MapPin, color: "from-indigo-500 to-indigo-600", desc: "Compare costs between cities", path: "#" },
              { id: "regional", label: "Regional Overview", icon: TrendingUp, color: "from-teal-500 to-teal-600", desc: "Provincial market insights", path: "#" },
              { id: "subscriptions", label: "Premium Plans", icon: Crown, color: "from-gradient-primary", desc: "Unlock advanced features", path: "/subscriptions" },
              { id: "news", label: "Economic News", icon: Newspaper, color: "from-gray-600 to-gray-700", desc: "Latest market updates", path: "#" }
            ].map(({ id, label, icon: Icon, color, desc, path }, index) => (
              <Card
                key={id}
                className={`group cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-3 animate-fade-in overflow-hidden relative ${
                  activeSection === id ? 'ring-2 ring-primary ring-offset-4 shadow-glow scale-105' : ''
                }`}
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => {
                  if (path && path !== "#") {
                    window.location.href = path;
                  } else {
                    setActiveSection(id);
                  }
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardHeader className="pb-6 pt-6 relative z-10">
                  <div className="mb-4 relative">
                    <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-500 group-hover:scale-110 mx-auto`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    {activeSection === id && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <CardTitle className="text-lg font-bold text-center mb-3 text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {label}
                  </CardTitle>
                  <CardDescription className="text-sm text-center text-muted-foreground leading-relaxed">
                    {desc}
                  </CardDescription>
                </CardHeader>
              </Card>
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
            {loading ? (
              <LoadingSkeleton type="dashboard" />
            ) : (
              <>
                {activeSection === "market-dashboard" && (
                  <FeatureGate requiredTier="Essential" toolName="Real-Time Market Dashboard">
                    <RealTimeMarketDashboard />
                  </FeatureGate>
                )}
                {activeSection === "retirement-planner" && (
                  <FeatureGate requiredTier="Professional" toolName="Retirement Planning Calculator">
                    <RetirementPlanningCalculator />
                  </FeatureGate>
                )}
                {activeSection === "housing-analyzer" && (
                  <FeatureGate requiredTier="Essential" toolName="Housing Affordability Analyzer">
                    <HousingAffordabilityAnalyzer />
                  </FeatureGate>
                )}
                {activeSection === "salary-calculator" && (
                  <FeatureGate requiredTier="Professional" toolName="Salary Requirements Calculator">
                    <SalaryRequirementsCalculator />
                  </FeatureGate>
                )}
                {activeSection === "utility-optimizer" && (
                  <FeatureGate requiredTier="Essential" toolName="Utility Cost Optimizer">
                    <UtilityCostOptimizer />
                  </FeatureGate>
                )}
                {activeSection === "total-calculator" && (
                  <FeatureGate requiredTier="Professional" toolName="Total Cost Calculator">
                    <TotalCostCalculator />
                  </FeatureGate>
                )}
                {activeSection === "benefits-finder" && (
                  <FeatureGate requiredTier="Essential" toolName="Government Benefits Finder">
                    <GovernmentBenefitsFinder />
                  </FeatureGate>
                )}
                {activeSection === "comparison" && (
                  <FeatureGate requiredTier="Professional" toolName="Cost Comparison Tool">
                    <CostComparisonTool />
                  </FeatureGate>
                )}
                {activeSection === "regional" && (
                  <FeatureGate requiredTier="Expert" toolName="Regional Overview">
                    <RegionalOverview />
                  </FeatureGate>
                )}
                {activeSection === "subscriptions" && <SubscriptionPlans />}
                {activeSection === "news" && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <FeatureGate requiredTier="Professional" toolName="News Widget">
                        <NewsWidget />
                      </FeatureGate>
                    </div>
                    <div className="space-y-4">
                      <MobileOptimizedCard title="Quick Links">
                        <div className="space-y-2">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-sm h-auto py-2"
                            onClick={() => setActiveSection("market-dashboard")}
                          >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Market Dashboard
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-sm h-auto py-2"
                            onClick={() => setActiveSection("housing-analyzer")}
                          >
                            <Home className="h-4 w-4 mr-2" />
                            Housing Analysis
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-sm h-auto py-2"
                            onClick={() => setActiveSection("benefits-finder")}
                          >
                            <Gift className="h-4 w-4 mr-2" />
                            Find Benefits
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start text-sm h-auto py-2"
                            onClick={() => setActiveSection("subscriptions")}
                          >
                            <Crown className="h-4 w-4 mr-2" />
                            Premium Plans
                          </Button>
                        </div>
                      </MobileOptimizedCard>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-foreground via-gray-900 to-black text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-primary rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 blur-lg"></div>
                <img 
                  src={logo} 
                  alt="MapleMetrics" 
                  className="relative h-16 w-16 mr-4 object-contain floating drop-shadow-2xl" 
                />
              </div>
              <div>
                <span className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MapleMetrics
                </span>
                <div className="w-12 h-0.5 bg-gradient-primary rounded-full mt-1"></div>
              </div>
            </div>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-3xl mx-auto animate-slide-up leading-relaxed font-light">
              Empowering Canadians with data-driven cost analysis and housing insights. 
              Your trusted partner in making informed financial decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center md:text-left animate-fade-in">
              <h4 className="text-lg font-semibold mb-4 text-primary-foreground">Trust & Security</h4>
              <div className="space-y-3">
                <span className="flex items-center justify-center md:justify-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 group">
                  <div className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  Government-partnership ready
                </span>
                <span className="flex items-center justify-center md:justify-start gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 group">
                  <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                  Privacy-focused
                </span>
              </div>
            </div>
            
            
            <div className="text-center md:text-right animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-lg font-semibold mb-4 text-primary-foreground">Quality Promise</h4>
              <div className="space-y-3">
                <span className="flex items-center justify-center md:justify-end gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 group">
                  <span>Real-time data accuracy</span>
                  <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                </span>
                <span className="flex items-center justify-center md:justify-end gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 group">
                  <span>Expert financial insights</span>
                  <div className="w-2 h-2 bg-secondary rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                </span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-primary-foreground/60 animate-fade-in">
                © 2025 MapleMetrics. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <span>Built with</span>
                <div className="w-4 h-4 bg-canada-red rounded-full animate-pulse"></div>
                <span>for Canadians</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;