import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, ArrowUp } from 'lucide-react';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredTier: 'Essential' | 'Professional' | 'Expert';
  toolName: string;
}

const tierHierarchy = {
  'Essential': 1,
  'Professional': 2,
  'Expert': 3
};

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ 
  children, 
  requiredTier, 
  toolName 
}) => {
  const { subscription, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userTier = subscription?.subscription_tier || 'Free';
  const userTierLevel = tierHierarchy[userTier as keyof typeof tierHierarchy] || 0;
  const requiredTierLevel = tierHierarchy[requiredTier];
  
  const hasAccess = subscription?.subscribed && userTierLevel >= requiredTierLevel;

  if (!hasAccess) {
    return (
      <Card className="max-w-md mx-auto mt-8 border-amber-200 bg-amber-50/50">
        <CardContent className="text-center p-6">
          <Crown className="h-12 w-12 mx-auto mb-4 text-amber-600" />
          <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
          <p className="text-muted-foreground mb-3">
            <strong>{toolName}</strong> requires a{' '}
            <Badge variant="secondary" className="mx-1">
              {requiredTier}
            </Badge>{' '}
            plan or higher.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Current plan: <Badge variant="outline">{userTier}</Badge>
          </p>
          <Button className="w-full">
            <ArrowUp className="h-4 w-4 mr-2" />
            Upgrade to {requiredTier}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};