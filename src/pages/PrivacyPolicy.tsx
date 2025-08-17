import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
              <p className="text-center text-muted-foreground">Last updated: January 2025</p>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
                <p>MapleMetrics collects information you provide directly to us, such as when you create an account, use our calculators, or contact us for support.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Account information (email address)</li>
                  <li>Calculator inputs and preferences</li>
                  <li>Usage data and analytics</li>
                  <li>Device information and IP address</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Provide and improve our services</li>
                  <li>Personalize your experience</li>
                  <li>Send important service communications</li>
                  <li>Analyze usage patterns and trends</li>
                  <li>Ensure security and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Service providers who assist us in operating our platform</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of promotional communications</li>
                  <li>Request data portability</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Changes to This Policy</h2>
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy, please contact us through our support page or email us at
                  {' '}
                  <a
                    href="mailto:support@maplemetrics.site"
                    className="text-primary underline underline-offset-4"
                  >
                    support@maplemetrics.site
                  </a>.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;