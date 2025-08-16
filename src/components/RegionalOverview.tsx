import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, TrendingDown, Home, DollarSign } from "lucide-react";

const provincialData = [
  {
    province: "British Columbia",
    avgRent: 2200,
    avgHome: 980000,
    costIndex: 125,
    trend: "up",
    trendPercent: 8.5,
    cities: ["Vancouver", "Victoria", "Burnaby"]
  },
  {
    province: "Alberta",
    avgRent: 1450,
    avgHome: 485000,
    costIndex: 102,
    trend: "up",
    trendPercent: 3.2,
    cities: ["Calgary", "Edmonton", "Red Deer"]
  },
  {
    province: "Saskatchewan",
    avgRent: 1100,
    avgHome: 295000,
    costIndex: 88,
    trend: "stable",
    trendPercent: 1.1,
    cities: ["Saskatoon", "Regina", "Prince Albert"]
  },
  {
    province: "Manitoba",
    avgRent: 1180,
    avgHome: 335000,
    costIndex: 92,
    trend: "up",
    trendPercent: 2.8,
    cities: ["Winnipeg", "Brandon", "Steinbach"]
  },
  {
    province: "Ontario",
    avgRent: 2100,
    avgHome: 870000,
    costIndex: 118,
    trend: "up",
    trendPercent: 6.7,
    cities: ["Toronto", "Ottawa", "Hamilton"]
  },
  {
    province: "Quebec",
    avgRent: 1350,
    avgHome: 445000,
    costIndex: 96,
    trend: "up",
    trendPercent: 4.1,
    cities: ["Montreal", "Quebec City", "Gatineau"]
  },
  {
    province: "New Brunswick",
    avgRent: 1050,
    avgHome: 285000,
    costIndex: 89,
    trend: "up",
    trendPercent: 5.3,
    cities: ["Moncton", "Saint John", "Fredericton"]
  },
  {
    province: "Nova Scotia",
    avgRent: 1400,
    avgHome: 395000,
    costIndex: 98,
    trend: "up",
    trendPercent: 7.2,
    cities: ["Halifax", "Sydney", "Truro"]
  },
  {
    province: "Prince Edward Island",
    avgRent: 1250,
    avgHome: 345000,
    costIndex: 95,
    trend: "up",
    trendPercent: 6.8,
    cities: ["Charlottetown", "Summerside", "Stratford"]
  },
  {
    province: "Newfoundland and Labrador",
    avgRent: 950,
    avgHome: 275000,
    costIndex: 85,
    trend: "stable",
    trendPercent: 0.8,
    cities: ["St. John's", "Corner Brook", "Mount Pearl"]
  }
];

export const RegionalOverview = () => {
  const maxRent = Math.max(...provincialData.map(p => p.avgRent));
  const maxHome = Math.max(...provincialData.map(p => p.avgHome));
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-destructive" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "destructive";
      case "down":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Regional Cost Overview</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive analysis of housing costs and living expenses across Canadian provinces and territories
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center shadow-card-custom">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-primary mb-2">
              ${Math.round(provincialData.reduce((sum, p) => sum + p.avgRent, 0) / provincialData.length).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">National Avg Rent</div>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card-custom">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-secondary mb-2">
              ${Math.round(provincialData.reduce((sum, p) => sum + p.avgHome, 0) / provincialData.length).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">National Avg Home</div>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card-custom">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-canada-red mb-2">
              {provincialData.filter(p => p.trend === "up").length}
            </div>
            <div className="text-sm text-muted-foreground">Rising Markets</div>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card-custom">
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-canada-blue mb-2">
              {Math.round(provincialData.reduce((sum, p) => sum + p.costIndex, 0) / provincialData.length)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Cost Index</div>
          </CardContent>
        </Card>
      </div>

      {/* Provincial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {provincialData.map((province) => (
          <Card key={province.province} className="shadow-card-custom">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  {province.province}
                </CardTitle>
                <Badge variant={getTrendColor(province.trend)}>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(province.trend)}
                    {province.trendPercent}%
                  </div>
                </Badge>
              </div>
              <CardDescription>
                Major cities: {province.cities.join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Average Rent */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <Home className="h-4 w-4 mr-1" />
                    Average Rent
                  </span>
                  <span className="font-semibold">${province.avgRent.toLocaleString()}/month</span>
                </div>
                <Progress value={(province.avgRent / maxRent) * 100} className="h-2" />
              </div>

              {/* Average Home Price */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Average Home Price
                  </span>
                  <span className="font-semibold">${province.avgHome.toLocaleString()}</span>
                </div>
                <Progress value={(province.avgHome / maxHome) * 100} className="h-2" />
              </div>

              {/* Cost Index */}
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Cost of Living Index</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{province.costIndex}</span>
                    <Badge variant={province.costIndex > 110 ? "destructive" : province.costIndex < 90 ? "secondary" : "outline"} className="text-xs">
                      {province.costIndex > 110 ? "High" : province.costIndex < 90 ? "Low" : "Moderate"}
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on national average of 100
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights */}
      <Card className="shadow-elegant">
        <CardHeader className="bg-gradient-secondary text-secondary-foreground">
          <CardTitle>Key Regional Insights</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary">Most Affordable Provinces</h4>
              <div className="space-y-2">
                {provincialData
                  .sort((a, b) => a.costIndex - b.costIndex)
                  .slice(0, 3)
                  .map((province, index) => (
                    <div key={province.province} className="flex justify-between items-center">
                      <span className="text-sm">{index + 1}. {province.province}</span>
                      <Badge variant="secondary">{province.costIndex} index</Badge>
                    </div>
                  ))
                }
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-destructive">Highest Cost Markets</h4>
              <div className="space-y-2">
                {provincialData
                  .sort((a, b) => b.costIndex - a.costIndex)
                  .slice(0, 3)
                  .map((province, index) => (
                    <div key={province.province} className="flex justify-between items-center">
                      <span className="text-sm">{index + 1}. {province.province}</span>
                      <Badge variant="destructive">{province.costIndex} index</Badge>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};