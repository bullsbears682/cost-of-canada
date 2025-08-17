import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, Shield, Users, Zap, Heart } from 'lucide-react';
import logo from "/lovable-uploads/2db9d8af-7acb-4523-b08a-e7f36f84d542.png";

const About = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Real Data",
      description: "Powered by Statistics Canada, Bank of Canada, and other official sources"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and never shared with third parties"
    },
    {
      icon: Zap,
      title: "Always Updated",
      description: "Regular updates ensure you have the latest market information"
    },
    {
      icon: Users,
      title: "User Focused",
      description: "Built based on feedback from Canadians across the country"
    }
  ];

  const stats = [
    { label: "Cities Covered", value: "50+" },
    { label: "Data Sources", value: "15+" },
    { label: "Users Helped", value: "10K+" },
    { label: "Calculations Made", value: "100K+" }
  ];

  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src={logo} alt="MapleMetrics" className="h-16 w-16 object-contain" />
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                MapleMetrics
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your comprehensive guide to understanding the cost of living across Canada. 
              Make informed decisions about where to live, work, and plan your future.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Mission */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-6 w-6 text-canada-red" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  MapleMetrics was created to help Canadians make informed financial decisions by providing 
                  accurate, up-to-date cost of living information across the country.
                </p>
                <p>
                  Whether you're planning a move, starting a career, or preparing for retirement, 
                  understanding regional cost differences is crucial for your financial well-being.
                </p>
                <p>
                  We believe everyone deserves access to reliable financial planning tools, 
                  which is why we've made our core features free and accessible to all Canadians.
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Icon className="h-6 w-6 text-primary mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Data Sources */}
          <Card className="mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our calculations are powered by authoritative Canadian data sources to ensure accuracy and reliability:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Badge variant="outline">Statistics Canada</Badge>
                  <p className="text-sm text-muted-foreground">Housing costs, income data, demographic information</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">Bank of Canada</Badge>
                  <p className="text-sm text-muted-foreground">Interest rates, inflation data, economic indicators</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">CMHC</Badge>
                  <p className="text-sm text-muted-foreground">Housing market data, rental information</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">CRA</Badge>
                  <p className="text-sm text-muted-foreground">Tax information, benefit calculations</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">Provincial Governments</Badge>
                  <p className="text-sm text-muted-foreground">Regional policies, local tax rates</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="outline">Municipal Data</Badge>
                  <p className="text-sm text-muted-foreground">Local utilities, services, property taxes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>App Information</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Version</h3>
                <p className="text-sm text-muted-foreground mb-4">1.0.0</p>
                
                <h3 className="font-semibold mb-2">Built With</h3>
                <div className="space-y-1">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Supabase</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  All calculations and estimates are for informational purposes only. 
                  This is not financial advice. Always consult with qualified professionals 
                  before making important financial decisions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default About;