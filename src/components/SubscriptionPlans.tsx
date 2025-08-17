import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check, Crown, Loader2, Zap, Star } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Essential",
    price: 9.99,
    interval: "month",
    description: "Perfect for individuals exploring Canadian housing markets",
    icon: <Zap className="h-6 w-6" />,
    features: [
      "Basic housing affordability analysis",
      "City cost comparisons (up to 3 cities)",
      "Government benefits finder",
      "Basic utility cost optimization",
      "Email support"
    ]
  },
  {
    id: "premium",
    name: "Professional",
    price: 19.99,
    interval: "month",
    description: "Advanced tools for serious home buyers and investors",
    icon: <Crown className="h-6 w-6" />,
    popular: true,
    features: [
      "Everything in Essential",
      "Advanced housing analysis with ML predictions",
      "Unlimited city comparisons",
      "Detailed salary requirements calculator",
      "Historical market trends (5+ years)",
      "Export reports to PDF",
      "Priority support",
      "Custom investment scenarios"
    ]
  },
  {
    id: "enterprise",
    name: "Expert",
    price: 39.99,
    interval: "month",
    description: "Comprehensive suite for real estate professionals",
    icon: <Star className="h-6 w-6" />,
    features: [
      "Everything in Professional",
      "Real-time market alerts",
      "Advanced retirement planning with provincial tax optimization",
      "Bulk property analysis tools",
      "API access for custom integrations",
      "White-label reporting",
      "Dedicated account manager",
      "Custom market research reports"
    ]
  }
];

const SubscriptionPlans = () => {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { user, session, subscription } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubscribe = async (planId: string, price: number) => {
    if (!user || !session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(planId);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planId,
          price: Math.round(price * 100) // Convert to cents
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message || "Failed to create subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to open customer portal.",
        variant: "destructive",
      });
    }
  };

  const isCurrentPlan = (planId: string) => {
    if (!subscription.subscribed) return false;
    
    const tierMap: { [key: string]: string } = {
      "basic": "Essential",
      "premium": "Professional", 
      "enterprise": "Expert"
    };
    
    return tierMap[planId] === subscription.subscription_tier;
  };

  return (
    <div className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unlock premium Canadian housing insights and advanced financial tools
          </p>
        </div>

        {subscription.subscribed && (
          <div className="mb-8 text-center">
            <Card className="inline-block border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="py-4 px-6">
                <p className="text-sm font-medium">
                  Current Plan: <span className="text-primary font-bold">{subscription.subscription_tier}</span>
                  {subscription.subscription_end && (
                    <span className="text-muted-foreground ml-2">
                      (Renews {new Date(subscription.subscription_end).toLocaleDateString()})
                    </span>
                  )}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleManageSubscription}
                  className="mt-2"
                >
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={`grid gap-8 max-w-7xl mx-auto ${isMobile ? 'grid-cols-1 px-4' : 'grid-cols-1 md:grid-cols-3'}`}>
          {plans.map((plan, index) => (
            <Card 
              key={plan.id}
              className={`relative border-0 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-primary ring-offset-4 scale-105' : ''
              } ${isCurrentPlan(plan.id) ? 'border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5' : 'bg-gradient-to-br from-white to-gray-50/50'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center text-white shadow-lg">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-2">
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    isCurrentPlan(plan.id) 
                      ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                      : plan.popular 
                        ? 'bg-gradient-primary hover:opacity-90' 
                        : ''
                  }`}
                  variant={isCurrentPlan(plan.id) ? "outline" : plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id, plan.price)}
                  disabled={isLoading === plan.id || isCurrentPlan(plan.id)}
                >
                  {isLoading === plan.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : isCurrentPlan(plan.id) ? (
                    "Current Plan"
                  ) : (
                    `Get ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;