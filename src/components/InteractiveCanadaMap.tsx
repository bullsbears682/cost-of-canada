import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Home } from "lucide-react";

interface ProvinceData {
  id: string;
  name: string;
  avgRent: number;
  avgIncome: number;
  costIndex: number;
  coordinates: { x: number; y: number };
}

const provincesData: ProvinceData[] = [
  { id: "bc", name: "British Columbia", avgRent: 2100, avgIncome: 65000, costIndex: 115, coordinates: { x: 15, y: 45 } },
  { id: "ab", name: "Alberta", avgRent: 1400, avgIncome: 75000, costIndex: 105, coordinates: { x: 25, y: 40 } },
  { id: "sk", name: "Saskatchewan", avgRent: 950, avgIncome: 58000, costIndex: 95, coordinates: { x: 35, y: 35 } },
  { id: "mb", name: "Manitoba", avgRent: 1100, avgIncome: 55000, costIndex: 98, coordinates: { x: 45, y: 38 } },
  { id: "on", name: "Ontario", avgRent: 1800, avgIncome: 62000, costIndex: 110, coordinates: { x: 60, y: 50 } },
  { id: "qc", name: "Quebec", avgRent: 1200, avgIncome: 52000, costIndex: 102, coordinates: { x: 75, y: 45 } },
  { id: "nb", name: "New Brunswick", avgRent: 900, avgIncome: 48000, costIndex: 92, coordinates: { x: 85, y: 50 } },
  { id: "ns", name: "Nova Scotia", avgRent: 1300, avgIncome: 50000, costIndex: 98, coordinates: { x: 88, y: 55 } },
  { id: "pe", name: "Prince Edward Island", avgRent: 1100, avgIncome: 47000, costIndex: 95, coordinates: { x: 87, y: 52 } },
  { id: "nl", name: "Newfoundland", avgRent: 950, avgIncome: 55000, costIndex: 96, coordinates: { x: 92, y: 40 } },
  { id: "yt", name: "Yukon", avgRent: 1400, avgIncome: 70000, costIndex: 120, coordinates: { x: 20, y: 15 } },
  { id: "nt", name: "Northwest Territories", avgRent: 1600, avgIncome: 85000, costIndex: 125, coordinates: { x: 35, y: 20 } },
  { id: "nu", name: "Nunavut", avgRent: 2000, avgIncome: 75000, costIndex: 135, coordinates: { x: 55, y: 15 } },
];

const InteractiveCanadaMap = () => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);

  const getCostColor = (costIndex: number) => {
    if (costIndex >= 120) return "bg-destructive";
    if (costIndex >= 110) return "bg-orange-500";
    if (costIndex >= 100) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getAffordabilityRatio = (rent: number, income: number) => {
    return ((rent * 12) / income * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4 gradient-text">
          Interactive Canada Cost Map
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Click on any province or territory to explore detailed cost of living data and housing affordability metrics
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-2 shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Canada Cost Index Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-96 bg-gradient-subtle rounded-lg overflow-hidden">
              {/* SVG Map Container */}
              <svg viewBox="0 0 100 70" className="w-full h-full">
                {/* Canada outline - simplified */}
                <path
                  d="M5,25 L15,20 Q20,15 25,18 L30,15 Q40,12 50,15 L60,12 Q70,10 80,15 L85,20 Q90,25 88,35 L85,45 Q80,50 75,52 L70,55 Q60,58 50,55 L40,52 Q30,50 25,45 L20,40 Q15,35 12,30 L8,28 Z"
                  fill="rgba(59, 130, 246, 0.1)"
                  stroke="rgba(59, 130, 246, 0.3)"
                  strokeWidth="0.5"
                />
                
                {/* Province/Territory markers */}
                {provincesData.map((province) => (
                  <g key={province.id}>
                    <circle
                      cx={province.coordinates.x}
                      cy={province.coordinates.y}
                      r={hoveredProvince === province.id ? "3" : "2.5"}
                      className={`${getCostColor(province.costIndex)} cursor-pointer transition-all duration-300 hover:opacity-80`}
                      onClick={() => setSelectedProvince(province)}
                      onMouseEnter={() => setHoveredProvince(province.id)}
                      onMouseLeave={() => setHoveredProvince(null)}
                    />
                    {hoveredProvince === province.id && (
                      <text
                        x={province.coordinates.x}
                        y={province.coordinates.y - 4}
                        textAnchor="middle"
                        className="text-xs fill-foreground font-medium pointer-events-none"
                      >
                        {province.name}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-3 rounded-lg border">
                <h4 className="text-sm font-semibold mb-2">Cost Index</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs">Low (&lt;100)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span className="text-xs">Medium (100-110)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span className="text-xs">High (110-120)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded"></div>
                    <span className="text-xs">Very High (120+)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Province Details Panel */}
        <Card className="shadow-elegant border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              {selectedProvince ? selectedProvince.name : "Select a Province"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProvince ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cost Index</span>
                  <Badge className={getCostColor(selectedProvince.costIndex)}>
                    {selectedProvince.costIndex}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Average Rent</span>
                        <span className="font-semibold">${selectedProvince.avgRent.toLocaleString()}/month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Average Income</span>
                        <span className="font-semibold">${selectedProvince.avgIncome.toLocaleString()}/year</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Housing Affordability</span>
                    <div className="text-right">
                      <div className="font-semibold">
                        {getAffordabilityRatio(selectedProvince.avgRent, selectedProvince.avgIncome)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        of income
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {parseFloat(getAffordabilityRatio(selectedProvince.avgRent, selectedProvince.avgIncome)) > 30 
                      ? "⚠️ Above recommended 30% threshold" 
                      : "✅ Within recommended 30% threshold"}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Click on any province or territory on the map to view detailed cost analysis
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center shadow-card-custom border-0">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {provincesData.filter(p => p.costIndex < 100).length}
            </div>
            <div className="text-sm text-muted-foreground">Low Cost Regions</div>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card-custom border-0">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {provincesData.filter(p => p.costIndex >= 100 && p.costIndex < 110).length}
            </div>
            <div className="text-sm text-muted-foreground">Medium Cost Regions</div>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card-custom border-0">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">
              {provincesData.filter(p => p.costIndex >= 110 && p.costIndex < 120).length}
            </div>
            <div className="text-sm text-muted-foreground">High Cost Regions</div>
          </CardContent>
        </Card>
        
        <Card className="text-center shadow-card-custom border-0">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {provincesData.filter(p => p.costIndex >= 120).length}
            </div>
            <div className="text-sm text-muted-foreground">Very High Cost Regions</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveCanadaMap;