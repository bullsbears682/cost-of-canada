import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, DollarSign, Home, Zap, TrendingUp, Navigation, Users } from "lucide-react";

interface ProvinceData {
  id: string;
  name: string;
  shortName: string;
  avgRent: number;
  avgIncome: number;
  costIndex: number;
  population: string;
  majorCities: string[];
  path: string;
  centroid: { x: number; y: number };
}

const provincesData: ProvinceData[] = [
  {
    id: "bc",
    name: "British Columbia",
    shortName: "BC",
    avgRent: 2100,
    avgIncome: 65000,
    costIndex: 115,
    population: "5.2M",
    majorCities: ["Vancouver", "Victoria", "Surrey"],
    centroid: { x: 200, y: 250 },
    path: "M180,200 Q200,180 250,190 L280,200 Q300,220 290,260 L270,300 Q250,320 200,310 L180,290 Q170,250 180,200 Z"
  },
  {
    id: "ab",
    name: "Alberta",  
    shortName: "AB",
    avgRent: 1400,
    avgIncome: 75000,
    costIndex: 105,
    population: "4.4M",
    majorCities: ["Calgary", "Edmonton", "Red Deer"],
    centroid: { x: 320, y: 250 },
    path: "M300,200 L370,200 L370,320 L300,320 Q290,260 300,200 Z"
  },
  {
    id: "sk",
    name: "Saskatchewan",
    shortName: "SK", 
    avgRent: 950,
    avgIncome: 58000,
    costIndex: 95,
    population: "1.2M",
    majorCities: ["Saskatoon", "Regina", "Prince Albert"],
    centroid: { x: 390, y: 250 },
    path: "M370,200 L440,200 L440,320 L370,320 L370,200 Z"
  },
  {
    id: "mb",
    name: "Manitoba",
    shortName: "MB",
    avgRent: 1100,
    avgIncome: 55000,
    costIndex: 98,
    population: "1.4M", 
    majorCities: ["Winnipeg", "Brandon", "Steinbach"],
    centroid: { x: 460, y: 250 },
    path: "M440,200 L500,200 L500,320 L440,320 L440,200 Z"
  },
  {
    id: "on",
    name: "Ontario",
    shortName: "ON",
    avgRent: 1800,
    avgIncome: 62000,
    costIndex: 110,
    population: "15.0M",
    majorCities: ["Toronto", "Ottawa", "Hamilton"],
    centroid: { x: 560, y: 280 },
    path: "M500,200 Q580,190 620,220 L640,260 Q630,320 580,340 L520,330 Q500,300 500,200 Z"
  },
  {
    id: "qc",
    name: "Quebec",
    shortName: "QC",
    avgRent: 1200,
    avgIncome: 52000,
    costIndex: 102,
    population: "8.6M",
    majorCities: ["Montreal", "Quebec City", "Laval"],
    centroid: { x: 680, y: 250 },
    path: "M640,180 Q720,170 780,200 L800,240 Q790,300 750,330 L680,320 Q640,280 640,180 Z"
  }
];

