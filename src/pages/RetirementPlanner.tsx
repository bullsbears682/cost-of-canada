import React from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import RetirementPlanningCalculator from '@/components/RetirementPlanningCalculator';
import PageHeader from '@/components/PageHeader';

const RetirementPlanner = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4">
          <AuthGuard>
            <RetirementPlanningCalculator />
          </AuthGuard>
        </div>
      </div>
    </>
  );
};

export default RetirementPlanner;