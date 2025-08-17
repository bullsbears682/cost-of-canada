import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calculator, TrendingUp, Target, DollarSign, Users, Briefcase, CheckCircle, AlertTriangle } from "lucide-react";

import { StatisticsCanadaAPI } from "@/services/StatisticsCanadaAPI";

const canadianCities = [
  { name: "Vancouver, BC", costMultiplier: 1.45, jobMarket: "strong", avgSalary: 75000 },
  { name: "Toronto, ON", costMultiplier: 1.35, jobMarket: "excellent", avgSalary: 78000 },
  { name: "Calgary, AB", costMultiplier: 1.10, jobMarket: "good", avgSalary: 82000 },
  { name: "Montreal, QC", costMultiplier: 1.00, jobMarket: "good", avgSalary: 65000 },
  { name: "Ottawa, ON", costMultiplier: 1.15, jobMarket: "excellent", avgSalary: 85000 },
  { name: "Halifax, NS", costMultiplier: 0.95, jobMarket: "moderate", avgSalary: 58000 },
  { name: "Winnipeg, MB", costMultiplier: 0.88, jobMarket: "moderate", avgSalary: 62000 },
  { name: "Saskatoon, SK", costMultiplier: 0.85, jobMarket: "moderate", avgSalary: 68000 }
];

const careerFields = [
  { name: "Technology", salaryMultiplier: 1.3, growth: "high", demand: "excellent" },
  { name: "Healthcare", salaryMultiplier: 1.1, growth: "high", demand: "excellent" },
  { name: "Finance", salaryMultiplier: 1.25, growth: "moderate", demand: "good" },
  { name: "Engineering", salaryMultiplier: 1.2, growth: "moderate", demand: "good" },
  { name: "Education", salaryMultiplier: 0.9, growth: "low", demand: "moderate" },
  { name: "Government", salaryMultiplier: 1.0, growth: "low", demand: "good" },
  { name: "Sales & Marketing", salaryMultiplier: 1.1, growth: "moderate", demand: "good" },
  { name: "Trades", salaryMultiplier: 1.15, growth: "high", demand: "excellent" },
  { name: "Retail & Service", salaryMultiplier: 0.7, growth: "low", demand: "moderate" },
  { name: "Other", salaryMultiplier: 1.0, growth: "moderate", demand: "moderate" }
];