const InteractiveCanadaMap = () => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "grid">("map");

  const getCostColor = (costIndex: number) => {
    if (costIndex >= 120) return "text-red-600 bg-red-50 border-red-200";
    if (costIndex >= 110) return "text-orange-600 bg-orange-50 border-orange-200";  
    if (costIndex >= 100) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getMapFillColor = (province: ProvinceData, isHovered: boolean, isSelected: boolean) => {
    let baseColor;
    if (province.costIndex >= 120) baseColor = isSelected ? "#DC2626" : isHovered ? "#EF4444" : "#FEE2E2";
    else if (province.costIndex >= 110) baseColor = isSelected ? "#EA580C" : isHovered ? "#F97316" : "#FED7AA";
    else if (province.costIndex >= 100) baseColor = isSelected ? "#CA8A04" : isHovered ? "#EAB308" : "#FEF3C7";
    else baseColor = isSelected ? "#16A34A" : isHovered ? "#22C55E" : "#DCFCE7";
    
    return baseColor;
  };

  const getAffordabilityRatio = (rent: number, income: number) => {
    return ((rent * 12) / income * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4 gradient-text">
          Interactive Canada Cost Explorer
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore Canada's cost of living with an interactive map and detailed provincial breakdowns
        </p>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "map" | "grid")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="grid" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Grid View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Enhanced Interactive Map */}
            <Card className="xl:col-span-3 shadow-elegant border-0 overflow-hidden">
              <CardHeader className="bg-gradient-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Canada Provincial Cost Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 to-indigo-100">
                  <svg viewBox="0 0 1000 600" className="w-full h-full">
                    {/* Map Background */}
                    <defs>
                      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DBEAFE" />
                        <stop offset="100%" stopColor="#BFDBFE" />
                      </linearGradient>
                      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                      </filter>
                    </defs>
                    
                    {/* Ocean background */}
                    <rect width="1000" height="600" fill="url(#waterGradient)" />
                    
                    {/* Province shapes */}
                    {provincesData.map((province) => (
                      <g key={province.id}>
                        <path
                          d={province.path}
                          fill={getMapFillColor(province, hoveredProvince === province.id, selectedProvince?.id === province.id)}
                          stroke={selectedProvince?.id === province.id ? "#1D4ED8" : "#6B7280"}
                          strokeWidth={selectedProvince?.id === province.id ? "3" : "1"}
                          className="cursor-pointer transition-all duration-300 hover:stroke-2"
                          filter="url(#shadow)"
                          onClick={() => setSelectedProvince(province)}
                          onMouseEnter={() => setHoveredProvince(province.id)}
                          onMouseLeave={() => setHoveredProvince(null)}
                        />
                        
                        {/* Province labels */}
                        <text
                          x={province.centroid.x}
                          y={province.centroid.y - 10}
                          textAnchor="middle"
                          className="text-sm font-bold fill-gray-700 pointer-events-none"
                        >
                          {province.shortName}
                        </text>
                        
                        {/* Cost index display */}
                        <text
                          x={province.centroid.x}
                          y={province.centroid.y + 8}
                          textAnchor="middle"
                          className="text-xs fill-gray-600 pointer-events-none"
                        >
                          {province.costIndex}
                        </text>
                      </g>
                    ))}
                  </svg>
                  
                  {/* Enhanced Legend */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl border shadow-lg">
                    <h4 className="text-sm font-semibold mb-3 text-gray-800">Cost of Living Index</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-200 border border-green-300 rounded-sm"></div>
                        <span className="text-xs text-gray-700">Affordable (&lt;100)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-yellow-200 border border-yellow-300 rounded-sm"></div>
                        <span className="text-xs text-gray-700">Moderate (100-110)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-orange-200 border border-orange-300 rounded-sm"></div>
                        <span className="text-xs text-gray-700">Expensive (110-120)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-red-200 border border-red-300 rounded-sm"></div>
                        <span className="text-xs text-gray-700">Very Expensive (120+)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Province Details Panel */}
            <Card className="shadow-elegant border-0">
              <CardHeader className="bg-gradient-secondary/5">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  {selectedProvince ? selectedProvince.name : "Select a Province"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {selectedProvince ? (
                  <>
                    <div className="text-center p-4 bg-gradient-primary/10 rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {selectedProvince.costIndex}
                      </div>
                      <div className="text-sm text-primary/80">Cost Index</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Population</span>
                        </div>
                        <span className="font-semibold">{selectedProvince.population}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Avg Rent</span>
                        </div>
                        <span className="font-semibold">${selectedProvince.avgRent.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Avg Income</span>
                        </div>
                        <span className="font-semibold">${selectedProvince.avgIncome.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="text-sm text-muted-foreground mb-2">Major Cities</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProvince.majorCities.map((city) => (
                          <Badge key={city} variant="outline" className="text-xs">
                            {city}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gradient-subtle rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Housing Affordability</div>
                      <div className="text-2xl font-bold">
                        {getAffordabilityRatio(selectedProvince.avgRent, selectedProvince.avgIncome)}%
                      </div>
                      <div className="text-xs text-muted-foreground">of income on rent</div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Navigation className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground mb-2">Select a province on the map</p>
                    <p className="text-sm text-muted-foreground/80">
                      Click any province to view detailed cost analysis
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grid" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {provincesData.map((province) => (
              <Card 
                key={province.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedProvince?.id === province.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedProvince(province)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{province.name}</CardTitle>
                    <Badge className={getCostColor(province.costIndex)}>
                      {province.costIndex}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Rent</div>
                      <div className="font-semibold">${province.avgRent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Income</div>
                      <div className="font-semibold">${province.avgIncome.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Population: {province.population}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {province.majorCities.slice(0, 2).map((city) => (
                      <Badge key={city} variant="outline" className="text-xs">
                        {city}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveCanadaMap;