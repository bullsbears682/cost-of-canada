import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Wifi, Droplets, Flame, TrendingDown, TrendingUp, DollarSign } from "lucide-react";

const provincialUtilityCosts = {
  "BC": {
    name: "British Columbia",
    electricity: 0.1246, // per kWh
    naturalGas: 0.0891, // per m³
    water: 85,
    internet: 75,
    monthlyElectricity: 156,
    monthlyGas: 89,
    total: 405
  },
  "AB": {
    name: "Alberta", 
    electricity: 0.1689,
    naturalGas: 0.0456,
    water: 75,
    internet: 70,
    monthlyElectricity: 211,
    monthlyGas: 46,
    total: 402
  },
  "SK": {
    name: "Saskatchewan",
    electricity: 0.1601,
    naturalGas: 0.0523,
    water: 65,
    internet: 65,
    monthlyElectricity: 200,
    monthlyGas: 52,
    total: 382
  },
  "MB": {
    name: "Manitoba",
    electricity: 0.0953,
    naturalGas: 0.0678,
    water: 70,
    internet: 68,
    monthlyElectricity: 119,
    monthlyGas: 68,
    total: 325
  },
  "ON": {
    name: "Ontario",
    electricity: 0.1651,
    naturalGas: 0.0723,
    water: 95,
    internet: 80,
    monthlyElectricity: 206,
    monthlyGas: 72,
    total: 453
  },
  "QC": {
    name: "Quebec",
    electricity: 0.0736,
    naturalGas: 0.0634,
    water: 55,
    internet: 65,
    monthlyElectricity: 92,
    monthlyGas: 63,
    total: 275
  },
  "NB": {
    name: "New Brunswick",
    electricity: 0.1298,
    naturalGas: 0.0856,
    water: 80,
    internet: 70,
    monthlyElectricity: 162,
    monthlyGas: 86,
    total: 398
  },
  "NS": {
    name: "Nova Scotia",
    electricity: 0.1709,
    naturalGas: 0.0945,
    water: 85,
    internet: 75,
    monthlyElectricity: 214,
    monthlyGas: 95,
    total: 469
  },
  "PE": {
    name: "Prince Edward Island",
    electricity: 0.1543,
    naturalGas: 0.0823,
    water: 75,
    internet: 70,
    monthlyElectricity: 193,
    monthlyGas: 82,
    total: 420
  },
  "NL": {
    name: "Newfoundland and Labrador",
    electricity: 0.1285,
    naturalGas: 0.0876,
    water: 90,
    internet: 85,
    monthlyElectricity: 161,
    monthlyGas: 88,
    total: 424
  }
};

