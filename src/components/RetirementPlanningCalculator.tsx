import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, PiggyBank, Home, MapPin, AlertTriangle, DollarSign, Calendar, Percent } from "lucide-react";
import MobileFloatingInput from "@/components/MobileFloatingInput";
import MobileHelpSystem from "@/components/MobileHelpSystem";
import { useIsMobile } from "@/hooks/use-mobile";

interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  province: string;
  desiredLifestyle: string;
}

interface ProvinceRetirementData {
  name: string;
  avgRetirementCost: number;
  healthcareCost: number;
  housingCost: number;
  taxRate: number;
}

const provinceData: Record<string, ProvinceRetirementData> = {
  "bc": { name: "British Columbia", avgRetirementCost: 65000, healthcareCost: 3200, housingCost: 25000, taxRate: 0.45 },
  "ab": { name: "Alberta", avgRetirementCost: 58000, healthcareCost: 2800, housingCost: 18000, taxRate: 0.39 },
  "sk": { name: "Saskatchewan", avgRetirementCost: 48000, healthcareCost: 2500, housingCost: 12000, taxRate: 0.44 },
  "mb": { name: "Manitoba", avgRetirementCost: 52000, healthcareCost: 2600, housingCost: 14000, taxRate: 0.46 },
  "on": { name: "Ontario", avgRetirementCost: 62000, healthcareCost: 3100, housingCost: 22000, taxRate: 0.48 },
  "qc": { name: "Quebec", avgRetirementCost: 55000, healthcareCost: 2400, housingCost: 16000, taxRate: 0.53 },
  "nb": { name: "New Brunswick", avgRetirementCost: 45000, healthcareCost: 2300, housingCost: 11000, taxRate: 0.43 },
  "ns": { name: "Nova Scotia", avgRetirementCost: 47000, healthcareCost: 2400, housingCost: 13000, taxRate: 0.44 },
  "pe": { name: "Prince Edward Island", avgRetirementCost: 46000, healthcareCost: 2300, housingCost: 12000, taxRate: 0.42 },
  "nl": { name: "Newfoundland", avgRetirementCost: 44000, healthcareCost: 2200, housingCost: 10000, taxRate: 0.42 },
};

const lifestyleMultipliers = {
  "basic": 0.8,
  "comfortable": 1.0,
  "luxury": 1.4
};

