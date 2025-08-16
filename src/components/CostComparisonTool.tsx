import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowUpDown, Home, Car, ShoppingCart, Zap } from "lucide-react";

const canadianCities = [
  { name: "Vancouver, BC", avgRent: 2800, avgHome: 1200000, groceries: 450, transport: 180, utilities: 150 },
  { name: "Toronto, ON", avgRent: 2400, avgHome: 950000, groceries: 420, transport: 160, utilities: 140 },
  { name: "Calgary, AB", avgRent: 1600, avgHome: 520000, groceries: 380, transport: 140, utilities: 160 },
  { name: "Montreal, QC", avgRent: 1400, avgHome: 480000, groceries: 350, transport: 95, utilities: 120 },
  { name: "Ottawa, ON", avgRent: 1800, avgHome: 650000, groceries: 390, transport: 125, utilities: 130 },
  { name: "Halifax, NS", avgRent: 1500, avgHome: 420000, groceries: 400, transport: 110, utilities: 140 },
  { name: "Winnipeg, MB", avgRent: 1200, avgHome: 350000, groceries: 340, transport: 100, utilities: 145 },
  { name: "Saskatoon, SK", avgRent: 1100, avgHome: 320000, groceries: 330, transport: 95, utilities: 155 }
];

export const CostComparisonTool = () => {
  const [city1, setCity1] = useState<string>("");
  const [city2, setCity2] = useState<string>("");

  const getCity = (cityName: string) => canadianCities.find(c => c.name === cityName);
  const cityData1 = getCity(city1);
  const cityData2 = getCity(city2);

  const calculateTotalMonthlyCost = (city: typeof canadianCities[0]) => {
    return city.avgRent + city.groceries + city.transport + city.utilities;
  };

  const getDifference = (value1: number, value2: number) => {
    const diff = ((value1 - value2) / value2) * 100;
    return {
      percentage: Math.abs(diff),
      isHigher: diff > 0,
      amount: Math.abs(value1 - value2)
    };
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Compare Canadian Cities</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select two Canadian cities to compare housing costs, living expenses, and overall affordability
        </p>
      </div>

      {/* City Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="h-5 w-5 mr-2 text-primary" />
              City 1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={city1} onValueChange={setCity1}>
              <SelectTrigger>
                <SelectValue placeholder="Select first city" />
              </SelectTrigger>
              <SelectContent>
                {canadianCities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="h-5 w-5 mr-2 text-secondary" />
              City 2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={city2} onValueChange={setCity2}>
              <SelectTrigger>
                <SelectValue placeholder="Select second city" />
              </SelectTrigger>
              <SelectContent>
                {canadianCities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Results */}
      {cityData1 && cityData2 && (
        <div className="space-y-6">
          <Card className="shadow-elegant">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="flex items-center justify-center">
                <ArrowUpDown className="h-5 w-5 mr-2" />
                Cost Comparison: {cityData1.name} vs {cityData2.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Housing Costs */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Home className="h-5 w-5 mr-2 text-primary" />
                    Housing Costs
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Average Rent</span>
                        <Badge variant={getDifference(cityData1.avgRent, cityData2.avgRent).isHigher ? "destructive" : "secondary"}>
                          {getDifference(cityData1.avgRent, cityData2.avgRent).isHigher ? "+" : "-"}
                          {getDifference(cityData1.avgRent, cityData2.avgRent).percentage.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${cityData1.avgRent.toLocaleString()}</span>
                        <span>${cityData2.avgRent.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(cityData1.avgRent / Math.max(cityData1.avgRent, cityData2.avgRent)) * 100}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Average Home Price</span>
                        <Badge variant={getDifference(cityData1.avgHome, cityData2.avgHome).isHigher ? "destructive" : "secondary"}>
                          {getDifference(cityData1.avgHome, cityData2.avgHome).isHigher ? "+" : "-"}
                          {getDifference(cityData1.avgHome, cityData2.avgHome).percentage.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${cityData1.avgHome.toLocaleString()}</span>
                        <span>${cityData2.avgHome.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(cityData1.avgHome / Math.max(cityData1.avgHome, cityData2.avgHome)) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Living Expenses */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Monthly Living Expenses</h3>
                  
                  <div className="space-y-3">
                    {[
                      { label: "Groceries", icon: ShoppingCart, val1: cityData1.groceries, val2: cityData2.groceries },
                      { label: "Transportation", icon: Car, val1: cityData1.transport, val2: cityData2.transport },
                      { label: "Utilities", icon: Zap, val1: cityData1.utilities, val2: cityData2.utilities }
                    ].map(({ label, icon: Icon, val1, val2 }) => (
                      <div key={label}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium flex items-center">
                            <Icon className="h-4 w-4 mr-1" />
                            {label}
                          </span>
                          <Badge variant={getDifference(val1, val2).isHigher ? "destructive" : "secondary"}>
                            {getDifference(val1, val2).isHigher ? "+" : "-"}
                            {getDifference(val1, val2).percentage.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${val1}</span>
                          <span>${val2}</span>
                        </div>
                        <Progress 
                          value={(val1 / Math.max(val1, val2)) * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Comparison */}
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Total Monthly Cost (excluding rent)</h4>
                    <p className="text-sm text-muted-foreground">Groceries + Transportation + Utilities</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-4">
                      <div>
                        <div className="font-semibold">${(cityData1.groceries + cityData1.transport + cityData1.utilities).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{cityData1.name}</div>
                      </div>
                      <div>
                        <div className="font-semibold">${(cityData2.groceries + cityData2.transport + cityData2.utilities).toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{cityData2.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!city1 && !city2 && (
        <Card className="text-center p-12 shadow-card-custom">
          <CardContent>
            <ArrowUpDown className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <CardDescription>
              Select two Canadian cities above to see a detailed cost comparison
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </div>
  );
};