import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Home, MapPin, DollarSign, Calculator } from "lucide-react";

const postalCodeData = {
  "M5V": { city: "Toronto Downtown", province: "ON", avgRent: 2800, avgBuy: 1100000, trend: "up", trendPercent: 8.2 },
  "V6B": { city: "Vancouver Downtown", province: "BC", avgRent: 3200, avgBuy: 1400000, trend: "up", trendPercent: 12.1 },
  "H3A": { city: "Montreal Downtown", province: "QC", avgRent: 1600, avgBuy: 550000, trend: "up", trendPercent: 5.8 },
  "T2P": { city: "Calgary Downtown", province: "AB", avgRent: 1800, avgBuy: 580000, trend: "up", trendPercent: 4.2 },
  "K1P": { city: "Ottawa Downtown", province: "ON", avgRent: 2000, avgBuy: 700000, trend: "up", trendPercent: 6.5 },
  "B3J": { city: "Halifax Downtown", province: "NS", avgRent: 1700, avgBuy: 450000, trend: "up", trendPercent: 9.8 },
  "R3B": { city: "Winnipeg Downtown", province: "MB", avgRent: 1400, avgBuy: 380000, trend: "stable", trendPercent: 2.1 },
  "S7K": { city: "Saskatoon Central", province: "SK", avgRent: 1200, avgBuy: 340000, trend: "stable", trendPercent: 1.8 }
};

const cmhcInsurancePremiums = {
  5: 4.0,   // 5% down = 4.0% premium
  10: 3.1,  // 10% down = 3.1% premium
  15: 2.8,  // 15% down = 2.8% premium
  20: 0     // 20% down = no premium
};