const RetirementPlanningCalculator = () => {
  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    province: "on",
    desiredLifestyle: "comfortable"
  });

  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("inputs");
  const isMobile = useIsMobile();

  const calculateRetirement = () => {
    // Input validation
    if (inputs.retirementAge <= inputs.currentAge) {
      alert("Retirement age must be greater than current age");
      return;
    }
    if (inputs.currentAge < 18 || inputs.currentAge > 80) {
      alert("Please enter a valid current age (18-80)");
      return;
    }
    if (inputs.expectedReturn < 1 || inputs.expectedReturn > 15) {
      alert("Expected return should be between 1% and 15%");
      return;
    }

    const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
    const yearsInRetirement = 85 - inputs.retirementAge; // Assume living to 85
    const monthsToRetirement = yearsToRetirement * 12;
    const annualReturn = inputs.expectedReturn / 100;
    const monthlyReturn = annualReturn / 12;
    const inflationRate = 0.025; // 2.5% annual inflation

    // Calculate future value of current savings
    const futureCurrentSavings = inputs.currentSavings * Math.pow(1 + annualReturn, yearsToRetirement);

    // Calculate future value of monthly contributions
    const futureContributions = inputs.monthlyContribution * 
      ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn);

    const totalSavings = futureCurrentSavings + futureContributions;

    // Calculate retirement needs based on province
    const provinceInfo = provinceData[inputs.province];
    const lifestyleMultiplier = lifestyleMultipliers[inputs.desiredLifestyle as keyof typeof lifestyleMultipliers];
    const currentAnnualRetirementNeeds = provinceInfo.avgRetirementCost * lifestyleMultiplier;
    
    // Adjust for inflation at retirement start
    const inflationAdjustedAnnualNeeds = currentAnnualRetirementNeeds * Math.pow(1 + inflationRate, yearsToRetirement);
    
    // Calculate present value of retirement needs (annuity calculation)
    // This accounts for the fact that money withdrawn later is worth less
    const realReturnInRetirement = (annualReturn - inflationRate) / (1 + inflationRate);
    let totalRetirementNeeds;
    
    if (Math.abs(realReturnInRetirement) < 0.001) {
      // If real return is essentially zero, use simple multiplication
      totalRetirementNeeds = inflationAdjustedAnnualNeeds * yearsInRetirement;
    } else {
      totalRetirementNeeds = inflationAdjustedAnnualNeeds * 
        ((1 - Math.pow(1 + realReturnInRetirement, -yearsInRetirement)) / realReturnInRetirement);
    }

    // Calculate gap
    const gap = totalRetirementNeeds - totalSavings;
    const monthlyGapAmount = gap > 0 ? gap / monthsToRetirement : 0;

    // Calculate recommended monthly savings (more realistic approach)
    // This considers current savings and calculates additional monthly savings needed
    const additionalSavingsNeeded = Math.max(0, totalRetirementNeeds - futureCurrentSavings);
    const recommendedMonthlySavings = monthsToRetirement > 0 ? 
      additionalSavingsNeeded / ((Math.pow(1 + monthlyReturn, monthsToRetirement) - 1) / monthlyReturn) : 0;

    setResults({
      totalSavings,
      annualRetirementNeeds: inflationAdjustedAnnualNeeds,
      totalRetirementNeeds,
      gap,
      monthlyGapAmount,
      recommendedMonthlySavings,
      yearsToRetirement,
      yearsInRetirement,
      provinceInfo,
      lifestyleMultiplier
    });
  };

  const getGapColor = (gap: number) => {
    if (gap <= 0) return "text-green-600";
    if (gap < 100000) return "text-yellow-600";
    return "text-red-600";
  };

  const getReadinessPercentage = () => {
    if (!results) return 0;
    const percentage = (results.totalSavings / results.totalRetirementNeeds) * 100;
    return Math.min(percentage, 100);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4 gradient-text">
          Canadian Retirement Planning Calculator
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Plan your retirement across Canada's provinces with personalized cost analysis and savings projections
        </p>
      </div>

      {/* Mobile Help System */}
      <MobileHelpSystem currentPage="retirement-planner" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Retirement Planning Inputs
            </CardTitle>
            <CardDescription>
              Enter your current situation and retirement goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isMobile ? (
              // Mobile-optimized layout with floating inputs
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <MobileFloatingInput
                    label="Current Age"
                    type="number"
                    value={inputs.currentAge}
                    onChange={(e) => setInputs({...inputs, currentAge: parseInt(e.target.value) || 0})}
                    min="18"
                    max="80"
                    icon={<Calendar className="h-4 w-4" />}
                  />
                  <MobileFloatingInput
                    label="Retirement Age"
                    type="number"
                    value={inputs.retirementAge}
                    onChange={(e) => setInputs({...inputs, retirementAge: parseInt(e.target.value) || 0})}
                    min="50"
                    max="80"
                    icon={<Calendar className="h-4 w-4" />}
                  />
                </div>

                <MobileFloatingInput
                  label="Current Savings"
                  type="number"
                  value={inputs.currentSavings}
                  onChange={(e) => setInputs({...inputs, currentSavings: parseInt(e.target.value) || 0})}
                  min="0"
                  placeholder="e.g., 50000"
                  icon={<DollarSign className="h-4 w-4" />}
                />

                <MobileFloatingInput
                  label="Monthly Contribution"
                  type="number"
                  value={inputs.monthlyContribution}
                  onChange={(e) => setInputs({...inputs, monthlyContribution: parseInt(e.target.value) || 0})}
                  min="0"
                  placeholder="e.g., 1000"
                  icon={<DollarSign className="h-4 w-4" />}
                />

                <MobileFloatingInput
                  label="Expected Annual Return (%)"
                  type="number"
                  value={inputs.expectedReturn}
                  onChange={(e) => setInputs({...inputs, expectedReturn: parseFloat(e.target.value) || 0})}
                  min="1"
                  max="15"
                  step="0.1"
                  placeholder="e.g., 7"
                  icon={<Percent className="h-4 w-4" />}
                />
              </div>
            ) : (
              // Desktop layout (existing)
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentAge">Current Age</Label>
                    <Input
                      id="currentAge"
                      type="number"
                      value={inputs.currentAge}
                      onChange={(e) => setInputs({...inputs, currentAge: parseInt(e.target.value)})}
                      min="18"
                      max="80"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retirementAge">Retirement Age</Label>
                    <Input
                      id="retirementAge"
                      type="number"
                      value={inputs.retirementAge}
                      onChange={(e) => setInputs({...inputs, retirementAge: parseInt(e.target.value)})}
                      min="50"
                      max="80"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSavings">Current Savings ($)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={inputs.currentSavings}
                    onChange={(e) => setInputs({...inputs, currentSavings: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={inputs.monthlyContribution}
                    onChange={(e) => setInputs({...inputs, monthlyContribution: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    value={inputs.expectedReturn}
                    onChange={(e) => setInputs({...inputs, expectedReturn: parseFloat(e.target.value)})}
                    min="1"
                    max="15"
                    step="0.1"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="province">Retirement Province</Label>
              <Select value={inputs.province} onValueChange={(value) => setInputs({...inputs, province: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(provinceData).map(([key, data]) => (
                    <SelectItem key={key} value={key}>{data.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lifestyle">Desired Lifestyle</Label>
              <Select value={inputs.desiredLifestyle} onValueChange={(value) => setInputs({...inputs, desiredLifestyle: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (80% of average)</SelectItem>
                  <SelectItem value="comfortable">Comfortable (100% of average)</SelectItem>
                  <SelectItem value="luxury">Luxury (140% of average)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateRetirement} className="w-full shadow-glow">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Retirement Plan
            </Button>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Retirement Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <Tabs defaultValue="summary" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                  <TabsTrigger value="recommendations">Tips</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                  <div className="text-center space-y-2 mb-6">
                    <div className="text-sm text-muted-foreground">Retirement Readiness</div>
                    <Progress value={getReadinessPercentage()} className="h-3" />
                    <div className="text-lg font-semibold">
                      {getReadinessPercentage().toFixed(1)}% Ready
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Projected Savings at Retirement</span>
                      <span className="font-semibold text-green-600">
                        ${Math.round(results.totalSavings).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Total Retirement Needs</span>
                      <span className="font-semibold">
                        ${Math.round(results.totalRetirementNeeds).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Savings Gap</span>
                        {results.gap > 0 && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      </div>
                      <span className={`font-semibold ${getGapColor(results.gap)}`}>
                        {results.gap > 0 ? `-$${Math.round(Math.abs(results.gap)).toLocaleString()}` : 'Fully Funded!'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                      <span className="text-sm">Recommended Monthly Savings</span>
                      <span className="font-semibold text-primary">
                        ${Math.round(results.recommendedMonthlySavings).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="breakdown" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{results.provinceInfo.name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Annual Cost</div>
                        <div className="font-semibold">
                          ${results.annualRetirementNeeds.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Housing Cost</div>
                        <div className="font-semibold">
                          ${(results.provinceInfo.housingCost * results.lifestyleMultiplier).toLocaleString()}
                        </div>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Healthcare</div>
                        <div className="font-semibold">
                          ${(results.provinceInfo.healthcareCost * results.lifestyleMultiplier).toLocaleString()}
                        </div>
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Tax Rate</div>
                        <div className="font-semibold">
                          {(results.provinceInfo.taxRate * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-primary/10 rounded-lg">
                      <div className="text-xs text-muted-foreground">Retirement Timeline</div>
                      <div className="font-semibold">
                        {results.yearsToRetirement} years to save, {results.yearsInRetirement} years in retirement
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <div className="space-y-3">
                    {results.gap > 0 && (
                      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="font-semibold text-yellow-800">Savings Gap Detected</span>
                        </div>
                        <p className="text-sm text-yellow-700 mb-2">
                          You need an additional ${results.monthlyGapAmount.toLocaleString()} per month to meet your retirement goals.
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <PiggyBank className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Optimization Tips</span>
                      </div>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>• Consider maximizing RRSP and TFSA contributions</li>
                        <li>• Look into employer matching programs</li>
                        <li>• Review and rebalance investments annually</li>
                        <li>• Consider working part-time in early retirement</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-primary" />
                        <span className="font-semibold">Location Strategy</span>
                      </div>
                      <ul className="text-sm space-y-1 ml-6">
                        <li>• Consider lower-cost provinces for retirement</li>
                        <li>• Factor in healthcare accessibility</li>
                        <li>• Account for proximity to family</li>
                        <li>• Research senior-friendly communities</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <PiggyBank className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Enter your information and click "Calculate Retirement Plan" to see your personalized analysis
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetirementPlanningCalculator;