import React from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { GovernmentBenefitsFinder } from '@/components/GovernmentBenefitsFinder';
import PageHeader from '@/components/PageHeader';

const BenefitsFinder = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4">
          <AuthGuard>
            <GovernmentBenefitsFinder />
          </AuthGuard>
        </div>
      </div>
    </>
  );
};

export default BenefitsFinder;