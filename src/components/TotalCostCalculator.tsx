import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PieChart, Calculator, DollarSign, Users, Home, Car, ShoppingCart, Gamepad2, Heart, CheckCircle, AlertTriangle } from "lucide-react";

const cityData = {
  "vancouver": { name: "Vancouver, BC", costMultiplier: 1.25 },
  "toronto": { name: "Toronto, ON", costMultiplier: 1.18 },
  "calgary": { name: "Calgary, AB", costMultiplier: 1.02 },
  "montreal": { name: "Montreal, QC", costMultiplier: 0.96 },
  "ottawa": { name: "Ottawa, ON", costMultiplier: 1.08 },
  "halifax": { name: "Halifax, NS", costMultiplier: 0.98 },
  "winnipeg": { name: "Winnipeg, MB", costMultiplier: 0.92 },
  "saskatoon": { name: "Saskatoon, SK", costMultiplier: 0.88 }
};

const baseCosts = {
  housing: { budget: 1200, moderate: 1800, comfortable: 2500 },
  food: { budget: 400, moderate: 600, comfortable: 900 },
  transportation: { budget: 150, moderate: 250, comfortable: 400 },
  entertainment: { budget: 100, moderate: 200, comfortable: 350 },
  healthcare: { budget: 80, moderate: 120, comfortable: 200 },
  utilities: { budget: 120, moderate: 180, comfortable: 250 },
  clothing: { budget: 50, moderate: 100, comfortable: 200 },
  personal: { budget: 80, moderate: 150, comfortable: 300 },
  savings: { budget: 200, moderate: 400, comfortable: 800 }
};

const householdMultipliers = {
  1: { name: "Single Person", multiplier: 1.0 },
  2: { name: "Couple", multiplier: 1.6 },
  3: { name: "Small Family (3)", multiplier: 2.1 },
  4: { name: "Family (4)", multiplier: 2.5 },
  5: { name: "Large Family (5+)", multiplier: 3.0 }
};