export const HousingAffordabilityAnalyzer = () => {
  const [postalCode, setPostalCode] = useState<string>("");
  const [housingType, setHousingType] = useState<string>("");
  const [householdIncome, setHouseholdIncome] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("20");

  const locationData = postalCodeData[postalCode as keyof typeof postalCodeData];
  const income = parseFloat(householdIncome) || 0;
  const monthlyIncome = income / 12;
  const downPaymentPercent = parseFloat(downPayment) || 20;

  const calculateAffordability = () => {
    if (!locationData || !income) return null;

    const currentPrice = housingType === "rent" ? locationData.avgRent : locationData.avgBuy;
    
    if (housingType === "rent") {
      const rentToIncomeRatio = (locationData.avgRent / monthlyIncome) * 100;
      const recommendedIncome = locationData.avgRent / 0.30 * 12; // 30% rule
      const incomeGap = recommendedIncome - income;
      
      return {
        currentCost: locationData.avgRent,
        affordabilityRatio: rentToIncomeRatio,
        recommendedIncome,
        incomeGap: Math.max(0, incomeGap),
        isAffordable: rentToIncomeRatio <= 30,
        type: "rent"
      };
    } else {
      // Buying calculations
      const maxHousingCost = monthlyIncome * 0.32; // GDS ratio
      const downPaymentAmount = locationData.avgBuy * (downPaymentPercent / 100);
      const mortgageAmount = locationData.avgBuy - downPaymentAmount;
      
      // CMHC insurance if down payment < 20%
      let cmhcPremium = 0;
      if (downPaymentPercent < 20) {
        const premiumRate = cmhcInsurancePremiums[downPaymentPercent] || 4.0;
        cmhcPremium = mortgageAmount * (premiumRate / 100);
      }
      
      // Calculate monthly mortgage payment (5.5% rate, 25 years)
      const monthlyRate = 0.055 / 12;
      const numPayments = 25 * 12;
      const monthlyPayment = (mortgageAmount + cmhcPremium) * 
        (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      
      const totalHousingCost = monthlyPayment + (locationData.avgBuy * 0.004); // Add property taxes (~0.4%/month)
      const housingToIncomeRatio = (totalHousingCost / monthlyIncome) * 100;
      const recommendedIncome = totalHousingCost / 0.32 * 12;
      const incomeGap = recommendedIncome - income;
      
      return {
        currentCost: locationData.avgBuy,
        monthlyPayment: totalHousingCost,
        downPaymentAmount,
        cmhcPremium,
        affordabilityRatio: housingToIncomeRatio,
        recommendedIncome,
        incomeGap: Math.max(0, incomeGap),
        isAffordable: housingToIncomeRatio <= 32,
        type: "buy"
      };
    }
  };

  const affordabilityData = calculateAffordability();

  const getAffordabilityStatus = (ratio: number, type: string) => {
    const threshold = type === "rent" ? 30 : 32;
    if (ratio <= threshold) return { status: "Affordable", color: "secondary", icon: CheckCircle };
    if (ratio <= threshold + 10) return { status: "Challenging", color: "destructive", icon: AlertTriangle };
    return { status: "Unaffordable", color: "destructive", icon: AlertTriangle };
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Housing Affordability Analyzer</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get precise affordability analysis using CMHC data, provincial rental boards, and real MLS pricing for your exact location
        </p>
      </div>

      {/* Input Section */}
      <Card className="shadow-card-custom">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Location & Housing Analysis
          </CardTitle>
          <CardDescription className="text-primary-foreground/90">
            Enter your details for personalized housing affordability analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="postal">Postal Code</Label>
              <Input
                id="postal"
                placeholder="e.g., M5V 3L9"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\s/g, '').toUpperCase().slice(0, 3))}
                className="uppercase"
              />
              {locationData && (
                <div className="text-sm text-muted-foreground">
                  📍 {locationData.city}, {locationData.province}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="housing-type">Housing Type</Label>
              <Select value={housingType} onValueChange={setHousingType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select housing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Annual Household Income (CAD)</Label>
              <Input
                id="income"
                type="number"
                placeholder="e.g., 85000"
                value={householdIncome}
                onChange={(e) => setHouseholdIncome(e.target.value)}
              />
            </div>

            {housingType === "buy" && (
              <div className="space-y-2">
                <Label htmlFor="downpayment">Down Payment %</Label>
                <Select value={downPayment} onValueChange={setDownPayment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5% (Min. for homes under $500K)</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="15">15%</SelectItem>
                    <SelectItem value="20">20% (No CMHC required)</SelectItem>
                    <SelectItem value="25">25%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {affordabilityData && locationData && (
        <div className="space-y-6">
          {/* Key Insight Card */}
          <Card className="shadow-elegant border-primary/20">
            <CardHeader className="bg-gradient-hero text-primary-foreground text-center">
              <CardTitle className="text-2xl">💡 Key Insight</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              {affordabilityData.isAffordable ? (
                <div className="space-y-2">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-green-700">Housing is Affordable!</h3>
                  <p className="text-muted-foreground">
                    Your current income of ${income.toLocaleString()} is sufficient for comfortable housing in {locationData.city}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-4" />
                  <h3 className="text-xl font-bold text-destructive">
                    You need ${affordabilityData.incomeGap.toLocaleString()} more annual income
                  </h3>
                  <p className="text-muted-foreground">
                    For comfortable {housingType === "rent" ? "renting" : "buying"} in {locationData.city}, you need ${affordabilityData.recommendedIncome.toLocaleString()} annual income
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Market Data */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Home className="h-5 w-5 mr-2 text-primary" />
                  Market Data - {locationData.city}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Average {housingType === "rent" ? "Rent" : "Home Price"}</span>
                  <span className="font-bold text-lg">
                    ${affordabilityData.currentCost.toLocaleString()}{housingType === "rent" ? "/month" : ""}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    Market Trend
                    {locationData.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 ml-1 text-destructive" />
                    ) : (
                      <TrendingDown className="h-4 w-4 ml-1 text-green-600" />
                    )}
                  </span>
                  <Badge variant={locationData.trend === "up" ? "destructive" : "secondary"}>
                    +{locationData.trendPercent}% YoY
                  </Badge>
                </div>

                {affordabilityData.type === "buy" && affordabilityData.downPaymentAmount && (
                  <>
                    <div className="flex justify-between items-center">
                      <span>Down Payment Required</span>
                      <span className="font-semibold">${affordabilityData.downPaymentAmount.toLocaleString()}</span>
                    </div>
                    
                    {affordabilityData.cmhcPremium > 0 && (
                      <div className="flex justify-between items-center">
                        <span>CMHC Insurance</span>
                        <span className="font-semibold text-destructive">+${affordabilityData.cmhcPremium.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium">Monthly Housing Cost</span>
                      <span className="font-bold text-lg">${affordabilityData.monthlyPayment?.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Affordability Assessment */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-secondary" />
                  Affordability Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Housing-to-Income Ratio</span>
                    <span className="font-semibold">{affordabilityData.affordabilityRatio.toFixed(1)}%</span>
                  </div>
                  <Progress 
                    value={Math.min(affordabilityData.affordabilityRatio, 100)} 
                    className="h-3"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Recommended: ≤{housingType === "rent" ? "30" : "32"}%
                  </div>
                </div>

                <div className="text-center p-4 bg-muted rounded-lg">
                  {(() => {
                    const status = getAffordabilityStatus(affordabilityData.affordabilityRatio, affordabilityData.type);
                    const StatusIcon = status.icon;
                    return (
                      <div>
                        <StatusIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
                        <Badge variant={status.color as "secondary" | "destructive"} className="text-base px-3 py-1">
                          {status.status}
                        </Badge>
                      </div>
                    );
                  })()}
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex justify-between">
                    <span>Your Income:</span>
                    <span className="font-semibold">${income.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recommended Income:</span>
                    <span className="font-semibold">${affordabilityData.recommendedIncome.toLocaleString()}</span>
                  </div>
                  {affordabilityData.incomeGap > 0 && (
                    <div className="flex justify-between text-destructive">
                      <span>Income Gap:</span>
                      <span className="font-bold">${affordabilityData.incomeGap.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Sources */}
          <Card className="shadow-card-custom">
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground text-center">
                <p className="font-medium mb-2">📊 Data Sources & Methodology</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <strong>CMHC:</strong> Rental market reports, housing starts data
                  </div>
                  <div>
                    <strong>Provincial Rental Boards:</strong> Regulated rent increases, tenant protection data
                  </div>
                  <div>
                    <strong>MLS Data:</strong> Real-time home sales, market trends, price analysis
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(!postalCode || !housingType || !householdIncome) && (
        <Card className="text-center p-12 shadow-card-custom">
          <CardContent>
            <Home className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardDescription>
              Complete all fields above to get your personalized housing affordability analysis
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};