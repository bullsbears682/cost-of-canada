import React from 'react';
import { AuthGuard } from './AuthGuard';

interface FeatureGateProps {
  children: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({ 
  children 
}) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
};