export const UtilityCostOptimizer = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [compareProvince, setCompareProvince] = useState<string>("");

  const currentData = provincialUtilityCosts[selectedProvince as keyof typeof provincialUtilityCosts];
  const compareData = provincialUtilityCosts[compareProvince as keyof typeof provincialUtilityCosts];

  const calculateSavings = () => {
    if (!currentData || !compareData) return null;
    
    const monthlySavings = currentData.total - compareData.total;
    const annualSavings = monthlySavings * 12;
    
    return {
      monthly: monthlySavings,
      annual: annualSavings,
      percentage: (monthlySavings / currentData.total) * 100
    };
  };

  const savings = calculateSavings();
  const maxTotal = Math.max(...Object.values(provincialUtilityCosts).map(p => p.total));
  const minTotal = Math.min(...Object.values(provincialUtilityCosts).map(p => p.total));

  const getUtilityIcon = (type: string) => {
    switch (type) {
      case 'electricity': return Zap;
      case 'gas': return Flame;
      case 'water': return Droplets;
      case 'internet': return Wifi;
      default: return DollarSign;
    }
  };

  const getCostLevel = (cost: number) => {
    const range = maxTotal - minTotal;
    const position = (cost - minTotal) / range;
    
    if (position <= 0.33) return { level: "Low", color: "secondary" };
    if (position <= 0.66) return { level: "Moderate", color: "outline" };
    return { level: "High", color: "destructive" };
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Utility Cost Optimizer</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare electricity, gas, water, and internet costs across Canadian provinces to optimize your living expenses
        </p>
      </div>

      {/* Province Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card-custom">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <CardTitle>Current Province</CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Select your current province
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger>
                <SelectValue placeholder="Select current province" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(provincialUtilityCosts).map(([code, data]) => (
                  <SelectItem key={code} value={code}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader className="bg-gradient-secondary text-secondary-foreground">
            <CardTitle>Compare With</CardTitle>
            <CardDescription className="text-secondary-foreground/90">
              Select a province to compare
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Select value={compareProvince} onValueChange={setCompareProvince}>
              <SelectTrigger>
                <SelectValue placeholder="Select province to compare" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(provincialUtilityCosts).map(([code, data]) => (
                  <SelectItem key={code} value={code}>
                    {data.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Key Insight */}
      {savings && currentData && compareData && (
        <Card className="shadow-elegant border-primary/20">
          <CardHeader className="bg-gradient-hero text-primary-foreground text-center">
            <CardTitle className="text-2xl">💡 Key Insight</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center">
            {savings.annual > 0 ? (
              <div className="space-y-2">
                <TrendingDown className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-green-700">
                  Moving to {compareData.name} could save you ${Math.abs(savings.annual).toLocaleString()}/year on utilities!
                </h3>
                <p className="text-muted-foreground">
                  That's ${Math.abs(savings.monthly).toLocaleString()}/month in utility savings ({Math.abs(savings.percentage).toFixed(1)}% reduction)
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <TrendingUp className="h-12 w-12 mx-auto text-destructive mb-4" />
                <h3 className="text-xl font-bold text-destructive">
                  Moving to {compareData.name} would cost you ${Math.abs(savings.annual).toLocaleString()}/year more in utilities
                </h3>
                <p className="text-muted-foreground">
                  That's ${Math.abs(savings.monthly).toLocaleString()}/month more ({Math.abs(savings.percentage).toFixed(1)}% increase)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Side-by-Side Comparison */}
      {currentData && compareData && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center">Provincial Utility Comparison</CardTitle>
            <CardDescription className="text-center">
              Detailed breakdown of utility costs between provinces
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current Province */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">{currentData.name}</h3>
                  <Badge variant={getCostLevel(currentData.total).color as "secondary" | "outline" | "destructive"}>
                    {getCostLevel(currentData.total).level} Cost
                  </Badge>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Electricity", icon: Zap, monthly: currentData.monthlyElectricity, rate: currentData.electricity, unit: "/kWh" },
                    { label: "Natural Gas", icon: Flame, monthly: currentData.monthlyGas, rate: currentData.naturalGas, unit: "/m³" },
                    { label: "Water & Sewer", icon: Droplets, monthly: currentData.water, rate: null, unit: "" },
                    { label: "Internet", icon: Wifi, monthly: currentData.internet, rate: null, unit: "" }
                  ].map(({ label, icon: Icon, monthly, rate, unit }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-sm font-medium">
                          <Icon className="h-4 w-4 mr-2 text-primary" />
                          {label}
                        </span>
                        <div className="text-right">
                          <div className="font-semibold">${monthly}</div>
                          {rate && <div className="text-xs text-muted-foreground">${rate.toFixed(4)}{unit}</div>}
                        </div>
                      </div>
                      <Progress value={(monthly / 250) * 100} className="h-2" />
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Monthly</span>
                      <span className="text-xl font-bold text-primary">${currentData.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare Province */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">{compareData.name}</h3>
                  <Badge variant={getCostLevel(compareData.total).color as "secondary" | "outline" | "destructive"}>
                    {getCostLevel(compareData.total).level} Cost
                  </Badge>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Electricity", icon: Zap, monthly: compareData.monthlyElectricity, rate: compareData.electricity, unit: "/kWh" },
                    { label: "Natural Gas", icon: Flame, monthly: compareData.monthlyGas, rate: compareData.naturalGas, unit: "/m³" },
                    { label: "Water & Sewer", icon: Droplets, monthly: compareData.water, rate: null, unit: "" },
                    { label: "Internet", icon: Wifi, monthly: compareData.internet, rate: null, unit: "" }
                  ].map(({ label, icon: Icon, monthly, rate, unit }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-sm font-medium">
                          <Icon className="h-4 w-4 mr-2 text-secondary" />
                          {label}
                        </span>
                        <div className="text-right">
                          <div className="font-semibold">${monthly}</div>
                          {rate && <div className="text-xs text-muted-foreground">${rate.toFixed(4)}{unit}</div>}
                        </div>
                      </div>
                      <Progress value={(monthly / 250) * 100} className="h-2" />
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Monthly</span>
                      <span className="text-xl font-bold text-secondary">${compareData.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">${Math.abs(savings.monthly).toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Monthly Difference</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">${Math.abs(savings.annual).toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Annual Difference</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-canada-red">{Math.abs(savings.percentage).toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Cost Difference</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Provincial Overview */}
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle>National Utility Cost Overview</CardTitle>
          <CardDescription>
            Ranking of provinces by total monthly utility costs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {Object.entries(provincialUtilityCosts)
              .sort(([,a], [,b]) => a.total - b.total)
              .map(([code, data], index) => (
                <div key={code} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <span className="font-medium">{data.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getCostLevel(data.total).color as "secondary" | "outline" | "destructive"}>
                      {getCostLevel(data.total).level}
                    </Badge>
                    <span className="font-semibold text-lg">${data.total}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>

      {(!selectedProvince || !compareProvince) && (
        <Card className="text-center p-12 shadow-card-custom">
          <CardContent>
            <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardDescription>
              Select two provinces above to compare utility costs and find potential savings
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};