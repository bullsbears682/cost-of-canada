import React from 'react';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import PageHeader from '@/components/PageHeader';

const Subscriptions = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4">
          <SubscriptionPlans />
        </div>
      </div>
    </>
  );
};

export default Subscriptions;