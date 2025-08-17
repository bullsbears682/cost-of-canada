import React from 'react';
import { FeatureGate } from '@/components/FeatureGate';
import { HousingAffordabilityAnalyzer } from '@/components/HousingAffordabilityAnalyzer';
import PageHeader from '@/components/PageHeader';

const HousingAnalyzer = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4">
          <FeatureGate requiredTier="Essential" toolName="Housing Affordability Analyzer">
            <HousingAffordabilityAnalyzer />
          </FeatureGate>
        </div>
      </div>
    </>
  );
};

export default HousingAnalyzer;