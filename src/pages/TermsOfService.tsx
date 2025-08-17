import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <>
      <PageHeader />
      <div className="min-h-screen bg-gradient-subtle pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
              <p className="text-center text-muted-foreground">Last updated: January 2025</p>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p>By accessing and using MapleMetrics, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
                <p>MapleMetrics provides Canadian cost of living analysis tools, including but not limited to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Housing affordability calculators</li>
                  <li>Salary requirement analysis</li>
                  <li>Retirement planning tools</li>
                  <li>Government benefits information</li>
                  <li>Regional cost comparisons</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. Disclaimer</h2>
                <p><strong>Important:</strong> All calculations and estimates provided by MapleMetrics are for informational purposes only. They are not financial advice and should not be used as the sole basis for financial decisions. Always consult with qualified financial professionals before making important financial decisions.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Provide accurate information when using our tools</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not attempt to interfere with the proper working of the service</li>
                  <li>Respect the intellectual property rights of MapleMetrics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
                <p>MapleMetrics shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the service.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Data Accuracy</h2>
                <p>While we strive to provide accurate and up-to-date information, we make no warranties about the completeness, reliability, and accuracy of this information. Market conditions, government policies, and economic factors change frequently.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
                <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
                <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">9. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us through our support page or email us at
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

export default TermsOfService;