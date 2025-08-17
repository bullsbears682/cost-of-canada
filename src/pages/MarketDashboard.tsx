import React from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { RealTimeMarketDashboard } from '@/components/RealTimeMarketDashboard';
import PageHeader from '@/components/PageHeader';
import SupportFooter from '@/components/SupportFooter';

const MarketDashboard = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4">
          <AuthGuard>
            <RealTimeMarketDashboard />
          </AuthGuard>
        </div>
      </div>
      <SupportFooter />
    </>
  );
};

export default MarketDashboard;