export const SalaryRequirementsCalculator = () => {
  const [targetCity, setTargetCity] = useState<string>("");
  const [currentSalary, setCurrentSalary] = useState<string>("");
  const [familySize, setFamilySize] = useState<string>("");
  const [careerField, setCareerField] = useState<string>("");
  const [savingsGoal, setSavingsGoal] = useState<string>("10");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateRequirements = async () => {
    if (!targetCity || !currentSalary || !familySize || !careerField) return;

    setLoading(true);
    
    const city = canadianCities.find(c => c.name === targetCity);
    const career = careerFields.find(c => c.name === careerField);
    const salary = parseFloat(currentSalary);
    const family = parseInt(familySize);
    const savingsPercent = parseFloat(savingsGoal);

    if (!city || !career) return;

    // Base living costs calculation
    const baseMonthlyCost = 3500; // Base for single person
    const familyMultiplier = Math.sqrt(family); // Economy of scale
    const monthlyCost = baseMonthlyCost * city.costMultiplier * familyMultiplier;
    const annualCost = monthlyCost * 12;

    // Add savings goal
    const savingsAmount = annualCost * (savingsPercent / 100);
    const totalRequiredNet = annualCost + savingsAmount;
    
    // Convert to gross salary (assuming 30% tax rate)
    const requiredGrossSalary = totalRequiredNet / 0.70;
    
    // Calculate market salary for the field in that city
    const marketSalary = city.avgSalary * career.salaryMultiplier;
    
    // Calculate gaps and recommendations
    const currentGap = requiredGrossSalary - salary;
    const marketGap = requiredGrossSalary - marketSalary;
    
    const salaryIncrease = ((requiredGrossSalary - salary) / salary) * 100;
    
    // Get realistic timeline based on career field
    const getTimeline = (increasePercent: number, growth: string) => {
      if (increasePercent <= 10) return "6-12 months";
      if (increasePercent <= 25) return growth === "high" ? "1-2 years" : "2-3 years";
      if (increasePercent <= 50) return growth === "high" ? "2-3 years" : "3-5 years";
      return growth === "high" ? "3-5 years" : "5+ years";
    };

    setResults({
      city: city.name,
      career: career.name,
      currentSalary: salary,
      requiredSalary: Math.round(requiredGrossSalary),
      marketSalary: Math.round(marketSalary),
      monthlyCost: Math.round(monthlyCost),
      annualCost: Math.round(annualCost),
      savingsAmount: Math.round(savingsAmount),
      currentGap: Math.round(currentGap),
      marketGap: Math.round(marketGap),
      salaryIncrease: salaryIncrease,
      timeline: getTimeline(Math.abs(salaryIncrease), career.growth),
      isAffordable: salary >= requiredGrossSalary,
      marketCompatible: marketSalary >= requiredGrossSalary,
      careerGrowth: career.growth,
      demandLevel: career.demand,
      jobMarket: city.jobMarket
    });

    setLoading(false);
  };

  useEffect(() => {
    if (targetCity && currentSalary && familySize && careerField) {
      calculateRequirements();
    }
  }, [targetCity, currentSalary, familySize, careerField, savingsGoal]);

  const getStatusColor = (isGood: boolean) => isGood ? "secondary" : "destructive";
  const getGrowthColor = (growth: string) => {
    switch (growth) {
      case "high": return "secondary";
      case "moderate": return "outline";
      default: return "destructive";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Salary Requirements Calculator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate exactly what salary you need to live comfortably in your target Canadian city based on your career field and family situation
        </p>
      </div>

      {/* Input Form */}
      <Card className="shadow-card-custom animate-scale-in">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            Your Career & Target Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="target-city">Target City</Label>
              <Select value={targetCity} onValueChange={setTargetCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target city" />
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
              <Label htmlFor="current-salary">Current Annual Salary (CAD)</Label>
              <Input
                id="current-salary"
                type="number"
                placeholder="e.g., 65000"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="family-size">Family Size</Label>
              <Select value={familySize} onValueChange={setFamilySize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select family size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Single Person</SelectItem>
                  <SelectItem value="2">Couple</SelectItem>
                  <SelectItem value="3">Family of 3</SelectItem>
                  <SelectItem value="4">Family of 4</SelectItem>
                  <SelectItem value="5">Family of 5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="career-field">Career Field</Label>
              <Select value={careerField} onValueChange={setCareerField}>
                <SelectTrigger>
                  <SelectValue placeholder="Select career field" />
                </SelectTrigger>
                <SelectContent>
                  {careerFields.map((field) => (
                    <SelectItem key={field.name} value={field.name}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="savings-goal">Savings Goal (% of expenses)</Label>
              <Select value={savingsGoal} onValueChange={setSavingsGoal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5% - Minimal savings</SelectItem>
                  <SelectItem value="10">10% - Basic emergency fund</SelectItem>
                  <SelectItem value="15">15% - Comfortable savings</SelectItem>
                  <SelectItem value="20">20% - Aggressive savings</SelectItem>
                  <SelectItem value="25">25% - Maximum savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="space-y-6 animate-fade-in">
          {/* Key Insight */}
          <Card className="shadow-elegant border-primary/20">
            <CardHeader className="bg-gradient-hero text-primary-foreground text-center">
              <CardTitle className="text-2xl">💡 Key Insight</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              {results.isAffordable ? (
                <div className="space-y-2">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-green-700">
                    You can afford to live in {results.city}!
                  </h3>
                  <p className="text-muted-foreground">
                    Your current salary of ${results.currentSalary.toLocaleString()} meets the required ${results.requiredSalary.toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-4" />
                  <h3 className="text-xl font-bold text-destructive">
                    You need a ${Math.abs(results.currentGap).toLocaleString()} salary increase ({Math.abs(results.salaryIncrease).toFixed(1)}%)
                  </h3>
                  <p className="text-muted-foreground">
                    To live comfortably in {results.city} with your family size and savings goals
                  </p>
                  <div className="mt-4">
                    <Badge variant="outline" className="text-base px-4 py-2">
                      Estimated Timeline: {results.timeline}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Salary Analysis */}
            <Card className="shadow-card-custom animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-primary" />
                  Salary Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Your Current Salary</span>
                    <span className="font-semibold">${results.currentSalary.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Required Salary</span>
                    <span className="font-semibold text-primary">${results.requiredSalary.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Market Rate ({results.career})</span>
                    <span className="font-semibold">${results.marketSalary.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Salary Gap</span>
                      <div className="text-right">
                        <span className={`font-bold ${results.currentGap > 0 ? 'text-destructive' : 'text-green-600'}`}>
                          {results.currentGap > 0 ? '+' : ''}${results.currentGap.toLocaleString()}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {Math.abs(results.salaryIncrease).toFixed(1)}% {results.salaryIncrease > 0 ? 'increase needed' : 'above requirement'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Goal</span>
                    <span>{Math.max(0, Math.min(100, (results.currentSalary / results.requiredSalary) * 100)).toFixed(0)}%</span>
                  </div>
                  <Progress value={Math.max(0, Math.min(100, (results.currentSalary / results.requiredSalary) * 100))} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Card className="shadow-card-custom animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-secondary" />
                  Living Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Monthly Living Costs</span>
                    <span className="font-semibold">${results.monthlyCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Annual Living Costs</span>
                    <span className="font-semibold">${results.annualCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Annual Savings Goal</span>
                    <span className="font-semibold text-green-600">${results.savingsAmount.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Annual Need</span>
                      <span className="font-bold text-lg">${(results.annualCost + results.savingsAmount).toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      After-tax income required
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="text-sm">
                    <div className="font-semibold mb-1">Cost Factors:</div>
                    <div className="space-y-1 text-xs">
                      <div>• City cost multiplier: {((canadianCities.find(c => c.name === results.city)?.costMultiplier || 1) * 100).toFixed(0)}%</div>
                      <div>• Family size: {familySize} {parseInt(familySize) === 1 ? 'person' : 'people'}</div>
                      <div>• Savings rate: {savingsGoal}% of expenses</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Career Market Analysis */}
          <Card className="shadow-elegant animate-fade-in">
            <CardHeader className="bg-gradient-secondary text-secondary-foreground">
              <CardTitle className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Career Market Analysis - {results.city}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mb-3">
                    <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                    <Badge variant={getGrowthColor(results.careerGrowth)}>
                      {results.careerGrowth.toUpperCase()} GROWTH
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">{results.career} Field Growth</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Career advancement potential
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-3">
                    <TrendingUp className="h-8 w-8 mx-auto text-secondary mb-2" />
                    <Badge variant={getStatusColor(results.demandLevel === "excellent")}>
                      {results.demandLevel.toUpperCase()} DEMAND
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">Job Market Demand</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Employment opportunities
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-3">
                    <Target className="h-8 w-8 mx-auto text-canada-red mb-2" />
                    <Badge variant={getStatusColor(results.jobMarket === "excellent")}>
                      {results.jobMarket.toUpperCase()} MARKET
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">City Job Market</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Overall employment conditions
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-3">📈 Career Recommendations</h4>
                <div className="space-y-2 text-sm">
                  {results.salaryIncrease > 50 && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Consider additional training or certification to accelerate salary growth</span>
                    </div>
                  )}
                  {results.careerGrowth === "high" && (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Excellent career field choice - high growth potential supports salary increases</span>
                    </div>
                  )}
                  {!results.marketCompatible && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Market salary may not support your lifestyle goals - consider higher-paying roles or locations</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Estimated timeline to reach target salary: <strong>{results.timeline}</strong></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(!targetCity || !currentSalary || !familySize || !careerField) && (
        <Card className="text-center p-12 shadow-card-custom">
          <CardContent>
            <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardDescription>
              Complete all fields above to get your personalized salary requirements analysis
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};