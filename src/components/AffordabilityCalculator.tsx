import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, DollarSign, Home, PieChart, AlertTriangle, CheckCircle } from "lucide-react";
import PDFExportButton from "./PDFExportButton";

const canadianCities = [
  { name: "Vancouver, BC", avgRent: 2800, avgHome: 1200000 },
  { name: "Toronto, ON", avgRent: 2400, avgHome: 950000 },
  { name: "Calgary, AB", avgRent: 1600, avgHome: 520000 },
  { name: "Montreal, QC", avgRent: 1400, avgHome: 480000 },
  { name: "Ottawa, ON", avgRent: 1800, avgHome: 650000 },
  { name: "Halifax, NS", avgRent: 1500, avgHome: 420000 },
  { name: "Winnipeg, MB", avgRent: 1200, avgHome: 350000 },
  { name: "Saskatoon, SK", avgRent: 1100, avgHome: 320000 }
];

export const AffordabilityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>("20");
  const [monthlyDebts, setMonthlyDebts] = useState<string>("");

  const cityData = canadianCities.find(c => c.name === selectedCity);
  const income = parseFloat(annualIncome) || 0;
  const monthlyIncome = income / 12;
  const debts = parseFloat(monthlyDebts) || 0;
  const downPaymentPercent = parseFloat(downPayment) || 20;

  // Canadian mortgage calculations (approximately 5.5% interest rate)
  const calculateAffordability = () => {
    if (!cityData || !income) return null;

    // Gross Debt Service Ratio (GDS) - housing should not exceed 32% of gross income
    const maxHousingCost = monthlyIncome * 0.32;
    
    // Total Debt Service Ratio (TDS) - total debt should not exceed 40% of gross income
    const maxTotalDebtService = monthlyIncome * 0.40;
    const availableForHousing = maxTotalDebtService - debts;
    
    // Use the lower of GDS and available TDS
    const affordableHousingCost = Math.min(maxHousingCost, availableForHousing);
    
    // Calculate maximum mortgage (assuming 5.5% rate, 25-year amortization)
    const monthlyRate = 0.055 / 12;
    const numPayments = 25 * 12;
    const maxMortgage = (affordableHousingCost * 0.8) * // 80% for mortgage payment, 20% for taxes/insurance
      ((Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments)));
    
    const requiredDownPayment = cityData.avgHome * (downPaymentPercent / 100);
    const maxHomePrice = maxMortgage + requiredDownPayment;
    
    return {
      maxHousingCost: affordableHousingCost,
      maxMortgage,
      maxHomePrice,
      requiredDownPayment,
      rentAffordability: (cityData.avgRent / monthlyIncome) * 100,
      buyAffordability: cityData.avgHome <= maxHomePrice,
      monthlyMortgagePayment: (maxMortgage * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1)
    };
  };

  const affordabilityData = calculateAffordability();

  const getAffordabilityStatus = (percentage: number) => {
    if (percentage <= 30) return { status: "Excellent", color: "secondary", icon: CheckCircle };
    if (percentage <= 40) return { status: "Good", color: "secondary", icon: CheckCircle };
    if (percentage <= 50) return { status: "Challenging", color: "destructive", icon: AlertTriangle };
    return { status: "Unaffordable", color: "destructive", icon: AlertTriangle };
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Housing Affordability Calculator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate your housing affordability based on Canadian lending standards and regional market conditions
        </p>
      </div>

      {/* Input Form */}
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2 text-primary" />
            Your Financial Information
          </CardTitle>
          <CardDescription>
            Enter your details to calculate housing affordability in Canadian cities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="income">Annual Gross Income (CAD)</Label>
              <Input
                id="income"
                type="number"
                placeholder="e.g., 75000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Canadian city" />
                </SelectTrigger>
                <SelectContent>
                  {canadianCities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="debts">Monthly Debt Payments (CAD)</Label>
              <Input
                id="debts"
                type="number"
                placeholder="e.g., 500"
                value={monthlyDebts}
                onChange={(e) => setMonthlyDebts(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="downpayment">Down Payment %</Label>
              <Select value={downPayment} onValueChange={setDownPayment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5% (Minimum)</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="15">15%</SelectItem>
                  <SelectItem value="20">20% (No CMHC)</SelectItem>
                  <SelectItem value="25">25%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {affordabilityData && cityData && (
        <div className="space-y-6" id="affordability-results">
          {/* Export Button */}
          <div className="flex justify-end">
            <PDFExportButton
              calculationType="housing"
              calculationName="Housing Affordability Analysis"
              parameters={{
                'Annual Income': `$${income.toLocaleString()}`,
                'Selected City': selectedCity,
                'Down Payment': `${downPaymentPercent}%`,
                'Monthly Debts': `$${debts.toLocaleString()}`
              }}
              results={{
                'Rent Affordability': `${affordabilityData.rentAffordability.toFixed(1)}% of income`,
                'Max Affordable Rent': `$${affordabilityData.maxAffordableRent.toLocaleString()}/month`,
                'Max Purchase Price': `$${affordabilityData.maxPurchasePrice.toLocaleString()}`,
                'Required Down Payment': `$${affordabilityData.requiredDownPayment.toLocaleString()}`,
                'Monthly Mortgage Payment': `$${affordabilityData.monthlyMortgagePayment.toLocaleString()}`,
                'Purchase Affordability': `${affordabilityData.purchaseAffordability.toFixed(1)}% of income`
              }}
              variant="outline"
              className="mb-4"
            >
              Export Analysis
            </PDFExportButton>
          </div>
          
          {/* Rent Affordability */}
          <Card className="shadow-elegant">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Rental Affordability in {selectedCity}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">
                    ${cityData.avgRent.toLocaleString()}/month
                  </div>
                  <div className="text-muted-foreground mb-4">Average Rent</div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Percentage of Income</span>
                      <span className="font-semibold">{affordabilityData.rentAffordability.toFixed(1)}%</span>
                    </div>
                    <Progress value={Math.min(affordabilityData.rentAffordability, 100)} className="h-3" />
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  {(() => {
                    const status = getAffordabilityStatus(affordabilityData.rentAffordability);
                    const StatusIcon = status.icon;
                    return (
                      <div className="text-center">
                        <StatusIcon className="h-12 w-12 mx-auto mb-3 text-primary" />
                        <Badge variant={status.color as "secondary" | "destructive"} className="text-lg px-4 py-2">
                          {status.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-2">
                          Recommended: ≤30% of income
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Home Purchase Affordability */}
          <Card className="shadow-elegant">
            <CardHeader className="bg-gradient-secondary text-secondary-foreground">
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Home Purchase Affordability
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-primary mb-1">
                      ${affordabilityData.maxHomePrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Maximum Home Price</div>
                  </div>
                  
                  <div>
                    <div className="text-xl font-semibold mb-1">
                      ${affordabilityData.requiredDownPayment.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Required Down Payment ({downPayment}%)</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xl font-semibold mb-1">
                      ${affordabilityData.maxHousingCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Max Monthly Housing Cost</div>
                  </div>
                  
                  <div>
                    <div className="text-xl font-semibold mb-1">
                      ${affordabilityData.monthlyMortgagePayment.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Est. Monthly Mortgage Payment</div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  {affordabilityData.buyAffordability ? (
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-600" />
                      <Badge variant="secondary" className="text-lg px-4 py-2">
                        Can Afford
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-2">
                        Average home: ${cityData.avgHome.toLocaleString()}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <AlertTriangle className="h-12 w-12 mx-auto mb-3 text-destructive" />
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        Cannot Afford
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-2">
                        Average home: ${cityData.avgHome.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Insights */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-3 flex items-center">
                  <PieChart className="h-4 w-4 mr-2" />
                  Canadian Mortgage Guidelines
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Gross Debt Service (GDS):</strong> Housing costs should not exceed 32% of gross income
                  </div>
                  <div>
                    <strong>Total Debt Service (TDS):</strong> All debt payments should not exceed 40% of gross income
                  </div>
                  <div>
                    <strong>Minimum Down Payment:</strong> 5% (homes under $500K), 10% (portion over $500K)
                  </div>
                  <div>
                    <strong>CMHC Insurance:</strong> Required for down payments under 20%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(!annualIncome || !selectedCity) && (
        <Card className="text-center p-12 shadow-card-custom">
          <CardContent>
            <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardDescription>
              Enter your income and select a city to calculate housing affordability
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};