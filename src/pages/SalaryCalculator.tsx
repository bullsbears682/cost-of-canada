import React from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { SalaryRequirementsCalculator } from '@/components/SalaryRequirementsCalculator';
import PageHeader from '@/components/PageHeader';

const SalaryCalculator = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4">
          <AuthGuard>
            <SalaryRequirementsCalculator />
          </AuthGuard>
        </div>
      </div>
    </>
  );
};

export default SalaryCalculator;