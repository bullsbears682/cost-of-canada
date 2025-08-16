import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Gift, DollarSign, Users, GraduationCap, Baby, Heart, Home } from "lucide-react";

interface Benefit {
  id: string;
  name: string;
  type: "federal" | "provincial";
  category: "child" | "disability" | "senior" | "student" | "housing" | "employment" | "healthcare";
  maxAmount: number;
  frequency: "monthly" | "annual" | "one-time";
  description: string;
  applicationLink: string;
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number;
    hasChildren?: boolean;
    isStudent?: boolean;
    isDisabled?: boolean;
    isSenior?: boolean;
    provinces?: string[];
  };
}

const canadianBenefits: Benefit[] = [
  {
    id: "ccb",
    name: "Canada Child Benefit (CCB)",
    type: "federal",
    category: "child",
    maxAmount: 7437,
    frequency: "annual",
    description: "Tax-free monthly payment to help with the cost of raising children under 18",
    applicationLink: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html",
    eligibilityCriteria: {
      hasChildren: true,
      maxIncome: 200000
    }
  },
  {
    id: "gst-hst",
    name: "GST/HST Credit",
    type: "federal", 
    category: "employment",
    maxAmount: 1400,
    frequency: "annual",
    description: "Tax-free quarterly payments to help offset GST/HST paid by low and modest-income individuals and families",
    applicationLink: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/gsthst-credit.html",
    eligibilityCriteria: {
      minAge: 19,
      maxIncome: 50000
    }
  },
  {
    id: "oas",
    name: "Old Age Security (OAS)",
    type: "federal",
    category: "senior",
    maxAmount: 8200,
    frequency: "annual",
    description: "Monthly payment available to seniors aged 65 and older who meet residence requirements",
    applicationLink: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security.html",
    eligibilityCriteria: {
      minAge: 65,
      maxIncome: 140000
    }
  },
  {
    id: "gis",
    name: "Guaranteed Income Supplement (GIS)",
    type: "federal",
    category: "senior",
    maxAmount: 11900,
    frequency: "annual",
    description: "Monthly non-taxable benefit for low-income OAS pensioners",
    applicationLink: "https://www.canada.ca/en/services/benefits/publicpensions/cpp/old-age-security/guaranteed-income-supplement.html",
    eligibilityCriteria: {
      minAge: 65,
      maxIncome: 20832,
      isSenior: true
    }
  },
  {
    id: "canada-student-grants",
    name: "Canada Student Grants",
    type: "federal",
    category: "student",
    maxAmount: 6000,
    frequency: "annual",
    description: "Grants that don't need to be repaid to help with post-secondary education costs",
    applicationLink: "https://www.canada.ca/en/services/benefits/education/student-aid/grants-loans.html",
    eligibilityCriteria: {
      isStudent: true,
      maxAge: 35,
      maxIncome: 80000
    }
  },
  {
    id: "canada-workers-benefit",
    name: "Canada Workers Benefit (CWB)",
    type: "federal",
    category: "employment", 
    maxAmount: 2400,
    frequency: "annual",
    description: "Refundable tax credit for working individuals and families with low incomes",
    applicationLink: "https://www.canada.ca/en/revenue-agency/programs/about-canada-revenue-agency-cra/federal-government-budgets/budget-2019-investing-middle-class/canada-workers-benefit.html",
    eligibilityCriteria: {
      minAge: 19,
      maxIncome: 32244
    }
  },
  {
    id: "disability-tax-credit",
    name: "Disability Tax Credit (DTC)",
    type: "federal",
    category: "disability",
    maxAmount: 9428,
    frequency: "annual", 
    description: "Non-refundable tax credit for persons with disabilities or their supporting persons",
    applicationLink: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/segments/tax-credits-deductions-persons-disabilities/disability-tax-credit.html",
    eligibilityCriteria: {
      isDisabled: true
    }
  },
  {
    id: "on-ontario-works",
    name: "Ontario Works",
    type: "provincial",
    category: "employment",
    maxAmount: 9600,
    frequency: "annual",
    description: "Financial assistance and employment support for people in temporary financial need",
    applicationLink: "https://www.ontario.ca/page/apply-ontario-works",
    eligibilityCriteria: {
      maxIncome: 15000,
      provinces: ["ON"]
    }
  },
  {
    id: "bc-housing-subsidy",
    name: "BC Housing Rental Assistance",
    type: "provincial",
    category: "housing",
    maxAmount: 7200,
    frequency: "annual",
    description: "Rental assistance to help with monthly housing costs",
    applicationLink: "https://www.bchousing.org/housing-assistance/rental-assistance",
    eligibilityCriteria: {
      maxIncome: 60000,
      provinces: ["BC"]
    }
  },
  {
    id: "qc-family-allowance",
    name: "Quebec Family Allowance",
    type: "provincial",
    category: "child",
    maxAmount: 2400,
    frequency: "annual",
    description: "Financial assistance to families with children in Quebec",
    applicationLink: "https://www.rrq.gouv.qc.ca/en/programmes/regime_rentes/Pages/regime_rentes.aspx",
    eligibilityCriteria: {
      hasChildren: true,
      provinces: ["QC"],
      maxIncome: 100000
    }
  }
];

