import React from 'react';
import { FeatureGate } from '@/components/FeatureGate';
import { RealTimeMarketDashboard } from '@/components/RealTimeMarketDashboard';
import PageHeader from '@/components/PageHeader';

const MarketDashboard = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4">
          <FeatureGate requiredTier="Essential" toolName="Real-Time Market Dashboard">
            <RealTimeMarketDashboard />
          </FeatureGate>
        </div>
      </div>
    </>
  );
};

export default MarketDashboard;