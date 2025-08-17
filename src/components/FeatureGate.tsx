import React from 'react';
import { AuthGuard } from './AuthGuard';
import { SubscriptionGuard } from './SubscriptionGuard';

interface FeatureGateProps {
  children: React.ReactNode;
  requiredTier: 'Essential' | 'Professional' | 'Expert';
  toolName: string;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({ 
  children, 
  requiredTier, 
  toolName 
}) => {
  return (
    <AuthGuard>
      <SubscriptionGuard requiredTier={requiredTier} toolName={toolName}>
        {children}
      </SubscriptionGuard>
    </AuthGuard>
  );
};