export const GovernmentBenefitsFinder = () => {
  const [age, setAge] = useState<string>("");
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [hasChildren, setHasChildren] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSenior, setIsSenior] = useState(false);

  const findEligibleBenefits = () => {
    const userAge = parseInt(age);
    const userIncome = parseInt(annualIncome);

    return canadianBenefits.filter(benefit => {
      const criteria = benefit.eligibilityCriteria;
      
      // Age check
      if (criteria.minAge && userAge < criteria.minAge) return false;
      if (criteria.maxAge && userAge > criteria.maxAge) return false;
      
      // Income check
      if (criteria.maxIncome && userIncome > criteria.maxIncome) return false;
      
      // Province check
      if (criteria.provinces && !criteria.provinces.includes(province)) return false;
      
      // Status checks
      if (criteria.hasChildren && !hasChildren) return false;
      if (criteria.isStudent && !isStudent) return false;
      if (criteria.isDisabled && !isDisabled) return false;
      if (criteria.isSenior && !isSenior) return false;
      
      return true;
    });
  };

  const eligibleBenefits = findEligibleBenefits();
  const totalAnnualValue = eligibleBenefits.reduce((sum, benefit) => {
    if (benefit.frequency === "annual") return sum + benefit.maxAmount;
    if (benefit.frequency === "monthly") return sum + (benefit.maxAmount * 12);
    return sum + benefit.maxAmount;
  }, 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'child': return Baby;
      case 'senior': return Users;
      case 'student': return GraduationCap;
      case 'disability': return Heart;
      case 'housing': return Home;
      case 'employment': return DollarSign;
      default: return Gift;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'child': return 'bg-pink-100 text-pink-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'disability': return 'bg-red-100 text-red-800';
      case 'housing': return 'bg-green-100 text-green-800';
      case 'employment': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number, frequency: string) => {
    if (frequency === "monthly") return `$${amount}/month`;
    if (frequency === "annual") return `$${amount.toLocaleString()}/year`;
    return `$${amount.toLocaleString()} (one-time)`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Government Benefits Finder</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover federal and provincial benefits you may be eligible for based on your age, income, family status, and province
        </p>
      </div>

      {/* Input Form */}
      <Card className="shadow-card-custom">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center">
            <Gift className="h-5 w-5 mr-2" />
            Eligibility Information
          </CardTitle>
          <CardDescription className="text-primary-foreground/90">
            Provide your details to find benefits you're eligible for
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 35"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Annual Income (CAD)</Label>
              <Input
                id="income"
                type="number"
                placeholder="e.g., 65000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Province/Territory</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BC">British Columbia</SelectItem>
                  <SelectItem value="AB">Alberta</SelectItem>
                  <SelectItem value="SK">Saskatchewan</SelectItem>
                  <SelectItem value="MB">Manitoba</SelectItem>
                  <SelectItem value="ON">Ontario</SelectItem>
                  <SelectItem value="QC">Quebec</SelectItem>
                  <SelectItem value="NB">New Brunswick</SelectItem>
                  <SelectItem value="NS">Nova Scotia</SelectItem>
                  <SelectItem value="PE">Prince Edward Island</SelectItem>
                  <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                  <SelectItem value="YT">Yukon</SelectItem>
                  <SelectItem value="NT">Northwest Territories</SelectItem>
                  <SelectItem value="NU">Nunavut</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-4 block">Family & Status Information</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="children" 
                  checked={hasChildren}
                  onCheckedChange={(checked) => setHasChildren(checked as boolean)}
                />
                <Label htmlFor="children">Have children under 18</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="student" 
                  checked={isStudent}
                  onCheckedChange={(checked) => setIsStudent(checked as boolean)}
                />
                <Label htmlFor="student">Current student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="disabled" 
                  checked={isDisabled}
                  onCheckedChange={(checked) => setIsDisabled(checked as boolean)}
                />
                <Label htmlFor="disabled">Have a disability</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="senior" 
                  checked={isSenior}
                  onCheckedChange={(checked) => setIsSenior(checked as boolean)}
                />
                <Label htmlFor="senior">Senior (65+)</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {age && annualIncome && province && (
        <div className="space-y-6">
          {/* Key Insight */}
          <Card className="shadow-elegant border-primary/20">
            <CardHeader className="bg-gradient-hero text-primary-foreground text-center">
              <CardTitle className="text-2xl">💡 Key Insight</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              {eligibleBenefits.length > 0 ? (
                <div className="space-y-2">
                  <Gift className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-green-700">
                    You're eligible for ${totalAnnualValue.toLocaleString()} in government benefits you may not know about!
                  </h3>
                  <p className="text-muted-foreground">
                    Found {eligibleBenefits.length} benefit{eligibleBenefits.length !== 1 ? 's' : ''} you qualify for
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold text-muted-foreground">
                    No eligible benefits found with current criteria
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your information or check back as eligibility requirements change
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits List */}
          {eligibleBenefits.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Available Benefits</h3>
              
              <div className="grid gap-6">
                {eligibleBenefits.map((benefit) => {
                  const Icon = getCategoryIcon(benefit.category);
                  return (
                    <Card key={benefit.id} className="shadow-card-custom">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getCategoryColor(benefit.category)}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{benefit.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={benefit.type === "federal" ? "default" : "secondary"}>
                                  {benefit.type === "federal" ? "Federal" : "Provincial"}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                  {benefit.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {formatAmount(benefit.maxAmount, benefit.frequency)}
                            </div>
                            <div className="text-sm text-muted-foreground">Maximum Amount</div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{benefit.description}</p>
                        
                        <Button asChild className="w-full">
                          <a href={benefit.applicationLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Apply Now on Government Website
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Summary */}
              <Card className="shadow-elegant">
                <CardHeader className="bg-gradient-secondary text-secondary-foreground">
                  <CardTitle>Benefits Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{eligibleBenefits.length}</div>
                      <div className="text-sm text-muted-foreground">Eligible Benefits</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">
                        ${totalAnnualValue.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Annual Value</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-canada-red mb-2">
                        {eligibleBenefits.filter(b => b.type === "federal").length}
                      </div>
                      <div className="text-sm text-muted-foreground">Federal Benefits</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {(!age || !annualIncome || !province) && (
        <Card className="text-center p-12 shadow-card-custom">
          <CardContent>
            <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardDescription>
              Complete your information above to discover government benefits you may be eligible for
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};