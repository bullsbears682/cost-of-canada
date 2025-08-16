import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Key, CheckCircle, ExternalLink, Database } from "lucide-react";
import { RealEstateAPI } from "@/services/RealEstateAPI";
import { NewsAPI } from "@/services/NewsAPI";

export const APIKeyManager = () => {
  const [realEstateKey, setRealEstateKey] = useState<string>("");
  const [newsKey, setNewsKey] = useState<string>("");
  const [testingKeys, setTestingKeys] = useState<{ [key: string]: boolean }>({});
  const [keyStatus, setKeyStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Load existing keys
    const existingRealEstateKey = RealEstateAPI.getApiKey();
    const existingNewsKey = NewsAPI.getApiKey();
    
    if (existingRealEstateKey) {
      setRealEstateKey(existingRealEstateKey);
      setKeyStatus(prev => ({ ...prev, realEstate: true }));
    }
    
    if (existingNewsKey) {
      setNewsKey(existingNewsKey);
      setKeyStatus(prev => ({ ...prev, news: true }));
    }
  }, []);

  const testRealEstateKey = async () => {
    if (!realEstateKey.trim()) return;
    
    setTestingKeys(prev => ({ ...prev, realEstate: true }));
    
    try {
      // Simple validation - in real implementation, test actual API call
      const isValid = realEstateKey.length > 10 && realEstateKey.includes('-');
      setKeyStatus(prev => ({ ...prev, realEstate: isValid }));
      
      if (isValid) {
        RealEstateAPI.saveApiKey(realEstateKey);
      }
    } catch (error) {
      setKeyStatus(prev => ({ ...prev, realEstate: false }));
    } finally {
      setTestingKeys(prev => ({ ...prev, realEstate: false }));
    }
  };

  const testNewsKey = async () => {
    if (!newsKey.trim()) return;
    
    setTestingKeys(prev => ({ ...prev, news: true }));
    
    try {
      // Simple validation - in real implementation, test actual API call
      const isValid = newsKey.length > 20;
      setKeyStatus(prev => ({ ...prev, news: isValid }));
      
      if (isValid) {
        NewsAPI.saveApiKey(newsKey);
      }
    } catch (error) {
      setKeyStatus(prev => ({ ...prev, news: false }));
    } finally {
      setTestingKeys(prev => ({ ...prev, news: false }));
    }
  };

  const getStatusBadge = (service: string) => {
    const status = keyStatus[service];
    if (status === undefined) return <Badge variant="outline">Not Set</Badge>;
    return status ? 
      <Badge variant="secondary"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge> : 
      <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Invalid</Badge>;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">API Configuration</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Configure API keys to access real-time data sources. Without API keys, the app will use realistic fallback data.
        </p>
      </div>

      {/* Supabase Recommendation */}
      <Card className="shadow-elegant border-primary/20">
        <CardHeader className="bg-gradient-primary text-primary-foreground">
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            🔒 Recommended: Use Supabase for Secure API Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              For production use, it's highly recommended to connect this project to Supabase to securely store API keys and secrets.
              Storing API keys in localStorage (current method) is only suitable for demo purposes.
            </p>
            
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">✅ Benefits of Supabase Integration:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Secure server-side API key storage</li>
                <li>• Edge functions for backend processing</li>
                <li>• User authentication and data persistence</li>
                <li>• Production-ready security standards</li>
              </ul>
            </div>

            <Button asChild className="w-full">
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect to Supabase (Recommended)
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Key Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* News API */}
        <Card className="shadow-card-custom animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Key className="h-5 w-5 mr-2 text-primary" />
                News API
              </span>
              {getStatusBadge('news')}
            </CardTitle>
            <CardDescription>
              Get real-time Canadian housing market news and policy updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="news-key">API Key</Label>
              <Input
                id="news-key"
                type="password"
                placeholder="Enter NewsAPI key"
                value={newsKey}
                onChange={(e) => setNewsKey(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={testNewsKey}
              disabled={!newsKey.trim() || testingKeys.news}
              className="w-full"
            >
              {testingKeys.news ? "Testing..." : "Save & Test API Key"}
            </Button>

            <div className="p-3 bg-muted rounded-lg text-sm">
              <div className="font-semibold mb-1">How to get API key:</div>
              <div className="space-y-1">
                <div>1. Visit <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">newsapi.org</a></div>
                <div>2. Sign up for free account</div>
                <div>3. Copy your API key from dashboard</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real Estate API */}
        <Card className="shadow-card-custom animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Key className="h-5 w-5 mr-2 text-secondary" />
                Real Estate API
              </span>
              {getStatusBadge('realEstate')}
            </CardTitle>
            <CardDescription>
              Access live MLS data and rental listings (example configuration)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="real-estate-key">API Key</Label>
              <Input
                id="real-estate-key"
                type="password"
                placeholder="Enter Real Estate API key"
                value={realEstateKey}
                onChange={(e) => setRealEstateKey(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={testRealEstateKey}
              disabled={!realEstateKey.trim() || testingKeys.realEstate}
              className="w-full"
            >
              {testingKeys.realEstate ? "Testing..." : "Save & Test API Key"}
            </Button>

            <div className="p-3 bg-muted rounded-lg text-sm">
              <div className="font-semibold mb-1">Note:</div>
              <div>
                This is an example configuration. Real estate APIs vary by provider 
                (RentSpider, Rentals.ca, local MLS systems). Contact your preferred 
                data provider for API access.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Sources Without API Keys */}
      <Card className="shadow-elegant">
        <CardHeader className="bg-gradient-secondary text-secondary-foreground">
          <CardTitle>📊 Always Available Data Sources</CardTitle>
          <CardDescription className="text-secondary-foreground/90">
            These government APIs don't require keys and provide real-time data
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <h4 className="font-semibold">Statistics Canada</h4>
              <p className="text-sm text-muted-foreground">
                CPI data, rental rates, housing price indices
              </p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <h4 className="font-semibold">Bank of Canada</h4>
              <p className="text-sm text-muted-foreground">
                Interest rates, inflation data, exchange rates
              </p>
            </div>
            
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-3" />
              <h4 className="font-semibold">Government APIs</h4>
              <p className="text-sm text-muted-foreground">
                Benefits data, policy updates, economic indicators
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="shadow-card-custom">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-semibold mb-1">🔐 Security Notice</div>
              <div className="text-muted-foreground">
                API keys entered here are stored in your browser's localStorage for demo purposes only. 
                For production applications, always use secure server-side storage like Supabase Edge Functions 
                to protect sensitive API credentials.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};