export const TotalCostCalculator = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [householdSize, setHouseholdSize] = useState<string>("");
  const [lifestyleLevel, setLifestyleLevel] = useState<string>("");

  const calculateTotalCosts = () => {
    if (!selectedCity || !householdSize || !lifestyleLevel) return null;

    const city = cityData[selectedCity as keyof typeof cityData];
    const household = householdMultipliers[parseInt(householdSize) as keyof typeof householdMultipliers];
    const level = lifestyleLevel as keyof typeof baseCosts.housing;

    const categories = Object.entries(baseCosts).map(([category, costs]) => {
      const baseCost = costs[level];
      const adjustedCost = Math.round(baseCost * city.costMultiplier * household.multiplier);
      return {
        name: category,
        cost: adjustedCost,
        percentage: 0 // Will calculate after total
      };
    });

    const totalMonthlyCost = categories.reduce((sum, cat) => sum + cat.cost, 0);
    const totalAnnualCost = totalMonthlyCost * 12;

    // Calculate percentages
    categories.forEach(cat => {
      cat.percentage = (cat.cost / totalMonthlyCost) * 100;
    });

    // Required income (assuming 70% take-home rate)
    const requiredGrossIncome = Math.round(totalAnnualCost / 0.70);

    return {
      city: city.name,
      household: household.name,
      level: lifestyleLevel,
      categories,
      totalMonthlyCost,
      totalAnnualCost,
      requiredGrossIncome
    };
  };

  const costData = calculateTotalCosts();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'housing': return Home;
      case 'food': return ShoppingCart;
      case 'transportation': return Car;
      case 'entertainment': return Gamepad2;
      case 'healthcare': return Heart;
      case 'utilities': return DollarSign;
      case 'clothing': return Users;
      case 'personal': return Users;
      case 'savings': return Calculator;
      default: return DollarSign;
    }
  };

  const getLifestyleDescription = (level: string) => {
    switch (level) {
      case 'budget': return { 
        desc: "Essential needs covered with careful spending", 
        color: "secondary",
        examples: "Shared housing, home cooking, public transit, limited entertainment"
      };
      case 'moderate': return { 
        desc: "Comfortable living with some luxuries", 
        color: "outline",
        examples: "Own apartment/condo, dining out occasionally, owning a car, regular entertainment"
      };
      case 'comfortable': return { 
        desc: "Higher quality lifestyle with financial flexibility", 
        color: "destructive",
        examples: "Premium housing, frequent dining/entertainment, luxury purchases, significant savings"
      };
      default: return { desc: "", color: "outline", examples: "" };
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Total Cost of Living Calculator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get a comprehensive breakdown of living costs including housing, food, transport, entertainment, and healthcare for your lifestyle
        </p>
      </div>

      {/* Input Form */}
      <Card className="shadow-card-custom">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Living Situation Details
          </CardTitle>
          <CardDescription className="text-primary-foreground/90">
            Tell us about your living situation for a personalized cost breakdown
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(cityData).map(([key, data]) => (
                    <SelectItem key={key} value={key}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="household">Household Size</Label>
              <Select value={householdSize} onValueChange={setHouseholdSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select household size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(householdMultipliers).map(([size, data]) => (
                    <SelectItem key={size} value={size}>
                      {data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lifestyle">Lifestyle Level</Label>
              <Select value={lifestyleLevel} onValueChange={setLifestyleLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select lifestyle level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget - Essential needs</SelectItem>
                  <SelectItem value="moderate">Moderate - Comfortable living</SelectItem>
                  <SelectItem value="comfortable">Comfortable - Higher quality</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {lifestyleLevel && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={getLifestyleDescription(lifestyleLevel).color as "secondary" | "outline" | "destructive"}>
                  {lifestyleLevel.charAt(0).toUpperCase() + lifestyleLevel.slice(1)}
                </Badge>
                <span className="font-medium">{getLifestyleDescription(lifestyleLevel).desc}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {getLifestyleDescription(lifestyleLevel).examples}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {costData && (
        <div className="space-y-6">
          {/* Key Insight */}
          <Card className="shadow-elegant border-primary/20">
            <CardHeader className="bg-gradient-hero text-primary-foreground text-center">
              <CardTitle className="text-2xl">💡 Key Insight</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
                <h3 className="text-xl font-bold">
                  You need ${costData.requiredGrossIncome.toLocaleString()} annual income for {costData.level} living in {costData.city}
                </h3>
                <p className="text-muted-foreground">
                  Total monthly expenses: ${costData.totalMonthlyCost.toLocaleString()} • Annual: ${costData.totalAnnualCost.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Categories */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Monthly Cost Breakdown
                </CardTitle>
                <CardDescription>
                  Detailed breakdown for {costData.household} in {costData.city}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {costData.categories.map((category) => {
                  const Icon = getCategoryIcon(category.name);
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center text-sm font-medium capitalize">
                          <Icon className="h-4 w-4 mr-2 text-primary" />
                          {category.name}
                        </span>
                        <div className="text-right">
                          <div className="font-semibold">${category.cost.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{category.percentage.toFixed(1)}%</div>
                        </div>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Income Analysis */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-secondary" />
                  Income Requirements
                </CardTitle>
                <CardDescription>
                  Salary needed for your chosen lifestyle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-secondary text-secondary-foreground rounded-lg">
                  <div className="text-3xl font-bold mb-2">
                    ${costData.requiredGrossIncome.toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90">Required Annual Gross Income</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Monthly Take-Home Pay</span>
                    <span className="font-semibold">${Math.round(costData.requiredGrossIncome * 0.70 / 12).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Monthly Living Costs</span>
                    <span className="font-semibold">${costData.totalMonthlyCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span>Monthly Buffer</span>
                    <span className="font-semibold text-green-600">
                      ${Math.round((costData.requiredGrossIncome * 0.70 / 12) - costData.totalMonthlyCost).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Income Breakdown</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Gross Income:</span>
                      <span>${costData.requiredGrossIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Taxes (~30%):</span>
                      <span>-${Math.round(costData.requiredGrossIncome * 0.30).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Take-Home:</span>
                      <span>${Math.round(costData.requiredGrossIncome * 0.70).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lifestyle Comparison */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Lifestyle Level Comparison</CardTitle>
              <CardDescription>
                See how your costs change with different lifestyle levels in {costData.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(["budget", "moderate", "comfortable"] as const).map((level) => {
                  const levelData = calculateTotalCosts();
                  if (!levelData) return null;
                  
                  // Recalculate for this level
                  const city = cityData[selectedCity as keyof typeof cityData];
                  const household = householdMultipliers[parseInt(householdSize) as keyof typeof householdMultipliers];
                  const monthlyTotal = Object.values(baseCosts).reduce((sum, costs) => 
                    sum + Math.round(costs[level] * city.costMultiplier * household.multiplier), 0
                  );
                  const annualTotal = monthlyTotal * 12;
                  const requiredIncome = Math.round(annualTotal / 0.70);
                  
                  const isCurrentLevel = level === lifestyleLevel;
                  const desc = getLifestyleDescription(level);
                  
                  return (
                    <div key={level} className={`p-4 rounded-lg border-2 ${isCurrentLevel ? 'border-primary bg-primary/5' : 'border-muted'}`}>
                      <div className="text-center">
                        <Badge variant={desc.color as "secondary" | "outline" | "destructive"} className="mb-3">
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </Badge>
                        {isCurrentLevel && (
                          <Badge variant="default" className="ml-2 mb-3">Current</Badge>
                        )}
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">${requiredIncome.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Required Annual Income</div>
                          <div className="text-lg font-semibold text-primary">${monthlyTotal.toLocaleString()}/month</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(!selectedCity || !householdSize || !lifestyleLevel) && (
        <Card className="text-center p-12 shadow-card-custom">
          <CardContent>
            <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardDescription>
              Complete all fields above to get your comprehensive cost of living analysis
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};