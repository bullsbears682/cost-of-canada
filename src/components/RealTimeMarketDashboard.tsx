import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle, DollarSign, Home, Percent } from "lucide-react";
import { StatisticsCanadaAPI } from "@/services/StatisticsCanadaAPI";
import { BankOfCanadaAPI } from "@/services/BankOfCanadaAPI";


interface MarketData {
  mortgageRate: number;
  inflationRate: number;
  exchangeRate: number;
  lastUpdated: string;
}

export const RealTimeMarketDashboard = () => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchMarketData = async () => {
    setLoading(true);
    try {
      const [mortgageRates, inflationData, exchangeRates] = await Promise.all([
        BankOfCanadaAPI.getMortgageRates(),
        BankOfCanadaAPI.getInflationRate(),
        BankOfCanadaAPI.getExchangeRates()
      ]);

      setMarketData({
        mortgageRate: mortgageRates.rate,
        inflationRate: inflationData.currentRate,
        exchangeRate: exchangeRates.usdCad,
        lastUpdated: new Date().toISOString()
      });
      
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error fetching market data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchMarketData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getTrendIcon = (value: number, threshold: number = 0) => {
    return value > threshold ? (
      <TrendingUp className="h-4 w-4 text-destructive" />
    ) : (
      <TrendingDown className="h-4 w-4 text-green-600" />
    );
  };

  if (loading && !marketData) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Real-Time Market Dashboard</h2>
          <div className="flex items-center justify-center">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Loading live market data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Real-Time Market Dashboard</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Live data from Bank of Canada, Statistics Canada, and real estate markets
        </p>
        <div className="flex items-center justify-center mt-4 gap-4">
          <span className="text-sm text-muted-foreground">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchMarketData}
            disabled={loading}
            className="hover-scale"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Economic Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card-custom animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Mortgage Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {marketData?.mortgageRate.toFixed(2)}%
                </div>
                <div className="text-sm text-muted-foreground">5-Year Fixed</div>
              </div>
              {getTrendIcon(marketData?.mortgageRate || 0, 5.0)}
            </div>
            <div className="mt-2">
              <Progress value={(marketData?.mortgageRate || 0) * 10} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Percent className="h-5 w-5 mr-2 text-secondary" />
              Inflation Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {marketData?.inflationRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Annual CPI</div>
              </div>
              {getTrendIcon(marketData?.inflationRate || 0, 3.0)}
            </div>
            <div className="mt-2">
              <Progress value={(marketData?.inflationRate || 0) * 20} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom animate-scale-in">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Home className="h-5 w-5 mr-2 text-canada-red" />
              USD/CAD Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-canada-red">
                  {marketData?.exchangeRate.toFixed(4)}
                </div>
                <div className="text-sm text-muted-foreground">Exchange Rate</div>
              </div>
              {getTrendIcon(marketData?.exchangeRate || 0, 1.35)}
            </div>
            <div className="mt-2">
              <Progress value={(marketData?.exchangeRate || 1.3) * 50} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Impact Analysis */}
      <Card className="shadow-elegant animate-fade-in">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Market Impact Analysis
          </CardTitle>
          <CardDescription className="text-primary-foreground/90">
            How current economic conditions affect housing affordability
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Mortgage Affordability Impact</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">$500K Home Monthly Payment</span>
                  <span className="font-semibold">
                    ${Math.round(BankOfCanadaAPI.calculateMortgagePayment(400000, marketData?.mortgageRate || 5.5)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Required Household Income</span>
                  <span className="font-semibold">
                    ${Math.round(BankOfCanadaAPI.calculateMortgagePayment(400000, marketData?.mortgageRate || 5.5) * 12 / 0.32).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">If rates drop 1%</span>
                  <span className="font-semibold text-green-600">
                    -${Math.round(
                      BankOfCanadaAPI.calculateMortgagePayment(400000, marketData?.mortgageRate || 5.5) -
                      BankOfCanadaAPI.calculateMortgagePayment(400000, (marketData?.mortgageRate || 5.5) - 1)
                    ).toLocaleString()}/month
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Inflation Impact on Living Costs</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Monthly Cost Increase</span>
                  <span className="font-semibold text-destructive">
                    +{((marketData?.inflationRate || 3.8) / 12).toFixed(1)}%/month
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">$3000 Monthly Budget Impact</span>
                  <span className="font-semibold">
                    +${Math.round(3000 * (marketData?.inflationRate || 3.8) / 100 / 12)}/month
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Annual Cost Increase</span>
                  <span className="font-semibold text-destructive">
                    +${Math.round(36000 * (marketData?.inflationRate || 3.8) / 100)}/year
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Data Sources */}
      <Card className="shadow-card-custom">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground text-center">
            <p className="font-medium mb-2">📊 Live Data Sources</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>Bank of Canada:</strong> Interest rates, inflation data, exchange rates
              </div>
              <div>
                <strong>Statistics Canada:</strong> CPI, housing price index, rental market data
              </div>
            </div>
            <div className="mt-3 text-xs">
              Data refreshes automatically every 5 minutes • Last refresh: {lastRefresh.toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};